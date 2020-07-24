let sydney = "latitude=-33.8675&longitude=151.207&zoom=16&offsetUTC=-600";
let sfHyatt = "latitude=37.796&longitude=-122.398&zoom=16&offsetUTC=-420";
let alcatraz = "latitude=37.8270&longitude=-122.423&zoom=16&offsetUTC=-420";
let coit = "latitude=37.8024&longitude=-122.4058&zoom=16&offsetUTC=-420";
let santaBarbara = "latitude=34.4208305&longitude=-119.69819&zoom=16&offsetUTC=-420";


const MAP = {};


//alcatraz;
MAP.latitude = 37.8270;
MAP.longitude = -122.423;

//Me
MAP.latitude = 37.796;
MAP.longitude = -122.398;

// // Greenwich Observatory, England;
// MAP.latitude = 51.4769;
// MAP.longitude = 0.0005;

MAP.rows = 8;
MAP.cols = 8;
MAP.zoom = 16;

MAP.pixelsPerTile = 256;
MAP.sizePerTile = 50;
MAP.tileBitmapsLoaded = 0;
MAP.tileHeightMapsLoaded = 0;
MAP.heightScale = 50;

MAP.metersPerPixelPerZoom = [ 156412, 78206, 39103, 19551, 9776, 4888, 2444, 1222, 610.984, 305.492, 152.746, 76.373, 38.187, 19.093, 9.547, 4.773, 2.387, 1.193, 0.596, 0.298 ];
MAP.mbptoken = 'pk.eyJ1IjoidGhlb2EiLCJhIjoiY2o1YXFra3V2MGIzbzJxb2lneDUzaWhtZyJ9.7bYFAQabMXiYmcqW8NLfwg';


MAP.init = function() {

	MAP.tileCenterX = MAP.lonToTile( MAP.longitude, MAP.zoom);
	MAP.tileCenterY = MAP.latToTile( MAP.latitude, MAP.zoom);

	MAP.tileStartX = MAP.tileCenterX - Math.floor( MAP.cols / 2 );
	MAP.tileStartY = MAP.tileCenterY - Math.floor( MAP.rows / 2 );

} 


MAP.getTilesBitmaps = function ( callback ) {

	MAP.onLoadBitmaps = callback;


	MAP.canvasBitmap = document.createElement( 'canvas' );
	MAP.canvasBitmap.width = MAP.pixelsPerTile * MAP.cols;
	MAP.canvasBitmap.height = MAP.pixelsPerTile * MAP.rows;
	MAP.contextBitmap = MAP.canvasBitmap.getContext( "2d" );

	//document.body.appendChild( canvas );
	//canvas.style.cssText = "border: 1px solid gray; margin: 10px auto; position: absolute; right: 0; z-index:10;";

	const zoom = MAP.zoom ;

	for ( let i = 0; i < MAP.cols; i++ ) {

		for ( let j = 0; j < MAP.rows; j++ ) {

			const url = `https://mt1.google.com/vt/x=${ MAP.tileStartX + i }&y=${ MAP.tileStartY + j }&z=${ zoom }`;

			MAP.fetchTileBitmap( url, i, j );

		}

	}

};



MAP.fetchTileBitmap = function ( url = "", col = 0, row = 0 ) {

	fetch( new Request( url ) )
		.then( response => response.blob() )
		.then( blob => MAP.onLoadTileBitmap( URL.createObjectURL( blob ), col, row ) );

};



MAP.onLoadTileBitmap = function ( src, col, row ) {

	const img = new Image(); //document.createElement( "img" );

	img.onload = function () {

		MAP.contextBitmap.drawImage( img, 0, 0, MAP.pixelsPerTile, MAP.pixelsPerTile, col * MAP.pixelsPerTile, row * MAP.pixelsPerTile, MAP.pixelsPerTile, MAP.pixelsPerTile);

		MAP.tileBitmapsLoaded++;

		if ( MAP.tileBitmapsLoaded >= MAP.rows * MAP.cols ) {

			MAP.onLoadBitmaps( MAP.canvasBitmap );

		}

	};

	img.src = src;

};


/////



MAP.getTilesHeightMaps = function( onLoadHeightMaps ) {

	MAP.onLoadHeightMaps = onLoadHeightMaps;

	MAP.canvasHeightMaps = document.createElement( "canvas" );
	MAP.canvasHeightMaps.width = MAP.cols * MAP.pixelsPerTile;
	MAP.canvasHeightMaps.height = MAP.rows * MAP.pixelsPerTile;
	MAP.contextHeightMaps = MAP.canvasHeightMaps.getContext( "2d" );

	//document.body.appendChild( canvas );
	//canvas.style.cssText = "border: 1px solid gray; margin: 10px auto; position: absolute; right: 0; z-index:10;";

	for ( let i = 0; i < MAP.cols; i++ ) {

		for ( let j = 0; j < MAP.rows; j++ ) {

			const url = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${ MAP.zoom }/${ MAP.tileStartX + i }/${ MAP.tileStartY + j }.pngraw?access_token=${ MAP.mbptoken}`;

			MAP.fetchTileHeightMap( url, i, j );

		}

	}

};


MAP.fetchTileHeightMap = function ( url = "", col = 0, row = 0 ) {

	fetch( new Request( url ) )
		.then( response => response.blob() )
		.then( blob => MAP.onLoadTileHeightMap( URL.createObjectURL( blob ), col, row ) );

};


MAP.onLoadTileHeightMap = function ( src, col = 0, row = 0 ) {

	const img = new Image(); //document.createElement( "img" );
	const size = 256;

	img.onload = function () {

		MAP.contextHeightMaps.drawImage( img, 0, 0, size, size, col * size, row * size, size, size );

		MAP.tileHeightMapsLoaded++;

		if ( MAP.tileHeightMapsLoaded >= MAP.rows * MAP.cols ) {

			MAP.onLoadHeightMaps( MAP.contextHeightMaps );

			MAP.canvasHeightMaps.style.cssText = "width:256px;";
			divHeightMaps.appendChild( MAP.canvasHeightMaps );

		}

	};

	img.src = src;

} 



////////// Cartography utilities

MAP.lonToTile = function ( longitude = 0, zoom = 16 ) {

	return Math.floor( ( longitude + 180 ) / 360 * Math.pow( 2, zoom ) );

};


MAP.latToTile = function ( latitude = 51.4934, zoom = 16 ) {

	const pi = Math.PI;
	return Math.floor( ( 1 - Math.log( Math.tan( latitude * pi / 180 ) + 1 / Math.cos( latitude * pi / 180 ) ) / pi ) / 2 * Math.pow( 2, zoom ) );

};
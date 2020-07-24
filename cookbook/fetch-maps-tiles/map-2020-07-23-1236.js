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
// MAP.latitude = 37.796;
// MAP.longitude = -122.398;

// Greenwich Observatory, England;
MAP.latitude = 51.4769;
MAP.longitude = 0.0005;

MAP.rows = 8;
MAP.cols = 3;
MAP.zoom = 16;

MAP.pixelsPerTile = 256;
MAP.sizePerTile = 50;
MAP.tilesLoaded = 0;




MAP.getMapTiles = function ( callback ) {

	MAP.onLoadBitmaps = callback;

	MAP.tileCenterX = MAP.lonToTile( MAP.longitude, MAP.zoom );
	MAP.tileCenterY = MAP.latToTile( MAP.latitude, MAP.zoom );

	MAP.tileStartX = MAP.tileCenterX - Math.floor( MAP.cols / 2 );
	MAP.tileStartY = MAP.tileCenterY - Math.floor( MAP.rows / 2 );

	MAP.canvas = document.createElement( "canvas" );
	MAP.canvas.width = MAP.cols * MAP.pixelsPerTile;
	MAP.canvas.height = MAP.rows * MAP.pixelsPerTile;
	MAP.context = MAP.canvas.getContext( "2d" );

	//document.body.appendChild( canvas );
	//canvas.style.cssText = "border: 1px solid gray; margin: 10px auto; position: absolute; right: 0; z-index:10;";

	for ( let i = 0; i < MAP.cols; i++ ) {

		for ( let j = 0; j < MAP.rows; j++ ) {

			const url = `https://mt1.google.com/vt/x=${ MAP.tileStartX + i }&y=${ MAP.tileStartY + j }&z=${ MAP.zoom }`;

			MAP.fetchMapTile( url, i, j );

		}

	}

};



MAP.fetchMapTile = function ( url = "", col = 0, row = 0 ) {

	fetch( new Request( url ) )
		.then( response => response.blob() )
		.then( blob => MAP.setMap( URL.createObjectURL( blob ), col, row ) );

};



MAP.setMap = function ( src, col, row ) {

	const img = new Image(); //document.createElement( "img" );

	img.onload = function () {

		MAP.context.drawImage( img, 0, 0, MAP.pixelsPerTile, MAP.pixelsPerTile, col * MAP.pixelsPerTile, row * MAP.pixelsPerTile, MAP.pixelsPerTile, MAP.pixelsPerTile );

		MAP.tilesLoaded++;

		if ( MAP.tilesLoaded >= MAP.rows * MAP.cols ) {

			MAP.onLoadBitmaps( MAP.canvas );

		}

	};

	img.src = src;

};



////////// Cartography utilities

MAP.lonToTile = function ( longitude = 0, zoom = 16 ) {

	return Math.floor( ( longitude + 180 ) / 360 * Math.pow( 2, zoom ) );

};


MAP.latToTile = function ( latitude = 51.4934, zoom = 16 ) {

	const pi = Math.PI;
	return Math.floor( ( 1 - Math.log( Math.tan( latitude * pi / 180 ) + 1 / Math.cos( latitude * pi / 180 ) ) / pi ) / 2 * Math.pow( 2, zoom ) );

};

const source = "https://github.com/theo-armour/2020/tree/master/sandbox/us-county-votes/";

const version = "2020-12-02";

const description = document.head.querySelector( "[ name=description ]" ).content;

//const urlDefault = "README.md";

let votes;
let geo

function init () {

	aGithub.href = source;

	spnVersion.innerHTML = version;

	//divDescription.innerHTML = description;


	THR.init();

	THR.animate();

	THR.addLights();

	THR.addGround();

	THR.group = THR.setSceneNew();

	//THRU.addMeshes(100);

	//THRR.updateScene();

	GJS.initGeoJson();

	requestFile( "../us-county-votes.tsv", getVotes );

	THR.camera.position.set( - 20, - 65, 50 );

	//camera.position.set( -115, 20, 40 );
	//controls.target.set( -100, 40, 0 );

	UFR.init();

	HRT.init();

	selYear.focus();

	geom = new THREE.CylinderGeometry( 0, 0.1 * 20, 5, 12, 1, false );

};




function requestFile ( url, callback ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = ( xhr ) => console.log( 'error:', xhr );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
	xhr.onload = ( xhr ) => callback( xhr.target.response );
	xhr.send( null );

}


function getVotes ( string ) {

	votes = string.split( /\n/ ).map( line => line.split( /\t/ ) ).slice( 8 );

	if ( votes && UFR.lines ) { drawVotes(); }

}


function drawVotes () {

	const v2 = ( x, y ) => new THREE.Vector2( x, y );

	scene.remove( UFR.counties );

	UFR.counties = new THREE.Group;

	columns = [ [ 9, 10, 12 ], [ 23, 24, 26 ], [ 37, 38, 40 ], [ 51, 52, 54 ], [ 65, 66, 68 ] ];
	col = columns[ selYear.selectedIndex ];


	const geometriesDem = [];
	const geometriesRep = [];

	filtered = [];

	UFR.lines.forEach( line => {

		//console.log( "", line );

		//if ( line[ 4 ] && line[ 8 ] ) {

			const countyVote = votes.find( vote => vote[ 1 ] === line[ 4 ] );

			if ( countyVote ) {

				//console.log( "ccc", countyVote );

				const tot = Math.log( 1 + 0.0001 * countyVote[ col[ 0 ] ] );
				const dem = Math.log( 1 + 0.0002 * countyVote[ col[ 1 ] ] );
				const rep = Math.log( 1 + 0.0002 * countyVote[ col[ 2 ] ] );

				const points = [ v2( 0, 0 ), v2( 0.1 * tot, dem ), v2( 0, dem - 0.03 ) ];
				geometry = new THREE.LatheBufferGeometry( points, 7 );
				const vert = GJS.latLonToXYZ( 50, + line[ 8 ], + line[ 9 ] );
				//geometry.scale( 1, 1, 0.5);
				geometry.rotateX( 0.49 * Math.PI );
				//geometry.rotateY( -0.15 * Math.PI );
				geometry.lookAt( vert );
				geometry.translate( vert.x, vert.y, vert.z );
				geometriesDem.push( geometry );
				//console.log( "", geometry );

				const pointsRep = [ v2( 0, 0 ), v2( 0.1 * tot, rep ), v2( 0, rep - 0.03 ) ];
				const geometryRep = new THREE.LatheBufferGeometry( pointsRep, 7 );
				//const vertRep = GJS.latLonToXYZ( 50, + line[ 8 ], + line[ 9 ] );
				//geometryRep.scale( 1, 1, 0.5 );
				geometryRep.rotateX( 0.51 * Math.PI );
				//geometry.rotateY( -0.15 * Math.PI );
				geometryRep.lookAt( vert );
				geometryRep.translate( vert.x, vert.y, vert.z );
				geometriesRep.push( geometryRep );
				//console.log( "", geometry );

				filtered.push( countyVote );

			} else {

				//console.log( "", line );

			}

		//}

	} );

	//console.log( "geometriesDem", geometriesDem );
	const bufferGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries( geometriesDem );

	let material = new THREE.MeshPhongMaterial( { color: 0x0015BC} );
	const mesh = new THREE.Mesh( bufferGeometry, material );
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	UFR.counties.add( mesh );


	const bufferGeometryRep = THREE.BufferGeometryUtils.mergeBufferGeometries( geometriesRep );

	const materialRep = new THREE.MeshPhongMaterial( { color: 0xDE0100 } );
	const meshRep = new THREE.Mesh( bufferGeometryRep, materialRep );
	meshRep.receiveShadow = true;
	meshRep.castShadow = true;
	UFR.counties.add( meshRep );

	console.log( "ms ", performance.now() - timeStart );

	RAY.intersectObjects = UFR.counties.children;

	const bytes = THREE.BufferGeometryUtils.estimateBytesUsed( bufferGeometry );
	console.log( "bytes", bytes );
	THR.scene.add( UFR.counties );

	RAY.intersectObjects = UFR.counties.children;

	RAY.addMouseMove();

}



RAY.getHtm = function ( intersected ) {
	console.log( "intersected", intersected );

	if ( !geo ) { geo = new THREE.Geometry().fromBufferGeometry( intersected.object.geometry ); }
	//console.log( "geo", geo );

	let item;
	let index = intersected.faceIndex;

	for ( item = 0; item <= filtered.length; item++ ) {

		const limit = item * 28;

		if ( index < limit ) { break; }

	}

	countyVote = filtered[ item - 1];

	//console.log( "", item, countyVote );

	htm = `
<div>
	<a href="https://www.google.com/search?q=FIPS+${ countyVote[ 1 ] }" target="_blank"><img width="14" src="https://theo-armour.github.io/2020/lib/icons/icon-link-external.svg"> FIPS: ${ countyVote[ 1 ] }</a><br>
	County: ${ countyVote[ 2 ] } ~ ${ countyVote[ 3 ] }<br>

	<table>
	<tr>
	<td>Year</td><td>Dems</td><td>Reps</td>
	</tr>

	<tr>
	<td>2018</td><td> ${ ( + countyVote[ 10 ] ).toLocaleString() }</td><td> ${ ( + countyVote[ 12 ] ).toLocaleString() }</td>
	</tr>

	<tr>
	<td>2016</td><td> ${ ( + countyVote[ 24 ] ).toLocaleString() }</td><td> ${ ( + countyVote[ 26 ] ).toLocaleString() }</td>
	</tr>

	<tr>
	<td>2014</td><td> ${ ( + countyVote[ 38 ] ).toLocaleString() }</td><td> ${ ( + countyVote[ 40 ] ).toLocaleString() }</td>
	</tr>

	<tr>
	<td>2012</td><td> ${ ( + countyVote[ 52 ] ).toLocaleString() }</td><td> ${ ( + countyVote[ 54 ] ).toLocaleString() }</td>
	</tr>

	<tr>
	<td>2010</td><td> ${ ( + countyVote[ 66 ] ).toLocaleString() }</td><td> ${ ( + countyVote[ 68 ] ).toLocaleString() }</td>
	</tr>
	</table>
</div>`;

	return htm;

};


function setStats () {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = () => {

		const stats = new Stats();
		const sts = document.body.appendChild( stats.dom );
		sts.style.left = "";
		sts.style.right = "0px";
		requestAnimationFrame( function loop () {

			stats.update(); requestAnimationFrame( loop );

		} );

	};

	script.src = "https://raw.githack.com/mrdoob/stats.js/master/build/stats.min.js";


	const render = renderer.info.render;
	if ( !window.divRendererInfo ) divRendererInfo = divLog.appendChild( document.createElement( "div" ) );
	divRendererInfo.innerHTML = `
<div>
	Renderer Info<br>
	Calls: ${ render.calls }<br>
	Lines: ${ render.lines }<br>
	Triangles: ${ render.triangles.toLocaleString() }<br>
</div>`;

}


const MNU = {};

MNU.toggleDarkMode = function ( button ) {

	if ( butDark.innerHTML === "dark" ) {

		//root.style.backgroundColor = "#1e1f23";
		document.body.style.color = "#aaa";
		navMenu.style.backgroundColor = "#555";

		THR.scene.background = new THREE.Color( 0x222222 );
		THR.scene.fog.far = 999999;

		//const summaries = document.querySelectorAll(".summary-secondary");
		//console.log( "", summaries );

		Array.from( document.querySelectorAll( "a" ) )
			.forEach( a => a.style.color = "#ccc" );

		Array.from( document.querySelectorAll( "input,select,option" ) )
			.forEach( iso => iso.style.backgroundColor = "#bbb" );

		document.documentElement.style.setProperty( "--color-2-background", "#888" );
		Array.from( document.querySelectorAll( ".summary-primary" ) )
			.forEach( sum => sum.style.backgroundColor = "#888" );

		document.documentElement.style.setProperty( "--color-3-background", "#bbb" );
		Array.from( document.querySelectorAll( ".summary-secondary" ) )
			.forEach( sum => sum.style.backgroundColor = "#bbb" );


		divPopUp.style.backgroundColor = "#333";

		butDark.innerHTML = "light";

		return;

	}

	//root.style.backgroundColor = "#1e1f23";
	document.body.style.color = "teal";
	navMenu.style.backgroundColor = "#fafffa";

	THR.scene.background = new THREE.Color( 0xcce0ff );
	THR.scene.fog.far = THR.radius * 8;

	const summaries = document.querySelectorAll( ".summary-primary" );
	Array.from( summaries ).forEach( sum => sum.style.backgroundColor = "#eee" );

	divPopUp.style.backgroundColor = "#eee";

	butDark.innerHTML = "dark";

};

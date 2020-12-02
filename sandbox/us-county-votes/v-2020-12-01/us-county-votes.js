
const source = "https://github.com/theo-armour/2020/tree/master/lib-template-viewer/";

const version = "2020-12-01";

const description = document.head.querySelector( "[ name=description ]" ).content;

//const urlDefault = "README.md";

let votes;

function init () {



	aGithub.href = source;

	spnVersion.innerHTML = version;

	divDescription.innerHTML = description;


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

	scene.remove( UFR.counties );

	UFR.counties = new THREE.Group;

	columns = [ [ 9, 10, 12 ], [ 23, 24, 26 ], [ 37, 38, 40 ], [ 51, 52, 54 ], [ 65, 66, 68 ] ];
	col = columns[ selYear.selectedIndex ];


	UFR.lines.forEach( line => {

		if ( line[ 4 ] && line[ 8 ] ) {

			const countyVote = votes.find( vote => vote[ 1 ] === line[ 4 ] );

			if ( countyVote ) {
				//CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )

				const tot = Math.log( 1 + 0.0001 * countyVote[ col[ 0 ] ] );
				const dem = Math.log( 1 + 0.0002 * countyVote[ col[ 1 ] ] );
				const rep = Math.log( 1 + 0.0002 * countyVote[ col[ 2 ] ] );

				const demCol = dem > rep ? 0x0015BC : 0x4444aa;
				const repCol = rep > dem ? 0xDE0100 : 0xaa4444;


				let geometry = new THREE.CylinderBufferGeometry( 0, 0.1 * tot, dem, 6, 1, false );
				geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );

				let material = new THREE.MeshPhongMaterial( { color: demCol } );
				let mesh = new THREE.Mesh( geometry, material );
				mesh.userData = line;
				mesh.scale.y = 0.3;

				const vert = GJS.latLonToXYZ( 50 + 0.5 * dem, + line[ 8 ], + line[ 9 ] );
				mesh.position.copy( vert ); //set( + line[ 9 ], + line[ 8 ], 0.5 * dem );
				mesh.lookAt( 0, 0, 0 );
				UFR.counties.add( mesh );


				const geometry2 = new THREE.CylinderBufferGeometry( 0, 0.1 * tot, rep, 6, 1, false );
				geometry2.applyMatrix4( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );

				const material2 = new THREE.MeshPhongMaterial( { color: repCol } );
				const mesh2 = new THREE.Mesh( geometry2, material2 );
				mesh2.userData = line;
				mesh2.scale.x = 0.3;
				const vert2 = GJS.latLonToXYZ( 50 + 0.5 * rep, + line[ 8 ], + line[ 9 ] );

				mesh2.position.copy( vert2 ); //set( + line[ 9 ], + line[ 8 ], 0.5 * dem );
				mesh2.lookAt( 0, 0, 0 );

				UFR.counties.add( mesh2 );


			}

		}

	} );

	scene.add( UFR.counties );

	RAY.intersectObjects = UFR.counties.children;

	RAY.addMouseMove();


}



//	"UID", "iso2", "iso3", "code3", "FIPS", "Admin2", "Province_State", "Country_Region", "Lat", "Long_", "Combined_Key", "Population" ];

RAY.getHtm = function ( intersected ) {
	//console.log( "intersected", RAY.intersected.object.userData );

	const data = RAY.intersected.object.userData;

	countyVote = votes.find( vote => vote[ 1 ] === data[ 4 ] );
	//console.log( "countyVote", countyVote );

	let voteData;

	if ( countyVote ) {

		voteData = `
<div>
	FIPS: ${ countyVote[ 1 ] } <br>
	County: ${ countyVote[ 2 ] }<br>
	Year: 2018 2016 2014 2012 2010<br>
	Dem vote: ${ countyVote[ 10 ] } ${ countyVote[ 24 ] } ${ countyVote[ 38 ] } ${ countyVote[ 52 ] } ${ countyVote[ 66 ] }<br>
	Rep vote: ${ countyVote[ 12 ] } ${ countyVote[ 26 ] } ${ countyVote[ 40 ] } ${ countyVote[ 54 ] }  ${ countyVote[ 68 ] }<br>
</div>`;

	} else {

		voteDate = "not found";
	}
	const htm = `
<div>
	County Votes Data<br>
	${ voteData }
	<hr>
	County Geo Data<br>
	id: ${ UFR.counties.children.indexOf( RAY.intersected.object ) }<br>
	FIPS: ${ data[ 4 ] }<br>
	County: ${ data[ 5 ] }</br>
	State: ${ data[ 6 ] }<br>
	Latitude: ${ data[ 8 ] }<br>
	Longitude: ${ data[ 9 ] }<br>
	Population: ${ Number( data[ 13 ] ).toLocaleString() }<br>
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
	if ( !window.divRendererInfo ) divRendererInfo = navMenu.appendChild( document.createElement( "div" ) );
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

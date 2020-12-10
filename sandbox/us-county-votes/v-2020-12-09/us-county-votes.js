
const source = "https://github.com/theo-armour/2020/tree/master/sandbox/us-county-votes/";

const version = "2020-12-09";

const description = document.head.querySelector( "[ name=description ]" ).content;

let indexDem = [];
let indexRep = [];
let indexOther = [];
let votesAll;
let votesYear;
let flipSticks;

function init () {

	aGithub.href = source;

	spnVersion.innerHTML = version;

	//divDescription.innerHTML = description;


	THR.init();

	THR.animate();

	THR.addLights();

	//THR.addGround();

	THR.group = THR.setSceneNew();

	//THRU.addMeshes(100);

	//THRR.updateScene();

	GJS.initGeoJson();

	requestFile( "../countypres_2000-2016.csv", getVotes );

	THR.camera.position.set( - 20, - 65, 50 );

	UFR.init();

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

	votesAll = string.split( /\n/ ).map( line => line.split( /,/ ) ).slice( 0, -1 );

	votesAll.forEach( vote => vote[ 4 ] = ( "0" + vote[ 4 ] ).slice( - 5 ) );

	//console.log( "votesAll", votesAll );

	if ( votesAll && UFR.fips ) { drawVotes(); }

}


function drawVotes () {

	const v2 = ( x, y ) => new THREE.Vector2( x, y );

	scene.remove( UFR.counties, flipSticks );

	UFR.counties = new THREE.Group;

	const geometriesDem = [];

	const geometriesRep = [];
	const geometriesOther = [];

	//filtered = [];

	indexDem = [];
	indexRep = [];
	indexOther = [];

	votesYear = votesAll.filter( vote => vote[ 0 ] === selYear.value );
	//console.log( "votesYear", votesYear );


	votesYear.forEach( countyVote => {

		const fip = UFR.fips.find( fip => countyVote[ 4 ] === fip[ 0 ].slice( -5 ) );
		//fips = UFR.fips.filtet( fip => countyVote[ 4 ] === fip[ 0 ].slice( -5 ) )

		if ( fip ) {
			//console.log( "countyVote", countyVote);

			const total = Math.log( 1 + 0.0001 * countyVote[ 9 ] ) || 0;
			const vote = Math.log( 1 + 0.0002 * countyVote[ 8 ] ) || 0;

			const points = [ v2( 0, 0 ), v2( 0.1 * total, vote ), v2( 0, vote - 0.03 ) ];
			const geometry = new THREE.LatheBufferGeometry( points, 7 );
			const vert = GJS.latLonToXYZ( 50, + fip[ 8 ], + fip[ 9 ] );
			geometry.rotateX( 0.49 * Math.PI );
			geometry.lookAt( vert );
			geometry.translate( vert.x, vert.y, vert.z );

			if ( countyVote[ 7 ] === "democrat" ) {

				geometriesDem.push( geometry );
				indexDem.push( countyVote );

			} else if ( countyVote[ 7 ] === "republican" ) {

				geometriesRep.push( geometry );
				indexRep.push( countyVote );

			} else {

				geometriesOther.push( geometry );
				countyVote[ 8 ] = countyVote[ 8 ] ? countyVote[ 8 ] : 0;
				indexOther.push( countyVote );

			}

		}

	} );

	const bufferGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries( geometriesDem );
	const material = new THREE.MeshPhongMaterial( { color: 0x0015BC } );
	const mesh = new THREE.Mesh( bufferGeometry, material );
	mesh.name = "democrat";
	//mesh.receiveShadow = true;
	//mesh.castShadow = true;
	UFR.counties.add( mesh );

	const bufferGeometryRep = THREE.BufferGeometryUtils.mergeBufferGeometries( geometriesRep );
	const materialRep = new THREE.MeshPhongMaterial( { color: 0xDE0100 } );
	const meshRep = new THREE.Mesh( bufferGeometryRep, materialRep );
	meshRep.name = "republican";
	//meshRep.receiveShadow = true;
	//meshRep.castShadow = true;
	UFR.counties.add( meshRep );

	const bufferGeometryOther = THREE.BufferGeometryUtils.mergeBufferGeometries( geometriesOther );
	const materialOther = new THREE.MeshPhongMaterial( { color: 0x008080 } );
	const meshOther = new THREE.Mesh( bufferGeometryOther, materialOther );
	meshOther.name = "other";
	//meshOther.receiveShadow = true;
	//meshOther.castShadow = true;
	UFR.counties.add( meshOther );


	RAY.intersectObjects = UFR.counties.children;

	//const bytes = THREE.BufferGeometryUtils.estimateBytesUsed( bufferGeometry );
	//console.log( "bytes", bytes );

	THR.scene.add( UFR.counties );

	RAY.addMouseMove();

	if ( !GLO.globe ) { GLO.initGlobeWithBitmap(); }

	HRT.init();

	selYear.focus();

	//console.log( "ms ", performance.now() - timeStart );

	htm = `
FIPs: ${ UFR.fips.length.toLocaleString() }<br>
Votes: ${ votesAll.length.toLocaleString() }<br>
Year: ${ votesYear.length.toLocaleString() }<br>
Democrat: ${ indexDem.length.toLocaleString() }<br>
Republican: ${ indexRep.length.toLocaleString() }<br>
Other: ${ indexOther.length.toLocaleString() }<br>
`;

	divLog.innerHTML = htm;

	//setStatsVote();

}



RAY.getHtm = function ( intersected ) {
	//console.log( "intersected", intersected.object.name );

	//if ( !geo ) { geo = new THREE.Geometry().fromBufferGeometry( intersected.object.geometry ); }
	//console.log( "geo", geo );

	let item;
	let index = intersected.faceIndex;
	let type = intersected.object.name;
	let filtered;

	if ( type === "democrat" ) {
		filtered = indexDem;
	} else if ( type === "republican" ) {
		filtered = indexRep;
	} else {
		filtered = indexOther;
	}

	for ( item = 0; item <= filtered.length; item++ ) {

		const limit = item * 28;

		if ( index < limit ) { break; }

	}

	const countyVote = filtered[ item - 1 ];
	//console.log( "countyVote", countyVote );

	//year = countyVote[ 0 ];
	const fips = countyVote[ 4 ];

	const votes = votesYear.filter( vote => vote[ 4 ] === fips );
	//console.log( "votes", votes );

	const yearPrevious = ( -4 + ( + selYear.value ) );

	if ( yearPrevious ) {

		votesYearPrev = votesAll.filter( vote => ( + vote[ 0 ] ) === yearPrevious && vote[ 4 ] === countyVote[ 4 ] );

		//console.log( "votesYearPrev", votesYearPrev );

	}

	//if ( votes[ 0 ][ 8 ] > votes[ 0 ][ 8 ] )

	const htm = `
<div>
	<a href="https://www.google.com/search?q=FIPS+${ countyVote[ 4 ] }" target="_blank"><img width="14" src="https://theo-armour.github.io/2020/lib/icons/icon-link-external.svg"> FIPS: ${ countyVote[ 4 ] }</a><br>
	County: ${ countyVote[ 3 ] } ~ ${ countyVote[ 2 ] }<br>
	Year: ${ countyVote[ 0 ] } <br>
	Total: ${ ( + countyVote[ 9 ] ).toLocaleString() }<br>
	Democrat: ${ ( + votes[ 0 ][ 8 ] ).toLocaleString() } <br>
	Republican: ${ ( + votes[ 1 ][ 8 ] ).toLocaleString() }<br>
	Other: ${ ( + votes[ 2 ][ 8 ] ).toLocaleString() }<br>
	<hr>
	Year: ${ yearPrevious } <br>
	Total: ${ ( + votesYearPrev[ 0 ][ 9 ] ).toLocaleString() }<br>
	Democrat: ${ ( + votesYearPrev[ 0 ][ 8 ] ).toLocaleString() } <br>
	Republican: ${ ( + votesYearPrev[ 1 ][ 8 ] ).toLocaleString() }<br>
	Other: ${ ( + votesYearPrev[ 2 ][ 8 ] ).toLocaleString() }<br>



</div>`;

	return htm;

};



function setStatsVote () {

	flipSticks = new THREE.Group();

	const votes = indexDem.reduce( ( total, num ) => total + ( + num[ 9 ] ), 0 );
	const dems = indexDem.reduce( ( total, num ) => total + ( + num[ 8 ] ), 0 );
	const reps = indexRep.reduce( ( total, num ) => total + ( + num[ 8 ] ), 0 );
	const other = indexOther.reduce( ( total, num ) => total + ( + num[ 8 ] ), 0 );

	const demWin = indexDem.filter( ( vote, index ) => vote[ 8 ] > indexRep[ index ][ 8 ] );
	const repWin = indexRep.filter( ( vote, index ) => vote[ 8 ] > indexDem[ index ][ 8 ] );

	let flips = [];

	const yearPrevious = ( -4 + ( + selYear.value ) );

	if ( yearPrevious ) {

		const votesYearPrev = votesAll.filter( vote => ( + vote[ 0 ] ) === yearPrevious );

		votesYear.forEach( ( voteYear, index ) => {

			const fip = voteYear[ 4 ];

			const votesYearFip = votesYear.filter( vote => vote[ 4 ] === fip );

			const demsYF = votesYearFip[ 0 ];
			const repsYF = votesYearFip[ 1 ];

			const v1 = ( + demsYF[ 8 ] ) > ( + repsYF[ 8 ] );
			//console.log( "v1", v1);

			const votesYearPreviousFip = votesYearPrev.filter( vote => vote[ 4 ] === fip );

			const demsYPF = votesYearPreviousFip[ 0 ] || 1;
			const repsYPF = votesYearPreviousFip[ 1 ] || 1;

			const v2 = ( + demsYPF[ 8 ] ) > ( + repsYPF[ 8 ] );
			//console.log( "v2", v2 );

			if ( v1 && !v2 ) { flips.push( fip ); }

		} );

		flips = [ ...new Set( flips ) ];

		flips.forEach( fip => {

			const fipRec = UFR.fips.find( fipX => fip === fipX[ 0 ].slice( -5 ) );
			//console.log( "fipRec", fip, fipRec, );

			if ( fipRec ) {

				const vert = GJS.latLonToXYZ( 50, + fipRec[ 8 ], + fipRec[ 9 ] );
				const geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 12 );
				const material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0xffffff } );
				const mesh = new THREE.Mesh( geometry, material );
				mesh.lookAt( vert );
				mesh.position.copy( vert );
				flipSticks.add( mesh );

			}

		})



		console.log( "flips", flips );

		scene.add( flipSticks )
	}


	htm = `
FIPs: ${ UFR.fips.length.toLocaleString() }<br>
Counties: ${ indexDem.length.toLocaleString() }<br>
Votes: ${ votes.toLocaleString() }<br>
Democrats: ${ dems.toLocaleString() }<br>
Dem Win: ${ demWin.length.toLocaleString() }<br>
Republicans: ${ reps.toLocaleString() }<br>
Rep Win: ${ repWin.length.toLocaleString() }<br>
Other: ${ other.toLocaleString() }<br>
Flips: ${ flips.length }<br>
`;

	divLog.innerHTML = htm;


}

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

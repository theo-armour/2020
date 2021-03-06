
const source = "https://github.com/theo-armour/2020/tree/master/sandbox/us-county-votes/";

const version = "2020-12-16";

//const description = document.head.querySelector( "[ name=description ]" ).content;

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

	THR.group = THR.setSceneNew();

	//THRU.addMeshes(100);

	THRR.updateScene();

	GJS.initGeoJson();

	const urlGeoJson = "../../../lib/assets/geojson/cb_2019_us_county_20m.geojson";

	GJS.requestFile( urlGeoJson, GJS.onLoadGeoJson );

	requestFile( "../us-county-votes.csv", getVotes );

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

	//const startTime = performance.now();

	votesAll = string.split( /\n/ ).map( line => line.split( /,/ ) ).slice( 0, -1 );
	//console.log( "votesAll", votesAll );

	//console.log( "ms", performance.now() - startTime );

	if ( votesAll && UFR.fips ) { drawVotes(); }

}



function drawVotes () {

	const v2 = ( x, y ) => new THREE.Vector2( x, y );

	scene.remove( UFR.counties, flipSticks );

	UFR.counties = new THREE.Group;

	const geometriesDem = [];
	const geometriesRep = [];
	const geometriesOther = [];

	indexDem = [];
	indexRep = [];
	indexOther = [];

	votesYear = votesAll.filter( vote => vote[ 0 ] === selYear.value );
	//console.log( "votesYear", votesAll[ 1 ][ 0 ], selYear.value, votesYear );

	votesYear.forEach( countyVote => {

		const fip = UFR.fips.find( fip => countyVote[ 1 ] === fip[ 0 ].slice( -5 ) );

		if ( fip ) {
			//console.log( "countyVote", countyVote);

			const total = Math.log( 1 + 0.0001 * countyVote[ 7 ] ) || 0;

			const voteDem = Math.log( 1 + 0.0002 * countyVote[ 4 ] ) || 0;

			const pointsDem = [ v2( 0, 0 ), v2( 0.1 * total, voteDem ), v2( 0, voteDem - 0.03 ) ];
			const geometryDem = new THREE.LatheBufferGeometry( pointsDem, 7 );
			const vertexDem = GJS.latLonToXYZ( 50, + fip[ 8 ], + fip[ 9 ] );
			geometryDem.rotateX( 0.5 * Math.PI );
			geometryDem.lookAt( vertexDem );
			geometryDem.translate( vertexDem.x, vertexDem.y, vertexDem.z );

			geometriesDem.push( geometryDem );
			indexDem.push( countyVote );


			const voteRep = Math.log( 1 + 0.0002 * countyVote[ 5 ] ) || 0;

			const pointsRep = [ v2( 0, 0 ), v2( 0.1 * total, voteRep ), v2( 0, voteRep - 0.03 ) ];
			const geometryRep = new THREE.LatheBufferGeometry( pointsRep, 7 );
			const vertexRep = GJS.latLonToXYZ( 50, + fip[ 8 ], + fip[ 9 ] );
			geometryRep.rotateX( 0.5 * Math.PI );
			geometryRep.lookAt( vertexRep );
			geometryRep.translate( vertexRep.x, vertexRep.y, vertexRep.z );

			geometriesRep.push( geometryRep );
			indexRep.push( countyVote );

			const voteOther = Math.log( 1 + 0.0002 * countyVote[ 6 ] ) || 0;

			if ( countyVote[ 6 ] > 0 ) {

				const pointsOther = [ v2( 0, 0 ), v2( 0.1 * total, voteOther ), v2( 0, voteOther - 0.03 ) ];
				const geometryOther = new THREE.LatheBufferGeometry( pointsOther, 7 );
				const vertexOther = GJS.latLonToXYZ( 50, + fip[ 8 ], + fip[ 9 ] );
				geometryOther.rotateX( 0.5 * Math.PI );
				geometryOther.lookAt( vertexOther );
				geometryOther.translate( vertexOther.x, vertexOther.y, vertexOther.z );

				geometriesOther.push( geometryOther );
			}
			indexOther.push( countyVote );


		}

	} );

	const bufferGeometryDem = THREE.BufferGeometryUtils.mergeBufferGeometries( geometriesDem );
	const materialDem = new THREE.MeshPhongMaterial( { color: 0x0015BC } );
	const meshDem = new THREE.Mesh( bufferGeometryDem, materialDem );
	meshDem.name = "democrat";
	//mesh.receiveShadow = true;
	//mesh.castShadow = true;
	UFR.counties.add( meshDem );

	const bufferGeometryRep = THREE.BufferGeometryUtils.mergeBufferGeometries( geometriesRep );
	const materialRep = new THREE.MeshPhongMaterial( { color: 0xDE0100 } );
	const meshRep = new THREE.Mesh( bufferGeometryRep, materialRep );
	meshRep.name = "republican";
	//meshRep.receiveShadow = true;
	//meshRep.castShadow = true;
	UFR.counties.add( meshRep );

	if ( geometriesOther.length ) {

		const bufferGeometryOther = THREE.BufferGeometryUtils.mergeBufferGeometries( geometriesOther );
		const materialOther = new THREE.MeshPhongMaterial( { color: 0x008080 } );
		const meshOther = new THREE.Mesh( bufferGeometryOther, materialOther );
		meshOther.name = "other";
		//meshOther.receiveShadow = true;
		//meshOther.castShadow = true;
		UFR.counties.add( meshOther );
	}



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
Votes All: ${ votesAll.length.toLocaleString() }<br>
Votes ${ selYear.value }: ${ votesYear.length.toLocaleString() }<br>
Displayed: ${ indexDem.length.toLocaleString() }<br>
`;

	divLog.innerHTML = htm;

	setStatsVote();

}



RAY.getHtm = function ( intersected ) {
	//console.log( "intersected", intersected.object.name );

	let item;
	let index = intersected.faceIndex;

	for ( item = 0; item <= indexDem.length; item++ ) {

		const limit = item * 28;

		if ( index < limit ) { break; }

	}

	const countyVote = indexDem[ item - 1 ];
	//console.log( "countyVote", countyVote );

	yearPrevious = ( -4 + ( + selYear.value ) ) + "";

	if ( yearPrevious ) {

		votesYearPrev = votesAll.find( vote => vote[ 0 ] === yearPrevious && vote[ 1 ] === countyVote[ 1 ] );

		//console.log( "votesYearPrev", votesYearPrev, yearPrevious );

	}

	const htm = `
<div>
	<a href="https://www.google.com/search?q=FIPS+${ countyVote[ 1 ] }" target="_blank"><img width="14" src="https://theo-armour.github.io/2020/lib/icons/icon-link-external.svg"> FIPS: ${ countyVote[ 1 ] }</a><br>
	County: ${ countyVote[ 3 ] } ~ ${ countyVote[ 2 ] }<br>
	Year: ${ countyVote[ 0 ] } <br>
	Total: ${ ( + countyVote[ 7 ] ).toLocaleString() }<br>
	Democrat: ${ ( + countyVote[ 4 ] ).toLocaleString() } <br>
	Republican: ${ ( + countyVote[ 5 ] ).toLocaleString() }<br>
	Other: ${ ( + countyVote[ 6 ] ).toLocaleString() }<br>
	<hr>
	Year: ${ yearPrevious } <br>
	Total: ${ ( + votesYearPrev[ 7 ] ).toLocaleString() }<br>
	Democrat: ${ ( + votesYearPrev[ 4 ] ).toLocaleString() } <br>
	Republican: ${ ( + votesYearPrev[ 5 ] ).toLocaleString() }<br>
	Other: ${ ( + votesYearPrev[ 6 ] ).toLocaleString() }<br>



</div>`;

	return htm;

};



function setStatsVote () {

	flipSticks = new THREE.Group();

	const flipsDem = [];
	const flipsRep = [];
	const fipsCounted = [];
	const yearPrevious = ( -4 + ( + selYear.value ) );

	if ( yearPrevious > 1996 ) {

		const votesYearPrev = votesAll.filter( vote => ( + vote[ 0 ] ) === yearPrevious );

		//console.log( "votesYearPrev", votesYearPrev );

		votesYear.forEach( voteYear => {

			const fip = voteYear[ 1 ];

			if ( !fipsCounted.includes( fip ) ) {

				fipsCounted.push( fip );

				const vote = votesYear.find( vote => vote[ 1 ] === fip );
				//console.log( "vote", vote );
				//const demsYF = votesYearFip[ 0 ];
				//const repsYF = votesYearFip[ 1 ];

				const v1 = ( + vote[ 4 ] ) > ( + vote[ 5 ] );
				//console.log( "v1", v1 );

				const votePrev = votesYearPrev.find( vote => vote[ 1 ] === fip );
				//console.log( "votePrev", votePrev, fip );

				if ( votePrev ) {

					//const demsYPF = votesYearPreviousFip[ 0 ] || 1;
					//const repsYPF = votesYearPreviousFip[ 1 ] || 1;

					const v2 = ( + votePrev[ 4 ] ) > ( + votePrev[ 5 ] );
					//console.log( "v2", v2 );

					if ( v1 && !v2 ) {
						//console.log( fip, demsYF[ 8 ], repsYF[ 8 ] );
						//console.log( "! d>r", demsYPF[ 8 ], repsYPF[ 8 ] );
						flipsDem.push( fip );
					}

					if ( !v1 && v2 ) {
						//console.log( fip, demsYF[ 8 ], repsYF[ 8 ] );
						//console.log( "! d>r", demsYPF[ 8 ], repsYPF[ 8 ] );
						flipsRep.push( fip );
					}

				}
			}

		} );

		//console.log( "flipsDem", flipsDem );
		const geometry = new THREE.SphereBufferGeometry( 1 );
		let material = new THREE.MeshStandardMaterial( { color: 0x00aaff, emissive: 0x444444 } );

		flipsDem.forEach( fip => {

			const fipRec = UFR.fips.find( fipX => fip === fipX[ 4 ] ); //.slice( -5 ) );
			//console.log( "fipRec", fip, fipRec, );

			if ( fipRec ) {

				const vote = indexDem.find( item => fip === item[ 1 ] );
				//console.log( "vote", vote[ 9 ] );
				const total = vote[ 7 ];

				delta = Math.log( 1 + 0.0002 * total ) || 0;
				scl = 0.05 * Math.log( 1 + 0.0002 * total ) || 0;

				const mesh = new THREE.Mesh( geometry, material );
				const vert = GJS.latLonToXYZ( 50 + 1 * delta, + fipRec[ 8 ], + fipRec[ 9 ] );
				mesh.lookAt( vert );
				mesh.position.copy( vert );
				mesh.scale.set( scl, scl, 10 * scl );

				flipSticks.add( mesh );

			}

		} );


		material = new THREE.MeshStandardMaterial( { color: 0xDE0100, emissive: 0x888888 } );

		flipsRep.forEach( fip => {

			const fipRec = UFR.fips.find( fipX => fip === fipX[ 4 ] ); //.slice( -5 ) );
			//console.log( "fipRec", fip, fipRec, );

			if ( fipRec ) {

				const vote = indexRep.find( item => fip === item[ 1 ] );
				//console.log( "vote", vote[ 9 ] );
				const total = vote[ 7 ];

				delta = Math.log( 1 + 0.0002 * total ) || 0;
				scl = 0.05 * Math.log( 1 + 0.0002 * total ) || 0;

				const mesh = new THREE.Mesh( geometry, material );
				const vert = GJS.latLonToXYZ( 50 + 1 * delta, + fipRec[ 8 ], + fipRec[ 9 ] );
				mesh.lookAt( vert );
				mesh.position.copy( vert );
				mesh.scale.set( scl, scl, 10 * scl );
				flipSticks.add( mesh );

			}

		} );

		scene.add( flipSticks );
		//console.log( "flips", flips );

	} else {

		alert( "No data for previous year" );
	}

	const votes = indexDem.reduce( ( total, num ) => total + ( + num[ 7 ] ), 0 );
	const dems = indexDem.reduce( ( total, num ) => total + ( + num[ 4 ] ), 0 );
	const reps = indexRep.reduce( ( total, num ) => total + ( + num[ 5 ] ), 0 );
	const other = indexOther.reduce( ( total, num ) => total + ( + num[ 6 ] ), 0 );


	const demWin = indexDem.filter( ( vote, index ) => vote[ 4 ] > vote[ 5 ] );
	const repWin = indexRep.filter( ( vote, index ) => vote[ 5 ] > vote[ 4 ] );

	const htm = `
FIPs: ${ UFR.fips.length.toLocaleString() }<br>
Counties: ${ indexDem.length.toLocaleString() }<br>
Votes: ${ votes.toLocaleString() }<br>
Democrats: ${ dems.toLocaleString() }<br>
Dem Win: ${ demWin.length.toLocaleString() }<br>
Republicans: ${ reps.toLocaleString() }<br>
Rep Win: ${ repWin.length.toLocaleString() }<br>
Other: ${ other.toLocaleString() }<br>
FlipDems: ${ flipsDem.length }<br>
FlipReps: ${ flipsRep.length }<br>
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

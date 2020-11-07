
const UFR = {};


UFR.init = function () {

	requestFile( "../../assets/csv/usa-fips-jhu.csv", UFR.onLoadCsv );

};


UFR.onLoadCsv = function ( string ) {

	UFR.counties = new THREE.Group;

	UFR.lines = string.split( /\n/ ).map( line => line.split( "," ) ).slice( 8 );

	UFR.lines.forEach( line => {

		if ( line[ 4 ] && line[ 8 ] ) {

			const population = Math.sqrt( 0.00001 * line[ 13 ] );

			//const geometry = new THREE.BoxGeometry( 0.1, 0.1, population );
			//CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )

			const geometry = new THREE.CylinderGeometry( 0.1, 0, population, 3, 1, false );
			geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );

			const material = new THREE.MeshNormalMaterial();
			const mesh = new THREE.Mesh( geometry, material );
			mesh.userData = line;

			mesh.position.set( + line[ 9 ], + line[ 8 ], 0.5 * population );
			//console.log( "", mesh.position );
			//counties.add( mesh )
			UFR.counties.add( mesh );

		}

	} );

	scene.add( UFR.counties );

	RAY.intersectObjects = UFR.counties.children;

	RAY.addMouseMove();

};
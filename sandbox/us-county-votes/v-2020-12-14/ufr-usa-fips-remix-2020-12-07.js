
const UFR = {

	counties: new THREE.Group

};

UFR.init = function () {

	requestFile( "../../../assets/csv/usa-fips-jhu.csv", UFR.onLoadCsv );


};


UFR.onLoadCsv = function ( string ) {

	UFR.fips = string.split( /\n/ ).map( line => line.split( "," ) ).slice( 8 );

	//UFR.fips.forEach( fip => fip[ 4 ] = "0" + fip[ 4 ].slice( - 5 ) );

};
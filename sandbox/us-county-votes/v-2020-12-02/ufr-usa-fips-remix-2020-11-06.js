
const UFR = {

	counties: new THREE.Group

};

UFR.init = function () {

	requestFile( "../../../assets/csv/usa-fips-jhu.csv", UFR.onLoadCsv );


};


UFR.onLoadCsv = function ( string ) {

	UFR.lines = string.split( /\n/ ).map( line => line.split( "," ) ).slice( 8 );

};
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://theo-armour.github.io/2020/apps/us-census-bureau-tracts-ca/readme.html "View file as a web page." ) </span>

<div><input type=button onclick=window.location.href="https://github.com/theo-armour/2020/tree/master/apps/us-census-bureau-tracts-ca";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>


# [USA Census Bureau Tracts Read Me]( https://theo-armour.github.io/2020/apps/us-census-bureau-tracts-ca/readme.html )

<!--@@@
<iframe src=https://theo-armour.github.io/2020/apps/us-census-bureau-tracts-ca/ height=500px width=100% ></iframe>
_USA Census Bureau Tracts_
@@@-->

### Full Screen: [USA Census Bureau Tracts]( https://theo-armour.github.io/2020/apps/us-census-bureau-tracts-ca/ )


## Concept

_In the old days there were preliminary sketches on envelopes and you had to imagine what the design would really look like. Now there are designs on screens and you have to imagine how very sketchy and preliminary they are. 
;-)_

Mission

* To provide fast, easy and free access to large quantities of regional data
* Display data at macro and micro levels
* Link data sets to online, public, authoritative data sources 


Vision

* People can see nuanced data rather than reductionist data
* People sre able to identify locations where resources are needed by type, quantity and timelime



2020-06-29 Features

This version does not add new data sets but does have a number of user experience updates

Displaying thousands of data points is tricky. The normal method is to bulk numbers of points together. The issue can be that you lose subtlety. In this version, there is slider to scale the size of the data points - allowing for larger points that you can see when you zoom out and space between the points when you zoom in


* Data for 8,057 US census tracts. Heights indicate density per square kilometer.
* Use fingers or pointing device to to zoom, pan and rotate. 
* Click on a data point to view its details in a pop-up.
* Click the link in the pop-up to display the canonical US Census Bureau map for the tract.
* Use the slider to scale the data points so you may zoom in and see the detail.


2020-06-23 Features

* Begins to display population population density for each tract in California
* Numerous visible errors in gathering and parsing data remain to be resolved
* Building expertise in gathering data from https://data.census.gov/cedsci/

2020-06-21 Features

* Access, parse and display in 3D the data in 2019_gaz_tracts_06.txt - 8,058 records
* Access, parse and display in 3D the data in 2019_gaz_place_06.txt - 1,522 records
* Menu buttons toggle visibility of the two data sets
* Mouse over a data point to display its raw data in a pop-up


</details>

## To do and wish list

* 2020-06-30 ~ Locate a higher resolution geoJSON file for California.
* 2020-06-30 ~ Build up a functioning workflow for gathering and displaying census tract data
* 2020-06-30 ~ Find a source for COVID-19 census tract data
    * For an examples, see https://data.sfgov.org/stories/s/adm5-wq8i/
* Using height, color, opacity and shapes enable each data point to display a number nuanced values
* Add in the usual bag of tricks to help speed up the display on older devices 
* Add county name titles


## Issues




##  Links of interest

USA Census Bureau Data

* https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html
* https://www.census.gov/programs-surveys/geography/technical-documentation/records-layout/gaz-record-layouts.html
* * https://data.census.gov/cedsci/table

Urban Footprint

* https://urbanfootprint.com/
* https://techcrunch.com/2020/02/12/taking-a-page-from-simcity-urbanfootprint-pitches-new-tools-for-developers-and-urban-planners/
* https://medium.com/urbanfootprint



## Change log

### 2020-06-29

* Move to apps
* Start move to lib
* Many new features


### 2020-06-23

* Add population and population density data
* Errors in gathering or parsing a number of data points: to be resolves  
* Building expertise in gathering data from https://data.census.gov/cedsci/

Started

* Need links to useful sources Census tract data



### 2020-06-21

* First commit

</details>

***

<center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=font-size:2ch;text-decoration:none; > ❦ </a></center>

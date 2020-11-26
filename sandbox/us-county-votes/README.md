<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://theo-armour.github.io/2020/sandbox/us-county-votes/readme.html  "View file as a web page." ) </span>

<div><input type=button onclick=window.top.location.href="https://github.com/theo-armour/2020/tree/master/sandbox/us-county-votes/";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>


# [US County Votes Read Me]( https://theo-armour.github.io/2020/sandbox/us-county-votes/readme.html )

<!--@@@
<div style=height:500px;overflow:hidden;width:100%;resize:both; ><iframe src="https://theo-armour.github.io/2020/sandbox/us-county-votes/" height=100% width=100% ></iframe></div>
_US County Votes in a resizable window. One finger to rotate. Two to zoom. Three to pan._
@@@-->

### Full Screen: [US County Votes]( https://theo-armour.github.io/2020/sandbox/us-county-votes/ )


## Concept

Mission

To display the changes in voting margins by party over a series of elections for every county in the USA

Vision

Where do we want this to go? and why?

## To Do / Wish List

* 2020-11-06 ~ Add buttons or sliders to select data from all the election years in the available data set
* 2020-11-06 ~ Add a range of colors to indicate the magnitude of the margins for the winning party in each county

## Issues

* 2020-11-06 ~ Currently only shows party voting data for 2018 with no indication of margin magnitude
* 2020-11-06 ~ The borders of some counties along the oceans are missing
* 2020-11-06 ~ The map projection is set for a spherical projection - causing the map to not look like a more normal mercator projection
* 2020-11-06 ~ The software is un-optimized amd may run quite slowly on a non-gaming computer

## Links of Interest

* https://www.fastcompany.com/90572489/u-s-election-maps-are-wildly-misleading-so-this-designer-fixed-them
* https://www.foxnews.com/politics/forget-traditional-election-maps-this-is-what-the-us-vote-really-looks-like
* https://www.reddit.com/r/Maps/comments/jplarw/counties_that_flipped_in_the_2020_us_presidential/
* https://www.latimes.com/projects/trump-biden-election-results-california

## Change Log

### 2020-11-25

* Shift to spherical coordinates
* Slow down rotate speed

### 2020-11-24

Differentiating the vote using color is problematic. Using geometry is preferred.
The over-arching goal always: you understand the map without having to look at the legend.

* height of bars is dem or rep vote - scaled exponentially
* top width of bar total number of votes in county - scaled exponentially
* Add lights
* Switch from basic to phong material
* Set focus to select year - enable easy use of cursor keys

### 2020-11-17

* Add color varies RGB( %rep, 0, %dem)
* Add years 2010 to 2018;


### 2020-11-06

* First commit


***

<center title="hello! Click me to go up to the top" ><a href=javascript:window.scrollTo(0,0); style=font-size:2ch;text-decoration:none; > ❦ </a></center>

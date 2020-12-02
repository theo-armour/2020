<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://theo-armour.github.io/2020/sandbox/us-county-votes/readme.html  "View file as a web page." ) </span>

<div><input type=button onclick=window.top.location.href="https://github.com/theo-armour/2020/tree/master/sandbox/us-county-votes/";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>


# [US County Votes Read Me]( https://github.com/theo-armour/2020/tree/master/sandbox/us-county-votes/ )

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

* Add indicators that show which counties have flipped since previous vote
* Add bitmap map underlay
* Show geoJSON in 3D
* Better and more authoritative statistics

## Issues


* 2020-11-06 ~ The borders of some counties along the oceans are missing
* 2020-11-06 ~ The software is un-optimized amd may run quite slowly on a non-gaming computer


## Links of Interest

* https://www.fastcompany.com/90572489/u-s-election-maps-are-wildly-misleading-so-this-designer-fixed-them
* https://www.foxnews.com/politics/forget-traditional-election-maps-this-is-what-the-us-vote-really-looks-like
* https://www.reddit.com/r/Maps/comments/jplarw/counties_that_flipped_in_the_2020_us_presidential/
* https://www.latimes.com/projects/trump-biden-election-results-california
* https://www.reddit.com/r/dataisbeautiful/comments/jrkoze/3d_map_of_covid_cases_by_population_march_through/
* https://www.reddit.com/r/bigdata/comments/jvdl6u/in_this_video_you_can_see_which_political_party/
* https://www.reddit.com/r/Maps/comments/jyb33n/as_a_nonamerican_this_was_pretty_eye_opening/



## Change Log

### 2020-12-02

* Rijigged the shape of the sticks (process was trickier than I thought )
* Rejigged pop-up text and menu text
* Slowed rotate speed

### 2020-12-01

Should load faster and use fewer resources ~ vbut lose variety of colors
Part way through adding a fuller user interface - should now work better on mobile phones
Starting to add usage text - see info button
3D experience needs a lot of work

Click setStats button to see how many frames per second
- Windows 10 with Nvidia graphics card - 60fps
- Chromebook ~ 23 fps
- Google Pixel 4 ~ 44 fps

### 2020-11-26

* Losers are dimmed
* Add links to links of interest
* Dems horizontal. Reps vertical
* Vertical scale set to logarithmic
* Colors are official party colors

Dealt with

* 2020-11-06 ~ Add buttons or sliders to select data from all the election years in the available data set
* 2020-11-06 ~ Add a range of colors to indicate the magnitude of the margins for the winning party in each county
* 2020-11-06 ~ Currently only shows party voting data for 2018 with no indication of margin magnitude
* 2020-11-06 ~ The map projection is set for a spherical projection - causing the map to not look like a more normal mercator projection

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

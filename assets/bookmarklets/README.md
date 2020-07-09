<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://theo-armour.github.io/2020/xxxxx/readme.html  "View file as a web page." ) </span>

<div><input type=button onclick=window.location.href="https://github.com/theo-armour/2020/tree/master/xxxxx/";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>


# [Bookmarklets Read Me]( ./readme.html )

<!--@@@
<div style=height:300px;overflow:hidden;width:100%;resize:both; ><iframe src=https://theo-armour.github.io/2020/assets/bookmarklets/bookmarklet/html  height=100% width=100% ></iframe></div>
_Bookmarklets_

### Full Screen: [Bookmarklets]( https://theo-armour.github.io/2020/assets/bookmarklets/bookmarklet/html )
@@@-->





## Concept

* Do things while visiting or "inside" a web page
* No need to open new tab
* No need to leave current view or tab

## Lessons learned

* Rename .js file to .html and it just runs
* Markdown may contain bookmarklets when included as HTML anchor items
* Arrow functions are OK in a bookmarklet
* You cannot use window.open to fetch a web page and then apply new CSS to the freshly loaded pages
	* It's a CORS thing

## Wish list

* How to launch a bookmarklet using the keyboard?



## Links of Interest


* <a href="javascript:void(document.body.style.backgroundColor='#444')" >background dark</a>
* <a href="javascript:popw='';Q='';x=document;y=window;if(x.selection) {Q=x.selection.createRange().text;} else if (y.getSelection) {Q=y.getSelection();} else if (x.getSelection) {Q=x.getSelection();}popw = y.open('https://mail.google.com/mail?view=cm&tf=0&to=&su=' + escape(document.title) + '&body=' + escape(Q) + escape('\n') + escape(location.href),'gmailForm','scrollbars=yes,width=680,height=510,top=175,left=75,status=no,resizable=yes');if (!document.all) T = setTimeout('popw.focus()',50);void(0);" >gmail this</a>
* <a href="javascript:( () => {const script=document.head.appendChild( document.createElement( 'script' ) );script.src='https://theo-armour.github.io/snippets/bookmarklets/bookmarklets/capture-bookmark.js';} )()" >cmpg</a>
* <a href='javascript:(function(){var e=[],t=document.getElementsByTagName("a"),n=t.length,r=window.open("","win","width=300,height=300");for(;n>0;n--){var i=t[n-1].getAttribute("href");t[n-1]!=null&amp;&amp;i!=null&amp;&amp;i.charAt(0)==="h"&amp;&amp;i.indexOf(window.location.hostname)==-1&amp;&amp;e.push("<li><a href="+i+">"+i+"</a></li>")}r.document.open("text/html","replace"),r.document.write("<h1>Links Found:</h1><ul>"+e.join("")+"</ul>")})()' >Get all external Links</a>
* <a href="JavaScript:( function() { document.body.style.backgroundColor='#444';})()" >try</a>



### Bookmarklet Portals

* https://gist.github.com/TheFrostlixen/9e5c66dc8916e95e6065
* http://tantek.com/favelets/ < many
* https://www.reddit.com/r/bookmarklets/comments/i79xp/what_are_your_favorite_bookmarklets_xpost/ < many
* https://www.labnol.org/internet/guide-to-useful-bookmarklets/7931/
* http://www.norcimo.com/fun/mozilla/mozbook.shtml
* http://jkirchartz.com/demos/bookmarklets.html
* https://github.com/marcobiedermann/awesome-bookmarklets
* http://defunkt.io/
* https://en.wikipedia.org/wiki/Bookmarklet
* http://zz85.github.io/zz85-bookmarklets/
* https://github.com/zz85/zz85-bookmarklets


### Change bookmark favicon

* https://beebom.com/how-change-bookmark-icons-chrome/
* https://superuser.com/questions/1053584/is-there-a-way-to-customise-bookmark-icons-in-chrome
* https://www.minterest.com/how-to-change-chrome-bookmark-icon/

### CORS

* https://developer.chrome.com/extensions/contentSecurityPolicy#relaxing

### Bookmarks

Chrome Bookmarks Recovery Tool
* C:\Users\%username%\AppData\Local\Google\Chrome\User Data into File Explorer.
* In search bar, type Bookmarks, you will see a list of files named Bookmarks and/or Bookmarks.bak.

Firefox
* %APPDATA%\Mozilla\Firefox\Profiles\
* Export as JSON

## Change Log


### 123

* First commit


***

<center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=font-size:2ch;text-decoration:none; > ❦ </a></center>

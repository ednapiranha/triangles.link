!function(t){function e(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return t[r].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="/",e(0)}([function(t,e,o){"use strict";o(1),o(29);var r=o(27);r.generateMountain()},function(t,e,o){var r=o(2);"string"==typeof r&&(r=[[t.id,r,""]]);o(5)(r,{});r.locals&&(t.exports=r.locals)},function(t,e,o){e=t.exports=o(3)(),e.push([t.id,"a,abbr,acronym,address,appvar,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,summary,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:LeagueSpartan-Bold;src:url("+o(4)+")}body{font-family:Arial,sans-serif;background:#ccc}header{position:fixed;z-index:20}header p{position:fixed;left:10px;top:10px;color:#fff;font-size:2rem;cursor:pointer}header p.active,header p:hover{color:#0ff}#menu{position:fixed;display:none;top:50px}#menu.active,#menu a{display:block}#menu a{background-color:rgba(1,1,1,.5);padding:2px 10px;color:#fff;text-decoration:none;font-size:.8rem;margin-bottom:1px;text-transform:uppercase;line-height:1.4rem}",""])},function(t,e){"use strict";t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var o=this[e];o[2]?t.push("@media "+o[2]+"{"+o[1]+"}"):t.push(o[1])}return t.join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},n=0;n<this.length;n++){var a=this[n][0];"number"==typeof a&&(r[a]=!0)}for(n=0;n<e.length;n++){var i=e[n];"number"==typeof i[0]&&r[i[0]]||(o&&!i[2]?i[2]=o:o&&(i[2]="("+i[2]+") and ("+o+")"),t.push(i))}},t}},function(t,e,o){t.exports=o.p+"bd703062f4a66991f9472b3634d82e92.woff"},function(t,e,o){function r(t,e){for(var o=0;o<t.length;o++){var r=t[o],n=u[r.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](r.parts[a]);for(;a<r.parts.length;a++)n.parts.push(s(r.parts[a],e))}else{for(var i=[],a=0;a<r.parts.length;a++)i.push(s(r.parts[a],e));u[r.id]={id:r.id,refs:1,parts:i}}}}function n(t){for(var e=[],o={},r=0;r<t.length;r++){var n=t[r],a=n[0],i=n[1],p=n[2],f=n[3],s={css:i,media:p,sourceMap:f};o[a]?o[a].parts.push(s):e.push(o[a]={id:a,parts:[s]})}return e}function a(t,e){var o=b(),r=v[v.length-1];if("top"===t.insertAt)r?r.nextSibling?o.insertBefore(e,r.nextSibling):o.appendChild(e):o.insertBefore(e,o.firstChild),v.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(e)}}function i(t){t.parentNode.removeChild(t);var e=v.indexOf(t);e>=0&&v.splice(e,1)}function p(t){var e=document.createElement("style");return e.type="text/css",a(t,e),e}function f(t){var e=document.createElement("link");return e.rel="stylesheet",a(t,e),e}function s(t,e){var o,r,n;if(e.singleton){var a=m++;o=x||(x=p(e)),r=d.bind(null,o,a,!1),n=d.bind(null,o,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=f(e),r=c.bind(null,o),n=function(){i(o),o.href&&URL.revokeObjectURL(o.href)}):(o=p(e),r=l.bind(null,o),n=function(){i(o)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else n()}}function d(t,e,o,r){var n=o?"":r.css;if(t.styleSheet)t.styleSheet.cssText=w(e,n);else{var a=document.createTextNode(n),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(a,i[e]):t.appendChild(a)}}function l(t,e){var o=e.css,r=e.media;e.sourceMap;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}function c(t,e){var o=e.css,r=(e.media,e.sourceMap);r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var n=new Blob([o],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(n),a&&URL.revokeObjectURL(a)}var u={},h=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},g=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),b=h(function(){return document.head||document.getElementsByTagName("head")[0]}),x=null,m=0,v=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=g()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var o=n(t);return r(o,e),function(t){for(var a=[],i=0;i<o.length;i++){var p=o[i],f=u[p.id];f.refs--,a.push(f)}if(t){var s=n(t);r(s,e)}for(var i=0;i<a.length;i++){var f=a[i];if(0===f.refs){for(var d=0;d<f.parts.length;d++)f.parts[d]();delete u[f.id]}}}};var w=function(){var t=[];return function(e,o){return t[e]=o,t.filter(Boolean).join("\n")}}()},,,,,,,function(t,e,o){t.exports=o.p+"f9d5c2e7545aaa75725029ef09be7715.svg"},function(t,e,o){t.exports=o.p+"1851f69545501c7f1ac48672c5062d9f.svg"},,,,,,,,,,,,,,function(t,e){"use strict";var o=(new Date).getHours();e.generateSky=function(){function t(){for(var t=0;i>=t;t+=i/6)for(var o=0;p>=o;o+=p/6){var r=void 0,n=void 0;r=t&&t!=i?t+(Math.floor(Math.random()*(i/4))-i/8):t,n=o&&o!=p?o+(Math.floor(Math.random()*(p/4))-p/8):o,s.push([r,n])}d=Delaunay.triangulate(s);for(var a=0;a<d.length;a+=3)e(a)}function e(t){var e=f.polygon([s[d[t]][0],s[d[t]][1],s[d[t+1]][0],s[d[t+1]][1],s[d[t+2]][0],s[d[t+2]][1]]).attr({fill:r()});e.centroid={x:(s[d[t]][0]+s[d[t+1]][0]+s[d[t+2]][0])/3,y:(s[d[t]][1]+s[d[t+1]][1]+s[d[t+2]][1])/3};var o=f.polygon(0,0,e.centroid.x,e.centroid.y,e.centroid.x+3,e.centroid.y+5).attr({fill:"rgba(255, 255, 255, 0.5)"});l.add(e,o)}function r(){var t=Math.floor(Math.random()*c)+u,e=Math.floor(Math.random()*h)+g;return"rgb("+t.toString()+", "+b+","+e.toString()+")"}function n(){return Math.floor(Math.random()*(d.length-2))}function a(){var t=document.querySelectorAll("#back polygon"),e=new TimelineLite;try{e.to(t[n()],.3,{fill:r(),onComplete:a})}catch(o){}}var i=1200,p=530,f=Snap("#back"),s=[],d=void 0,l=f.select('g[filter="url(#artifacts)"]'),c=void 0,u=void 0,h=void 0,g=void 0,b=void 0;o>=5&&8>o?(c=150,u=120,h=100,g=150,b=120):o>=8&&17>o?(c=70,u=60,h=100,g=210,b=185):o>=17&&21>o?(c=100,u=150,h=70,g=50,b=100):(c=50,u=20,h=70,g=50,b=10),f.attr({width:i,height:p}),t(),a()},e.generateMountain=function(){var t=Snap("#mountain"),e=void 0;e=o>=5&&9>o?"rgba(241, 203, 255, 0.6)":o>=9&&17>o?"rgba(229, 253, 255, 0.6)":o>=17&&21>o?"rgba(255, 197, 168, 0.6)":"rgba(157, 150, 213, 0.4)";var r=t.path("M10-15-10,5M5,0,0,15M0-5-20,15").attr({fill:"none",stroke:e,strokeWidth:25});r=r.pattern(0,5,25,10),t.paper.polygon("1118.6,428.7 1095.1,297.4 1003.5,150.5 903.7,176.6 813.3,88.6 663,99.1 550.3,0.6 398.8,121.4 333.1,88.6 222.8,212.4 167.5,176.6 71.3,275 0.8,451 1118.6,451").attr({fill:r})},e.generateLand=function(){var t=Snap("#land-upper"),e=void 0;e=o>=5&&9>o?"rgba(241, 203, 255, 0.9)":o>=9&&17>o?"rgba(189, 253, 255, 0.9)":o>=17&&21>o?"rgba(255, 197, 168, 0.9)":"rgba(157, 150, 213, 0.9)";var r=t.path("M10-15-20,10M15,20,10,5M0-15-30,15").attr({fill:"none",stroke:e,strokeWidth:55});r=r.pattern(0,15,25,10),t.paper.polygon("2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500").attr({fill:r}),t=Snap("#land-lower"),e=o>=5&&9>o?"rgba(141, 203, 255, 0.95)":o>=9&&17>o?"rgba(179, 143, 145, 0.95)":o>=17&&21>o?"rgba(155, 197, 168, 0.95)":"rgba(157, 150, 213, 0.9)",r=t.path("M10-35-20,5M15,20,50,25M10-5-20,15").attr({fill:"none",stroke:e,strokeWidth:45}),r=r.pattern(0,15,25,10),t.paper.polygon("2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500").attr({fill:r})},e.generateMining=function(){var t=Snap("#mining"),e=void 0;e=o>=5&&9>o?"rgba(141, 143, 215, 0.95)":o>=9&&17>o?"rgba(59, 143, 135, 0.95)":o>=17&&21>o?"rgba(25, 177, 168, 0.95)":"rgba(57, 150, 213, 0.9)";var r=t.path("M10-5-20,15M5,20,10,5M0-15-20,15").attr({fill:"none",stroke:e,strokeWidth:45});r=r.pattern(0,5,15,25),t.paper.polygon("0,146.2 0,80 143,80 468,122.4 628,80 903,106.5 1083,80 1288,106.5 1453,80 1678,106.5 1833,80 2033,106.5 2143,80 2400,106.5 2400,1680 0,1680 0,106.5").attr({fill:r})}},,function(t,e,o){var r=o(30);"string"==typeof r&&(r=[[t.id,r,""]]);o(5)(r,{});r.locals&&(t.exports=r.locals)},function(t,e,o){e=t.exports=o(3)(),e.push([t.id,"body,html{height:100%}body{background:linear-gradient(to bottom,#3ec7b8 0,#883ec7 50%,#c73eb2 81%,#111 100%);position:relative}#mountain{width:1200px;height:445px;position:fixed;left:90px;bottom:0;z-index:1;filter:drop-shadow(0 0 1px rgba(243,29,230,.5))\n        drop-shadow(0 0 3px rgba(1,1,255,.5))\n        drop-shadow(0 0 5px rgba(243,29,230,.5))\n        drop-shadow(0 0 8px rgba(243,29,230,.5));-webkit-filter:drop-shadow(0 0 1px rgba(243,29,230,.5))\n        drop-shadow(0 0 3px rgba(1,1,255,.5))\n        drop-shadow(0 0 5px rgba(243,29,230,.5))\n        drop-shadow(0 0 8px rgba(243,29,230,.5))}#title{font-size:3rem;font-weight:700;color:hsla(0,0%,100%,.9);position:absolute;top:-5px;left:0}.instructions{width:300px;padding:20px 10px;font-size:1rem;line-height:1.3rem;color:hsla(0,0%,100%,.7);position:fixed;top:0;right:0;z-index:5}.instructions h2{font-size:2rem;margin:10px 0;text-transform:uppercase;color:hsla(0,0%,100%,.5);font-family:LeagueSpartan-Bold}.instructions li{margin-bottom:20px;color:hsla(0,0%,100%,.7)}.instructions span:before{content:' '}.instructions span.boxes:after{content:'';width:30px;height:30px;background:transparent url("+o(13)+") no-repeat;display:inline-block;filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #f31de6)\n        drop-shadow(0 0 8px rgba(243,29,230,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #f31de6)\n        drop-shadow(0 0 8px rgba(243,29,230,.5))}.instructions span.lava:after{content:'';width:30px;height:30px;background:transparent url("+o(12)+") no-repeat;display:inline-block}.login{float:right;padding:10px}section{margin:50px 70px 0 100px;height:100%}h1{font-size:2rem;font-weight:100;margin-bottom:20px;font-family:LeagueSpartan-Bold;color:hsla(0,0%,100%,.5);text-transform:uppercase}.form,.instructions{background:repeating-linear-gradient(45deg,rgba(2,2,2,.7),rgba(2,2,2,.7) 3px,rgba(3,3,3,.6) 5px,rgba(4,4,4,.6) 3px);display:block;color:#fff;position:absolute}.form{margin:50px 10px 0 120px;padding:20px 10px;color:hsla(0,0%,100%,.7)}.home.form{margin:50px 0 0;position:absolute;z-index:5;height:190px;width:300px}.home.form input{width:110px}.group{float:left;margin:10px}.form h1{margin-bottom:10px;font-size:1.5rem}.form h2{margin:20px 0 5px}form h2{margin:25px 0 5px;font-size:1.1rem}form a{color:#fff}form a.forgot{display:block;margin:10px 0}input{border:1px solid #39a8a9;padding:2px;font-size:1.1rem}button{font-size:1.3rem;padding:5px 10px;background-color:#02d8db;color:#135051;border:0}@media (max-width:705px){.instructions{left:0;top:300px}.form{margin:80px 0 0;float:left}.form input{max-width:150px}}.worlds{height:100%}.worlds li{float:left;margin:10px}.world{display:flex;align-items:center;justify-content:center;text-align:center;background-image:url("+o(31)+");background-repeat:no-repeat;width:150px;height:150px;filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 2px #fff)\n        drop-shadow(0 0 5px #875bff)\n        drop-shadow(0 0 8px rgba(0,91,255,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 2px #fff)\n        drop-shadow(0 0 5px #875bff)\n        drop-shadow(0 0 8px rgba(0,91,255,.5))}.worlds li:hover .world{filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 10px #fff)\n        drop-shadow(0 0 12px rgba(0,91,255,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 10px #fff)\n        drop-shadow(0 0 12px rgba(0,91,255,.5))}.worlds a{text-decoration:none}.worlds span{display:block;width:100px;overflow:hidden;text-overflow:ellipsis}",""])},function(t,e,o){t.exports=o.p+"977172153f695d3810e2db2e1b9e8636.svg"}]);
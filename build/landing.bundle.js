!function(t){function e(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="/",e(0)}([function(t,e,r){"use strict";r(1),r(29);var o=r(27);o.generateMountain()},function(t,e,r){var o=r(2);"string"==typeof o&&(o=[[t.id,o,""]]);r(5)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,r){e=t.exports=r(3)(),e.push([t.id,"a,abbr,acronym,address,appvar,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,summary,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:LeagueSpartan-Bold;src:url("+r(4)+")}body{font-family:Arial,sans-serif;background:#ccc}header{position:fixed;z-index:20}header p{position:fixed;left:10px;top:10px;color:#fff;font-size:2rem;cursor:pointer}header p.active,header p:hover{color:#0ff}#menu{position:fixed;display:none;top:50px}#menu.active,#menu a{display:block}#menu a{background-color:rgba(1,1,1,.5);padding:2px 10px;color:#fff;text-decoration:none;font-size:.8rem;margin-bottom:1px;text-transform:uppercase;line-height:1.4rem}",""])},function(t,e){"use strict";t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var r=this[e];r[2]?t.push("@media "+r[2]+"{"+r[1]+"}"):t.push(r[1])}return t.join("")},t.i=function(e,r){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},n=0;n<this.length;n++){var a=this[n][0];"number"==typeof a&&(o[a]=!0)}for(n=0;n<e.length;n++){var i=e[n];"number"==typeof i[0]&&o[i[0]]||(r&&!i[2]?i[2]=r:r&&(i[2]="("+i[2]+") and ("+r+")"),t.push(i))}},t}},function(t,e,r){t.exports=r.p+"bd703062f4a66991f9472b3634d82e92.woff"},function(t,e,r){function o(t,e){for(var r=0;r<t.length;r++){var o=t[r],n=u[o.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](o.parts[a]);for(;a<o.parts.length;a++)n.parts.push(f(o.parts[a],e))}else{for(var i=[],a=0;a<o.parts.length;a++)i.push(f(o.parts[a],e));u[o.id]={id:o.id,refs:1,parts:i}}}}function n(t){for(var e=[],r={},o=0;o<t.length;o++){var n=t[o],a=n[0],i=n[1],p=n[2],s=n[3],f={css:i,media:p,sourceMap:s};r[a]?r[a].parts.push(f):e.push(r[a]={id:a,parts:[f]})}return e}function a(t,e){var r=b(),o=v[v.length-1];if("top"===t.insertAt)o?o.nextSibling?r.insertBefore(e,o.nextSibling):r.appendChild(e):r.insertBefore(e,r.firstChild),v.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");r.appendChild(e)}}function i(t){t.parentNode.removeChild(t);var e=v.indexOf(t);e>=0&&v.splice(e,1)}function p(t){var e=document.createElement("style");return e.type="text/css",a(t,e),e}function s(t){var e=document.createElement("link");return e.rel="stylesheet",a(t,e),e}function f(t,e){var r,o,n;if(e.singleton){var a=x++;r=m||(m=p(e)),o=l.bind(null,r,a,!1),n=l.bind(null,r,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=s(e),o=c.bind(null,r),n=function(){i(r),r.href&&URL.revokeObjectURL(r.href)}):(r=p(e),o=d.bind(null,r),n=function(){i(r)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else n()}}function l(t,e,r,o){var n=r?"":o.css;if(t.styleSheet)t.styleSheet.cssText=y(e,n);else{var a=document.createTextNode(n),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(a,i[e]):t.appendChild(a)}}function d(t,e){var r=e.css,o=e.media;e.sourceMap;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}function c(t,e){var r=e.css,o=(e.media,e.sourceMap);o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var n=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(n),a&&URL.revokeObjectURL(a)}var u={},h=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},g=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),b=h(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,x=0,v=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=g()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var r=n(t);return o(r,e),function(t){for(var a=[],i=0;i<r.length;i++){var p=r[i],s=u[p.id];s.refs--,a.push(s)}if(t){var f=n(t);o(f,e)}for(var i=0;i<a.length;i++){var s=a[i];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete u[s.id]}}}};var y=function(){var t=[];return function(e,r){return t[e]=r,t.filter(Boolean).join("\n")}}()},,,,,,,function(t,e,r){t.exports=r.p+"f9d5c2e7545aaa75725029ef09be7715.svg"},function(t,e,r){t.exports=r.p+"1851f69545501c7f1ac48672c5062d9f.svg"},,,,,,,,,,,,,,function(t,e){"use strict";var r=(new Date).getHours();e.generateSky=function(){function t(){for(var t=0;i>=t;t+=i/6)for(var r=0;p>=r;r+=p/6){var o=void 0,n=void 0;o=t&&t!=i?t+(Math.floor(Math.random()*(i/4))-i/8):t,n=r&&r!=p?r+(Math.floor(Math.random()*(p/4))-p/8):r,f.push([o,n])}l=Delaunay.triangulate(f);for(var a=0;a<l.length;a+=3)e(a)}function e(t){var e=s.polygon([f[l[t]][0],f[l[t]][1],f[l[t+1]][0],f[l[t+1]][1],f[l[t+2]][0],f[l[t+2]][1]]).attr({fill:o()});e.centroid={x:(f[l[t]][0]+f[l[t+1]][0]+f[l[t+2]][0])/3,y:(f[l[t]][1]+f[l[t+1]][1]+f[l[t+2]][1])/3};var r=s.polygon(0,0,e.centroid.x,e.centroid.y,e.centroid.x+3,e.centroid.y+5).attr({fill:"rgba(255, 255, 255, 0.5)"});d.add(e,r)}function o(){var t=Math.floor(Math.random()*c)+u,e=Math.floor(Math.random()*h)+g;return"rgb("+t.toString()+", "+b+","+e.toString()+")"}function n(){return Math.floor(Math.random()*(l.length-2))}function a(){var t=document.querySelectorAll("#back polygon"),e=new TimelineLite;try{e.to(t[n()],.3,{fill:o(),onComplete:a})}catch(r){}}var i=1200,p=530,s=Snap("#back"),f=[],l=void 0,d=s.select('g[filter="url(#artifacts)"]'),c=void 0,u=void 0,h=void 0,g=void 0,b=void 0;r>=5&&8>r?(c=150,u=120,h=100,g=150,b=120):r>=8&&17>r?(c=70,u=60,h=100,g=210,b=185):r>=17&&21>r?(c=100,u=150,h=70,g=50,b=100):(c=50,u=20,h=70,g=50,b=10),s.attr({width:i,height:p}),t(),a()},e.generateMountain=function(){var t=Snap("#mountain"),e=void 0;e=r>=5&&9>r?"rgba(241, 203, 255, 0.6)":r>=9&&17>r?"rgba(229, 253, 255, 0.6)":r>=17&&21>r?"rgba(255, 197, 168, 0.6)":"rgba(157, 150, 213, 0.4)";var o=t.path("M10-15-10,5M5,0,0,15M0-5-20,15").attr({fill:"none",stroke:e,strokeWidth:25});o=o.pattern(0,5,25,10),t.paper.polygon("1118.6,428.7 1095.1,297.4 1003.5,150.5 903.7,176.6 813.3,88.6 663,99.1 550.3,0.6 398.8,121.4 333.1,88.6 222.8,212.4 167.5,176.6 71.3,275 0.8,451 1118.6,451").attr({fill:o})},e.generateLand=function(){var t=Snap("#land-upper"),e=void 0;e=r>=5&&9>r?"rgba(241, 203, 255, 0.9)":r>=9&&17>r?"rgba(189, 253, 255, 0.9)":r>=17&&21>r?"rgba(255, 197, 168, 0.9)":"rgba(157, 150, 213, 0.9)";var o=t.path("M10-15-20,10M15,20,10,5M0-15-30,15").attr({fill:"none",stroke:e,strokeWidth:55});o=o.pattern(0,15,25,10),t.paper.polygon("2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500").attr({fill:o}),t=Snap("#land-lower"),e=r>=5&&9>r?"rgba(141, 203, 255, 0.95)":r>=9&&17>r?"rgba(179, 143, 145, 0.95)":r>=17&&21>r?"rgba(155, 197, 168, 0.95)":"rgba(157, 150, 213, 0.9)",o=t.path("M10-35-20,5M15,20,50,25M10-5-20,15").attr({fill:"none",stroke:e,strokeWidth:45}),o=o.pattern(0,15,25,10),t.paper.polygon("2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500").attr({fill:o})},e.generateMining=function(){var t=Snap("#mining"),e=void 0;e=r>=5&&9>r?"rgba(141, 143, 215, 0.95)":r>=9&&17>r?"rgba(59, 143, 135, 0.95)":r>=17&&21>r?"rgba(25, 177, 168, 0.95)":"rgba(57, 150, 213, 0.9)";var o=t.path("M10-5-20,15M5,20,10,5M0-15-20,15").attr({fill:"none",stroke:e,strokeWidth:45});o=o.pattern(0,5,15,25),t.paper.polygon("0,146.2 0,80 143,80 468,122.4 628,80 903,106.5 1083,80 1288,106.5 1453,80 1678,106.5 1833,80 2033,106.5 2143,80 2400,106.5 2400,1680 0,1680 0,106.5").attr({fill:o})}},,function(t,e,r){var o=r(30);"string"==typeof o&&(o=[[t.id,o,""]]);r(5)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,r){e=t.exports=r(3)(),e.push([t.id,"body,html{height:100%}body{background:linear-gradient(180deg,#3ec7b8 0,#883ec7 50%,#c73eb2 81%,#111);position:relative}#mountain{width:1200px;height:445px;position:fixed;left:90px;bottom:0;z-index:1;filter:drop-shadow(0 0 1px rgba(243,29,230,.5))\n        drop-shadow(0 0 3px rgba(1,1,255,.5))\n        drop-shadow(0 0 5px rgba(243,29,230,.5))\n        drop-shadow(0 0 8px rgba(243,29,230,.5));-webkit-filter:drop-shadow(0 0 1px rgba(243,29,230,.5))\n        drop-shadow(0 0 3px rgba(1,1,255,.5))\n        drop-shadow(0 0 5px rgba(243,29,230,.5))\n        drop-shadow(0 0 8px rgba(243,29,230,.5))}#title{font-size:3rem;font-weight:700;color:hsla(0,0%,100%,.9);position:absolute;top:-5px;left:0}.instructions{width:300px;padding:20px 10px;font-size:1rem;line-height:1.3rem;color:hsla(0,0%,100%,.7);position:fixed;top:0;right:0;z-index:5}.instructions h2{font-size:2rem;margin:10px 0;text-transform:uppercase;color:hsla(0,0%,100%,.5);font-family:LeagueSpartan-Bold}.instructions li{margin-bottom:20px;color:hsla(0,0%,100%,.7)}.instructions span:before{content:' '}.instructions span.boxes:after{content:'';width:30px;height:30px;background:transparent url("+r(13)+") no-repeat;display:inline-block;filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #f31de6)\n        drop-shadow(0 0 8px rgba(243,29,230,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #f31de6)\n        drop-shadow(0 0 8px rgba(243,29,230,.5))}.instructions span.lava:after{content:'';width:30px;height:30px;background:transparent url("+r(12)+") no-repeat;display:inline-block}.login{float:right;padding:10px}section{margin:50px 70px 0 100px;height:100%}h1{font-size:2rem;font-weight:100;margin-bottom:20px;font-family:LeagueSpartan-Bold;color:hsla(0,0%,100%,.5);text-transform:uppercase}.form,.instructions{background:repeating-linear-gradient(45deg,rgba(2,2,2,.7),rgba(2,2,2,.7) 3px,rgba(3,3,3,.6) 5px,rgba(4,4,4,.6) 0);display:block;color:#fff;position:absolute}.form{margin:50px 10px 0 120px;padding:20px 10px;color:hsla(0,0%,100%,.7)}.home.form{margin:50px 0 0;position:absolute;z-index:5;height:190px;width:300px}.home.form input{width:110px}.group{float:left;margin:10px}.form h1{margin-bottom:10px;font-size:1.5rem}.form h2{margin:20px 0 5px}form h2{margin:25px 0 5px;font-size:1.1rem}form a{color:#fff}form a.forgot{display:block;margin:10px 0}input{border:1px solid #39a8a9;padding:2px;font-size:1.1rem}button{font-size:1.3rem;padding:5px 10px;background-color:#02d8db;color:#135051;border:0}@media (max-width:705px){.instructions{left:0;top:300px}.form{margin:80px 0 0;float:left}.form input{max-width:150px}}",""])}]);
!function(e){function t(a){if(o[a])return o[a].exports;var r=o[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="/",t(0)}([function(e,t,o){"use strict";o(1),o(6);var a=o(25),r=o(27),n=o(26),i=o(28),d=document.body.getAttribute("data-owner"),s=io();i.generate(),a.assignRoom(s),a.setChat(s),r.generateSky(),r.generateMountain(),r.generateLand(),r.generateMining(),a.getCollection(s),"true"===d&&(a.setMining(s),n.setVehicle(s),a.getBuildables(s))},function(e,t,o){var a=o(2);"string"==typeof a&&(a=[[e.id,a,""]]);o(5)(a,{});a.locals&&(e.exports=a.locals)},function(e,t,o){t=e.exports=o(3)(),t.push([e.id,"a,abbr,acronym,address,appvar,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,summary,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:LeagueSpartan-Bold;src:url("+o(4)+")}body{font-family:Arial,sans-serif;background:#ccc}header{position:fixed;z-index:20}header p{position:fixed;left:10px;top:10px;color:#fff;font-size:2rem;cursor:pointer}header p.active,header p:hover{color:#111}#menu{position:fixed;display:none;top:50px}#menu.active,#menu a{display:block}#menu a{background-color:rgba(1,1,1,.5);padding:2px 10px;color:#fff;text-decoration:none;font-size:.8rem;margin-bottom:1px;text-transform:uppercase;line-height:1.4rem}",""])},function(e,t){"use strict";e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var o=this[t];o[2]?e.push("@media "+o[2]+"{"+o[1]+"}"):e.push(o[1])}return e.join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},r=0;r<this.length;r++){var n=this[r][0];"number"==typeof n&&(a[n]=!0)}for(r=0;r<t.length;r++){var i=t[r];"number"==typeof i[0]&&a[i[0]]||(o&&!i[2]?i[2]=o:o&&(i[2]="("+i[2]+") and ("+o+")"),e.push(i))}},e}},function(e,t,o){e.exports=o.p+"bd703062f4a66991f9472b3634d82e92.woff"},function(e,t,o){function a(e,t){for(var o=0;o<e.length;o++){var a=e[o],r=u[a.id];if(r){r.refs++;for(var n=0;n<r.parts.length;n++)r.parts[n](a.parts[n]);for(;n<a.parts.length;n++)r.parts.push(p(a.parts[n],t))}else{for(var i=[],n=0;n<a.parts.length;n++)i.push(p(a.parts[n],t));u[a.id]={id:a.id,refs:1,parts:i}}}}function r(e){for(var t=[],o={},a=0;a<e.length;a++){var r=e[a],n=r[0],i=r[1],d=r[2],s=r[3],p={css:i,media:d,sourceMap:s};o[n]?o[n].parts.push(p):t.push(o[n]={id:n,parts:[p]})}return t}function n(e,t){var o=b(),a=v[v.length-1];if("top"===e.insertAt)a?a.nextSibling?o.insertBefore(t,a.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),v.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function i(e){e.parentNode.removeChild(e);var t=v.indexOf(e);t>=0&&v.splice(t,1)}function d(e){var t=document.createElement("style");return t.type="text/css",n(e,t),t}function s(e){var t=document.createElement("link");return t.rel="stylesheet",n(e,t),t}function p(e,t){var o,a,r;if(t.singleton){var n=x++;o=m||(m=d(t)),a=l.bind(null,o,n,!1),r=l.bind(null,o,n,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=s(t),a=f.bind(null,o),r=function(){i(o),o.href&&URL.revokeObjectURL(o.href)}):(o=d(t),a=c.bind(null,o),r=function(){i(o)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else r()}}function l(e,t,o,a){var r=o?"":a.css;if(e.styleSheet)e.styleSheet.cssText=w(t,r);else{var n=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(n,i[t]):e.appendChild(n)}}function c(e,t){var o=t.css,a=t.media;t.sourceMap;if(a&&e.setAttribute("media",a),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}function f(e,t){var o=t.css,a=(t.media,t.sourceMap);a&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var r=new Blob([o],{type:"text/css"}),n=e.href;e.href=URL.createObjectURL(r),n&&URL.revokeObjectURL(n)}var u={},h=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},g=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),b=h(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,x=0,v=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=g()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var o=r(e);return a(o,t),function(e){for(var n=[],i=0;i<o.length;i++){var d=o[i],s=u[d.id];s.refs--,n.push(s)}if(e){var p=r(e);a(p,t)}for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete u[s.id]}}}};var w=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}()},function(e,t,o){var a=o(7);"string"==typeof a&&(a=[[e.id,a,""]]);o(5)(a,{});a.locals&&(e.exports=a.locals)},function(e,t,o){t=e.exports=o(3)(),t.push([e.id,"#area{height:2592px;width:2400px}.login{padding:20px}.errors{color:red;font-weight:700;text-transform:uppercase}#notification{position:fixed;top:10px;right:-251px;padding:10px;background-color:#ffd200;box-shadow:#534814 2px 2px 0;z-index:999;width:200px}#notification,#notification.active{transition:right 1s;-webkit-transition:right 1s}#notification.active{right:0}#notification.danger{background-color:#e2115b;color:#ffd7e5}footer{position:fixed;bottom:0;left:0;right:0;height:65px;background-color:rgba(1,1,1,.5);z-index:999}footer form{display:inline-block;float:right}#health{position:absolute;left:130px;bottom:10px;height:30px;width:120px;z-index:6}#health .status{border-radius:100px;width:15px;height:15px;margin-right:3px;background-color:#01db77;float:left}#health .status.damage{background-color:red}#messages{position:absolute;bottom:65px;right:10px}#messages li{padding:5px 8px;margin-bottom:1px;background-color:rgba(1,1,1,.7);color:#ddd;font-weight:100;font-size:.75rem;line-height:1rem;width:250px;text-overflow:ellipsis;overflow:hidden;cursor:pointer}#messages li:hover{background-color:hsla(0,0%,100%,.5);color:#888}#messages li.hide{opacity:0;transition:opacity .5s;-webkit-transition:opacity .5s}#messages li time{font-size:.7rem;margin-right:5px;font-style:italic;color:#aaa}#message input{border:0;font-size:.8rem;padding:4px;background-color:rgba(1,1,1,.4);color:#eee;width:246px}#active{right:0;position:absolute;bottom:0;padding:5px 10px;background-color:rgba(1,1,1,.5);text-align:center;color:#fff}#active,#message button{display:none}#back{top:0;left:0;right:0;bottom:0}#back,#mountain{position:absolute}#mountain{width:1400px;height:445px;left:100px;top:85px;z-index:2}#land-lower,#land-upper{width:2400px;height:500px;position:absolute;left:0;top:400px;z-index:3}#land-lower{top:700px}#mining{position:absolute;top:1000px;width:2400px;height:1600px;z-index:4}#playground{top:0;height:1199px}#mining-area,#playground{position:absolute;left:0;width:2400px;z-index:7}#mining-area{top:1200px;height:1400px}.square{width:50px;height:50px}#vehicle,.hole{position:absolute;width:100px;height:50px;top:0;left:0}.hole{z-index:4;background-image:url("+o(8)+");background-repeat:no-repeat}.hole.fade{opacity:0;transition:opacity 2s;-webkit-transition:opacity 2s}#vehicle{z-index:6;background-image:url("+o(9)+");background-repeat:no-repeat;opacity:.7}#vehicle.active{opacity:1;filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #00b0ff)\n        drop-shadow(0 0 8px rgba(0,176,255,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #00b0ff)\n        drop-shadow(0 0 8px rgba(0,176,255,.5))}#vehicle.damage{background-color:rgba(246,0,0,.4);border-radius:100px;box-shadow:#f60000 0 0 25px}#avatar{background-image:url("+o(10)+");left:10px}#avatar,#build{position:absolute;background-repeat:no-repeat;width:50px;height:50px;z-index:6;bottom:10px}#build{background-image:url("+o(11)+");left:70px}#avatar.active,#avatar:hover,#build.active,#build:hover{background-color:rgba(2,181,219,.6);border-radius:100px;box-shadow:#06d3ff 0 0 10px;cursor:pointer}.lava{width:70px;height:70px;z-index:7;top:-5px;background-image:url("+o(12)+")}.lava,.neon-blue,.neon-green,.neon-pink{position:absolute;display:inline-block;background-repeat:no-repeat}.neon-blue,.neon-green,.neon-pink{width:50px;height:50px;z-index:5}.items .collected{position:relative;width:65px;height:40px;padding-left:50px;font-size:1.1rem;line-height:22px;margin:5px 0;background-repeat:no-repeat}#builder,#collection{position:fixed;background:repeating-linear-gradient(45deg,rgba(2,2,2,.7),rgba(2,2,2,.9) 3px,rgba(3,3,3,.8) 5px,rgba(4,4,4,.7) 3px);z-index:9;height:70vh;width:70vw;left:100px;top:-70vw;padding:20px;border:1px solid #333;border-radius:3px;color:#fff;opacity:0;overflow:auto;transition:opacity 1s;-webkit-transition:opacity 1s}#builder.active,#collection.active{top:0;display:block;opacity:1;transition:opacity 1s;-webkit-transition:opacity 1s}#builder h2,#collection h2{font-size:1rem;font-family:LeagueSpartan-Bold;text-transform:uppercase;margin-bottom:10px;clear:both;display:block;width:100%;float:left}.tip{line-height:1.2rem;font-size:.85rem}.items,.tip{float:left;clear:both}.items{margin-bottom:20px;width:100%;flex-direction:column}.displayed li,.items li{width:70px;float:left;padding:10px;margin-right:10px;border-right:1px solid #888;border-bottom:1px solid #555}.items .requirements{width:18px;height:18px;padding-left:30px;display:block;background-repeat:no-repeat}#builder .items li{height:105px}#builder .items .build,.displayed li p{width:50px;height:50px;display:inline-block;background-repeat:no-repeat;padding-left:70px;position:relative}.displayed li p{float:left;padding-left:10px}.requirements{display:block;position:relative}.requirements.disabled{opacity:.3}.buy:hover,.displayable:hover{border-right:1px solid #04cbe3;border-bottom:1px solid #04cbe3;cursor:pointer;box-shadow:0 0 3px #fff,0 0 5px red,0 0 7px red,inset 0 0 3px #fff,inset 0 0 5px red,inset 0 0 7px red}.displayed{clear:both;float:left;width:100%;margin-top:10px}.display{height:100px;width:100px;position:absolute;border:2px solid transparent}.display:hover{border:2px dashed #eee}.neon-pink{background-image:url("+o(13)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #f31de6)\n        drop-shadow(0 0 8px rgba(243,29,230,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #f31de6)\n        drop-shadow(0 0 8px rgba(243,29,230,.5))}.neon-blue{background-image:url("+o(13)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #1686dc)\n        drop-shadow(0 0 8px rgba(22,134,220,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #1686dc)\n        drop-shadow(0 0 8px rgba(22,134,220,.5))}.neon-green{background-image:url("+o(13)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #70b32e)\n        drop-shadow(0 0 8px rgba(112,179,46,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #70b32e)\n        drop-shadow(0 0 8px rgba(112,179,46,.5))}.neon-red{background-image:url("+o(13)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #f31d1d)\n        drop-shadow(0 0 8px rgba(243,29,29,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #f31d1d)\n        drop-shadow(0 0 8px rgba(243,29,29,.5))}.neon-purple{background-image:url("+o(13)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #b608ef)\n        drop-shadow(0 0 8px rgba(182,8,239,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #b608ef)\n        drop-shadow(0 0 8px rgba(182,8,239,.5))}.neon-palm-tree{background-image:url("+o(14)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #00fda1)\n        drop-shadow(0 0 8px rgba(0,253,161,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #00fda1)\n        drop-shadow(0 0 8px rgba(0,253,161,.5))}.neon-lips{background-image:url("+o(15)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #e10055)\n        drop-shadow(0 0 8px rgba(225,0,85,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #e10055)\n        drop-shadow(0 0 8px rgba(225,0,85,.5))}.neon-fire,.neon-sun{background-image:url("+o(16)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #fffa00)\n        drop-shadow(0 0 8px rgba(255,250,0,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #fffa00)\n        drop-shadow(0 0 8px rgba(255,250,0,.5))}.neon-clouds{background-image:url("+o(17)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #00d4ff)\n        drop-shadow(0 0 8px rgba(0,212,255,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #00d4ff)\n        drop-shadow(0 0 8px rgba(0,212,255,.5))}.neon-hammer,.neon-hand,.neon-nails{background-image:url("+o(18)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #ff9a2a)\n        drop-shadow(0 0 8px rgba(255,154,42,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #ff9a2a)\n        drop-shadow(0 0 8px rgba(255,154,42,.5))}.neon-cat-1,.neon-dog-1,.neon-fish{background-image:url("+o(19)+");filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #875bff)\n        drop-shadow(0 0 8px rgba(135,91,255,.5));-webkit-filter:drop-shadow(0 0 1px #fff)\n        drop-shadow(0 0 3px #fff)\n        drop-shadow(0 0 5px #875bff)\n        drop-shadow(0 0 8px rgba(135,91,255,.5))}.neon-cat-1{background-image:url("+o(20)+")}.neon-hammer{background-image:url("+o(21)+")}.neon-nails{background-image:url("+o(22)+")}.neon-dog-1{background-image:url("+o(23)+")}.neon-fire{background-image:url("+o(24)+")}",""])},function(e,t,o){e.exports=o.p+"1327a664509ea85656eac9c08d2885ed.svg"},function(e,t,o){e.exports=o.p+"658ec0dd6a17ffb2ae3feb19985c613e.svg"},function(e,t,o){e.exports=o.p+"cb70118d2f23afd922467593d584daab.svg"},function(e,t,o){e.exports=o.p+"3e89afc1fa4b39539e7346716cdd3269.svg"},function(e,t,o){e.exports=o.p+"f9d5c2e7545aaa75725029ef09be7715.svg"},function(e,t,o){e.exports=o.p+"1851f69545501c7f1ac48672c5062d9f.svg"},function(e,t,o){e.exports=o.p+"8b664f68a7673a06a1653299393d71c4.svg"},function(e,t,o){e.exports=o.p+"30b30f94d94ae184a02c65c537be21e9.svg"},function(e,t,o){e.exports=o.p+"04cd48ad27dd882ed002b60134816ef2.svg"},function(e,t,o){e.exports=o.p+"47de547c03efba0393520b577878ad9e.svg"},function(e,t,o){e.exports=o.p+"bc129c8a265b431feabcda3c3aadddf9.svg"},function(e,t,o){e.exports=o.p+"de1c1af2c7650ed7b48ca80d0a7ecce8.svg"},function(e,t,o){e.exports=o.p+"5cccf84f48a9d5e315ea292f5a5e443e.svg"},function(e,t,o){e.exports=o.p+"e51c319801fc5cc1928f0a214087f0f0.svg"},function(e,t,o){e.exports=o.p+"3ffbac697c925cead1148cbfe17ba0a5.svg"},function(e,t,o){e.exports=o.p+"c32f74c48a3f874744b9d95fdb48e015.svg"},function(e,t,o){e.exports=o.p+"9caecd2501c09e320a6056eaa51b93cc.svg"},function(e,t,o){"use strict";function a(e){g.textContent=e,g.classList.add("active"),setTimeout(function(){g.classList.remove("active"),g.classList.remove("danger")},5e3)}var r=o(26),n=document.body.getAttribute("data-room"),i=document.body.getAttribute("data-user"),d=document.querySelector("#mining-area"),s=document.querySelector("#builder"),p=document.querySelector("#collection"),l=document.querySelector("#playground"),c=document.querySelector("#avatar"),f=document.querySelector("#build"),u=p.querySelector(".items")||!1,h=p.querySelector(".displayed"),g=document.querySelector("#notification"),b=document.body.getAttribute("data-owner"),m={},x={};t.assignRoom=function(e){n&&"undefined"!==n?(console.log("joining ",n),e.emit("join",{room:n})):console.log("no room available")},t.setChat=function(e){var t=document.querySelector("#message"),o=document.querySelector("#messages");t.onsubmit=function(t){t.preventDefault();var o=this.querySelector("input");e.emit("message",{room:n,message:o.value,name:i}),o.value=""},e.on("message",function(e){var t=document.createElement("li"),a=document.createElement("time"),r=document.createElement("span");a.textContent=e.created,r.textContent=e.name+": "+e.message,t.appendChild(a),t.appendChild(r),o.appendChild(t),t.onclick=function(){t.classList.add("hide"),setTimeout(function(){o.removeChild(t)},600)}})},t.setMining=function(e){var t=document.querySelector("#active");e.on("active",function(e){t.querySelector("span").textContent=e}),e.on("mining",function(t){t.item&&!function(){var o=document.createElement("img");o.classList.add(t.name),o.style.left=t.currX,o.style.top=t.currY,d.appendChild(o),e.emit("mined",{room:n,name:t.name}),e.emit("collection",{room:n}),"lava"===t.name?(g.classList.add("danger"),a("Oh no! You found "+t.name+"!")):(g.classList.remove("danger"),a("You found "+t.name+"!")),setTimeout(function(){d.removeChild(o)},2e3)}()}),r.setHealth(e)},t.getCollection=function(e){function t(){if(u){u.innerHTML="";var t=function(t){var o=document.createElement("li"),i=document.createElement("p"),d=document.createElement("span");i.classList.add(t),i.classList.add("collected"),d.textContent="x"+m[t],i.appendChild(d),m[t]>0&&o.classList.add("displayable"),m[t]>0&&!x[t]&&(o.onclick=function(){a("You added a displayable "+t),r(t,100,100),e.emit("display",{room:n,item:t,x:100,y:100,w:100,h:100})}),o.appendChild(i),u.appendChild(o)};for(var o in m)t(o)}}function o(e){var t=e.target,o=(parseFloat(t.getAttribute("data-x"))||0)+e.dx,a=(parseFloat(t.getAttribute("data-y"))||0)+e.dy;t.style.webkitTransform=t.style.transform="translate("+o+"px, "+a+"px)",t.setAttribute("data-x",o),t.setAttribute("data-y",a)}function r(t,a,r,i,d){if(!l.querySelector("."+t)){var s=document.createElement("div");s.classList.add(t),s.classList.add("display"),s.style.webkitTransform=s.style.transform="translate("+a+"px, "+r+"px)",s.setAttribute("data-x",a),s.setAttribute("data-y",r),s.style.width=i||100,s.style.height=d||100,"true"===b&&interact(s).draggable({inertia:!1,restrict:{restriction:"parent",endOnly:!0,elementRect:{top:0,left:0,bottom:1,right:1}},onmove:o,onend:function(o){var a=o.target;e.emit("saveDisplay",{room:n,item:t,x:a.getAttribute("data-x"),y:a.getAttribute("data-y"),w:a.style.width,h:a.style.height})}}).resizable({preserveAspectRatio:!0,edges:{left:!0,right:!0,bottom:!0,top:!0}}).on("resizemove",function(o){var a=o.target,r=parseFloat(a.getAttribute("data-x"))||0,i=parseFloat(a.getAttribute("data-y"))||0;a.style.width=o.rect.width+"px",a.style.height=o.rect.height+"px",r+=o.deltaRect.left,i+=o.deltaRect.top,a.style.webkitTransform=a.style.transform="translate("+r+"px,"+i+"px)",a.setAttribute("data-x",r),a.setAttribute("data-y",i),e.emit("saveDisplay",{room:n,item:t,x:a.getAttribute("data-x"),y:a.getAttribute("data-y"),w:a.style.width,h:a.style.height})}),l.appendChild(s)}}e.emit("collection",{room:n}),e.emit("display",{room:n}),e.emit("displayables",{room:n}),e.on("collection",function(o){m=o,t(),e.emit("build",{room:n})}),window.dragMoveListener=o,e.on("displayables",function(e){x=e,l.innerHTML="";for(var t in e)r(t,e[t].x,e[t].y,e[t].w||100,e[t].h||100)}),e.on("display",function(t){if(h){h.innerHTML="",x=t;var o=function(t){var o=document.createElement("li"),r=document.createElement("p");r.classList.add(t),r.classList.add("collected"),o.onclick=function(){a("You removed a displayable "+t),e.emit("undisplay",{room:n,item:t}),delete x[t]},o.classList.add("displayable"),o.appendChild(r),h.appendChild(o)};for(var r in t)o(r)}}),c&&(c.onclick=function(){e.emit("collection",{room:n}),s.classList.remove("active"),f.classList.remove("active"),p.classList.contains("active")?(this.classList.remove("active"),p.classList.remove("active")):(this.classList.add("active"),p.classList.add("active"),t())})},t.getBuildables=function(e){var t=document.querySelector("#build"),o=s.querySelector(".items");t.onclick=function(){e.emit("build",{room:n}),p.classList.remove("active"),c.classList.remove("active"),s.classList.contains("active")?(this.classList.remove("active"),s.classList.remove("active")):(this.classList.add("active"),s.classList.add("active"))},e.on("build",function(t){var r=!1;o.innerHTML="";var i=function(i){var d=document.createElement("li"),s=document.createElement("p");s.classList.add("build"),s.classList.add(i),s.setAttribute("title",t[i].name),d.appendChild(s);for(var p in t[i].requirements)s=document.createElement("p"),(!m[p]||m[p]<t[i].requirements[p])&&(s.classList.add("disabled"),r=!0),s.classList.add("requirements"),s.classList.add(p),s.textContent="x"+t[i].requirements[p],d.appendChild(s);r||(d.classList.add("buy"),d.onclick=function(){a("Successfully built "+i),e.emit("make",{room:n,item:i,requirements:t[i].requirements}),o.innerHTML="",e.emit("collection",{room:n})}),o.appendChild(d),r=!1};for(var d in t)i(d)})}},function(e,t){"use strict";var o=document.body.getAttribute("data-room"),a=document.querySelector("#health"),r=!1;t.setHealth=function(e){e.emit("damage",{room:o}),e.on("damage",function(e){for(var t=5;t>0;t--)r=0===e?!0:!1,e>=t?a.querySelector("#health-state"+t).classList.remove("damage"):a.querySelector("#health-state"+t).classList.add("damage")})},t.setVehicle=function(e){function a(e){if(e=e||window.event,r)return void d.classList.remove("active");switch(e.keyCode){case 38:e.preventDefault(),n("up");break;case 40:e.preventDefault(),n("down");break;case 37:e.preventDefault(),n("left");break;case 39:e.preventDefault(),n("right")}}function n(t){function a(e){setTimeout(function(){e.classList.add("fade"),setTimeout(function(){i.removeChild(e)},1400)},1e3)}var r=parseInt(d.style.left.split("px")[0],10),n=parseInt(d.style.top.split("px")[0],10),l=void 0;if(p){switch(t){case"up":n>0&&(d.style.top=n-50+"px");break;case"down":1250>n&&(d.style.top=n+50+"px");break;case"left":r>0&&(d.style.left=r-100+"px");break;case"right":2300>r&&(d.style.left=r+100+"px")}l=s.cloneNode(),l.classList.remove("fade"),l.style.top=d.style.top,l.style.left=d.style.left,e.emit("mining",{room:o,currX:d.style.left,currY:d.style.top}),a(l),i.appendChild(l)}}var i=document.querySelector("#mining-area"),d=document.querySelector("#vehicle"),s=document.querySelector(".hole"),p=!1;d.style.left=0,d.style.top=0,t.setHealth(e),e.on("damage",function(e){r=!e,r?d.classList.add("damage"):d.classList.remove("damage")}),d.onclick=function(){r?console.log("vehicle damaged"):this.classList.contains("active")?(this.classList.remove("active"),p=!1):(this.classList.add("active"),p=!0)},document.onkeydown=a},t.setDamagedState=function(e){r=e}},function(e,t){"use strict";var o=(new Date).getHours();t.generateSky=function(){function e(){for(var e=0;i>=e;e+=i/6)for(var o=0;d>=o;o+=d/6){var a=void 0,r=void 0;a=e&&e!=i?e+(Math.floor(Math.random()*(i/4))-i/8):e,r=o&&o!=d?o+(Math.floor(Math.random()*(d/4))-d/8):o,p.push([a,r])}l=Delaunay.triangulate(p);for(var n=0;n<l.length;n+=3)t(n)}function t(e){var t=s.polygon([p[l[e]][0],p[l[e]][1],p[l[e+1]][0],p[l[e+1]][1],p[l[e+2]][0],p[l[e+2]][1]]).attr({fill:a()});t.centroid={x:(p[l[e]][0]+p[l[e+1]][0]+p[l[e+2]][0])/3,y:(p[l[e]][1]+p[l[e+1]][1]+p[l[e+2]][1])/3};var o=s.polygon(0,0,t.centroid.x,t.centroid.y,t.centroid.x+3,t.centroid.y+5).attr({fill:"rgba(255, 255, 255, 0.5)"});c.add(t,o)}function a(){var e=Math.floor(Math.random()*f)+u,t=Math.floor(Math.random()*h)+g;return"rgb("+e.toString()+", "+b+","+t.toString()+")"}function r(){return Math.floor(Math.random()*(l.length-2))}function n(){var e=document.querySelectorAll("#back polygon"),t=new TimelineLite;try{t.to(e[r()],.3,{fill:a(),onComplete:n})}catch(o){}}var i=2400,d=530,s=Snap("#back"),p=[],l=void 0,c=s.select('g[filter="url(#artifacts)"]'),f=void 0,u=void 0,h=void 0,g=void 0,b=void 0;o>=5&&8>o?(f=150,u=120,h=100,g=150,b=120):o>=8&&17>o?(f=70,u=60,h=100,g=210,b=185):o>=17&&21>o?(f=100,u=150,h=70,g=50,b=100):(f=50,u=20,h=70,g=50,b=10),s.attr({width:i,height:d}),e(),n()},t.generateMountain=function(){var e=Snap("#mountain"),t=void 0;t=o>=5&&9>o?"rgba(241, 203, 255, 0.6)":o>=9&&17>o?"rgba(229, 253, 255, 0.6)":o>=17&&21>o?"rgba(255, 197, 168, 0.6)":"rgba(157, 150, 213, 0.4)";var a=e.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({fill:"none",stroke:t,strokeWidth:25});a=a.pattern(0,5,25,10),e.paper.polygon("1400.8,422.7 1371.4,293.2 1256.7,148.4 1131.7,174.1 1018.5,87.4 830.2,97.7 689.1,0.6 499.3,119.7 417,87.4 278.8,209.4 209.6,174.1 89.1,271.2 0.8,444.7 1400.8,444.7").attr({fill:a})},t.generateLand=function(){var e=Snap("#land-upper"),t=void 0;t=o>=5&&9>o?"rgba(241, 203, 255, 0.9)":o>=9&&17>o?"rgba(189, 253, 255, 0.9)":o>=17&&21>o?"rgba(255, 197, 168, 0.9)":"rgba(157, 150, 213, 0.9)";var a=e.path("M0-15-10,15M15,10,0,25M0-5-20,15").attr({fill:"none",stroke:t,strokeWidth:55});a=a.pattern(0,15,25,10),e.paper.polygon("2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500").attr({fill:a}),e=Snap("#land-lower"),t=o>=5&&9>o?"rgba(141, 203, 255, 0.95)":o>=9&&17>o?"rgba(179, 143, 145, 0.95)":o>=17&&21>o?"rgba(155, 197, 168, 0.95)":"rgba(157, 150, 213, 0.9)",a=e.path("M10-35-20,5M15,20,50,25M10-5-20,15").attr({fill:"none",stroke:t,strokeWidth:45}),a=a.pattern(0,15,25,10),e.paper.polygon("2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500").attr({fill:a})},t.generateMining=function(){var e=Snap("#mining"),t=void 0;t=o>=5&&9>o?"rgba(141, 143, 215, 0.95)":o>=9&&17>o?"rgba(59, 143, 135, 0.95)":o>=17&&21>o?"rgba(25, 177, 168, 0.95)":"rgba(57, 150, 213, 0.9)";var a=e.path("M10-5-20,15M5,20,50,25M10-5-20,15").attr({fill:"none",stroke:t,strokeWidth:45});a=a.pattern(0,5,15,25),e.paper.polygon("0,146.2 0,80 143,80 468,122.4 628,80 903,106.5 1083,80 1288,106.5 1453,80 1678,106.5 1833,80 2033,106.5 2143,80 2400,106.5 2400,1680 0,1680 0,106.5").attr({fill:a})}},function(e,t){"use strict";t.generate=function(){var e=document.querySelector("header p"),t=document.querySelector("#menu");e.onclick=function(){this.classList.contains("active")?(t.classList.remove("active"),this.classList.remove("active")):(t.classList.add("active"),this.classList.add("active"))}}}]);
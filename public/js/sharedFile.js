!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="public/",t(t.s=1)}([,function(e,n){var t=new URL(document.location).searchParams.get("file"),o=document.getElementById("shared-file"),r=document.getElementById("downloadSharedFile"),i=document.getElementById("shared-file-info-wrapper"),l=document.getElementById("fileSize");document.addEventListener("DOMContentLoaded",function(){var e;e=t,console.log("link",e),fetch("/file/getsharedfileinfo?file=".concat(e),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.text()}).then(function(e){return console.log("resp",e),"Access denied"===e?i.innerHTML="<h1>****Access denied****</h1>":"Folder"===e&&(i.innerHTML="<h1>****Register to share folder****</h1>"),JSON.parse(e)}).then(function(e){var n;console.log(e),e&&(n=e[0],console.log("requesting file!",n),n.isShared?(n.isFolder&&(o.innerText=n.name,r.addEventListener("click",function(){var e,t;e=n.name,t=n.fileId,console.log(t),fetch("/file/downloadsharedfolder?folder=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(n){return saveAs(n,e)}).catch(function(e){return console.log("Данные не получены: "+e)})})),o.innerText=n.name,l.innerText=n.size,r.addEventListener("click",function(){var e,t;e=n.name,t=n.fileId,console.log("donwloasdiads",e,t),fetch("/file/downloadsharedfile?file=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(n){return saveAs(n,e)}).catch(function(e){return console.log("Данные не получены: "+e)})})):i.innerHTML="<h3>Access denied</h3>")}).catch(function(e){return e})})}]);
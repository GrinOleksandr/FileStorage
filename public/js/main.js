!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){var n={currentFolder:"/",currentPath:"/",clipBoard:[]},o=document.getElementById("files-list");o.addEventListener("contextmenu",function(e){e.preventDefault();var t={x:e.clientX,y:e.clientY};n.clipBoard.length?u(e.currentTarget,t):g()}),o.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=[],g(),d()});var r=document.getElementById("filePath");r.querySelector("span").addEventListener("click",function(){s("/")});var c=document.createElement("span");c.className="file-path_item",c.innerText="/",c.addEventListener("click",function(){s("/"),m(),n.currentPath="/",n.currentFolder="/"}),r.appendChild(c);var i=document.getElementById("upload-container");i.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),i.classList.add("dragover")}),i.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),i.classList.add("dragover")}),i.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-i.getBoundingClientRect().left+pageXOffset,n=e.pageY-i.getBoundingClientRect().top+pageYOffset;(t<0||t>i.clientWidth||n<0||n>i.clientHeight)&&i.classList.remove("dragover")}),i.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;i.classList.remove("dragover"),a.files=t,l()}),document.getElementById("create-folder").addEventListener("click",p);var a=document.getElementById("file-input");function l(){var e=new FormData(i);fetch("/file/upload?parent=".concat(n.currentFolder),{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return s(n.currentFolder),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function d(){document.querySelectorAll(".selected-item")&&document.querySelectorAll(".selected-item").forEach(function(e){e.classList.remove("selected-item")})}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";fetch("http://127.0.0.1:8000/file/listfiles?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){!function(e){o.innerHTML="",e.forEach(function(e){!function(e){var t=document.createElement("li");t.className="file-container",t.dataset.parent=e.parent,t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),r(e.currentTarget)}),e.isFolder&&t.addEventListener("dblclick",function(t){var o;e.name,o=e.fileId,n.currentFolder=o,s(o),v(e)});function r(e){e.classList.add("item-selected")}t.addEventListener("contextmenu",function(e){e.preventDefault(),e.stopPropagation(),r(e.currentTarget),g();var t={x:e.clientX,y:e.clientY};u(e.currentTarget,t)}),t.dataset.id=e.fileId,e.isShared&&(t.dataset.isShared="true");var c=document.createElement("span");c.innerText=e.name,c.className="file-name",e.isShared&&c.classList.add("shared-item");var i=document.createElement("span");i.className="file-icon",i.style.backgroundImage="url(".concat(function(e){if("application"===e.split("/")[0]){return{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[e.split("/")[1]]||"./img/file-type-icons/application.svg"}return{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[e.split("/")[0]]||"./img/file-type-icons/file.svg"}(e.mimetype),")"),t.appendChild(i),t.appendChild(c),o.appendChild(t)}(e)})}(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function u(e,t){g();var o=e.dataset.id,r=document.createElement("li");r.className="dropDownItem",r.innerText="Download",r.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),function(e,t){fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){return saveAs(t,e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(e.querySelector(".file-name").innerText,o)});var c=document.createElement("li");c.className="dropDownItem",c.innerText="Rename",c.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e,t){p(e,"Rename","Rename",function(e){!function(e,t){fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(e,o)});var i=document.createElement("li");i.className="dropDownItem",i.innerText="Delete",i.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e){fetch("/file/delete?id=".concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Удаление не прошло: "+e)})}(o)});var a=document.createElement("li");a.className="dropDownItem",a.innerText="Move",a.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=document.querySelectorAll(".item-selected"),d(),g()});var l=document.createElement("li");l.className="dropDownItem",l.innerText="Paste",l.addEventListener("click",function(e){var t,o;e.preventDefault(),e.stopPropagation(),t=n.currentFolder,(o=n.clipBoard).length&&(o.forEach(function(e){-1===n.currentPath.indexOf(e.dataset.id)?fetch("/file/move?id=".concat(e.dataset.id,"&to=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}):alert("Sorry, you can't move a folder to its own child or grandchild")}),n.clipBoard=[]),g()});document.createElement("li");l.className="dropDownItem",l.innerText="Enable access by link",l.addEventListener("click",function(t){var o;t.preventDefault(),t.stopPropagation(),o=e.id,fetch("/file/share?id=".concat(o),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}),g()});document.createElement("li");l.className="dropDownItem",l.innerText="Disable access by link",l.addEventListener("click",function(t){var o;t.preventDefault(),t.stopPropagation(),o=e.id,fetch("/file/unshare?id=".concat(o),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}),g()});var u=document.createElement("ul");u.className="dropdown-menu",u.classList.toggle("dropdown-visible"),u.style.position="absolute",u.style.top="".concat(t.y,"px"),u.style.left="".concat(t.x,"px"),console.log(e),"files-list"!==e.id?(u.appendChild(r),u.appendChild(c),u.appendChild(i),u.appendChild(a)):u.appendChild(l),e.appendChild(u)}function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:f,c=document.createElement("div");c.className="modal",c.addEventListener("click",function(e){e.target===c&&(u(),s())});var i=document.createElement("div");i.className="modal-wrapper";var a=document.createElement("input");a.type="text",a.className="modal-fileName",a.focus();var l=document.createElement("button");l.innerText="cancel",l.className="modal-cancelButton",l.addEventListener("click",u);var d=document.createElement("button");function u(e){document.getElementsByClassName("modal")[0].remove()}d.innerText=o,d.className="modal-createButton",d.addEventListener("click",function(){r(a.value),u(),s(n.currentFolder)});var p=document.createElement("div");p.className="modalButtons-wrapper";var m=document.createElement("h2");m.innerText=t,i.appendChild(m),i.appendChild(a),p.appendChild(l),p.appendChild(d),i.appendChild(p),c.appendChild(i),document.getElementById("wrapper").appendChild(c)}function f(e){fetch("/file/createfolder?name=".concat(e,"&parent=").concat(n.currentFolder),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";if(e!==n.currentFolder){var t=n.currentPath.split(","),o=t.indexOf(e),i=t.slice(0,o+1);r.innerHTML="",r.appendChild(c),n.currentPath="/",i.forEach(function(e){fetch("http://127.0.0.1:8000/file/getelement?id=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){e&&v(e[0])}).catch(function(e){return e})})}}function v(e){var t=n.currentPath;n.currentPath="".concat(t,",").concat(e.fileId);var o=document.createElement("span");o.className="file-path_item",o.innerText="".concat(e.name,"/"),o.dataset.parent=e.fileId,o.addEventListener("click",function(){s(e.fileId),m(e.fileId)}),r.appendChild(o)}function g(){document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()}a.addEventListener("focus",function(){return i.querySelector("label").classList.add("focus")}),a.addEventListener("blur",function(){return i.querySelector("label").classList.remove("focus")}),a.addEventListener("change",function(e){e.preventDefault(),console.log("uploading files  ",this.files),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),l()}),s()}]);
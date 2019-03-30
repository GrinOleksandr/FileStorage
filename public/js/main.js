!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){var n={currentFolder:"/",currentPath:"/",clipBoard:[]},o=document.getElementById("files-list");o.addEventListener("contextmenu",function(e){e.preventDefault();var t={x:e.clientX,y:e.clientY};h(),d(),u(e.currentTarget,t)}),o.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=[],h(),d()});var r=document.getElementById("filePath");r.querySelector("span").addEventListener("click",function(){s("/")});var a=document.createElement("span");a.className="file-path_item",a.innerText="/",a.addEventListener("click",function(){s("/"),m(),n.currentPath="/",n.currentFolder="/"}),r.appendChild(a);var c=document.getElementById("upload-container");c.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),c.classList.add("dragover")}),c.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),c.classList.add("dragover")}),c.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-c.getBoundingClientRect().left+pageXOffset,n=e.pageY-c.getBoundingClientRect().top+pageYOffset;(t<0||t>c.clientWidth||n<0||n>c.clientHeight)&&c.classList.remove("dragover")}),c.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;c.classList.remove("dragover"),i.files=t,l()});var i=document.getElementById("file-input");function l(){var e=new FormData(c);fetch("/file/upload?parent=".concat(n.currentFolder),{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return s(n.currentFolder),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function d(){document.querySelectorAll(".item-selected")&&document.querySelectorAll(".item-selected").forEach(function(e){e.classList.remove("item-selected")})}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";fetch("/file/listfiles?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){!function(e){o.innerHTML="",e.forEach(function(e){!function(e){console.log(e);var t=document.createElement("li");t.className="file-container",t.dataset.parent=e.parent,t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),h(),e.currentTarget.classList.add("item-selected")}),e.isFolder&&t.addEventListener("dblclick",function(t){var o;e.name,o=e.fileId,n.currentFolder=o,s(o),v(e)});t.addEventListener("contextmenu",function(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.contains("item-selected")||d(),h();var t={x:e.clientX,y:e.clientY};u(e.currentTarget,t)}),t.dataset.id=e.fileId,t.dataset.fileName=e.name,e.isShared&&(t.dataset.isShared="true");var r=document.createElement("span");r.innerText=(a=e.name,a.length>12?a.substr(0,10)+"...":a),r.className="file-name",e.isShared&&r.classList.add("shared-item");var a;var c=document.createElement("span");c.className="file-icon",c.style.backgroundImage="url(".concat(function(e){if("application"===e.split("/")[0]){return{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[e.split("/")[1]]||"./img/file-type-icons/application.svg"}return{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[e.split("/")[0]]||"./img/file-type-icons/file.svg"}(e.mimetype),")"),t.appendChild(c),t.appendChild(r),o.appendChild(t)}(e)})}(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function u(e,t){h();var o=e.dataset.id,r=document.createElement("li");r.className="dropDownItem",r.innerText="Download",r.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),function(e,t){fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){return saveAs(t,e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(e.dataset.fileName,o)});var a=document.createElement("li");a.className="dropDownItem",a.innerText="Rename",a.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e,t){p(e,"Rename","Rename",function(e){!function(e,t){fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(e,o)});var c=document.createElement("li");c.className="dropDownItem",c.innerText="Delete",c.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e){fetch("/file/delete?id=".concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Удаление не прошло: "+e)})}(o)});var i=document.createElement("li");i.className="dropDownItem",i.innerText="Move",i.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=document.querySelectorAll(".item-selected"),d(),h()});var l=document.createElement("li");l.className="dropDownItem",l.innerText="Paste",l.addEventListener("click",function(e){var t,o;e.preventDefault(),e.stopPropagation(),t=n.currentFolder,(o=n.clipBoard).length&&(o.forEach(function(e){-1===n.currentPath.indexOf(e.dataset.id)?fetch("/file/move?id=".concat(e.dataset.id,"&to=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}):alert("Sorry, you can't move a folder to its own child or grandchild")}),n.clipBoard=[]),h()});var u=document.createElement("li");u.className="dropDownItem",u.innerText="Create folder",u.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),p(),h()});var f=document.createElement("li");f.className="dropDownItem",f.innerText="Enable access by link",f.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),fetch("/file/share?id=".concat(o),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}),h()});var m=document.createElement("li");m.className="dropDownItem",m.innerText="Disable access by link",m.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),fetch("/file/unshare?id=".concat(o),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}),h()});var v=document.createElement("ul");v.className="dropdown-menu",v.classList.toggle("dropdown-visible"),v.style.position="absolute",v.style.top="".concat(t.y,"px"),v.style.left="".concat(t.x,"px"),v.style.cursor="default","files-list"!==e.id?(v.appendChild(r),v.appendChild(a),v.appendChild(c),v.appendChild(i),"true"===e.dataset.isShared?v.appendChild(m):v.appendChild(f)):(v.appendChild(u),n.clipBoard.length&&v.appendChild(l)),e.appendChild(v)}function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:f,a=document.createElement("div");a.className="modal",a.addEventListener("click",function(e){e.target===a&&(u(),s())});var c=document.createElement("div");c.className="modal-wrapper";var i=document.createElement("input");i.addEventListener("keypress",function(e){console.log(e),"Enter"===e.key&&(r(i.value),u(),s(n.currentFolder))}),i.type="text",i.className="modal-fileName",i.focus();var l=document.createElement("button");l.innerText="cancel",l.className="modal-cancelButton",l.addEventListener("click",u);var d=document.createElement("button");function u(e){document.getElementsByClassName("modal")[0].remove()}d.innerText=o,d.className="modal-createButton",d.addEventListener("click",function(){r(i.value),u(),s(n.currentFolder)});var p=document.createElement("div");p.className="modalButtons-wrapper";var m=document.createElement("h2");m.innerText=t,c.appendChild(m),c.appendChild(i),p.appendChild(l),p.appendChild(d),c.appendChild(p),a.appendChild(c),document.getElementById("wrapper").appendChild(a)}function f(e){fetch("/file/createfolder?name=".concat(e,"&parent=").concat(n.currentFolder),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){s(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";if(e!==n.currentFolder){var t=n.currentPath.split(","),o=t.indexOf(e),c=t.slice(0,o+1);r.innerHTML="",r.appendChild(a),n.currentPath="/",c.forEach(function(e){fetch("http://127.0.0.1:8000/file/getelement?id=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){e&&v(e[0])}).catch(function(e){return e})})}}function v(e){var t=n.currentPath;n.currentPath="".concat(t,",").concat(e.fileId);var o=document.createElement("span");o.className="file-path_item",o.innerText="".concat(e.name,"/"),o.dataset.parent=e.fileId,o.addEventListener("click",function(){s(e.fileId),m(e.fileId)}),r.appendChild(o)}function h(){document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()}i.addEventListener("focus",function(){return c.querySelector("label").classList.add("focus")}),i.addEventListener("blur",function(){return c.querySelector("label").classList.remove("focus")}),i.addEventListener("change",function(e){e.preventDefault(),console.log("uploading files  ",this.files),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),l()}),s()}]);
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){s("currentPath",""),s("currentFolder","/"),document.addEventListener("contextmenu",function(){console.log("dropdown removed",document.getElementsByClassName("dropdown-menu")[0]),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()});var n=document.getElementById("files-list");n.addEventListener("contextmenu",function(e){e.preventDefault()}),n.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()});var o=document.getElementById("filePath");o.querySelector("span").addEventListener("click",function(){c("/")});var a=document.getElementById("upload-container");a.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),a.classList.add("dragover")}),a.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),a.classList.add("dragover")}),a.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-a.getBoundingClientRect().left+pageXOffset,n=e.pageY-a.getBoundingClientRect().top+pageYOffset;(t<0||t>a.clientWidth||n<0||n>a.clientHeight)&&a.classList.remove("dragover")}),a.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;a.classList.remove("dragover"),console.log(e.dataTransfer.items[0]),r.files=t,i()}),document.getElementById("create-folder").addEventListener("click",l);var r=document.getElementById("file-input");function i(){var e=new FormData(a);fetch("/file/upload?parent=".concat(u("currentFolder")),{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return console.log("Files Uploaded!"),c(u("currentFolder")),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";fetch("http://127.0.0.1:8000/file/listfiles?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){!function(e){n.innerHTML="",e.forEach(function(e){!function(e){var t=document.createElement("li");t.className="file-container",t.dataset.parent=e.parent,t.addEventListener("click",function(e){var t;e.preventDefault(),e.stopPropagation(),t=e.currentTarget,document.querySelector(".item-active")&&document.querySelector(".item-active").classList.remove("item-active"),t.classList.add("item-active")}),e.isFolder&&t.addEventListener("dblclick",function(t){var n,a;n=e.name,a=e.fileId,console.log("opening: ",n,a),s("currentFolder",a),c(a),function(e){console.log("adding to path: ",e);var t=u("currentPath");s("currentPath","".concat(t,",").concat(e.fileId));var n=document.createElement("span");n.className="file-path_item",n.innerText="".concat(e.name,"/"),console.log(n),n.dataset.parent=e.fileId,n.addEventListener("click",function(){c(e.fileId),e.id!==u("currentFolder")&&(o.innerHTML="")}),o.appendChild(n)}(e)});t.addEventListener("contextmenu",function(e){console.log(e),e.preventDefault(),e.stopPropagation(),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove();var t={x:e.clientX,y:e.clientY};!function(e,t){var n=e.dataset.id,o=document.createElement("li");o.className="dropDownItem",o.innerText="Download",o.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation();var o=e.querySelector(".file-name").innerText;!function(e,t){fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){return saveAs(t,e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(o,n)});var a=document.createElement("li");function r(e,t){l(e,"Rename","Rename",function(e){!function(e,t){fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e),c(u("currentFolder"))}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}a.className="dropDownItem",a.innerText="Rename",a.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),r(e,n)});var i=document.createElement("li");i.className="dropDownItem",i.innerText="Delete",i.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e){fetch("/file/delete?id=".concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e),c(u("currentFolder"))}).catch(function(e){return console.log("Удаление не прошло: "+e)})}(n)});var d=document.createElement("ul");d.className="dropdown-menu",d.classList.toggle("dropdown-visible"),d.style.position="fixed",d.style.top="".concat(t.y,"px"),d.style.left="".concat(t.x,"px"),d.appendChild(o),d.appendChild(a),d.appendChild(i),e.appendChild(d)}(e.currentTarget,t)}),t.dataset.id=e.fileId;var a=document.createElement("span");a.innerText=e.name,a.className="file-name";var r=document.createElement("span");r.className="file-icon",r.style.backgroundImage="url(".concat(function(e){if("application"===e.split("/")[0]){return{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[e.split("/")[1]]||"./img/file-type-icons/application.svg"}return{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[e.split("/")[0]]||"./img/file-type-icons/file.svg"}(e.mimetype),")"),t.appendChild(r),t.appendChild(a),n.appendChild(t)}(e)})}(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:d,a=document.createElement("div");a.className="modal",a.addEventListener("click",function(e){e.target===a&&(p(),c())});var r=document.createElement("div");r.className="modal-wrapper";var i=document.createElement("input");i.type="text",i.className="modal-fileName",i.focus();var l=document.createElement("button");l.innerText="cancel",l.className="modal-cancelButton",l.addEventListener("click",p);var s=document.createElement("button");function p(e){document.getElementsByClassName("modal")[0].remove()}s.innerText=n,s.className="modal-createButton",s.addEventListener("click",function(){o(i.value),p(),c(u("currentFolder"))});var m=document.createElement("div");m.className="modalButtons-wrapper";var f=document.createElement("h2");f.innerText=t,r.appendChild(f),r.appendChild(i),m.appendChild(l),m.appendChild(s),r.appendChild(m),a.appendChild(r),document.getElementById("wrapper").appendChild(a)}function d(e){fetch("/file/createfolder?name=".concat(e,"&parent=").concat(u("currentFolder")),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){c(u("currentFolder")),console.log(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function s(e,t){void 0===t?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}function u(e){var t=localStorage.getItem(e);if(void 0!==t)return JSON.parse(t)}r.addEventListener("focus",function(){return a.querySelector("label").classList.add("focus")}),r.addEventListener("blur",function(){return a.querySelector("label").classList.remove("focus")}),r.addEventListener("change",function(e){e.preventDefault(),console.log("files  ",this.files),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),i()}),c()}]);
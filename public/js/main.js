!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){f("currentPath","/"),f("currentFolder","/"),document.addEventListener("contextmenu",function(){console.log("dropdown removed",document.getElementsByClassName("dropdown-menu")[0]),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()});var n=document.getElementById("files-list");n.addEventListener("contextmenu",function(e){e.preventDefault()}),n.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()});var o=document.getElementById("filePath");o.querySelector("span").addEventListener("click",function(){l("/")});var a=document.createElement("span");a.innerText="/",a.addEventListener("click",function(){l("/"),u()}),o.appendChild(a);var r=document.getElementById("upload-container");r.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),r.classList.add("dragover")}),r.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),r.classList.add("dragover")}),r.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-r.getBoundingClientRect().left+pageXOffset,n=e.pageY-r.getBoundingClientRect().top+pageYOffset;(t<0||t>r.clientWidth||n<0||n>r.clientHeight)&&r.classList.remove("dragover")}),r.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;r.classList.remove("dragover"),console.log(e.dataTransfer.items[0]),c.files=t,i()}),document.getElementById("create-folder").addEventListener("click",d);var c=document.getElementById("file-input");function i(){var e=new FormData(r);fetch("/file/upload?parent=".concat(m("currentFolder")),{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return console.log("Files Uploaded!"),l(m("currentFolder")),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";fetch("http://127.0.0.1:8000/file/listfiles?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){!function(e){n.innerHTML="",e.forEach(function(e){!function(e){var t=document.createElement("li");t.className="file-container",t.dataset.parent=e.parent,t.addEventListener("click",function(e){var t;e.preventDefault(),e.stopPropagation(),t=e.currentTarget,document.querySelector(".item-active")&&document.querySelector(".item-active").classList.remove("item-active"),t.classList.add("item-active")}),e.isFolder&&t.addEventListener("dblclick",function(t){var n,o;n=e.name,o=e.fileId,console.log("opening: ",n,o),f("currentFolder",o),l(o),p(e)});t.addEventListener("contextmenu",function(e){console.log(e),e.preventDefault(),e.stopPropagation(),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove();var t={x:e.clientX,y:e.clientY};!function(e,t){var n=e.dataset.id,o=document.createElement("li");o.className="dropDownItem",o.innerText="Download",o.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation();var o=e.querySelector(".file-name").innerText;!function(e,t){fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){return saveAs(t,e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(o,n)});var a=document.createElement("li");function r(e,t){d(e,"Rename","Rename",function(e){!function(e,t){fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e),l(m("currentFolder"))}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}a.className="dropDownItem",a.innerText="Rename",a.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),r(e,n)});var c=document.createElement("li");c.className="dropDownItem",c.innerText="Delete",c.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e){fetch("/file/delete?id=".concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e),l(m("currentFolder"))}).catch(function(e){return console.log("Удаление не прошло: "+e)})}(n)});var i=document.createElement("ul");i.className="dropdown-menu",i.classList.toggle("dropdown-visible"),i.style.position="fixed",i.style.top="".concat(t.y,"px"),i.style.left="".concat(t.x,"px"),i.appendChild(o),i.appendChild(a),i.appendChild(c),e.appendChild(i)}(e.currentTarget,t)}),t.dataset.id=e.fileId;var o=document.createElement("span");o.innerText=e.name,o.className="file-name";var a=document.createElement("span");a.className="file-icon",a.style.backgroundImage="url(".concat(function(e){if("application"===e.split("/")[0]){return{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[e.split("/")[1]]||"./img/file-type-icons/application.svg"}return{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[e.split("/")[0]]||"./img/file-type-icons/file.svg"}(e.mimetype),")"),t.appendChild(a),t.appendChild(o),n.appendChild(t)}(e)})}(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:s,a=document.createElement("div");a.className="modal",a.addEventListener("click",function(e){e.target===a&&(u(),l())});var r=document.createElement("div");r.className="modal-wrapper";var c=document.createElement("input");c.type="text",c.className="modal-fileName",c.focus();var i=document.createElement("button");i.innerText="cancel",i.className="modal-cancelButton",i.addEventListener("click",u);var d=document.createElement("button");function u(e){document.getElementsByClassName("modal")[0].remove()}d.innerText=n,d.className="modal-createButton",d.addEventListener("click",function(){o(c.value),u(),l(m("currentFolder"))});var p=document.createElement("div");p.className="modalButtons-wrapper";var f=document.createElement("h2");f.innerText=t,r.appendChild(f),r.appendChild(c),p.appendChild(i),p.appendChild(d),r.appendChild(p),a.appendChild(r),document.getElementById("wrapper").appendChild(a)}function s(e){fetch("/file/createfolder?name=".concat(e,"&parent=").concat(m("currentFolder")),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){l(m("currentFolder")),console.log(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";if(e!==m("currentFolder")){var t=m("currentPath").split(","),n=t.indexOf(e),r=t.slice(0,n+1);o.innerHTML="",o.appendChild(a),f("currentPath","/"),r.forEach(function(e){fetch("http://127.0.0.1:8000/file/getelement?id=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){p(e[0])}).catch(function(e){return e})}),console.log(r)}}function p(e){console.log("adding to path: ",e);var t=m("currentPath");f("currentPath","".concat(t,",").concat(e.fileId));var n=document.createElement("span");n.className="file-path_item",n.innerText="".concat(e.name,"/"),console.log(n),n.dataset.parent=e.fileId,n.addEventListener("click",function(){l(e.fileId),u(e.fileId)}),o.appendChild(n)}function f(e,t){void 0===t?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}function m(e){var t=localStorage.getItem(e);if(void 0!==t)return JSON.parse(t)}c.addEventListener("focus",function(){return r.querySelector("label").classList.add("focus")}),c.addEventListener("blur",function(){return r.querySelector("label").classList.remove("focus")}),c.addEventListener("change",function(e){e.preventDefault(),console.log("files  ",this.files),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),i()}),l()}]);
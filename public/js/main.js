!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){p("currentPath","/"),p("currentFolder","/"),document.addEventListener("contextmenu",function(){console.log("dropdown removed",document.getElementsByClassName("dropdown-menu")[0]),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()});var n=document.getElementById("files-list");n.addEventListener("contextmenu",function(e){e.preventDefault()}),n.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()});var o=document.getElementById("filePath");o.querySelector("span").addEventListener("click",function(){l("/")});var a=document.createElement("span");a.innerText="/",a.addEventListener("click",function(){l("/"),u("/")}),o.appendChild(a);var c=document.getElementById("upload-container");c.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),c.classList.add("dragover")}),c.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),c.classList.add("dragover")}),c.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-c.getBoundingClientRect().left+pageXOffset,n=e.pageY-c.getBoundingClientRect().top+pageYOffset;(t<0||t>c.clientWidth||n<0||n>c.clientHeight)&&c.classList.remove("dragover")}),c.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;c.classList.remove("dragover"),console.log(e.dataTransfer.items[0]),r.files=t,i()}),document.getElementById("create-folder").addEventListener("click",d);var r=document.getElementById("file-input");function i(){var e=new FormData(c);fetch("/file/upload?parent=".concat(f("currentFolder")),{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return console.log("Files Uploaded!"),l(f("currentFolder")),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";fetch("http://127.0.0.1:8000/file/listfiles?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){!function(e){n.innerHTML="",e.forEach(function(e){!function(e){var t=document.createElement("li");t.className="file-container",t.dataset.parent=e.parent,t.addEventListener("click",function(e){var t;e.preventDefault(),e.stopPropagation(),t=e.currentTarget,document.querySelector(".item-active")&&document.querySelector(".item-active").classList.remove("item-active"),t.classList.add("item-active")}),e.isFolder&&t.addEventListener("dblclick",function(t){var n,a;n=e.name,a=e.fileId,console.log("opening: ",n,a),p("currentFolder",a),l(a),function(e){console.log("adding to path: ",e);var t=f("currentPath");p("currentPath","".concat(t,",").concat(e.fileId));var n=document.createElement("span");n.className="file-path_item",n.innerText="".concat(e.name,"/"),console.log(n),n.dataset.parent=e.fileId,n.addEventListener("click",function(){l(e.fileId),u(e.fileId)}),o.appendChild(n)}(e)});t.addEventListener("contextmenu",function(e){console.log(e),e.preventDefault(),e.stopPropagation(),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove();var t={x:e.clientX,y:e.clientY};!function(e,t){var n=e.dataset.id,o=document.createElement("li");o.className="dropDownItem",o.innerText="Download",o.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation();var o=e.querySelector(".file-name").innerText;!function(e,t){fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){return saveAs(t,e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(o,n)});var a=document.createElement("li");function c(e,t){d(e,"Rename","Rename",function(e){!function(e,t){fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e),l(f("currentFolder"))}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}a.className="dropDownItem",a.innerText="Rename",a.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),c(e,n)});var r=document.createElement("li");r.className="dropDownItem",r.innerText="Delete",r.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e){fetch("/file/delete?id=".concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e),l(f("currentFolder"))}).catch(function(e){return console.log("Удаление не прошло: "+e)})}(n)});var i=document.createElement("ul");i.className="dropdown-menu",i.classList.toggle("dropdown-visible"),i.style.position="fixed",i.style.top="".concat(t.y,"px"),i.style.left="".concat(t.x,"px"),i.appendChild(o),i.appendChild(a),i.appendChild(r),e.appendChild(i)}(e.currentTarget,t)}),t.dataset.id=e.fileId;var a=document.createElement("span");a.innerText=e.name,a.className="file-name";var c=document.createElement("span");c.className="file-icon",c.style.backgroundImage="url(".concat(function(e){if("application"===e.split("/")[0]){return{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[e.split("/")[1]]||"./img/file-type-icons/application.svg"}return{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[e.split("/")[0]]||"./img/file-type-icons/file.svg"}(e.mimetype),")"),t.appendChild(c),t.appendChild(a),n.appendChild(t)}(e)})}(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:s,a=document.createElement("div");a.className="modal",a.addEventListener("click",function(e){e.target===a&&(u(),l())});var c=document.createElement("div");c.className="modal-wrapper";var r=document.createElement("input");r.type="text",r.className="modal-fileName",r.focus();var i=document.createElement("button");i.innerText="cancel",i.className="modal-cancelButton",i.addEventListener("click",u);var d=document.createElement("button");function u(e){document.getElementsByClassName("modal")[0].remove()}d.innerText=n,d.className="modal-createButton",d.addEventListener("click",function(){o(r.value),u(),l(f("currentFolder"))});var p=document.createElement("div");p.className="modalButtons-wrapper";var m=document.createElement("h2");m.innerText=t,c.appendChild(m),c.appendChild(r),p.appendChild(i),p.appendChild(d),c.appendChild(p),a.appendChild(c),document.getElementById("wrapper").appendChild(a)}function s(e){fetch("/file/createfolder?name=".concat(e,"&parent=").concat(f("currentFolder")),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){l(f("currentFolder")),console.log(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function u(e){if(e!==f("currentFolder")){var t=f("currentPath").split(","),n=t.indexOf(e),c=t.slice(0,n+1);o.appendChild(a),p("currentPath","/"),c.forEach(function(e){fetch("http://127.0.0.1:8000/file/getelement?id=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){addToFilePath(e[0])}).catch(function(e){return console.log("Данные не получены: "+e)})}),console.log(c)}}function p(e,t){void 0===t?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}function f(e){var t=localStorage.getItem(e);if(void 0!==t)return JSON.parse(t)}r.addEventListener("focus",function(){return c.querySelector("label").classList.add("focus")}),r.addEventListener("blur",function(){return c.querySelector("label").classList.remove("focus")}),r.addEventListener("change",function(e){e.preventDefault(),console.log("files  ",this.files),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),i()}),l()}]);
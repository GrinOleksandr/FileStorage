!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){document.addEventListener("contextmenu",function(){console.log("dropdown removed",document.getElementsByClassName("dropdown-menu")[0]),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()});var n=document.getElementById("files-list");n.addEventListener("contextmenu",function(e){e.preventDefault()}),n.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()});var o=document.getElementById("upload-container");o.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),o.classList.add("dragover")}),o.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),o.classList.add("dragover")}),o.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-o.getBoundingClientRect().left+pageXOffset,n=e.pageY-o.getBoundingClientRect().top+pageYOffset;(t<0||t>o.clientWidth||n<0||n>o.clientHeight)&&o.classList.remove("dragover")});var i=document.getElementById("file-input");function a(){var e=new FormData(o);fetch("/file/upload",{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return console.log("Files Uploaded!"),c(),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function c(){fetch("http://127.0.0.1:8000/file/getfiles?",{method:"GET"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){!function(e){n.innerHTML="",e.forEach(function(e){!function(e){var t=document.createElement("li");t.className="file-container",t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e){document.querySelector(".item-active")&&document.querySelector(".item-active").classList.remove("item-active");e.classList.add("item-active")}(e.currentTarget)}),t.addEventListener("contextmenu",function(e){console.log(e),e.preventDefault(),e.stopPropagation(),document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove();var t={x:e.clientX,y:e.clientY};!function(e,t){var n=e.dataset.id,o=document.createElement("li");o.className="dropDownItem",o.innerText="Download",o.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation();var o=e.querySelector(".file-name").innerText;!function(e,t){fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){return saveAs(t,e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(o,n)});var i=document.createElement("li");function a(e,t){r(e,"Rename","Rename",function(e){!function(e,t){fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e),c()}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}i.className="dropDownItem",i.innerText="Rename",i.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),a(e,n)});var l=document.createElement("ul");l.className="dropdown-menu",l.classList.toggle("dropdown-visible"),l.style.position="fixed",l.style.top="".concat(t.y,"px"),l.style.left="".concat(t.x,"px"),l.appendChild(o),l.appendChild(i),e.appendChild(l)}(e.currentTarget,t)}),t.dataset.id=e.fileId;var o=document.createElement("span");o.innerText=e.name,o.className="file-name";var i=document.createElement("span");i.className="file-icon",i.style.backgroundImage="url(".concat(function(e){if("application"===e.split("/")[0]){return{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[e.split("/")[1]]||"./img/file-type-icons/application.svg"}return{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[e.split("/")[0]]||"./img/file-type-icons/file.svg"}(e.mimetype),")"),t.appendChild(i),t.appendChild(o),n.appendChild(t)}(e)})}(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:l,i=document.createElement("div");i.className="modal",i.addEventListener("click",function(e){e.target===i&&u()});var a=document.createElement("div");a.className="modal-wrapper";var r=document.createElement("input");r.type="text",r.className="modal-fileName",r.focus();var s=document.createElement("button");s.innerText="cancel",s.className="modal-cancelButton",s.addEventListener("click",u);var d=document.createElement("button");function u(e){console.log(e),document.getElementsByClassName("modal")[0].remove()}d.innerText=n,d.className="modal-createButton",d.addEventListener("click",function(){o(r.value),u(),c()});var p=document.createElement("div");p.className="modalButtons-wrapper";var m=document.createElement("h2");m.innerText=t,a.appendChild(m),a.appendChild(r),p.appendChild(s),p.appendChild(d),a.appendChild(p),i.appendChild(a),document.getElementById("wrapper").appendChild(i)}function l(e){fetch("/file/createfolder?name=".concat(e,"&parrent=").concat(n.dataset.currentFolder),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}i.addEventListener("focus",function(){return o.querySelector("label").classList.add("focus")}),i.addEventListener("blur",function(){return o.querySelector("label").classList.remove("focus")}),i.addEventListener("change",function(e){e.preventDefault(),console.log("files  ",this.files),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),a(),c()}),o.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;o.classList.remove("dragover"),console.log(e.dataTransfer.items[0]),i.files=t,a(),c()}),c(),document.getElementById("create-folder").addEventListener("click",r)}]);
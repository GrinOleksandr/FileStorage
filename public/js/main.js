!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){var n={currentFolder:"/",currentPath:"/",currentFolderAccessRights:"",clipBoard:[]},o=document.getElementById("files-list");o.addEventListener("contextmenu",function(e){e.preventDefault();var t={x:e.clientX,y:e.clientY};y(),u(),m(e.currentTarget,t)}),o.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=[],y(),u()});var a=document.getElementById("account-info");document.addEventListener("DOMContentLoaded",function(){fetch("/file/getusername",{method:"get",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.text()}).then(function(e){console.log(e),a.innerText=e}).catch(function(e){return e})});var c=document.getElementById("filePath");c.querySelector("span").addEventListener("click",function(){p("/")});var r=document.createElement("span");function i(e){document.getElementsByClassName("activeViewButton")[0].classList.remove("activeViewButton"),e.classList.add("activeViewButton")}r.className="file-path_item",r.innerText="/",r.addEventListener("click",function(){p("/"),v(),n.currentPath="/",n.currentFolder="/"}),c.appendChild(r),document.getElementById("showSharedFilesBtn").addEventListener("click",function(e){console.log("getting shared files!"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";fetch("/file/getfilessharedtome?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){o.innerHTML="",f(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(),i(e.target)}),document.getElementById("showMyFilesBtn").addEventListener("click",function(e){console.log("getting shared files!"),p(),i(e.target)});var l=document.getElementById("upload-container");l.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),l.classList.add("dragover")}),l.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),l.classList.add("dragover")}),l.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-l.getBoundingClientRect().left+pageXOffset,n=e.pageY-l.getBoundingClientRect().top+pageYOffset;(t<0||t>l.clientWidth||n<0||n>l.clientHeight)&&l.classList.remove("dragover")}),l.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;l.classList.remove("dragover"),s.files=t,d()});var s=document.getElementById("file-input");function d(){var e=new FormData(l);fetch("/file/upload?parent=".concat(n.currentFolder,"&access=").concat(n.currentFolderAccessRights),{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return p(n.currentFolder),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function u(){document.querySelectorAll(".item-selected")&&document.querySelectorAll(".item-selected").forEach(function(e){e.classList.remove("item-selected")})}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";console.log("CURENT FOLER AXECSSF",n),fetch("/file/listfiles?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){f(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function f(e){o.innerHTML="",e.forEach(function(e){!function(e){console.log(e);var t=document.createElement("li");t.className="file-container",t.dataset.parent=e.parent,t.dataset.size=e.size,t.dataset.sharedTo=e.access.toString(),t.dataset.id=e.fileId,t.dataset.fileName=e.name,t.dataset.owner=e.owner,t.dataset.uploadDate=e.uploadDate,t.dataset.isFolder=e.isFolder,t.dataset.link=e.link,t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),y(),e.currentTarget.classList.add("item-selected")}),e.isFolder&&t.addEventListener("dblclick",function(t){var o,a;e.name,o=e.fileId,a=e.access.toString(),n.currentFolder=o,console.log("access rights",a),n.currentFolderAccessRights=a,p(o),E(e)});t.addEventListener("contextmenu",function(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.contains("item-selected")||u(),y();var t={x:e.clientX,y:e.clientY};m(e.currentTarget,t)}),e.isShared&&(t.dataset.isShared="true");var a=document.createElement("span");a.innerText=(c=e.name,c.length>12?c.substr(0,10)+"...":c),a.className="file-name",e.isShared&&a.classList.add("shared-item");var c;var r=document.createElement("span");r.className="file-icon",r.style.backgroundImage="url(".concat(function(e){if("application"===e.split("/")[0]){return{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[e.split("/")[1]]||"./img/file-type-icons/application.svg"}return{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[e.split("/")[0]]||"./img/file-type-icons/file.svg"}(e.mimetype),")"),t.appendChild(r),t.appendChild(a),o.appendChild(t)}(e)})}function m(e,t){y();var o=e.dataset.id,a=document.createElement("li");a.className="dropDownItem",a.innerText="Download",a.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),function(e,t){fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){return saveAs(t,e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(e.dataset.fileName,o)});var c=document.createElement("li");c.className="dropDownItem",c.innerText="Rename",c.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e,t){h(e,"Rename","Rename",function(e){!function(e,t){fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){p(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(e,o)});var r=document.createElement("li");r.className="dropDownItem",r.innerText="Share",r.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e,t){h(e,"Share to","Share",function(e){!function(e,t){fetch("/file/share?id=".concat(e,"&user=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){p(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(e,o)});var i=document.createElement("li");i.className="dropDownItem",i.innerText="Remove access",i.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),function(e,t,o){console.log("*****************TARGET",o),h(e,"Remove one of current users ".concat(o," :"),"Remove access",function(e){!function(e,t){console.log("REMOVING ACCESSS",e,t),fetch("/file/unshare?id=".concat(e,"&user=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){p(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(t,o,e.dataset.sharedTo)});var l=document.createElement("li");l.className="dropDownItem",l.innerText="Delete",l.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e){fetch("/file/delete?id=".concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){p(n.currentFolder)}).catch(function(e){return console.log("Удаление не прошло: "+e)})}(o)});var s=document.createElement("li");s.className="dropDownItem",s.innerText="Move",s.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=document.querySelectorAll(".item-selected"),u(),y()});var d=document.createElement("li");d.className="dropDownItem",d.innerText="Paste",d.addEventListener("click",function(e){var t,o;e.preventDefault(),e.stopPropagation(),t=n.currentFolder,(o=n.clipBoard).length&&(o.forEach(function(e){-1===n.currentPath.indexOf(e.dataset.id)?fetch("/file/move?id=".concat(e.dataset.id,"&to=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){p(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}):alert("Sorry, you can't move a folder to its own child or grandchild")}),n.clipBoard=[]),y()});var f=document.createElement("li");f.className="dropDownItem",f.innerText="Create folder",f.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),h(),y()});var m=document.createElement("span");m.className="fileLinkWrapper";var g=document.createElement("span");g.className="fileLinkBtn",g.innerText="Copy",g.addEventListener("click",function(){return document.execCommand("copy")});var v=document.createElement("span");v.className="file-link__span",v.innerText="http://localhost:8000/shared?file=".concat(e.dataset.link),v.appendChild(g),m.appendChild(v),m.appendChild(g),m.addEventListener("click",function(e){e.stopPropagation(),e.preventDefault()});var E=document.createElement("li");E.className="dropDownItem",E.innerText="Enable access by link",E.appendChild(m),E.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),m.classList.add("linkwrap-visible"),function(e){if(e=document.getElementsByClassName(e)[0],document.body.createTextRange){var t=document.body.createTextRange();t.moveToElementText(e),t.select()}else if(window.getSelection){var n=window.getSelection(),o=document.createRange();o.selectNodeContents(e),n.removeAllRanges(),n.addRange(o)}else console.warn("Could not select text in node: Unsupported browser.")}("file-link__span"),fetch("/file/sharebylink?id=".concat(o),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){}).catch(function(e){return console.log("Данные не получены: "+e)})});var C=document.createElement("li");C.className="dropDownItem",C.innerText="Disable access by link",C.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),fetch("/file/unsharebylink?id=".concat(o),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){p(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}),y()});var T=document.createElement("li");T.className="dropDownItem",T.innerText="Show Info",T.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),y(),document.getElementById("infoOfFile").innerHTML="";var n=document.createElement("div");n.className="item-info-block",e.dataset.isFolder?n.innerHTML='<p><span>Name:</span>"'.concat(e.dataset.fileName,'"</p>\n         <p><span>Uploaded on:</span> "').concat(e.dataset.uploadDate,'"</p>\n         <p><span>Owner:</span> "').concat(e.dataset.owner,'"</p>\n         <p><span>Shared to:</span>" ').concat(e.dataset.sharedTo||"",'"</p>'):n.innerHTML='<p><span>Name:</span> "'.concat(e.dataset.fileName,'"</p>\n         <p><span>Size:</span> "').concat(e.dataset.size,'"</p>\n         <p><span>Uploaded on:</span> "').concat(e.dataset.uploadDate,'"</p>\n         <p><span>Owner:</span> "').concat(e.dataset.owner,'"</p>\n         <p><span>Shared to:</span> "').concat(e.dataset.sharedTo.toString||"",'"</p>'),document.getElementById("infoOfFile").appendChild(n)});var x=document.createElement("ul");x.className="dropdown-menu",x.classList.toggle("dropdown-visible"),x.style.position="fixed",x.style.top="".concat(t.y,"px"),x.style.left="".concat(t.x,"px"),x.style.cursor="default","files-list"!==e.id?(x.appendChild(a),x.appendChild(c),x.appendChild(l),x.appendChild(s),"false"===e.dataset.isFolder&&(x.appendChild(r),x.appendChild(i)),"true"===e.dataset.isShared?x.appendChild(C):x.appendChild(E),x.appendChild(T)):(x.appendChild(f),n.clipBoard.length&&x.appendChild(d)),e.appendChild(x)}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:g,c=document.createElement("div");c.className="modal",c.addEventListener("click",function(e){e.target===c&&(d(),p())});var r=document.createElement("div");r.className="modal-wrapper";var i=document.createElement("input");i.addEventListener("keypress",function(e){console.log(e),"Enter"===e.key&&(a(i.value),d(),p(n.currentFolder))}),i.type="text",i.className="modal-fileName",i.focus();var l=document.createElement("button");l.innerText="cancel",l.className="modal-cancelButton",l.addEventListener("click",d);var s=document.createElement("button");function d(e){document.getElementsByClassName("modal")[0].remove()}s.innerText=o,s.className="modal-createButton",s.addEventListener("click",function(){a(i.value),d(),p(n.currentFolder)});var u=document.createElement("div");u.className="modalButtons-wrapper";var f=document.createElement("h2");f.innerText=t,r.appendChild(f),r.appendChild(i),u.appendChild(l),u.appendChild(s),r.appendChild(u),c.appendChild(r),document.getElementById("wrapper").appendChild(c)}function g(e){console.log(n.currentFolderAccessRights),fetch("/file/createfolder?name=".concat(e,"&parent=").concat(n.currentFolder,"&access=").concat(n.currentFolderAccessRights),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){p(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";if(e!==n.currentFolder){var t=n.currentPath.split(","),o=t.indexOf(e),a=t.slice(0,o+1);c.innerHTML="",c.appendChild(r),n.currentPath="/",a.forEach(function(e){fetch("http://127.0.0.1:8000/file/getelement?id=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){e&&E(e[0])}).catch(function(e){return e})})}}function E(e){var t=n.currentPath;n.currentPath="".concat(t,",").concat(e.fileId);var o=document.createElement("span");o.className="file-path_item",o.innerText="".concat(e.name,"/"),o.dataset.parent=e.fileId,o.addEventListener("click",function(){p(e.fileId),v(e.fileId)}),c.appendChild(o)}function y(){document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()}s.addEventListener("focus",function(){return l.querySelector("label").classList.add("focus")}),s.addEventListener("blur",function(){return l.querySelector("label").classList.remove("focus")}),s.addEventListener("change",function(e){e.preventDefault(),console.log("uploading files  ",this.files),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),d()}),p()}]);
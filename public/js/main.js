!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){var n={currentFolder:"/",currentPath:"/",currentFolderAccessRights:"",clipBoard:[]},o=document.getElementById("files-list");o.addEventListener("contextmenu",function(e){e.preventDefault();var t={x:e.clientX,y:e.clientY};g(),s(),p(e.currentTarget,t)}),o.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=[],g(),s()});var a=document.getElementById("filePath");a.querySelector("span").addEventListener("click",function(){d("/")});var c=document.createElement("span");c.className="file-path_item",c.innerText="/",c.addEventListener("click",function(){d("/"),h(),n.currentPath="/",n.currentFolder="/"}),a.appendChild(c),document.getElementById("ShowSharedFilesBtn").addEventListener("click",function(e){console.log("getting shared files!"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";fetch("/file/getfilessharedtome?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){o.innerHTML="",u(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}()});var r=document.getElementById("upload-container");r.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),r.classList.add("dragover")}),r.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),r.classList.add("dragover")}),r.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-r.getBoundingClientRect().left+pageXOffset,n=e.pageY-r.getBoundingClientRect().top+pageYOffset;(t<0||t>r.clientWidth||n<0||n>r.clientHeight)&&r.classList.remove("dragover")}),r.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;r.classList.remove("dragover"),i.files=t,l()});var i=document.getElementById("file-input");function l(){var e=new FormData(r);fetch("/file/upload?parent=".concat(n.currentFolder,"&access").concat(n.currentFolderAccessRights),{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return d(n.currentFolder),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function s(){document.querySelectorAll(".item-selected")&&document.querySelectorAll(".item-selected").forEach(function(e){e.classList.remove("item-selected")})}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";fetch("/file/listfiles?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){u(e)}).catch(function(e){return console.log("Данные не получены: "+e)})}function u(e){o.innerHTML="",e.forEach(function(e){!function(e){console.log(e);var t=document.createElement("li");t.className="file-container",t.dataset.parent=e.parent,t.dataset.size=e.size,t.dataset.sharedTo=e.access.toString(),t.dataset.id=e.fileId,t.dataset.fileName=e.name,t.dataset.owner=e.owner,t.dataset.uploadDate=e.uploadDate,t.dataset.isFolder=e.isFolder,t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),g(),e.currentTarget.classList.add("item-selected")}),e.isFolder&&t.addEventListener("dblclick",function(t){var o,a;e.name,o=e.fileId,a=e.access.toString(),n.currentFolder=o,console.log("access rights",a),n.currentFolderAccessRights=a,d(o),v(e)});t.addEventListener("contextmenu",function(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.contains("item-selected")||s(),g();var t={x:e.clientX,y:e.clientY};p(e.currentTarget,t)}),e.isShared&&(t.dataset.isShared="true");var a=document.createElement("span");a.innerText=(c=e.name,c.length>12?c.substr(0,10)+"...":c),a.className="file-name",e.isShared&&a.classList.add("shared-item");var c;var r=document.createElement("span");r.className="file-icon",r.style.backgroundImage="url(".concat(function(e){if("application"===e.split("/")[0]){return{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[e.split("/")[1]]||"./img/file-type-icons/application.svg"}return{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[e.split("/")[0]]||"./img/file-type-icons/file.svg"}(e.mimetype),")"),t.appendChild(r),t.appendChild(a),o.appendChild(t)}(e)})}function p(e,t){g();var o=e.dataset.id,a=document.createElement("li");a.className="dropDownItem",a.innerText="Download",a.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),function(e,t){fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){return saveAs(t,e)}).catch(function(e){return console.log("Данные не получены: "+e)})}(e.dataset.fileName,o)});var c=document.createElement("li");c.className="dropDownItem",c.innerText="Rename",c.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e,t){f(e,"Rename","Rename",function(e){!function(e,t){fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){d(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(e,o)});var r=document.createElement("li");r.className="dropDownItem",r.innerText="Share",r.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e,t){f(e,"Share to","Share",function(e){!function(e,t){fetch("/file/share?id=".concat(e,"&user=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){d(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(e,o)});var i=document.createElement("li");i.className="dropDownItem",i.innerText="Remove access",i.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),function(e,t,o){console.log("*****************TARGET",o),f(e,"Remove one of current users ".concat(o," :"),"Remove access",function(e){!function(e,t){console.log("REMOVING ACCESSS",e,t),fetch("/file/unshare?id=".concat(e,"&user=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){d(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(t,o,e.dataset.sharedTo)});var l=document.createElement("li");l.className="dropDownItem",l.innerText="Delete",l.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e){fetch("/file/delete?id=".concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){d(n.currentFolder)}).catch(function(e){return console.log("Удаление не прошло: "+e)})}(o)});var u=document.createElement("li");u.className="dropDownItem",u.innerText="Move",u.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=document.querySelectorAll(".item-selected"),s(),g()});var p=document.createElement("li");p.className="dropDownItem",p.innerText="Paste",p.addEventListener("click",function(e){var t,o;e.preventDefault(),e.stopPropagation(),t=n.currentFolder,(o=n.clipBoard).length&&(o.forEach(function(e){-1===n.currentPath.indexOf(e.dataset.id)?fetch("/file/move?id=".concat(e.dataset.id,"&to=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){d(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}):alert("Sorry, you can't move a folder to its own child or grandchild")}),n.clipBoard=[]),g()});var m=document.createElement("li");m.className="dropDownItem",m.innerText="Create folder",m.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),f(),g()});var h=document.createElement("li");h.className="dropDownItem",h.innerText="Enable access by link",h.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),fetch("/file/sharebylink?id=".concat(o),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){d(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}),g()});var v=document.createElement("li");v.className="dropDownItem",v.innerText="Disable access by link",v.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),fetch("/file/unsharebylink?id=".concat(o),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){d(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)}),g()});var E=document.createElement("li");E.className="dropDownItem",E.innerText="Show Info",E.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),g(),document.getElementById("infoOfFile").innerHTML="";var n=document.createElement("div");n.className="item-info-block",e.dataset.isFolder?n.innerHTML='<p><span>Name:</span>"'.concat(e.dataset.fileName,'"</p>\n         \n         <p><span>Uploaded on:</span> "').concat(e.dataset.uploadDate,'"</p>\n         <p><span>Owner:</span> "').concat(e.dataset.owner,'"</p>\n         <p><span>Shared to:</span>" ').concat(e.dataset.sharedTo||"",'"</p>'):n.innerHTML='<p><span>Name:</span> "'.concat(e.dataset.fileName,'"</p>\n         <p><span>Size:</span> "').concat(e.dataset.size,'"</p>\n         <p><span>Uploaded on:</span> "').concat(e.dataset.uploadDate,'"</p>\n         <p><span>Owner:</span> "').concat(e.dataset.owner,'"</p>\n         <p><span>Shared to:</span> "').concat(e.dataset.sharedTo.toString||"",'"</p>'),document.getElementById("infoOfFile").appendChild(n)});var y=document.createElement("ul");y.className="dropdown-menu",y.classList.toggle("dropdown-visible"),y.style.position="absolute",y.style.top="".concat(t.y,"px"),y.style.left="".concat(t.x,"px"),y.style.cursor="default","files-list"!==e.id?(y.appendChild(a),y.appendChild(c),y.appendChild(l),y.appendChild(u),y.appendChild(r),y.appendChild(i),"true"===e.dataset.isShared?y.appendChild(v):y.appendChild(h),y.appendChild(E)):(y.appendChild(m),n.clipBoard.length&&y.appendChild(p)),e.appendChild(y)}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:m,c=document.createElement("div");c.className="modal",c.addEventListener("click",function(e){e.target===c&&(u(),d())});var r=document.createElement("div");r.className="modal-wrapper";var i=document.createElement("input");i.addEventListener("keypress",function(e){console.log(e),"Enter"===e.key&&(a(i.value,n.currentFolderAccessRights),u(),d(n.currentFolder))}),i.type="text",i.className="modal-fileName",i.focus();var l=document.createElement("button");l.innerText="cancel",l.className="modal-cancelButton",l.addEventListener("click",u);var s=document.createElement("button");function u(e){document.getElementsByClassName("modal")[0].remove()}s.innerText=o,s.className="modal-createButton",s.addEventListener("click",function(){a(i.value),u(),d(n.currentFolder)});var p=document.createElement("div");p.className="modalButtons-wrapper";var f=document.createElement("h2");f.innerText=t,r.appendChild(f),r.appendChild(i),p.appendChild(l),p.appendChild(s),r.appendChild(p),c.appendChild(r),document.getElementById("wrapper").appendChild(c)}function m(e,t){fetch("/file/createfolder?name=".concat(e,"&parent=").concat(n.currentFolder,"&access=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){d(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";if(e!==n.currentFolder){var t=n.currentPath.split(","),o=t.indexOf(e),r=t.slice(0,o+1);a.innerHTML="",a.appendChild(c),n.currentPath="/",r.forEach(function(e){fetch("http://127.0.0.1:8000/file/getelement?id=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){e&&v(e[0])}).catch(function(e){return e})})}}function v(e){var t=n.currentPath;n.currentPath="".concat(t,",").concat(e.fileId);var o=document.createElement("span");o.className="file-path_item",o.innerText="".concat(e.name,"/"),o.dataset.parent=e.fileId,o.addEventListener("click",function(){d(e.fileId),h(e.fileId)}),a.appendChild(o)}function g(){document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()}i.addEventListener("focus",function(){return r.querySelector("label").classList.add("focus")}),i.addEventListener("blur",function(){return r.querySelector("label").classList.remove("focus")}),i.addEventListener("change",function(e){e.preventDefault(),console.log("uploading files  ",this.files),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),l()}),d()}]);
!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="public/",n(n.s=0)}([function(e,t){var n={currentFolder:"/",currentPath:"/",currentFolderAccessRights:"",clipBoard:[],currentUser:""},a=document.getElementById("files-list");a.addEventListener("contextmenu",function(e){e.preventDefault();var t={x:e.clientX,y:e.clientY};T(),u(),h(e.currentTarget,t)}),a.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=[],T(),u()});var o=document.getElementById("progressIndicator"),c=document.getElementById("account-info");document.addEventListener("DOMContentLoaded",function(){L(),fetch("/file/getusername",{method:"get",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.text()}).then(function(e){c.innerText=e,n.currentUser=e,f(),x()}).catch(function(e){return e})});var r=document.getElementById("filePath");r.querySelector("span").addEventListener("click",function(){f("/")});var i=document.createElement("span");function l(e){document.getElementsByClassName("activeViewButton")[0].classList.remove("activeViewButton"),e.classList.add("activeViewButton")}i.className="file-path_item",i.innerText="/",i.addEventListener("click",function(){f("/"),y(),n.currentPath="/",n.currentFolder="/"}),r.appendChild(i),document.getElementById("showSharedFilesBtn").addEventListener("click",function(e){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";L(),fetch("/file/getfilessharedtome?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){a.innerHTML="",m(e),x()}).catch(function(e){return console.log("Данные не получены: "+e)})}(),y(),l(e.target)}),document.getElementById("showMyFilesBtn").addEventListener("click",function(e){f(),y(),l(e.target)});var s=document.getElementById("upload-container");s.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),s.classList.add("dragover")}),s.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),s.classList.add("dragover")}),s.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault();var t=e.pageX-s.getBoundingClientRect().left+pageXOffset,n=e.pageY-s.getBoundingClientRect().top+pageYOffset;(t<0||t>s.clientWidth||n<0||n>s.clientHeight)&&s.classList.remove("dragover")}),s.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault();var t=e.dataTransfer.files;s.classList.remove("dragover"),d.files=t,p()});var d=document.getElementById("file-input");function p(){L();var e=new FormData(s);fetch("/file/upload?parent=".concat(n.currentFolder,"&access=").concat(n.currentFolderAccessRights),{method:"POST",headers:{accept:"application/json"},body:e}).then(function(e){return f(n.currentFolder),x(),e.text()}).catch(function(e){return console.log("Данные не отправленны: "+e)})}function u(){document.querySelectorAll(".item-selected")&&document.querySelectorAll(".item-selected").forEach(function(e){e.classList.remove("item-selected")})}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";L(),fetch("/file/listfiles?folder=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){m(e),x()}).catch(function(e){return console.log("Данные не получены: "+e)})}function m(e){a.innerHTML="",e.forEach(function(e){!function(e){var t=document.createElement("li");t.className="file-container",t.dataset.parent=e.parent,t.dataset.size=e.size,t.dataset.sharedTo=e.access.toString(),t.dataset.id=e.fileId,t.dataset.fileName=e.name,t.dataset.owner=e.owner,t.dataset.uploadDate=e.uploadDate,t.dataset.isFolder=e.isFolder,t.dataset.link=e.link,t.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),T(),e.currentTarget.classList.toggle("item-selected")}),e.isFolder&&t.addEventListener("dblclick",function(t){var a,o;e.name,a=e.fileId,o=e.access.toString(),n.currentFolder=a,n.currentFolderAccessRights=o,f(a),C(e)});t.addEventListener("contextmenu",function(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.contains("item-selected")||u(),T();var t={x:e.clientX,y:e.clientY};h(e.currentTarget,t)}),e.isShared&&(t.dataset.isShared="true");var o=document.createElement("span");o.innerText=(c=e.name,c.length>12?c.substr(0,10)+"...":c),o.className="file-name",e.isShared&&o.classList.add("shared-item");var c;var r=document.createElement("span");r.className="file-icon",r.style.backgroundImage="url(".concat((i=e.mimetype,"application"===i.split("/")[0]?{msword:"./img/file-type-icons/doc.svg",pdf:"./img/file-type-icons/pdf.svg",ppt:"./img/file-type-icons/ppt.svg",pptx:"./img/file-type-icons/ppt.svg",zip:"./img/file-type-icons/zip.svg",rar:"./img/file-type-icons/zip.svg"}[i.split("/")[1]]||"./img/file-type-icons/application.svg":{folder:"./img/file-type-icons/folder.webp",application:"./img/file-type-icons/application.svg",audio:"./img/file-type-icons/mp3.svg",image:"./img/file-type-icons/jpg.svg",text:"./img/file-type-icons/txt.svg",video:"./img/file-type-icons/avi.svg"}[i.split("/")[0]]||"./img/file-type-icons/file.svg"),")"),e.access.toString()&&(r.style.backgroundColor="#c67d10b0");var i;t.appendChild(r),t.appendChild(o),a.appendChild(t)}(e)})}function h(e,t){T();var a=e.dataset.id,o=document.createElement("li");o.className="dropDownItem",o.innerText="Download",o.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),T(),function(e,t){L(),fetch("/file/download?id=".concat(t),{method:"GET",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){return e.blob()}).then(function(t){saveAs(t,e),x()}).catch(function(e){return console.log("Данные не получены: "+e)})}(e.dataset.fileName,a)});var c=document.createElement("li");c.className="dropDownItem",c.innerText="Rename",c.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e,t){g(e,"Rename","Rename",function(e){!function(e,t){L(),fetch("/file/rename?id=".concat(e,"&newname=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){x(),f(n.currentFolder)}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(e,a)});var r=document.createElement("li");r.className="dropDownItem",r.innerText="Share",r.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(e,t){g(e,"Share to","Share",function(e){!function(e,t){L(),fetch("/file/share?id=".concat(e,"&user=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){f(n.currentFolder),x()}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(e,a)});var i=document.createElement("li");i.className="dropDownItem",i.innerText="Remove access",i.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),function(e,t,a){g(e,"Remove one of current users:      ".concat(a," "),"Remove access",function(e){!function(e,t){L(),fetch("/file/unshare?id=".concat(e,"&user=").concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){f(n.currentFolder),x()}).catch(function(e){return console.log("Данные не получены: "+e)})}(t,e)})}(t,a,e.dataset.sharedTo)});var l=document.createElement("li");l.className="dropDownItem",l.innerText="Delete",l.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation();var t=n.clipBoard;t.length?(t.forEach(function(e){v(e.dataset.id)}),n.clipBoard=[]):v(a)});var s=document.createElement("li");s.className="dropDownItem",s.innerText="Move",s.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),n.clipBoard=document.querySelectorAll(".item-selected"),u(),T()});var d=document.createElement("li");d.className="dropDownItem",d.innerText="Paste",d.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),function(){L();var e=n.currentFolder,t=n.clipBoard;t.length&&(t.forEach(function(t){-1===n.currentPath.indexOf(t.dataset.id)?fetch("/file/move?id=".concat(t.dataset.id,"&to=").concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){f(n.currentFolder),x()}).catch(function(e){return console.log("Данные не получены: "+e)}):alert("Sorry, you can't move a folder to its own child or grandchild")}),n.clipBoard=[],x())}(),T()});var p=document.createElement("li");p.className="dropDownItem",p.innerText="Create folder",p.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),g(),T()});var m=document.createElement("span");m.className="fileLinkWrapper";var h=document.createElement("span");h.className="fileLinkBtn",h.innerText="Copy",h.addEventListener("click",function(){document.execCommand("copy"),T()});var E=document.createElement("span");E.className="file-link__span",E.innerText="http://localhost:8000/shared?file=".concat(e.dataset.link),E.appendChild(h),m.appendChild(E),m.appendChild(h),m.addEventListener("click",function(e){e.stopPropagation(),e.preventDefault()});var y=document.createElement("li");y.className="dropDownItem",y.innerText="Enable access by link",y.appendChild(m),y.addEventListener("click",function(t){var n;t.preventDefault(),t.stopPropagation(),m.classList.add("linkwrap-visible"),function(e){if(e=document.getElementsByClassName(e)[0],document.body.createTextRange){var t=document.body.createTextRange();t.moveToElementText(e),t.select()}else if(window.getSelection){var n=window.getSelection(),a=document.createRange();a.selectNodeContents(e),n.removeAllRanges(),n.addRange(a)}else console.warn("Could not select text in node: Unsupported browser.")}("file-link__span"),e.querySelector(".file-name").style.background="red",n=a,L(),fetch("/file/sharebylink?id=".concat(n),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(){x()}).catch(function(e){return console.log("Данные не получены: "+e)})});var C=document.createElement("li");C.className="dropDownItem",C.innerText="Disable access by link",C.addEventListener("click",function(e){var t;e.preventDefault(),e.stopPropagation(),t=a,L(),fetch("/file/unsharebylink?id=".concat(t),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){f(n.currentFolder),x()}).catch(function(e){return console.log("Данные не получены: "+e)}),T()});var w=document.createElement("li");w.className="dropDownItem",w.innerText="Show Info",w.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),T(),document.getElementById("infoOfFile").innerHTML="";var a=document.createElement("div");a.className="item-info-block",e.dataset.owner===n.currentUser?e.dataset.isFolder?a.innerHTML='<p><span>Name:</span>"'.concat(e.dataset.fileName,'"</p>\n         <p><span>Uploaded on:</span> "').concat(e.dataset.uploadDate,'"</p>\n         <p><span>Owner:</span> "').concat(e.dataset.owner,'"</p>\n         <p><span>Shared to:</span>" ').concat(e.dataset.sharedTo||"",'"</p>'):a.innerHTML='<p><span>Name:</span> "'.concat(e.dataset.fileName,'"</p>\n         <p><span>Size:</span> "').concat(e.dataset.size,'"</p>\n         <p><span>Uploaded on:</span> "').concat(e.dataset.uploadDate,'"</p>\n         <p><span>Owner:</span> "').concat(e.dataset.owner,'"</p>\n         <p><span>Shared to:</span> "').concat(e.dataset.sharedTo.toString||"",'"</p>'):e.dataset.isFolder?a.innerHTML='<p><span>Name:</span>"'.concat(e.dataset.fileName,'"</p>'):a.innerHTML='<p><span>Name:</span> "'.concat(e.dataset.fileName,'"</p>\n          <p><span>Size:</span> "').concat(e.dataset.size,'"</p>'),document.getElementById("infoOfFile").appendChild(a)});var N=document.createElement("ul");N.className="dropdown-menu",N.classList.toggle("dropdown-visible"),N.style.position="fixed",N.style.top="".concat(t.y,"px"),N.style.left="".concat(t.x,"px"),N.style.cursor="default","files-list"!==e.id?e.dataset.owner===n.currentUser?(N.appendChild(c),N.appendChild(l),N.appendChild(s),"false"===e.dataset.isFolder&&(N.appendChild(o),"true"===e.dataset.isShared?N.appendChild(C):N.appendChild(y),N.appendChild(r),N.appendChild(i)),N.appendChild(w)):"false"===e.dataset.isFolder?(N.appendChild(o),N.appendChild(w)):N.appendChild(w):(N.appendChild(p),n.clipBoard.length&&N.appendChild(d)),e.appendChild(N)}function v(e){L(),fetch("/file/delete?id=".concat(e),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){f(n.currentFolder),x()}).catch(function(e){return console.log("Удаление не прошло: "+e)})}function g(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"New folder",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"create",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:E,c=document.createElement("div");c.className="modal",c.addEventListener("click",function(e){e.target===c&&(d(),f())});var r=document.createElement("div");r.className="modal-wrapper";var i=document.createElement("input");i.addEventListener("keypress",function(e){"Enter"===e.key&&(o(i.value),d(),f(n.currentFolder))}),i.type="text",i.className="modal-fileName",i.focus();var l=document.createElement("button");l.innerText="cancel",l.className="modal-cancelButton",l.addEventListener("click",d);var s=document.createElement("button");function d(e){document.getElementsByClassName("modal")[0].remove()}s.innerText=a,s.className="modal-createButton",s.addEventListener("click",function(){o(i.value),d(),f(n.currentFolder)});var p=document.createElement("div");p.className="modalButtons-wrapper";var u=document.createElement("h2");u.innerText=t,r.appendChild(u),r.appendChild(i),p.appendChild(l),p.appendChild(s),r.appendChild(p),c.appendChild(r),document.getElementById("wrapper").appendChild(c)}function E(e){L(),fetch("/file/createfolder?name=".concat(e,"&parent=").concat(n.currentFolder,"&access=").concat(n.currentFolderAccessRights),{method:"POST",headers:{"Content-Type":"text/plain","Access-Control-Allow-Origin":"*"}}).then(function(e){f(n.currentFolder),x()}).catch(function(e){return console.log("Данные не получены: "+e)})}function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";if(e!==n.currentFolder){var t=n.currentPath.split(","),a=t.indexOf(e),o=t.slice(0,a+1);r.innerHTML="",r.appendChild(i),n.currentPath="/",o.forEach(function(e){L(),fetch("http://127.0.0.1:8000/file/getelement?id=".concat(e),{method:"POST"}).then(function(e){return e.text()}).then(function(e){return JSON.parse(e)}).then(function(e){e&&(C(e[0]),x())}).catch(function(e){return e})})}}function C(e){var t=n.currentPath;n.currentPath="".concat(t,",").concat(e.fileId);var a=document.createElement("span");a.className="file-path_item",a.innerText="".concat(e.name,"/"),a.dataset.parent=e.fileId,a.addEventListener("click",function(){f(e.fileId),y(e.fileId)}),r.appendChild(a)}function T(){document.getElementsByClassName("dropdown-menu")[0]&&document.getElementsByClassName("dropdown-menu")[0].remove()}function L(){o.classList.contains("indicatorActive")||o.classList.add("indicatorActive")}function x(){o.classList.contains("indicatorActive")&&o.classList.remove("indicatorActive")}d.addEventListener("focus",function(){return s.querySelector("label").classList.add("focus")}),d.addEventListener("blur",function(){return s.querySelector("label").classList.remove("focus")}),d.addEventListener("change",function(e){e.preventDefault(),this.files[0].isDirectory&&console.log("DIRECTORY!! : ".concat(this.files[0])),[].forEach.call(this.files,function(e){e.isDirectory&&console.log("DIRECTORY!! : ".concat(e))}),p()}),f()}]);
let state = {
    currentFolder: "/",
    currentPath:"/",
    currentFolderAccessRights:[],
    clipBoard:[]
};

const ListOfFiles = document.getElementById('files-list');
ListOfFiles.addEventListener('contextmenu',(ev)=>{
    ev.preventDefault();
    let myCors = {
        x: ev.clientX,
        y: ev.clientY
    };
    closeContextMenu();
    invertSelection();
    dropDown(ev.currentTarget, myCors);

});
ListOfFiles.addEventListener('click',(ev)=>{
    ev.preventDefault();
    ev.stopPropagation();
    state.clipBoard = [];
    closeContextMenu(ev);
    invertSelection();
});

const filePath = document.getElementById('filePath');
filePath.querySelector("span").addEventListener('click',()=> {
    renderFileStructure("/");
});

let rootFolder = document.createElement('span');
rootFolder.className = "file-path_item";
rootFolder.innerText = "/";
rootFolder.addEventListener('click', function(){
    renderFileStructure("/");
    renderFilePath();
    state.currentPath = "/";
    state.currentFolder = "/";
});
filePath.appendChild(rootFolder);

let showSharedFilesBtn = document.getElementById('ShowSharedFilesBtn');
showSharedFilesBtn.addEventListener('click', function(ev){
    console.log('getting shared files!');
    getFilesSharedToMe();
});

//***********************************UPLOAD***********************************//
//upload via drag&drop
const DropZone = document.getElementById("upload-container");
DropZone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    DropZone.classList.add('dragover');
});
DropZone.addEventListener('dragenter', function(e) {
    e.stopPropagation();
    e.preventDefault();
    DropZone.classList.add('dragover');
});
DropZone.addEventListener('dragleave', function(e) {
    e.stopPropagation();
    e.preventDefault();
    let dx = e.pageX - DropZone.getBoundingClientRect().left + pageXOffset;
    let dy = e.pageY - DropZone.getBoundingClientRect().top + pageYOffset;
    if ((dx < 0) || (dx > DropZone.clientWidth) || (dy < 0) || (dy > DropZone.clientHeight)) {
        DropZone.classList.remove('dragover');
    }
});
DropZone.addEventListener('drop', function(e){
    e.stopPropagation();
    e.preventDefault();
    let files = e.dataTransfer.files;
    DropZone.classList.remove('dragover');
    FileInput.files = files;
    ajaxSendFiles();
});

// let createFolderBtn = document.getElementById('create-folder');
// createFolderBtn.addEventListener('click',Modal);

//upload via input field
const FileInput = document.getElementById("file-input");
FileInput.addEventListener('focus', ()=> DropZone.querySelector('label').classList.add('focus'));
FileInput.addEventListener('blur', ()=> DropZone.querySelector('label').classList.remove('focus'));
FileInput.addEventListener('change', function(e){
    e.preventDefault();
    console.log("uploading files  ", this.files);
    if(this.files[0].isDirectory){
        console.log(`DIRECTORY!! : ${this.files[0]}`)
    }
    [].forEach.call(this.files, function(item){
        if(item.isDirectory){
            console.log(`DIRECTORY!! : ${item}`)
        }
    });
    ajaxSendFiles();
});

renderFileStructure();
/////SUBMITTING via AJAX
function ajaxSendFiles(){
    let formData = new FormData(DropZone);
    fetch(`/file/upload?parent=${state.currentFolder}&access${state.currentFolderAccessRights}`, {
        method: 'POST',
        headers:{
            accept:'application/json'
        },
        body:formData
    }).then(function (response) {
        renderFileStructure(state.currentFolder);
        return response.text();
    })
        .catch(error => console.log("Данные не отправленны: " + error));
}
//**********************************************************************//
function invertSelection(){
    if(document.querySelectorAll('.item-selected')){
        document.querySelectorAll('.item-selected').forEach(function(item){
            item.classList.remove('item-selected');
        })
    }
}

function renderFileStructure (folder = "/") {
    fetch(`/file/listfiles?folder=${folder}`, {
        method: 'POST'
    }).then(function (response) {
        return response.text()
    })
        .then(function (textOfResponse) {
            return JSON.parse(textOfResponse);
        })
        .then(function (array) {
            addAllToList(array)
        })
        .catch(error => console.log("Данные не получены: " + error));
}

function addAllToList(array) {
    ListOfFiles.innerHTML = "";
    array.forEach(function (item) {
        addItemFromServer(item)
    });
}

function addItemFromServer(element) {
    console.log(element);
    let newItem = document.createElement("li");
    newItem.className = "file-container";
    newItem.dataset.parent = element.parent;
    newItem.dataset.size = element.size;
    newItem.dataset.sharedTo = element.access.toString();
    newItem.dataset.id = element.fileId;
    newItem.dataset.fileName = element.name;
    newItem.dataset.owner = element.owner;
    newItem.dataset.uploadDate = element.uploadDate;
    newItem.dataset.isFolder = element.isFolder;

    newItem.addEventListener('click', (ev) =>{
        ev.preventDefault();
        ev.stopPropagation();
        closeContextMenu();
        selectItem(ev.currentTarget);
    });
     if(element.isFolder) {
         newItem.addEventListener('dblclick', function(ev){
             openFolder(element.name, element.fileId , element.access)
         });
     }

    function openFolder(name, id , access) {
        state.currentFolder = id;
        console.log('access rights', access)
        state.currentFolderAccessRights = access;
        renderFileStructure(id);
        addToFilePath(element);
    }

    function selectItem(target){
        target.classList.add('item-selected');
     }

    newItem.addEventListener('contextmenu',(ev)=> {
        ev.preventDefault();
        ev.stopPropagation();
        if(!ev.currentTarget.classList.contains("item-selected")) {
            invertSelection();
        }
        // selectItem(ev.currentTarget);
        closeContextMenu(ev);
        let cors = {
            x: ev.clientX,
            y: ev.clientY
        };
        dropDown(ev.currentTarget, cors);
    });

    if(element.isShared){
        newItem.dataset.isShared = "true";
    }


    let itemName = document.createElement("span");

    itemName.innerText = truncateMe(element.name);
    itemName.className = "file-name";
    if(element.isShared){
        itemName.classList.add('shared-item');
    }

    function chooseIcon(mimetype) {

        if (mimetype.split('/')[0] === "application") {
            let applicationTypes = {
                msword: './img/file-type-icons/doc.svg',
                pdf: './img/file-type-icons/pdf.svg',
                ppt: './img/file-type-icons/ppt.svg',
                pptx: './img/file-type-icons/ppt.svg',
                zip: './img/file-type-icons/zip.svg',
                rar: './img/file-type-icons/zip.svg',
                // 'vnd.ms-excel': './img/file-type-icons/xls.svg'
            };
            return applicationTypes[mimetype.split('/')[1]] || './img/file-type-icons/application.svg'
        }
        let fileTypes = {
            folder: './img/file-type-icons/folder.webp',
            application: './img/file-type-icons/application.svg',
            audio: './img/file-type-icons/mp3.svg',
            image: './img/file-type-icons/jpg.svg',
            text: './img/file-type-icons/txt.svg',
            video: './img/file-type-icons/avi.svg',
        };
        return fileTypes[mimetype.split('/')[0]] || './img/file-type-icons/file.svg'
    }

    let fileIcon = document.createElement("span");
    fileIcon.className = "file-icon";
    fileIcon.style.backgroundImage = `url(${chooseIcon(element.mimetype)})`;
        // `url(./img/file-type-icons/doc.png)`;
    // let itemMimeType = document.createElement("span");
    // itemMimeType.innerText = `type: ${element.mimetype}`;
    //
    // let itemLink = document.createElement("span");
    // itemLink.innerText = `link: ${element.link}`;
    //
    // let itemUploadDate = document.createElement("span");
    // itemUploadDate.innerText = `date: ${element.uploadDate}`;
    //
    // let itemOwner = document.createElement("span");
    // itemOwner.innerText =`owner: ${element.owner}`;
    //
    // let itemAccess = document.createElement("span");
    // itemAccess.innerText =`access: ${element.access}` ;
    //
    // let itemParent = document.createElement("span");
    // itemParent.innerText =`parent: ${element.parent}` ;
    //
    // let itemFolder = document.createElement("span");
    // itemFolder.innerText = `folder: ${element.folder}`;

    newItem.appendChild(fileIcon);
    newItem.appendChild(itemName);

    // newItem.appendChild(itemMimeType);
    // newItem.appendChild(itemLink);
    // newItem.appendChild(itemUploadDate);
    // newItem.appendChild(itemOwner);
    // newItem.appendChild(itemAccess);
    // newItem.appendChild(itemParent);
    // newItem.appendChild(itemFolder);
    ListOfFiles.appendChild(newItem);
}

function dropDown(target, cors){
    closeContextMenu();
    let fileId = target.dataset.id;
    let downloadBtn = document.createElement('li');
    downloadBtn.className = "dropDownItem";
    downloadBtn.innerText = "Download";
    downloadBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        let fileName = target.dataset.fileName;
        downloadFile(fileName, fileId);
    });

    let renameBtn = document.createElement('li');
    renameBtn.className = "dropDownItem";
    renameBtn.innerText = "Rename";
    renameBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        rename(ev, fileId);
    });

    function rename(ev, file){
        Modal(ev, "Rename", "Rename", function(newObjectName) {
            renameOnServer(file, newObjectName)
        })
    }



    let shareBtn = document.createElement('li');
    shareBtn.className = "dropDownItem";
    shareBtn.innerText = "Share";
    shareBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        share(ev, fileId);
    });

    function share(ev, file){
        Modal(ev, "Share to", "Share", function(userToAdd) {
            shareItem(file, userToAdd)
        })
    }

    let unShareBtn = document.createElement('li');
    unShareBtn.className = "dropDownItem";
    unShareBtn.innerText = "Remove access";
    unShareBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        unShare(ev, fileId, target.dataset.sharedTo);
    });

    function unShare(ev, file, sharedTo ){
        console.log('*****************TARGET', sharedTo);
        Modal(ev, `Remove one of current users ${sharedTo} :`, "Remove access", function(userToRemove) {
            unShareItem(file, userToRemove)
        })
    }














    let deleteBtn = document.createElement('li');
    deleteBtn.className = "dropDownItem";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        deleteFromServer(fileId);
    });

    let moveToClipboard = document.createElement('li');
    moveToClipboard.className = "dropDownItem";
    moveToClipboard.innerText = "Move";
    moveToClipboard.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        cutItem();
        closeContextMenu();
    });
    let pasteBtn = document.createElement('li');
    pasteBtn.className = "dropDownItem";
    pasteBtn.innerText = "Paste";
    pasteBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        pasteItem();
        closeContextMenu();
    });

    let mkDirBtn = document.createElement('li');
    mkDirBtn.className = "dropDownItem";
    mkDirBtn.innerText = "Create folder";
    mkDirBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        Modal();
        closeContextMenu();
    });

    let shareByLinkBtn = document.createElement('li');
    shareByLinkBtn.className = "dropDownItem";
    shareByLinkBtn.innerText = "Enable access by link";
    shareByLinkBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        shareItemByLink(fileId);
        closeContextMenu();
    });

    let unShareByLinkBtn = document.createElement('li');
    unShareByLinkBtn.className = "dropDownItem";
    unShareByLinkBtn.innerText = "Disable access by link";
    unShareByLinkBtn.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        unShareItemByLink(fileId);
        closeContextMenu();
    });

    let showInfo = document.createElement('li');
    showInfo.className = "dropDownItem";
    showInfo.innerText = "Show Info";
    showInfo.addEventListener('click', (ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        closeContextMenu();
        document.getElementById('infoOfFile').innerHTML= "";

        let itemInfo = document.createElement('div');
        itemInfo.className = 'item-info-block';
        if(!target.dataset.isFolder) {
            itemInfo.innerHTML =
                `<p><span>Name:</span> "${target.dataset.fileName}"</p>
         <p><span>Size:</span> "${target.dataset.size}"</p>
         <p><span>Uploaded on:</span> "${target.dataset.uploadDate}"</p>
         <p><span>Owner:</span> "${target.dataset.owner}"</p>
         <p><span>Shared to:</span> "${target.dataset.sharedTo.toString || ""}"</p>`
        }

        else {
            itemInfo.innerHTML =
                `<p><span>Name:</span>"${target.dataset.fileName}"</p>
         
         <p><span>Uploaded on:</span> "${target.dataset.uploadDate}"</p>
         <p><span>Owner:</span> "${target.dataset.owner}"</p>
         <p><span>Shared to:</span>" ${target.dataset.sharedTo || ""}"</p>`
        }

        document.getElementById('infoOfFile').appendChild(itemInfo);
    });



    let dropDownMenu = document.createElement('ul');
    dropDownMenu.className = "dropdown-menu";
    dropDownMenu.classList.toggle('dropdown-visible');
    dropDownMenu.style.position = "absolute";
    dropDownMenu.style.top = `${cors.y}px`;
    dropDownMenu.style.left = `${cors.x}px`;
    dropDownMenu.style.cursor = "default";

    if(target.id !=='files-list') {
        dropDownMenu.appendChild(downloadBtn);
        dropDownMenu.appendChild(renameBtn);
        dropDownMenu.appendChild(deleteBtn);
        dropDownMenu.appendChild(moveToClipboard);
        dropDownMenu.appendChild(shareBtn);
        dropDownMenu.appendChild(unShareBtn);
        if(target.dataset.isShared === "true"){
            dropDownMenu.appendChild(unShareByLinkBtn);
        }
        else  dropDownMenu.appendChild(shareByLinkBtn);
        dropDownMenu.appendChild(showInfo);
    }
    else {
        dropDownMenu.appendChild(mkDirBtn);
        if(state.clipBoard.length) {
            dropDownMenu.appendChild(pasteBtn);
        }
    }
    target.appendChild(dropDownMenu);
}

function cutItem() {
    state.clipBoard = document.querySelectorAll(".item-selected");
    invertSelection();
}

function pasteItem() {
    let newParent = state.currentFolder;
    let selectedItems = state.clipBoard;
    if (selectedItems.length) {
        selectedItems.forEach(function (item) {
            if (state.currentPath.indexOf(item.dataset.id) === -1) {
                fetch(`/file/move?id=${item.dataset.id}&to=${newParent}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                        'Access-Control-Allow-Origin': "*"
                    }
                }).then((data) => {
                    renderFileStructure(state.currentFolder);
                })
                    .catch(error => console.log("Данные не получены: " + error));
            } else alert(`Sorry, you can't move a folder to its own child or grandchild`);
        });

        state.clipBoard = [];
    }
}

function renameOnServer(file, newName) {
    fetch(`/file/rename?id=${file}&newname=${newName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data) => {
        renderFileStructure(state.currentFolder);
    })
        .catch(error => console.log("Данные не получены: " + error));
}

function deleteFromServer(fileId) {
    fetch(`/file/delete?id=${fileId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data) => {
        renderFileStructure(state.currentFolder);
    })
        .catch(error => console.log("Удаление не прошло: " + error));
}

function downloadFile(fileName, fileId){
    fetch(`/file/download?id=${fileId}`, {
        method: 'GET',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    })
        .then(response => response.blob())
        .then((blob) => saveAs(blob, fileName))
        .catch(error => console.log("Данные не получены: " + error));
}

function Modal(ev, modalTitle = "New folder", buttonText = "create", callback = createNewFolderOnServer){
    let createFolderModal = document.createElement('div');
    createFolderModal.className = "modal";
    createFolderModal.addEventListener('click', (ev)=>{
        if(ev.target === createFolderModal){
            closeModal();
            renderFileStructure();
        }
    });

    let crateFolderWrapper = document.createElement('div');
    crateFolderWrapper.className = "modal-wrapper";

    let inputField = document.createElement('input');
    inputField.addEventListener('keypress', function(ev){
        console.log(ev);
        if(ev.key === 'Enter'){
            callback(inputField.value , state.currentFolderAccessRights);
            closeModal();
            renderFileStructure(state.currentFolder);
        }
    });
    inputField.type= "text";
    inputField.className = "modal-fileName";
    inputField.focus();

    let cancelBtn = document.createElement('button');
    cancelBtn.innerText= "cancel";
    cancelBtn.className = "modal-cancelButton";
    cancelBtn.addEventListener('click', closeModal);

    let createBtn = document.createElement('button');
    createBtn.innerText = buttonText;
    createBtn.className = "modal-createButton";
    createBtn.addEventListener('click', ()=>{
        callback(inputField.value);
        closeModal();
        renderFileStructure(state.currentFolder);
    });

    function closeModal(ev){
        document.getElementsByClassName('modal')[0].remove();
    }

    let modalButtonsWrapper = document.createElement('div');
    modalButtonsWrapper.className = "modalButtons-wrapper";

    let title = document.createElement('h2');
    title.innerText = modalTitle;

    crateFolderWrapper.appendChild(title);
    crateFolderWrapper.appendChild(inputField);
    modalButtonsWrapper.appendChild(cancelBtn);
    modalButtonsWrapper.appendChild(createBtn);
    crateFolderWrapper.appendChild(modalButtonsWrapper);
    createFolderModal.appendChild(crateFolderWrapper);
    document.getElementById("wrapper").appendChild(createFolderModal);

}

function createNewFolderOnServer(name , accessRights){
    fetch(`/file/createfolder?name=${name}&parent=${state.currentFolder}&access=${accessRights}`, {
        method: 'POST',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data)=>{
        renderFileStructure(state.currentFolder);
    })
        .catch(error => console.log("Данные не получены: " + error));
}

function renderFilePath(folderId = "/") {
    if (folderId !== state.currentFolder) {
        let currentPath = state.currentPath;
        let pathItems = currentPath.split(',');
        let index = pathItems.indexOf(folderId);
        let newPath = pathItems.slice(0, index + 1);
        filePath.innerHTML = "";
        filePath.appendChild(rootFolder);
        state.currentPath = "/";
        newPath.forEach(function (item) {
            fetch(`http://127.0.0.1:8000/file/getelement?id=${item}`, {
                method: 'POST'
            }).then(function (response) {
                return response.text()
            })
                .then(function (textOfResponse) {
                    return JSON.parse(textOfResponse);
                })
                .then(function (data) {
                    if (data) {
                        addToFilePath(data[0])
                    }
                })
                .catch(error => error);
        });
    }
}

function addToFilePath(element) {
        let path = state.currentPath;

        state.currentPath = `${path},${element.fileId}`;

        let item = document.createElement('span');

        item.className = "file-path_item";
        item.innerText = `${element.name}/`;
        item.dataset.parent = element.fileId;

        item.addEventListener('click', function () {
            renderFileStructure(element.fileId);
            renderFilePath(element.fileId);

        });
        filePath.appendChild(item);
    }
function closeContextMenu() {
    if (document.getElementsByClassName("dropdown-menu")[0]) {
        document.getElementsByClassName("dropdown-menu")[0].remove();
    }
}

function shareItem(id, userToAdd){
    fetch(`/file/share?id=${id}&user=${userToAdd}`, {
        method: 'POST',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data)=>{
        renderFileStructure(state.currentFolder);
    })
        .catch(error => console.log("Данные не получены: " + error));
}
function unShareItem(id, userToRemove){
    console.log('REMOVING ACCESSS',id, userToRemove );
    fetch(`/file/unshare?id=${id}&user=${userToRemove}`, {
        method: 'POST',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data)=>{
        renderFileStructure(state.currentFolder);
    })
        .catch(error => console.log("Данные не получены: " + error));
}



function unShareItemByLink(id){
    fetch(`/file/unsharebylink?id=${id}`, {
        method: 'POST',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data)=>{
        renderFileStructure(state.currentFolder);
    })
        .catch(error => console.log("Данные не получены: " + error));
}

function shareItemByLink(id){
    fetch(`/file/sharebylink?id=${id}`, {
        method: 'POST',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data)=>{
        renderFileStructure(state.currentFolder);
    })
        .catch(error => console.log("Данные не получены: " + error));
}

function truncateMe(text) {

    if (text.length > 12) {
        return text.substr(0, 10) + "...";
    }
    else return text
}

function handleSharedFileownload(fileName, fileId){
    fetch(`/file/download?id=${fileId}`, {
        method: 'GET',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    })
        .then(response => response.blob())
        .then((blob) => saveAs(blob, fileName))
        .catch(error => console.log("Данные не получены: " + error));
}

function getFilesSharedToMe (folder = "/") {
    fetch(`/file/getfilessharedtome?folder=${folder}`, {
        method: 'POST'
    }).then(function (response) {
        return response.text()
    })
        .then(function (textOfResponse) {
            return JSON.parse(textOfResponse);
        })
        .then(function (array) {

            ListOfFiles.innerHTML = "";
            addAllToList(array)
        })
        .catch(error => console.log("Данные не получены: " + error));
}




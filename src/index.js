let state = {
    currentFolder: "/",
    currentPath:"/",
    clipBoard:[]
};

const ListOfFiles = document.getElementById('files-list');
ListOfFiles.addEventListener('contextmenu',(ev)=>{
    ev.preventDefault();
    let myCors = {
        x: ev.clientX,
        y: ev.clientY
    };
    if(state.clipBoard.length) {
        dropDown(ev.currentTarget, myCors)
    }

    else closeContextMenu();
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

let createFolderBtn = document.getElementById('create-folder');
createFolderBtn.addEventListener('click',Modal);

//upload via input field
const FileInput = document.getElementById("file-input");
FileInput.addEventListener('focus', ()=> DropZone.querySelector('label').classList.add('focus'));
FileInput.addEventListener('blur', ()=> DropZone.querySelector('label').classList.remove('focus'));
FileInput.addEventListener('change', function(e){
    e.preventDefault();
    console.log("files  ", this.files);
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
    fetch(`/file/upload?parent=${state.currentFolder}`, {
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
    if(document.querySelectorAll('.selected-item')){
        document.querySelectorAll('.selected-item').forEach(function(item){
            item.classList.remove('selected-item');
        })
    }
}

function renderFileStructure (folder = "/") {
    fetch(`http://127.0.0.1:8000/file/listfiles?folder=${folder}`, {
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
    let newItem = document.createElement("li");
    newItem.className = "file-container";
    newItem.dataset.parent = element.parent;
    newItem.addEventListener('click', (ev) =>{
        ev.preventDefault();
        ev.stopPropagation();
        selectItem(ev.currentTarget);
    });
     if(element.isFolder) {
         newItem.addEventListener('dblclick', function(ev){
             openFolder(element.name, element.fileId)
         });
     }

    function openFolder(name, id) {
        state.currentFolder = id;
        renderFileStructure(id);
        addToFilePath(element);
    }

    function selectItem(target){
        target.classList.add('item-selected');
     }

    newItem.addEventListener('contextmenu',(ev)=> {
        ev.preventDefault();
        ev.stopPropagation();
        selectItem(ev.currentTarget);
        closeContextMenu(ev);
        let cors = {
            x: ev.clientX,
            y: ev.clientY
        };
        dropDown(ev.currentTarget, cors);
    });
    newItem.dataset.id = element.fileId;

    let itemName = document.createElement("span");
    itemName.innerText = element.name;
    itemName.className = "file-name";

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
        let fileName = target.querySelector('.file-name').innerText;
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

    let dropDownMenu = document.createElement('ul');
    dropDownMenu.className = "dropdown-menu";
    dropDownMenu.classList.toggle('dropdown-visible');
    dropDownMenu.style.position = "fixed";
    dropDownMenu.style.top = `${cors.y}px`;
    dropDownMenu.style.left = `${cors.x}px`;

    if(target.id !=='files-list') {
        dropDownMenu.appendChild(downloadBtn);
        dropDownMenu.appendChild(renameBtn);
        dropDownMenu.appendChild(deleteBtn);
        dropDownMenu.appendChild(moveToClipboard);
    }
    else dropDownMenu.appendChild(pasteBtn);
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

    let nameField = document.createElement('input');
    nameField.type= "text";
    nameField.className = "modal-fileName";
    nameField.focus();

    let cancelBtn = document.createElement('button');
    cancelBtn.innerText= "cancel";
    cancelBtn.className = "modal-cancelButton";
    cancelBtn.addEventListener('click', closeModal);

    let createBtn = document.createElement('button');
    createBtn.innerText = buttonText;
    createBtn.className = "modal-createButton";
    createBtn.addEventListener('click', ()=>{
        callback(nameField.value);
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
    crateFolderWrapper.appendChild(nameField);
    modalButtonsWrapper.appendChild(cancelBtn);
    modalButtonsWrapper.appendChild(createBtn);
    crateFolderWrapper.appendChild(modalButtonsWrapper);
    createFolderModal.appendChild(crateFolderWrapper);
    document.getElementById("wrapper").appendChild(createFolderModal);

}

function createNewFolderOnServer(name){
    fetch(`/file/createfolder?name=${name}&parent=${state.currentFolder}`, {
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


//***************************************//





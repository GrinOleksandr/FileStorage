const ListFiles = document.getElementById('get-files');
ListFiles.addEventListener('click', listFiles );

const ListOfFiles = document.getElementById('files-list');

/////////////////////////////////////----------UPLOAD----------/////////////////////////////////////
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
const FileInput = document.getElementById("file-input");
FileInput.addEventListener('focus', ()=> DropZone.querySelector('label').classList.add('focus'));
FileInput.addEventListener('blur', ()=> DropZone.querySelector('label').classList.remove('focus'));

//upload via input field
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

//upload via drag&drop
DropZone.addEventListener('drop', function(e){
    e.stopPropagation();
    e.preventDefault();
    let files = e.dataTransfer.files;
    DropZone.classList.remove('dragover');
    console.log(e.dataTransfer.items[0]);
    FileInput.files = files;
});


/////SUBMITTING via AJAX
function ajaxSendFiles(){
    let request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:8000/file/upload', true);
    request.setRequestHeader('accept', 'application/json');
    let formData = new FormData(DropZone);
    request.send(formData);
}

/////////////////////////////////////----------!LIST-FILES!----------/////////////////////////////////////

function listFiles(){
    console.log("listed");
    renderList();
}

function renderList () {
    fetch("http://127.0.0.1:8000/file/getfiles?", {
        method: 'GET'
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
        addFromBase(item)
    });
}

function fileClick(target){
    let fileName = target.getElementsByClassName("file-name")[0].innerText;
    console.log(target.getElementsByClassName("file-name")[0].innerText);
    downloadFile(fileName);
}

function addFromBase(element) {
    let newItem = document.createElement("li");
    newItem.addEventListener('click', (ev) =>{
        ev.preventDefault();
        ev.stopPropagation();
        fileClick(ev.currentTarget);
    });

    let itemName = document.createElement("span");
    itemName.innerText = element.name;
    itemName.className = "file-name";

    let fileIcon = document.createElement("span");
    fileIcon.className = "file-icon";
    fileIcon.style.backgroundImage = `url(./img/file-type-icons/doc.png)`;

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

//////////////////////////////////////////////////////--------------Download------------/////////////////////////////////
let readFileBtn = document.getElementById('readfile');
readFileBtn.addEventListener('click', downloadFile);
function downloadFile(file){
    console.log('reading file');
    fetch(`http://127.0.0.1:8000/file/download?name=${file}`, {
        method: 'GET',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    })
        .then(response => response.blob())
        .then((blob) => saveAs(blob, file))
        .catch(error => console.log("Данные не получены: " + error));
}

/////////////**********************CREATE FOLdER***********************////////////////////////////

let folderNameInput = document.getElementById("folder-name");
let createFolderBtn = document.getElementById('create-folder');
createFolderBtn.addEventListener('click',createFolder);

function createNewFolder(name){
    console.log();
    fetch(`/file/createfolder?name=${name}`, {
        method: 'POST',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data)=>{
        console.log(data);
    })
        .catch(error => console.log("Данные не получены: " + error));
}

function createFolder(){

    let newItem = document.createElement("li");
    // newItem.addEventListener('click', (ev) =>{
    //     ev.preventDefault();
    //     ev.stopPropagation();
    //     fileClick(ev.currentTarget);
    // });

    let itemName = document.createElement("span");
    itemName.innerText = "New Folder";
    itemName.className = "file-name";
    itemName.contentEditable = "true";
    itemName.addEventListener('change', function(){
        if(itemName.innerText === ""){
            itemName.innerText = "New Folder"
        }
        createNewFolder(itemName.innerText);
    });
    itemName.addEventListener('keypress', function(key){
        if(key.keyCode === 13){
            console.log('eneter pressed');
            createFolderBtn.focus();
        }
    });

    itemName.addEventListener('click', function(){
        let oldName = itemName.innerText;
        itemName.style.backgroundColor = "white";
        let r = document.createRange();
        r.selectNodeContents(itemName);
        let sel=window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        itemName.focus();
        itemName.dataset.oldname = itemName.innerText;

    });

    itemName.addEventListener('focusout', function(){
        itemName.style.backgroundColor = "transparent";
        if(itemName.innerText === ""){
            itemName.innerText = "New Folder"
        }
        if(itemName.dataset.oldName){
            rename(itemName.dataset.oldName, itemName.innerText)
        }
        createNewFolder(itemName.innerText);
    });

    let fileIcon = document.createElement("span");
    fileIcon.className = "file-icon";
    fileIcon.style.backgroundImage = `url(./img/file-type-icons/folder_icon.png)`;

    newItem.appendChild(fileIcon);
    newItem.appendChild(itemName);

    ListOfFiles.appendChild(newItem);

    itemName.style.minWidth = "70px";
    itemName.style.backgroundColor = "white";
    itemName.innerText = "New Folder";
    let r = document.createRange();
    r.selectNodeContents(itemName);
    let sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
    itemName.focus();
}

function rename(oldName, newName){
    console.log(oldName, newName);
    fetch(`/file/rename?oldname=${oldName}&newname=${newName}`, {
        method: 'POST',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    }).then((data)=>{
        console.log(data);
    })
        .catch(error => console.log("Данные не получены: " + error));
}

import './css/style.css';

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
    ajaxSendFiles();
});

//upload via drag&drop
DropZone.addEventListener('drop', function(e){
    e.stopPropagation();
    e.preventDefault();
    let files = e.dataTransfer.files;
    DropZone.classList.remove('dragover');
    FileInput.files = files;
    ajaxSendFiles();
});


/////SUBMITTING via AJAX
function ajaxSendFiles(){
    let request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:8000/upload', true);
    request.setRequestHeader('accept', 'application/json');
    let formData = new FormData(DropZone);
    request.send(formData);
}

/////////////////////////////////////----------!LIST-FILES!----------/////////////////////////////////////
// function postFile(name,type){
//     let urlString = `http://127.0.0.1:8000/add?name=${name}&type=${type}`;
//     fetch(urlString, {
//         method: 'GET'
//     })
//         .catch(error => console.log("Данные не отправленны: " + error));
//
//     console.log(`${name}.${type}   OK`)
// }

function listFiles(){
    console.log("listed");
    renderList();
}

function renderList () {
    fetch("http://127.0.0.1:8000/getfiles?", {
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

function addFromBase(element) {
    let newItem = document.createElement("li");

    let itemName = document.createElement("span");
    itemName.innerText = element.name;

    let itemMimeType = document.createElement("span");
    itemMimeType.innerText = `type: ${element.mimetype}`;


    let itemLink = document.createElement("span");
    itemLink.innerText = `link: ${element.link}`;

    let itemUploadDate = document.createElement("span");
    itemUploadDate.innerText = `date: ${element.uploadDate}`;

    let itemOwner = document.createElement("span");
    itemOwner.innerText =`owner: ${element.owner}`;

    let itemAccess = document.createElement("span");
    itemAccess.innerText =`access: ${element.access}` ;

    let itemParent = document.createElement("span");
    itemParent.innerText =`parent: ${element.parent}` ;

    let itemFolder = document.createElement("span");
    itemFolder.innerText = `folder: ${element.folder}`;

    newItem.appendChild(itemName);
    newItem.appendChild(itemMimeType);
    newItem.appendChild(itemLink);
    newItem.appendChild(itemUploadDate);
    newItem.appendChild(itemOwner);
    newItem.appendChild(itemAccess);
    newItem.appendChild(itemParent);
    newItem.appendChild(itemFolder);
    ListOfFiles.appendChild(newItem);
}
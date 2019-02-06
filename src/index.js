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
FileInput.addEventListener('change', function(){
  DropZone.submit();
});

//upload via drag&drop
DropZone.addEventListener('drop', function(e){
    e.stopPropagation();
    e.preventDefault();
    sendFiles(e.dataTransfer.files)
});

function sendFiles(file) {
    console.log(file);
    DropZone.classList.remove('dragover');
    let temp = new ClipboardEvent('').clipboardData || new DataTransfer();
    [].forEach.call(file, function(item){
    temp.items.add(new File([item], item.name));
    });
    console.log(temp.files);
    FileInput.files = temp.files;
    DropZone.submit();
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
    array.forEach(function (item) {
        addFromBase(item)
    });
}

function addFromBase(element) {
    let newItem = document.createElement("li");

    let itemName = document.createElement("span");
    itemName.innerText = element.name;

    let itemCalories = document.createElement("span");
    itemCalories.innerText = `(${element.mimetype} Ккал.)`;
    itemCalories.style.color = "blue";
    itemCalories.style.fontWeight = "400";

    newItem.appendChild(itemName);
    newItem.appendChild(itemCalories);
    ListOfFiles.appendChild(newItem);
}
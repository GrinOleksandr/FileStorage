// import MyController from './js/controller/controller_script.js';

import './css/style.css';


const FileName = document.getElementById('file-name');
const FileType = document.getElementById('file-type');
const PostBtn = document.getElementById('post-file');
PostBtn.addEventListener('click', () =>{ postFile(FileName.value, FileType.value)});
const ListFiles = document.getElementById('get-files');
ListFiles.addEventListener('click', listFiles );

const ListOfFiles = document.getElementById('files-list');

function postFile(name,type){
    let urlString = `http://127.0.0.1:8000/add?name=${name}&type=${type}`;
    fetch(urlString, {
        method: 'GET'
    })
        .catch(error => console.log("Данные не отправленны: " + error));

    console.log(`${name}.${type}   OK`)



}

function listFiles(){
    console.log("listed");
    renderList();
}




function renderList () {
    fetch("http://127.0.0.1:8000/get?", {
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
    itemCalories.innerText = `(${element.type} Ккал.)`;
    itemCalories.style.color = "blue";
    itemCalories.style.fontWeight = "400";

    newItem.appendChild(itemName);
    newItem.appendChild(itemCalories);
    ListOfFiles.appendChild(newItem);
}
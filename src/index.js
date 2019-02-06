// import MyController from './js/controller/controller_script.js';

import './css/style.css';


const FileName = document.getElementById('file-name');
const FileType = document.getElementById('file-type');
const PostBtn = document.getElementById('post-file');
PostBtn.addEventListener('click', () =>{ postFile(FileName.value, FileType.value)});
const ListFiles = document.getElementById('get-files');
ListFiles.addEventListener('click', listFiles );

const ListOfFiles = document.getElementById('files-list');
// DRAG&DROP
const DropZone = document.getElementById("upload-container");
// DropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function(){
//     return false;
// });
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
    // let files = this.files;
    // sendFiles(files);
    DropZone.submit();
});

//upload via drag&drop
DropZone.addEventListener('drop', function(e){
    e.stopPropagation();
    e.preventDefault();
    sendFiles(e.dataTransfer.files)
    // FileInput.value = e.dataTransfer.files;
});



function sendFiles(file) {
    console.log(file);


    DropZone.classList.remove('dragover');
    let temp = new ClipboardEvent('').clipboardData || // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
        new DataTransfer(); // specs compliant (as of March 2018 only Chrome)
    [].forEach.call(file, function(item, i, arr){
    temp.items.add(new File([item], item.name));
    });
    console.log(temp.files);
    FileInput.files = temp.files;
    DropZone.submit();
}




///////////////////////////////////////////////////////////////////////////////TESTTTTT
// const form = document.getElementById('test');
// const input = document.getElementById('filefile');
// const inputBtn = document.getElementById('filefilebtn');
// inputBtn.addEventListener('click', add);
//
// function add(){
//     console.log(input.files);
//     // fetch("http://127.0.0.1:8000/test", {
//     //         method: 'POST',
//     //         body:input.files[0]
//     //     }).then(function (response) {
//     //         return response.text()
//     //     }).then(function(response){
//     //         console.log(response)
//     //     })
//     form.submit();
//
// }
//////new SENDFILES
// function sendFiles(file){
//     console.log(file);
//
//     DropZone.classList.remove('dragover');
//     let temp = new ClipboardEvent('').clipboardData || // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
//         new DataTransfer(); // specs compliant (as of March 2018 only Chrome)
//     // [].forEach.call(file, function(item, i, arr){
//     temp.items.add(new File([file], file.name));
//     // });
//     console.log(temp.files);
//     FileInput.files = temp.files;
//
//     fetch("http://127.0.0.1:8000/test", {
//         method: 'POST',
//         body:file
//     }).then(function (response) {
//         return response.text()
//     }).then(function(response){
//         console.log(response)
//     })

//////////////////////////////////////////////////








///////////////////////////////////////////////////////////////////////////////TESTTTTT




//
// function sendFiles(file){
//     console.log(file);
//
//     DropZone.classList.remove('dragover');
//     let temp = new ClipboardEvent('').clipboardData || // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
//         new DataTransfer(); // specs compliant (as of March 2018 only Chrome)
//     // [].forEach.call(file, function(item, i, arr){
//     temp.items.add(new File([file], file.name));
//     // });
//     console.log(temp.files);
//     FileInput.files = temp.files;
//     DropZone.submit();




// DropZone.submit();

    // let data = new FormData();
    // [].forEach.call(files, function(item, i, arr){
    //     data.append('images',files);
    // });

    // data.append('name', file.name);
    // data.append('type', file.type);
    // data.append('size', file.size);
    // data.append('file', file);
    // console.log(data);

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST',"http://127.0.0.1:8000/upload", true);
    // xhr.send(data);
    // fetch("http://127.0.0.1:8000/upload?", {
    //     method: 'POST'
    // }).then(function (response) {
    //     return response.text()
    // }).then(function(response){
    //     console.log(response)
    // })
    // let form=new FormData();
    // let xhr = new XMLHttpRequest();
    // form.append("file",files);
    // xhr.open("post","/upload",true);
    // xhr.send(form);

// }



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
    itemCalories.innerText = `(${element.type} Ккал.)`;
    itemCalories.style.color = "blue";
    itemCalories.style.fontWeight = "400";

    newItem.appendChild(itemName);
    newItem.appendChild(itemCalories);
    ListOfFiles.appendChild(newItem);
}
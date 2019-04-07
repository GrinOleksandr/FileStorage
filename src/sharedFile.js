let params = (new URL(document.location)).searchParams;
let file = params.get('file');
let fileNameField = document.getElementById('shared-file');
let downloadSharedFileBtn = document.getElementById('downloadSharedFile');
let filesContainer = document.getElementById('shared-file-info-wrapper');
let fileSize = document.getElementById('fileSize');






document.addEventListener("DOMContentLoaded", function() {
    handleSharedFileDownloadAtempt(file)
});



function handleSharedFileDownloadAtempt(link){
    console.log('link', link);
       fetch(`/file/getsharedfileinfo?file=${link}`, {
        method: 'GET',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    })
        .then(function (response) {
            return response.text()
        })
        .then(function (textOfResponse) {
            console.log('resp', textOfResponse);
            if(textOfResponse === "Access denied"){
                filesContainer.innerHTML = `<h1>****Access denied****</h1>`
            }
            else if(textOfResponse === "Folder"){
                filesContainer.innerHTML = `<h1>****Register to share folder****</h1>`
            }
            return JSON.parse(textOfResponse);
        })
        .then(function (data) {
            console.log(data);
            if (data) {
                renderShareFilePage(data[0])
            }


        })
        .catch(error => error);
}

function renderShareFilePage(requestedFile){
    console.log("requesting file!", requestedFile);
    if(requestedFile.isShared) {
        if (requestedFile.isFolder) {
            fileNameField.innerText = requestedFile.name;
            downloadSharedFileBtn.addEventListener('click', () => {
                downloadSharedFolder(requestedFile.name, requestedFile.fileId)
            })
        }
        fileNameField.innerText = requestedFile.name;
        fileSize.innerText = requestedFile.size;
        downloadSharedFileBtn.addEventListener('click', () => {
            downloadSharedFile(requestedFile.name, requestedFile.fileId)
        })
    }
    else filesContainer.innerHTML = "<h3>Access denied</h3>";
}

function downloadSharedFile(fileName, fileId){
    console.log('donwloasdiads', fileName, fileId);
    fetch(`/file/downloadsharedfile?file=${fileId}`, {
        method: 'GET',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    })
        .then(response => response.blob())
        .then((blob) => saveAs(blob, fileName))
        .catch(error => console.log("Данные не получены: " + error));
}

function downloadSharedFolder(fileName, fileId){
    console.log(fileId);
    fetch(`/file/downloadsharedfolder?folder=${fileId}`, {
        method: 'GET',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    })
        .then(response => response.blob())
        .then((blob) => saveAs(blob, fileName))
        .catch(error => console.log("Данные не получены: " + error));
}



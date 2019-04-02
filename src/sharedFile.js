let params = (new URL(document.location)).searchParams;
let file = params.get('file');
let fileNameField = document.getElementById('shared-file');
let downloadSharedFileBtn = document.getElementById('downloadSharedFile');
let filesContainer = document.getElementById('shared-file-info-wrapper');






document.addEventListener("DOMContentLoaded", function() {
    handleSharedFileDownloadAtempt(file)
});



function handleSharedFileDownloadAtempt(link){
       fetch(`/file/getsharedfile?file=${link}`, {
        method: 'GET',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    })
        .then(function (response) {
            return response.text()
        })
        .then(function (textOfResponse) {
            return JSON.parse(textOfResponse);
        })
        .then(function (data) {
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

        }
        fileNameField.innerText = requestedFile.name;
        downloadSharedFileBtn.addEventListener('click', () => {
            console.log('donwloasdiads');
            downloadSharedFile(requestedFile.name, requestedFile.fileId)
        })
    }
    else filesContainer.innerHTML = "<h3>Access denied</h3>";
}

function downloadSharedFile(fileName, fileId){
    console.log(fileId);
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



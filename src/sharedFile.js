let params = (new URL(document.location)).searchParams;
let file = params.get('file');
let fileNameField = document.getElementById('shared-file');




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
    fileNameField.innerText = requestedFile.name;

}
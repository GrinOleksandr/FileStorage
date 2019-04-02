let params = (new URL(document.location)).searchParams;
let file = params.get('file');





document.addEventListener("DOMContentLoaded", function() {
    handleSharedFileDownloadAtempt(link)

});



function handleSharedFileDownloadAtempt(link){

    fetch(`/file/getsharedfile?file=${link}`, {
        method: 'GET',
        headers:{'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': "*"
        }
    })
        .then(function (textOfResponse) {
            return JSON.parse(textOfResponse);
        })
        .then(function (data) {
            if (data) {
                renderShareFilePage(data);
            }
        })
        .catch(error => error);
}

function renderShareFilePage(requestedFile){
    console.log(requestedFile);
}
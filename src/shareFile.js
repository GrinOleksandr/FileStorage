let parsedUrl = new URL(window.location.href);
let link = parsedUrl.searchParams.get("link");

document.addEventListener("DOMContentLoaded", function() {
    handleSharedFileDownloadAtempt(link)
});



function handleSharedFileDownloadAtempt(link){

    fetch(`/file/getsharedfile?link=${link}`, {
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
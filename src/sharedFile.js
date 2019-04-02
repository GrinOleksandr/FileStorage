let parsedUrl = new URL(window.location.href);
let link = parsedUrl.params.get("file");
// let params = new URL(document.location);
// let name = params.get('file');
console.log(link);
// console.log(parsedUrl);
// console.log(name);

// document.addEventListener("DOMContentLoaded", function() {
//     handleSharedFileDownloadAtempt(link)

// });



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
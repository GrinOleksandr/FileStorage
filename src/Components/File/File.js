import React, {Component} from "react";
import './File.css';
const FileSaver = require('file-saver');


class File extends Component {
    constructor(props) {
        super(props);

        this.downloadFile = this.downloadFile.bind(this);
    }

    fileClick(target){
        let fileName = target.getElementsByClassName("file-name")[0].innerText;
        console.log(target.getElementsByClassName("file-name")[0].innerText);
        this.downloadFile(fileName);
    }

    //Download------------//
    // let readFileBtn = document.getElementById('readfile');
    // readFileBtn.addEventListener('click', downloadFile);
    downloadFile(fileName){
        console.log('reading file');
        fetch(`http://127.0.0.1:8000/file/download?name=${fileName}`, {
            method: 'GET',
            headers:{'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': "*"
            }
        })
            .then(response => response.blob())
            .then((blob) => FileSaver.saveAs(blob, fileName))
            .catch(error => console.log("Данные не получены: " + error));
    }

    fileOnClick(ev){
        ev.preventDefault();
        ev.stopPropagation();
        this.fileClick(ev.currentTarget);
    }

    render() {
        const {fileName, fileIcon} = this.props.file;
        return (
           <div className="file" onClick={this.fileOnClick}>
               <span className="file-name">{fileName}</span>
               <span className="file-icon">{fileIcon}</span>
           </div>
        );
    }
}


export default File;


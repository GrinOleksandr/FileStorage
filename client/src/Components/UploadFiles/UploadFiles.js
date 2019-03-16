import React, {Component} from "react"
import './UploadFiles.css';
class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.fileInputHandler = this.fileInputHandler.bind(this);
        this.ajaxSendFiles = this.ajaxSendFiles.bind(this);
        this.dropZoneOnDrop = this.dropZoneOnDrop.bind(this);
        this.fileInputLabelOnBlur = this.fileInputLabelOnBlur.bind(this);
        this.fileInputLabelOnFocus = this.fileInputLabelOnFocus.bind(this);
        this.dropZoneOnDragOver = this.dropZoneOnDragOver.bind(this);
        this.dropZoneOnDragEnter = this.dropZoneOnDragEnter.bind(this);

        this.DropZone = document.getElementById("upload-container");
        this.FileInput = document.getElementById("file-input");

    }


    //upload via input field
    fileInputHandler(e) {
        e.preventDefault();
        console.log("files  ", this.files);
        if (this.files[0].isDirectory) {
            console.log(`DIRECTORY!! : ${this.files[0]}`)
        }
        [].forEach.call(this.files, function (item) {
            if (item.isDirectory) {
                console.log(`DIRECTORY!! : ${item}`)
            }
        });
        this.ajaxSendFiles();
    }

    //upload via drag&drop
    dropZoneOnDrop(e){
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files;
        this.DropZone.classList.remove('dragover');
        console.log(e.dataTransfer.items[0]);
        this.FileInput.files = files;
    }

    // Submitting via AJAX
    ajaxSendFiles(){
        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:3000/file/upload', true);
        request.setRequestHeader('accept', 'application/json');
        let formData = new FormData(this.DropZone);
        request.send(formData);
    }

    //adding focus effect
    fileInputLabelOnFocus(){
        this.DropZone.classList.add('focus');
    }

    fileInputLabelOnBlur(){
        this.DropZone.classList.remove('focus');
    }

    //UPLOAD-Container EFFECTS

    dropZoneOnDragOver(e){
        e.stopPropagation();
        e.preventDefault();
        this.DropZone.classList.add('dragover');
    }

    dropZoneOnDragEnter(e){
        e.stopPropagation();
        e.preventDefault();
        this.DropZone.classList.add('dragover');
    }











    render() {
        return (
            <form id="upload-container" method="POST" encType="multipart/form-data"
                  action='http://127.0.0.1:8000/file/upload' onDrop={this.dropZoneOnDrop} onDragEnter={this.dropZoneOnDragEnter}
                  onDragOver={this.dropZoneOnDragOver} onDragLeave={this.dropZoneOnDragLeave}>
                <img id="upload-image" src="img/upload.png" />
                <div>
                    <input id="file-input" type="file" name="fileInput" multiple  onClick={this.fileInputHandler} />
                    <label htmlFor="file-input" onFocus={this.fileInputLabelOnFocus}
                           onBlur={this.fileInputLabelOnBlur}>Выберите файл</label>
                    <span>или перетащите его сюда</span>
                </div>
            </form>
        );
    }
}


export default UploadFiles;


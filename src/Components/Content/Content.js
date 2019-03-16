import React, {Component} from 'react';
import UploadFiles from "../UploadFiles/UploadFiles.js";

import './Content.css';

class Content extends Component {
    constructor(props){
        super(props);

        this.downloadFile = this.downloadFile.bind(this);
        this.fileClick = this.fileClick.bind(this);

        // this.uploadString = `${window.location.origin}/upload`;
        this.state = { MyFiles: "" };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/file/getfiles?", {
            method: 'GET'
        }).then(function (response) {
            return response.text()
        })
            .then(function (textOfResponse) {
                return JSON.parse(textOfResponse);
            })
            .then((array) => this.setState({MyFiles : array })
            )
            .catch(error => console.log("Данные не получены: " + error));
    }

    render() {
        return (

            <div id='container1'>
    <div id='sidebar'>Sidebar</div>
    <div id='content'>
        <UploadFiles />

        <button id="readfile">ReadFile</button>
        <button id="get-files">GET</button>

    </div>
</div>

        );
    }
}






export default Content;
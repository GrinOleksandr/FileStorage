import React, {Component} from 'react';
import UploadFiles from "../UploadFiles/UploadFiles.js";

import './Content.css';

class Content extends Component {
    constructor(props){
        super(props);

        // this.downloadFile = this.downloadFile.bind(this);
        // this.fileClick = this.fileClick.bind(this);
        this.state = { MyFiles: "" };
    }

    render() {
        return (

            <div id='container1'>
                <UploadFiles/>


            </div>


        );
    }
}






export default Content;
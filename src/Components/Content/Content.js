import React, {Component} from 'react';
import './Content.css';

class Content extends Component {
    render() {
        return (

            <div id='container1'>

    <div id='sidebar'>Sidebar</div>
    <div id='content'>Content
        <form id="upload-container" method="POST" encType="multipart/form-data"
              action='http://localhost:8000/upload'>
            <img id="upload-image" src="img/upload.png" />
                <div>
                    <input id="file-input" type="file" name="fileInput" multiple allowdirs />
                        <label htmlFor="file-input">Выберите файл</label>
                        <span>или перетащите его сюда</span>
                </div>
        </form>
        <button id="readfile">ReadFile</button>
        <button id="get-files">GET</button>
        <ul id='files-list'></ul>

    </div>
</div>

        );
    }
}



    export default Content;
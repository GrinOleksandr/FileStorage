import React, {Component} from "react"
import File from "../File/File.js";
import './MyFiles.css';
class MyFiles extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='MyFiles'>
                {
                    this.props.files.map((file, key) => {
                        return (
                            <li key={key}>
                                <h2>  file={file} </h2>
                            </li>
                        )
                    })
                }
            </div>
        );
    }
}


export default MyFiles;


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
                <ul className="CityList-list">
                    {
                        this.props.files.map((file, key) => {
                            return (
                                <li key={key}>
                                    <File file={file}/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}


export default MyFiles;


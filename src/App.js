import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header.js';
import Content from './Components/Content/Content.js';


class App extends Component {
    render() {
        return (
            <div className="root">

            <Header />
                <Content />
            </div>
        );
    }
}


export default App;

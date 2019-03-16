import React, {Component} from "react";
import './Header.css';
class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='header'>
                <section id="logo">
                    <div>
                        <h1>FileX</h1>
                        <h2>Your files live here</h2>
                    </div>
                </section>
                <section id="info-block">
                    <form action="" method="post" id="search">
                        <input type="search" name="" placeholder="поиск" className="input"/>
                        <input type="submit" name="" value="" className="submit"/>
                    </form>

                    <span id="account-info"><a href="#">Vasiliy Pupkin</a></span>
                </section>


                <section id="login-block">
                    <input id="username-input" type='text' placeholder="Name"/>
                    <button id="login-button">Login</button>
                    <input id="password-input" type='text' placeholder="Password"/>
                    <button id="register-button">Register</button>
                </section>


            </div>
        );
    }
}

export default Header;


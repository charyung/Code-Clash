// React
import * as React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

// Routes
import Blocks from '../blocks/blocks';
import RegistrationForm from '../accounts/register/register';
import SignInForm from '../accounts/signIn/signIn';
import Account from '../accounts/accounts';
import Upload from '../accounts/upload/upload';

// Style
import './header.css';

class Header extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        <div className="header">
                            <div className="header-link">
                                <Link to="/"><h3>Code Clash</h3></Link>
                            </div>
                            <div className="header-link">
                                <Link to="/blocks">Blocks</Link>
                            </div>
                            <div className="header-link">
                                <Link to="/register">Register</Link>
                            </div>
                            <div className="header-link">
                                <Link to="/signin">Sign In</Link>
                            </div>
                            <div className="header-link">
                                <Link to="/account">Account</Link>
                            </div>
                            <div className="header-link">
                                <Link to="/upload">Upload</Link>
                            </div>
                        </div>
                    </div>

                    <Route exact path="/" component={Home} />
                    <Route path="/blocks" component={Blocks} />
                    <Route path="/register" component={RegistrationForm} />
                    <Route path="/signin" component={SignInForm} />
                    <Route path="/account" component={Account} />
                    <Route path="/upload" component={Upload} />
                </div>
            </BrowserRouter>
        )
    }
}

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

export default Header;
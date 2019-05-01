// React
import * as React from "react";
import { Link } from "react-router-dom";

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
        )
    }
}

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

export default Header;
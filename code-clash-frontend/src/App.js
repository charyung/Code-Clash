import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';
import Blocks from './subclasses/blocks/blocks.js';
import RegistrationForm from './subclasses/register/register.js';
import SignInForm from './subclasses/signIn/signIn.js';
import Account from './subclasses/accounts/accounts.js';
import Upload from './subclasses/accounts/upload/upload.js';

const Header = () => (
	<BrowserRouter>
		<div>
			<div>
				<div className="headerWrapper">
					<div className="headerClass">
						<h1> Code Clash </h1>
						<Link to="/blocks">Blocks</Link>
						<Link to="/register">Register</Link>
						<Link to="/signin">Sign In</Link>
						<Link to="/account">Account</Link>
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
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
	<div>
		<div className="headerWrapper">
			<div className="headerClass">
				<h1> Code Clash </h1>
				<Link to="/">Home</Link>
				<Link to="/topics">Topics</Link>
			</div>
		</div>
		<h2>About</h2>
	</div>
);

const Topics = ({ match }) => (
	<div>
		<div className="headerWrapper">
			<div className="headerClass">
				<h1> Code Clash </h1>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</div>
		</div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>Rendering with React</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>Components</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>Props v. State</Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Topic} />
		<Route
		  exact
		  path={match.url}
		  render={() => <h3>Please select a topic.</h3>}
		/>
	</div>
);

const Topic = ({ match }) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
);

export default Header;

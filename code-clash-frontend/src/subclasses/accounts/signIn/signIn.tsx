import * as React from 'react';
import './signIn.css';

class SignInForm extends React.Component
{	
	
	render()
	{
		return (
			<form className="login-form">
				<h2> Sign in </h2>

				<div id="inFields">
					<input type="text" id="user" name="user" placeholder="Email" required />
					<input type="password" id="pw" name="pw" placeholder="Password" required />
				</div>

				<span id="submit"> <button name="submit" type="submit" value="submit"> Log in </button> </span>

				<p> Don't have an account? Sign up <a href="register"> here</a>! </p>
			</form>
		)
	}
}

export default SignInForm;
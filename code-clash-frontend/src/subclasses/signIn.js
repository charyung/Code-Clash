import React from 'react';

class SignInForm extends React.Component
{	
	
	render()
	{
		return (
			<div id="contentWrapper">
				<h2> Sign in. </h2>
			
				<div id="loginForm">
					<div id="inFields">
						<input id="user" name="user" placeholder="Email" required />
						<input id="pw" name="pw" type="password" placeholder="Password" required />
					</div>
					<br/>
					<span id="submit"> <button name="submit" type="submit" value="submit"> Log in </button> </span>
				</div>
					<p> Don't have an account? Sign up <a href="register.html"> here</a>! </p>
			</div>
		)
	}
}

export default SignInForm;
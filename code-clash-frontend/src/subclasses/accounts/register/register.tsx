import * as React from 'react';
import './register.css';

class RegistrationForm extends React.Component
{	
	render()
	{
		return (
			<form className="regis-form">
				<h2>Register</h2>

				<input type="text" id="fname" name="fname" placeholder="First name" required />
				<input type="text" id="lname" name="lname" placeholder="Last name" required />

				<input type="text" id="utor" name="utor" placeholder="UTORid" required />

				<input type="text" id="email" name="email" placeholder="Email" required />

				<input id="pw" name="pw" type="password" placeholder="Password" required />

				<button name="submit" value="submit"> Sign up </button>
			</form>
		)
	}
}

export default RegistrationForm;
import React from 'react';
import './register.css';

class RegistrationForm extends React.Component
{	
	render()
	{
		return (
			<div id="contentWrapper">
				<div id="regisForm">
					<div class="inFieldName">
						<input id="fname" name="fname" placeholder="First name" required />
						<input id="lname" name="lname" placeholder="Last name" required />
					</div>
					
					<div class="inField">
						<input id="utor" name="utor" placeholder="UTORid" required />
					
						<input id="email" name="email" placeholder="Email" required />
					
						<input id="pw" name="pw" type="password" placeholder="Password" required />
					</div>
					
					<br/>
					<button name="submit" type="submit" value="submit"> Sign up </button>
				</div>
			</div>
		)
	}
}

export default RegistrationForm;
import React from 'react';
import './accounts.css';
import SyntaxHighlighter from 'react-syntax-highlighter';

class RecordBlock extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = {codeVisible: false};
		
		this.showCode = this.showCode.bind(this);
		this.hideCode = this.hideCode.bind(this);
		
		this.blockRef = React.createRef();
	}
	
	showCode()
	{
		this.setState({codeVisible: true});
		this.blockRef.current.className = "blockExpanded";
	}
	
	hideCode()
	{
		this.blockRef.current.className = "blockA";
		this.setState({codeVisible: false});
	}
	
	render()
	{
		return (
			<div className="blockA" ref={this.blockRef}>
				<a className="title"> {this.props.title} </a>
				<p className="desc"> {this.state.codeVisible ? <span onClick={this.hideCode}>Hide code</span> : <span onClick={this.showCode}>Show code</span> } | {this.props.lang} | {this.props.points} points | Posted on {this.props.date} </p>
				{this.state.codeVisible ? <pre className="codeBlock"><code><SyntaxHighlighter showLineNumbers language="javascript">{this.props.code}</SyntaxHighlighter></code></pre> : null}
			</div>
		)
	}
}

class AccountsUI extends React.Component
{
	render()
	{
		const a = `// Initialize a string variable for the output
var output = '';

// Count to 100 using i as the counter
for (var i = 1; i <= 100; i++) {

    // If i is not divisible by 3 or 5, append the number itself.
    // Note: In JavaScript, non-zero integers are considered as
    // truthy values, therefore if there's a remainder on both,
    // we append the number instead.
    if (i % 5 && i % 3) {
        output += i + ' ';
    }

    // If i is divisible by 3 with no remainder, append Fizz
    if (i % 3 === 0) {
        output += 'Fizz ';
    } 

    // If i is divisible by 5 with no remainder, append Buzz
    if (i % 5 === 0) {
        output += 'Buzz ';
    }
}

// Print the output to the console
console.log(output);
		`;
		
		return (
			<div>
				<div id="accountInfo">
					<h3 style={{margin: 0}}> Robert'); DROP TABLE students;-- </h3>
					162 points
				</div>
				<div>
					<RecordBlock title="hello world enterprise edition" lang="Javascript" points="15" date="01/09/2018" code={a}/>
					<RecordBlock title="asdf" lang="Python" points="124" date="23/07/2018" code="b"/>
					<RecordBlock title="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" lang="Python" points="23" date="01/01/2019" code="c"/>
				</div>
			</div>
		)
	}
}

export default AccountsUI;
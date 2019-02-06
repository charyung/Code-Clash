'use strict';

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
		this.blockRef.current.className = "block";
		this.setState({codeVisible: false});
	}
	
	highlightSyntax()
	{
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		
		script.src = '../prettify/run_prettify.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
	}
	
	componentDidUpdate()
	{
		if (this.state.codeVisible)
		{
			console.log("hi");
			this.highlightSyntax();
		}
	}
	
	render()
	{
		return (
			<div className="block" ref={this.blockRef}>
				<a className="title"> {this.props.title} </a>
				<p className="desc"> {this.state.codeVisible ? <span onClick={this.hideCode}>Hide code</span> : <span onClick={this.showCode}>Show code</span> } | {this.props.lang} | {this.props.points} points | Posted on {this.props.date} </p>
				{this.state.codeVisible ? <pre className="prettyprint codeBlock"><code>{this.props.code}</code></pre> : null}
			</div>
		)
	}
}

class UI extends React.Component
{
	constructor(props)
	{
        super(props);
    }
	
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
		
		const b = `float Q_rsqrt( float number )
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

	return y;
}`
		
		return (
			<div>
				<div id="accountInfo">
					<h3 style={{margin: 0}}> Robert'); DROP TABLE students;-- </h3>
					162 points
				</div>
				<div>
					<RecordBlock title="fast inverse square root" lang="C" points="0" date="20/09/2018" code={b}/>
					<RecordBlock title="hello world enterprise edition" lang="Javascript" points="15" date="01/09/2018" code={a}/>
					<RecordBlock title="asdf" lang="Python" points="124" date="23/07/2018" code="b"/>
					<RecordBlock title="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" lang="Python" points="23" date="01/01/2019" code="c"/>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<UI />, document.getElementById('recordBlock'));
//ReactDOM.render(<Header />, document.getElementById('header'));
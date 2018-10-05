'use strict';

class UploadBlock extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = {codeVisible: false};
		
		this.showCode = this.showCode.bind(this);
		this.hideCode = this.hideCode.bind(this);
		
		this.blockRef = React.createRef();
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
		
	}
	
	render()
	{
		return (
			<div className="codeBlock" ref={this.blockRef}>
				
			</div>
		)
	}
}

class UI extends React.Component
{
	constructor(props)
	{
        super(props);
		
		this.state = {codeText: ""};
		
		this.change = this.change.bind(this);
		this.resetField = this.resetField.bind(this);
		
		this.fileField = React.createRef();
		this.titleField = React.createRef();
		this.langField = React.createRef();
    }
	
	change()
	{
		const a = `float Q_rsqrt( float number )
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
		
		this.setState({codeText: a});
		
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		
		script.src = '../prettify/run_prettify.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
		
		this.titleField.current.value = this.fileField.current.files[0].name;
		console.log(this.fileField.current.files);
		this.langField.current.value = "C";
	}
	
	resetField()
	{
		this.fileField.current.value = "";
		this.titleField.current.value = "";
		this.langField.current.value = "";
		this.setState({codeText: ""});
	}
	
	render()
	{
		return (
			<div>
				<div align="center">
					<div id="codeBlock">
						<pre className="prettyprint"><code>{this.state.codeText}</code></pre>
					</div>
					<input type="file" ref={this.fileField} onChange={this.change}/>
					<br/>
					Title: <input type="text" ref={this.titleField}/>
					<br/>
					Language: <input type="text" ref={this.langField}/>
					<br/>
					<button onClick={this.resetField}> Upload </button>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<UI />, document.getElementById('uploadBlock'));
//ReactDOM.render(<Header />, document.getElementById('header'));
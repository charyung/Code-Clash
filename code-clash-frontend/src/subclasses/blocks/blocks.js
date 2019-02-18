import React from 'react';
import axios from 'axios';
import "./blocks.css";
import SyntaxHighlighter from 'react-syntax-highlighter';

// For Django because it requires every form to have CSRF token set
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

/* TODO:
- Wait for the backend guys to do the db stuff
- Ask someone how to do overlay, lmao
- Separate things into different files
- https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f
- https://www.javascriptstuff.com/component-communication/#3-callback-functions
*/


class CodeBlock extends React.Component
{	
	
	render()
	{
		//return ( <img className="block" src={this.props.loc} onClick={() => this.click()} style={this.state.s}/> );
		//return (<code className="block" onClick={() => this.click()} style={this.state.s}> hello aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </code>);
		
		//We need some kind of codeblock here. I found syntaxhighlighter, but figure that out later.
		//return (<pre style={{display: "inline"}} className={this.props.lang}> <code className={this.props.class} style={this.state.s} onClick={this.props.click}> {this.props.code} </code> </pre>)
		return (
			/*<pre style={{display: "inline", textAlign: "left"}}>
				<code className={this.props.class} onClick={this.props.click}>
					{this.props.code}
				</code>
			</pre>*/
			<div style={{display: "inline", textAlign: "left"}}>
				<SyntaxHighlighter showLineNumbers className={this.props.class} onClick={this.props.click} language="python" customStyle={{display: "inline-block"}}>
					{this.props.code}
				</SyntaxHighlighter>
			</div>
		)
	}
}

class UI extends React.Component
{
	//We're using this component to do overlay.
	//This is kind of a disgusting solution imo.
	//But what can you do.
	//Brian said that 1st years in future years will continue to work on this code.
	//I hope to god that nobody who's inexperienced has to see this abomination.
	//But I'm also inexperienced.
	//So that's funny.
	
	//Maybe when September rolls around, I'll know what I'm doing.
	
	//--------------------------------------------------------------------------------------
	
	//Update: It's september.
	//I learned more about why this has to be like this, but I still barely know anything.
	//But the upside is that I'm not passing this piece of crap off to anyone yet, so it's still just me looking at this.
	
	constructor(props)
	{
		
        super(props);
        this.state = { open: false, leftCode: "Loading...", rightCode: "Loading..." };
		
		this.blockWrapper = React.createRef();
		this.overlayRef = React.createRef();
		
		this.openOverlay = this.openOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.swapCode = this.swapCode.bind(this);
        this.a = this.a.bind(this);
		
    }
	
	async componentDidMount()
	{
		let response = await axios.get("http://localhost:8000/blocks");
		this.setState({leftCode: response.data[0].fields.code, rightCode: response.data[1].fields.code});
	}
	
	a()
	{
		console.log("Start debugging");
		console.log(this.blockWrapper.current);
		console.log("Stop debugging.");
	}

    openOverlay(selectedCode)
	{
        this.setState({ open: true, blockValue: selectedCode });
        document.addEventListener("click", this.closeOverlay);
    }

    closeOverlay(e) 
	{
		//console.log(this.overlayRef.current);
		//e.target is DOM element that was clicked.
		//If the clicked element isn't a child of the element associated with blockWrapperNode (the only item with this property is the square in the middle), then close the box.
		if (this.blockWrapper.current && !this.blockWrapper.current.contains(e.target))
		{
			this.a();
			document.removeEventListener("click", this.closeOverlay);
			this.setState({ open: false });
		}
    }
	
	swapCode(winner, loser)
	{
		axios.post("http://localhost:8000/blocks/vote", {
			winner: winner,
			loser: loser
			})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			})
		
		axios.get("http://localhost:8000/blocks")
			.then(response => {
				console.log(response.data);
				this.setState({leftCode: response.data[0].fields.code, rightCode: response.data[1].fields.code});
			})
			.catch(error => {
				console.log(error);
			})
	}
	
	render()
	{
		return (
			<div style={{textAlign: "center"}}>
				{this.state.open ? <div className="overlay">
					<div ref={this.blockWrapper}>
						<CodeBlock ref={this.overlayRef} class="overlayBlock" code={this.state.blockValue}/>
					</div>
				</div> : null}
				
				<CodeBlock class="block" code={this.state.leftCode} click={() => this.openOverlay(this.state.leftCode)} /> <CodeBlock class="block" code={this.state.rightCode} click={() => this.openOverlay(this.state.rightCode)}/>
				<div style={{position: "relative"}}>
					<div> <button onClick={() => this.swapCode(this.state.leftCode, this.state.rightCode)}> &lt; </button> Vote! <button onClick={() => this.swapCode(this.state.rightCode, this.state.leftCode)}> &gt; </button> </div>
					<div> <button onClick={this.swapCode}> = </button> </div>
				</div>
			</div>
		)
	}
}

export default UI;
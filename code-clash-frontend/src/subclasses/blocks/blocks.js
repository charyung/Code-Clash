import React from 'react';
import "./blocks.css";
import SyntaxHighlighter from 'react-syntax-highlighter';

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


class OverlayCustom extends React.Component
{
	render()
	{
		return ( <div id="overlay"> </div> );
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
		const a = `coolCampusClubs = ["utscards", "csec", "esutsc"]
print("List of cool clubs on campus: ")
for (club in coolCampusClubs):
	print(club);`
	
		const b = `coolCampusClubs = ["utscards", "csec", "esutsc"]
print("List of cool clubs on campus: ")
while(1):
	counter = 0
	try:
		print(coolCampusClubs[counter])
	except IndexError:
		break`
		
        super(props);
        this.state = { open: false, leftCode: a, rightCode: b };
		
		this.blockWrapper = React.createRef();
		this.overlayRef = React.createRef();
		
		this.openOverlay = this.openOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.swapCode = this.swapCode.bind(this);
        this.a = this.a.bind(this);
		
    }
	
	a()
	{
		console.log("Start debugging");
		console.log(this.blockWrapper.current);
		console.log("Stop debugging.");
	}

    openOverlay(e)
	{
		console.log(e.target);
		//this.state.blockValue = e.target.value;
		//console.log("bv: " + this.state.blockValue);
		//var prettify = 
		
        const style = null;
		//This gets the text of the clicked target directly. I know this breaks abstraction, and it will be fixed soon(tm).
		//Another reason to fix this: When I do line numbers, the numbers appear on the overlay before the code.
        this.setState({ open: true, blockValue: e.target.parentNode.textContent });
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
	
	swapCode()
	{
		const a = `a`

		const b = `b`

		const c = `c`

		const d = `d`

		const e = `e`
		
		const f = `f`
		
		const i = `i`

		const j = `j`

		const k = `k`

		const l = `l`
		
		const codes = [a, b, c, d, e, f, i, j, k, l];
		
		let g = Math.floor(Math.random() * Math.floor(10));
		let h = Math.floor(Math.random() * Math.floor(10));
		
		while (h == g)
		{
			h = Math.floor(Math.random() * Math.floor(10));
		}
		
		this.setState({leftCode: codes[g], rightCode: codes[h]});
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
				
				<CodeBlock class="block" code={this.state.leftCode} click={this.openOverlay} /> <CodeBlock class="block" code={this.state.rightCode} click={this.openOverlay}/>
				<div style={{position: "relative"}}>
					<div> <button onClick={this.swapCode}> &lt; </button> Vote! <button onClick={this.swapCode}> &gt; </button> </div>
					<div> <button onClick={this.swapCode}> = </button> </div>
				</div>
			</div>
		)
	}
}

export default UI;
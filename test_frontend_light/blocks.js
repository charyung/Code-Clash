'use strict';

//const e = React.createElement;
//const blockClickedStyle = { backgroundColor: "rgba(0, 0, 0, 0)", borderColor: "rgba(0, 0, 0, 0.5)" };

/* TODO:
- Wait for the backend guys to do the db stuff
- Ask someone how to do overlay, lmao
- Separate things into different files
- Transformations to enlarge code/image
- https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f
- https://www.javascriptstuff.com/component-communication/#3-callback-functions
*/
/*class Header extends React.Component
{
	render()
	{
		return (
			<h1 className="headerClass"> Code Mash: Cat Comparison Edition </h1>
		)
	}
}*/



class CodeBlock extends React.Component
{

	constructor(props)
	{
		super(props);
		//this.s = null;
		this.state = { s: null };
	}
	
	render()
	{
		//return ( <img className="block" src={this.props.loc} onClick={() => this.click()} style={this.state.s}/> );
		//return (<code className="block" onClick={() => this.click()} style={this.state.s}> hello aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </code>);
		
		//We need some kind of codeblock here. I found syntaxhighlighter, but figure that out later.
		return (<textarea className={this.props.class} style={this.state.s} value={this.props.code} onClick={this.props.click} readOnly />)
	}
}

CodeBlock.propTypes = {
	click: PropTypes.func
}

class OverlayCustom extends React.Component
{
	render()
	{
		return ( <div id="overlay"> </div> );
	}
}

class BlockContainer extends React.Component
{
	render()
	{
		return (
			<div align="center" style={{position: "relative"}}>
				<CodeBlock id="block1" ref="b1" loc="catpic1.png" /> <CodeBlock id="block2" loc="catpic2.png" />
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
	
	constructor(props)
	{
        super(props);
        this.state = {};
		
		this.setBlockWrapper = this.setBlockWrapper.bind(this);
		
		this.openOverlay = this.openOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
    }
	
	//These two functions makes it so whenever you click anywhere (that isn't the box in the middle) in the whole page, the overlay closes.
	componentDidMount()
	{
        document.addEventListener("click", this.closeOverlay);
    }

    componentWillUnmount()
	{
        document.removeEventListener("click", this.closeOverlay);
    }

    openOverlay(e)
	{
		//console.log(e.target.value);
		//this.state.blockValue = e.target.value;
		//console.log("bv: " + this.state.blockValue);
		
        const style = null;
        this.setState({ style: style, blockValue: e.target.value });
		console.log(this.state);
        //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        document.addEventListener("click", this.closeOverlay);
    }

    closeOverlay(e) 
	{
		//e.target is DOM element that was clicked.
		//If the clicked element isn't a child of the element associated with blockWrapperNode (the only item with this property is the square in the middle), then close the box.
		if (!this.blockWrapperNode.contains(e.target))
		{
			document.removeEventListener("click", this.closeOverlay);
			const style = { display: "none" };
			this.setState({ style });
		}
    }
	
	setBlockWrapper(domNode)
	{
		this.blockWrapperNode = domNode;
	}
	
	render()
	{
		return (
			<div align="center">
				<div className="overlay" style={this.state.style}>
					<div ref={this.setBlockWrapper} style={{height: 0}}>
						<CodeBlock class="overlayBlock" code={this.state.blockValue}/>
					</div>
				</div>
				<CodeBlock id="block1" class="block" code="aaaa" click={this.openOverlay} /> <CodeBlock id="block2" class="block" code="bbbb" click={this.openOverlay}/>
				<br />
				<div align="center" style={{position: "relative"}}>
					<button> &lt; </button> Vote! <button> &gt; </button>
				</div>
			</div>
		)
	}
}

/*class UI extends React.Component
{
	render()
	{
		return (
			<div align="center" style={{position: "relative"}}>
				<CodeBlock id="block1" loc="catpic1.png"/> <CodeBlock id="block2" loc="catpic2.png" />
				<br />
				<div align="center" style={{position: "relative"}}>
					<button> &lt; </button> Vote! <button> &gt; </button>
				</div>
			</div>
		)
	}
}*/

ReactDOM.render(<UI />, document.getElementById('code_block'));
//ReactDOM.render(<Header />, document.getElementById('header'));
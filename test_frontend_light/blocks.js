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
		return (<textarea className={this.props.class} style={this.state.s} value="lskajdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" onClick={this.props.click} readOnly />)
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
	
	constructor(props) {
        super(props);
        this.state = {};
		
		this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }
	
	//These two functions makes it so whenever you click anywhere in the whole page, the overlay closes.
	componentDidMount() {
        document.addEventListener("click", this.closeNav);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.closeNav);
    }

    openNav() {
        const style =  null ;
        this.setState({ style });
        //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        document.addEventListener("click", this.closeNav);
    }

    closeNav() {
        document.removeEventListener("click", this.closeNav);
        const style = { display: "none" };
        this.setState({ style });
    }
	
	render()
	{
		return (
			<div align="center">
				<div className="overlay" style={this.state.style}>
					<CodeBlock class="overlayBlock"/>
				</div>
				<CodeBlock id="block1" loc="catpic1.png" class="block" click={this.openNav}/> <CodeBlock id="block2" loc="catpic2.png" class="block" click={this.openNav}/>
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
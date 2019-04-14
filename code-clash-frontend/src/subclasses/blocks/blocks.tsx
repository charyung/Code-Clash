import * as React from 'react';
import axios from 'axios';
import "./blocks.css";

// Models
import CodeBlock from "./codeBlock";
import Code from "./code";

// For Django because it requires every form to have CSRF token set
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.headers.post['xsrfCookieName'] = 'csrftoken';
//axios.defaults.headers.post['xsrfHeaderName'] = 'X-CSRFToken';
//axios.defaults.headers.common['x-csrftoken'] = getCookie('csrftoken');
/*axios.defaults.headers.post = {
	xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken'
};*/


/* TODO:
- https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f
- https://www.javascriptstuff.com/component-communication/#3-callback-functions
*/

interface BlocksState
{
	open: boolean;
	leftCode: Code;
	rightCode: Code;
	blockValue: string;
}

class Blocks extends React.Component<any, BlocksState>
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

	private readonly blockWrapper = React.createRef<HTMLDivElement>();
	private readonly overlayRef = React.createRef<CodeBlock>();
	private nullBlock = new Code("null", "null", "null");

	constructor(props: any)
	{
        super(props);
        this.state = {
        	open: false,
			leftCode: this.nullBlock,
			rightCode: this.nullBlock,
			blockValue: ""
        };
		
		this.blockWrapper = React.createRef();
		this.overlayRef = React.createRef();
		
		this.openOverlay = this.openOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.swapCode = this.swapCode.bind(this);
        this.a = this.a.bind(this);
		
		console.log(axios.defaults);
    }
	
	async componentDidMount()
	{
		try
		{
			await axios.get("http://localhost:8000/blocks")
				.then(response => {
					console.log(response.data);
					const left = new Code(response.data[0].fields.pk, response.data[0].fields.code, "asdf asdf", "Javascript")
					const right = new Code(response.data[1].fields.pk, response.data[1].fields.code, "asdf asdf", "Javascript")
					this.setState({leftCode: left, rightCode: right});
				})
				.catch(error => {
					console.log(error);
				})

			//const left = new Code(response.data[0])

			//this.setState({leftCode: response.data[0].pk, rightCode: response.data[1].pk});
		}
		catch (e)
		{
			console.log("Could not load blocks:", e);
		}
	}
	
	a()
	{
		console.log("Start debugging");
		console.log(this.blockWrapper.current);
		console.log("Stop debugging.");
	}

    openOverlay(selectedCode: string): void
	{
        this.setState({ open: true, blockValue: selectedCode });
        document.addEventListener("click", this.closeOverlay);
    }

    closeOverlay(e: MouseEvent): void
	{
		//console.log(this.overlayRef.current);
		//e.target is DOM element that was clicked.
		//If the clicked element isn't a child of the element associated with blockWrapperNode (the only item with this property is the square in the middle), then close the box.
		if (this.blockWrapper.current && !this.blockWrapper.current.contains(e.target as Node))
		{
			this.a();
			document.removeEventListener("click", this.closeOverlay);
			this.setState({ open: false });
		}
    }
	
	swapCode(winner: Code, loser: Code): void
	{
		console.log("state");
		console.log(this.state);
		axios.post("http://localhost:8000/blocks/vote",
			{
				winner: winner,
				loser: loser
			},
			{ withCredentials: true })
			.then(response => {
				console.log("response");
				console.log(response);
				this.setState({leftCode: response.data[0].pk, rightCode: response.data[1].pk});
			})
			.catch(error => {
				console.log(error);
			})
		
		/*axios.get("http://localhost:8000/blocks")
			.then(response => {
				console.log(response.data);
				this.setState({leftCode: response.data[0].fields.code, rightCode: response.data[1].fields.code});
			})
			.catch(error => {
				console.log(error);
			})*/
	}
	
	render()
	{
		return (
			<div style={{textAlign: "center"}}>
				{this.state.open ?
					<div className="overlay">
						<div ref={this.blockWrapper}>
							<CodeBlock ref={this.overlayRef as any} class="overlayBlock" code={this.state.blockValue}/>
						</div>
					</div>
					: null}
				
				<CodeBlock class="block" code={this.state.leftCode.code} click={() => this.openOverlay(this.state.leftCode.code)} /> <CodeBlock class="block" code={this.state.rightCode.code} click={() => this.openOverlay(this.state.rightCode.code)}/>
				<div style={{position: "relative"}}>
					<div>
						<button onClick={() => this.swapCode(this.state.leftCode, this.state.rightCode)}> &lt; </button>
						Vote!
						<button onClick={() => this.swapCode(this.state.rightCode, this.state.leftCode)}> &gt; </button>
					</div>
					<div> <button onClick={() => this.swapCode}> = </button> </div>
				</div>
			</div>
		)
	}
}

export default Blocks;
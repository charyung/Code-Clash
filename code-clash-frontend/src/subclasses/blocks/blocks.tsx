import * as React from 'react';
import axios from 'axios';

// CSS
import "./blocks.css";

// Models
import CodeBlock from "./codeBlock/codeBlock";
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
}

class Blocks extends React.Component<any, BlocksState>
{
	private readonly blockWrapper = React.createRef<HTMLDivElement>();
	private readonly overlayRef = React.createRef<CodeBlock>();
	private readonly nullBlock = new Code("null", "null", "null");

	private blockValue: Code = this.nullBlock;

	constructor(props: any)
	{
        super(props);
        this.state = {
        	open: false,
			leftCode: this.nullBlock,
			rightCode: this.nullBlock
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

    openOverlay(selectedCode: Code): void
	{
		this.blockValue = selectedCode;
		this.setState({open: true});
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
			this.setState({open: false});
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
			<div className="blocks-container">
				{this.state.open ?
					<div className="overlay">
						<div ref={this.blockWrapper}>
							<CodeBlock ref={this.overlayRef as any} class="overlayBlock" code={this.blockValue.code}/>
						</div>
					</div>
					: null}
				<CodeBlock class="block" code={this.state.leftCode.code} click={() => this.openOverlay(this.state.leftCode)} /> <CodeBlock class="block" code={this.state.rightCode.code} click={() => this.openOverlay(this.state.rightCode)}/>
				<div>
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
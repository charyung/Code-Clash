'use strict';
//import './index.css';

//const e = React.createElement;
class CodeBlock extends React.Component
{	
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		return ( <img className="block" src={this.props.loc} /> );
	}
}

class UI extends React.Component
{
	render()
	{
		return (
		<div>
			<CodeBlock loc="catpic1.png" /> <CodeBlock loc="catpic2.png" />
		</div>
		)
	}
}

ReactDOM.render(<UI />, document.getElementById('code_block'));
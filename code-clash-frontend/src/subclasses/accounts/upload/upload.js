import React from 'react';
import './upload.css';

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

/*
 What I want is a list of files.
 When the user click the file name, the corresponding code would appear on the right side. Or maybe not, if it's too much of a pain.
 Either way, when that list would render with the file's file name, the title that the program suggests based on it, and the language that the program detects based on the file extension.
 The structure, I think, would look like this:
	- Top level is the overall page.
	- Then we have the FileList class, which is a container for all the individual file items. This same class would keep an array of files.
	- Then we have each file items, which are stateless components. The props that it gets are: Name and onclick handler.
 */
 
class FileItem extends React.Component
{
	render()
	{
		return (
			<div className="fileItem"> 
				<input style={{width: "50%"}} placeholder={this.props.name} defaultValue={this.props.name}/>
				<input style={{width: "30%"}} placeholder="Python" defaultValue="Python"/>
			</div>
		)
	}
}

class FilesList extends React.Component
{
	//To do: Append selected files rather than overwrite.
	
	constructor(props)
	{
        super(props);
		
		this.populateFileList = this.populateFileList.bind(this);
    }
	
	populateFileList()
	{
		const itemsList = [];
		//const fr = new FileReader();
		//let frResult = fr.result;
		
		//Don't change this to a for in loop. FileList != array.
		for (let i = 0; i < this.props.filesArray.length; i++)
		{
			const item = this.props.filesArray[i];
			
			//This is the part where the code shows on the right block.
			//I'll definitely need to make some promises here so let's shelf this for another day.
			//fr.readAsText(item);
			//fr.onloadend = function()
			//{
			//	console.log(fr.result);
			//}
			
			//So what's the best way to get the language of a code file?
			//Is it by file extension? But then would I hard code it all?
			//Or do I use a package for this? But then that seems unnecessarily bloaty.
			
			//Solution: Let the user take care of it.
			itemsList.push(<FileItem name={item.name}/>);
		}
		
		return itemsList;
	}
	
	render()
	{
		return (
			<div id="fileList">
				{ this.populateFileList() } 
			</div>
		)
	}
}

class UploadUI extends React.Component
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
	
	change(e)
	{
		console.log(e.target.files);
		this.setState({fileList: e.target.files});
	}
	
	resetField()
	{
		this.fileField.current.value = "";
	}
	
	render()
	{
		return (
			<div>
				<div align="center">
					<div style={{display: "flex", width: "70vw"}}>
						<div className="uploadBlock" style={{flex: 1}}>
							{ this.state.fileList ? <FilesList filesArray={this.state.fileList}/> : null }
						</div>
						<div className="uploadBlock" style={{flex: 2}}>
							<pre className="prettyprint"><code>{this.state.codeText}</code></pre>
						</div>
					</div>
					
					<div>
						<input type="file" ref={this.fileField} onChange={this.change} multiple/>
						<button onClick={this.resetField}> Upload </button>
					</div>
				</div>
			</div>
		)
	}
}

export default UploadUI;
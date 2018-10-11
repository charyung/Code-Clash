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

class FileList extends React.Component
{
	constructor(props)
	{
        super(props);
		
		this.populateFileList = this.populateFileList.bind(this);
    }
	
	populateFileList()
	{
		const itemsList = null;
		
		for (fileItem in this.props.filesArray)
		{
			itemsList.push()
		}
	}
	
	render()
	{
		return (
			<div id="fileList">
				{ this.populateFileList } 
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
		this.setState({codeText: e.target.files});
	}
	
	resetField()
	{
		this.fileField.current.value = "";
		this.titleField.current.value = "";
		this.langField.current.value = "";
	}
	
	render()
	{
		return (
			<div>
				<div align="center">
					<div id="fileList">
						{ this.state.fileList ? <FilesList filesArry={this.state.fileList}/> : null }
					</div>
					<div id="codeBlock">
						<pre className="prettyprint"><code>{this.state.codeText}</code></pre>
					</div>
					<input type="file" ref={this.fileField} onChange={this.change} multiple/>
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

export default UploadUI;
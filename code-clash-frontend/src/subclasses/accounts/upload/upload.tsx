// React
import * as React from 'react';

// Axios
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

// CSS
import './upload.css';

// Models
import FileListDisplay from './fileListDisplay';

/*
 What I want is a list of files.
 When the user click the file name, the corresponding code would appear on the right side. Or maybe not, if it's too much of a pain.
 Either way, when that list would render with the file's file name, the title that the program suggests based on it, and the language that the program detects based on the file extension.
 The structure, I think, would look like this:
	- Top level is the overall page.
	- Then we have the FileList class, which is a container for all the individual file items. This same class would keep an array of files.
	- Then we have each file items, which are stateless components. The props that it gets are: Name and onclick handler.
 */

interface UploadState
{
	fileList?: FileList,
	codeText: string;
}

// The object that's passed to backend

class Upload extends React.Component<any, UploadState>
{
	private readonly fileField = React.createRef<HTMLInputElement>();
	private readonly titleField = React.createRef<HTMLInputElement>();
	private readonly langField = React.createRef<HTMLInputElement>();

	constructor(props: any)
	{
        super(props);

		this.state = {codeText: ""};

		this.change = this.change.bind(this);
		//this.readMultipleFiles = this.readMultipleFiles.bind(this);
		this.upload = this.upload.bind(this);

		this.fileField = React.createRef();
		this.titleField = React.createRef();
		this.langField = React.createRef();
    }

	change(files: FileList)
	{
		console.log(files);
		this.setState({fileList: files});
	}

	/*readMultipleFiles(index: number, fr: FileReader)
	{
		const files = this.state.fileList;
		if (files)
		{
			fr.readAsArrayBuffer(files[index]);

			fr.onload = () => {
				console.log(fr.result);

				if (index < (files.length - 1))
				{
					this.readMultipleFiles(index + 1, fr);
				}
			};
		}
	}*/

	upload()
	{
		if (this.state.fileList)
		{
			// should probably limit file size
			//const fr = new FileReader();

			//this.readMultipleFiles(0, fr);
			const uploadList = new FormData();

			Array.from(this.state.fileList).forEach((file) => {
				uploadList.append("files", file);
			});

			console.log(Array.from(uploadList.values()));

			axios.post("http://localhost:8000/blocks/create",
				uploadList,
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				},
				)
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		}


		/*if (this.fileField.current)
		{
			this.fileField.current.value = "";
		}*/
	}

	render()
	{
		return (
			<div className="files-list">
				<table>
					<colgroup>
						<col span={1} style={{width: "70%"}}/>
						<col span={1} style={{width: "30%"}}/>
					</colgroup>
					<tbody>
						<tr>
							<th>File Name</th>
							<th>Language</th>
						</tr>
						{ this.state.fileList ? <FileListDisplay filesArray={this.state.fileList}/> : null }
					</tbody>
				</table>
				<div className="upload-block">
					<pre className="prettyprint"><code>{this.state.codeText}</code></pre>
				</div>

				<div>
					<input type="file" ref={this.fileField} onChange={(e) => this.change(e.target.files as FileList)} multiple/>
					<button onClick={this.upload}> Upload </button>
				</div>
			</div>
		)
	}
}

export default Upload;
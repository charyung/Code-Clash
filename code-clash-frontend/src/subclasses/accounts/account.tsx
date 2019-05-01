// React
import * as React from 'react';
import axios from "axios";

// Models
import RecordBlock from './recordBlock';

// Stylesheet
import './account.css';

interface BlockType
{
	pk: number;
	fields: {
		code: string;
		vote_count: number;
		created_at: Date;
	}
}

type AccountState = {
	records: Array<React.ReactElement<typeof RecordBlock>>
}

class Account extends React.Component<any, AccountState>
{

	constructor(props: any)
	{
		super(props);

		this.state = {records: []};

		this.generateRecords = this.generateRecords.bind(this);
	}

	async componentDidMount()
	{
		try
		{
			await axios.get("http://localhost:8000/blocks/")
				.then(response => {
					this.generateRecords(response.data)
				})
				.catch(error => {
					console.log(error);
				})
		}
		catch (e)
		{
			console.log("Could not load blocks:", e);
		}
	}

	private generateRecords(data: Array<BlockType>): void
	{
	    //TODO: this is fucking horrible, please change when this goes into prod
	    const fileLocation = "C:/Users/CY/Documents/GitHub/Code-Clash/code-clash-backend/uploaded_files";

		console.log(data);

		const records: Array<React.ReactElement<typeof RecordBlock>> = [];

		//const fr = new FileReader();

		//fr.onload = ((a) => console.log(a));
		//fr.readAsText(fileLocation + data[2].code);

		data.forEach((block) => {
			const record = <RecordBlock key={block.fields.code} id={block.pk} title={block.fields.code} code={block.fields.code} lang="Python" points={block.fields.vote_count} date={block.fields.created_at}/>;
			records.push(record);
		});

		this.setState({records: records})
	}

	render()
	{
		return (
			<div>
				<div className="account-info">
					<h3> Robert'); DROP TABLE students;-- </h3>
					162 points
				</div>

				<div className="record-blocks">
					{ this.state.records }
				</div>
			</div>
		)
	}
}

export default Account;
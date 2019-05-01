import * as React from "react";
import { Link } from "react-router-dom";

interface RecordBlockProps
{
    id: number;
    title: string;
    code: string;
    lang: string;
    points: number;
    date: Date;
}

interface RecordBlockState
{
    codeVisible: boolean
}

class RecordBlock extends React.Component<RecordBlockProps, RecordBlockState>
{
    constructor(props: RecordBlockProps)
    {
        super(props);
        this.state = {codeVisible: false};

        this.showCode = this.showCode.bind(this);
        this.hideCode = this.hideCode.bind(this);
    }

    private showCode()
    {
        this.setState({codeVisible: true});
    }

    private hideCode()
    {
        this.setState({codeVisible: false});
    }

    render()
    {
        return (
            <div className="code-record">
                <div className="title"> {this.props.title} </div>
                <div className="desc"> <Link to={"code/" + this.props.id}>Show Details</Link> | {this.props.lang} | {this.props.points} points | Posted on {this.props.date} </div>
            </div>
        )
    }
}

export default RecordBlock;
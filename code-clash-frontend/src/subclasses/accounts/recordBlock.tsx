import * as React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';

interface RecordBlockProps
{
    title: string;
    code: string;
    lang: string;
    points: string;
    date: string;
    //points: number,
    //date: Date
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

    showCode()
    {
        this.setState({codeVisible: true});
    }

    hideCode()
    {
        this.setState({codeVisible: false});
    }

    render()
    {
        return (
            <div className="code-record">
                <a className="title"> {this.props.title} </a>
                <div className="desc"> {this.state.codeVisible ? <span className="toggle-code" onClick={this.hideCode}>Hide code</span> : <span className="toggle-code" onClick={this.showCode}>Show code</span> } | {this.props.lang} | {this.props.points} points | Posted on {this.props.date} </div>
                {this.state.codeVisible ? <pre className="codeBlock"><code><SyntaxHighlighter showLineNumbers language="javascript">{this.props.code}</SyntaxHighlighter></code></pre> : null}
            </div>
        )
    }
}

export default RecordBlock;
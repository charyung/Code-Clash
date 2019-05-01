// React
import * as React from 'react';
import axios from "axios";
import SyntaxHighlighter from 'react-syntax-highlighter';

// Stylesheet
import "./blockView.css"

type BlockViewState = {
    title: string;
    winCount: number;
    code: string;
    createdAt: Date;
}

class BlockView extends React.Component<any, BlockViewState>
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            title: "",
            winCount: 0,
            code: "",
            createdAt: new Date()
        }
    }

    componentDidMount() {
        try
        {
            axios.get("http://localhost:8000/blocks/" + this.props.match.params.id)
                .then((response: any) => {
                    const responseData = response.data[0].fields;
                    this.setState({
                        title: responseData.code,
                        winCount: responseData.win_count,
                        code: "[[read https://en.wikipedia.org/wiki/JavaScript#Security]]",
                        createdAt: new Date(responseData.created_at)
                    });
                    console.log(this.state.title);
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

    render()
    {
        return (
            <div className="block-view">
                <h1>{this.state.title}</h1>
                <div>{this.state.winCount} Points | {this.state.createdAt.toDateString()}</div>

                <hr/>

                <SyntaxHighlighter showLineNumbers className="code-block" language="python">
                    {this.state.code}
                </SyntaxHighlighter>
            </div>
        )
    }
}

export default BlockView;
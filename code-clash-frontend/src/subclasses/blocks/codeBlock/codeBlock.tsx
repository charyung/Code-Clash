import * as React from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';

// CSS
import "./codeBlock.css";

interface CodeBlockProps
{
    class: string;
    code: string;
    click?: () => void;
    ref?: React.RefObject<HTMLDivElement>;
}

class CodeBlock extends React.Component<CodeBlockProps>
{

    render()
    {
        //return ( <img className="block" src={this.props.loc} onClick={() => this.click()} style={this.state.s}/> );
        //return (<code className="block" onClick={() => this.click()} style={this.state.s}> hello aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </code>);

        //We need some kind of codeblock here. I found syntaxhighlighter, but figure that out later.
        //return (<pre style={{display: "inline"}} className={this.props.lang}> <code className={this.props.class} style={this.state.s} onClick={this.props.click}> {this.props.code} </code> </pre>)
        return (
            /*<pre style={{display: "inline", textAlign: "left"}}>
                <code className={this.props.class} onClick={this.props.click}>
                    {this.props.code}
                </code>
            </pre>*/
            <SyntaxHighlighter showLineNumbers className={this.props.class} onClick={this.props.click} language="python" customStyle={{display: "inline-block"}}>
                {this.props.code}
            </SyntaxHighlighter>
        )
    }
}

export default CodeBlock;
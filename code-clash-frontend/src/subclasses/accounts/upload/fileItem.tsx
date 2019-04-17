import * as React from "react";

interface FileItemProps
{
    name: string;
}

class FileItem extends React.Component<FileItemProps>
{
    render()
    {
        return (
            <tr className="file-item">
                <td>
                    <input type="text" placeholder={this.props.name} defaultValue={this.props.name}/>
                </td>
                <td>
                    <input type="text" placeholder="Python" defaultValue="Python"/>
                </td>
            </tr>
        )
    }
}

export default FileItem;
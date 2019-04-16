import * as React from "react";

import FileItem from './fileItem/fileItem';

interface FileListDisplayProps
{
    filesArray: FileList
}

class FileListDisplay extends React.Component<FileListDisplayProps>
{
    //To do: Append selected files rather than overwrite.

    constructor(props: FileListDisplayProps)
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
            <div className="file-list">
                { this.populateFileList() }
            </div>
        )
    }
}

export default FileListDisplay;
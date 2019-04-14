export default class Code
{
    id: string;
    code: string;
    author: string;
    language?: string;

    constructor(id: string, code: string, author: string, language?: string)
    {
        this.id = id;
        this.code = code;
        this.author = author;
        if (language) {
            this.language = language;
        }
    }
}
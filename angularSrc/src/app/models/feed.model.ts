export class Feed{
    title: string;
    author: string;
    description: string;

    constructor(title: string, author: string, desc: string){
        this.title = title;
        this.author = author;
        this.description = desc;
    }
}
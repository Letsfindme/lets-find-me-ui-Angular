

export class PostContent {
    id: string;
    postDto: string;
    text: string;
    title: string;
    videoUrl: string;
    images: string[];

    constructor(
        id: string,
        postDto: string,
        text: string,
        title: string,
        videoUrl: string,
        images: String[]
    ) { }
}

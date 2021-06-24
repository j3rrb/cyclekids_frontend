export type Post = {
    id: number;
    likes: number;
    author: {
        first_name: string;
        last_name: string;
    };
    title: string;
    content: string;
    published: boolean;
    created_at: Date;
    updated_at: Date;
}
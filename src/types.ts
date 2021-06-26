export type User = {
    id: number;
    first_name: string;
    last_name: string;
}

export type Post = {
    id: number;
    likes: number;
    author: User;
    title: string;
    content: string;
    published: boolean;
    created_at: Date;
    updated_at: Date;
}

export type FormState = {
    switchForm: () => void;
}

export type Group = {
    id: number;
    name: string;
    description: string;
    admin: User;
    is_public: boolean;
    members: User[];
    posts: Post[];
}

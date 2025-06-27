export type User = {
    id: string;
    username: string;
    email: string;
}

export type CreateUser = {
    username: string;
    password: string;
    email: string;
}
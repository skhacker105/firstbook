import { User } from "./user.model";

export class ChatRoom {
    constructor(
        public _id: string,
        public roomKey: string,
        public name?: string,
        public user?: User
    ){}
}

export class ChatMessage {
    constructor(
        public _id: string,
        public message: string,
        public room?: ChatRoom
    ) {}
}
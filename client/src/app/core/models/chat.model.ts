export class ChatGroup {
    constructor(
        public memberUserIds: string[],
        public name: string,
        public adminUserIds?: string[],
    ){}
}
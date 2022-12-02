export class Usuario {
    constructor(
        public ci: string,
        public email: string,
        public username: string,
        public surnames: string,
        public registerdate: Date,
        public uriavatar?: String,
        public pathavatar?: String,
        public birthday?: Date,
        public password?: string,
        public post?: string,
        public roles?: string,
        public _id?: string,
    ) {

    }
}
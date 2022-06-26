export class User {
    id!: number;
    userName!: String;
    password!: String;
    isAgent: boolean = false;
    isAdmin: boolean = false;
    isSuperAdmin: boolean = false;
    isActive: boolean = false;

    constructor(data: any){
        this.userName = data.userName;
        this.isAgent = data.isAgent;
        this.isAdmin = data.isAdmin;
        this.isSuperAdmin = data.isSuperAdmin;
        this.isActive = data.isActive;
    }

    get isUser(){
        let res : boolean = !this.isAgent && !this.isAdmin && !this.isSuperAdmin;
        return res;
    }
}
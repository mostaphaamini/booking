export class Member {
    id!: number;
    relation!:number
    userId!: number;
    agentId!: number;
    fName!: string;
    lName!: string;
    pName!: string;
    nID!: string;
    pID!: string;
    pDate!: Date;
    bDate!: Date;
    gender!: number;
    vacFileName: string = '';
    solFileName: string = '';
    passFileName: string = '';
    hasPass: boolean = false;
    married: boolean = false;
    religion!: number;
    postalCode: string = '';
    adr: string = '';
    health!: number;
    healthDesc: string = '';
    border!: number;
    education!: number;
    job!: number;
    jobDesc: string = '';
    support!: number;
    earn!: number;
    earnDesc: string = '';
    earnAmount!: number;
    car!: number;
    carType: string = '';
    carYear: string = '';
    selfTravel!: number;
    experienced!: number;
    exLast: string = '';
    exNum!: number;
    experienced40!: number;
    ex40Last: string = '';
    ex40Num!: number;
    pay!: number;
    bank: string = '';
    acount: string = '';
    shaba: string = '';
    kids!: number;
    solType!: number;
    locType!: number;
    house!: number;
    phone: string = '';
    relMobile: string = '';
    otherTravel: boolean = false;
    province: string = '';
    city: string = '';

    agentConfirm: boolean = false;
    adminConfirm: boolean = false;
    superAdminConfirm: boolean = false;


    constructor(){
        
    }
}

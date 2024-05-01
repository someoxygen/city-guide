import { Photo } from "./photo";
import { User } from "./user";

export class City {
    id:number;
    name:string;
    description:string;
    userId:number;
    photos:Photo[];
    photoUrl:string;
    User:User;
}


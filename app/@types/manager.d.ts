import { number } from "joi";

type typeManager = {
        id:number,
        firstname: string,
        lastname: string,
        password: string,
        checkPassword: string,
        login: string,
        email: string,
}

type signinManager = {
        login:string,
        password:string
}

export interface User{
    [x: string]: any,
    id: number,
    authData: any,
    token: string,
    jwt: string,
    hash: any,
    err: any,
    accessToken: string,
    success:boolean,
    status:number,
    message: string, 
    data: object
}

export interface Recipe {
    title: string,
    meal_type: string,
    difficulty_level: string,
    ingredients: string,
    preparation: string
}

export interface Sign {
    fullname: string,
    email: string,
    password: string
}

export interface Login {
    fullname: string,
    email: string,
    password: string
}
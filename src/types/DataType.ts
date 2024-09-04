export interface User{
    name: string;
    email: string;
    isAdmin: boolean;
}
export interface Employee{
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface Store{
    id: string|number;
    name: string;
    address: string;
}

export interface Product{
    id: string;
    name: string;
    price: string;
}

export interface Inventory{
    id: string;
    date: string;
    productId: string;
    stock: Record<string,string|number>[];
}
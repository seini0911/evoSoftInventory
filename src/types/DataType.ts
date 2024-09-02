export interface Employee{
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface Store{
    id: string;
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
    productId: string;
    stock: Record<string,number>;
}
export type LoginFormFields = {
    email: string;
    password: string;
}

export type storeStock = {
    storeId:number | string,
    quantity: number | string,
}

export type SaveInventoryFields = {
    date: string;
    product: number;
    stocks: storeStock[];
}
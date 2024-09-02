import { Employee, Inventory, Product, Store } from "../types/DataType";

export const employees: Employee[] = [
    {
        id: '1',
        name: 'Seini Abaya',
        email: 'seiniabaya@gmail.com',
        password: '12345678',
        isAdmin: true
    },
    {
        id: '2',
        name: 'Gamaliel',
        email: 'gamaliele@gmail.com',
        password: '12345678',
        isAdmin: false
    },
    {
        id: '3',
        name: 'Samira',
        email: 'samira@gmail.com',
        password: '12345678',
        isAdmin: false
    },
    {
        id: '4',
        name: 'Jane Doe',
        email: 'jdoe@me.com',
        password: '12345678',
        isAdmin: false
    },
    {
        id: '5', 
        name: 'John Doe',
        email: 'jdoe@me.com',
        password: '12345678',
        isAdmin: false
    }
];


export const stores: Store[] = [
    {
        id: '1',
        name: 'Ndokoti Store',
        address: 'Douala'
    },
    {
        id: '2',
        name: 'Cite Verte Store',
        address: 'Yaounde'
    },
    {
        id: '3',
        name: 'Tam Tam Store',
        address: 'Yaounde'
    },
    {
        id: '4',
        name: 'Bonaberi Store',
        address: 'Douala'
    }
];

export const products: Product[] = [
    {
        id: '1',
        name: 'Product 1',
        price: '1000.00'
    },
    {
        id: '2',
        name: 'Product 2',
        price: '2000.00'
    },
    {
        id: '3',
        name: 'Product 3',
        price: '3000.00'
    },
    {
        id: '4',
        name: 'Product 4',
        price: '4000.00'
    }
];

export const inventories: Inventory[] = [
    {
        id: '1',
        productId: '1',
        stock: {
            'store': 1,
            'quantity': 20
        }
    },
    {
        id: '2',
        productId: '2',
        stock: {
            'store': 1,
            'quantity': 40
        }
    },
    {
        id: '3',
        productId: '3',
        stock: {
            'store': 2,
            'quantity': 30
        }
    },
    {
        id: '4',
        productId: '4',
        stock: {
            'store': 2,
            'quantity': 20
        }
    }  
]
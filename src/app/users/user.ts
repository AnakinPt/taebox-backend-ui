export interface User {
    id: number;
    name: string;
    address: Address;
}

export interface Address {
    id: number;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    postalCode: string;
    postalCodeCity: string;
    country: string;
}

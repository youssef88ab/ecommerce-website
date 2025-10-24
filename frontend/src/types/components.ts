import type { ReactNode } from "react";

export interface Option {
    label: ReactNode;
    value: string | number;
}

export interface FilterByButtonProps {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options: Option[];
}

export interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    gender: "Male" | "Female" | string;
    registrationDate: string;
    role: string;
}

// Define the Pageable Metadata structure
export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface UserPageResponse {
    content: User[]; 
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

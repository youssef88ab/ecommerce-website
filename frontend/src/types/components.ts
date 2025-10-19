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

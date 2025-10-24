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

export interface OrdersTableProps {
    orders: Order[];
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

export interface Payment {
    id: number;
    amount: number;
    method: string;
    status: string;
    orderId: number;
    paymentDate: string;
}

export interface OrderItem {
    id: number;
    quantity: number;
    subtotal: number;
    productId: number;
    productName: string;
    productPrice: number;
}

export interface Order {
    id: number;
    user: User;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    orderDate: string;
    payment: Payment;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

interface PageResponse<T> {
    content: T[];
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

export interface UserPageResponse extends PageResponse<User> { }

export interface OrderPageResponse extends PageResponse<Order> { }
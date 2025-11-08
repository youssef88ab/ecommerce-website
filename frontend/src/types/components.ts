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

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
    id: number;
    user: User;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    orderDate: string;
    payment: Payment;
}

export interface Category {
    id: number; 
    name: string;
    description: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
}


interface Address {
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
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

export interface PaymentPageResponse extends PageResponse<Payment> { }

export interface ProductPageResponse extends PageResponse<Product> { }
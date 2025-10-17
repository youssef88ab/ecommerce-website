// src/config/menuItems.ts
import { faHome, faUsers, faShoppingCart, faCreditCard, faReceipt, faTriangleExclamation, faTags } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    { icon: faHome, label: "Dashboard", route: "/" },
    { icon: faUsers, label: "Users", route: "/users" },
    { icon: faShoppingCart, label: "Orders", route: "/orders" },
    { icon: faCreditCard, label: "Payments", route: "/payments" },
    { icon: faReceipt, label: "Subscriptions", route: "/subscriptions" },
    { icon: faTags, label: "Discounts", route: "/discounts" },
    { icon: faTriangleExclamation, label: "Complaints", route: "/complaints" },
];
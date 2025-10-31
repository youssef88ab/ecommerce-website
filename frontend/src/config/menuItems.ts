// src/config/menuItems.ts
import { faHome, faUsers, faShoppingCart, faCreditCard, faTriangleExclamation, faBagShopping } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    { icon: faHome, label: "Dashboard", route: "/" },
    { icon: faUsers, label: "Users", route: "/users" },
    { icon: faShoppingCart, label: "Orders", route: "/orders" },
    { icon: faCreditCard, label: "Payments", route: "/payments" },
    { icon: faBagShopping, label: "Products", route: "/products" },
    { icon: faTriangleExclamation, label: "Complaints", route: "/complaints" },
];
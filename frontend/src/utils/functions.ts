import {
    faCcVisa,
    faCcMastercard,
    faCcPaypal,
    faApplePay,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

export function showRole(role: string) {
    return role.split('_')[1];
}

export function showRegistrationDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}


export const renderPaymentMethod = (paymentMethod: string) => {
    if (!paymentMethod) return null;

    let icon = faCreditCard;
    let label = paymentMethod;
    let color = "text-gray-700";
    let bg = "bg-gray-100";

    switch (paymentMethod.toLowerCase()) {
        case "paypal":
            icon = faCcPaypal;
            label = "PayPal";
            color = "text-blue-700";
            bg = "bg-blue-100";
            break;
        case "visa":
            icon = faCcVisa;
            label = "Visa";
            color = "text-indigo-700";
            bg = "bg-indigo-100";
            break;
        case "mastercard":
            icon = faCcMastercard;
            label = "MasterCard";
            color = "text-red-700";
            bg = "bg-red-100";
            break;
        case "apple pay":
            icon = faApplePay;
            label = "Apple Pay";
            color = "text-black";
            bg = "bg-gray-200";
            break;
        default:
            icon = faCreditCard;
            label = paymentMethod;
            color = "text-gray-700";
            bg = "bg-gray-100";
    }
}
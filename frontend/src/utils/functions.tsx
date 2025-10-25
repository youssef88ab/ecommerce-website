import {
    faCcVisa,
    faCcMastercard,
    faCcPaypal,
    faApplePay,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    switch (paymentMethod) {
        case "PAYPAL":
            icon = faCcPaypal;
            label = "PayPal";
            color = "text-blue-700";
            bg = "bg-blue-100";
            break;
        case "VISA":
            icon = faCcVisa;
            label = "Visa";
            color = "text-indigo-700";
            bg = "bg-indigo-100";
            break;
        case "MASTERCARD":
            icon = faCcMastercard;
            label = "MasterCard";
            color = "text-red-700";
            bg = "bg-red-100";
            break;
        default:
            icon = faCreditCard;
            label = paymentMethod;
            color = "text-gray-700";
            bg = "bg-gray-100";
    }


    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color} ${bg}`}>
            <FontAwesomeIcon icon={icon} />
            {label}
        </span>
    );
}
import {
    faCcPaypal,
    faCcVisa,
    faCcMastercard,
    faApplePay,
} from "@fortawesome/free-brands-svg-icons";
import {
    faCreditCard,
    faCheckCircle,
    faHourglassHalf,
    faTimesCircle,
    faUndoAlt,
    faCheck,
    faTriangleExclamation,
    faCircleCheck,
    faCircle
} from "@fortawesome/free-solid-svg-icons";
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

export const renderPaymentDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};



export const renderPaymentStatus = (payment_status: string) => {
    if (!payment_status) return null;

    let icon = faHourglassHalf;
    let label = payment_status;
    let color = "text-gray-700";
    let bg = "bg-gray-100";

    switch (payment_status) {
        case "COMPLETED":
            icon = faCheck;
            label = "Paid";
            color = "text-green-700";
            bg = "bg-green-100";
            break;
        case "PENDING":
            icon = faHourglassHalf;
            label = "Pending";
            color = "text-yellow-700";
            bg = "bg-yellow-100";
            break;
        case "FAILED":
            icon = faTimesCircle;
            label = "Failed";
            color = "text-red-700";
            bg = "bg-red-100";
            break;
        case "REFUNDED":
            icon = faUndoAlt;
            label = "Refunded";
            color = "text-blue-700";
            bg = "bg-blue-100";
            break;
        default:
            icon = faHourglassHalf;
            color = "text-gray-700";
            bg = "bg-gray-100";
    }

    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color} ${bg}`}
        >
            <FontAwesomeIcon icon={icon} />
            {label}
        </span>
    );
};

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

export const renderProductStock = (stock: number) => {
    if (!stock) { return null; }

    let icon = faCircle;
    let label = 'MID';
    let color = "text-yellow-700";
    let bg = "bg-yellow-100";

    if (stock >= 50) {
        label = 'HIGH'
        color = 'text-green-700'
        bg = "bg-green-100"
    }

    else if (stock <= 15) {
        label = 'LOW'
        color = 'text-red-700'
        bg = "bg-red-100"
    }

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color} ${bg}`}>
            <FontAwesomeIcon icon={icon} />
            {label}
        </span>
    );
}
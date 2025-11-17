import {
    faCcPaypal,
    faCcVisa,
    faCcMastercard,
} from "@fortawesome/free-brands-svg-icons";
import {
    faCreditCard,
    faHourglassHalf,
    faTimesCircle,
    faUndoAlt,
    faCheck,
    faCircle,
    faUser,
    faBriefcase,
    faShield,
    faMars,
    faVenus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export function showRole(role: string) {
    return role.split('_')[1];
}

export const renderDateTime = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
};

export const renderGender = (gender: string | undefined) => {
    if (!gender) { return 'N/A'; }

    const genderConfig = {
        MALE: { 
            icon: faMars, 
            textColor: 'text-white', 
            bgColor: 'bg-blue-500',
            label: 'Male' 
        },
        FEMALE: { 
            icon: faVenus, 
            textColor: 'text-white', 
            bgColor: 'bg-pink-500',
            label: 'Female' 
        },
        M: { 
            icon: faMars, 
            textColor: 'text-white', 
            bgColor: 'bg-blue-500',
            label: 'Male' 
        },
        F: { 
            icon: faVenus, 
            textColor: 'text-white', 
            bgColor: 'bg-pink-500',
            label: 'Female' 
        },
        Male: { 
            icon: faMars, 
            textColor: 'text-white', 
            bgColor: 'bg-blue-500',
            label: 'Male' 
        },
        Female: { 
            icon: faVenus, 
            textColor: 'text-white', 
            bgColor: 'bg-pink-500',
            label: 'Female' 
        }
    };

    const config = genderConfig[gender as keyof typeof genderConfig] || { 
        icon: faUser, 
        textColor: 'text-white', 
        bgColor: 'bg-gray-500',
        label: gender || 'Unknown' 
    };

    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${config.bgColor} ${config.textColor}`}>
            <FontAwesomeIcon icon={config.icon} />
            {config.label}
        </span>
    );
};

export const renderRole = (role: string | undefined) => {
    if (!role) return 'N/A';

    const roleValue = showRole(role);

    const roleIcons = {
        ADMIN: faShield,
        CUSTOMER: faUser
    };

    const roleIcon = roleIcons[roleValue as keyof typeof roleIcons] || faBriefcase;
    
    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            roleValue === "ADMIN" 
                ? "bg-gray-50 text-black" 
                : "bg-green-50 text-green-700"
        }`}>
            <FontAwesomeIcon icon={roleIcon} />
            {roleValue}
        </span>
    );
};


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

    else if (stock <= 15 && stock > 0) {
        label = 'LOW'
        color = 'text-red-700'
        bg = "bg-red-100"
    }

    else if (stock == 0) {
        label = 'OUT OF STOCK'
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
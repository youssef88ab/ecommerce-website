import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSpinner,
    faTruckFast,
    faCheck,
    faCreditCard, faIdCard, faDollar,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCcVisa as faCcVisaBrand,
    faCcPaypal as faCcPaypalBrand,
    faCcMastercard as faCcMastercardBrand,
} from "@fortawesome/free-brands-svg-icons";
import type {JSX} from "react";


const createSortOption = (value: string, label: JSX.Element, direction: "asc" | "desc") => ({
    value,
    label,
    direction
});

export const SORT_OPTIONS = [
    createSortOption(
        "id,asc",
        <span className="flex items-center gap-2"><FontAwesomeIcon icon={faIdCard} className="text-blue-500"/> ID (Asc)</span>,
        "asc"
    ),
    createSortOption(
        "id,desc",
        <span className="flex items-center gap-2"><FontAwesomeIcon icon={faIdCard} className="text-blue-500"/> ID (Desc)</span>,
        "desc"
    ),
    createSortOption(
        "totalAmount,asc",
        <span className="flex items-center gap-2"><FontAwesomeIcon icon={faDollar} className="text-green-500"/> Amount (Asc)</span>,
        "asc"
    ),
    createSortOption(
        "totalAmount,desc",
        <span className="flex items-center gap-2"><FontAwesomeIcon icon={faDollar} className="text-green-500"/> Amount (Desc)</span>,
        "desc"
    ),
];

export const STATUS_FILTERS = [
    {
        value: "PENDING",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faSpinner} className="text-yellow-500"/> Pending</span>
    },
    {
        value: "SHIPPED",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faTruckFast} className="text-orange-500"/> Shipped</span>
    },
    {
        value: "DELIVERED",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Delivered</span>
    },
];

export const PAYMENT_METHOD_FILTERS = [
    {
        value: "VISA",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcVisaBrand} className="text-blue-600"/> Visa</span>
    },
    {
        value: "PAYPAL",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcPaypalBrand} className="text-blue-500"/> PayPal</span>
    },
    {
        value: "MASTERCARD",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcMastercardBrand} className="text-red-600"/> MasterCard</span>
    },
    {
        value: "CREDIT_CARD",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCreditCard} className="text-gray-800"/> Credit Card</span>
    },
];
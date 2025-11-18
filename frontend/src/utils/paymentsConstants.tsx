import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faClock,
    faCircleXmark,
    faMoneyBillTransfer, faIdCard, faDollar,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCcVisa as faCcVisaBrand,
    faCcPaypal as faCcPaypalBrand,
    faCcMastercard as faCcMastercardBrand,
    faApplePay as faApplePayBrand
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
        "amount,asc",
        <span className="flex items-center gap-2"><FontAwesomeIcon icon={faDollar} className="text-green-500"/> Amount (Asc)</span>,
        "asc"
    ),
    createSortOption(
        "amount,desc",
        <span className="flex items-center gap-2"><FontAwesomeIcon icon={faDollar} className="text-green-500"/> Amount (Desc)</span>,
        "desc"
    ),
];

export const STATUS_FILTERS = [
    {
        value: "COMPLETED",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500"/> Completed</span>
    },
    {
        value: "PENDING",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} className="text-yellow-500"/> Pending</span>
    },
    {
        value: "FAILED",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className="text-red-500"/> Failed</span>
    },
    {
        value: "REFUNDED",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMoneyBillTransfer} className="text-blue-500"/> Refunded</span>
    },
];

export const METHOD_FILTERS = [
    {
        value: "VISA",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcVisaBrand} className="text-blue-600"/> Visa</span>
    },
    {
        value: "PAYPAL",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcPaypalBrand} className="text-blue-500"/> PayPal</span>
    },
    {
        value: "CREDIT_CARD",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcMastercardBrand} className="text-red-600"/> MasterCard</span>
    },
    {
        value: "MASTERCARD",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faApplePayBrand} className="text-gray-800"/> Apple Pay</span>
    },
];
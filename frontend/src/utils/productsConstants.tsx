import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMobileAlt,
    faTshirt,
    faCouch,
    faBook, faIdCard, faSortAlphaUp, faSortAlphaDown,
} from "@fortawesome/free-solid-svg-icons";
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
        "username,asc",
        <span className="flex items-center gap-2"><FontAwesomeIcon icon={faSortAlphaUp} className="text-green-500"/> name (A-Z)</span>,
        "asc"
    ),
    createSortOption(
        "username,desc",
        <span className="flex items-center gap-2"><FontAwesomeIcon icon={faSortAlphaDown} className="text-green-500"/> name (Z-A)</span>,
        "desc"
    ),
];

export const CATEGORY_FILTERS = [
    {value: "ELECTRONICS",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMobileAlt} className="text-blue-500"/> Electronics</span>
    },
    {value: "CLOTHING",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faTshirt} className="text-pink-500"/> Clothing</span>
    },
    {value: "HOME",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCouch} className="text-green-500"/> Home</span>
    },
    {value: "BOOKS",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBook} className="text-yellow-500"/> Books</span>
    },
];
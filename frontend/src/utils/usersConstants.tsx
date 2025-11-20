import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faIdCard, faSortAlphaUp, faSortAlphaDown,
    faMars, faVenus, faUserTie, faUser, faUsers, faUserPlus, faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import type {JSX} from "react";

const createSortOption = (value: string, label: JSX.Element, direction: "asc" | "desc") => ({
    value,
    label,
    direction
});

// * Constants for metrics
export const USERS_METRICS = [
    { title: "Total Users", icon: faUsers, dataKey: "usersCount" as const },
    { title: "New Users (This Month)", icon: faUserPlus, dataKey: "newUsersThisMonth" as const },
    { title: "Customers Who Ordered", icon: faShoppingCart, dataKey: "usersWhoOrdered" as const },
];

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

export const GENDER_FILTERS = [
    {value: "MALE",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMars} className="text-blue-500"/> Male</span>
    },
    {value: "FEMALE",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faVenus} className="text-pink-500"/> Female</span>
    },
];

export const ROLE_FILTERS = [
    {value: "ROLE_ADMIN",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUserTie} className="text-grey-500"/> ADMIN</span>
    },
    {value: "ROLE_CUSTOMER",
        label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUser} className="text-green-700"/> CLIENT</span>
    },
];
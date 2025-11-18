import {useState, useEffect, useCallback} from "react";
import {getUsersCount, getUsersWhOrdered} from "../services/userService.ts";
import type {UserPageResponse} from "../types/components.ts";

export const useUsersData = () => {
    const [userPageResponse, setUserPageResponse] = useState<UserPageResponse | undefined>(undefined);
    const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
    const [usersWhoOrdered, setUsersWhoOrdered] = useState(0);
    const [usersCount, setUsersCount] = useState(0);

    const formatDate = useCallback((date: Date): string => {
        return date.toISOString().split("T")[0];
    }, []);

    // * Load metrics
    useEffect(() => {
        const loadMetrics = async () => {
            try {
                const today = new Date();
                const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

                const [count, orderedCount, usersCount] = await Promise.all([
                    getUsersCount(formatDate(currentMonthStart), formatDate(currentMonthEnd)),
                    getUsersWhOrdered(),
                    getUsersCount()
                ]);

                setNewUsersThisMonth(count);
                setUsersWhoOrdered(orderedCount);
                setUsersCount(usersCount);
            } catch (error) {
                console.error("Failed to load user metrics:", error);
            }
        };

        loadMetrics();
    }, [formatDate]);

    return {userPageResponse, setUserPageResponse, newUsersThisMonth, usersWhoOrdered, usersCount};
};

export const useUsersFilters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState("id,asc");
    const [filters, setFilters] = useState({gender: "", role: ""});

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
    };

    const handleSortChange = (sortValue: string) => {
        setSort(sortValue);
        setPage(0);
    };

    const handleSortChangeWrapper = (value: string | number) => {
        handleSortChange(value.toString());
    };

    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters(prev => ({...prev, [filterName]: value}));
        setPage(0);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        void event;
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return {
        searchTerm,
        page,
        rowsPerPage,
        sort,
        filters,
        handleSearchChange,
        handleSortChange,
        handleSortChangeWrapper,
        handleFilterChange,
        handleChangePage,
        handleChangeRowsPerPage,
        setPage
    };
};
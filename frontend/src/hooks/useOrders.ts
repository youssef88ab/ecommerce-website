import {useEffect, useState} from "react";
import type {OrderPageResponse} from "../types/components";
import {getOrdersCount, getTotalSpent} from "../services/orderService.ts";

export const useOrdersData = () => {
    const [orderPageResponse, setOrderPageResponse] = useState<OrderPageResponse | undefined>(undefined);
    const [ordersCount, setOrdersCount] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);

    // * Load metrics
    useEffect(() => {
        const loadMetrics = async () => {
            try {
                const [ordersCount, totalSPent] = await Promise.all([
                    getOrdersCount(),
                    getTotalSpent()
                ]);

                setOrdersCount(ordersCount);
                setTotalSpent(totalSPent);
            } catch (error) {
                console.error("Failed to load user metrics:", error);
            }
        };

        loadMetrics();
    }, []);

    return {
        orderPageResponse,
        setOrderPageResponse,
        ordersCount,
        setOrdersCount,
        totalSpent,
        setTotalSpent
    };
};

export const useOrdersFilters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState("id,asc");
    const [filters, setFilters] = useState({
        status: "",
        paymentMethod: ""
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
    };

    const handleSortChangeWrapper = (value: string | number) => {
        setSort(value.toString()); // Convert to string
        setPage(0);
    };

    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters(prev => ({...prev, [filterName]: value.toString()}));
        setPage(0);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
        handleSortChangeWrapper,
        handleFilterChange,
        handleChangePage,
        handleChangeRowsPerPage
    };
};
import { useState, useEffect } from "react";
import type { PaymentPageResponse } from "../types/components";
import { getPaymentsCount, getSuccessRate } from "../services/paymentsService";

export const usePaymentsData = () => {
    const [paymentPageResponse, setPaymentPageResponse] = useState<PaymentPageResponse | undefined>(undefined);
    const [paymentsCount, setPaymentsCount] = useState(0);
    const [successRate, setSuccessRate] = useState(0);

    // * Load payments count and success rate
    useEffect(() => {
        const loadPaymentsData = async () => {
            try {
                const [count, rate] = await Promise.all([
                    getPaymentsCount(),
                    getSuccessRate()
                ]);
                setPaymentsCount(count);
                setSuccessRate(rate);
            } catch (error) {
                console.error("Failed to load payments data:", error);
            }
        };
        loadPaymentsData();
    }, []);

    return {
        paymentPageResponse,
        setPaymentPageResponse,
        paymentsCount,
        successRate
    };
};

export const usePaymentsFilters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState("id,asc");
    const [filters, setFilters] = useState({
        status: "",
        method: ""
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
    };

    const handleSortChangeWrapper = (value: string | number) => {
        setSort(value.toString());
        setPage(0);
    };

    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters(prev => ({ ...prev, [filterName]: value.toString() }));
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
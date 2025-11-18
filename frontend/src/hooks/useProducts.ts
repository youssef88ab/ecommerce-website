import { useState, useEffect } from "react";
import type { ProductPageResponse } from "../types/components";
import { getProductsCount, getOutOfStockCount, getLowOfStockCount } from "../services/productService";

export const useProductsData = () => {
    const [productPageResponse, setProductPageResponse] = useState<ProductPageResponse | undefined>(undefined);
    const [productsCount, setProductsCount] = useState(0);
    const [outOfStockCount, setOutOfStockCount] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);

    // * Load products data
    useEffect(() => {
        const loadProductsData = async () => {
            try {
                const [count, outOfStock, lowStock] = await Promise.all([
                    getProductsCount(),
                    getOutOfStockCount(),
                    getLowOfStockCount()
                ]);
                setProductsCount(count);
                setOutOfStockCount(outOfStock);
                setLowStockCount(lowStock);
            } catch (error) {
                console.error("Failed to load products data:", error);
            }
        };
        loadProductsData();
    }, []);

    return {
        productPageResponse,
        setProductPageResponse,
        productsCount,
        outOfStockCount,
        lowStockCount
    };
};

export const useProductsFilters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState("id,asc");
    const [filters, setFilters] = useState({
        category: ""
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
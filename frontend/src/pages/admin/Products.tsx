import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import DashboardLayout from "../../layouts/DashboardLayout";
import FilterByButton from "../../components/admin/FilterByButton";
import {
    faCreditCard,
    faUsers,
    faShoppingCart,
    faClipboardList,
    faMobileAlt,
    faBook,
    faCouch,
    faTshirt,
    faPlus,
    faUpload,
    faExchangeAlt,
    faFileExport,
    faFileExcel,
    faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Product, ProductPageResponse } from "../../types/components";
import Metric from "../../components/admin/Metric";
import { fetchAllProducts, getProductsCount } from "../../services/productService";
import ProductsTable from "../../components/admin/Products/ProductsTable";
import { Button } from "@mui/material";


export default function Products() {

    // * Searching
    const [searchTerm, setSearchTerm] = useState("");

    // * Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const sort: string = "id,asc";

    const [ProductPageResponse, setProductsPageResponse] = useState<ProductPageResponse | undefined>(undefined);

    const [Products, setProducts] = useState<Product[]>([]);

    useEffect(() => { if (ProductPageResponse) { setProducts(ProductPageResponse.content || []); } }, [ProductPageResponse]);

    // * Total Products
    const [ProductsCount, setProductsCount] = useState(0);

    // * Load Products Count 
    useEffect(() => {
        const loadProductsCount = async () => {
            try {
                const count = await getProductsCount();
                setProductsCount(count);
            } catch (error) {
                console.error("Failed to load Products count:", error);
            }
        };
        loadProductsCount();
    });

    // * Handle Search Change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0); // ! Reset page to 0 when search term changes
    };

    // * Handle Page Change 
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => { void event; setPage(newPage); };

    // * Handle Change Rows Per Page
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // * Filter Options
    const [filters, setFilters] = useState({
        category: "",
    });

    // * Load Products 
    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchAllProducts(page, rowsPerPage, sort, filters.category, searchTerm);
            setProductsPageResponse(data);
        };
        loadProducts();
    }, [page, rowsPerPage, filters, searchTerm]);


    // * Handle Filter Change
    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters((prev) => ({ ...prev, [filterName]: value.toString() }));
    };

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                <Metric
                    title={"Total Utilisateurs"}
                    icon={faUsers}
                    data={ProductsCount}
                    percentage={0.4}
                />
                <Metric
                    title={"Total Orders"}
                    icon={faShoppingCart}
                    data={ProductsCount}
                    percentage={0.1}
                />
                <Metric
                    title={"Total Abonnements"}
                    icon={faClipboardList}
                    data={1400}
                    percentage={-0.7}
                />
            </div>
            <PageTitle title={'All Products'} icon={faCreditCard} />
            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                {/* Search bar */}
                <div className="w-full md:w-1/3">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search Products by ID, customer name or email..."
                    />
                </div>

                {/* Filters + pagination + action buttons */}
                <div className="flex-1 flex flex-wrap items-center justify-between gap-2">
                    {/* Filter */}
                    <FilterByButton
                        label="Category"
                        value={filters.category}
                        onChange={(value) => handleFilterChange("category", value)}
                        options={[
                            { value: "ELECTRONICS", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMobileAlt} className="text-blue-500" /> Electronics</span> },
                            { value: "CLOTHING", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faTshirt} className="text-pink-500" /> Clothing</span> },
                            { value: "HOME", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCouch} className="text-green-500" /> Home</span> },
                            { value: "BOOKS", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBook} className="text-yellow-500" /> Books</span> },
                        ]}
                        data-testid="category-filter-trigger"
                    />

                    {/* Pagination + action buttons side by side */}
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                        {/* Add Product */}
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<FontAwesomeIcon icon={faPlus} className="text-xs" />}
                            sx={{
                                textTransform: "none",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                height: "36px",
                                borderRadius: "6px",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                                "&:hover": {
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
                                },
                            }}
                        >
                            Add Product
                        </Button>

                        {/* Bulk Upload */}
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<FontAwesomeIcon icon={faUpload} className="text-xs" />}
                            sx={{
                                textTransform: "none",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                height: "36px",
                                borderRadius: "6px",
                                backgroundColor: "#8b5cf6", // purple-600
                                "&:hover": {
                                    backgroundColor: "#7c3aed", // purple-700
                                },
                            }}
                        >
                            Bulk Upload
                        </Button>

                        {/* Export */}
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<FontAwesomeIcon icon={faDownload} className="text-xs" />}
                            sx={{
                                textTransform: "none",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                height: "36px",
                                borderRadius: "6px",
                                backgroundColor: "#16a34a", // green-600
                                "&:hover": {
                                    backgroundColor: "#15803d", // green-700
                                },
                            }}
                        >
                            Export
                        </Button>

                        {/* Pagination */}
                        <Pagination
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={ProductPageResponse?.size ?? 0}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            count={ProductPageResponse?.totalElements ?? 0}
                        />
                    </div>

                </div>
            </div>

            {/* Products Table */}
            <div className="">
                <ProductsTable products={Products} />
            </div>
        </DashboardLayout>
    );
}

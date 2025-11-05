import React, { useEffect, useState } from "react";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import DashboardLayout from "../../layouts/DashboardLayout";
import FilterByButton from "../../components/admin/FilterByButton";
import {
    faCreditCard,
    faCircleCheck,
    faClock,
    faCircleXmark,
    faMoneyBillTransfer,
    faUsers,
    faShoppingCart,
    faClipboardList,
    faCheck,
    faMobileAlt,
    faBook,
    faCouch,
    faTshirt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCcVisa as faCcVisaBrand,
    faCcPaypal as faCcPaypalBrand,
    faCcMastercard as faCcMastercardBrand,
    faApplePay as faApplePayBrand
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Product, ProductPageResponse } from "../../types/components";
import Metric from "../../components/admin/Metric";
import { fetchAllProducts, getProductsCount } from "../../services/productService";
import ProductsTable from "../../components/admin/Products/ProductsTable";

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
                <div className="w-full md:w-1/3 ">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search Products by ID, customer name or email..."
                    />
                </div>
                <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
                    <div className="flex">
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

                    </div>

                    <Pagination
                        page={page}
                        handleChangePage={handleChangePage}
                        rowsPerPage={ProductPageResponse?.size ?? 0}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        count={ProductPageResponse?.totalElements ?? 0}
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="">
                <ProductsTable products={Products} />
            </div>
        </DashboardLayout>
    );
}

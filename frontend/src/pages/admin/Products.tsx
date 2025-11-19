import {useEffect, useState} from "react";
import type {Product} from "../../types/components";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import ProductsTable from "../../components/admin/Products/ProductsTable";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    faBoxOpen,
    faExclamationCircle,
    faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import FilterByButton from "../../components/admin/FilterByButton";

// * Custom hooks and components
import {useProductsData, useProductsFilters} from "../../hooks/useProducts";
import {SORT_OPTIONS, CATEGORY_FILTERS} from "../../utils/productsConstants.tsx";
import {createProduct, fetchAllProducts, updateProduct} from "../../services/productService.ts";
import SortByButton from "../../components/admin/SortByButton.tsx";
import Metric from "../../components/admin/Metric.tsx";
import CreateProductForm from "../../components/admin/Products/CreateProductForm.tsx";
import EditProductForm from "../../components/admin/Products/EditProductForm.tsx";

export default function Products() {
    const {
        productPageResponse,
        setProductPageResponse,
        productsCount,
        outOfStockCount,
        lowStockCount
    } = useProductsData();
    const {
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
    } = useProductsFilters();

    // * Load products data
    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchAllProducts(page, rowsPerPage, sort, filters.category, searchTerm);
            setProductPageResponse(data);
        };
        loadProducts();
    }, [page, rowsPerPage, sort, filters, searchTerm, setProductPageResponse]);

    const products: Product[] = productPageResponse?.content ?? [];
    const totalProducts = productPageResponse?.totalElements ?? 0;

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [createdProduct, setCreatedProduct] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: ""
    });

    const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCreatedProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const productData: Product = {
                id: 0,
                name: createdProduct.name || "",
                description: createdProduct.description || "",
                price: parseFloat(createdProduct.price?.toString() || "0"),
                stock: parseInt(createdProduct.stock?.toString() || "0"),
                category: createdProduct.category,
            };

            // * Validate required fields
            if (!productData.name || !productData.price || !productData.stock || !productData.category) {
                alert("Please fill in all required fields");
                return;
            }

            // * Call the API to create the product
            const newProduct = await createProduct(productData);

            console.log("Product created successfully:", newProduct);

            // * Refresh the products list
            const data = await fetchAllProducts(page, rowsPerPage, sort, filters.category, searchTerm);
            setProductPageResponse(data);

            // * Reset form and close
            setCreatedProduct({id: 0, name: "", description: "", price: 0, stock: 0, category: ""});
            setShowCreateForm(false);

        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product. Please try again.");
        }
    };

    // Edit product handlers
    const handleEditProduct = (product: Product) => {
        setEditingProduct({...product});
        setShowEditForm(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setEditingProduct(prev => prev ? {
            ...prev,
            [name]: value
        } : null);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingProduct) return;

        try {
            const productData: Product = {
                id: editingProduct.id,
                name: editingProduct.name || "",
                description: editingProduct.description || "",
                price: parseFloat(editingProduct.price?.toString() || "0"),
                stock: parseInt(editingProduct.stock?.toString() || "0"),
                category: editingProduct.category,
            };

            // * Validate required fields
            if (!productData.name || !productData.price || !productData.stock || !productData.category) {
                alert("Please fill in all required fields");
                return;
            }

            // * Call the API to update the product
            const updatedProduct = await updateProduct(productData);

            console.log("Product updated successfully:", updatedProduct);

            // * Refresh the products list
            const data = await fetchAllProducts(page, rowsPerPage, sort, filters.category, searchTerm);
            setProductPageResponse(data);

            // * Reset form and close
            setEditingProduct(null);
            setShowEditForm(false);

        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product. Please try again.");
        }
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setShowEditForm(false);
    };

    const handleAddProduct = () => {
        setShowCreateForm(true);
    };

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                <Metric
                    title={"Total Products"}
                    icon={faShoppingBag}
                    data={productsCount}
                    unit=""
                />
                <Metric
                    title={"Out Of Stock"}
                    icon={faBoxOpen}
                    data={outOfStockCount}
                    unit=""
                />
                <Metric
                    title={"Low Stock"}
                    icon={faExclamationCircle}
                    data={lowStockCount}
                    unit=""
                />
            </div>

            <PageTitle title="All Products" icon={faShoppingBag}/>

            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                <div className="w-full md:w-1/3">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search products by name, ID, or description..."
                    />
                </div>

                <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
                    <div className="flex">
                        <SortByButton
                            label="Sort by"
                            value={sort}
                            onChange={handleSortChangeWrapper}
                            options={SORT_OPTIONS}
                        />
                        <FilterByButton
                            label="Category"
                            value={filters.category}
                            onChange={(value) => handleFilterChange("category", value)}
                            options={CATEGORY_FILTERS}
                            data-testid="category-filter-trigger"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                        <button
                            onClick={handleAddProduct}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Add Product
                        </button>

                        <Pagination
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={productPageResponse?.size ?? 0}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            count={totalProducts}
                        />
                    </div>
                </div>
            </div>

            <ProductsTable
                products={products}
                onEditProduct={handleEditProduct}
            />

            <CreateProductForm
                showCreateForm={showCreateForm}
                setShowCreateForm={setShowCreateForm}
                createdProduct={createdProduct}
                handleCreateChange={handleCreateChange}
                handleCreateSubmit={handleCreateSubmit}
            />

            <EditProductForm
                showEditForm={showEditForm}
                editingProduct={editingProduct}
                handleEditChange={handleEditChange}
                handleEditSubmit={handleEditSubmit}
                handleCancelEdit={handleCancelEdit}
            />
        </DashboardLayout>
    );
}
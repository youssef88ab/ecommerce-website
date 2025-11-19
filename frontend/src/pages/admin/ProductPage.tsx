import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faShoppingBag,
    faDollarSign,
    faBox,
    faTag,
    faExclamationTriangle,
    faCheckCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../../layouts/DashboardLayout";
import Metric from "../../components/admin/Metric";
import { fetchProductById } from "../../services/productService";
import type { Product } from "../../types/components";

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load product data
    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const productData = await fetchProductById(parseInt(id));
                setProduct(productData);
                setError(null);
            } catch (err) {
                setError("Failed to load product");
                console.error("Error loading product:", err);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    // Get stock status
    const getStockStatus = (stock: number) => {
        if (stock === 0) {
            return {
                text: "Out of Stock",
                color: "red",
                icon: faTimesCircle,
                bg: "bg-red-100",
                textClass: "text-red-700",
                border: "border-red-200"
            };
        } else if (stock < 10) {
            return {
                text: "Low Stock",
                color: "yellow",
                icon: faExclamationTriangle,
                bg: "bg-yellow-100",
                textClass: "text-yellow-700",
                border: "border-yellow-200"
            };
        } else {
            return {
                text: "In Stock",
                color: "green",
                icon: faCheckCircle,
                bg: "bg-green-100",
                textClass: "text-green-700",
                border: "border-green-200"
            };
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (error || !product) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-4xl mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-4">{error || "The requested product could not be found."}</p>
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Products
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    const stockStatus = getStockStatus(product.stock);

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
            >

                {/* Metrics */}
                <div className="metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Metric
                        title="Price"
                        icon={faDollarSign}
                        data={product.price}
                        unit="$"
                    />
                    <Metric
                        title="Current Stock"
                        icon={faBox}
                        data={product.stock}
                        unit="units"
                    />
                    <Metric
                        title="Category"
                        icon={faTag}
                        data={product.category}
                        unit=""
                    />
                    <Metric
                        title="Status"
                        icon={stockStatus.icon}
                        data={stockStatus.text}
                        unit=""
                        color={stockStatus.color}
                    />
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Image & Meta */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-200 mb-4 relative group overflow-hidden">
                                <FontAwesomeIcon icon={faShoppingBag} className="text-gray-300 text-6xl group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${stockStatus.bg} ${stockStatus.textClass} ${stockStatus.border}`}>
                                        <FontAwesomeIcon icon={stockStatus.icon} className="text-xs" />
                                        {stockStatus.text}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm font-medium">Product ID</span>
                                    <span className="text-gray-700 font-mono text-sm bg-gray-50 px-2 py-1 rounded border border-gray-200">#{product.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h2>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <FontAwesomeIcon icon={faTag} className="text-gray-400" />
                                        <span>{product.category}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mt-1">Unit Price</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Description</h3>
                                <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <p className="leading-relaxed">{product.description || "No description available."}</p>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faBox} className="text-blue-500" /> Inventory
                                </h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">SKU</label>
                                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                                        <span>PRD-{product.id}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Quantity Available</label>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold text-lg ${stockStatus.textClass}`}>{product.stock}</span>
                                        <span className="text-sm text-gray-500">units</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${
                                                product.stock < 10 ? 'bg-yellow-500' :
                                                    product.stock === 0 ? 'bg-red-500' : 'bg-green-500'
                                            }`}
                                            style={{ width: `${Math.min(product.stock * 10, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </DashboardLayout>
    );
}
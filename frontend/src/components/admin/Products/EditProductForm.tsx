import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTag,
    faAlignLeft,
    faDollar,
    faBox,
    faList,
    faTimes,
    faImage,
    faCloudUpload,
    faUpload,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import type { Product } from "../../../types/components";

interface EditProductFormProps {
    showEditForm: boolean;
    editingProduct: Product | null;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleEditSubmit: (e: React.FormEvent) => void;
    handleCancelEdit: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
                                                             showEditForm,
                                                             editingProduct,
                                                             handleEditChange,
                                                             handleEditSubmit,
                                                             handleCancelEdit
                                                         }) => {
    if (!showEditForm || !editingProduct) return null;

    return (
        <AnimatePresence>
            {showEditForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        if (e.target === e.currentTarget) handleCancelEdit();
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <FontAwesomeIcon icon={faEdit} className="text-blue-600 text-lg" />
                                </div>
                                Edit Product
                            </h3>
                            <button
                                onClick={handleCancelEdit}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                aria-label="Close"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-gray-800" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                                {/* Left Column - Image Upload - Full Height */}
                                <div className="lg:col-span-1 flex flex-col h-full">
                                    <div className="text-center flex flex-col h-full">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                                            <FontAwesomeIcon icon={faImage} className="text-blue-500" />
                                            Product Image
                                        </h4>

                                        {/* Image Upload Area - Takes full available height */}
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center items-center flex-1 min-h-[300px] border-gray-300 hover:border-gray-400 bg-gray-50`}
                                        >
                                            <div className="space-y-3">
                                                <div className="p-4 bg-white rounded-full inline-block">
                                                    <FontAwesomeIcon
                                                        icon={faCloudUpload}
                                                        className="text-4xl text-gray-400"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Product Image
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Current image displayed in table
                                                    </p>
                                                </div>
                                                <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                                    <FontAwesomeIcon icon={faUpload} size="xs" />
                                                    PNG, JPG, WEBP up to 5MB
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Form Fields */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="">
                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                <FontAwesomeIcon icon={faTag} className="text-blue-500" />
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editingProduct.name}
                                                onChange={handleEditChange}
                                                className="w-full border border-gray-300 px-3 py-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-black"
                                                placeholder="e.g. iPhone 15 Pro"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faAlignLeft} className="text-blue-500" />
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={editingProduct.description}
                                            onChange={handleEditChange}
                                            rows={3}
                                            className="w-full border border-gray-300 px-3 py-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none text-black"
                                            placeholder="Enter detailed product description..."
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                <FontAwesomeIcon icon={faDollar} className="text-green-500" />
                                                Price
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={editingProduct.price}
                                                    onChange={handleEditChange}
                                                    step="0.01"
                                                    min="0"
                                                    className="w-full border border-gray-300 px-3 py-3 pl-8 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-black"
                                                    placeholder="0.00"
                                                    required
                                                />
                                                <span className="absolute left-3 top-3 text-gray-500">$</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                <FontAwesomeIcon icon={faBox} className="text-orange-500" />
                                                Stock
                                            </label>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={editingProduct.stock}
                                                onChange={handleEditChange}
                                                min="0"
                                                className="w-full border border-gray-300 px-3 py-3 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-black"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                <FontAwesomeIcon icon={faList} className="text-purple-500" />
                                                Category
                                            </label>
                                            <select
                                                name="category"
                                                value={editingProduct.category}
                                                onChange={handleEditChange}
                                                className="w-full border border-gray-300 px-3 py-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white text-black"
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="ELECTRONICS">Electronics</option>
                                                <option value="CLOTHING">Clothing</option>
                                                <option value="HOME">Home</option>
                                                <option value="BOOKS">Books</option>
                                                <option value="SPORTS">Sports</option>
                                                <option value="BEAUTY">Beauty</option>
                                                <option value="TOYS">Toys</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditProductForm;
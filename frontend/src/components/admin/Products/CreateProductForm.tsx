import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faTimes,
    faTag,
    faDollar,
    faBox,
    faList,
    faImage,
    faAlignLeft,
    faUpload,
    faCloudUpload
} from "@fortawesome/free-solid-svg-icons";
import {useState, useRef, type ChangeEvent, type FormEvent, type DragEvent, type MouseEvent} from "react";
import type {Product} from "../../../types/components.ts";

interface CreateProductFormProps {
    showCreateForm: boolean;
    setShowCreateForm: (show: boolean) => void;
    createdProduct: Product;
    handleCreateChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleCreateSubmit: (e: FormEvent) => void;
}

export default function CreateProductForm({
                                              showCreateForm,
                                              setShowCreateForm,
                                              createdProduct,
                                              handleCreateChange,
                                              handleCreateSubmit,
                                          }: CreateProductFormProps) {

    // * States
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // * Handle Image Change
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const result = e.target?.result;
                    if (typeof result === 'string') {
                        setImagePreview(result);
                        // * Update the form data with the base64 image
                        handleCreateChange({
                            target: {
                                name: 'imageUrl',
                                value: result
                            }
                        } as ChangeEvent<HTMLInputElement>);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            // Create a synthetic event to reuse handleImageChange
            const syntheticEvent = {
                target: {
                    files
                }
            } as ChangeEvent<HTMLInputElement>;
            handleImageChange(syntheticEvent);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setImagePreview(null);
        handleCreateChange({
            target: {
                name: 'imageUrl',
                value: ''
            }
        } as ChangeEvent<HTMLInputElement>);
    };

    return (
        <AnimatePresence>
            {showCreateForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                        if (e.target === e.currentTarget) setShowCreateForm(false);
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <FontAwesomeIcon icon={faPlus} className="text-green-600 text-lg" />
                                </div>
                                Create New Product
                            </h3>
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                aria-label="Close"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-gray-800" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-6">
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
                                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center items-center flex-1 min-h-[300px] ${
                                                isDragging
                                                    ? 'border-blue-400 bg-blue-50 scale-105'
                                                    : imagePreview
                                                        ? 'border-green-200 bg-green-50'
                                                        : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                            }`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={handleImageClick}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                className="hidden"
                                            />

                                            {imagePreview ? (
                                                <div className="relative w-full h-full flex items-center justify-center">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="max-w-full max-h-64 object-contain rounded-lg shadow-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                            e.stopPropagation();
                                                            removeImage();
                                                        }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} size="xs" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <div className="p-4 bg-white rounded-full inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faCloudUpload}
                                                            className="text-4xl text-gray-400"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-700">
                                                            Drag & drop your image here
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            or click to browse
                                                        </p>
                                                    </div>
                                                    <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                                        <FontAwesomeIcon icon={faUpload} size="xs" />
                                                        PNG, JPG, WEBP up to 5MB
                                                    </div>
                                                </div>
                                            )}
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
                                                value={createdProduct.name}
                                                onChange={handleCreateChange}
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
                                            value={createdProduct.description}
                                            onChange={handleCreateChange}
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
                                                    value={createdProduct.price}
                                                    onChange={handleCreateChange}
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
                                                value={createdProduct.stock}
                                                onChange={handleCreateChange}
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
                                                value={createdProduct.category.name}
                                                onChange={handleCreateChange}
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
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Create Product
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
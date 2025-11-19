import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "../../../types/components";
import type { Variants, Transition } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { renderProductStock } from "../../../utils/functions";

interface ProductRowProps {
    product: Product;
    onEditProduct: (product: Product) => void;
    onDeleteProduct: (product: Product) => void;
    variants?: Variants;
    initial?: string | boolean;
    animate?: string | boolean;
    transition?: Transition;
}

const ProductRow: React.FC<ProductRowProps> = ({
                                                   product,
                                                   onEditProduct,
                                                   onDeleteProduct,
                                                   variants,
                                                   initial,
                                                   animate,
                                                   transition,
                                               }) => {
    const navigate = useNavigate();

    const handleViewDetails = (product: Product) => {
        navigate(`/products/${product.id}`);
    };

    const handleEditClick = () => {
        onEditProduct(product);
    };

    const  handleDeleteClick = () => {
        onDeleteProduct(product);
    }

    return (
        <motion.tr
            variants={variants}
            initial={initial}
            animate={animate}
            transition={transition}
            className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
        >
            {/* Avatar + Name + Email */}
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    <img
                        className="rounded-full w-10 h-10 object-cover border-2 border-gray-100"
                        src="src/images/avatar.png"
                        alt={`${product.name}'s avatar`}
                    />
                    <div>
                        <h2 className="font-medium text-md text-gray-900">{product.name}</h2>
                        <p className="text-gray-600 text-sm">{product.id}</p>
                    </div>
                </div>
            </td>

            {/* Category */}
            <td className="py-4 text-center text-sm font-medium text-gray-900">
                {product.category}
            </td>

            {/* Quantity */}
            <td className="py-4 text-center text-gray-600">{product.stock}</td>

            {/* Stock Status */}
            <td className="py-4 text-center text-gray-600">{renderProductStock(product.stock)}</td>

            <td className="py-4 text-center text-gray-600">${product.price}</td>

            {/* View Button */}
            <td className="py-4 text-center">
                <Tooltip title="View Details" arrow placement="top">
                    <IconButton
                        onClick={() => handleViewDetails(product)}
                        size="small"
                        color="info"
                        aria-label={`View details for ${product.name}`}
                        className="hover:bg-blue-50 transition-colors duration-200"
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </td>

            <td className="py-4 text-center">
                <div className="flex justify-center items-center gap-3">
                    <Tooltip title="Edit Product" arrow placement="top">
                        <IconButton
                            onClick={handleEditClick}
                            size="small"
                            color="primary"
                            aria-label="edit"
                            className="hover:bg-blue-50 transition-colors duration-200"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product" arrow placement="top">
                        <IconButton
                            onClick={handleDeleteClick}
                            size="small"
                            color="error"
                            aria-label="delete"
                            className="hover:bg-red-50 transition-colors duration-200"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </td>
        </motion.tr>
    );
};

export default ProductRow;
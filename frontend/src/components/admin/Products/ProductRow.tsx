import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Product, User } from "../../../types/components";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { showRole } from "../../../utils/functions";
import { showRegistrationDateTime } from "../../../utils/functions";

// ✅ Define component props type
interface ProductRowProps {
    product: Product;
    variants?: Variants;
    initial?: string | boolean;
    animate?: string | boolean;
    transition?: Transition;
}

const UserRow: React.FC<ProductRowProps> = ({
    product,
    variants,
    initial,
    animate,
    transition,
}) => {
    const navigate = useNavigate();

    const handleViewDetails = (product: Product) => {
        navigate("/user", { state: { product } });
    };

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

            {/* Phone */}
            <td className="py-4 text-gray-600">{product.price}</td>

            {/* Gender */}
            <td className="py-4 text-center">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.name === "FEMALE"
                        ? "bg-pink-50 text-pink-700"
                        : "bg-blue-50 text-blue-700"
                        }`}
                >
                    {product.name}
                </span>
            </td>

            {/* Registration Date */}
            <td className="py-4 text-gray-600"></td>

            {/* Role */}
            <td className="py-4 text-gray-600 text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${showRole(product.name) === "ADMIN"
                    ? "bg-gray-50 text-black"
                    : "bg-green-50 text-green-700"
                    }`}>
                    {showRole(product.name)}
                </span> </td>

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
        </motion.tr>
    );
};

export default UserRow;

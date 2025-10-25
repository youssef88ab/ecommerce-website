import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../../types/components";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { renderPaymentMethod } from "../../../utils/functions";

interface OrderRowProps {
    order: Order;
    variants: Variants;
    initial?: string;
    animate?: string;
    transition?: any;
}

const OrderRow: React.FC<OrderRowProps> = ({
    order,
    variants,
    initial,
    animate,
    transition,
}) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate("/order", { state: { order } });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <motion.tr
            variants={variants}
            initial={initial}
            animate={animate}
            transition={transition}
            className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
        >
            <td className="py-4 px-6 text-gray-900 font-medium">
                {order.id}
            </td>
            <td className="py-4">
                <div className="flex items-center gap-2">
                    <div>
                        <h2 className="font-medium text-md text-black">{order.user?.username || "N/A"}</h2>
                        <p className="text-gray-600 text-sm">{order.user?.email || "N/A"}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                    ${order.totalAmount.toFixed(2)}
                </span>
            </td>
            <td className="py-4 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-50 text-gray-700">
                    {renderPaymentMethod(order.payment.method)}
                </span>
            </td>
            <td className="py-4 text-gray-600">{formatDate(order.orderDate)}</td>
            <td className="py-4 text-center">
                <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${order.status === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "SHIPPED"
                            ? "bg-orange-100 text-orange-800"
                            : order.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                >
                    {order.status}
                </span>
            </td>
            <td className="py-4 text-center">
                <Tooltip title="View Details" arrow placement="top">
                    <IconButton
                        onClick={() => handleViewDetails()}
                        size="small"
                        color="info"
                        aria-label={`View details for ${order.id}`}
                        className="hover:bg-blue-50 transition-colors duration-200"
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </td>
        </motion.tr>
    );
};

export default OrderRow;

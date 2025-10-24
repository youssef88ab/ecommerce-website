import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../../types/components";

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
            <td className="py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                    ${order.totalAmount.toFixed(2)}
                </span>
            </td>
            <td className="py-4 text-gray-600">{formatDate(order.orderDate)}</td>
            <td className="py-4">
                <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                        }`}
                >
                    {order.status}
                </span>
            </td>
            <td className="py-4 text-center">
                <button
                    onClick={handleViewDetails}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
            </td>
        </motion.tr>
    );
};

export default OrderRow;

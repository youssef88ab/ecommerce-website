import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Order } from "../../../types/components";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { StatusBadge } from "./StatusBadge";
import { useMemo } from "react";

interface UserInfoCardProps {
    order?: Order | null;
}

export default function OrderSummaryCard( {order}: UserInfoCardProps) {

    const formattedDate = useMemo(
        () =>
            order ? new Date(order.orderDate).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
                : "",
        [order?.orderDate]
    );
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Order Summary</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
                        Placed on:{" "}
                        <span className="font-medium text-gray-700">{formattedDate}</span>
                    </p>
                </div>
                <StatusBadge status={order?.status ?? "PROCESSING"} />
            </div>

            {/* ITEMS TABLE */}
            <div className="mt-6 border-t pt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                    Items Ordered ({order?.items.length})
                </h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                    Product
                                </th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                    SKU
                                </th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                    Qty
                                </th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                    Price
                                </th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {order?.items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition duration-100"
                                >
                                    <td className="px-3 py-3 text-sm font-medium text-gray-900">
                                        {item.productName}
                                    </td>
                                    <td className="px-3 py-3 text-sm text-center text-gray-500">{item.productId}</td>
                                    <td className="px-3 py-3 text-sm text-center text-gray-500">
                                        {item.quantity}
                                    </td>
                                    <td className="px-3 py-3 text-sm text-center text-gray-500">
                                        ${item.productPrice}
                                    </td>
                                    <td className="px-3 py-3 text-sm font-semibold text-gray-800 text-right">
                                        ${item.subtotal}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* TOTALS */}
            <div className="mt-6 border-t pt-4 flex justify-end">
                <div className="flex justify-between border-t pt-2 text-base font-bold text-gray-900">
                    <span>ORDER TOTAL :</span>
                    <span>${order?.totalAmount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}


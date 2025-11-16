import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingBag,
    faTruck,
    faCreditCard,
    faUser,
    faPrint,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageTitle from "../../components/admin/PageTitle";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderService";
import type { Order } from "../../types/components";
import { DetailCard } from "../../components/admin/orders/DetailCard";
import OrderSummaryCard from "../../components/admin/orders/OrderSummaryCard";
import { renderPaymentMethod } from "../../utils/functions";

export default function OrderDetails() {

    // * Get id From url 
    const { id } = useParams<{ id: string }>();

    const [order, setOrder] = useState<Order | null>(null);

    // * Load Order 
    useEffect(() => {
        const loadOrder = async () => {
            // * If no id 
            if (!id) return;
            // * Parse id from strign to num 
            const numericId = Number(id);
            if (isNaN(numericId)) {
                console.error("Invalid ID");
                return;
            }
            // * Call API Service 
            try {
                const data = await getOrderById(numericId);
                setOrder(data);
            } catch (error) {
                console.error("Failed to load order", error);
            }
        };
        loadOrder();
    }, [id]);

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <PageTitle title={`Order #${order?.id} Details`} icon={faShoppingBag} />

                <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                    <button
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-150"
                    >
                        <FontAwesomeIcon icon={faPrint} className="w-4 h-4" />
                        Print Invoice
                    </button>
                </div>
            </div>

            {/* --- TOP DETAIL CARDS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <DetailCard title="Customer Information" icon={faUser}>
                    <p className="font-semibold text-indigo-600">{order?.user.username}</p>
                    <p>
                        Email:{" "}
                        <a
                            href={`mailto:${order?.user.email}`}
                            className="text-blue-500 hover:underline"
                        >
                            {order?.user.email}
                        </a>
                    </p>
                    <p>Phone: {order?.user.phone}</p>
                    <p>Customer ID: {order?.user.id}</p>
                </DetailCard>
                <DetailCard title="Shipping Address" icon={faTruck}>
                    <p className="font-medium">{order?.user.username}</p>
                </DetailCard>
                <DetailCard title="Payment Details" icon={faCreditCard}>
                    <p>Transaction ID: {order?.payment?.id}</p>
                    <p>
                        Total Paid:{" "}
                        <span className="font-bold text-green-600">
                            ${order?.payment?.amount?.toFixed(2)}
                        </span>
                    </p>
                    <p>
                        Method: <span className="font-semibold">{renderPaymentMethod(order?.payment?.method ?? "")}</span>
                    </p>
                </DetailCard>
            </div>

            {/* --- ORDER SUMMARY BELOW --- */}
            <OrderSummaryCard order = {order} />
        </DashboardLayout>
    );

};
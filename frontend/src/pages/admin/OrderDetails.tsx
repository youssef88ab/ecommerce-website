import React, { useState, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingBag,
    faTruck,
    faCreditCard,
    faUser,
    faMapMarkerAlt,
    faCalendarAlt,
    faCheckCircle,
    faTimesCircle,
    faSyncAlt,
    faPrint,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageTitle from "../../components/admin/PageTitle";

// --- TYPESCRIPT INTERFACES ---

interface Address {
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface Item {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
}

interface Payment {
    method: string;
    transactionId: string;
    subtotal: number;
    shippingFee: number;
    tax: number;
    total: number;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

interface Order {
    id: string;
    status: OrderStatus;
    date: string;
    customer: Customer;
    shippingAddress: Address;
    billingAddress: Address;
    items: Item[];
    payment: Payment;
}

// --- MOCK DATA ---
const mockOrder: Order = {
    id: "ORD-93847",
    status: "Shipped",
    date: "2024-10-25T10:00:00Z",
    customer: {
        id: "USR-001",
        name: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
        line1: "123 Commerce St",
        city: "Metropolis",
        state: "CA",
        zip: "90210",
        country: "USA",
    },
    billingAddress: {
        line1: "123 Commerce St",
        city: "Metropolis",
        state: "CA",
        zip: "90210",
        country: "USA",
    },
    items: [
        { id: "P-101", name: "Premium Wireless Headset", sku: "WH-4500", quantity: 1, price: 199.99 },
        { id: "P-205", name: "Ergonomic Desk Mat", sku: "DM-200", quantity: 2, price: 29.5 },
        { id: "P-310", name: "Ultra HD Webcam", sku: "WC-720", quantity: 1, price: 125.0 },
    ],
    payment: {
        method: "Visa **** 4242",
        transactionId: "TXN-998877",
        subtotal: 383.99,
        shippingFee: 15.0,
        tax: 23.04,
        total: 422.03,
    },
};

const DetailCard: React.FC<{ title: string; icon: any; children: React.ReactNode }> = ({
    title,
    icon,
    children,
}) => (
    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 h-full
                    transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-4 border-b pb-3">
            <FontAwesomeIcon icon={icon} className="text-indigo-500 w-4 h-4" />
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600">{children}</div>
    </div>
);


const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    let style = { text: "text-gray-700", bg: "bg-gray-100", icon: faSyncAlt };
    if (status === "Delivered") style = { text: "text-green-700", bg: "bg-green-100", icon: faCheckCircle };
    if (status === "Shipped" || status === "Processing")
        style = { text: "text-blue-700", bg: "bg-blue-100", icon: faTruck };
    if (status === "Cancelled") style = { text: "text-red-700", bg: "bg-red-100", icon: faTimesCircle };

    return (
        <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
        >
            <FontAwesomeIcon icon={style.icon} className="w-4 h-4" />
            {status}
        </span>
    );
};

// --- MAIN PAGE ---

export const OrderDetails: React.FC = () => {
    const order: Order = mockOrder;
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    const handleChangeStatus = useCallback(() => {
        setIsProcessing(true);
        setTimeout(() => {
            console.error("Simulated: Order status updated!");
            setIsProcessing(false);
        }, 1500);
    }, []);

    const formattedDate = useMemo(
        () =>
            new Date(order.date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
        [order.date]
    );

    const renderAddress = (address: Address) => (
        <>
            <p>{address.line1}</p>
            <p>
                {address.city}, {address.state} {address.zip}
            </p>
            <p>{address.country}</p>
        </>
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <PageTitle title={`Order #${order.id} Details`} icon={faShoppingBag}/>

                <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                    <button
                        onClick={handlePrint}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-150"
                    >
                        <FontAwesomeIcon icon={faPrint} className="w-4 h-4" />
                        Print Invoice
                    </button>
                </div>
            </div>


            {/* --- TOP DETAIL CARDS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <DetailCard title="Customer Information" icon={faUser}>
                    <p className="font-semibold text-indigo-600">{order.customer.name}</p>
                    <p>
                        Email:{" "}
                        <a
                            href={`mailto:${order.customer.email}`}
                            className="text-blue-500 hover:underline"
                        >
                            {order.customer.email}
                        </a>
                    </p>
                    <p>Phone: {order.customer.phone}</p>
                    <p>Customer ID: {order.customer.id}</p>
                </DetailCard>

                <DetailCard title="Shipping Address" icon={faTruck}>
                    <p className="font-medium">{order.customer.name}</p>
                    {renderAddress(order.shippingAddress)}
                </DetailCard>

                <DetailCard title="Billing Address" icon={faMapMarkerAlt}>
                    <p className="font-medium">{order.customer.name}</p>
                    {renderAddress(order.billingAddress)}
                </DetailCard>

                <DetailCard title="Payment Details" icon={faCreditCard}>
                    <p>
                        Method: <span className="font-semibold">{order.payment.method}</span>
                    </p>
                    <p>Transaction ID: {order.payment.transactionId}</p>
                    <p>
                        Total Paid:{" "}
                        <span className="font-bold text-green-600">
                            ${order.payment.total.toFixed(2)}
                        </span>
                    </p>
                </DetailCard>
            </div>

            {/* --- ORDER SUMMARY BELOW --- */}
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
                    <StatusBadge status={order.status} />
                </div>

                {/* ITEMS TABLE */}
                <div className="mt-6 border-t pt-4">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">
                        Items Ordered ({order.items.length})
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Product
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        SKU
                                    </th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                        Qty
                                    </th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                        Price
                                    </th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {order.items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 transition duration-100"
                                    >
                                        <td className="px-3 py-3 text-sm font-medium text-gray-900">
                                            {item.name}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-gray-500">{item.sku}</td>
                                        <td className="px-3 py-3 text-sm text-center text-gray-500">
                                            {item.quantity}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-right text-gray-500">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <td className="px-3 py-3 text-sm font-semibold text-gray-800 text-right">
                                            ${(item.quantity * item.price).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TOTALS */}
                <div className="mt-6 border-t pt-4 flex justify-end">
                    <div className="w-full max-w-sm space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium text-gray-800">
                                ${order.payment.subtotal.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="font-medium text-gray-800">
                                ${order.payment.shippingFee.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax (6%):</span>
                            <span className="font-medium text-gray-800">
                                ${order.payment.tax.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between border-t pt-2 text-base font-bold text-gray-900">
                            <span>ORDER TOTAL:</span>
                            <span>${order.payment.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );

};

export default OrderDetails;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import FilterByButton from "../../components/admin/FilterByButton";
import {
    faBox,
    faCartShopping,
    faCircleCheck,
    faSpinner,
    faClock,
    faCircleXmark,
    faBook,
    faBoxOpen,
    faUsers,
    faShoppingCart,
    faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import type { Order, OrderPageResponse } from "../../types/components";
import { fetchAllOrders, getOrdersCount } from "../../services/orderService";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import Metric from "../../components/admin/Metric";
import Pagination from "../../components/admin/Pagination";



export default function Orders() {
    // * Searching
    const [searchTerm, setSearchTerm] = useState("");

    // * Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const sort: string = "id,asc";

    const [orderPageResponse, setordersPageResponse] = useState<OrderPageResponse | undefined>(undefined);

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => { if (orderPageResponse) { setOrders(orderPageResponse.content || []); } }, [orderPageResponse]);

    // * Total Users
    const [ordersCount, setOrdersCount] = useState(0);

    useEffect(() => {
        const loadUsersCount = async () => {
            try {
                const count = await getOrdersCount();
                setOrdersCount(count);
            } catch (error) {
                console.error("Failed to load user count:", error);
            }
        };

        loadUsersCount();
    });

    // * Handle Search Change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0); // ! Reset page to 0 when search term changes
    };

    // * Handle Page Change 
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => { void event; setPage(newPage); };

    // * Handle Change Rows Per Page
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // * Filter Options
    const [filters, setFilters] = useState({
        status: "",
        paymentMethod: "",
    });

    // * Load User 
    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchAllOrders(page, rowsPerPage, sort, filters.status, filters.paymentMethod, searchTerm);
            setordersPageResponse(data);
        };
        loadUsers();
    }, [page, rowsPerPage, filters, searchTerm]);


    // * Handle Filter Change
    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
    };

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                <Metric
                    title={"Total Utilisateurs"}
                    icon={faUsers}
                    data={ordersCount}
                    percentage={0.4}
                />
                <Metric
                    title={"Total Orders"}
                    icon={faShoppingCart}
                    data={1358}
                    percentage={0.1}
                />
                <Metric
                    title={"Total Abonnements"}
                    icon={faClipboardList}
                    data={1400}
                    percentage={-0.7}
                />
            </div>
            <PageTitle title={"All Orders"} icon={faCartShopping} />
            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                <div className="w-full md:w-1/3 bg-white rounded-2xl">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search orders by number, customer name or email..."
                    />
                </div>
                <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
                    <div className="flex">
                        <FilterByButton
                            label="Status"
                            value={filters.status}
                            onChange={(value) => handleFilterChange("status", value)}
                            options={[
                                { value: "Completed", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleCheck} className="text-green-500" /> Completed</span> },
                                { value: "Processing", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faSpinner} className="text-blue-500" /> Processing</span> },
                                { value: "Pending", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} className="text-yellow-500" /> Pending</span> },
                                { value: "Cancelled", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className="text-red-500" /> Cancelled</span> },
                            ]}
                        />
                        <FilterByButton
                            label="Payment"
                            value={filters.paymentMethod}
                            onChange={(value) => handleFilterChange("paymentMethod", value)}
                            options={[
                                { value: "Credit Card", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBox} className="text-blue-500" /> Credit Card</span> },
                                { value: "PayPal", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBoxOpen} className="text-green-500" /> PayPal</span> },
                                { value: "Bank Transfer", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBook} className="text-purple-500" /> Bank Transfer</span> },
                            ]}
                        />
                    </div>
                    <Pagination
                        page={page}
                        handleChangePage={handleChangePage}
                        rowsPerPage={orderPageResponse?.size ?? 0}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        count={orderPageResponse?.totalElements ?? 0}
                    />
                </div>
            </div>

            {/* Orders Table */}
            <OrdersTable orders={orders} />
        </DashboardLayout>
    );
}

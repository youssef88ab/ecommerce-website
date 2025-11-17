import DashboardLayout from "../../layouts/DashboardLayout";
import Metric from "../../components/admin/Metric";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import { faDollarSign, faCheck, faCreditCard, faSpinner, faTruckFast, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Order, OrderPageResponse, User } from "../../types/components";
import { getTotalSpentByUserid, getUserById } from "../../services/userService";
import { getOrdersByUserId } from "../../services/orderService";
import SearchBar from "../../components/admin/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../components/admin/Pagination";
import FilterByButton from "../../components/admin/FilterByButton";
import {
    faCcVisa as faCcVisaBrand,
    faCcPaypal as faCcPaypalBrand,
    faCcMastercard as faCcMastercardBrand,
} from "@fortawesome/free-brands-svg-icons";
import { UserInfoCard } from "../../components/admin/UserInfoCard";

export default function UserDetails() {
    // * Searching
    const [searchTerm, setSearchTerm] = useState("");

    // * Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const sort: string = "id,asc";

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
        paymentMethod: ""
    });

    // * Handle Filter Change
    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters((prev) => ({ ...prev, [filterName]: value.toString() }));
    };

    // * Get id From url 
    const { id } = useParams<{ id: string }>();

    const [user, setUser] = useState<User | null>(null);

    const [orderPageResponse, setOrderPageResponse] = useState<OrderPageResponse | null>(null);

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => { if (orderPageResponse) { setOrders(orderPageResponse.content || []); } }, [orderPageResponse]);

    // * Load User 
    useEffect(() => {
        const loadUser = async () => {
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
                const data = await getUserById(numericId);
                setUser(data);
            } catch (error) {
                console.error("Failed to load order", error);
            }
        };
        loadUser();
    }, [id]);

    // * Load Order By User Id 
    useEffect(() => {
        const loadOrders = async () => {
            // * If no id 
            if (!id) return;
            // * Patrse id from string to num 
            const numericId = Number(id);
            if (isNaN(numericId)) {
                console.error("Invalid Id");
                return;
            }
            // * Call Api Service 
            try {
                const data = await getOrdersByUserId(numericId , page , rowsPerPage , sort , filters.status , filters.paymentMethod , searchTerm);
                setOrderPageResponse(data);
            }
            catch (error) {
                console.error("Failed to load orders", error);
            }
        };
        loadOrders();
    } , [page, rowsPerPage, filters, searchTerm] );

    const [totalSpent , setTotalSpent] = useState(0);

    // * Load Total spent of  
    useEffect(() => {
        const loadTotalSpentByUserId = async () => {
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
                const data = await getTotalSpentByUserid(numericId);
                setTotalSpent(data);
            } catch (error) {
                console.error("Failed to load order", error);
            }
        };
        loadTotalSpentByUserId();
    }, [id]);

    return (
        <DashboardLayout>
            {/* Metrics Row */}
            <div className="metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                <Metric
                    title="Total Orders"
                    data={orderPageResponse?.totalElements ?? 0}
                    icon={faBoxArchive}
                    unit=""
                />
                <Metric
                    title="Total Spent"
                    data={totalSpent}
                    icon={faDollarSign}
                    unit=""
                />
            </div>
            <div className="flex flex-col gap-4">
                <UserInfoCard user={user} />
                    <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                        <div className="w-full md:w-1/3">
                            <SearchBar
                                searchTerm={searchTerm}
                                onSearchChange={handleSearchChange}
                                placeholder="Search orders by id, customer name or email..."
                            />
                        </div>
                        <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
                            <div className="flex">
                                <FilterByButton
                                    label="Status"
                                    value={filters.status}
                                    onChange={(value) => handleFilterChange("status", value)}
                                    options={[
                                        { value: "PENDING", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faSpinner} className="text-yellow-500" /> Pending</span> },
                                        { value: "SHIPPED", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faTruckFast} className="text-orange-500" /> Shipped</span> },
                                        { value: "DELIVERED", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500" /> Delivered</span> },
                                    ]}
                                />
                                <FilterByButton
                                    label="Method"
                                    value={filters.paymentMethod}
                                    onChange={(value) => handleFilterChange("paymentMethod", value)}
                                    options={[
                                        { value: "VISA,", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcVisaBrand} className="text-blue-600" /> Visa</span> },
                                        { value: "PAYPAL", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcPaypalBrand} className="text-blue-500" /> PayPal</span> },
                                        { value: "MASTERCARD", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcMastercardBrand} className="text-red-600" /> MasterCard</span> },
                                        { value: "CREDIT_CARD", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCreditCard} className="text-gray-800" /> Credit Card</span> },
                                    ]}
                                    data-testid="method-filter-trigger"
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
                    <OrdersTable orders={orders} />
            </div>
        </DashboardLayout>
    );
}
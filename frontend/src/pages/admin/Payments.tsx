import React, { useEffect, useState } from "react";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import DashboardLayout from "../../layouts/DashboardLayout";
import FilterByButton from "../../components/admin/FilterByButton";
import {
    faCreditCard,
    faClock,
    faCircleXmark,
    faMoneyBillTransfer,
    faUsers,
    faShoppingCart,
    faClipboardList,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCcVisa as faCcVisaBrand,
    faCcPaypal as faCcPaypalBrand,
    faCcMastercard as faCcMastercardBrand,
    faApplePay as faApplePayBrand
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Payment, PaymentPageResponse } from "../../types/components";
import Metric from "../../components/admin/Metric";
import { fetchAllPayments, getPaymentsCount } from "../../services/paymentsService";
import PaymentsTable from "../../components/admin/payments/PaymentsTable";

export default function Payments() {

    // * Searching
    const [searchTerm, setSearchTerm] = useState("");

    // * Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const sort: string = "id,asc";

    const [paymentPageResponse, setpaymentsPageResponse] = useState<PaymentPageResponse | undefined>(undefined);

    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => { if (paymentPageResponse) { setPayments(paymentPageResponse.content || []); } }, [paymentPageResponse]);

    // * Total Payments
    const [paymentsCount, setPaymentsCount] = useState(0);

    // * Load Payments Count 
    useEffect(() => {
        const loadPaymentsCount = async () => {
            try {
                const count = await getPaymentsCount();
                setPaymentsCount(count);
            } catch (error) {
                console.error("Failed to load payments count:", error);
            }
        };
        loadPaymentsCount();
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
        method: ""
    });

    // * Load Payments 
    useEffect(() => {
        const loadOrders = async () => {
            const data = await fetchAllPayments(page, rowsPerPage, sort, filters.status, filters.method, searchTerm);
            setpaymentsPageResponse(data);
        };
        loadOrders();
    }, [page, rowsPerPage, filters, searchTerm]);


    // * Handle Filter Change
    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters((prev) => ({ ...prev, [filterName]: value.toString() }));
    };

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                <Metric
                    title={"Total Utilisateurs"}
                    icon={faUsers}
                    data={paymentsCount}
                />
                <Metric
                    title={"Total Orders"}
                    icon={faShoppingCart}
                    data={paymentsCount}
                />
                <Metric
                    title={"Total Abonnements"}
                    icon={faClipboardList}
                    data={1400}
                />
            </div>
            <PageTitle title={'All Payments'} icon={faCreditCard} />
            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                <div className="w-full md:w-1/3 ">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search payments by ID, customer name or email..."
                    />
                </div>
                <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
                    <div className="flex">
                        <FilterByButton
                            label="Status"
                            value={filters.status}
                            onChange={(value) => handleFilterChange("status", value)}
                            options={[
                                { value: "COMPLETED", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-green-500" /> Completed</span> },
                                { value: "PENDING", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} className="text-yellow-500" /> Pending</span> },
                                { value: "FAILED", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className="text-red-500" /> Failed</span> },
                                { value: "REFUNDED", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMoneyBillTransfer} className="text-blue-500" /> Refunded</span> },
                            ]}
                            data-testid="status-filter-trigger"
                        />
                        <FilterByButton
                            label="Method"
                            value={filters.method}
                            onChange={(value) => handleFilterChange("method", value)}
                            options={[
                                { value: "VISA", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcVisaBrand} className="text-blue-600" /> Visa</span> },
                                { value: "PAYPAL", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcPaypalBrand} className="text-blue-500" /> PayPal</span> },
                                { value: "CREDIT_CARD", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcMastercardBrand} className="text-red-600" /> MasterCard</span> },
                                { value: "MASTERCARD", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faApplePayBrand} className="text-gray-800" /> Apple Pay</span> },
                            ]}
                            data-testid="method-filter-trigger"
                        />
                    </div>

                    <Pagination
                        page={page}
                        handleChangePage={handleChangePage}
                        rowsPerPage={paymentPageResponse?.size ?? 0}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        count={paymentPageResponse?.totalElements ?? 0}
                    />
                </div>
            </div>

            {/* Payments Table */}
            <div className="">
                <PaymentsTable payments={payments} />
            </div>
        </DashboardLayout>
    );
}

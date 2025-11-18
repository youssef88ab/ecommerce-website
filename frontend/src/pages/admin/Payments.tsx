import { useEffect } from "react";
import type { Payment } from "../../types/components";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import PaymentsTable from "../../components/admin/payments/PaymentsTable";
import DashboardLayout from "../../layouts/DashboardLayout";
import {faCreditCard, faPercent} from "@fortawesome/free-solid-svg-icons";
import FilterByButton from "../../components/admin/FilterByButton";

// * Custom hooks and components
import { usePaymentsData, usePaymentsFilters } from "../../hooks/usePayments";
import { SORT_OPTIONS, STATUS_FILTERS, METHOD_FILTERS } from "../../utils/paymentsConstants";
import { fetchAllPayments } from "../../services/paymentsService.ts";
import SortByButton from "../../components/admin/SortByButton.tsx";
import Metric from "../../components/admin/Metric.tsx";

export default function Payments() {
    const { paymentPageResponse, setPaymentPageResponse, paymentsCount, successRate } = usePaymentsData();
    const {
        searchTerm,
        page,
        rowsPerPage,
        sort,
        filters,
        handleSearchChange,
        handleSortChangeWrapper,
        handleFilterChange,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePaymentsFilters();

    // * Load payments data
    useEffect(() => {
        const loadPayments = async () => {
            const data = await fetchAllPayments(page, rowsPerPage, sort, filters.status, filters.method, searchTerm);
            setPaymentPageResponse(data);
        };
        loadPayments();
    }, [page, rowsPerPage, sort, filters, searchTerm, setPaymentPageResponse]);

    const payments: Payment[] = paymentPageResponse?.content ?? [];
    const totalPayments = paymentPageResponse?.totalElements ?? 0;

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                <Metric
                    title={"Total Payments"}
                    icon={faCreditCard}
                    data={paymentsCount}
                    unit=""
                />
                <Metric
                    title={"Success Rate (%)"}
                    icon={faPercent}
                    data={successRate}
                    unit="%"
                />
            </div>


            <PageTitle title="All Payments" icon={faCreditCard}/>

            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                <div className="w-full md:w-1/3">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search payments by ID, customer name or email..."
                    />
                </div>

                <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
                    <div className="flex">
                        <SortByButton
                            label="Sort by"
                            value={sort}
                            onChange={handleSortChangeWrapper}
                            options={SORT_OPTIONS}
                        />
                        <FilterByButton
                            label="Status"
                            value={filters.status}
                            onChange={(value) => handleFilterChange("status", value)}
                            options={STATUS_FILTERS}
                            data-testid="status-filter-trigger"
                        />
                        <FilterByButton
                            label="Method"
                            value={filters.method}
                            onChange={(value) => handleFilterChange("method", value)}
                            options={METHOD_FILTERS}
                            data-testid="method-filter-trigger"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                        <Pagination
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={paymentPageResponse?.size ?? 0}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            count={totalPayments}
                        />
                    </div>
                </div>
            </div>

            <PaymentsTable payments={payments}/>
        </DashboardLayout>
    );
}
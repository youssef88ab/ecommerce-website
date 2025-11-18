import { useEffect } from "react";
import type { Order } from "../../types/components";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import DashboardLayout from "../../layouts/DashboardLayout";
import {faCartShopping, faDollar, faUsers} from "@fortawesome/free-solid-svg-icons";
import FilterByButton from "../../components/admin/FilterByButton";

// * Custom hooks and components
import { useOrdersData, useOrdersFilters } from "../../hooks/useOrders";
import { SORT_OPTIONS, STATUS_FILTERS, PAYMENT_METHOD_FILTERS } from "../../utils/ordersConstants";
import { fetchAllOrders } from "../../services/orderService.ts";
import SortByButton from "../../components/admin/SortByButton.tsx";
import Metric from "../../components/admin/Metric.tsx";

export default function Orders() {
    const { orderPageResponse, setOrderPageResponse, ordersCount, totalSpent } = useOrdersData();
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
    } = useOrdersFilters();

    // * Load orders data
    useEffect(() => {
        const loadOrders = async () => {
            const data = await fetchAllOrders(page, rowsPerPage, sort, filters.status, filters.paymentMethod, searchTerm);
            setOrderPageResponse(data);
        };
        loadOrders();
    }, [page, rowsPerPage, sort, filters, searchTerm, setOrderPageResponse]);

    const orders: Order[] = orderPageResponse?.content ?? [];
    const totalOrders = orderPageResponse?.totalElements ?? 0;

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                <Metric
                    title={"Total Orders"}
                    icon={faUsers}
                    data={ordersCount}
                    unit=""
                />
                <Metric
                    title={"Total Revenue"}
                    icon={faDollar}
                    data={totalSpent}
                    unit="$"
                />
            </div>

            <PageTitle title="All Orders" icon={faCartShopping}/>

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
                        />
                        <FilterByButton
                            label="Method"
                            value={filters.paymentMethod}
                            onChange={(value) => handleFilterChange("paymentMethod", value)}
                            options={PAYMENT_METHOD_FILTERS}
                            data-testid="method-filter-trigger"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                        <Pagination
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={orderPageResponse?.size ?? 0}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            count={totalOrders}
                        />
                    </div>
                </div>
            </div>

            <OrdersTable orders={orders}/>
        </DashboardLayout>
    );
}
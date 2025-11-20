import {useEffect, useCallback} from "react";
import type {User} from "../../types/components";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import UsersTable from "../../components/admin/users/UsersTable";
import DashboardLayout from "../../layouts/DashboardLayout";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import FilterByButton from "../../components/admin/FilterByButton";
import SortByButton from "../../components/admin/SortByButton";
import Metric from "../../components/admin/Metric";

// * Custom hooks and constants
import {useUsersData, useUsersFilters} from "../../hooks/useUsers";
import {SORT_OPTIONS, GENDER_FILTERS, ROLE_FILTERS , USERS_METRICS} from "../../utils/usersConstants";
import {fetchAllUsers} from "../../services/userService";

export default function Users() {
    const { userPageResponse, setUserPageResponse, newUsersThisMonth, usersWhoOrdered, usersCount } = useUsersData();
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
    } = useUsersFilters();

    const users: User[] = userPageResponse?.content ?? [];
    const totalUsers = userPageResponse?.totalElements ?? 0;
    const currentPageSize = userPageResponse?.size ?? 0;

    // * Memoized data loading
    const loadUsers = useCallback(async () => {
        const data = await fetchAllUsers(page, rowsPerPage, sort, filters.gender, filters.role, searchTerm);
        setUserPageResponse(data);
    }, [page, rowsPerPage, sort, filters.gender, filters.role, searchTerm, setUserPageResponse]);

    useEffect(() => {loadUsers();}, [loadUsers]);

    // * Metric data mapping
    const metricData = { usersCount, newUsersThisMonth, usersWhoOrdered};

    return (
        <DashboardLayout>
            {/* Metrics Section */}
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                {USERS_METRICS.map((metric) => (
                    <Metric
                        key={metric.title}
                        title={metric.title}
                        icon={metric.icon}
                        data={metricData[metric.dataKey]}
                        unit=""
                    />
                ))}
            </div>

            <PageTitle title="All Users" icon={faUsers} />

            {/* Filters and Search Section */}
            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                <div className="w-full md:w-1/3">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search users by name or email..."
                    />
                </div>

                <div className="flex-1 flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                        <SortByButton
                            label="Sort by"
                            value={sort}
                            onChange={handleSortChangeWrapper}
                            options={SORT_OPTIONS}
                        />
                        <FilterByButton
                            label="Gender"
                            value={filters.gender}
                            onChange={(value) => handleFilterChange("gender", value)}
                            options={GENDER_FILTERS}
                        />
                        <FilterByButton
                            label="Role"
                            value={filters.role}
                            onChange={(value) => handleFilterChange("role", value)}
                            options={ROLE_FILTERS}
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                        <Pagination
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={currentPageSize}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            count={totalUsers}
                        />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <UsersTable users={users} />
        </DashboardLayout>
    );
}
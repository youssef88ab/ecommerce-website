import {useEffect} from "react";
import type {User} from "../../types/components";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import UsersTable from "../../components/admin/users/UsersTable";
import DashboardLayout from "../../layouts/DashboardLayout";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import FilterByButton from "../../components/admin/FilterByButton";

// * Custom hooks and components
import {useUsersData, useUsersFilters} from "../../hooks/useUsers";
import {SORT_OPTIONS, GENDER_FILTERS, ROLE_FILTERS} from "../../utils/usersConstants";
import {fetchAllUsers} from "../../services/userService.ts";
import {MetricsSection} from "../../components/admin/MetricsSection.tsx";
import {ActionButtons} from "../../components/admin/ActionButtons.tsx";
import SortByButton from "../../components/admin/SortByButton.tsx";

export default function Users() {
    const {userPageResponse, setUserPageResponse, newUsersThisMonth, usersWhoOrdered, usersCount} = useUsersData();
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

    // * Load users data
    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchAllUsers(page, rowsPerPage, sort, filters.gender, filters.role, searchTerm);
            setUserPageResponse(data);
        };
        loadUsers();
    }, [page, rowsPerPage, sort, filters, searchTerm, setUserPageResponse]);

    const users: User[] = userPageResponse?.content ?? [];
    const totalUsers = userPageResponse?.totalElements ?? 0;

    const handleBulkUpload = () => {
        // Implement bulk upload logic
        console.log("Bulk upload clicked");
    };

    const handleExport = () => {
        // Implement export logic
        console.log("Export clicked");
    };

    return (
        <DashboardLayout>
            <MetricsSection
                totalUsers={usersCount}
                newUsersThisMonth={newUsersThisMonth}
                usersWhoOrdered={usersWhoOrdered}
            />

            <PageTitle title="All Users" icon={faUsers}/>

            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                <div className="w-full md:w-1/3">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search users by name or email..."
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
                        <ActionButtons onBulkUpload={handleBulkUpload} onExport={handleExport}/>

                        <Pagination
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={userPageResponse?.size ?? 0}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            count={totalUsers}
                        />
                    </div>
                </div>
            </div>

            <UsersTable users={users}/>
        </DashboardLayout>
    );
}
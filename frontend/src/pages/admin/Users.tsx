import { useState, useEffect } from "react"
import type { User } from "../../types/components";
import Metric from "../../components/admin/Metric";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import UsersTable from "../../components/admin/users/UsersTable";
import { fetchAllUsers, getUsersCount, getUsersWhOrdered } from "../../services/userService";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { UserPageResponse } from "../../types/components";
import FilterByButton from "../../components/admin/FilterByButton";
import {
    faUsers,
    faMars,
    faVenus,
    faShoppingCart,
    faUserTie,
    faUser,
    faUserPlus,
    faDownload,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

export default function Users() {

    // * Searching
    const [searchTerm, setSearchTerm] = useState("");

    // * Pagination 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const sort: string = "id,asc";

    const [userPageResponse, setUserPageResponse] = useState<UserPageResponse | undefined>(undefined);

    const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);

    function formatDate(date: Date): string {
        return date.toISOString().split("T")[0];
    }

    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const [usersWhoOrdered, setUsersWhoOrdered] = useState(0);

    // * Load Users Count (this month)
    useEffect(() => {
        const loadNewUsers = async () => {
            try {
                const count = await getUsersCount(
                    formatDate(currentMonthStart),
                    formatDate(currentMonthEnd)
                );
                setNewUsersThisMonth(count);
            } catch (error) {
                console.error("Failed to load new users:", error);
            }
        };

        loadNewUsers();
    }, []);

    // * Load Users Who Ordered
    useEffect(() => {
        const loadUsersWhoOrdered = async () => {
            try {
                const count = await getUsersWhOrdered();
                setUsersWhoOrdered(count);
            } catch (error) {
                console.error("Failed to load new users:", error);
            }
        };

        loadUsersWhoOrdered();
    }, []);

    // * Handle Search Change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
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
        gender: "",
        role: "",
    });

    // * Load User 
    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchAllUsers(page, rowsPerPage, sort, filters.gender, filters.role, searchTerm);
            setUserPageResponse(data);
        };
        loadUsers();
    }, [page, rowsPerPage, filters, searchTerm]);

    // * Handle Filter Change
    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
        setPage(0);
    };

    const users: User[] = userPageResponse?.content ?? [];

    const usersCount = userPageResponse?.totalElements ?? 0;

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                <Metric
                    title="Total Users"
                    icon={faUsers}
                    data={usersCount}
                    unit=""
                />

                <Metric
                    title="New Users (This Month)"
                    icon={faUserPlus}
                    data={newUsersThisMonth}
                    unit=""
                />

                <Metric
                    title="Customers Who Ordered"
                    icon={faShoppingCart}
                    data={usersWhoOrdered}
                    unit=""
                />
            </div>
            <PageTitle title={'All Users'} icon={faUsers} />
            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                <div className="w-full md:w-1/3 ">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        placeholder="Search users by name or email..."
                    />
                </div>
                <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
                    <div className="flex">
                        <FilterByButton
                            label="Gender"
                            value={filters.gender}
                            onChange={(value) => handleFilterChange("gender", value)}
                            options={[
                                { value: "MALE", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMars} className="text-blue-500" /> Male</span> },
                                { value: "FEMALE", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faVenus} className="text-pink-500" /> Female</span> },
                            ]}
                        />
                        <FilterByButton
                            label="Role"
                            value={filters.role}
                            onChange={(value) => handleFilterChange("role", value)}
                            options={[
                                { value: "ROLE_ADMIN", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUserTie} className="text-grey-500" /> ADMIN</span> },
                                { value: "ROLE_CUSTOMER", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUser} className="text-green-700" /> CUSTOMER</span> },
                            ]}
                        />
                    </div>

                    {/* Pagination + action buttons side by side */}
                    <div className="flex items-center gap-2 flex-wrap justify-end">

                        {/* Bulk Upload */}
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<FontAwesomeIcon icon={faUpload} className="text-xs" />}
                            sx={{
                                textTransform: "none",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                height: "36px",
                                borderRadius: "6px",
                                backgroundColor: "#8b5cf6", // purple-600
                                "&:hover": {
                                    backgroundColor: "#7c3aed", // purple-700
                                },
                            }}
                        >
                            Bulk Upload
                        </Button>

                        {/* Export */}
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<FontAwesomeIcon icon={faDownload} className="text-xs" />}
                            sx={{
                                textTransform: "none",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                height: "36px",
                                borderRadius: "6px",
                                backgroundColor: "#16a34a", // green-600
                                "&:hover": {
                                    backgroundColor: "#15803d", // green-700
                                },
                            }}
                        >
                            Export
                        </Button>

                        {/* Pagination */}

                        <Pagination
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={userPageResponse?.size ?? 0}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            count={userPageResponse?.totalElements ?? 0}
                        />
                    </div>
                </div>
            </div>
            {/* Users Table */}
            <UsersTable users={users} />
        </DashboardLayout>
    );
}

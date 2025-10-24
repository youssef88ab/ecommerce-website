import { useState, useEffect } from "react"
import type { User } from "../../types/components";
import Metric from "../../components/admin/Metric";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/Pagination";
import UsersTable from "../../components/admin/UsersTable";
import { fetchAllUsers } from "../../services/userService";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { UserPageResponse } from "../../services/userService";
import FilterByButton from "../../components/admin/FilterByButton";
import {
    faUsers,
    faMars,
    faVenus,
    faShoppingCart,
    faClipboardList,
    faUserTie,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Users() {

    // * Searching
    const [searchTerm, setSearchTerm] = useState("");

    // * Pagination 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const sort: string = "id,asc";

    const [userPageResponse, setUserPageResponse] = useState<UserPageResponse | undefined>(undefined);

    // * Load User 
    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchAllUsers(page, rowsPerPage, sort);
            setUserPageResponse(data);
        };
        loadUsers();
    }, [page, rowsPerPage]);

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (userPageResponse) {
            setUsers(userPageResponse.content || []);
            console.log("Users : " , users);
        }
    }, [userPageResponse]);

    // Total Users
    const totalUsers = userPageResponse?.totalElements;

    // Handle Page Change 
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    // Handle Change Rows Per Page
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filter Options
    const [filters, setFilters] = useState({
        gender: "",
        role: "",
    });

    // Handle Filter Change
    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
    };

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                <Metric
                    title={"Total Utilisateurs"}
                    icon={faUsers}
                    data={totalUsers ?? 0}
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
            <PageTitle title={'All Users'} icon={faUsers} />
            <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
                <div className="w-full md:w-1/3">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
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
                                { value: "Male", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMars} className="text-blue-500" /> Male</span> },
                                { value: "Female", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faVenus} className="text-pink-500" /> Female</span> },
                            ]}
                        />
                        <FilterByButton
                            label="Role"
                            value={filters.role}
                            onChange={(value) => handleFilterChange("role", value)}
                            options={[
                                { value: "1", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUserTie} className="text-grey-500" /> ADMIN</span> },
                                { value: "2", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUser} className="text-green-700" /> CUSTOMER</span> },
                            ]}
                        />
                    </div>

                    <Pagination
                        page={page}
                        handleChangePage={handleChangePage}
                        rowsPerPage={userPageResponse?.size ?? 0}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        count={userPageResponse?.totalElements ?? 0}
                    />
                </div>
            </div>
            {/* Users Table */}
            <UsersTable users={users} />
        </DashboardLayout>
    );
}

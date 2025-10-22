import { useState, useEffect } from "react"
import FilterByButton from "../../components/admin/FilterByButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardLayout from "../../layouts/DashboardLayout";
import Pagination from "../../components/admin/Pagination";
import UsersTable from "../../components/admin/UsersTable";
import { fetchAllUsers } from "../../services/userService";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import type { User } from "../../types/components";
import Metric from "../../components/admin/Metric";
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

    // Searching
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchAllUsers();
            setUsers(data);
        };
        loadUsers();
    }, []);

    // Total Users
    const totalUsers = users.length;

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
        device_type: "",
        role: "",
    });

    // Handle Filter Change
    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
    };

    // Filter & Search Algorithm
    const filteredUsers = users
        .filter(
            (user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
            (user) =>
                (!filters.gender || user.gender === filters.gender)
        );

    // Displayed User in paginated page
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return (
        <DashboardLayout>
            <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                <Metric
                    title={"Total Utilisateurs"}
                    icon={faUsers}
                    data={837}
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
                        rowsPerPage={rowsPerPage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        count={totalUsers}
                    />
                </div>
            </div>
            {/* Users Table */}
            <UsersTable users={paginatedUsers} />
        </DashboardLayout>
    );
}

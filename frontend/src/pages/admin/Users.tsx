import DashboardLayout from "../../layouts/DashboardLayout";
import PageTitle from "../../components/admin/PageTitle";
import SearchBar from "../../components/admin/SearchBar";
import { useState } from "react";
import mockUsers from "../../data/mockUsers";
import FilterByButton from "../../components/admin/FilterByButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faMars,
    faVenus,
    faStar,
    faAppleWhole,
} from "@fortawesome/free-solid-svg-icons";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import Pagination from "../../components/admin/Pagination";


export default function Users() {

    // Searching
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Total Users
    const totalUsers = mockUsers.length;

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
        level: "",
    });

    // Handle Filter Change
    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
    };



    // Filter & Search Algorithm
    const filteredUsers = mockUsers
        .filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
            (user) =>
                (!filters.gender || user.gender === filters.gender) &&
                (!filters.level || user.level_id === parseInt(filters.level)) &&
                (!filters.device_type || user.device_type === filters.device_type)
        );

    // Displayed User in paginated page
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return (
        <DashboardLayout>
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
                            label="Device Type"
                            value={filters.device_type}
                            onChange={(value) => handleFilterChange("device_type", value)}
                            options={[
                                { value: "Android", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faAndroid} className="text-green-500" /> Android</span> },
                                { value: "iOS", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faAppleWhole} className="text-gray-700" /> iOS</span> },
                            ]}
                        />
                        <FilterByButton
                            label="Level"
                            value={filters.level}
                            onChange={(value) => handleFilterChange("level", value)}
                            options={[
                                { value: "1", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-yellow-500" /> Level 1</span> },
                                { value: "2", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-yellow-500" /> Level 2</span> },
                                { value: "3", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-yellow-500" /> Level 3</span> },
                                { value: "4", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-red-500" /> Level 4</span> },
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
        </DashboardLayout>
    );
}

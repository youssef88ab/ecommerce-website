import Metric from "../../components/admin/Metric";
import {faUsers, faUserPlus, faShoppingCart} from "@fortawesome/free-solid-svg-icons";

interface MetricsSectionProps {
    totalUsers: number;
    newUsersThisMonth: number;
    usersWhoOrdered: number;
}

export const MetricsSection = ({totalUsers, newUsersThisMonth, usersWhoOrdered}: MetricsSectionProps) => (
    <div className="metrics grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-5">
        <Metric title="Total Users" icon={faUsers} data={totalUsers} unit=""/>
        <Metric title="New Users (This Month)" icon={faUserPlus} data={newUsersThisMonth} unit=""/>
        <Metric title="Customers Who Ordered" icon={faShoppingCart} data={usersWhoOrdered} unit=""/>
    </div>
);
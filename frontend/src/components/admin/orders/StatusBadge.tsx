import { faSyncAlt, faCheckCircle, faTruck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { OrderStatus } from "../../../types/components";

export const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    let style = { text: "text-gray-700", bg: "bg-gray-100", icon: faSyncAlt };
    if (status === "DELIVERED") style = { text: "text-green-700", bg: "bg-green-100", icon: faCheckCircle };
    if (status === "SHIPPED" || status === "PROCESSING")
        style = { text: "text-blue-700", bg: "bg-blue-100", icon: faTruck };
    if (status === "CANCELLED") style = { text: "text-red-700", bg: "bg-red-100", icon: faTimesCircle };

    return (
        <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
        >
            <FontAwesomeIcon icon={style.icon} className="w-4 h-4" />
            {status}
        </span>
    );
};
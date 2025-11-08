import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DetailCard: React.FC<{
    title: string,
    icon: any,
    children: React.ReactNode,
}> = ({ title, icon, children }) => (
    <div
        className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 h-full
                    transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
        <div className="flex items-center gap-3 mb-4 border-b pb-3">
            <FontAwesomeIcon icon={icon} className="text-indigo-500 w-4 h-4" />
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600">{children}</div>
    </div>
);

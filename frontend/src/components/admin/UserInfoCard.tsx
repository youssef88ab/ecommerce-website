import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faEnvelope,
    faPhone,
    faCalendar,
    faHashtag,
    faVenusMars,
    faMapMarkerAlt,
    faGlobe
} from '@fortawesome/free-solid-svg-icons';
import type { User } from '../../types/components';
import { renderDateTime, renderGender, renderRole } from '../../utils/functions';

interface UserInfoCardProps {
    user?: User | null;
}

export const UserInfoCard = ({ user }: UserInfoCardProps) => {
    return (
        <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-6 md:p-8 transition duration-300 h-full">
            <div className="flex items-center text-gray-600 mb-6 pb-3">
                <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-3" />
                <h3 className="text-2xl font-extrabold tracking-tight">User Informations</h3>
            </div>

            {/* User Header */}
            <div className="pb-4 border-b border-gray-200 mb-4 relative">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {user?.username || 'N/A'}
                    </h2>
                    <div className="text-right">
                        {renderRole(user?.role)}
                    </div>
                </div>
            </div>

            {/* User Details */}
            <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2 text-indigo-400" />
                        Email
                    </span>
                    <span className="text-sm font-semibold text-gray-800 text-right">
                        {user?.email || 'N/A'}
                    </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2 text-indigo-400" />
                        Phone
                    </span>
                    <span className="text-sm font-semibold text-gray-800 text-right">
                        {user?.phone || 'N/A'}
                    </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faVenusMars} className="w-4 h-4 mr-2 text-indigo-400" />
                        Gender
                    </span>
                    <span className="text-sm font-semibold text-right">
                        {renderGender(user?.gender)}
                    </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2 text-indigo-400" />
                        Registered
                    </span>
                    <span className="text-sm font-semibold text-gray-800 text-right">
                        {renderDateTime(user?.registrationDate)}
                    </span>
                </div>

                {/* Address Fields */}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2 text-indigo-400" />
                        Address
                    </span>
                    <span className="text-sm font-semibold text-gray-800 text-right">
                        405 Mountain View Dr
                    </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2 text-indigo-400" />
                        City, State, ZIP
                    </span>
                    <span className="text-sm font-semibold text-gray-800 text-right">
                        Boulder, CO 80302
                    </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 mr-2 text-indigo-400" />
                        Country
                    </span>
                    <span className="text-sm font-semibold text-gray-800 text-right">
                        USA
                    </span>
                </div>

                <div className="pt-3 mt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-400">User ID</span>
                    <p className="font-mono text-sm text-gray-600 mt-1 flex items-center">
                        <FontAwesomeIcon icon={faHashtag} className="w-3 h-3 mr-1" />
                        {user?.id || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};
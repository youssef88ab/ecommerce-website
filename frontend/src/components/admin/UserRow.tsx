import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { User } from "../../types/components";
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ Define component props type
interface UserRowProps {
  user: User;
  variants?: Variants;
  initial?: string | boolean;
  animate?: string | boolean;
  transition?: Transition;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  variants,
  initial,
  animate,
  transition,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = (user: User) => {
    navigate("/user", { state: { user } });
  };

  return (
    <motion.tr
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition}
      className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
    >
      {/* Avatar + Name + Email */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            className="rounded-full w-10 h-10 object-cover border-2 border-gray-100"
            src=""
            alt={`${user.username}'s avatar`}
          />
          <div>
            <h2 className="font-medium text-md text-gray-900">{user.username}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="py-4 text-gray-600">{user.phone}</td>

      {/* Gender */}
      <td className="py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.gender === "Female"
            ? "bg-pink-50 text-pink-700"
            : "bg-blue-50 text-blue-700"
            }`}
        >
          {user.gender}
        </span>
      </td>

      {/* Registration Date */}
      <td className="py-4 text-gray-600">{user.registrationDate}</td>

      {/* View Button */}
      <td className="py-4 text-center">
        <Tooltip title="View Details" arrow placement="top">
          <IconButton
            onClick={() => handleViewDetails(user)}
            size="small"
            color="info"
            aria-label={`View details for ${user.username}`}
            className="hover:bg-blue-50 transition-colors duration-200"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </td>
    </motion.tr>
  );
};

export default UserRow;

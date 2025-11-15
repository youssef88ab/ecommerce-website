import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import React from "react";
import { tableVariants, rowVariants } from "../../../variants/animations";
import UserRow from "./UserRow";
import type { User } from "../../../types/components";


interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <motion.div
      variants={tableVariants as Variants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden"
    >
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              username
            </th>
            <th
              scope="col"
              className="py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Phone
            </th>
            <th
              scope="col"
              className="py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Gender
            </th>
            <th
              scope="col"
              className="py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Registration Date
            </th>
            <th
              scope="col"
              className="py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Level
            </th>
            <th
              scope="col"
              className="py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user, index) => (
              <UserRow
                key={user.id}
                user={user}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              />
            ))
          ) : (
            <motion.tr
              variants={rowVariants}
              initial="hidden"
              animate="visible"
            >
              <td
                colSpan={6}
                className="px-6 py-8 text-center text-gray-500 bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-medium">No Users found</span>
                </div>
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default UsersTable;

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { tableVariants, rowVariants } from "../../../variants/animations";
import type { Order } from "../../../types/components";
import OrderRow from "./OrderRow";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
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
              Order Number
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Customer
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Status
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
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderRow
                key={order.id}
                order={order}
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
                colSpan={8}
                className="px-6 py-8 text-center text-gray-500 bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-medium">No Orders found</span>
                  <span className="text-sm text-gray-400 mt-1">
                    Add a new order to get started
                  </span>
                </div>
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default OrdersTable;

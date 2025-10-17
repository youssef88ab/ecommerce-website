import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { pageTitleVariants } from "../../variants/animations";

export default function PageTitle({ title, icon }: { title: string; icon?: IconProp }) {
    return (
        <motion.div
            className="flex justify-start items-center gap-2 mb-4"
            variants={pageTitleVariants.container}
            initial="initial"
            animate="animate"
        >
            {icon && (
                <motion.div
                    variants={pageTitleVariants.icon}
                >
                    <FontAwesomeIcon icon={icon} className="text-xl text-gray-600" />
                </motion.div>
            )}
            <motion.h1
                className="font-semibold text-2xl text-gray-800"
                variants={pageTitleVariants.title}
            >
                {title}
            </motion.h1>
        </motion.div>
    );
}

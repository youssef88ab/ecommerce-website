import AnimatedNumber from "./AnimatedNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { metricVariants } from "../../variants/dashboardVariants";
interface MetricProps {
    icon: IconProp;
    title: string;
    data: number;
    unit: string
}

export default function Metric(probs: MetricProps) {
    return (
        <>
            <motion.div initial="hidden" animate="visible" variants={metricVariants}>
                <div className="py-4 px-8 bg-gray-50 border w-auto shadow-sm rounded-xl justify-center items-center flex flex-col gap-2">
                    <div className="header flex flex-row  items-center gap-2 text-center">
                        <FontAwesomeIcon
                            className="text-gray-500 my-auto"
                            icon={probs.icon}
                        />
                        <p className="text-black font-semibold opacity-50 my-auto text-center">
                            {probs.title}
                        </p>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <p className="text-black font-bold text-2xl">
                            <AnimatedNumber value={probs.data} /> {probs.unit}
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

import type { ReactNode } from "react";

export interface Option {
    label: ReactNode;
    value: string | number;
}

export interface FilterByButtonProps {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options: Option[];
}

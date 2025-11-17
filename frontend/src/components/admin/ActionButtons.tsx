import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faUpload} from "@fortawesome/free-solid-svg-icons";

interface ActionButtonsProps {
    onBulkUpload?: () => void;
    onExport?: () => void;
}

export const ActionButtons = ({onBulkUpload, onExport}: ActionButtonsProps) => (
    <>
        <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={onBulkUpload}
            startIcon={<FontAwesomeIcon icon={faUpload} className="text-xs"/>}
            sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                fontWeight: 500,
                height: "36px",
                borderRadius: "6px",
                backgroundColor: "#8b5cf6",
                "&:hover": {backgroundColor: "#7c3aed"},
            }}
        >
            Bulk Upload
        </Button>

        <Button
            variant="contained"
            size="small"
            onClick={onExport}
            startIcon={<FontAwesomeIcon icon={faDownload} className="text-xs"/>}
            sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                fontWeight: 500,
                height: "36px",
                borderRadius: "6px",
                backgroundColor: "#16a34a",
                "&:hover": {backgroundColor: "#15803d"},
            }}
        >
            Export
        </Button>
    </>
);
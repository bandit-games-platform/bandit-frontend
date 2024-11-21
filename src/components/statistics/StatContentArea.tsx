import {Box, Typography} from "@mui/material";
import {ReactNode} from "react";

interface ContentAreaProps {
    children: ReactNode;
    title?: string;
    isSidebarOpen: boolean; // Add this prop to track if sidebar is open
}

export default function StatContentArea({children, title, isSidebarOpen}: ContentAreaProps) {
    return (
        <Box
            flexGrow={1}
            p={2}
            sx={{
                marginLeft: isSidebarOpen ? 12 : 20, // Shift content based on sidebar state
                transition: "margin-left 0.3s", // Smooth transition for content shift
            }}
        >
            {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
            {children}
        </Box>
    );
}

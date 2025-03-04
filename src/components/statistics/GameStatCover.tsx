import {Box, Theme, Typography, useMediaQuery} from "@mui/material";
import {ReactNode} from "react";

interface ContentAreaProps {
    children: ReactNode;
    title?: string;
}

export default function GameStatCover({children, title}: ContentAreaProps) {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    return (
        <Box
            flexGrow={1}
            p={2}
            sx={{
                marginLeft: isMobile ? 6 : 'auto',
                transition: "margin-left 0.3s",
                paddingRight: isMobile ? 1 : 4,
            }}
        >
            {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
            {children}
        </Box>
    );
}

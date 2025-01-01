import theme from "../../theme/theme.ts";
import Box, {BoxProps} from "@mui/material/Box";
import React, {useEffect, useRef} from "react";

interface CustomScrollbarProps extends BoxProps {
    children: React.ReactNode;
}

export function CustomScrollbar({children, ...props}: CustomScrollbarProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [children]);

    return (
        <Box
            {...props}
            ref={scrollRef}
            sx={{
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                    width: "10px",
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: theme.palette.primary.dark,
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: "5px",
                    "&:hover": {
                        backgroundColor: theme.palette.secondary.light,
                    },
                },
                scrollbarWidth: "thin",
                scrollbarColor: `#f2d5f3 #615f5f`,
                ...props.sx,
            }}
        >
            {children}
        </Box>
    );
}
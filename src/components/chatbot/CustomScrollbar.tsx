import theme from "../../theme/theme.ts";
import Box, {BoxProps} from "@mui/material/Box";
import React, {useEffect, useRef, useState} from "react";

interface CustomScrollbarProps extends BoxProps {
    children: React.ReactNode;
}

export function CustomScrollbar({children, ...props}: CustomScrollbarProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isUserNearBottom, setIsUserNearBottom] = useState(true);


    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

                const isNearBottom = scrollHeight - scrollTop - clientHeight <= 50;
                setIsUserNearBottom(isNearBottom);
            }
        };

        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (ref) {
                ref.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current && isUserNearBottom) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [children, isUserNearBottom]);

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
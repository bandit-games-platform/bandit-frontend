import Box from "@mui/material/Box";

export function TypingDots() {
    return (
        <Box
            sx={{
                display: "inline-block",
                fontSize: "24px",
                "& .dot": {
                    animation: "typing 2s infinite",
                    opacity: 0,
                },
                "& .dot:nth-of-type(1)": {
                    animationDelay: "0s",
                },
                "& .dot:nth-of-type(2)": {
                    animationDelay: "0.5s",
                },
                "& .dot:nth-of-type(3)": {
                    animationDelay: "1s",
                },
                "@keyframes typing": {
                    "0%": {
                        opacity: 0,
                    },
                    "30%": {
                        opacity: 1,
                    },
                    "60%": {
                        opacity: 1,
                    },
                    "90%": {
                        opacity: 1,
                    },
                    "100%": {
                        opacity: 0,
                    },
                },
            }}
        >
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
        </Box>
    );
}
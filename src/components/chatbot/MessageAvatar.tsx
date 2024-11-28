import Box from "@mui/material/Box";
import theme from "../../theme/theme.ts";

interface MessageAvatarProps {
    src: string;
    alt: string;
    borderColor: string;
}

export function MessageAvatar({src, alt, borderColor}: MessageAvatarProps) {
    return (
        <Box sx={{display: "flex", alignItems: "center", marginRight: theme.spacing(1)}}>
            <img
                src={src}
                alt={alt}
                style={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                    marginRight: 8,
                    padding: 3,
                    borderRadius: "50%",
                    border: `2px solid ${borderColor}`,
                }}
            />
        </Box>
    );
}
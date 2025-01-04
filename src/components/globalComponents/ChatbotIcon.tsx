import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SmsIcon from '@mui/icons-material/Sms';

interface ChatbotIconProps {
    onClick?: () => void;
}

export function ChatbotIcon({onClick}: ChatbotIconProps) {
    return (
        <Tooltip title="Need help?">
            <IconButton
                onClick={onClick}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    left: 22,
                    width: 42,
                    height: 42,
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.common.white,
                    zIndex: 10,
                    boxShadow: 3,
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.secondary.dark,
                    },
                }}
            >
                <SmsIcon sx={{fontSize: 24}}/>
            </IconButton>
        </Tooltip>
    );
}
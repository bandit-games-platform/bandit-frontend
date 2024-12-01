import IconButton from "@mui/material/IconButton";
import {Notifications} from "@mui/icons-material";
import {useTheme} from "@mui/material";

interface NotificationAlarmProps {
    onClick: () => void;
}

export function NotificationAlarm({onClick}: NotificationAlarmProps) {
    const theme = useTheme();

    return (
        <IconButton
            onClick={onClick}
            sx={{
                color: theme.palette.text.primary,
                fontSize: 28,
                borderRadius: '50%',
                '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                },
                padding: '8px',
                transition: 'all 0.3s ease',
            }}
        >
            <Notifications sx={{
                fontSize: 'inherit',
                border: '2px solid white',
                margin: '0 1',
                borderRadius: '7px'
            }}/>
        </IconButton>
    )
}
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
                color: theme.palette.text.primary,  // Base color of the icon
                fontSize: 28,  // Icon size
                borderRadius: '50%',  // Rounded shape
                '&:hover': {
                    backgroundColor: theme.palette.primary.main,  // Hover background color
                    color: theme.palette.common.white,  // Icon color on hover
                },
                padding: '8px',  // Padding for better touch targets
                transition: 'all 0.3s ease',  // Smooth transition for hover effect
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
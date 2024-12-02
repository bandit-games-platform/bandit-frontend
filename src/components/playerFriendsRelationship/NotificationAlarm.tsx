import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {Notifications} from "@mui/icons-material";
import {useTheme} from "@mui/material";

interface NotificationAlarmProps {
    onClick: () => void;
    notificationCount: number; // Add a prop for the notification count
}

export function NotificationAlarm({onClick, notificationCount}: NotificationAlarmProps) {
    const theme = useTheme();

    return (
        <Badge
            onClick={onClick}
            badgeContent={notificationCount}
            color="error"
            overlap="circular"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                '& .MuiBadge-badge': {
                    transform: 'scale(1.1)',
                    boxShadow: `0 0 5px ${theme.palette.primary.main}`,
                    margin: '0 0 0 1em',
                    cursor: 'pointer',
                },
            }}
        >
            <IconButton
                onClick={onClick}
                sx={{
                    color: theme.palette.text.primary,
                    fontSize: 29,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.background.default,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                    },
                    padding: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 2px 5px ${theme.palette.grey[500]}`,
                }}
            >
                <Notifications
                    sx={{
                        fontSize: 'inherit',
                        border: '2px solid white',
                        margin: '0 1',
                        borderRadius: '7px',
                    }}
                />
            </IconButton>
        </Badge>
    );
}

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {Notifications, Close} from "@mui/icons-material"; // Import Close icon
import {useTheme} from "@mui/material";

interface NotificationAlarmProps {
    onClick: () => void;
    notificationCount: number;
    isNotificationView: boolean;
}

export function NotificationAlarm({onClick, notificationCount, isNotificationView}: NotificationAlarmProps) {
    const theme = useTheme();

    return (
        <Badge
            badgeContent={isNotificationView ? 0 : notificationCount}
            onClick={onClick}
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
                {isNotificationView ? (
                    <Close
                        sx={{
                            fontSize: 'inherit',
                            border: '2px solid white',
                            margin: '0 1',
                            borderRadius: '7px',
                        }}
                    />
                ) : (
                    <Notifications
                        sx={{
                            fontSize: 'inherit',
                            border: '2px solid white',
                            margin: '0 1',
                            borderRadius: '7px',
                        }}
                    />
                )}
            </IconButton>
        </Badge>
    );
}

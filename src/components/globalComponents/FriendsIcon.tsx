import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from '@mui/icons-material/People';

interface FriendsIconProps {
    onClick?: () => void;
}

export function FriendsIcon({onClick}: FriendsIconProps) {
    return (
        <Tooltip title="Your Friends">
            <IconButton
                onClick={onClick}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 22,
                    width: 42,
                    height: 42,
                    backgroundColor: (theme) => theme.palette.primary.light,
                    color: (theme) => theme.palette.common.white,
                    zIndex: 10,
                    boxShadow: 3,
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.primary.main,
                    },
                }}
            >
                <PeopleIcon sx={{fontSize: 24}}/>
            </IconButton>
        </Tooltip>
    );
}
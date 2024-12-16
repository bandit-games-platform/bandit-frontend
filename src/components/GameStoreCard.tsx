import {Box, Card, CardContent, Typography} from '@mui/material';
import GameIcon from './GameIcon';
import {useLocation, useNavigate} from "react-router-dom";
import {useTheme} from '@mui/material/styles';

interface GameStoreCardProps {
    id: string;
    title: string;
    description: string;
    icon: string;
    price: number;
}

function GameStoreCard({id, title, description, icon, price}: GameStoreCardProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToDetails = () => {
        const currentUrl = location.pathname + location.search;
        navigate(`/game/${id}`, {state: {from: currentUrl}});
    };

    return (
        <Card
            onClick={navigateToDetails}
            sx={{
                display: 'flex',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#0e2546',
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                ":hover": {
                    opacity: 0.8,
                    cursor: 'pointer',
                },
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <GameIcon iconUrl={icon} width="80px" height="80px"/>

                {/* Game info */}
                <CardContent sx={{marginLeft: '1rem'}}>
                    <Typography
                        variant="h6"
                        sx={{
                            marginBottom: '0.5rem',
                            color: theme.palette.common.white,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </Box>

            {/* Price */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.common.white,
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    marginTop: '4rem',
                }}
            >
                €{price.toFixed(2)}
            </Box>
        </Card>
    );
}

export default GameStoreCard;
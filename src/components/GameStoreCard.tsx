import {Box, Card, CardContent, Typography} from '@mui/material';
import GameIcon from './GameIcon';
import {useLocation, useNavigate} from "react-router-dom"; // Assuming you created the GameIcon component earlier

interface GameStoreCardProps {
    id: string;
    title: string;
    description: string;
    icon: string;
    price: number;
}

function GameStoreCard({id,title, description, icon, price}: GameStoreCardProps) {

    const navigate = useNavigate();
    const location = useLocation();

    const navigateToDetails = () => {
        const currentUrl = location.pathname + location.search;
        navigate(`/game/${id}`, { state: { from: currentUrl } });
    };


    return (
            <Card
                onClick={navigateToDetails}
                sx={{
                    display: 'flex',
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: '#878c95',
                    textDecoration: 'none',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    ":hover": {
                        opacity: 0.5,
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
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {description}
                        </Typography>
                    </CardContent>
                </Box>

                {/*  Price */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        marginTop: '4rem'
                    }}
                >
                    €{price.toFixed(2)}
                </Box>
            </Card>
    );
}

export default GameStoreCard;

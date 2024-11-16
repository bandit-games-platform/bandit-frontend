import { Card, CardContent, Typography } from '@mui/material';
import GameIcon from './GameIcon'; // Assuming you created the GameIcon component earlier

interface GameStoreCardProps {
    title: string;
    description: string;
    icon: string;
}

function GameStoreCard({ title, description, icon }: GameStoreCardProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#878c95',
        }}>

            <GameIcon iconUrl={icon} width="80px" height="80px" />

            <CardContent sx={{ marginLeft: '1rem' }}>
                <Typography variant="h6"
                            sx={{
                                marginBottom: '0.5rem'
                }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default GameStoreCard;

import { Box } from '@mui/material';

interface GameIconProps {
    iconUrl: string;
    width?: string;
    height?: string;
}

function GameIcon({ iconUrl, width = '50px', height = '50px' }: GameIconProps) {

    console.log(iconUrl)

    return (
        <Box
            sx={{
                width: width,
                height: height,
                backgroundImage: `url(${iconUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    );
}

export default GameIcon;

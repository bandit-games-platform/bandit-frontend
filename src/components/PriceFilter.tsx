import { Card, Slider, Typography} from "@mui/material";

interface PriceFilterProps {
    lowestPrice?: number;
    highestPrice?: number;
}

function PriceFilter({ lowestPrice, highestPrice}: PriceFilterProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '1rem',
                backgroundColor: '#878c95',
                borderRadius: '0.5rem',
                boxShadow: 'none',
                width: '90%',
            }}>

                <Typography color="white" sx={{ color: 'black' }}>
                    PRICE
                </Typography>
                <Slider
                    sx={{ color: 'black' }}
                    min={lowestPrice}
                    max={highestPrice}
                    defaultValue={highestPrice}
                    aria-label="Default" valueLabelDisplay="auto" />
        </Card>
    );
}

export default PriceFilter;

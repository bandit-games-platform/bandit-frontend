import {Box, Card, Typography, Slider, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

interface GamesFilterProps {
    maxPrice: number;
    minPrice: number;
    filteredPrice: number;
    setFilteredPrice: (value: number) => void;
}

function GamesFilter({maxPrice, minPrice, filteredPrice, setFilteredPrice}: GamesFilterProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handlePriceChange = (_: Event, value: number | number[]) => {
        setFilteredPrice(value as number);
    };

    return (
        <Card
            sx={{
                padding: isMobile ? '0.4rem' : '0.5rem',
                background: 'linear-gradient(135deg, #1976d2, #4fc3f7)',
                borderRadius: '0.75rem',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '0.2rem' : '0.25rem',
                zIndex: 1,
            }}
        >
            {/* Price Filter Section */}
            <Box>
                <Typography color="white" variant="h6"
                            sx={{
                                marginBottom: '0.1rem',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}>
                    Filter Games by Price
                </Typography>
                <Slider
                    value={filteredPrice}
                    min={minPrice}
                    max={maxPrice}
                    step={2}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                />
                <Typography variant="body2" sx={{color: 'white', marginTop: '0.05rem', fontSize: '0.85rem'}}>
                    Selected: <strong> Max: ${maxPrice}</strong>)
                </Typography>
            </Box>
        </Card>
    );
}

export default GamesFilter;

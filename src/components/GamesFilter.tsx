import {Box, Card, Typography, Slider} from "@mui/material";

interface GamesFilterProps {
    maxPrice: number;
    minPrice: number;
    filteredPrice: number;
    setFilteredPrice: (value: number) => void;
}

function GamesFilter({maxPrice, minPrice, filteredPrice, setFilteredPrice}: GamesFilterProps) {
    const handlePriceChange = (_: Event, value: number | number[]) => {
        setFilteredPrice(value as number);
    };

    return (
        <Card
            sx={{
                position: 'sticky',
                top: 20,
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #1976d2, #4fc3f7)',
                borderRadius: '1rem',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                zIndex: 1,
            }}
        >
            {/* Price Filter Section */}
            <Box sx={{width: '100%'}}>
                <Typography color="white" variant="h6" sx={{marginBottom: '1rem', fontWeight: 'bold'}}>
                    Filter by Price
                </Typography>
                <Slider
                    value={filteredPrice}
                    min={minPrice}
                    max={maxPrice}
                    step={10}
                    onChange={handlePriceChange}
                    valueLabelDisplay="on" // Display value directly on the thumb
                    sx={{
                        '& .MuiSlider-thumb': {
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#fff',
                            border: '2px solid #1976d2',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: '#fff',
                            height: '8px',
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            height: '8px',
                        },
                    }}
                />
                <Typography variant="body2" sx={{color: 'white', marginTop: '0.5rem'}}>
                    Selected: <strong>${filteredPrice}</strong> (Min: ${minPrice}, Max: ${maxPrice})
                </Typography>
            </Box>
        </Card>
    );
}

export default GamesFilter;

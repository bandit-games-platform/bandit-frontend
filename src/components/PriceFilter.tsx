import {Box, Card, Slider, Typography, useMediaQuery} from "@mui/material";
import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";

interface PriceFilterProps {
    minPrice: number;
    maxPrice: number;
    filteredPrice: number;
    setFilteredPrice: (value: number) => void;
}

function PriceFilter({minPrice, maxPrice, filteredPrice, setFilteredPrice}: PriceFilterProps) {
    const [smoothSlidingPrice, setSmoothSlidingPrice] = useState(filteredPrice);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setSmoothSlidingPrice(newValue);
        }
    };

    const handleCommit = (_event: Event | React.SyntheticEvent, priceFilterAmount: number | number[]) => {
        if (typeof priceFilterAmount === "number") {
            setFilteredPrice(priceFilterAmount);
        }
    };

    return (
        <Card
            sx={{
                padding: isMobile ? '0.4rem' : '0.1rem',
                background: 'linear-gradient(135deg, #1976d2, #4fc3f7)',
                borderRadius: '0.75rem',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1,
                width: "15em",
                textAlign: 'center',
                justifySelf: 'center',
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
                    sx={{width: '100%'}}
                    min={minPrice}
                    max={maxPrice}
                    value={smoothSlidingPrice}
                    onChange={handleChange}
                    onChangeCommitted={handleCommit}
                    aria-label="Price Filter"
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

export default PriceFilter;

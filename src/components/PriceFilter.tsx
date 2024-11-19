import {Card, Slider} from "@mui/material";
import React, {useState} from "react";

interface PriceFilterProps {
    minPrice: number;
    maxPrice: number;
    filteredPrice: number;
    setFilteredPrice: (value: number) => void;
}

function PriceFilter({ minPrice, maxPrice, filteredPrice, setFilteredPrice }: PriceFilterProps) {
    const [smoothSlidingPrice, setSmoothSlidingPrice] = useState(filteredPrice);

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
        <Card style={{ backgroundColor: '#878c95', boxShadow: "none" }}>
            <Slider
                sx={{ color: 'black', padding: '3rem', width: '40%', marginLeft: '1rem' }}
                min={minPrice}
                max={maxPrice}
                value={smoothSlidingPrice}
                onChange={handleChange}
                onChangeCommitted={handleCommit}
                aria-label="Price Filter"
                valueLabelDisplay="auto"
            />
        </Card>
    );
}

export default PriceFilter;

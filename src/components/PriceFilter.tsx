import {Card, Slider} from "@mui/material";
import {useState} from "react";

interface PriceFilterProps {
    lowestPrice: number;
    highestPrice: number;
    filteredPrice: number;
    setFilteredPrice: (value: number) => void;
}

function PriceFilter({ lowestPrice, highestPrice, setFilteredPrice }: PriceFilterProps) {
    const [currentFilteredPrice, setCurrentFilteredPrice] = useState(highestPrice);

    const handleSlide = (_event: Event, priceFilterAmount: number | number[]) => {
        if (typeof priceFilterAmount === "number") {
            setCurrentFilteredPrice(priceFilterAmount);
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
                sx={{ color: 'black', backgroundColor: '#878c95', padding: '3rem', width: '40%', marginLeft: '1rem' }}
                min={lowestPrice}
                max={highestPrice}
                value={currentFilteredPrice}
                onChange={handleSlide}
                onChangeCommitted={handleCommit}
                aria-label="Price Filter"
                valueLabelDisplay="auto"
            />
        </Card>
    );
}

export default PriceFilter;

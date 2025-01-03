import {Box} from "@mui/material";
import PriceFilter from "./PriceFilter.tsx";

interface GamesFilterProps {
    maxPrice: number;
    minPrice: number;
    filteredPrice: number;
    setFilteredPrice: (value: number) => void;
}

function GamesFilter({maxPrice, minPrice, filteredPrice, setFilteredPrice}: GamesFilterProps) {
    return (
        <Box>
            <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                filteredPrice={filteredPrice}
                setFilteredPrice={setFilteredPrice}
            />
        </Box>
    );
}

export default GamesFilter;
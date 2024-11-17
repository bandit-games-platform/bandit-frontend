import {Card, Slider} from "@mui/material";

interface PriceFilterProps {
    lowestPrice?: number;
    highestPrice?: number;
}

function PriceFilter({lowestPrice, highestPrice}: PriceFilterProps) {
    return (
        <Card style={{
            backgroundColor: '#878c95',
            boxShadow: "none"
        }}>
            <Slider
                sx={{
                    color: 'black',
                    backgroundColor: '#878c95',
                    padding: '3rem',
                    width: '85%',
                    marginLeft: '1rem'
                }}
                min={lowestPrice}
                max={highestPrice}
                defaultValue={highestPrice}
                aria-label="Default" valueLabelDisplay="auto"/>
        </Card>
    );
}

export default PriceFilter;

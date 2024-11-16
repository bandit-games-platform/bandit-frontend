import {Card} from "@mui/material";
import TagFilter from "./TagFilter.tsx";
import PriceFilter from "./PriceFilter.tsx";

function GamesFilter() {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
                backgroundColor: '#32333f',
                padding: '1rem',
                width:  '30vw',
                borderRadius: '1rem',

            }}
        >
                <TagFilter/>

                <PriceFilter lowestPrice={0} highestPrice={999}/>
        </Card>
    );
}

export default GamesFilter;

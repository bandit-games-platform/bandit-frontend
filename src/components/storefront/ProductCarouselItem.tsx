import {Paper, Stack, Typography} from "@mui/material";
import {Product} from "../../model/storefront/Product.ts";
import {useNavigate} from "react-router-dom";

interface ProductCarouselItem {
    products: Product[]
    currentUrl: string
    shownItem: number
}

export function ProductCarouselItem({
                                        products,
                                        currentUrl,
                                        shownItem
                                    }: ProductCarouselItem) {
    const navigate = useNavigate();

    const previousCard = shownItem - 1 < 0 ? products.length - 1 : shownItem - 1
    const nextCard = shownItem + 1 > products.length - 1 ? 0 : shownItem + 1

    const navigateToProductPage = (productId: string) => {
        navigate(`/game/${productId}`);
    }

    return (
        <Stack spacing={0}
               direction="row"
               useFlexGap
               sx={{
                   flexWrap: 'wrap',
                   '& img': {
                       width: '100%',
                       height: '100%',
                       objectFit: 'contain',
                   },
               }}>
            {products.length >= 2 && (
                <Paper
                    sx={{
                        width: {xs: '100%', md: '31%'},
                        height: '300px',
                        marginBottom: "1%",
                        marginLeft: {xs: 0, md: '1%'},
                        marginRight: {xs: 0, md: '1%'},
                        position: 'relative',
                    }}
                    onClick={() => {
                        navigateToProductPage(products[previousCard].id)
                    }}
                >
                    <Typography sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 30,
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        zIndex: 1,
                    }}>
                        {products[previousCard].title}
                    </Typography>
                    <img src={products[previousCard].imageUrl} alt={"Previous Screenshot"}/>
                </Paper>
            )}
            <Paper
                sx={{
                    width: {xs: '100%', md: '31%'},
                    height: '300px',
                    marginBottom: "1%",
                    marginLeft: {xs: 0, md: '1%'},
                    marginRight: {xs: 0, md: '1%'},
                    position: 'relative',
                }}
                onClick={() => {
                    navigateToProductPage(products[shownItem].id)
                }}
            >
                <Typography sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 30,
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    zIndex: 1,
                }}>
                    {products[shownItem].title}
                </Typography>
                <img src={currentUrl} alt={"Current Screenshot"}/>
            </Paper>
            {products.length >= 3 && (
                <Paper
                    sx={{
                        width: {xs: '100%', md: '31%'},
                        height: '300px',
                        marginBottom: "1%",
                        marginLeft: {xs: 0, md: '1%'},
                        marginRight: {xs: 0, md: '1%'},
                        position: 'relative',
                    }}
                    onClick={() => {
                        navigateToProductPage(products[nextCard].id)
                    }}
                >
                    <Typography sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 30,
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        zIndex: 1,
                    }}>
                        {products[nextCard].title}
                    </Typography>
                    <img src={products[nextCard].imageUrl} alt={"Next Screenshot"}/>
                </Paper>
            )}
        </Stack>
    )
}

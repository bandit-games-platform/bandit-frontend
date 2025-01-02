import {Box} from "@mui/material";
import {useGetRecommendedProducts} from "../hooks/storefront/useGetRecommendedProducts.ts";
import {LoadingComponent} from "../components/globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../components/globalComponents/ErrorComponent.tsx";
import {ProductCarousel} from "../components/storefront/ProductCarousel.tsx";
import Container from "@mui/material/Container";
import {useGetTrending} from "../hooks/storefront/useGetTrending.ts";

export function Homepage() {
    const {isLoading, isError, products} = useGetRecommendedProducts();
    const {isLoading: trendingLoading, isError: trendingError, trending} = useGetTrending();

    if (isLoading || trendingLoading) {
        return <LoadingComponent/>
    }

    if (isError || !products || trendingError || !trending) {
        return <ErrorComponent/>
    }

    console.log(products);
    console.log(trending);

    return (
        <Container>
            <Box>
                <h1>Based on your Library</h1>
                <ProductCarousel products={products}/>
            </Box>
            <Box>
                <h1>Trending Now</h1>
                <ProductCarousel products={trending}/>
            </Box>
        </Container>
    )
}
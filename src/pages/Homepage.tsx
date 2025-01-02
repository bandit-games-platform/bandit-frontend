import {Box} from "@mui/material";
import {useGetRecommendedProducts} from "../hooks/storefront/useGetRecommendedProducts.ts";
import {LoadingComponent} from "../components/globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../components/globalComponents/ErrorComponent.tsx";
import {ProductCarousel} from "../components/storefront/ProductCarousel.tsx";
import Container from "@mui/material/Container";

export function Homepage() {
    const {isLoading, isError, products} = useGetRecommendedProducts();

    if (isLoading) {
        return <LoadingComponent/>
    }

    if (isError || !products) {
        return <ErrorComponent/>
    }

    console.log(products);

    return (
        <Container>
            <Box>
                <h1>Based on your Library</h1>
                <ProductCarousel products={products}/>
            </Box>
            <Box>
                <h1>Trending Now</h1>
                <ProductCarousel products={products}/>
            </Box>
        </Container>
    )
}
import {Box} from "@mui/material";
import {useGetRecommendedProducts} from "../hooks/storefront/useGetRecommendedProducts.ts";
import {LoadingComponent} from "../components/globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../components/globalComponents/ErrorComponent.tsx";
import {ProductCarousel} from "../components/storefront/ProductCarousel.tsx";

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
        <Box>
            <ProductCarousel products={products}/>
        </Box>
    )
}
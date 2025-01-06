import {useState} from "react";
import Carousel from "react-material-ui-carousel";
import {ProductCarouselItem} from "./ProductCarouselItem.tsx";
import {Product} from "../../model/storefront/Product.ts";
import {Box} from "@mui/material";
import theme from "../../theme/theme.ts";

interface ProductCarouselProps {
    products: Product[]
}

export function ProductCarousel({products}: ProductCarouselProps) {
    const [shownItem, setShownItem] = useState(0);

    return (
        <div>
            <Box sx={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "3%",
            }}>
                <Carousel sx={{
                    width: "100%",
                    overflow: 'visible',
                }}
                          next={(active) => {
                              setShownItem(active ? active : 0)
                          }}
                          prev={(active) => {
                              setShownItem(active ? active : 0)
                          }}
                          interval={10000}
                          stopAutoPlayOnHover={false}
                          activeIndicatorIconButtonProps={{
                              style: {
                                  color: theme.palette.secondary.light,
                              }
                          }}
                          indicatorIconButtonProps={{
                              style: {
                                  color: 'slategray'
                              }
                          }}

                          autoPlay={products.length > 3}
                          indicators={products.length > 3}
                          navButtonsAlwaysInvisible={products.length <= 3}
                          navButtonsAlwaysVisible={true}
                          onChange={(index) => {
                              setShownItem(index ?? 0); // fallback value of 0 if index is undefined
                          }}

                          navButtonsWrapperProps={{
                              style: {
                                  position: 'absolute',
                                  top: '50%',
                                  left: '-50px',
                                  transform: 'translateY(-50%)',
                                  zIndex: -0,
                              }
                          }}
                          navButtonsProps={{
                              style: {
                                  backgroundColor: "rgb(0, 0, 0, 0.85)",
                                  position: 'absolute',
                                  top: '50%',
                                  right: '-50px',
                                  transform: 'translateY(-50%)',
                                  color: theme.palette.secondary.light,
                              },
                          }}
                >
                    {
                        products.map((item, i) => <ProductCarouselItem
                            key={i}
                            products={products}
                            currentUrl={item.imageUrl}
                            shownItem={shownItem}/>)
                    }
                </Carousel>
            </Box>
        </div>
    )
}
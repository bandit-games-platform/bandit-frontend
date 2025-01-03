import {useState} from "react";
import {Backdrop, Box} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {CarouselItem} from "./CarouselItem.tsx";

interface ImageCarouselProps {
    images: string[]
}

export function ImageCarousel({images}: ImageCarouselProps) {
    const [shownItem, setShownItem] = useState(0);
    const [open, setOpen] = useState(false);
    const [imageClickedUrl, setImageClickedUrl] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const setImageClicked = (url: string) => {
        setImageClickedUrl(url)
    }

    return (
        <div>
            <Box sx={{marginLeft: "5%", marginRight: "5%", marginTop: "3%"}}>
                <Carousel sx={{width: "100%"}}
                          next={ (active) => {setShownItem(active ? active : 0)} }
                          prev={ (active) => {setShownItem(active ? active : 0)} }
                          interval={10000}
                          stopAutoPlayOnHover={false}
                          activeIndicatorIconButtonProps={{
                              style: {
                                  color: 'lightgray'
                              }
                          }}
                          indicatorIconButtonProps={{
                              style: {
                                  color: 'slategray'
                              }
                          }}

                          autoPlay={images.length > 3}
                          indicators={images.length > 3}
                          navButtonsAlwaysInvisible={images.length <= 3}
                >
                    {
                        images.map((item, i) => <CarouselItem key={i} images={images} currentUrl={item} shownItem={shownItem} setImageClicked={setImageClicked} handleOpen={handleOpen}/> )
                    }
                </Carousel>
            </Box>

            <Backdrop
                sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
                open={open}
                onClick={handleClose}
            >
                <img src={imageClickedUrl} alt={"Game Screenshot"} style={{height: "100%"}}/>
            </Backdrop>
        </div>
    )


}
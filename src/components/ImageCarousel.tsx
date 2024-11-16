import {useState} from "react";
import {Box, Paper, Stack} from "@mui/material";
import Carousel from "react-material-ui-carousel";

interface ImageCarouselProps {
    images: string[]
}

interface ScreenshotProps {
    url: string
}

export function ImageCarousel({images}: ImageCarouselProps) {
    const [shownItem, setShownItem] = useState(0)

    return (
        <div>
            <Box sx={{marginLeft: "5%", marginRight: "5%", marginTop: "3%"}}>
                <Carousel sx={{width: "90%"}}
                          next={ (active) => {setShownItem(active ? active : 0)} }
                          prev={ (active) => {setShownItem(active ? active : 0)} }
                          interval={10000}
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
                        images.map((item, i) => <Item key={i} url={item}/> )
                    }
                </Carousel>
            </Box>
        </div>
    )

    function Item({url} : ScreenshotProps)
    {
        const previousCard = shownItem - 1 < 0 ? images.length - 1 : shownItem - 1
        const nextCard = shownItem + 1 > images.length - 1 ? 0 : shownItem + 1

        return (
            <Stack spacing={0}
                   direction="row"
                   useFlexGap
                   sx={{ flexWrap: 'wrap',
                       '& img': {
                           width: '100%',
                           height: '100%',
                           objectFit: 'contain',
                       },
                   }}>
                {images.length >= 2 && (
                    <Paper sx={{
                        width: { xs: '100%', md: '31%' },
                        height: '300px',
                        marginBottom: "1%",
                        marginLeft: { xs: 0, md: '1%'},
                        marginRight: { xs: 0, md: '1%'},
                    }}>
                        <img src={images[previousCard]} alt={"Previous Screenshot"}/>
                    </Paper>
                )}
                <Paper sx={{
                    width: { xs: '100%', md: '31%' },
                    height: '300px',
                    marginBottom: "1%",
                    marginLeft: { xs: 0, md: '1%'},
                    marginRight: { xs: 0, md: '1%'},
                }}>
                    <img src={url} alt={"Current screenshot"}/>
                </Paper>
                {images.length >= 3 && (
                    <Paper sx={{
                        width: { xs: '100%', md: '31%' },
                        height: '300px',
                        marginBottom: "1%",
                        marginLeft: { xs: 0, md: '1%'},
                        marginRight: { xs: 0, md: '1%'},
                    }}>
                        <img src={images[nextCard]} alt={"Next Screenshot"}/>
                    </Paper>
                )}
            </Stack>
        )
    }
}
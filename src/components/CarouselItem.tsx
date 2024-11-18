import {Paper, Stack} from "@mui/material";

interface CarouselItemProps {
    images: string[]
    currentUrl: string
    shownItem: number
    setImageClicked: (url: string) => void
    handleOpen: () => void
}

export function CarouselItem({images, currentUrl, shownItem, setImageClicked, handleOpen}: CarouselItemProps)
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
                <Paper
                    sx={{
                        width: { xs: '100%', md: '31%' },
                        height: '300px',
                        marginBottom: "1%",
                        marginLeft: { xs: 0, md: '1%'},
                        marginRight: { xs: 0, md: '1%'},
                    }}
                    onClick={() => {
                        setImageClicked(images[previousCard])
                        handleOpen()
                    }}
                >
                    <img src={images[previousCard]} alt={"Previous Screenshot"}/>
                </Paper>
            )}
            <Paper
                sx={{
                    width: { xs: '100%', md: '31%' },
                    height: '300px',
                    marginBottom: "1%",
                    marginLeft: { xs: 0, md: '1%'},
                    marginRight: { xs: 0, md: '1%'},
                }}
                onClick={() => {
                    setImageClicked(currentUrl)
                    handleOpen()
                }}
            >
                <img src={currentUrl} alt={"Current screenshot"}/>
            </Paper>
            {images.length >= 3 && (
                <Paper
                    sx={{
                        width: { xs: '100%', md: '31%' },
                        height: '300px',
                        marginBottom: "1%",
                        marginLeft: { xs: 0, md: '1%'},
                        marginRight: { xs: 0, md: '1%'},
                    }}
                    onClick={() => {
                        setImageClicked(images[nextCard])
                        handleOpen()
                    }}
                >
                    <img src={images[nextCard]} alt={"Next Screenshot"}/>
                </Paper>
            )}
        </Stack>
    )
}
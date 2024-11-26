import {Box, Tab, Tabs, useTheme} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import Container from "@mui/material/Container";

export function Gameplay() {
    const theme = useTheme();
    const [tab, setTab] = useState(0);

    const handleChange = (_: SyntheticEvent, newTab: number) => {
        setTab(newTab);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh", // Full viewport height
            }}>
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="Game"/>
                <Tab label="Rules"/>
                <Tab label="Invite" disabled/>
            </Tabs>

            {tab === 0 && <Box sx={{
                flex: 1, // Take up the remaining space
                overflow: "hidden", // Prevent scrollbars
            }}>
                <iframe src="https://example.com" allowTransparency style={{width: "100%", height: "100%", border: "none", backgroundColor: "transparent"}} />
            </Box>}

            {tab === 1 && <Container>
                Rules chatbot here
            </Container>}

            {tab === 2 && <Container>
                Invite players here
            </Container>}
        </Box>
    );
}

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import SecurityContextProvider from "./context/SecurityContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {IndividualGame} from "./pages/IndividualGame.tsx";
import {GamesOverview} from "./pages/GamesOverview.tsx";

const queryClient = new QueryClient();

const theme = createTheme({
    colorSchemes: {
        dark: true,
        light: true
    },
});

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <BrowserRouter>
                    <Routes>
                        <Route path={"/game/:gameId"} element={<IndividualGame/>}></Route>
                        <Route path={"/games"} element={<GamesOverview/>}></Route>
                    </Routes>
                </BrowserRouter>

                {/*<SecurityContextProvider>*/}
                {/*    <BrowserRouter>*/}
                {/*        <Routes>*/}
                {/*        </Routes>*/}
                {/*    </BrowserRouter>*/}
                {/*</SecurityContextProvider>*/}
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App

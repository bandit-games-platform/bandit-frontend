import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SecurityContextProvider from "./context/SecurityContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {IndividualGame} from "./pages/IndividualGame.tsx";
import {Navbar} from "./components/Navbar.tsx";
import './index.css'
import theme from "./theme/theme.ts";
import {StickyFooter} from "./components/StickyFooter.tsx";
import WinLoseRatioCard from "./components/WinLoseRatioCard.tsx";
import GameStats from "./components/GameStats.tsx";


const queryClient = new QueryClient();


function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <SecurityContextProvider>
                    <BrowserRouter>
                        <Navbar/>
                        <Routes>
                            <Route path={"/game/:gameId"} element={<IndividualGame/>}></Route>
                            <Route path={"/stat"} element={<WinLoseRatioCard/>}></Route>
                            <Route path={"/stat2"} element={<GameStats/>}></Route>
                        </Routes>
                        <StickyFooter/>
                    </BrowserRouter>
                </SecurityContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SecurityContextProvider from "./context/SecurityContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {IndividualGame} from "./pages/IndividualGame.tsx";
import {Navbar} from "./components/Navbar.tsx";
import './index.css'
import theme from "./theme/theme.ts";
import {StickyFooter} from "./components/StickyFooter.tsx";
import PlayerLibrary from "./pages/PlayerLibrary.tsx";
import {GamesOverview} from "./pages/GamesOverview.tsx";
import {RouteGuard} from "./components/RouteGuard.tsx";

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
                            <Route path={"/"} element={<RouteGuard><GamesOverview/></RouteGuard>}></Route>
                            <Route path={"/game/:gameId"} element={<RouteGuard><IndividualGame/></RouteGuard>}></Route>
                            <Route path={"/library"} element={<RouteGuard><PlayerLibrary/></RouteGuard>}></Route>
                        </Routes>
                        <StickyFooter/>
                    </BrowserRouter>
                </SecurityContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App

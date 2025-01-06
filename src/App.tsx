import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SecurityContextProvider from "./context/SecurityContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {IndividualGame} from "./pages/IndividualGame.tsx";
import {Navbar} from "./components/globalComponents/Navbar.tsx";
import './index.css'
import theme from "./theme/theme.ts";
import {StickyFooter} from "./components/globalComponents/StickyFooter.tsx";
import {OverallStatistics} from "./pages/OverallStatistics.tsx";
import PlayerLibrary from "./pages/PlayerLibrary.tsx";
import {GamesOverview} from "./pages/GamesOverview.tsx";
import {RouteGuard} from "./components/globalComponents/RouteGuard.tsx";
import {Gameplay} from "./pages/Gameplay.tsx";
import {ExcludeForPaths} from "./components/globalComponents/ExcludeForPaths.tsx";
import {StripeCheckout} from "./pages/StripeCheckout.tsx";
import {GamePurchaseComplete} from "./pages/GamePurchaseComplete.tsx";
import {AdminDashboard} from "./pages/AdminDashboard.tsx";
import {Homepage} from "./pages/Homepage.tsx";

const queryClient = new QueryClient();


function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <SecurityContextProvider>
                    <BrowserRouter>
                        <ExcludeForPaths paths={["/play"]}><Navbar/></ExcludeForPaths>
                        <Routes>
                            <Route path={"/"} element={<RouteGuard><Homepage/></RouteGuard>}></Route>
                            <Route path={"/statistics"} element={<RouteGuard><OverallStatistics/></RouteGuard>}></Route>
                            <Route path={"/game/:gameId"} element={<RouteGuard><IndividualGame/></RouteGuard>}></Route>
                            <Route path={"/store"} element={<RouteGuard><GamesOverview/></RouteGuard>}></Route>
                            <Route path={"/library"} element={<RouteGuard><PlayerLibrary/></RouteGuard>}></Route>
                            <Route path={"/play/:gameId"} element={<RouteGuard><Gameplay/></RouteGuard>}></Route>
                            <Route path={"/store/:gameId/purchase/checkout"}
                                   element={<RouteGuard><StripeCheckout/></RouteGuard>}></Route>
                            <Route path={"/store/:gameId/purchased"}
                                   element={<RouteGuard><GamePurchaseComplete/></RouteGuard>}></Route>
                            <Route path={"/admin-dashboard"}
                                   element={<RouteGuard><AdminDashboard/></RouteGuard>}></Route>
                        </Routes>
                        <ExcludeForPaths paths={["/play"]}><StickyFooter/></ExcludeForPaths>
                    </BrowserRouter>
                </SecurityContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App

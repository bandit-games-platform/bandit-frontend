import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import SecurityContextProvider from "./context/SecurityContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GamesOverview} from "./pages/GamesOverview.tsx";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<GamesOverview/>}></Route>
                </Routes>
            </BrowserRouter>

            {/*<SecurityContextProvider>*/}
            {/*    <BrowserRouter>*/}
            {/*        <Routes>*/}
            {/*        </Routes>*/}
            {/*    </BrowserRouter>*/}
            {/*</SecurityContextProvider>*/}
        </QueryClientProvider>
    )
}

export default App

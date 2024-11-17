import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SecurityContextProvider from "./context/SecurityContextProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {IndividualGame} from "./pages/IndividualGame.tsx";

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

                <SecurityContextProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path={"/game/:gameId"} element={<IndividualGame/>}></Route>
                        </Routes>
                    </BrowserRouter>
                </SecurityContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App

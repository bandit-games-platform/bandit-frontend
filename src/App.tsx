import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import './App.css'
import SecurityContextProvider from "./context/SecurityContextProvider";
import {BrowserRouter, Routes} from "react-router-dom";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <Routes>
                    </Routes>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App

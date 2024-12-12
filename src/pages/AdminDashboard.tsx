import {Avatar, Box, Button, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {useGamesList} from "../hooks/gameRegistry/useGamesList.ts";
import {Game} from "../model/gameRegistry/Game.ts";
import {useAllCompletedSessionsForGameToCsv} from "../hooks/statistics/useAllCompletedSessionsForGameToCsv.ts";
import {useAllAchievementProgressForGameToCsv} from "../hooks/statistics/useAllAchievementProgressForGameToCsv.ts";
import {useState} from "react";

type CsvData = string | Blob;

export function AdminDashboard() {
    const {games, isLoading: isGamesLoading, isError: isGamesError} = useGamesList();
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    const {
        isLoading: isSessionsLoading,
        isError: isSessionsError,
        refetch: refetchCompletedSessions
    } = useAllCompletedSessionsForGameToCsv(selectedGame || "");

    const {
        isLoading: isAchievementLoading,
        isError: isAchievementError,
        refetch: refetchAchievementProgress
    } = useAllAchievementProgressForGameToCsv(selectedGame || "");

    const [exporting, setExporting] = useState<boolean>(false);
    const [exportError, setExportError] = useState<string | null>(null);

    const handleGameChange = (event: SelectChangeEvent) => {
        setSelectedGame(event.target.value);
    };

    const handleExportCsv = async () => {
        if (!selectedGame || !games) return;

        const gameTitle = games.find(game => game.id === selectedGame)?.title || "game";

        setExporting(true);
        setExportError(null);

        try {
            const completedSessions = await refetchCompletedSessions();
            const achievementProgress = await refetchAchievementProgress();

            if (completedSessions?.data) {
                const completedSessionsFileName = `${gameTitle}_completed_sessions.csv`;
                downloadCsv(completedSessions.data, completedSessionsFileName);
            }
            if (achievementProgress?.data) {
                const achievementProgressFileName = `${gameTitle}_achievement_progress.csv`;
                downloadCsv(achievementProgress.data, achievementProgressFileName);
            }
        } catch (error) {
            console.error("Error exporting CSV data:", error);
            setExportError("An error occurred while exporting the CSV files.");
        } finally {
            setExporting(false);
        }
    };

    const downloadCsv = (data: CsvData, filename: string) => {
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    if (isGamesLoading) {
        return <Typography>Loading games...</Typography>;
    }

    if (isGamesError || !games) {
        return <Typography>Error loading games.</Typography>;
    }

    return (
        <Box sx={{marginLeft: "5%", marginTop: "2%", marginRight: "5%"}}>
            <Typography variant="h4" gutterBottom>
                Export CSV statistics for selected game
            </Typography>

            <Box sx={{display: "flex", flexDirection: "column", gap: 2, width: "20rem"}}>
                <Select
                    value={selectedGame || ""}
                    onChange={handleGameChange}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                >
                    <MenuItem value="" disabled>
                        Select a game
                    </MenuItem>
                    {games.map((game: Game) => (
                        <MenuItem key={game.id} value={game.id}>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Avatar src={game.icon} alt={game.title} sx={{width: 32, height: 32, marginRight: 2}}/>
                                <Typography>{game.title}</Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExportCsv}
                    disabled={!selectedGame || isSessionsLoading || isAchievementLoading || exporting}
                >
                    Export CSV
                </Button>

                {/* Display progress or error message */}
                {exporting && !exportError && (
                    <Typography variant="body2" color="textSecondary">
                        Files are being downloaded, please wait...
                    </Typography>
                )}

                {exportError && (
                    <Typography variant="body2" color="error">
                        {exportError}
                    </Typography>
                )}

                {isSessionsError && (
                    <Typography variant="body2" color="error">
                        Error fetching completed sessions data.
                    </Typography>
                )}

                {isAchievementError && (
                    <Typography variant="body2" color="error">
                        Error fetching achievement progress data.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

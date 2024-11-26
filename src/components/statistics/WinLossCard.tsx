import {GameProgress} from "../../model/statistics/GameProgress.ts";
import {Box, Card, CardContent, Typography} from "@mui/material";

interface WinLossCardProps {
    allProgresses: GameProgress[]
}

export function WinLossCard({allProgresses}: WinLossCardProps) {
    let totalWins = 0;
    let totalLosses = 0;
    for (const progress of allProgresses) {
        totalWins += progress.wins;
        totalLosses += progress.losses;
    }

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Overall your win/loss ratio is
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{color: (theme) => theme.palette.secondary.main}}
                    >
                        {totalWins}:{totalLosses}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
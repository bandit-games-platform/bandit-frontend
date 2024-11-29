import {usePlayerJoinDate} from "../../hooks/player/usePlayerJoinDate.ts";
import {usePlayerTotalPlaytime} from "../../hooks/statistics/usePlayerTotalPlaytime.ts";
import {LoadingComponent} from "../LoadingComponent.tsx";
import {ErrorComponent} from "../ErrorComponent.tsx";
import dayjs from "dayjs";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {calculatePlaytime, timeSince} from "../../functions/timeUtil.ts";

export function TotalPlayTimeBar() {
    const {isLoading: joinDateLoading, isError: joinDateError, joinDate} = usePlayerJoinDate();
    const {isLoading: playtimeLoading, isError: playtimeError, playtime} = usePlayerTotalPlaytime();

    if (joinDateLoading || playtimeLoading) {
        return <LoadingComponent/>
    }

    if (joinDateError || playtimeError || !joinDate || !playtime) {
        return <ErrorComponent/>
    }

    return (
        <Box sx={{
            textAlign: "center"
        }}>
            <Typography
                variant={"h2"}
                sx={{
                    fontSize: { xs: '19px', md: '24px' },
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
            >
                <b>You have played for</b>
            </Typography>
            <Typography
                variant={"h1"}
                sx={{
                    fontSize: { xs: '33px', md: '40px' },
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
            >
                <b>{calculatePlaytime(playtime)}</b>
            </Typography>
            <Typography
                variant={"h3"}
                sx={{
                    fontSize: { xs: '15px', md: '20px' },
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
            >
                <b>In the {timeSince(dayjs(joinDate))} since you joined</b>
            </Typography>
        </Box>
    )
}
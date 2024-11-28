import {usePlayerJoinDate} from "../../hooks/player/usePlayerJoinDate.ts";
import {usePlayerTotalPlaytime} from "../../hooks/statistics/usePlayerTotalPlaytime.ts";
import {LoadingComponent} from "../LoadingComponent.tsx";
import {ErrorComponent} from "../ErrorComponent.tsx";
import dayjs from "dayjs";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

export function TotalPlayTimeBar() {
    const {isLoading: joinDateLoading, isError: joinDateError, joinDate} = usePlayerJoinDate();
    const {isLoading: playtimeLoading, isError: playtimeError, playtime} = usePlayerTotalPlaytime();

    if (joinDateLoading || playtimeLoading) {
        return <LoadingComponent/>
    }

    if (joinDateError || playtimeError || !joinDate || !playtime) {
        return <ErrorComponent/>
    }

    function timeSince(date: dayjs.Dayjs): string {
        const now = dayjs();

        const years: number = now.diff(date, 'year');
        const months: number = now.diff(date.add(years, 'year'), 'month');
        const days: number = now.diff(date.add(years, 'year').add(months, 'month'), 'day');
        const hours: number = now.diff(date.add(years, 'year').add(months, 'month').add(days, 'day'), 'hour');

        let returnMessage : string = ``;
        if (years !== 0) {
            if (years === 1) returnMessage += `${years} year `;
            else returnMessage += `${years} years `;
        }
        if (months !== 0) {
            if (months === 1) returnMessage += `${months} month `;
            else returnMessage += `${months} months `;
        }
        if (days !== 0) {
            if (days === 1) returnMessage += `${days} day `;
            else returnMessage += `${days} days `;
        }
        if (returnMessage !== ``) returnMessage += `and `;

        if (hours === 1) returnMessage += `${hours} hour`;
        else returnMessage += `${hours} hours`;

        return returnMessage;
    }

    function calculatePlaytime(playtime: number) {
        let playtimeRemaining = playtime;
        let returnMessage: string = ``;
        const secondsInYear = 60 * 60 * 24 * 365;
        const secondsInMonth = (secondsInYear / 365) * 30
        const secondsInDay = secondsInMonth / 30
        const secondsInHour = secondsInDay / 24

        if (playtimeRemaining >= secondsInYear) {
            const yearsOfPlaytime = Math.trunc(playtimeRemaining / secondsInYear);
            if (yearsOfPlaytime === 1) returnMessage += `${yearsOfPlaytime} year `;
            else returnMessage += `${yearsOfPlaytime} years `;
            playtimeRemaining -= secondsInYear * yearsOfPlaytime;
        }
        if (playtimeRemaining >= secondsInMonth) {
            const monthsOfPlaytime = Math.trunc(playtimeRemaining / secondsInMonth);
            if (monthsOfPlaytime === 1) returnMessage += `${monthsOfPlaytime} month `;
            else returnMessage += `${monthsOfPlaytime} months `;
            playtimeRemaining -= secondsInMonth * monthsOfPlaytime;
        }
        if (playtimeRemaining >= secondsInDay) {
            const daysOfPlaytime = Math.trunc(playtimeRemaining / secondsInDay);
            if (daysOfPlaytime === 1) returnMessage += `${daysOfPlaytime} day `;
            else returnMessage += `${daysOfPlaytime} days `;
            playtimeRemaining -= secondsInDay * daysOfPlaytime;
        }
        if (playtimeRemaining >= secondsInHour) {
            const hoursOfPlaytime = Math.trunc(playtimeRemaining / secondsInHour);
            if (returnMessage !== ``) returnMessage += `and `
            if (hoursOfPlaytime === 1) returnMessage += `${hoursOfPlaytime} hour `;
            else returnMessage += `${hoursOfPlaytime} hours `;
            playtimeRemaining -= secondsInHour * hoursOfPlaytime;
        }
        if (returnMessage === ``) returnMessage = "No Time";

        return returnMessage;
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
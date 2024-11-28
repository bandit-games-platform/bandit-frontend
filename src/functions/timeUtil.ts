import dayjs from "dayjs";

export function timeSince(date: dayjs.Dayjs): string {
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

export function calculatePlaytime(playtime: number) {
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
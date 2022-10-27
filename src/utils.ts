export const convertTimeToDate = (time: number): string => {
    if (time === undefined) {
        return '';
    }
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(time * 1000);
};

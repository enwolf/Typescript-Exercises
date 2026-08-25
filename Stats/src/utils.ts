export const dateStringToDate = (dateString: string): Date =>
{
    // Initial implementation: split the stored DD/MM/YYYY date string into
    // day, month, and year values, then convert each string value to a number.
    //
    // e.g. "28/10/2018" becomes [28, 10, 2018].
    //
    // TypeScript infers dateParts as a number[] even though this function
    // expects the CSV date to contain exactly three values: day, month, and year.
    const dateParts = dateString
        .split("/")
        .map((value: string): number => {
            return parseInt(value);
        });

    // Expected positions:
    // [0] = day
    // [1] = month
    // [2] = year
    //
    // JavaScript Date months are zero-based, so subtract 1 from the month.
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
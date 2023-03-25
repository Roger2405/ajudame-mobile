export function getCurrentDate() {
    const date = new Date();
    const localeDateString = date.toLocaleDateString()
    const [month, day, year] = localeDateString.split('/');
    const formatedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return formatedDate;
}
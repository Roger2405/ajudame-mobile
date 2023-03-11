export function getCurrentDate() {
    const date = new Date();
    const localeDateString = date.toLocaleDateString()
    const [day, month, year] = localeDateString.split('/');
    const formatedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    return formatedDate;
}
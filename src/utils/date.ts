export function getCurrentDate() {
    const date = new Date();
    const localeDateString = date.toLocaleDateString()
    const [month, day, year] = localeDateString.split('/');
    const formatedDate = `20${year}-${month}-${day}`;
    return formatedDate;
}
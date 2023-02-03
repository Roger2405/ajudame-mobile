export default function getGroupedArray(array: any[], accessor: string[]) {

    let groupedArray: any[][] = [];


    for (var i = 0; i < accessor.length; i++) {
        let arr = array.filter(item => item.type_product === accessor[i]);
        if (arr.length > 0) {
            groupedArray.push(arr);
        }

        if (i > 50) {//watch dog
            break;
        }
    }
    return groupedArray;
}
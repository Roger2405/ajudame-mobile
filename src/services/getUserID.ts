import AsyncStorage from "@react-native-async-storage/async-storage";

async function getUserFromAsyncStorage() {
    const user = await AsyncStorage.getItem('@AjudaME:user');
    let objUser: { id: number, email: string } = user ? JSON.parse(user) : {};
    return objUser.id;
}
export default async function getUserID() {
    const userID = await getUserFromAsyncStorage();
    return userID;
}
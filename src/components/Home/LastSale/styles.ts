import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';


export const styles = StyleSheet.create({
    container: {
        padding: 4, width: '100%', borderWidth: 2, borderRadius: 8, borderColor: Colors.gray
    },
    header: {
        height: 32, paddingHorizontal: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    time: {
        marginLeft: 'auto', marginRight: 16, fontWeight: '300', fontSize: 16
    }
})
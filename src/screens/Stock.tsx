import { StyleSheet, Text, View } from 'react-native';


export default function Stock() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

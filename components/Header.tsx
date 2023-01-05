import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Image
            source={require('../assets/icons/menu-icon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/icons/sales-icon.png')}
          />
          <Text style={styles.textButton}>
            Vendas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/icons/products-icon.png')}
          />
          <Text style={styles.textButton}>
            Produtos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/icons/stock-icon.png')}
          />
          <Text style={styles.textButton}>
            Estoque
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE'
  },
  menuButton: {
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#45C567',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  textButton: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 10,
  }
});

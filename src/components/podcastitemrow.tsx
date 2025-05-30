
import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ItemRow = ({ title, date, time, coins }: { title: string; date: string; time: string; coins: string }) => (
  <View style={styles.itemRow}>
    <View>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemMeta}>{date}   •   {time}</Text>
    </View>
    <View style={styles.itemRight}>
      <Text style={styles.itemCoins}>{coins}</Text>
      <Ionicons name="restaurant-outline" size={20} color="#888" />
    </View>
  </View>
);
export default function podcastitemrow() {
  return (
 <View style={styles.section}>
        <ItemRow title="Crispy Calamari" date="24 July" time="10.00 AM" coins="12,560" />
        <ItemRow title="Teatro Cubano" date="26 July" time="12.00 PM" coins="10,560" />
      </View>
  );
}

const styles = StyleSheet.create({
   section: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
   itemRow: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
    itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemMeta: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemCoins: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 4,
  },
});

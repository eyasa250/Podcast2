import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
};

<LineChart
  data={data}
  width={screenWidth - 20}
  height={220}
  chartConfig={{
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  }}
  style={{ marginVertical: 8, borderRadius: 16 }}
/>;

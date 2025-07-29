import { colors } from "@/core/theme";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

interface PieDataItem {
  name: string;
  value: number;
}

interface PieChartComponentProps {
  title?: string;
  data: PieDataItem[];
}


export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  title = "Répartition des écoutes par catégorie",
  data,
}) => {
  if (!data || data.length === 0) {
    return <Text style={{ textAlign: "center", marginVertical: 12 }}>Aucune donnée disponible</Text>;
  }

  const screenWidth = Dimensions.get("window").width;
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  // Transformation
  const pieData = data.map((item, index) => ({
    name: item.name,
    population: item.value,        // clé attendue : population
    color: COLORS[index % COLORS.length],
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{title}</Text>
      <PieChart
        data={pieData}                 // <- ici on passe pieData transformé
        width={screenWidth - 32}       // marge padding à gérer
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
};


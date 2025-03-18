import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const PremiumLayout =()=> {
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index"
            options={{headerShown:false}}/>
        </Stack>
    </View>
}
export default PremiumLayout
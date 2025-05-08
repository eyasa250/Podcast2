import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const podcastLayout =()=> {
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" 
             options={{headerShown:false}}/>
                   <Stack.Screen name="create" options={{ headerShown: false }} />

        </Stack>
    </View>
}
export default podcastLayout
import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const libraryLayout =()=> {
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" 
             options={{headerShown:false}}/>
            <Stack.Screen name="episodeListScreen" options={{ headerShown: false }} />
            <Stack.Screen name="podcastListScreen" options={{ headerShown: false }} />

         
        </Stack>
    </View>
}
export default libraryLayout
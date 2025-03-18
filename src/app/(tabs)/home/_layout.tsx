import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useSearchBar } from "@/hooks/useSearchBar";

const HomeLayout = () => {

    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen 
                    name="index"
                    options={{headerShown:false}}
                />
            </Stack>
        </View>
    );
};

export default HomeLayout;

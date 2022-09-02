import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screens from "../config/Screens";
import AnimeList from "../screens/AnimeList";
import AnimeDetails from "../screens/AnimeDetails";


const Stack = createNativeStackNavigator()

const AppNavigation = () => (
    <Stack.Navigator screenOptions={{
        headerLargeTitle: true
    }}>
        <Stack.Screen options={{title: 'Anime List'}} name={Screens.ANIME_LIST} component={AnimeList}/>
        <Stack.Screen name={Screens.ANIME_DETAILS} component={AnimeDetails}/>
    </Stack.Navigator>
)

export default AppNavigation

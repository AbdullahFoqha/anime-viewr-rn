import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigations/AppNavigation";
import { Provider } from "react-redux";
import store from "./src/store/configureStore";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigation/>
            </NavigationContainer>
        </Provider>
    );
}

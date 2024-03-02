
import { Provider } from "react-redux";
import store from "./store";

import { HomeLayout } from "./components/home-layout";
const App = () => {
  return (
    <Provider store={store}>
       <HomeLayout /> 
    </Provider>
  );
};
export default App;
import MainRouter from "./components/MainRouter";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Store";
import { GetUserDataAPI } from "./Utils/APIs";

function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}

export default App;

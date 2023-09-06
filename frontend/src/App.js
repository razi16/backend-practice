import logo from "./logo.svg";
import "./App.css";
import Main from "./layout/Main";
import LoginContext from "./components/LoginContext";

function App() {
  return (
    <LoginContext>
      <Main />
    </LoginContext>
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Router>
          <Switch>
            <Route path="/" exact component={Home}/>
          </Switch>  
        </Router>
      </header>
    </div>
  );
}

export default App;

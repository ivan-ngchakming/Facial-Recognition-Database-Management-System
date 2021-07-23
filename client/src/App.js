import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import FacialRecognition from "./pages/FacialRecognition";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavBar>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/facial-recognition" exact component={FacialRecognition} />
            </Switch> 
          </NavBar> 
        </Router>
      </header>
    </div>
  );
}

export default App;

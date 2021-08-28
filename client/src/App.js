import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import FacialRecognition from "./pages/FacialRecognition";
import Images from "./pages/Images";
import createHistory from 'history/createBrowserHistory';

const history = createHistory({forceRefresh:true});   

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}>
          <NavBar>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/facial-recognition" exact component={FacialRecognition} />
              <Route path="/images" exact component={Images} />
            </Switch> 
          </NavBar> 
        </Router>
      </header>
    </div>
  );
}

export default App;

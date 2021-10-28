import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/nav/NavBar';
import FacialRecognition from './pages/FacialRecognition';
import Images from './pages/Images';
import BatchRecTasks from './pages/tasks/Tasks';
import Profiles from './pages/profiles/Profiles';
import ProfileDetails from './pages/ProfileDetails';
import Create from './pages/tasks/Create';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavBar>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/facial-recognition"
                exact
                component={FacialRecognition}
              />
              <Route path="/images" exact component={Images} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/profile" exact component={ProfileDetails} />
              <Route path="/tasks" exact component={BatchRecTasks} />
              <Route path="/tasks/create" exact component={Create} />
            </Switch>
          </NavBar>
        </Router>
      </header>
    </div>
  );
}

export default App;

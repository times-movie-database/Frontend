import MovieForm from './components/MovieForm';
import HomeScreen from './components/HomeScreen'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
      <Switch>
          <Route exact path="/movie/id/edit">
          </Route>
          <Route exact path="/movie/add">
            <MovieForm />
          </Route>
          <Route path="/">
            <HomeScreen/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;

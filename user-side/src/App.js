import MovieForm from './components/MovieForm';
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
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;

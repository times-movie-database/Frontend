import MovieForm from './components/MovieForm';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
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
        
      <Route path="/" exact>
            <HomeScreen/>
          </Route>
          <Route exact path="/movie/id/edit">
          </Route>
          <Route exact path="/movie/add">
            <MovieForm />
          </Route>
          <Route path="/search/keyword">
            <SearchScreen/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}


export default App;

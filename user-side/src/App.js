import MovieForm from './components/MovieForm';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import ErrorBoundary from './components/ErrorBoundary'
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
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          </Route>
          
          <Route exact path="/movie/id/edit">
          </Route>

          <Route exact path="/movie/add">
            <ErrorBoundary>
              <MovieForm />
            </ErrorBoundary>
          </Route>

          <Route path="/search/keyword">
            <ErrorBoundary>
              <SearchScreen />
            </ErrorBoundary>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}


export default App;

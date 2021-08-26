import MovieForm from './components/MovieForm';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EmptySearchScreen from './components/EmptySearchScreen';
import MovieDetails from './components/MovieDetails';
import NoPageFound from './components/NoPageFound';

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

          <Route exact path="/movie/edit/:id">
            <ErrorBoundary>
              <MovieForm isEdit={true}/>
            </ErrorBoundary>

          </Route>

          <Route exact path="/movie/add">
            <ErrorBoundary>
              <MovieForm />
            </ErrorBoundary>
          </Route>
          <Route exact path="/search/">
            <ErrorBoundary>
            <Header searchBar="yes" addButton="yes" />
            <EmptySearchScreen/>
            </ErrorBoundary>
          </Route>
          <Route exact path="/search/:searchKeyword">
            <ErrorBoundary>
              <SearchScreen />
            </ErrorBoundary>
          </Route>
          <Route path="/movie/:id">
            <ErrorBoundary>
              
              < MovieDetails />
              
            </ErrorBoundary>
          </Route>
          <Route component={NoPageFound} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;

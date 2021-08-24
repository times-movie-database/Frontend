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
import {lazy,Suspense } from "react";
import EmptySearchScreen from './components/EmptySearchScreen';
const MovieDetails=lazy(()=>import ('./components/MovieDetails'));
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
              <Suspense fallback={<h1>Loading....</h1>}>
              < MovieDetails />
              </Suspense>
            </ErrorBoundary>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}


export default App;

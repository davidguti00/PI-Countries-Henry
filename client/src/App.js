
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route path ='/activity/' component={CreateActivity}/>
          <Route path ='/details' component={Details}/>
          <Route path ='/home/' component={Home}/>
          <Route path ='/' component={LandingPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
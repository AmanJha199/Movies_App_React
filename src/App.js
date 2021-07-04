import './App.css';
import Movies from './Components/Movies';
import Home from './Components/Home';
import About from './Components/About';
import Nav from '../src/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        
        <Route path='/' exact component={Home} />
        {/* <Movies></Movies> */}
        <Route path='/movies' component={Movies} />
        <Route path='/about' component={About} />

      </Switch>
    </Router>
  );
}

export default App;

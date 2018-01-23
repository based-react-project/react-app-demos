import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link }  from 'react-router-dom'
import './assets/css/index.css';
import Home from './modules/Home';
import CommentApp from './modules/comment/CommentApp';
import About from './modules/About';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router>
    <div>
      <ul className='routeList'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/CommentApp">CommentApp</Link></li> 
      </ul>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/CommentApp" component={CommentApp}/>
    </div>
  </Router>
),document.getElementById('root'));
registerServiceWorker();

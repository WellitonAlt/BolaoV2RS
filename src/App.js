
import React, { Component } from 'react';
import Cabecalho from './pages/Cabecalho';
import Home from './pages/Home';
import PalpiteForm from './pages/PalpiteForm';
import VerPalpites from './pages/VerPalpites';
import Resultado from './pages/Resultado';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
 render() {
   return (
     <Router>
       <div>
         <Cabecalho />
         <div id="holder">
           <div id="body" className="container main-container">
             <Route exact path="/" component={Home} />
             <Route path="/palpiteForm" component={PalpiteForm} />
             <Route path="/verPalpites" component={VerPalpites} />
             <Route path="/resultado" component={Resultado} />
           </div>
         </div>
       </div>
     </Router>
   );
 }
}

export default App;
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

import { Component } from 'react';

class  App extends Component {
  
  render(){
  return (
    <BrowserRouter>
    <div >
        <Main/>
    </div>
    </BrowserRouter>
  );
}
}
export default App;

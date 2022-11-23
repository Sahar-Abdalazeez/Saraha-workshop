import Navbar from "./screens/Navbar";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import {Route,Routes} from 'react-router-dom';
//TODO: 'single page application part ' sujood add the route and router 'single page application aprt '
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element ={<Home/>}></Route>
        <Route path='/register' element ={  <Register />}></Route>
        <Route path='/login' element ={<Login/>}></Route>
        <Route path='*' element ={<NotFound/>}></Route>


      </Routes>
    
    
    </div>
  );
}

export default App;

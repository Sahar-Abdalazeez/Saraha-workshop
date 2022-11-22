import Navbar from "./screens/Navbar";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
//TODO: 'single page application part ' sujood add the route and router 'single page application aprt '
function App() {
  return (
    <div className="App">
      <Navbar />
      <Register />
      {/* <Home /> */}
      {/* TODO: Route with screens  */}
    </div>
  );
}

export default App;

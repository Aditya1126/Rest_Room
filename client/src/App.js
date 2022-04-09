import {
  BrowserRouter ,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar'
import HomeScreen from './screens/HomeScreens'

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeScreen/>} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;

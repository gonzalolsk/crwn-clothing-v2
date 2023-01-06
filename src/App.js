import Home from './routes/home/home.component.jsx'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component.jsx';
import Authentication from './routes/authentication/authentication.component.jsx';


const Shop = () => ( 
  <div>
    <div>
      <h1>I´m the Shop</h1>
    </div>
    <Outlet />
  </div>
)


const App = () => { 

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;

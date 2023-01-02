import Home from './routes/home/home.component.jsx'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component.jsx';
import SignIn from './routes/sign-in/sign-in.component.jsx';



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
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;

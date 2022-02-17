import './App.css'
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/login"
import Register from "./components/register/register"
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {

  const [ user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(localStorage.getItem("MyUser"))
  }, [])
  

  const updateUser = (user) => {
    localStorage.setItem("MyUser",JSON.stringify(user))
    setLoginUser(user);
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' element={ user && user._id ? <Homepage updateUser={updateUser}/> : <Login updateUser={updateUser}/>}/>
          <Route exact path='/login' element={<Login updateUser={updateUser}/>}/>
          <Route exact path='/register' element={<Register/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
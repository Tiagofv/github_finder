import React, {
  useState,
  Fragment,
  useEffect
} from 'react';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/User';
import SpecificUser from './components/users/SpecificUser';
import Search from './components/search/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
const App = () =>  {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [repos, setRepos] = useState([])
  

  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  }
  
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading(false);
    setUser(res.data);

  }
  
  const getRepos = async  (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&lient_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading(false);
    setRepos(res.data)
    
  }
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    setAlert({msg, type});
    setTimeout( () => setAlert(null), 5000);
  }
    return ( 
    <Router>
    <div  className = "App" >
     <Navbar title="Github Finder" icon="fab fa-github"></Navbar>
     <div className="container">
       <Alert alert={alert}></Alert>
       <Switch>
         <Route  exact path="/" render={props =>(
           <Fragment>
             <Search searchUsers={searchUsers} 
       clearUsers={clearUsers} 
       showClear={users.length > 0 ? true : false }
       setAlert={showAlert}
       ></Search>
        <  Users loading={loading} users={users}></Users>
           </Fragment>
         )}></Route>
         <Route exact path="/about" component={About}></Route>
         <Route exact path="/user/:login" render={ (props) => (
           <SpecificUser {...props} getUser={getUser} user={user} loading={loading} getRepos={getRepos} repos={repos}></SpecificUser>
           )}>
         </Route>
       </Switch>
       
     </div>
      </div >
       </Router>
    );
}

export default App;
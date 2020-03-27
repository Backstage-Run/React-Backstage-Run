import React,{Component} from 'react';
import {HashRouter,Link,Route,Redirect,Switch} from 'react-router-dom'
import Loadable from './untils/loadable'
// import Login from './pages/Login/loadableLogin'
// import Admin from './pages/Admin'
import TokenModel from './components/tokenModel'
import User from './pages/User'
const Login = Loadable(()=>import('./pages/Login'))
const Admin = Loadable(()=>import('./pages/Admin'))
class App extends Component{
  render(){
    return(
      <HashRouter>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" render={()=>{
            return(
              <Admin>
                  <Route path="/admin/user" component={User}></Route>
              </Admin>
            )
          }}></Route>
           <TokenModel></TokenModel>
      </HashRouter>
    )
  }
}

export default App;

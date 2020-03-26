import React,{Component} from 'react';
import {HashRouter,Link,Route,Redirect,Switch} from 'react-router-dom'
import Loadable from './untils/loadable'
// import Login from './pages/Login/loadableLogin'
// import Admin from './pages/Admin'
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
                
              </Admin>
            )
          }}></Route>

      </HashRouter>
    )
  }
}

export default App;

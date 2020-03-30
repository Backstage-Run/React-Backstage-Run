import React,{Component} from 'react';
import {HashRouter,Route} from 'react-router-dom'
import Loadable from './untils/loadable'
import TokenModel from './components/tokenModel'

import Banner from './pages/Banner'
import BannerAdd from './pages/BannerAdd'
const Index = Loadable(()=>import('./pages/Echarts'))
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
                  <Route path="/admin/home" component={Index}></Route>
                  <Route path="/admin/banner" component={Banner}></Route>
                  <Route path="/admin/banneradd" component={BannerAdd}></Route>
              </Admin>
            )
          }}></Route>
           <TokenModel></TokenModel>
      </HashRouter>
    )
  }
}

export default App;

import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import Loadable from './untils/loadable'
import TokenModel from './components/tokenModel'
import Banner from './pages/Banner'
import BannerAdd from './pages/BannerAdd'
import User from './pages/User'
const Index = Loadable(() => import('./pages/Echarts'))
const Login = Loadable(() => import('./pages/Login'))
const Admin = Loadable(() => import('./pages/Admin'))
const Goodslist = Loadable(() => import('./pages/Goods'))
const Goodsadd = Loadable(() => import('./pages/Goods/Goodsadd'))
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/login" component={Login}></Route>
        <Route path="/admin" render={() => {
          return (
            <Admin>
              <Route path="/admin/user" component={User}></Route>
              <Route path="/admin/goods" component={Goodslist}></Route>
              <Route path="/admin/goodsadd" component={Goodsadd}></Route>
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

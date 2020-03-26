import React from 'react'
import Loadable from 'react-loadable'
import { Spin} from 'antd';

function loadings(){
   return(
    <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',}}>
    <Spin tip="正在努力加载..." size="large">
         
    </Spin>
    </div>
   )
}
export default (components)=>{
   return Loadable({
       loader:components,
       loading:loadings
   })
}
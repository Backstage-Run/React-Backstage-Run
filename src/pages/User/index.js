import React,{Component} from 'react'
import {Card,Button,Table,Spin,Popconfirm, message,Modal,Input,notification} from 'antd'
class User extends Component{
    state = {
       dataSource:[
           {_id:'1223',
          userName:'admin'
        }
       ],
       columns:[
           {
            title:'id',
            dataIndex:'_id',
            key:'_id'
           },
           {
            title:'账号',
            dataIndex:'userName',
            key:'userName'
           },
           {
            title:'操作',
            key:'action',
            render:(record)=>{
                return(
                    <Popconfirm
                     title="是否确认删除?"
                     onConfirm={()=>{
                    //    this.del(record._id)
                       message.success("删除成功!")
                     }}
                     onCancel={()=>{
                        message.error('删除已取消!')
                     }}
                     okText="确认"
                     cancelText="取消"
                     >
                        <Button type="danger" size="small">删除</Button>
                    </Popconfirm>
                    
                )
            }
           },
       ],
       visible:false,
       spinning:false, 
    }
    handleOk=()=>{
        console.log('0k')
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };
    render(){
        let {dataSource,columns,spinning,visible} = this.state
        return(
            <div className="user">
                <Card title="管理员列表" extra={<Button type="success" icon="plus" onClick={()=>{
                    this.setState({visible:true})
                }}>添加管理员</Button>}>
                <Spin spinning={spinning}>
                   <Table dataSource={dataSource} columns={columns} rowKey='_id' pagination={{ pageSize: 5 }}></Table>
                </Spin>
                </Card>
                <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         UserName:<Input placeholder="管理员账号" /><br/><br/>
         PassWord:<Input placeholder="管理员密码" />
        </Modal>
            </div>
        )
    }
}
export default User
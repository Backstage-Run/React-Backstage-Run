import React, { Component, Fragment } from 'react'
import { Card, Button, Table, Spin, Popconfirm, message, Modal, Input, } from 'antd'
import data from '../../api/admin'
import Style from './index.module.less'
import upload from '../../api/upload'
import city from '../../api/getcity'
class User extends Component {
    state = {
        dataSource: [],
        city: [],
        local: [],
        columns: [
            {
                title: '_id',
                dataIndex: '_id',
                key: '_id'
            },
            {
                title: '头像',
                dataIndex: 'headimg',
                key: 'headimg',
                render(kind) {
                    return (<img style={{ borderRadius: '50%' }} width='80' height='80' src={kind} />)
                }
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => {
                    return (
                        <Popconfirm
                            title="是否确认删除?"
                            onConfirm={async () => {
                                let result = await data.del(record._id)
                                console.log(result)
                                if (result.code === 0) {
                                    this.renderadmin();
                                    message.success("删除成功!")
                                } else {
                                    message.danger("删除成功!")
                                }

                            }}
                            onCancel={() => {
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
            {
                title: '操作',
                key: 'modifiy',
                render: (record) => {
                    return (
                        <Button type="primary" size="small" onClick={this.modefiy.bind(this, record._id)}>修改</Button>
                    )
                }
            },
        ],
        id: "",
        hehe: "",
        loding: false,
        headimg: "",
        visible: false,
        modifiy: false,
        spinning: false,
        name: "",
        password: "",
        email: "",
        introduction: "",
        phone: "",
        address: "",
    }
    componentDidMount() {
        let result = city.getcity()
        result.then(res => {
            this.setState({ city: res })
        })
        let local = city.getlocal(110000)
        local.then(res => {
            this.setState({ local: res })
        })
        this.renderadmin();
    }
    renderadmin = async () => {
        let result = await data.list()
        this.setState({
            dataSource: result.info
        })
    }
    modefiy = async (_id) => {

        this.setState({ modifiy: true, id: _id })
        let result = await data.getadmin_one(_id);
        // console.log(result)
        let { name, headimg, password, email, introduction, phone, address } = result.data[0]
        this.setState({ name, headimg, password, email, introduction, phone, address })
    }
    upload = async () => {
        let file = this.refs.file.files[0]
        if (!file) { return message.error('请先选择一张图片') }
        let { size, type } = file
        let types = ['jpg', "jpeg", 'gif', 'png']
        if (size > 1000000) { return message.warning('图片超过1m') }
        if (types.indexOf(type.split('/')[1]) === -1) { return message.warning('只允许jpg.jpeg,gif,png四种类型') }
        this.setState({ loding: true })
        var formdata = new FormData();
        formdata.append('img', file)
        let result = await upload.img(formdata)
        if (result.code === 1) {
            this.setState({
                headimg: "http://47.110.58.129:1913" + result.path
            }, () => {
                this.setState({ loding: false })
                message.success('图片上传成功')

            })
        } else {
            message.warning('图片上传失败')
        }

    }
    handleOk = async () => {
        let file = this.refs.file.files[0]
        if (!file) { return message.error('请先上传图片') }
        let { headimg, name, password, email, introduction, phone, address } = this.state
        let arr = [{
            headimg, name, password, email, introduction, phone, address
        }]
        let result = await data.add(arr[0])
        if (result.code === 0) {
            message.success(result.msg)
            this.renderadmin();
            this.setState({
                visible: false,
            });
        } else {
            message.warning(result.msg)
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    getValue = (e) => {
        let id = e.target.value
        let local = city.getlocal(id)
        local.then(res => {
            this.setState({ local: res })
        })
        let hehe = this.refs.city
        this.setState({ hehe: this.state.city[hehe.selectedIndex].name })
    }
    modifiyCancel = () => {
        this.setState({ modifiy: false })
        this.setState({ name: "", headimg: "", password: "", email: "", introduction: "", phone: "", address: "" })
    }
    handlemodifiy = async () => {
        let { id, headimg, name, password, email, introduction, phone, address } = this.state
        let _id = id
        let arr = [{
            _id, headimg, name, password, email, introduction, phone, address
        }]
        let result = await data.updata(arr[0])
        if (result.code === 0) {
            message.success(result.msg)
            this.renderadmin();
            this.setState({
                modifiy: false,
            });
        } else {
            message.warning(result.msg)
        }
    }
    render() {
        let { dataSource, columns, modifiy, city, hehe, local, spinning, loding, visible, headimg, name, password, email, introduction, phone, address } = this.state
        return (
            <div className="user">
                <Card title="管理员列表" extra={<Button type="success" icon="plus" onClick={() => {
                    this.setState({ visible: true })
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
                    <Spin className={Style.loging} tip="图片上传中" spinning={loding} />
                    用户名:<Input placeholder="请输入" value={name} onChange={(e) => {
                        this.setState({ name: e.target.value })
                    }} /><br /><br />
                  密码:<Input type="password" placeholder="密码由6-18位大小写字母或数字组成" value={password} onChange={(e) => {
                        this.setState({ password: e.target.value })
                    }} /><br /><br />
                  邮箱:<Input placeholder="请输入" value={email} onChange={(e) => {
                        this.setState({ email: e.target.value })
                    }} /><br /><br />
                  个人介绍:<Input placeholder="请输入" value={introduction} onChange={(e) => {
                        this.setState({ introduction: e.target.value })
                    }} /><br /><br />
                  电话:<Input placeholder="请输入" value={phone} onChange={(e) => {
                        this.setState({ phone: e.target.value })
                    }} /><br /><br />
                  头像:<input type="file" ref="file" /> <Button onClick={this.upload} type="success">上传</Button> <br /><br />
                    <div>缩略图: <img className={Style.small_img} src={headimg} /></div><br />

                    地址：<select ref="city" onChange={(e) => this.getValue(e)}>
                        {city.slice(0, 30).map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <option value={item.id} >{item.name}</option>
                                </Fragment>
                            )
                        })}
                    </select>
                    <select onChange={(e) => {
                        this.setState({ address: hehe + e.target.value })
                    }}>
                        {local.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <option value={item.name} >{item.name}</option>
                                </Fragment>
                            )
                        })}
                    </select>
                </Modal>
                <Modal
                    title="修改信息"
                    visible={modifiy}
                    onOk={this.handlemodifiy}
                    onCancel={this.modifiyCancel}
                >
                    <Spin className={Style.loging} tip="图片上传中" spinning={loding} />
                    用户名:<Input placeholder="请输入" value={name} onChange={(e) => {
                        this.setState({ name: e.target.value })
                    }} /><br /><br />
                  密码:<Input type="password" placeholder="密码由6-18位大小写字母或数字组成" value={password} onChange={(e) => {
                        this.setState({ password: e.target.value })
                    }} /><br /><br />
                  邮箱:<Input placeholder="请输入" value={email} onChange={(e) => {
                        this.setState({ email: e.target.value })
                    }} /><br /><br />
                  个人介绍:<Input placeholder="请输入" value={introduction} onChange={(e) => {
                        this.setState({ introduction: e.target.value })
                    }} /><br /><br />
                  电话:<Input placeholder="请输入" value={phone} onChange={(e) => {
                        this.setState({ phone: e.target.value })
                    }} /><br /><br />
                  头像:<input type="file" ref="file" /> <Button onClick={this.upload} type="success">上传</Button> <br /><br />
                    <div>缩略图: <img className={Style.small_img} src={headimg} /></div><br />
                    地址：<select ref="city" onChange={(e) => this.getValue(e)}>
                        {city.slice(0, 30).map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <option value={item.id} >{item.name}</option>
                                </Fragment>
                            )
                        })}
                    </select>
                    <select onChange={(e) => {
                        this.setState({ address: hehe + e.target.value })
                    }}>
                        {local.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <option value={item.name} >{item.name}</option>
                                </Fragment>
                            )
                        })}
                    </select>
                </Modal>
            </div>
        )
    }
}
export default User
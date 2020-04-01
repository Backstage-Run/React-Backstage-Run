import React, { Component } from 'react';
import { Card, Button, Table, Spin, Popconfirm, message, Input, Modal } from 'antd'
import data from '../../api/goods'
import Style from './index.module.less'
import upload from '../../api/upload'
const { Search } = Input;
class Goodslist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            spinning: false,
            limit: 4,
            columns: [
                {
                    title: '商品id',
                    dataIndex: '_id',
                    key: '_id'
                },
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    width: 80,
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type'
                },
                {
                    width: 200,
                    title: '商品描述',
                    dataIndex: 'desc',
                    key: 'desc'
                },
                {
                    title: '价格',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '店铺',
                    dataIndex: 'goodsStore',
                    key: 'goodsStore'
                },
                {
                    title: '商品图片',
                    dataIndex: 'imgsrc',
                    key: 'imgsrc',
                    render(kind) {
                        return (<img alt="" width='80' height='80' src={kind} />)
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (record) => {
                        return (
                            <Popconfirm
                                title="是否确认删除?"
                                onConfirm={async () => {
                                    let result = await data.del(record._id);
                                    if (result.code === 0) {
                                        this.renderlist();
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
                            <Button type="primary" size="small" onClick={async () => {
                                this.setState({ modifiy: true })
                                let id = record._id
                                let result = await data.getgoods_one(id)
                                let { _id, type, desc, name, price, goodsStore, imgsrc } = result.data[0]
                                this.setState({ _id, type, desc, name, price, goodsStore, imgsrc })
                            }}>修改</Button>
                        )
                    }
                },
            ],
            modifiy: false,
            _id: "",
            name: "",
            type: "",
            desc: "",
            price: "",
            goodsStore: "",
            imgsrc: "",
            loding: false
        }
    }
    upload = async () => {
        let file = this.refs.file.files[0]
        if (!file) { return message.error('请先选择一张图片') }
        let { type } = file
        let types = ['jpg', "jpeg", 'gif', 'png']
        if (types.indexOf(type.split('/')[1]) === -1) { return message.warning('只允许jpg.jpeg,gif,png四种类型') }
        this.setState({ loding: true })
        var formdata = new FormData();
        formdata.append('img', file)
        let result = await upload.img(formdata)
        if (result.code === 1) {
            this.setState({
                imgsrc: "http://47.110.58.129:1913" + result.path
            }, () => {
                this.setState({ loding: false })
                message.success('图片上传成功')

            })
        } else {
            message.warning('图片上传失败')
        }

    }
    renderlist = async () => {
        let result = await data.list();
        this.setState({ dataSource: result.info })
    }
    componentDidMount() {
        this.renderlist()
    }
    modifiyCancel = () => {
        this.setState({ modifiy: false })
        this.setState({ name: "", headimg: "", password: "", email: "", introduction: "", phone: "", address: "" })
    }
    handlemodifiy = async () => {
        let { _id, type, desc, name, price, goodsStore, imgsrc } = this.state
        let newdata = {
            _id, type, desc, name, price, goodsStore, imgsrc
        }
        let result = await data.updata(newdata)
        if (result.code === 0) {
            message.success(result.msg)
            this.renderlist();
            this.setState({
                modifiy: false,
            });
        } else {
            message.warning(result.msg)
        }
    }
    render() {
        let { columns, spinning, modifiy, dataSource, limit, type, desc, name, price, goodsStore, loding, imgsrc } = this.state
        return (
            <div>
                <Search placeholder="请输入关键字" onSearch={async value => {
                    let all = await data.keyword(value)
                    if (all.data) {
                        this.setState({ dataSource: all.data.result })
                        message.success('查找成功')
                    } else {
                        message.warning('暂无数据')
                    }


                }} enterButton />
                <Card title="商品列表" >
                    <Spin spinning={spinning}>
                        <Table dataSource={dataSource} columns={columns} rowKey='_id' pagination={{ pageSize: limit }}></Table>
                    </Spin>
                    <Modal
                        title="修改信息"
                        visible={modifiy}
                        onOk={this.handlemodifiy}
                        onCancel={this.modifiyCancel}
                    >
                        <Spin className={Style.loging} tip="图片上传中" spinning={loding} />
                    商品名称:<Input placeholder="请输入" value={name} onChange={(e) => {
                            this.setState({ name: e.target.value })
                        }} /><br /><br />
                  商品类型:<Input value={type} onChange={(e) => {
                            this.setState({ type: e.target.value })
                        }} /><br /><br />
                    商品描述:<textarea rows="4" cols="30" defaultValue={desc} onChange={(e) => {
                            this.setState({ desc: e.target.value })
                        }}></textarea><br /><br />
                  商品价格:<Input placeholder="请输入" value={price} onChange={(e) => {
                            this.setState({ price: e.target.value })
                        }} /><br /><br />
                  商品店铺:<Input placeholder="请输入" value={goodsStore} onChange={(e) => {
                            this.setState({ goodsStore: e.target.value })
                        }} /><br /><br />
                  商品图片:<input type="file" ref="file" /> <Button onClick={this.upload} type="success">上传</Button> <br /><br />
                        <div>缩略图: <img alt="" className={Style.small_img} src={imgsrc} /></div><br />
                    </Modal>
                </Card>

            </div>
        );
    }
}

export default Goodslist;

export default [
    {
        key: '1',
        title: '首页',
        path: '/admin/home',
        icon: 'home'
    },
    {
        key: '2',
        title: '管理员列表',
        icon: 'user',
        children: [
            {
                key: '2-1',
                title: '管理员列表',
                icon: 'list',
                path: '/admin/user'
            }
        ]
    },
    {
        key: '3',
        title: '商品管理',
        icon: 'user',
        children: [
            {
                key: '3-1',
                title: '商品列表',
                icon: 'goods-list',
                path: '/admin/goods'
            },
            {
                key: '3-2',
                title: '添加商品',
                icon: 'goods-add',
                path: '/admin/goodsadd'
            }
        ]
    },
    {
        key:'4',
        title:'轮播图管理',
        icon:'banner',     
        path:'/admin/banner'
    },
]
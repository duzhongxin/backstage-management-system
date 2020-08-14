import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:5000'

// 1. 登录
export const checkLogin = (account, password) => axios.post('/users/checkLogin', {
    account,
    password
})

// 2. 添加账号
export const add = (account, password, userGroup) => axios.post('/users/add', {
    account,
    password,
    userGroup
})

// 3. 获取账号列表
export const list = (currentPage, pageSize) => axios.get('/users/list', {
    params: {
        currentPage,
        pageSize
    }
})

// 4. 删除账号
export const del = (id) => axios.get('/users/del', {
    params: {
        id
    }
})

// 5. 批量删除账号
export const batchdel = (ids) => axios.get('/users/batchdel', {
    params: {
        ids
    }
})

// 6. 修改账号
export const edit = (id, account, userGroup) => axios.post('/users/edit', {
    id,
    account,
    userGroup
})

// 7. 检查旧密码是否正确
export const checkoldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', {
    params: {
        oldPwd,
        id
    }
})

// 8. 修改密码
export const editpwd = (newPwd, id) => axios.post('/users/editpwd', {
    newPwd,
    id,
})

// 9. 获取账号（个人中心）信息
export const accountinfo = (id) => axios.get('users/accountinfo', {
    params: {
        id
    }
})

//10. 头像上传接口

// 11. 验证token是否过期
export const checktoken = (token) => axios.get('/users/checktoken', {
    params: {
        token
    }
})

//12. 添加分类
export const addcate = (cateName, state) => axios.post('/goods/addcate', {
    cateName,
    state,
})

// 13. 获取分类
export const catelist = (currentPage, pageSize) => axios.get('/goods/catelist', {
    params: {
        currentPage,
        pageSize
    }
})

// 14. 删除分类
export const delcate = (id) => axios.get('/goods/delcate', {
    params: {
        id
    }
})

//15. 修改分类
export const editcate = (id, cateName, state) => axios.post('/goods/editcate', {
    id,
    cateName,
    state,
})

//16. 查询所有分类名称
export const categories = () => axios.get('/goods/categories', {
    params: {}
})

// 17. 商品图片上传接口

// 18. 添加商品
export const goodsadd = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', {
    name,
    category,
    price,
    imgUrl,
    goodsDesc
})

// 19. 获取商品列表
export const goodslist = (currentPage, pageSize) => axios.get('/goods/list', {
    params: {
        currentPage,
        pageSize
    }
})

//20. 删除商品
export const goodsdel = (id) => axios.get('/goods/del', {
    params: {
        id
    }
})

// 21. 修改商品
export const goodsedit = (name, category, price, imgUrl, goodsDesc, id) => axios.post('/goods/edit', {
    name,
    category,
    price,
    imgUrl,
    goodsDesc,
    id
})


// 22. 获取订单列表(带查询功能)
export const orderlist = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/list', {
    params: {
        currentPage,
        pageSize,
        orderNo,
        consignee,
        phone,
        orderState,
        date
    }
})

// 23. 查询
export const search = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', {
    params: {
        currentPage,
        pageSize,
        orderNo,
        consignee,
        phone,
        orderState,
        date
    }
})

// 24. 获取订单详情
export const detail = (id) => axios.get('/order/detail', {
    params: {
        id
    }
})

//25. 修改订单
export const orderedit = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post('/order/edit', {
    id,
    orderNo,
    orderTime,
    phone,
    consignee,
    deliverAddress,
    deliveryTime,
    remarks,
    orderAmount,
    orderState
})

// 26. 获取店铺详情
export const info = () => axios.get('shop/info', {
    params: {}
})

// 27. 店铺图片上传接口

// 28. 店铺内容修改
export const shopedit = (id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics) => axios.post('/shop/edit', {
    id,
    name,
    bulletin,
    avatar,
    deliveryPrice,
    deliveryTime,
    description,
    score,
    sellCount,
    supports,
    date,
    pics
})


// 29. 首页报表接口
export const totaldata = () => axios.get('/order/totaldata', {
    params: {}
})

// 30. 订单报表接口
export const ordertotal = (date) => axios.get('/order/ordertotal', {
    params: {
        date
    }
})
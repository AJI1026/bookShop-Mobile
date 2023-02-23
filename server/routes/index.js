const express = require('express');
const router = express.Router();
const connection = require('../db/sql');
const User = require('../db/user');
// 引入短信验证
const QcloudSms = require("qcloudsms_js");
let jwt = require("jsonwebtoken");
// 引入支付宝配置文件
const alipaySdk = require("../db/alipay");
const AlipayFormData = require("alipay-sdk/lib/form").default;
// 引入axios
const axios = require("axios");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// 支付状态
router.post('/api/successPayment', function (req, res) {
  // token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  // 订单号
  let out_trade_no = req.body.out_trade_no;
  let trade_no = req.body.trade_no;
  // 支付包配置
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get');
  // 支付时的信息
  formData.addField('bizContent', JSON.stringify({
    out_trade_no,
    trade_no
  }));
  // 返回promise
  const result = alipaySdk.exec(
      'alipay.trade.query',
      {},
      {formData: formData},
  );
  // 后端请求支付宝
  result.then(resData => {
    axios({
      method: 'GET',
      url: resData
    }).then(data => {
      let responseCode = data.data.alipay_trade_query_response;
      if(responseCode.code === '10000') {
        switch (responseCode.trade_status) {
          case 'WAIT_BUYER_PAY':
            res.send({
              data: {
                code: 0,
                data: {
                  message: '支付宝有交易记录，没付款'
                }
              }
            })
            break;
          case 'TRADE_FINISHED':
            res.send({
              data: {
                code: 0,
                data: {
                  message: '交易结束，不可退款'
                }
              }
            })
            break;
          case 'TRADE_SUCCESS':
            res.send({
              data: {
                code: 0,
                data: {
                  message: '交易完成'
                }
              }
            })
            break;
          case 'TRADE_CLOSED':
            res.send({
              data: {
                code: 0,
                data: {
                  message: '交易关闭'
                }
              }
            })
            break;
        }
      } else if(responseCode.code === '40004'){
        res.send({
          code: 4,
          message: '交易不存在'
        })
      }
    }).catch (err => {
      res.send({
        data: {
          code: 500,
          message: '交易失败',
          err,
        }
      })
    })
  })
})
// 发起支付
router.post('/api/payment', function (req, res) {
  // 订单号
  let order_id = req.body.order_id;
  // 商品总价
  let price = req.body.price;
  // 购买商品的名称
  var name = req.body.name;
  // 开始对接支付宝api
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get');
  // 支付时的信息
  formData.addField('bizContent', JSON.stringify({
    outTradeNo: order_id, // 订单号
    productCode: 'FAST_INSTANT_TRADE_PAY', // 写死的
    totalAmount: price, // 价格
    subject: name, // 商品名称
  }));
  // 支付成功或者失败跳转的链接
  formData.addField('returnUrl', 'http://localhost:8080/#/payment');
  // 返回promise
  const result = alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      {formData: formData},
  );
  // 对接支付宝成功，支付宝返回的数据
  result.then(resp => {
    res.send({
      data: {
        code: 200,
        success: true,
        message: '支付中',
        paymentUrl: resp
      }
    })
  })
})
// 修改订单状态
router.post('/api/submitOrder', function (req, res) {
  // token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  // 订单号
  let orderId = req.body.order_id;
  // 购物车选中的商品id
  let shopArr = req.body.shopArr;
  // 查询用户
  connection.query(`select * from user_list where tel=${tokenObj.tel}`, function (error, result) {
    if(error) throw error;
    // 用户id
    let UID = result[0].id;
    connection.query(`select * from order_list where uid=${UID} and order_id=${orderId}`, function (error, result) {
      if(error) throw error;
      // 订单数据的id
      let id = result[0].id;
      // 修改订单状态
      connection.query(`update order_list set order_status=replace(order_status,"1","2") where id=${id}`, function (error, result) {
        if(error) throw error;
        console.log(result);
        // 购物车数据删除
        shopArr.forEach(v => {
          connection.query(`delete from cart_list where id=${v}`, function (error, result) {
            console.log(result);
            if(error) throw error;
          })
        })
        res.send({
          data: {
            code: 200,
            success: true,
            message: "提交订单成功"
          }
        })
      })
    })
  })
})
// 查询订单
router.post('/api/getOrder', function(req, res) {
  let order_id = req.body.order_id;
  connection.query(`select * from order_list where order_id=${order_id}`, function (error, result) {
    if (error) throw error;
    res.send({
      data: {
        code: 200,
        success: true,
        message: '订单数据',
        data: result
      }
    })
  })
})
// 生成订单号
router.post('/api/addOrder', function (req, res) {
  // token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  // 前端给后端的数据
  let goodsArr = req.body.arr;
  // 生成订单号order_id，规则：时间戳 + 6位随机数
  function setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  }
  function randomNumber() {
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    month = setTimeDateFmt(month);
    day = setTimeDateFmt(day);
    hour = setTimeDateFmt(hour);
    minutes = setTimeDateFmt(minutes);
    seconds = setTimeDateFmt(seconds);
    let orderCode = now.getFullYear().toString() + month.toString() + day+ hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
    return orderCode;
  }
  /*
  * 未支付：1
  * 待支付：2
  * 支付成功：3
  * 支付失败：4 ｜ 0
  * */
  // 商品列表名称
  let goodsName = [];
  // 订单总金额
  let goodsPrice = 0;
  // 订单商品总数量
  let goodsNum = 0;
  // 订单号
  let orderId = randomNumber();

  goodsArr.forEach(v => {
    goodsName.push(v.goods_name);
    goodsPrice += v.goods_price * v.goods_num;
    goodsNum += v.goods_num;
  })

  // 查询用户
  connection.query(`select * from user_list where tel=${tokenObj.tel}`, function (error, result) {
    if(error) throw error;
    // 用户id
    let UID = result[0].id;
    // 存储订单数据
    connection.query(`insert into order_list (uid, order_id, goods_name, goods_price, goods_num, order_status) values ("${UID}","${orderId}","${goodsName}","${goodsPrice}","${goodsNum}","1")`, function (error, result) {
      console.log(result);
      if(error) throw error;
      // 返回订单号
      connection.query(`select * from order_list where uid=${UID} and order_id=${orderId}`, function (error, result) {
        if(error) throw error;
        res.send({
          data: {
            code: 200,
            success: true,
            message: '订单数据来啰',
            data: result
          }
        })
      })
    })
  })
})
// 删除地址
router.post('/api/deleteAddress', function (req, res) {
  let id = req.body.id;
  connection.query(`delete from address_list where id=${id}`, function (error, result) {
    if(error) throw error;
    console.log(result);
    res.send({
      data: {
        code: 200,
        success: true,
        message: '删除成功'
      }
    })
  })
})
// 修改地址信息
router.post(`/api/updateAddress`, function (req, res) {
  // token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  // 前端给后端的地址数据
  let body = req.body;
  let [id, name, tel, province, city, county, addressDetail, isDefault, areaCode] = [
    body.id,
    body.name,
    body.tel,
    body.province,
    body.city,
    body.county,
    body.addressDetail,
    body.isDefault,
    body.areaCode,
  ];
  console.log(id);
  // 查询用户
  connection.query(`select * from user_list where tel=${tokenObj.tel}`, function (error, result) {
    if(error) throw error;
    // 用户id
    let UID = result[0].id;
    // 查询之前有没有默认收货地址
    connection.query(`select * from address_list where uid=${UID} and isDefault=${isDefault}`, function (error, result) {
      if(result.length > 0) {
        if(error) throw error;
        let addressId = result[0].id;
        connection.query(`update address_list set isDefault = replace(isDefault, "1", "0") where id=${addressId}`, function (error, result) {
          if(error) throw error;
          console.log(result);
          let updateSql = `update address_list set uid = ?, name = ?, tel = ?, province = ?, city = ?, county = ?, addressDetail = ?, isDefault = ?, areaCode = ? where id=${id}`;
          connection.query(updateSql,[UID, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (error, result) {
            if(error) throw error;
            console.log(result);
            res.send({
              data: {
                code: 200,
                success: true,
                message: '修改成功',
              }
            })
          })
        })
      } else {
        // 直接修改数据
        let updateSql = `update address_list set uid = ?, name = ?, tel = ?, province = ?, city = ?, county = ?, addressDetail = ?, isDefault = ?, areaCode = ? where id=${id}`;
        connection.query(updateSql,[UID, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (error, result) {
          if(error) throw error;
          console.log(result);
          res.send({
            data: {
              code: 200,
              success: true,
              message: '修改成功',
            }
          })
        })
      }
    })
  })
})
// 查询搜获地址
router.post('/api/getAddress', function (req, res) {
  // token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);

  // 查询用户
  connection.query(`select * from user_list where tel=${tokenObj.tel}`, function (error, result) {
    if(error) throw error;
    console.log(result);
    // 用户id
    let UID = result[0].id;
    connection.query(`select * from address_list where uid=${UID}`, function (error, result) {
      if(error) throw error;
      res.send({
        data: {
          code: 200,
          success: true,
          message: '查询成功',
          data: result
        }
      })
    })
  })
})
// 增加新的收货地址
router.post('/api/newAddress', function (req, res) {
  let body = req.body;
  // token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  // 前端发送的地址数据
  let [name, tel, province, city, county, addressDetail, isDefault, areaCode] = [
    body.name,
    body.tel,
    body.province,
    body.city,
    body.county,
    body.addressDetail,
    body.isDefault,
    body.areaCode,
  ]
  // 查询用户
  connection.query(`select * from user_list where tel=${tokenObj.tel}`, function (error, result) {
    if(error) throw error;
    // 用户id
    let UID = result[0].id;
    if(Number(isDefault) !== 1) {
      // 增加一条地址数据
      connection.query(`insert into address_list (uid, name, tel, province, city, county, addressDetail, isDefault, areaCode) values ("${UID}","${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`, function (error, result) {
        console.log(result)
        if (error) throw error;
        res.send({
          data: {
            code: 200,
            success: true,
            message: '新增地址成功'
          }
        })
      })
    } else {
      connection.query(`select * from address_list where uid=${UID} and isDefault=${isDefault}`, function (error, result) {
        if(error) throw error;
        if(result.length > 0) {
          let addressId = result[0].id;
          connection.query(`update address_list set isDefault= replace(isDefault, '1', '0') where id=${addressId}`, function(error, result) {
            if(error) throw error;
            console.log(result)
            // 增加一条地址数据
            connection.query(`insert into address_list (uid, name, tel, province, city, county, addressDetail, isDefault) values ("${UID}","${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}")`, function (error, result) {
              console.log(result)
              if (error) throw error;
              res.send({
                data: {
                  code: 200,
                  success: true,
                  message: '新增地址成功'
                }
              })
            })
          })
        } else {
          // 增加一条地址数据
          connection.query(`insert into address_list (uid, name, tel, province, city, county, addressDetail, isDefault, areaCode) values ("${UID}","${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`, function (error, result) {
            console.log(result)
            if (error) throw error;
            res.send({
              data: {
                code: 200,
                success: true,
                message: '新增地址成功'
              }
            })
          })
        }
      })
    }
  })
})
// 修改购物车商品数量
router.post('/api/updateNum', function(req, res) {
  let id = req.body.id;
  let changeNum = req.body.num;
  connection.query(`select * from cart_list where id=${id}`, function (error, result) {
    if(error) throw error;
    // 原来的数量
    let originNum = result[0].goods_num;
    connection.query(`update cart_list set goods_num = replace(goods_num,${originNum},${changeNum}) where id=${id}`, function (error, result) {
      if(error) throw error;
      console.log(result)
      res.send({
        data: {
          code: 200,
          success: true,
          message: '修改成功'
        }
      })
    })
  })
})
// 删除购物车数据
router.post('/api/deleteCart', function (req, res) {
  let arrId = req.body.arrId;
  for(let i = 0; i < arrId.length; i++) {
    connection.query(`delete from cart_list where id=${arrId[i]}`, function (error, result) {
      console.log(result);
      if(error) throw error;
      res.send({
        data: {
          code: 200,
          success: true,
          message: '删除成功',
        }
      })
    })
  }
})
// 获取购物车数据
router.post('/api/cartList', function (req, res) {
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  // 查询用户是否存在
  connection.query(`select * from user_list where tel=${tokenObj.tel}`, function (error, result) {
    if(error) throw error;
    // 用户id
    let UID = result[0].id;
    connection.query(`select * from cart_list where uid=${UID}`, function (error, result) {
      if(error) throw error;
      res.send({
        data: {
          code: 200,
          success: true,
          message: "查询成功",
          data: {
            result
          }
        }
      })
    })
  })
})
// 加入购物车
router.post('/api/addCart', function (req, res) {
  // 前端返回的参数
  let goodsId = req.body.goodsId;
  // token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  // 查询用户
  connection.query(`select * from user_list where tel = ${tokenObj.tel}`, function (error, result) {
    // 用户ID
    let UID = result[0].id;
    // 查询商品
    connection.query(`select * from goods_list where id=${goodsId}`, function (error, result) {
      let goodsName = result[0].name;
      let goodsPrice = result[0].price;
      let goodsImgUrl = result[0].imgUrl;
      // 查询当前用户在之前是否添加过本商品
      connection.query(`select * from cart_list where uid=${UID} and goods_id=${goodsId}`, function (error, result) {
        if(error) throw error;
        // 用户之前添加过该商品
        if(result.length > 0) {
          let num = result[0].goods_num;
          connection.query(`update cart_list set goods_num = replace(goods_num, ${num}, ${parseInt(num) + 1}) where id = ${result[0].id}`, function (error, result) {
            console.log(result)
            if(error) throw error;
            res.send({
              data: {
                code:200,
                success: true,
                message: '添加成功'
              }
            })
          })
        } else {
          connection.query(`insert into cart_list (uid, goods_id, goods_name, goods_price, goods_num, goods_imgUrl) values ("${UID}", "${goodsId}", "${goodsName}", "${goodsPrice}", "1", "${goodsImgUrl}")`, function (error, result) {
            if(error) throw error;
            console.log(result);
            res.send({
              data: {
                code: 200,
                success: true,
                message: '添加成功'
              }
            })
          })
        }
      })
    })
  })
})
// 查询商品数据接口
router.get('/api/goods/shopList', function (req, res) {
  let [searchName, sortName] = Object.keys(req.query);
  let [name, sort] = Object.values(req.query)
  console.log(searchName, name, sortName, sort)
  connection.query('select * from goods_list where name like "%'+name+'%" order by '+sortName+' '+sort+' ', function (error,result) {
    res.send({
      code:0,
      data:result
    })
  })
});
// 根据id查询数据
router.get('/api/goods/id', function (req, res) {
  let id = req.query.id;
  connection.query('select * from goods_list where id = '+id+'', function (error, result) {
    if(error) throw error;
    res.json ({
      code: 0,
      data : result[0]
    })
  })
})
// 用户登录接口
router.post('/api/login', function (req, res) {
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd
  };
  // 查询用户手机是否存在
  connection.query(User.queryUserTel(params), function (error, result) {
    // 手机号存在
    if(result.length > 0) {
      connection.query(User.queryUserPwd(params), function (error, result) {
        if(result.length > 0) {
          // 手机和密码都存在
          res.send({
            code : 200,
            data: {
              success: true,
              message: '登录成功',
              data: result[0]
            }
          })
        } else {
          res.send({
            code : 302,
            data: {
              success: false,
              message: '密码不正确'
            }
          })
        }
      })
    } else {
      res.send({
        code : 301,
        data: {
          success: false,
          message: '手机号不存在'
        }
      })
    }
  })
})
// 增加一个用户
router.post('/api/addUser', function (req, res) {
  let params = {
    userTel: req.body.phone
  }
  // 查询用户是否存在
  connection.query(User.queryUserTel(params), function (err, result) {
    if(err) throw err;
    // 用户存在
    if(result.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
          message: '登录成功',
          data: result[0]
        }
      })
    } else {
      // 不存在，新增
      connection.query(User.insertData(params), function() {
        connection.query(User.queryUserTel(params), function (e, r) {
          res.send({
            code: 200,
            data: {
              success: true,
              message: '创建成功',
              data: r[0]
            }
          })
        })
      })
    }
  })
})
// 找回密码，查询用户是否存在
router.post('/api/searchUser', function (req, res) {
  let params = {
    userTel: req.body.phone
  }
  // 查询用户
  connection.query(User.queryUserTel(params), function (error, result) {
    if(error) throw error;
    if(result.length > 0) {
      res.send({
        code : 200,
        data: {
          success : true
        }
      })
    } else {
      res.send({
        code : 0,
        data: {
          success: false,
          message: '用户不存在'
        }
      })
    }
  })
})
// 修改密码
router.post('/api/reset', function (req, res) {
  let params = {
    userTel: req.body.phone,
    userPwd: req.body.pwd,
  }
  // 查询用户是否存在
  connection.query(User.queryUserTel(params), function (error, result) {
    if(error) throw error;
    // 某一条记录id
    let id = result[0].id;
    let pwd = result[0].pwd;
    connection.query(`update user_list set pwd = replace(pwd, '${pwd}','${params.userPwd}') where id = ${id}`, function () {
      res.send({
        code:200,
        data:{
          success: true,
          message: '密码修改成功'
        }
      })
    })
  })
})
// 注册
router.post('/api/register', function (req, res) {
  let params = {
    userTel: req.body.phone,
    userPwd: req.body.pwd,
  }
  // 查询用户是否存在
  connection.query(User.queryUserTel(params), function (err, result) {
    if(err) throw err;
    // 用户存在
    if(result.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
          message: '登录成功',
          data: result[0]
        }
      })
    } else {
      // 不存在，新增
      connection.query(User.insertData(params), function(err, result) {
        if(err) throw err;
        console.log(result)
        connection.query(User.queryUserTel(params), function (e, r) {
          res.send({
            code: 200,
            data: {
              success: true,
              message: '创建成功',
              data: r[0]
            }
          })
        })
      })
    }
  })
})
// 短信验证码
router.post('/api/code', function(req, res) {
  // 接收前端发送的手机号
  let tel = req.body.phone;

  // 短信应用SDK AppID
  let appid = 1400796639;  // SDK AppID是1400开头

  // 短信应用SDK AppKey
  let appkey = "b437e8196245069d528276de7b44da35";

  // 需要发送短信的手机号码
  let phoneNumbers = [tel];

  // 短信模板ID，需要在短信应用中申请
  let templateId = 1707218;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

  // 签名
  let smsSign = "阿集的小屋";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

  // 实例化QcloudSms
  let qcloudsms = QcloudSms(appid, appkey);

  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
  function callback(err, ress) {
    if (err) {
      console.log("err: ", err);
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }

  let ssender = qcloudsms.SmsSingleSender();
  // 往手机上发送的短信
  let params = [Math.floor(Math.random()*(9999-1000)) + 1000];
  ssender.sendWithParam(86, phoneNumbers[0], templateId,
      params, smsSign, "", "", callback);  // 签名参数不能为空串

})
// 分类接口
router.get('/api/goods/list', function (req, res) {
  res.send({
    code : 0,
    data: [
      {
        // 一级
        id: 0,
        name:'推荐',
        data: [
          {
            // 二级
            id:0,
            name:'推荐',
            list: [
              // 三级
              {
                id: 0,
                name: '数字女王',
                imgUrl: './images/list0.png'
              },
              {
                id: 1,
                name: '谁在掷骰子',
                imgUrl: './images/list1.png'
              },
              {
                id: 2,
                name: '泛函分析导论',
                imgUrl: './images/list2.png'
              },
              {
                id: 3,
                name: '育儿脑科学',
                imgUrl: './images/list3.png'
              },
              {
                id: 4,
                name: '通信简史',
                imgUrl: './images/list4.png'
              },
              {
                id: 5,
                name: '微前端设计与实现',
                imgUrl: './images/list5.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 1,
        name:'编程语言',
        data: [
          {
            // 二级
            id:0,
            name:'编程语言',
            list: [
              // 三级
              {
                id: 0,
                name: 'Java性能权威指南（第2版）',
                imgUrl: './images/code0.png'
              },
              {
                id: 1,
                name: 'C语言程序设计：现代方法（第2版 • 修订版）习题解答',
                imgUrl: './images/code1.png'
              },
              {
                id: 2,
                name: 'shell脚本基础教程',
                imgUrl: './images/code2.png'
              },
              {
                id: 3,
                name: '明解Python',
                imgUrl: './images/code3.png'
              },
              {
                id: 4,
                name: '明解C++',
                imgUrl: './images/code4.png'
              },
              {
                id: 5,
                name: 'Node与Express开发（第2版）',
                imgUrl: './images/code5.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 2,
        name:'软件开发',
        data: [
          {
            // 二级
            id:0,
            name:'软件开发',
            list: [
              // 三级
              {
                id: 0,
                name: '量子计算机编程：从入门到实践',
                imgUrl: './images/code6.png'
              },
              {
                id: 1,
                name: '活文档：与代码共同演进 ',
                imgUrl: './images/code7.png'
              },
              {
                id: 2,
                name: 'Python函数式编程（第2版）',
                imgUrl: './images/code8.png'
              },
              {
                id: 3,
                name: '加速：企业数字化转型的24项核心能力 ',
                imgUrl: './images/code9.png'
              },
              {
                id: 4,
                name: '量子计算机编程：从入门到实践 ',
                imgUrl: './images/code10.png'
              },
              {
                id: 5,
                name: 'gRPC与云原生应用开发：以Go和Java为例 ',
                imgUrl: './images/code11.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 3,
        name:'Web设计',
        data: [
          {
            // 二级
            id:0,
            name:'Web设计',
            list: [
              // 三级
              {
                id: 0,
                name: '图解网站分析（修订版）：让流量倍增的网站优化方法',
                imgUrl: './images/code12.png'
              },
              {
                id: 1,
                name: '精通Spring：Java Web开发与Spring Boot高级功能',
                imgUrl: './images/code13.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 4,
        name:'数据科学',
        data: [
          {
            // 二级
            id:0,
            name:'数据科学',
            list: [
              // 三级
              {
                id: 0,
                name: '用数据讲故事（修订版）',
                imgUrl: './images/code14.png'
              },
              {
                id: 1,
                name: 'Spark快速大数据分析（第2版）',
                imgUrl: './images/code15.png'
              },
              {
                id: 2,
                name: 'Python 3网络爬虫开发实战（第2版）',
                imgUrl: './images/code16.png'
              },
              {
                id: 3,
                name: '图数据库实战',
                imgUrl: './images/code17.png'
              },
              {
                id: 4,
                name: '统计学图鉴',
                imgUrl: './images/code18.png'
              },
              {
                id: 5,
                name: '数据科学中的实用统计学（第2版）',
                imgUrl: './images/code19.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 5,
        name:'游戏开发',
        data: [
          {
            // 二级
            id:0,
            name:'游戏开发',
            list: [
              // 三级
              {
                id: 0,
                name: 'SQL经典实例（第2版）',
                imgUrl: './images/code20.png'
              },
              {
                id: 1,
                name: 'MongoDB权威指南（第3版）',
                imgUrl: './images/code21.png'
              },
              {
                id: 2,
                name: '数据库可靠性工程：数据库系统设计与运维指南',
                imgUrl: './images/code22.png'
              },
              {
                id: 3,
                name: 'Presto实战',
                imgUrl: './images/code23.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 6,
        name:'人工智能',
        data: [
          {
            // 二级
            id:0,
            name:'人工智能',
            list: [
              // 三级
              {
                id: 0,
                name: '图神经网络导论',
                imgUrl: './images/code24.png'
              },
              {
                id: 1,
                name: 'Python深度学习（第2版）',
                imgUrl: './images/code25.png'
              },
              {
                id: 2,
                name: '机器学习极简入门',
                imgUrl: './images/code26.png'
              },
              {
                id: 3,
                name: '图解机器学习算法',
                imgUrl: './images/code27.png'
              },
              {
                id: 4,
                name: '深度学习原理与PyTorch实战（第2版）',
                imgUrl: './images/code28.png'
              },
              {
                id: 5,
                name: '机器学习：公式推导与代码实现',
                imgUrl: './images/code29.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 7,
        name:'操作系统',
        data: [
          {
            // 二级
            id:0,
            name:'操作系统',
            list: [
              // 三级
              {
                id: 0,
                name: 'shell脚本基础教程',
                imgUrl: './images/code30.png'
              },
              {
                id: 1,
                name: '跟阿铭学Linux（第4版）',
                imgUrl: './images/code31.png'
              },
              {
                id: 2,
                name: 'Linux命令行与shell脚本编程大全（第4版）',
                imgUrl: './images/code32.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 8,
        name:'图像处理',
        data: [
          {
            // 二级
            id:0,
            name:'图像处理',
            list: [
              // 三级
              {
                id: 0,
                name: 'OpenCV计算机视觉编程攻略（第2版）',
                imgUrl: './images/code33.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 9,
        name:'计算机原理',
        data: [
          {
            // 二级
            id:0,
            name:'计算机原理',
            list: [
              // 三级
              {
                id: 0,
                name: '程序员的数学（第2版）',
                imgUrl: './images/code34.png'
              },
              {
                id: 1,
                name: '游戏机图鉴：一部游戏机进化的视觉史',
                imgUrl: './images/code35.png'
              },
            ]
          }
        ]
      },
      {
        // 一级
        id: 10,
        name:'计算机数学',
        data: [
          {
            // 二级
            id:0,
            name:'计算机数学',
            list: [
              // 三级
              {
                id: 0,
                name: '趣学贝叶斯统计：橡皮鸭、乐高和星球大战中的统计学',
                imgUrl: './images/code36.png'
              },
              {
                id: 1,
                name: '统计学图鉴',
                imgUrl: './images/code37.png'
              },
            ]
          }
        ]
      }
    ]
  })
})
// 首页推荐数据
router.get('/api/index_list/0/data/1', function (req, res) {
  res.send({
    code: 0,
    data: {
      // topBar数据
      topBar: [
        {id: 0, name:'推荐', title: '推荐'},
        {id: 1, name:'webGL', title: 'webGL'},
        {id: 2, name:'chatGPT', title: 'chatGPT'},
        {id: 3, name:'大数据', title: '大数据'},
        {id: 4, name:'元宇宙', title: '元宇宙'},
        {id: 5, name:'编译原理', title: '编译原理'},
      ],
      data: [
        // swiper数据
        {
          id: 0,
          type: 'swiperList',
          data: [
            {id:0,imgUrl:'./images/swiper0.jpg'},
            {id:1,imgUrl:'./images/swiper1.jpg'},
            {id:2,imgUrl:'./images/swiper2.jpg'},
            {id:3,imgUrl:'./images/swiper3.jpg'}
          ]
        },
        // icons数据
        {
          id: 1,
          type: 'iconList',
          data: [
            {
              id: 0,
              title: '剑术提升',
              imgUrl: './images/skill.png'
            },
            {
              id: 1,
              title: '吟唱魔法',
              imgUrl: './images/lapp.png'
            },
            {
              id: 2,
              title: '装备配置',
              imgUrl: './images/box.png'
            },
            {
              id: 3,
              title: '公会馈赠',
              imgUrl: './images/gift.png'
            },
            {
              id: 4,
              title: '公会授权',
              imgUrl: './images/auth.png'
            },
          ]
        },
        // 推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 0,
              name: 'TensorFlow技术解析与实践',
              content: '推荐',
              price: '68',
              imgUrl: './images/re0.png'
            },
            {
              id: 1,
              name: 'Python机器学习基础教程',
              content: '推荐',
              price: '68',
              imgUrl: './images/re1.png'
            },
            {
              id: 2,
              name: 'Python+TensorFlow机器学习实践',
              content: '推荐',
              price: '68',
              imgUrl: './images/re2.png'
            },
            {
              id: 3,
              name: 'NLTK基础教程',
              content: '推荐',
              price: '68',
              imgUrl: './images/re3.png'
            },
            {
              id: 4,
              name: '机器学习',
              content: '推荐',
              price: '68',
              imgUrl: './images/re4.png'
            },
          ]
        },
        // cookie推荐
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 0,
              name: '可编程网络自动化',
              price: '128',
              priceOff: '113',
              imgUrl: './images/like0.jpeg'
            },
            {
              id: 1,
              name: '你不知道的JavaScript',
              price: '44',
              priceOff: '23',
              imgUrl: './images/like1.jpeg'
            },
            {
              id: 2,
              name: '深度匹配学习',
              price: '76',
              priceOff: '54',
              imgUrl: './images/like2.jpeg'
            },
            {
              id: 3,
              name: 'ON JAVA中文版 基础卷',
              price: '89',
              priceOff: '65',
              imgUrl: './images/like3.jpeg'
            },
            {
              id: 4,
              name: '用Go语言自制编译器',
              price: '88',
              priceOff: '55',
              imgUrl: './images/like4.jpeg'
            },
            {
              id: 5,
              name: 'Python编程',
              price: '92',
              priceOff: '86',
              imgUrl: './images/like5.jpeg'
            },
          ]
        }
      ]
    },
  })
});
// 首页webgl数据
router.get('/api/index_list/1/data/1', function (req, res) {
  res.send({
    code: 0,
    data: [
      // 广告数据
      {
        id:0,
        type:'adList',
        data: [
          {
            id:0,
            imgUrl:'./images/webgl.jpeg'
          },
        ]
      },
      // 个人推荐的数据
      {
        id: 1,
        type: 'likeList',
        data: [
          {
            id: 0,
            name: '论道HTML5',
            price: '122',
            imgUrl: './images/webgl0.jpg'
          },
          {
            id: 1,
            name: 'HTML5与webGL编程',
            price: '64',
            imgUrl: './images/webgl1.jpg'
          },
          {
            id: 2,
            name: 'Three.js入门指南',
            price: '158',
            imgUrl: './images/webgl2.jpg'
          },
        ]
      }
    ]
  })
});
// 首页chatGpt数据
router.get('/api/index_list/2/data/1', function (req, res) {
  res.send({
    code: 0,
    data: [
      // 广告数据
      {
        id:0,
        type:'adList',
        data: [
          {
            id:0,
            imgUrl:'./images/chatgpt.jpg'
          },
        ]
      },
      // 个人推荐的数据
      {
        id: 1,
        type: 'likeList',
        data: [
          {
            id: 0,
            name: 'BERT基础教程',
            price: '78',
            imgUrl: './images/chat0.jpg'
          },
        ]
      }
    ]
  })
});
// 首页大数据数据
router.get('/api/index_list/3/data/1', function (req, res) {
  res.send({
    code: 0,
    data: [
      // 广告数据
      {
        id:0,
        type:'adList',
        data: [
          {
            id:0,
            imgUrl:'./images/bigdata.jpg'
          },
        ]
      },
      // 个人推荐的数据
      {
        id: 1,
        type: 'likeList',
        data: [
          {
            id: 0,
            name: 'kafka权威指南',
            price: '130',
            imgUrl: './images/bigdata0.jpg'
          },
          {
            id: 1,
            name: '数据挖掘教程',
            price: '118',
            imgUrl: './images/bigdata1.jpg'
          },
          {
            id: 2,
            name: '统计学图签',
            price: '64',
            imgUrl: './images/bigdata2.jpg'
          },
          {
            id: 3,
            name: '移动APT',
            price: '98',
            imgUrl: './images/bigdata3.jpg'
          },
          {
            id: 4,
            name: 'Spark快速大数据分析',
            price: '44',
            imgUrl: './images/bigdata4.jpg'
          },
        ]
      }
    ]
  })
});
// 首页元宇宙数据
router.get('/api/index_list/4/data/1', function (req, res) {
  res.send({
    code: 0,
    data: [
      // 广告数据
      {
        id:0,
        type:'adList',
        data: [
          {
            id:0,
            imgUrl:'./images/oip.jpeg'
          },
        ]
      },
      // 个人推荐的数据
      {
        id: 1,
        type: 'likeList',
        data: [
          {
            id: 0,
            name: '精通Metasploit渗透测试',
            price: '111',
            imgUrl: './images/oip0.jpg'
          },
          {
            id: 1,
            name: '精通Metasploit渗透测试（第3版）',
            price: '134',
            imgUrl: './images/oip1.jpg'
          },
          {
            id: 2,
            name: 'Python元学习',
            price: '66',
            imgUrl: './images/oip2.jpg'
          },
          {
            id: 3,
            name: '精通Metasploit渗透测试（第2版）',
            price: '42',
            imgUrl: './images/oip3.jpg'
          },
        ]
      }
    ]
  })
});
// 首页编译原理数据
router.get('/api/index_list/5/data/1', function (req, res) {
  res.send({
    code: 0,
    data: [
      // 广告数据
      {
        id:0,
        type:'adList',
        data: [
          {
            id:0,
            imgUrl:'./images/compiler.jpeg'
          },
        ]
      },
      // 个人推荐的数据
      {
        id: 1,
        type: 'likeList',
        data: [
          {
            id: 0,
            name: 'Go语音编译器',
            price: '128',
            imgUrl: './images/compiler0.jpg'
          },
          {
            id: 1,
            name: '现代编译原理C',
            price: '67',
            imgUrl: './images/compiler1.jpg'
          },
          {
            id: 2,
            name: '现代编译原理C（修订版）',
            price: '44',
            imgUrl: './images/compiler2.jpg'
          },
        ]
      }
    ]
  })
});

module.exports = router;

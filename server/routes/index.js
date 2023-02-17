const express = require('express');
const router = express.Router();
const connection = require('../db/sql');
const User = require('../db/user')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

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

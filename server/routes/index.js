var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
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
              imgUrl: './images/like0.jpeg'
            },
            {
              id: 1,
              name: '你不知道的JavaScript',
              price: '128',
              imgUrl: './images/like1.jpeg'
            },
            {
              id: 2,
              name: '深度匹配学习',
              price: '128',
              imgUrl: './images/like2.jpeg'
            },
            {
              id: 3,
              name: 'ON JAVA中文版 基础卷',
              price: '128',
              imgUrl: './images/like3.jpeg'
            },
            {
              id: 4,
              name: '用Go语言自制编译器',
              price: '128',
              imgUrl: './images/like4.jpeg'
            },
            {
              id: 5,
              name: 'Python编程',
              price: '128',
              imgUrl: './images/like5.jpeg'
            },
          ]
        }
      ]
    },
  })
})
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
})
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
})
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
})
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
})
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
})

module.exports = router;

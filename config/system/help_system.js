/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: '落落帮助',
  subTitle: 'Yunzai-Bot & luoluo-Plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
{
  group: '可不加#前缀或使用/代替',
  list: [
    {
      icon: 31,
      title: "#一言",
      desc: "顾名思义 就是一言啦 可获取JSON数据更详细"
    },
    {
      icon: 32,
      title: "#疯狂星期四",
      desc: "输出一句疯狂星期四"
    },
    {
      icon: 17,
      title: "#网易云热评",
      desc: "顾名思义 就是网易云热评啦"
    }, 
    {
      icon: 18,
      title: "#天气",
      desc: "天气查询 在天气前面加城市名 (仅国内城市)"
    },
    {
      icon: 38,
      title: "#列表",
      desc: "获取歌曲列表 再列表前面加歌曲名"
    },
    { icon: 39,
      title: "#歌词",
      desc: "获取歌曲歌词 再歌词前面加歌曲名 可配合列表使用 在歌词后方加数字选取不同版本"
    },
    {
      icon: 45,
      title: "#音频",
      desc: "获取歌曲音频 再音频前面加歌曲名 可配合列表使用 在歌词后方加数字选取不同版本"
    },
    {
      icon: 46,
      title: "#歌曲",
      desc: "获取歌词+音频 可配合列表使用 在歌词后方加数字选取不同版本"
    },
    {
      icon: 39,
      title: "#随机表情包",
      desc: "获取表情包 详情请查看落落表情包帮助"
    },
    {
      icon: 91,
      title: "#xx与xx攻受短文",
      desc: "写一段攻受短文[请输入名称]"
    },
    {
      icon: 92,
      title: "#ping地址",
      desc: "在地址后面加IP或域名 仅支持iPv4地址和域名"
    },
    {
      icon: 132,
      title: "#谁艾特我",  
      desc: "查看10天内的艾特你的人及其内容"
    },
    {
      icon: 164,
      title: "#是什么垃圾",
      desc: "垃圾分类 在是什么垃圾前面加垃圾名称 "
    },
    {
      icon: 171,
      title: "#随机动漫图",
      desc: "随机获取一张动漫图 "
    },
    {
      icon: 207,
      title: "#哔哩哔哩热搜榜",
      desc: "哔哩哔哩热搜榜TOP10"
    },
    {
      icon: 167,
      title: "#知乎热搜榜",
      desc: "知乎热搜榜TOP10"
    },
    {
      icon: 168,
      title: "#抖音热搜榜",
      desc: "抖音热搜榜TOP10"
    },
    {
      icon: 185,
      title: "#今日头条热搜榜",
      desc: "今日头条热搜榜TOP10"
    },
    {
      icon: 172,
      title: "#今日头条热点新闻",
      desc: "今日头条热点新闻TOP10"
    },
    {
      icon: 131,
      title: "#生成二维码",
      desc: "生成二维码 在生成二维码后面加内容/网址"
    },
    {
      icon: 133,
      title: "哔哩哔哩视频解析",
      desc: "发送视频链接即可 注:需将你的FFmpeg所在的文件夹在PATH环境变量中"
    },
    {
      icon: 2,
      title: "#头像",
      desc: "获取群友的QQ头像 at就是拿群友的 不艾特就是自己的"
    },
    {
      icon: 3,
      title: "#群头像",
      desc: "获取QQ群头像"
    },
    {
      icon: 25,
      title: "#举牌",
      desc: "生成一张小人举牌图片 在举牌后面加内容"
    },
    {
      icon: 211,
      title: "#落落表情包帮助",
      desc: "表情包帮助"
    },
    {
      icon: 67,
      title: "#落落插件更新",
      desc: "更新插件"
    },
    {
      icon: 26,
      title: "若发现Bug 请反馈或更改后提出pr谢谢您的帮助",  
      desc: "反馈方式QQ:2243958507"
    }
  ]
}
]
export const bqbhelpCfg = {
  title: '表情包帮助',
  subTitle: 'Yunzai-Bot & luoluo-Plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const bqbhelpList = [
  {
    group: '可不加#前缀',
    list: [
      {
        icon: 8,
        title: "#随机龙图表情包",
        desc: "攻击性有待提高"
      },
      {
        icon: 79,
        title: "#随机猫羽雫(甘城猫猫)表情包",
        desc: "来点Nacho！"
      },
      {
        icon: 42,
        title: "#随机fufu表情包",
        desc: "你就是歌姬吧！"
      },
      {
        icon: 19,
        title: "#随机丛雨表情包",
        desc: "Ciallo～(∠・ω< )⌒☆"
      },
      {
        icon: 318,
        title: "#随机小南梁表情包",
        desc: "被小南梁害惨了"
      },
      {
        icon: 345,
        title: "#随机千恋万花表情包",
        desc: "柚子厨蒸鹅心"
      },
      {
        icon: 294,
        title: "#随机古拉表情包",
        desc: "来点gura！"
      },
      {
        icon: 131,
        title: "#随机心海表情包",
        desc: "诶嘿嘿心海~"
      },
      {
        icon: 101,
        title: "#随机柴郡表情包",
        desc: "搞什么啊我只是猫咪"
      },
      {
        icon: 56,
        title: "#随机满穗表情包",
        desc: "参见万穗爷"
      },
      {
        icon: 296,
        title: "#随机猫猫虫表情包",
        desc: "咖波"
      },
      {
        icon: 90,
        title: "#随机纳西妲表情包",
        desc: "分享智慧"
      },
      {
        icon: 324,
        title: "#随机诗歌剧表情包",
        desc: "曼波！"
      },
      {
        icon: 321,
        title: "#随机kemomimi表情包",
        desc: "兽耳酱"
      },
      {
        icon: 312,
        title: "#随机表情包",
        desc: "随机输出一张表情包"
      }
    ]
  }
]
export const isSys = true

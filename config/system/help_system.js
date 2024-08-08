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
      icon: 88,
      title: "#一言",
      desc: "顾名思义 就是一言啦"
    },{
      icon: 63,
      title: "#网易云热评",
      desc: "顾名思义 就是网易云热评啦"
    }, 
    {
      icon: 66,
      title: "#天气",
      desc: "天气查询 在天气前面加城市名 (仅国内城市)"
    },
    {
      icon: 65,
      title: "#歌词",
      desc: "获取歌曲歌词 再歌词前面加歌曲名 [因版本原因可能有些许不同]"
    },{
      icon: 79,
      title: "#甘城表情包",
      desc: "顾名思义 就是获取甘城猫猫表情包啦"
    },{
      icon: 83,
      title: "#xx与xx攻受短文",
      desc: "写一段攻受短文[请输入名称]"
    },{
      icon: 78,
      title: "#ping地址",
      desc: "在地址后面加IP或域名 仅支持iPv4地址和域名"
    },
    {
      icon: 90,
      title: "#谁艾特我",  
      desc: "查看10天内的艾特你的人及其内容"
    },
    {
      icon: 62,
      title: "#是什么垃圾",
      desc: "垃圾分类 在是什么垃圾前面加垃圾名称 "
    },
    {
      icon: 94,
      title: "若发现Bug 请反馈或更改后提出pr谢谢您的帮助",  
      desc: "反馈方式QQ:2243958507"
    }
  ]
}
]

export const isSys = true

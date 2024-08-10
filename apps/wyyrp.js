// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'


// 定义example类，继承自plugin
export class wyyrp extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '网易云音乐热评',
            // 插件描述
            dsc: 'wyyrp',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?网易云热评$',
                    /***执行方式***/
                    fnc: 'wyyrp'
                }
            ]
        })
    }


    /***网易云音乐热评***/
    async wyyrp(e) {
        let data = await fs.readFileSync('./plugins/${Plugin_Name}/config/AllAPI.json')
        const API = JSON.parse(data)
        let api = API.api3.url
        /***解析JSON***/
        let jx = await fetch(api)
        /***定义Data函数***/
        const Data = await (jx).json()
        /***定义code***/
        let code = Data['code']
        /***判断返回code值***/
        if (code != '0') {
            /***发送消息***/
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            /***阻止消息继续往下***/
            return true
        }
        /***访问JSON数组里data下的name***/
        let msg0 = Data['data']['name']
        /***访问JSON数组里data下的artist***/
        let msg1 = Data['data']['artist']
        /***访问JSON数组里data下的src***/
        let msg2 = Data['data']['url']
        /***访问JSON数组里data下的name***/
        let msg3 = Data['data']['src']
        /***访问JSON数组里data下的picurl***/
        let msg4 = Data['data']['picurl']
        /***访问JSON数组里data下的artistsname***/
        let msg5 = Data['data']['artistsname']
        /***访问JSON数组里data下的avatarurl***/
        let msg6 = Data['data']['avatarurl']
        /***访问JSON数组里data下的content***/
        let msg7 = Data['data']['content']
        /***访问JSON数组里data下data的第一组数据的date***/
        let msg8 = Data['data']['likedCount']
        /***发送消息***/
        e.reply([`歌曲名称:${msg0}\n
歌手:${msg1}\n
歌曲页面地址:${msg2}\n
歌曲播放地址:${msg3}\n
歌曲封面地址:${msg4}\n
评论者昵称:${msg5}\n
评论者头像地址:${msg6}\n
评论内容:${msg7}\n
点赞数:${msg8}`])
        /***阻止消息继续往下***/
        return true
    }
}

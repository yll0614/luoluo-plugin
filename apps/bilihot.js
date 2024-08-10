// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'


// 定义example类，继承自plugin
export class bilihot extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '哔哩哔哩热搜榜',
            // 插件描述
            dsc: 'bilihot',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?哔哩哔哩热搜榜$',
                    /***执行方式***/
                    fnc: 'bilihot'
                }
            ]
        })
    }


    async bilihot(e) {
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api14.url
        /***解析JSON***/
        let jx = await fetch(api)
        /***定义Data函数***/
        const Data = await (jx).json()
        /***定义code***/
        let code = Data['code']
        /***判断返回code值***/
        if (code != '200') {
            /***发送消息***/
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            /***阻止消息继续往下***/
            return true
        }
        //name
        let msg0 = '热搜词:' + Data['data'][0]['name']
        let msg1 = '热搜词:' + Data['data'][1]['name']
        let msg2 = '热搜词:' + Data['data'][2]['name']
        let msg3 = '热搜词:' + Data['data'][3]['name']
        let msg4 = '热搜词:' + Data['data'][4]['name']
        let msg5 = '热搜词:' + Data['data'][5]['name']
        let msg6 = '热搜词:' + Data['data'][6]['name']
        let msg7 = '热搜词:' + Data['data'][7]['name']
        let msg8 = '热搜词:' + Data['data'][8]['name']
        let msg9 = '热搜词:' + Data['data'][9]['name']
        //url
        let msga = '热搜词链接:' + Data['data'][0]['url']
        let msgb = '热搜词链接:' + Data['data'][1]['url']
        let msgc = '热搜词链接:' + Data['data'][2]['url']
        let msgd = '热搜词链接:' + Data['data'][3]['url']
        let msge = '热搜词链接:' + Data['data'][4]['url']
        let msgf = '热搜词链接:' + Data['data'][5]['url']
        let msgg = '热搜词链接:' + Data['data'][6]['url']
        let msgh = '热搜词链接:' + Data['data'][7]['url']
        let msgi = '热搜词链接:' + Data['data'][8]['url']
        let msgj = '热搜词链接:' + Data['data'][9]['url']
        /***发送消息***/
        e.reply([`${msg0}\n` + `${msga}\n
${msg1}\n` + `${msgb}\n
${msg2}\n` + `${msgc}\n
${msg3}\n` + `${msgd}\n
${msg4}\n` + `${msge}\n
${msg5}\n` + `${msgf}\n
${msg6}\n` + `${msgg}\n
${msg7}\n` + `${msgh}\n
${msg8}\n` + `${msgi}\n
${msg9}` + `${msgj}`])
        /***阻止消息继续往下***/
        return true
    }
}

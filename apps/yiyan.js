// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

async function LLAPITOGO(e, API) {

        let api = API.api2.url + `?format=json`
        /***解析JSON***/
        let jx = await fetch(api)
        /***定义url0Data函数***/
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '200') {
            /***发送消息***/
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            /***阻止消息继续往下***/
            return true
        }
        /***访问JSON数据***/
        let msg = '一言分类名称：'+Data['data']['catname']
        let msg2 = '一言作者：'+Data['data']['author']
        let msg1 = '一言来源：'+Data['data']['source']
        let msg3 = '一言内容：'+Data['data']['hitokoto']
        /***发送消息***/
        e.reply([`${msg}\n${msg1}\n${msg2}\n${msg3}`])
        // 阻止消息继续往下处理
        return true
      }
// 定义example类，继承自plugin
export class yiyan extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '一言',
            // 插件描述
            dsc: 'yiyan',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?一言(.*)$',
                    /***执行方式***/
                    fnc: 'yiyan'
                }
            ]
        })

    }

    
    /***一言***/
    async yiyan(e) {
        // 提取用户查询的歌曲名
        const emsg = e.msg.match(/^[#/]?一言(.*)$/)[1]
        let data = await fs.readFileSync('./plugins/${Plugin_Name}/config/AllAPI.json')
        const API = JSON.parse(data)
        if (emsg == 'json') {
            return LLAPITOGO(e, API);
        }
        if (emsg == 'JSON') {
            return LLAPITOGO(e, API);
        }
        if (emsg == 'Json') {
            return LLAPITOGO(e, API);
        }
        let api = API.api2.url
        const response = await fetch(api)
        let text = await response.text()
        /***发送消息***/
        e.reply([`${text}`])

        /***阻止消息继续往下***/
        return true
    }

}

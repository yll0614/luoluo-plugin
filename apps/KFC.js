// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'


export class KFC extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '疯狂星期四',
            // 插件描述
            dsc: 'KFC',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?疯狂星期四(.*)$',
                    /***执行方式***/
                    fnc: 'KFC'
                }
            ]
        })

    }
   /***一言***/
    async KFC(e) {
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api21.url
        const response = await fetch(api)
        let text = await response.text()
        /***发送消息***/
        e.reply([`${text}`])

        /***阻止消息继续往下***/
        return true
    }

}
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

// 定义example类，继承自plugin
export class qqtx extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '小人举牌',
            // 插件描述
            dsc: 'jupai',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?举牌(.*)$',
                    /***执行方式***/
                    fnc: 'jupai'
                }
            ]
        })

    }
    async jupai(e) {
        const msg = e.msg.match(/^[#/]?举牌(.*)$/)[1]
        // 读取API配置文件
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api19.url + `?msg=${msg}`
         /***发送消息***/
         e.reply([segment.image(`${api}`)])
         /***阻止消息继续往下***/
         return true
     }
 }

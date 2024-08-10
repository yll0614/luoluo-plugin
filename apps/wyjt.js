// 引入必要的模块
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

// 定义example类，继承自plugin
export class wyjt extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '网页截图',
            // 插件描述
            dsc: 'wyjt',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?截图(.*)$',
                    /***执行方式***/
                    fnc: 'wyjt'
                }
            ]
        })

    }
    /***网页截图***/
    async wyjt(e) {
        /***定义msgtq函数***/
        const msg = e.msg.match(/^[#/]?截图(.*)$/)[1]
        // 读取API配置文件
        let data = await fs.readFileSync('./plugins/${Plugin_Name}/config/AllAPI.json')
        const API = JSON.parse(data)
        let api = API.api9.url + `?url=${msg}`
        e.reply([segment.image(`${api}`)])
        /***阻止消息继续往下***/
        return true
    }
}
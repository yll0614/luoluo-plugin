// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'


// 定义example类，继承自plugin
export class tianqi extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '二维码生成',
            // 插件描述
            dsc: 'qrcode',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    // 匹配正则表达式
                    reg: '^[#/]?生成二维码(.*)(大小)?(.*)$',
                    // 执行函数名
                    fnc: 'qrcode'
                }
            ]
        })

    }
   
    async qrcode(e) {
        /***定义text函数***/
        const text = e.msg.match(/^[#/]?生成二维码(.*)$/)[1]
        // 读取API配置文件
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api13.url + `text=${text}?&size=150`
        e.reply([segment.image(`${api}`)])
         /***阻止消息继续往下***/
         return true
    }
}
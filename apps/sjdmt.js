import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

// 定义example类，继承自plugin
export class sjdmt extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '随机动漫图',
            // 插件描述
            dsc: 'sjdmt',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?随机动漫图$',
                    /***执行方式***/
                    fnc: 'sjdmt'
                }
            ]
        })

    }
    async sjdmt(e) {
        // 读取API配置文件
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api12.url + `?format=json`
        /***解析JSON***/
        let jx = await fetch(api)
        /***定义url4Data函数***/
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
        let msg = Data['data']['url']
         /***发送消息***/
         e.reply([segment.image(`${msg}`)])
         /***阻止消息继续往下***/
         return true
     }
 }

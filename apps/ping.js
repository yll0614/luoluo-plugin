// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'


// 定义example类，继承自plugin
export class ping extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: 'Ping',
            // 插件描述
            dsc: 'ping',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?ping地址(.*)$',
                    /***执行方式***/
                    fnc: 'ping'
                }
            ]
        })

    }

    /***Ping-IPV4***/
    async ping(e) {
        /***定义pingmsg函数***/
        const msg = e.msg.match(/^[#/]?ping地址(.*)$/)[1]
        // 读取API配置文件
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        // 根据配置文件选择API，并添加查询参数
        let api = API.api7.url + `?format=json&ip=${msg}&type=ipv4`
        /***解析JSON***/
        let jx = await fetch(api)
        /***定义Data函数***/
        const Data = await (jx).json()
        /***定义code***/
        let code = Data['code']
        /***判断返回code值***/
        if (code != '200') {
            /***发送消息***/
            e.reply([`访问主机失败,请检查IP地址或域名是否正确输入或稍后再试!`])
            /***阻止消息继续往下***/
            return true
        }
        /***ping节点-访问JSON数组里data下的node***/
        let msg0 = Data['data']['node']
        /***主机-访问JSON数组里data下的host***/
        let msg1 = Data['data']['host']
        /***ip地址-访问JSON数组里data下的ip***/
        let msg2 = Data['data']['ip']
        /***地理位置-访问JSON数组里data下的location***/
        let msg3 = Data['data']['location']
        /***最大延迟-访问JSON数组里data下的ping_max***/
        let msg4 = Data['data']['ping_max']
        /***最小延迟-访问JSON数组里data下的pin_min***/
        let msg5 = Data['data']['ping_min']
        /***平均延迟-访问JSON数组里data下的ping_avg***/
        let msg6 = Data['data']['ping_avg']
        /***发送消息***/
        e.reply([`Ping节点:${msg0}\n
主机:${msg1}\n
主机IP地址:${msg2}\n
主机地理位置:${msg3}\n
最大Ping延迟:${msg4}\n
最小Ping延迟:${msg5}\n
平均延迟:${msg6}
`])
        /***阻止消息继续往下***/
        return true
    }
}
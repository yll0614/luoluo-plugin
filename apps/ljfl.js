// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'


// 定义example类，继承自plugin
export class ljfl extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '垃圾分类',
            // 插件描述
            dsc: 'ljfl',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                      /***匹配正则***/
                      reg: '^[#/]?(.*)是什么垃圾$',
                      /***执行方式***/
                      fnc: 'ljfl'
                }
            ]
        })

    }
/***垃圾分类***/
async ljfl(e) {
    /***定义ljflmsg函数***/
    const msg = e.msg.match(/^[#/]?(.*)是什么垃圾$/)[1]
    // 读取API配置文件
    let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
    const API = JSON.parse(data)
     let api = API.api8.url + `?format=json&kw=${msg}`
    /***解析JSON***/
    let jx = await fetch(api)
    /***定义Data函数***/
    const Data = await (jx).json()

    /***定义code***/
    let code = Data['code']
    /***判断返回code值***/
    if (code == '400') {
        /***发送消息***/
        e.reply([`未找到相关结果`])
        /***阻止消息继续往下***/
        return true
    }
    /***判断返回code值***/
    if (code != '200') {
        /***发送消息***/
        e.reply([`请求失败,请稍后再试或联系管理员!`])
        /***阻止消息继续往下***/
        return true
    }
    /***名称-访问JSON数组里data下的name***/
    let msg0 = Data['data']['name']
    let msg1 = Data['data']['typeName']
    /***发送消息***/
    e.reply([`垃圾名称:${msg0}\n该垃圾是:${msg1}`])
}
}
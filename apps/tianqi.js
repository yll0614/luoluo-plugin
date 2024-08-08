// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'

// 定义example类，继承自plugin
export class tianqi extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '天气',
            // 插件描述
            dsc: 'tianqi',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    // 匹配正则表达式，用于识别歌词查询命令
                    reg: '^[#/]?(.*)歌词$',
                    // 执行函数名
                    fnc: 'geci'
                }
            ]
        })

    }
    /***城市天气***/
    async cstq(e) {
        /***定义msgtq函数***/
        const msg = e.msg.match(/^[#/]?(.*)天气$/)[1]
        // 读取API配置文件
        let data = await fs.readFileSync('./plugins/xiaoye-plugin/config/AllAPI.json')
        const API = JSON.parse(data)
        let api = API.api6.url + `?city=${msg}`
        /***解析JSON***/
        let jx = await fetch(api)
        /***定义url4Data函数***/
        const Data = await (jx).json()
        /***定义code***/
        let code = Data['code']
        /***判断返回code值***/
        if (code == '-2') {
            /***发送消息***/
            e.reply([`请确认您的城市是否填写正确`])
            /***阻止消息继续往下***/
            return true
        }
        /***判断返回code值***/
        if (code == '-4') {
            /***发送消息***/
            e.reply([`缺少参数，请在命令前添加城市名称`])
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
        /***定义city***/
        let citymsg = Data['data']['city']/***访问JSON数组里data下的city
    /***今天的昨天***/
        /***星期--访问JSON数组里data下data的第一组数据的date***/
        let msg0 = Data['data']['data'][0]['date']
        /***空气质量--访问JSON数组里data下data的第一组数据的air_quality***/
        let msg1 = Data['data']['data'][0]['air_quality']
        /***天气--访问JSON数组里data下data的第一组数据的weather***/
        let msg2 = Data['data']['data'][0]['weather']
        /***温度--访问JSON数组里data下data的第一组数据的temperature***/
        let msg3 = Data['data']['data'][0]['temperature']
        /***风向--访问JSON数组里data下data的第一组数据的wind***/
        let msg4 = Data['data']['data'][0]['wind']
        /***今天***/
        /***星期--访问JSON数组里data下data的第二组数据的date***/
        let msg5 = Data['data']['data'][1]['date']
        /***空气质量--访问JSON数组里data下data的第二组数据的air_quality***/
        let msg6 = Data['data']['data'][1]['air_quality']
        /***天气--访问JSON数组里data下data的第二组数据的weather***/
        let msg7 = Data['data']['data'][1]['weather']
        /***温度--访问JSON数组里data下data的第二组数据的temperature***/
        let msg8 = Data['data']['data'][1]['temperature']
        /***风向--访问JSON数组里data下data的第二组数据的wind***/
        let msg9 = Data['data']['data'][1]['wind']
        /***今天的明天
        /***星期--访问JSON数组里data下data的第三组数据的date***/
        let msg10 = Data['data']['data'][2]['date']
        /***空气质量--访问JSON数组里data下data的第三组数据的air_quality***/
        let msg11 = Data['data']['data'][2]['air_quality']
        /***天气--访问JSON数组里data下data的第三组数据的weather***/
        let msg12 = Data['data']['data'][2]['weather']
        /***温度--访问JSON数组里data下data的第三组数据的temperature***/
        let msg13 = Data['data']['data'][2]['temperature']
        /***风向--访问JSON数组里data下data的第三组数据的wind***/
        let msg14 = Data['data']['data'][2]['wind']
        /***今天的后天***/
        /***星期--访问JSON数组里data下data的第四组数据的date***/
        let msg15 = Data['data']['data'][3]['date']
        /***空气质量--访问JSON数组里data下data的第四组数据的air_quality***/
        let msg16 = Data['data']['data'][3]['air_quality']
        /***天气--访问JSON数组里data下data的第四组数据的temperature***/
        let msg17 = Data['data']['data'][3]['weather']
        /***温度--访问JSON数组里data下data的第四组数据的weather***/
        let msg18 = Data['data']['data'][3]['temperature']
        /***风向--访问JSON数组里data下data的第四组数据的wind***/
        let msg19 = Data['data']['data'][3]['wind']
        /***发送消息***/
        e.reply([`当前查询城市:${citymsg}
昨天:\n昨天是:${msg0}\n空气质量:${msg1}\n天气:${msg2}\n温度:${msg3}\n风向及强度:${msg4}\n
今天:\n今天是:${msg5}\n空气质量:${msg6}\n天气:${msg7}\n温度:${msg8}\n风向及强度:${msg9}\n
明天:\n明天是:${msg10}\n空气质量:${msg11}\n天气:${msg12}\n温度:${msg13}\n风向及强度:${msg14}\n
后天:\n后天是:${msg15}\n空气质量:${msg16}\n天气:${msg17}\n温度:${msg18}\n风向及强度:${msg19}\n
`])
        /***阻止消息继续往下***/
        return true
    }
}
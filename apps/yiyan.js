// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'

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
                    reg: '^[#/]?一言$',
                    /***执行方式***/
                    fnc: 'yiyan'
                }
            ]
        })

    }
    /***一言***/
    async yiyan(e) {
        let data = await fs.readFileSync('./plugins/xiaoye-plugin/config/AllAPI.json')
        const API = JSON.parse(data)
        // 读取Token配置文件
        let TK = await fs.readFileSync('./plugins/xiaoye-plugin/config/APITP.json')
        const TP = JSON.parse(TK)
        let token = TP.Token
        let password = TP.PassWord
        let api = API.api2.url + `?type=json&token=${token}&password=${password}`
        let text = await response.text()
        // 检查返回的歌词内容，判断是否因为额度用尽或配置错误导致的特定消息
        if (text == '（免费额度进群开通并每天签到获得）本站接口已接入付费功能，5/10/20等，5块钱=17500调用量，很便宜的说，如需继续使用接口，请联系QQ490593431进行兑换调用量，再不攒点消费，吃不起饭的说，不过分吧，购买方法https://blog.xiaobapi.top/index.php/archives/89/') {
            // 发送消息提示用户或管理员检查配置和额度
            e.reply([`返回内容为:${text}\n调用额度用尽或Token,Password错误，请检查配置文件APITP.json确认无误后请确认是否还有余额`])
            // 阻止消息继续往下处理
            return true
        }
        if (text == '密钥密码不正确，请检查参数是否填入password') {
            /***发送消息***/
            e.reply([`${text}(检查config下APITP.json文件)是否正确填入`])
            /***阻止消息继续往下***/
            return true
        }
        /***解析JSON***/
        let jx = await fetch(api)
        /***定义url0Data函数***/
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '1') {
            /***发送消息***/
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            /***阻止消息继续往下***/
            return true
        }
        /***访问JSON里data这个属性***/
        let msg = Data['data']
        /***发送消息***/
        e.reply([`${msg}`])
        /***阻止消息继续往下***/
        return true
    }
}

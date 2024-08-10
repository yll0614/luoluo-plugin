// 引入必要的模块
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'


// 定义example类，继承自plugin
export class gcbqb extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '甘城猫猫表情包',
            // 插件描述
            dsc: 'gcbqb',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?甘城(猫猫)?表情包$',
                    /***执行方式***/
                    fnc: 'gcbqb'
                }
            ]
        })

    }
    /***甘城猫猫表情包***/
    async gcbqb(e) {
        // 读取API配置文件
        let pluginName = 'luoluo-plugin'; // 确定插件名称
        let filePath = `./plugins/${pluginName}/config/AllAPI.json`;
        let data = await fs.readFileSync(filePath);
        const API = JSON.parse(data)
        //直接使用api，不需要其他参数
        let api = API.api5.url;
        /***发送消息***/
        e.reply([segment.image(`${api}`)])
        /***阻止消息继续往下***/
        return true
    }
}
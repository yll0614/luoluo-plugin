// 引入必要的模块
import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";
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
                    reg: /^#?(.+)表情包$/,
                    /***执行方式***/
                    fnc: 'gcbqb'
                }
            ]
        })

    }
    /***甘城猫猫表情包***/
    async gcbqb(e) {
        const type = e.msg.match(/^#?(.+)表情包$/)[1];//通过发送不同指令来获取不同表情包
        const api = {
            甘城猫猫: 'https://yugan.love?name=猫羽雫',
            fufu: 'https://yugan.love?name=fufu',
            龙图:'https://yugan.love/?name=龙图'
        };
        //检查是否有对应url
        if (!api[type]) {
            await this.e.reply(`无法找到${type}的表情包，支持的表情包有'fufu,丛雨,甘城猫猫表情包类型,小南梁,千恋万花,古拉,心海,柴郡猫,满穗,猫猫虫,纳西妲,诗歌剧,龙图,kemomimi'`, true);
            return;
        }
        // 读取API配置文件
        //let pluginName = 'luoluo-plugin'; // 确定插件名称
        //let filePath = `./plugins/${pluginName}/config/AllAPI.json`;//读取API配置文件
        //let data = await fs.readFileSync(filePath);
        //const API = JSON.parse(data)
        //直接使用api，不需要其他参数
        //let api = API.api5.url;
        /***发送消息***/
        await e.reply(segment.image(api[type]));
        /***阻止消息继续往下***/
        return true
    }
}
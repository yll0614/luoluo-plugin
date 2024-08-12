// 引入必要的模块
import plugin from '../../../lib/plugins/plugin.js';


// 定义example类，继承自plugin
export class gcbqb extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '随机表情包',
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
                    reg: /^#?随机(.+)$/,
                    /***执行方式***/
                    fnc: 'gcbqb'
                }
            ]
        })

    }
    /***随机表情包***/
    async gcbqb(e) {
        const type = e.msg.match(/^#?随机(.+)$/)[1];//通过发送不同指令来获取不同表情包
        const api = {
            甘城猫猫: 'https://yugan.love?name=猫羽雫',
            fufu: 'https://yugan.love?name=fufu',
            龙图:'https://yugan.love/?name=龙图',
            丛雨:'https://yugan.love/?name=丛雨',
            小南梁:'https://yugan.love/?name=小南梁',
            千恋万花:'https://yugan.love/?name=千恋万花',
            古拉:'https://yugan.love/?name=古拉',
            心海:'https://yugan.love/?name=心海',
            柴郡:'https://yugan.love/?name=柴郡',
            满穗:'https://yugan.love/?name=满穗',
            猫猫虫:'https://yugan.love/?name=猫猫虫',
            纳西妲:'https://yugan.love/?name=纳西妲',
            诗歌剧:'https://yugan.love/?name=诗歌剧',
            kemomimi:'https://yugan.love/?name=kemomimi',
        };
        //检查是否有对应url
        if (!api[type]) {
            await this.e.reply(`没有${type}的表情包诶!您可以使用'#表情包帮助'来查看拥有的表情包哦~`, true);
            return;
        }
        await e.reply(segment.image(api[type]));
        /***阻止消息继续往下***/
        return true
    }
}
// 引入必要的模块
import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'

// 定义example类，继承自plugin
export class gsdw extends plugin {
    // 构造函数，初始化插件的属性
    constructor() {
        super({
            // 插件名称
            name: '攻受短文',
            // 插件描述
            dsc: 'gsdw',
            // 监听方式
            event: 'message',
            // 插件优先级
            priority: 5000,
            // 匹配正则
            rule: [
                {
                    /***匹配正则***/
                    reg: '^[#/]?(.*)与(.*)攻受(短)?文$',
                    /***执行方式***/
                    fnc: 'gsdw'
                }
            ]
        })

    }
    // 定义一个异步函数，用于生成攻受短文
    async gsdw(e) {
        // 提取消息中的第一个参数
        const msga = e.msg.match(/^[#/]?(.*)与(.*)攻受(短)?文$/)[1];
        // 提取消息中的第二个参数
        const msgb = e.msg.match(/^[#/]?(.*)与(.*)攻受(短)?文$/)[2];

        // 读取API配置文件
        let data = await fs.readFileSync('./plugins/xiaoye-plugin/config/AllAPI.json');
        const API = JSON.parse(data);

        // 读取Token配置文件
        let TK = await fs.readFileSync('./plugins/xiaoye-plugin/config/APITP.json');
        const TP = JSON.parse(TK);

        // 获取Token和密码
        let token = TP.Token;
        let password = TP.PassWord;

        // 根据配置文件选择API，并添加查询参数
        let api = API.api4.url + `?a=${msga}&b=${msgb}&n=1&token=${token}&password=${password}`;

        // 发起HTTP请求，获取数据
        const response = await fetch(api);
        let text = await response.text();

        // 检查返回的内容，判断是否因为额度用尽或配置错误导致的特定消息
        if (text === '（免费额度进群开通并每天签到获得）本站接口已接入付费功能，5/10/20等，5块钱=17500调用量，很便宜的说，如需继续使用接口，请联系QQ490593431进行兑换调用量，再不攒点消费，吃不起饭的说，不过分吧，购买方法https://blog.xiaobapi.top/index.php/archives/89/') {
            // 发送消息提示用户或管理员检查配置和额度
            e.reply([`返回内容为:${text}\n调用额度用尽或Token,Password错误，请检查配置文件APITP.json确认无误后请确认是否还有余额`]);
            // 阻止消息继续往下处理
            return true;
        }

        if (text === '密钥密码不正确，请检查参数是否填入password') {
            // 提示用户检查密码是否正确
            e.reply([`${text}(检查config下APITP.json文件)是否正确填入`]);
            // 阻止消息继续往下处理
            return true;
        }

        // 将获取的数据以文本形式回复给用户
        e.reply(text);

        // 阻止事件继续传播，确保其他插件不会重复处理同一消息
        return true;
    }
}
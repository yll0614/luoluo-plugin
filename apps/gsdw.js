import fetch from "node-fetch";
import fs from 'fs';
import plugin from '../../../lib/plugins/plugin.js';
import { Plugin_Name } from '../components/index.js';

export class gsdw extends plugin {
    constructor() {
        super({
            name: '攻受短文',
            dsc: 'gsdw',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?(.*)与(.*)攻受(短)?文$',
                    fnc: 'gsdw'
                }
            ]
        });
    }
    async gsdw(e) {
        const msga = e.msg.match(/^[#/]?(.*)与(.*)攻受(短)?文$/)[1];
        const msgb = e.msg.match(/^[#/]?(.*)与(.*)攻受(短)?文$/)[2];
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let TK = await fs.readFileSync(`./plugins/${Plugin_Name}/config/APITP.json`);
        const TP = JSON.parse(TK);
        let token = TP.Token;
        let password = TP.PassWord;
        let api = API.api4.url + `?a=${msga}&b=${msgb}&n=1&token=${token}&password=${password}`;
        const response = await fetch(api);
        let text = await response.text();
        if (text === '（免费额度进群开通并每天签到获得）本站接口已接入付费功能，5/10/20等，5块钱=17500调用量，很便宜的说，如需继续使用接口，请联系QQ490593431进行兑换调用量，再不攒点消费，吃不起饭的说，不过分吧，购买方法https://blog.xiaobapi.top/index.php/archives/89/') {
            e.reply([`返回内容为:${text}\n调用额度用尽或Token,Password错误，请检查配置文件APITP.json确认无误后请确认是否还有余额`]);
            return true;
        }
        if (text === '密钥密码不正确，请检查参数是否填入password') {
            e.reply([`${text}(检查config下APITP.json文件)是否正确填入`]);
            return true;
        }
        if (text === '您的余额已用完，请联系站长进行充值') {
            e.reply([`${text}又或者是你没填APITP.json`]);
            return true;
        }
        if (text === '请输入完整昵称！') {
            e.reply([`${text}`]);
            return true;
        }
        e.reply(text);
        return true;
    }
}
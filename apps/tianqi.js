import fetch from "node-fetch";
import fs from 'fs';
import plugin from '../../../lib/plugins/plugin.js';
import { Plugin_Path } from '../components/index.js';

export class tianqi extends plugin {
    constructor() {
        super({
            name: '天气',
            dsc: 'tianqi',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?(.*)天气$',
                    fnc: 'cstq'
                }
            ]
        });
    }
    async cstq(e) {
        const msg = e.msg.match(/^[#/]?(.*)天气$/)[1];
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let api = API.api6.url + `?city=${msg}`;
        let jx = await fetch(api);
        const Data = await jx.json();    
        let code = Data['code'];
        if (code === '-2') {
            e.reply(['请确认您的城市是否填写正确']);
            return true;
        } 
        if (code === '-4') {
            e.reply(['缺少参数，请在命令前添加城市名称']);
            return true;
        }/*
        if (code !== '200') {
            e.reply(['请求失败,请稍后再试或联系管理员!']);
            return true;
        }*/
        let citymsg = Data['data']['city'];
        let msg0 = Data['data']['data'][0]['date'];
        let msg1 = Data['data']['data'][0]['air_quality'];
        let msg2 = Data['data']['data'][0]['weather'];
        let msg3 = Data['data']['data'][0]['temperature'];
        let msg4 = Data['data']['data'][0]['wind'];
        let msg5 = Data['data']['data'][1]['date'];
        let msg6 = Data['data']['data'][1]['air_quality'];
        let msg7 = Data['data']['data'][1]['weather'];
        let msg8 = Data['data']['data'][1]['temperature'];
        let msg9 = Data['data']['data'][1]['wind'];
        let msg10 = Data['data']['data'][2]['date'];
        let msg11 = Data['data']['data'][2]['air_quality'];
        let msg12 = Data['data']['data'][2]['weather'];
        let msg13 = Data['data']['data'][2]['temperature'];
        let msg14 = Data['data']['data'][2]['wind'];
        let msg15 = Data['data']['data'][3]['date'];
        let msg16 = Data['data']['data'][3]['air_quality'];
        let msg17 = Data['data']['data'][3]['weather'];
        let msg18 = Data['data']['data'][3]['temperature'];
        let msg19 = Data['data']['data'][3]['wind'];
        e.reply([`当前查询城市:${citymsg}
昨天:
昨天是:${msg0}
空气质量:${msg1}
天气:${msg2}
温度:${msg3}
风向及强度:${msg4}

今天:
今天是:${msg5}
空气质量:${msg6}
天气:${msg7}
温度:${msg8}
风向及强度:${msg9}

明天:
明天是:${msg10}
空气质量:${msg11}
天气:${msg12}
温度:${msg13}
风向及强度:${msg14}

后天:
后天是:${msg15}
空气质量:${msg16}
天气:${msg17}
温度:${msg18}
风向及强度:${msg19}
`]);
        return true;
    }
}
import fetch from "node-fetch";
import fs from 'fs';
import plugin from '../../../lib/plugins/plugin.js';
import { Plugin_Path } from '../components/index.js';

export class ping extends plugin {
    constructor() {
        super({
            name: 'Ping',
            dsc: 'ping',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?ping地址(.*)$',
                    fnc: 'ping'
                }
            ]
        });
    }
    async ping(e) {
        const msg = e.msg.match(/^[#/]?ping地址(.*)$/)[1];
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let api = API.api7.url + `?format=json&ip=${msg}`;
        let jx = await fetch(api);
        const Data = await jx.json();
        let code = Data['code'];
       /* if (code !== '200') {
            e.reply([`访问主机失败,请检查IP地址或域名是否正确输入或稍后再试!`]);
            return true;
        }*/
        let msg0 = Data['data']['node'];
        let msg1 = Data['data']['host'];
        let msg2 = Data['data']['ip'];
        let msg3 = Data['data']['location'];
        let msg4 = Data['data']['ping_max'];
        let msg5 = Data['data']['ping_min'];
        let msg6 = Data['data']['ping_avg'];
        e.reply([`Ping节点:${msg0}\n
主机:${msg1}\n
主机IP地址:${msg2}\n
主机地理位置:${msg3}\n
最大Ping延迟:${msg4}\n
最小Ping延迟:${msg5}\n
平均延迟:${msg6}
`]);
        return true;
    }
}
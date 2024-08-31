import fetch from "node-fetch";
import fs from 'fs';
import plugin from '../../../lib/plugins/plugin.js';
import { Plugin_Path } from '../components/index.js';

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
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let api = API.api4.url + `?g=${msga}&s=${msgb}`;
        let jx = await fetch(api);
        const Data = await jx.json();
        let code = Data['code'];
        if (code != '0') {
            e.reply([`请求失败,请稍后再试或联系管理员!`]);
            return true;
        }
        let msg = Data['data']['msg'];
        e.reply(msg);
        return true;
    }
}
import fetch from "node-fetch";
import fs from 'fs';
import { Plugin_Path } from '../components/index.js';
import YAML from 'yaml';

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class yiyan extends plugin {
    constructor() {
        super({
            name: '一言',
            dsc: 'yiyan',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?一言',
                    fnc: 'yiyan'
                }
            ]
        });
    }

    async yiyan(e) {
        if (CONFIG_YAML.yiyan == false) {
            logger.info('[luoluo插件]一言已关闭');
            return false;
        }
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let apiUrl = API.api2.url;
        let response = await fetch(apiUrl);
        let text = await response.text();
        e.reply(text, true);
        return true;
    }
}
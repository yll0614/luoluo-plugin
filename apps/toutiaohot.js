import fetch from "node-fetch";
import fs from 'fs';
import { Plugin_Path } from '../components/index.js';
import YAML from 'yaml';

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class toutiaohot extends plugin {
    constructor() {
        super({
            name: '今日头条热搜榜',
            dsc: 'toutiaohot',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?今日头条热搜榜$',
                    fnc: 'toutiaohot'
                }
            ]
        });
    }

    async toutiaohot(e) {
        if (CONFIG_YAML.toutiaohot === false) {
            logger.info('[luoluo插件]今日头条热搜榜已关闭');
            return false;
        }

        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let api = API.api17.url;

        try {
            let response = await fetch(api);
            let Data = await response.json();
            let messages = [];
            for (let i = 0; i < 10; i++) {
                let name = Data['data'][i]['name'];
                let url = Data['data'][i]['url'];
                messages.push(`Top${i + 1}: ${name}\n链接: ${url}`);
            }
            e.reply(messages.join('\n\n'));
            return true;

        } catch (error) {
            e.reply('请求出现错误，请稍后重试或联系管理员!');
            return true;
        }
    }
}

import fetch from "node-fetch";
import fs from 'fs';
import { Plugin_Path } from '../components/index.js';
import YAML from 'yaml';

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class zhihuhot extends plugin {
    constructor() {
        super({
            name: '知乎热搜榜',
            dsc: 'zhihuhot',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?知乎热搜榜$',
                    fnc: 'zhihuhot'
                }
            ]
        })
    }

    async zhihuhot(e) {
        if (CONFIG_YAML.zhihuhot == false) {
            logger.error('知乎热搜榜已关闭');
            return false;
        }

        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let api = API.api15.url;

        try {
            let response = await fetch(api);
            let Data = await response.json();


            let msg = '知乎热搜榜前十名:\n\n';
            Data['data'].slice(0, 10).forEach((item, index) => {
                msg += `Top${index + 1}: ${item['name']}\n链接: ${item['url']}\n\n`;
            });

            e.reply(msg);
            return true;

        } catch (error) {
            e.reply('请求出现错误，请稍后重试或联系管理员!');
            return true;
        }
    }
}

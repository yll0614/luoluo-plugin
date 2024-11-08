import fetch from "node-fetch";
import fs from 'fs';
import { Plugin_Path } from '../components/index.js';
import YAML from 'yaml';

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class bilihot extends plugin {
    constructor() {
        super({
            name: '哔哩哔哩热搜榜',
            dsc: 'bilihot',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?哔哩哔哩热搜榜$',
                    fnc: 'bilihot'
                }
            ]
        });
    }

    async bilihot(e) {
        if (CONFIG_YAML.bilhot === false) {
            logger.info('[luoluo插件]哔哩哔哩热搜榜已关闭');
            return true;
        }

        const data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        const api = API.api14.url;

        try {
            const response = await fetch(api);
            const Data = await response.json();

            const messages = Data.data.map((item, index) =>
                `Top${index + 1}: 热搜词: ${item.name}\n热搜词链接: ${item.url}`
            );

            e.reply(messages.join('\n\n'));
            return true;

        } catch (error) {
            e.reply('请求出现错误，请稍后重试或联系管理员!');
            return true;
        }
    }
}

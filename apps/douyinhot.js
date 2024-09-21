import fetch from "node-fetch";
import fs from 'fs';
import plugin from '../../../lib/plugins/plugin.js';
import { Plugin_Path } from '../components/index.js';
import YAML from 'yaml';

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class douyinhot extends plugin {
    constructor() {
        super({
            name: '抖音热搜榜',
            dsc: 'douyinhot',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?抖音热搜榜$',
                    fnc: 'douyinhot'
                }
            ]
        });
    }

    async douyinhot(e) {
        if (CONFIG_YAML.douyinhot === false) {
            logger.error('抖音热搜榜已关闭');
            return false;
        }

        const data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        const api = API.api16.url;

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

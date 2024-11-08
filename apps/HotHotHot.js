import fetch from "node-fetch";
import fs from 'fs';
import { Plugin_Path } from '../components/index.js';
import YAML from 'yaml';

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class 热搜榜 extends plugin {
    constructor() {
        super({
            name: '[luoluo插件]热搜榜',
            dsc: 'luoluo插件热搜榜',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?知乎热搜榜$',
                    fnc: 'zhihuhot'
                },
                {
                    reg: '^[#/]?哔哩哔哩热搜榜$',
                    fnc: 'bilihot'
                },
                {
                    reg: '^[#/]?抖音热搜榜$',
                    fnc: 'douyinhot'
                },
                {
                    reg: '^[#/]?今日头条热点新闻$',
                    fnc: 'toutiaohotnew'
                },
                {
                    reg: '^[#/]?今日头条热点新闻$',
                    fnc: 'toutiaohotnew'
                }
            ]
        })
    }

    async zhihuhot(e) {
        if (CONFIG_YAML.zhihuhot == false) {
            logger.info('[luoluo插件]知乎热搜榜已关闭');
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
    async douyinhot(e) {
        if (CONFIG_YAML.douyinhot === false) {
            logger.info('[luoluo插件]抖音热搜榜已关闭');
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
    async toutiaohotnew(e) {
        if (CONFIG_YAML.toutiaohotnew === false) {
            logger.info('[luoluo插件]今日头条热点新闻已关闭');
            return false;
        }

        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let api = API.api14.url;

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

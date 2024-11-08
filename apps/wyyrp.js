import fetch from "node-fetch";
import fs from 'fs';
import { Plugin_Path } from '../components/index.js';
import YAML from 'yaml';

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class wyyrp extends plugin {
    constructor() {
        super({
            name: '网易云音乐热评',
            dsc: 'wyyrp',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?网易云热评$',
                    fnc: 'wyyrp'
                }
            ]
        });
    }

    async wyyrp(e) {
        if (CONFIG_YAML.wyyrp === false) {
            logger.info('[luoluo插件]网易云音乐热评已关闭');
            return false;
        }

        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`);
        const API = JSON.parse(data);
        let api = API.api3.url;

        try {
            let response = await fetch(api);
            let Data = await response.json();

            // 构建回复信息
            let msg = `歌曲名称: ${Data['data']['name']}\n` +
                `歌手: ${Data['data']['artist']}\n` +
                `歌曲页面地址: ${Data['data']['url']}\n` +
                `歌曲播放地址: ${Data['data']['src']}\n` +
                `歌曲封面地址: ${Data['data']['picurl']}\n` +
                `评论者昵称: ${Data['data']['artistsname']}\n` +
                `评论者头像地址: ${Data['data']['avatarurl']}\n` +
                `评论内容: ${Data['data']['content']}\n` +
                `点赞数: ${Data['data']['likedCount']}`;

            e.reply(msg);
            return true;

        } catch (error) {
            e.reply('请求出现错误，请稍后再试或联系管理员!', true);
            return true;
        }
    }
}

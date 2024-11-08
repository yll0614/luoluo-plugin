import fs from 'fs/promises';
import { Plugin_Path } from '../components/index.js';
import YAML from 'yaml';

let CONFIG_YAML = YAML.parse(await fs.readFile(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class qqtx extends plugin {

    constructor() {
        super({
            name: '获取QQ头像',
            dsc: 'qqtx',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?头像(.*)$',
                    fnc: 'qqtx'
                }
            ]
        });
    }

    async qqtx(e) {
        if (CONFIG_YAML.qqtx == false) {
            logger.info('[luoluo插件]QQ头像已关闭');
            return false;
        }

        try {
            let user_id = e.at || e.user_id;
            user_id = Number(user_id) || String(user_id);

            let data = await fs.readFile(`${Plugin_Path}/config/AllAPI.json`, 'utf8');
            const API = JSON.parse(data);

            if (!API.api10 || !API.api10.url) {
                throw new Error('API URL 不存在');
            }

            let api = `${API.api10.url}?dst_uin=${user_id}&spec=640`;
            e.reply([segment.image(api)]);
        } catch (err) {
            logger.error(`获取QQ头像时出错: ${err.message}`);
            e.reply('获取QQ头像失败，请稍后再试。');
        }

        return true;
    }
}

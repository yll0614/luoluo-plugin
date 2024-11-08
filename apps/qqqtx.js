import fs from 'fs'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
export class qqqtx extends plugin {
    constructor() {
        super({
            name: '获取QQ群头像',
            dsc: 'qqqtx',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?群头像$',
                    fnc: 'qqqtx'
                }
            ]
        })
    }
    async qqqtx(e) {
        if (CONFIG_YAML.qqqtx == false) {
            logger.info('[luoluo插件]QQ群头像已关闭');
            return false
        }
        try {
            let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
            const API = JSON.parse(data)
            let api = API.api11.url + `/${e.group_id}/${e.group_id}/640`
            e.reply([segment.image(`${api}`)])
        } catch (err) {
            logger.error(`获取QQ群头像时出错: ${err.message}`);
            e.reply('获取群头像失败，请稍后再试。');
        }

        return true
    }
}

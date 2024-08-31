import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
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
            logger.error('QQ群头像已关闭');
            return false
        }
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api11.url + `?qun=${e.group_id}`
        e.reply([segment.image(`${api}`)])
        return true
    }
}

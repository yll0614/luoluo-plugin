import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
export class wyjt extends plugin {
    constructor() {
        super({
            name: '网页截图',
            dsc: 'wyjt',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?网页截图(.*)$',
                    fnc: 'wyjt'
                }
            ]
        })
    }
    async wyjt(e) {
        if (CONFIG_YAML.wyjt == false) {
            logger.error('网页截图已关闭');
            return false
        }
        const msg = e.msg.match(/^[#/]?网页截图(.*)$/)[1]
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api9.url + `?url=${msg}`
        e.reply([segment.image(`${api}`)])
        return true
    }
}
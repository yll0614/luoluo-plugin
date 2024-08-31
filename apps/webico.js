import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
export class webico extends plugin {
    constructor() {
        super({
            name: '网站图标',
            dsc: 'webico',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?网站图标(.*)$',
                    fnc: 'webico'
                }
            ]
        })
    }
    async webico(e) {
        const msg = e.msg.match(/^[#/]?网站图标(.*)$/)[1]
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api20.url + `?url=${msg}`
        e.reply([segment.image(`${api}`)])
        return true
    }
}

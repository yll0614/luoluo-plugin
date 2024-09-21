import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
export class sjdmt extends plugin {
    constructor() {
        super({
            name: '随机动漫图',
            dsc: 'sjdmt',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?随机动漫图$',
                    fnc: 'sjdmt'
                }
            ]
        })
    }
        async sjdmt(e) {
        if (CONFIG_YAML.sjdmt == false) {
            logger.error('随机动漫图已关闭');
            return false
        }
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api12.url + `?format=json`
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']

        let msg = Data['data']['url']
         e.reply([segment.image(`${msg}`)])
         return true
     }
 }

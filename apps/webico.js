import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

export class qqtx extends plugin {
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
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api20.url + `?url=${msg}`
        e.reply([segment.image(`${api}`)])
        return true
    }
}

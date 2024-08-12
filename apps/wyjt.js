import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

export class wyjt extends plugin {
    constructor() {
        super({
            name: '网页截图',
            dsc: 'wyjt',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?截图(.*)$',
                    fnc: 'wyjt'
                }
            ]
        })
    }
    async wyjt(e) {
        const msg = e.msg.match(/^[#/]?截图(.*)$/)[1]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api9.url + `?url=${msg}`
        e.reply([segment.image(`${api}`)])
        return true
    }
}
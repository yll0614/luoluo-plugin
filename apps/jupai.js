import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

export class jupai extends plugin {
        constructor() {
        super({
            name: '小人举牌',
            dsc: 'jupai',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?举牌(.*)$',
                    fnc: 'jupai'
                }
            ]
        })
    }
    async jupai(e) {
        const msg = e.msg.match(/^[#/]?举牌(.*)$/)[1]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api19.url + `?msg=${msg}`
        e.reply([segment.image(`${api}`)])
        return true
    }
}

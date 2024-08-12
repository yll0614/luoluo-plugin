import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

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
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api11.url + `?qun=${e.group_id}`
        e.reply([segment.image(`${api}`)])
        return true
    }
}

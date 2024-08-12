import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

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
        })
    }
    async qqtx(e) {
        let user_id = e.at || e.user_id
        user_id = Number(user_id) || String(user_id)
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api10.url + `?qq=${user_id}`
         e.reply([segment.image(`${api}`)])
         return true
     }
 }

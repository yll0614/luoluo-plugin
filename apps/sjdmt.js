import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

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
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api12.url + `?format=json`
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '200') {
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            return true
        }
        let msg = Data['data']['url']
         e.reply([segment.image(`${msg}`)])
         return true
     }
 }

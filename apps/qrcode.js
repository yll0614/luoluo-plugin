import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Path } from '../components/index.js'

export class qrcode extends plugin {
    constructor() {
        super({
            name: '二维码生成',
            dsc: 'qrcode',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?生成二维码(.*)(大小)?(.*)$',
                    fnc: 'qrcode'
                }
            ]
        })
    }
   
    async qrcode(e) {
        const text = e.msg.match(/^[#/]?生成二维码(.*)$/)[1]
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api13.url + `text=${text}?&size=150`
        e.reply([segment.image(`${api}`)])
         return true
    }
}
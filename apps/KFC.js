import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

export class KFC extends plugin {
    constructor() {
        super({
            name: '疯狂星期四',
            dsc: 'KFC',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?疯狂星期四$',
                    fnc: 'KFC'
                }
            ]
        })
    }
    async KFC(e) {
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api21.url
        const response = await fetch(api)
        let text = await response.text()
        e.reply([`${text}`])
        return true
    }

}
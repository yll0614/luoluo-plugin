import fetch from "node-fetch"
import fs from 'fs'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
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
        if (CONFIG_YAML.KFC == false) {
            logger.error('哔哩哔哩热搜榜已关闭');
            return false
        }
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api21.url
        const response = await fetch(api)
        let text = await response.text()
        e.reply([`${text}`])
        return true
    }

}
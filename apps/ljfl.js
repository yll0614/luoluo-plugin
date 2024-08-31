import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
export class ljfl extends plugin {
    constructor() {
        super({
            dsc: 'ljfl',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?(.*)是什么垃圾$',
                    fnc: 'ljfl'
                }
            ]
        })
    }
    async ljfl(e) {
        const msg = e.msg.match(/^[#/]?(.*)是什么垃圾$/)[1]
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api8.url + `?format=json&kw=${msg}`
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']
        if (code == '400') {
            e.reply([`未找到相关结果`])
            return true
        }
        if (code != '200') {
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            return true
        }
        let msg0 = Data['data']['name']
        let msg1 = Data['data']['typeName']
        e.reply([`垃圾名称:${msg0}\n该垃圾是:${msg1}`])
    }
}
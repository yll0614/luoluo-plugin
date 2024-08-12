import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

export class zhihuhot extends plugin {
    constructor() {
        super({
            name: '知乎热搜榜',
            dsc: 'zhihuhot',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?知乎热搜榜$',
                    fnc: 'zhihuhot'
                }
            ]
        })
    }


    async zhihuhot(e) {
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api15.url
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '200') {
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            return true
        }

        let msg0 = '热搜词:' + Data['data'][0]['name']
        let msg1 = '热搜词:' + Data['data'][1]['name']
        let msg2 = '热搜词:' + Data['data'][2]['name']
        let msg3 = '热搜词:' + Data['data'][3]['name']
        let msg4 = '热搜词:' + Data['data'][4]['name']
        let msg5 = '热搜词:' + Data['data'][5]['name']
        let msg6 = '热搜词:' + Data['data'][6]['name']
        let msg7 = '热搜词:' + Data['data'][7]['name']
        let msg8 = '热搜词:' + Data['data'][8]['name']
        let msg9 = '热搜词:' + Data['data'][9]['name']

        let msga = '热搜词链接:' + Data['data'][0]['url']
        let msgb = '热搜词链接:' + Data['data'][1]['url']
        let msgc = '热搜词链接:' + Data['data'][2]['url']
        let msgd = '热搜词链接:' + Data['data'][3]['url']
        let msge = '热搜词链接:' + Data['data'][4]['url']
        let msgf = '热搜词链接:' + Data['data'][5]['url']
        let msgg = '热搜词链接:' + Data['data'][6]['url']
        let msgh = '热搜词链接:' + Data['data'][7]['url']
        let msgi = '热搜词链接:' + Data['data'][8]['url']
        let msgj = '热搜词链接:' + Data['data'][9]['url']
        e.reply([`${msg0}\n` + `${msga}\n
${msg1}\n` + `${msgb}\n
${msg2}\n` + `${msgc}\n
${msg3}\n` + `${msgd}\n
${msg4}\n` + `${msge}\n
${msg5}\n` + `${msgf}\n
${msg6}\n` + `${msgg}\n
${msg7}\n` + `${msgh}\n
${msg8}\n` + `${msgi}\n
${msg9}` + `${msgj}`])
        return true
    }
}

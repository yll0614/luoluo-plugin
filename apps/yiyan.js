import fetch from "node-fetch"
import fs from 'fs'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
async function LLAPITOGO(e, API) {
    let api = API.api2.url + `?format=json`
    let jx = await fetch(api)
    const Data = await (jx).json()
    let msg = '一言分类名称：' + Data['data']['catname']
    let msg2 = '一言作者：' + Data['data']['author']
    let msg1 = '一言来源：' + Data['data']['source']
    let msg3 = '一言内容：' + Data['data']['hitokoto']
    e.reply([`${msg}\n${msg1}\n${msg2}\n${msg3}`])
    return true
}
export class yiyan extends plugin {
    constructor() {
        super({
            name: '一言',
            dsc: 'yiyan',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?一言(.*)$',
                    fnc: 'yiyan'
                }
            ]
        })

    }
    async yiyan(e) {
        if (CONFIG_YAML.yiyan == false) {
            logger.info('[luoluo插件]一言已关闭');
            return false
        }
        const emsg = e.msg.match(/^[#/]?一言(.*)$/)[1]
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        if (emsg == 'json') {
            return LLAPITOGO(e, API);
        }
        if (emsg == 'JSON') {
            return LLAPITOGO(e, API);
        }
        if (emsg == 'Json') {
            return LLAPITOGO(e, API);
        }
        let api = API.api2.url
        const response = await fetch(api)
        let text = await response.text()
        e.reply([`${text}`])
        return true
    }

}

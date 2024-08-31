import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
export class wyyrp extends plugin {
    constructor() {
        super({
            name: '网易云音乐热评',
            dsc: 'wyyrp',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?网易云热评$',
                    fnc: 'wyyrp'
                }
            ]
        })
    }
    async wyyrp(e) {
        if (CONFIG_YAML.wyyrp == false) {
            logger.error('网易云音乐热评已关闭');
            return false
        }
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api3.url
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '0') {
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            return true
        }
        let msg0 = Data['data']['name']
        let msg1 = Data['data']['artist']
        let msg2 = Data['data']['url']
        let msg3 = Data['data']['src']
        let msg4 = Data['data']['picurl']
        let msg5 = Data['data']['artistsname']
        let msg6 = Data['data']['avatarurl']
        let msg7 = Data['data']['content']
        let msg8 = Data['data']['likedCount']
        e.reply([`歌曲名称:${msg0}\n
歌手:${msg1}\n
歌曲页面地址:${msg2}\n
歌曲播放地址:${msg3}\n
歌曲封面地址:${msg4}\n
评论者昵称:${msg5}\n
评论者头像地址:${msg6}\n
评论内容:${msg7}\n
点赞数:${msg8}`])
        return true
    }
}

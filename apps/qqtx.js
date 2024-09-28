import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Path } from '../components/index.js'

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
        if (CONFIG_YAML.qqtx == false) {
            logger.error('QQ头像已关闭');
            return false
        }
        try {
        let user_id = e.at || e.user_id
        user_id = Number(user_id) || String(user_id)
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api10.url + `?dst_uin=${user_id}&spec=640&img_type=jpg`
         e.reply([segment.image(`${api}`)])
        } catch (err) {
            logger.error(`获取QQ头像时出错: ${err.message}`);
            e.reply('获取QQ头像失败，请稍后再试。');
        }
         return true
     }
 }

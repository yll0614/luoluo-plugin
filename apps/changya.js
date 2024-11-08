import fetch from "node-fetch"
import fs from 'fs'
import { Plugin_Path } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));
export class changya extends plugin {
    constructor() {
        super({
            name: '唱鸭',
            dsc: 'changya',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?唱(鸭|呀)$',
                    fnc: 'changya'
                }
            ]
        })

    }
    async changya(e) {
        if (CONFIG_YAML.changya == false) {
            logger.info('[luoluo插件]唱鸭已关闭');
            return false
        }
        let data = await fs.readFileSync(`${Plugin_Path}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api23.url + `?type=json`
        try {
            let jx = await fetch(api)
            const Data = await (jx).json()
            await e.reply(segment.record(Data.data.song_url))
            e.reply([
                segment.image(Data.data.user_image),
                `\n歌曲名称: ${Data.data.song_name}\n歌手: ${Data.data.song_singer}\n翻唱: ${Data.data.user_singer}\n歌词:\n${Data.data.song_lyric}`
            ]);
            return true
        } catch (error) {
            logger.error('Error occurred:', error);
            e.reply(`发生错误: ${error.message}`);
            return true
        }
    }
}


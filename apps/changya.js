import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'

export class geci extends plugin {
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
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api23.url + `?type=json`
        try {
            let jx = await fetch(api)
            const Data = await (jx).json()
            if (Data.text !== '请求成功!') {
                e.reply(['请求失败,请稍后再试或联系管理员!']);
                return true;
            }
            await e.reply(segment.record(Data.data.song_url))
            e.reply([
                segment.image(Data.data.user_image),
                `\n歌曲名称: ${Data.data.song_name}\n歌手: ${Data.data.song_singer}\n翻唱: ${Data.data.user_singer}\n歌词:\n${Data.data.song_lyric}`
            ]);
            return true
        } catch (error) {
            console.error('Error occurred:', error);
            e.reply([`发生错误: ${error.message}`]);
            return true
        }
    }
}


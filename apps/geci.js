import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'
const clean =function clean(Lyrics) {
    Lyrics = Lyrics.replace(/\[(.*?)\]/g, '');
    //Lyrics = Lyrics.replace(/\n/g, ''); //这个用来删除换行符
    Lyrics = Lyrics.replace(/ /g, '');//这个用来删除空格
    Lyrics = Lyrics.trim();
    return Lyrics
}
export class geci extends plugin {
    constructor() {
        super({
            name: '获取歌词',
            dsc: 'geci',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?(.*)歌词$',
                    fnc: 'geci'
                }
            ]
        })
    }
    async geci(e) {
        const msg = e.msg.match(/^[#/]?(.*)歌词$/)[1]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api1.url+ `?name=${msg}&format=lrc&n=1&br=5`
        let jx = await fetch(api)
        const Data = await (jx).json()
        let codea = Data['code']
        if (codea != '0') {
            e.reply([`A请求失败,请稍后再试或联系管理员!`])
            return true
        }
        const  lyrics = Data['data']['lrc']['content']
        if (lyrics === undefined) {
            e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。']);
            return true;
        }
        const cleaned = clean(lyrics);
        e.reply(cleaned)
        return true
    }
}
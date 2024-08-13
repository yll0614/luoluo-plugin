import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'
const clean = function clean(Lyrics) {
    Lyrics = Lyrics.replace(/\[(.*?)\]/g, '');//删除时间标签
    //Lyrics = Lyrics.replace(/\n/g, ''); //这个用来删除换行符
    Lyrics = Lyrics.replace(/ /g, '');//这个用来删除空格
    Lyrics = Lyrics.trim();
    return Lyrics
}
export class geci extends plugin {
    constructor() {
        super({
            name: '获取歌词等',
            dsc: 'geci',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^[#/]?(.*)歌词(.*)$',
                    fnc: 'geci'
                },
                {
                    reg: '^[#/]?(.*)列表$',
                    fnc: 'gecilb'
                },
                {
                    reg: '^[#/]?(.*)歌曲(.*)$',
                    fnc: 'gequ'
                },
                {
                    reg: '^[#/]?(.*)音频(.*)$',
                    fnc: 'yp'
                }
            ]
        })
    }
    async geci(e) {
        const type = e.msg.match(/^[#/]?(.*)歌词(.*)?$/)[1]
        const n = e.msg.match(/^[#/]?(.*)歌词(.*)?$/)[2]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api;
        if (!n) {
            api = `${API.api1.url}?name=${type}&format=lrc&n=1&br=4`;
        } else {
            api = `${API.api1.url}?name=${type}&format=lrc&n=${n}&br=4`;
        }
        try {
            let jx = await fetch(api)
            const Data = await (jx).json()
            if (Data['code'] !== '0') {
                if (Data['code'] === '-201') {
                    e.reply(['暂无搜索结果']);
                } else {
                    e.reply(['请求失败,请稍后再试或联系管理员!']);
                }
                return true;
            }
            const lyrics = Data['data']['lrc']['content']
            if (lyrics === undefined) {
                e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。']);
                return true;
            }
            const cleaned = clean(lyrics);
            e.reply(cleaned)
            return true
        } catch (error) {
            console.error('Error occurred:', error);
            e.reply(['操作失败，请检查输入或稍后重试。']);
            return true
        }
    }
    async gecilb(e) {
        const type = e.msg.match(/^[#/]?(.*)列表$/)[1]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api1.url + `?name=${type}`
        let jx = await fetch(api)
        const Data = await (jx).json()
        if (Data['code'] !== '0') {
            if (Data['code'] === '-100') {
                e.reply(['暂无搜索结果']);
            } else {
                e.reply(['请输入要搜索的歌名']);
            }
            return true;
        }
        let msg = [];
        for (let i = 0; i < Math.min(Data['data'].length, 10); i++) {
            const song = Data['data'][i];
            msg.push(`${i + 1}. 歌名: ${song.songname}, 歌手: ${song.name}, 专辑: ${song.album}`);
        }
        e.reply(msg.join('\n\n'));
        return true
    }
    async gequ(e) {
        const type = e.msg.match(/^[#/]?(.*)歌曲(.*)?$/)[1]
        const n = e.msg.match(/^[#/]?(.*)歌曲(.*)?$/)[2]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api;
        if (!n) {
            api = `${API.api1.url}?name=${type}&format=lrc&n=1&br=4`;
        } else {
            api = `${API.api1.url}?name=${type}&format=lrc&n=${n}&br=4`;
        }
        try {
            let jx = await fetch(api)
            const Data = await (jx).json()
            //不知道为什么则一段不注释就一直返回 请求失败,请稍后再试或联系管理员!
            /* if (Data['code'] !== '0') {
                 if (Data['code'] === '-201') {
                     e.reply(['暂无搜索结果']);
                 } else {
                     e.reply(['请求失败,请稍后再试或联系管理员!']);
                 }
                 return true;
             }*/
            const lyrics = Data['data']['lrc']['content']
            if (lyrics === undefined) {
                e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。']);
                return true;
            }
            const cleaned = clean(lyrics);
            e.reply(cleaned)
            e.reply(segment.record(Data['data']['src']))
            return true
        } catch (error) {
            console.error('Error occurred:', error);
            e.reply(['操作失败，请检查输入或稍后重试。']);
            return true
        }
    } async yp(e) {
        const type = e.msg.match(/^[#/]?(.*)音频(.*)?$/)[1]
        const n = e.msg.match(/^[#/]?(.*)音频(.*)?$/)[2]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api;
        if (!n) {
            api = `${API.api1.url}?name=${type}&format=lrc&n=1&br=4`;
        } else {
            api = `${API.api1.url}?name=${type}&format=lrc&n=${n}&br=4`;
        }
        try {
            let jx = await fetch(api)
            const Data = await (jx).json()
            if (Data['code'] !== '0') {
                if (Data['code'] === '-201') {
                    e.reply(['暂无搜索结果']);
                } else {
                    e.reply([`请求失败,请稍后再试或联系管理员!${type}`]);
                }
                return true;
            }
            e.reply(segment.record(Data['data']['src']))
            return true
        } catch (error) {
            console.error('Error occurred:', error);
            e.reply(['操作失败，请检查输入或稍后重试。']);
            return true
        }
    }
}

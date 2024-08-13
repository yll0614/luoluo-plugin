import fetch from "node-fetch"
import fs from 'fs'
import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Name } from '../components/index.js'
const clean = function clean(Lyrics) {
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
                },
                {
                    reg: '^[#/]?(.*)列表$',
                    fnc: 'gecilb'
                },
                {
                    reg: '^[#/]?(.*)歌词音频$',
                    fnc: 'geciyp'
                },
                {
                    reg: '^[#/]?(.*)音频$',
                    fnc: 'yp'
                }
            ]
        })
    }
    async geci(e) {
        const type = e.msg.match(/^[#/]?(.*)歌词(.*)?$/)[1]
        const n = e.msg.match(/^[#/]?(.*)歌词(.*)?$/)[2]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        let QQskey = await fs.readFileSync(`./plugins/${Plugin_Name}/config/QQskey.json`)
        const Qskey = JSON.parse(QQskey)
        let skey = Qskey.data
        const API = JSON.parse(data)
        let api = API.api1.url + `?name=${type}&skey=${skey}&skey=${skey}&skey=${skey}&format=lrc&n=${n}&br=4`
        if (n == '') {
            let api = API.api1.url + `?name=${type}&skey=${skey}&skey=${skey}&format=lrc&n=1&br=4`
            let jx = await fetch(api)
            const Data = await (jx).json()
            let code = Data['code']
            if (code != '0') {
                e.reply([`请求失败,请稍后再试或联系管理员!`])
                return true
            }
            const lyrics = Data['data']['lrc']['content']
            if (lyrics === undefined) {
                e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。']);
                return true;
            }
            e.reply(segment.record(Data['data']['src']))
            const cleaned = clean(lyrics);
            e.reply(cleaned)
            return true
        }
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '0') {
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            return true
        }
        if (code == '-201') {
            e.reply([`暂无搜索结果`])
            return true
        }
        const lyrics = Data['data']['lrc']['content']
        if (lyrics === undefined) {
            e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。']);
            return true;
        }
        const cleaned = clean(lyrics);
        e.reply(cleaned)
        return true
    }



    async gecilb(e) {
        const type = e.msg.match(/^[#/]?(.*)列表$/)[1]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        let QQskey = await fs.readFileSync(`./plugins/${Plugin_Name}/config/QQskey.json`)
        const Qskey = JSON.parse(QQskey)
        const API = JSON.parse(data)
        let api = API.api1.url + `?name=${type}&skey=${skey}&skey=${skey}`
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '0') {
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            return true
        }
        if (code == '-100') {
            e.reply([`请输入要搜索的歌名`])
            return true
        }
        let msg = [];

        for (let i = 0; i < Math.min(Data['data'].length, 10); i++) {
            const song = Data['data'][i];
            msg.push(`${i + 1}. 歌名: ${song.songname}, 歌手: ${song.name}, 专辑: ${song.album}`);
        }

        e.reply(msg.join('\n\n'));
        return true
    }
    async geciyp(e) {
        const type = e.msg.match(/^[#/]?(.*)歌词音频(.*)?$/)[1]
        const n = e.msg.match(/^[#/]?(.*)歌词音频(.*)?$/)[2]
        let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
        const API = JSON.parse(data)
        let api = API.api1.url + `?name=${type}&skey=${skey}&skey=${skey}&format=lrc&n=${n}&br=4`
        if (n == '') {
            let api = API.api1.url + `?name=${type}&skey=${skey}&skey=${skey}&format=lrc&n=1&br=4`
            let jx = await fetch(api)
            const Data = await (jx).json()
            let code = Data['code']
            if (code != '0') {
                e.reply([`请求失败,请稍后再试或联系管理员!`])
                return true
            }
            const lyrics = Data['data']['lrc']['content']
            if (lyrics === undefined) {
                e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。']);
                return true;
            }
            e.reply(segment.record(Data['data']['src']))
            const cleaned = clean(lyrics);
            e.reply(cleaned)
            return true
        }
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '0') {
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            return true
        }
        if (code == '-201') {
            e.reply([`暂无搜索结果`])
            return true
        }
        const lyrics = Data['data']['lrc']['content']
        if (lyrics === undefined) {
            e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。']);
            return true;
        }
        e.reply(segment.record(Data['data']['src']))
        const cleaned = clean(lyrics);
        e.reply(cleaned)
        return true
    }


async yp(e) {
    const type = e.msg.match(/^[#/]?(.*)音频(.*)?$/)[1]
    const n = e.msg.match(/^[#/]?(.*)音频(.*)?$/)[2]
    let data = await fs.readFileSync(`./plugins/${Plugin_Name}/config/AllAPI.json`)
    let QQskey = await fs.readFileSync(`./plugins/${Plugin_Name}/config/QQskey.json`)
    const Qskey = JSON.parse(QQskey)
    let skey = Qskey.data
    const API = JSON.parse(data)
    let api = API.api1.url + `?name=${type}&skey=${skey}&format=lrc&n=${n}&br=4`
    if (n == '') {
        let api = API.api1.url + `?name=${type}&skey=${skey}&format=lrc&n=1&br=4`
        let jx = await fetch(api)
        const Data = await (jx).json()
        let code = Data['code']
        if (code != '0') {
            e.reply([`请求失败,请稍后再试或联系管理员!`])
            return true
        }
        const lyrics = Data['data']['lrc']['content']
        if (lyrics === undefined) {
            e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。']);
            return true;
        }
        e.reply(segment.record(Data['data']['src']))
        const cleaned = clean(lyrics);
        e.reply(cleaned)
        return true
    }
    let jx = await fetch(api)
    const Data = await (jx).json()
    let code = Data['code']
    if (code != '0') {
        e.reply([`请求失败,请稍后再试或联系管理员!`])
        return true
    }
    if (code == '-201') {
        e.reply([`暂无搜索结果`])
        return true
    }
    e.reply(segment.record(Data['data']['src']))
    return true
}
}
import fetch from 'node-fetch'
import fs from 'fs'
import { PluginPath } from '../components/index.js'
import YAML from 'yaml'

let CONFIG_YAML = YAML.parse(
  fs.readFileSync(`${PluginPath}/config/config.yaml`, 'utf8')
)

const clean = (Lyrics) => {
  Lyrics = Lyrics.replace(/\[(.*?)\]/g, '') // 删除时间标签
  Lyrics = Lyrics.replace(/ /g, '') // 删除空格
  return Lyrics.trim()
}

export class geci extends plugin {
  constructor () {
    super({
      name: '获取歌词等',
      dsc: 'geci',
      event: 'message',
      priority: 5000,
      rule: [
        { reg: '^[#/](.*)歌词(.*)$', fnc: 'geci' },
        { reg: '^[#/](.*)歌曲列表$', fnc: 'gecilb' },
        { reg: '^[#/](.*)歌曲(.*)$', fnc: 'gequ' },
        { reg: '^[#/](.*)音频(.*)$', fnc: 'yp' }
      ]
    })
  }

  async geci (e) {
    if (!CONFIG_YAML.geci) {
      logger.info('[luoluo插件]歌曲类功能已关闭')
      return false
    }

    const [type, n] = e.msg.match(/^[#/](.*)歌词(.*)?$/)
    const api = `${(await this.getAPI()).api1.url}?name=${type}&format=lrc&n=${n || 1}&br=4`

    try {
      const Data = await this.fetchData(api)
      const lyrics = Data.data.lrc.content

      if (!lyrics) {
        e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。'])
        return true
      }

      e.reply(clean(lyrics))
      return true
    } catch (error) {
      logger.error('Error occurred:', error)
      e.reply([`发生错误: ${error.message}`])
      return true
    }
  }

  async gecilb (e) {
    if (!CONFIG_YAML.geci) {
      logger.error('该功能已关闭，开启歌曲类即可')
      return false
    }

    const type = e.msg.match(/^[#/](.*)歌曲列表$/)[1]
    const api = `${(await this.getAPI()).api1.url}?name=${type}`
    const Data = await this.fetchData(api)

    const msg = Data.data
      .slice(0, 10)
      .map(
        (song, i) =>
          `${i + 1}. 歌名: ${song.songname}, 歌手: ${song.name}, 专辑: ${song.album}`
      )
      .join('\n\n')

    e.reply(msg)
    return true
  }

  async gequ (e) {
    if (!CONFIG_YAML.geci) {
      logger.error('该功能已关闭，开启歌曲类即可')
      return false
    }

    const [type, n] = e.msg.match(/^[#/](.*)歌曲(.*)?$/)
    const api = `${(await this.getAPI()).api1.url}?name=${type}&format=lrc&n=${n || 1}&br=4`

    try {
      const Data = await this.fetchData(api)
      const lyrics = Data.data.lrc.content

      if (!lyrics) {
        e.reply(['没有找到歌词数据，请确认歌曲名称是否正确。'])
        return true
      }

      //  e.reply(`请等待音频输出 具体所需时间视设备性能而定`);
      e.reply(segment.record(Data.data.src))
      e.reply(clean(lyrics))
      return true
    } catch (error) {
      console.error('Error occurred:', error)
      e.reply([`发生错误: ${error.message}`])
      return true
    }
  }

  async yp (e) {
    if (!CONFIG_YAML.geci) {
      logger.error('该功能已关闭，开启歌曲类即可')
      return false
    }

    const [type, n] = e.msg.match(/^[#/](.*)音频(.*)?$/)
    const api = `${(await this.getAPI()).api1.url}?name=${type}&format=lrc&n=${n || 1}&br=4`

    try {
      const Data = await this.fetchData(api)
      //  e.reply(`请等待音频输出 具体所需时间视设备性能而定`);
      e.reply(segment.record(Data.data.src))
      return true
    } catch (error) {
      console.error('Error occurred:', error)
      e.reply([`发生错误: ${error.message}`])
      return true
    }
  }

  async fetchData (api) {
    const response = await fetch(api)
    return await response.json()
  }

  async getAPI () {
    const data = await fs.readFileSync(`${PluginPath}/config/AllAPI.json`)
    return JSON.parse(data)
  }
}

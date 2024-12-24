import plugin from '../../../lib/plugins/plugin.js'
import { PluginPath } from '../components/index.js'
import fs from 'fs'
import YAML from 'yaml'

let CONFIG_YAML = YAML.parse(
  fs.readFileSync(`${PluginPath}/config/config.yaml`, 'utf8')
)

export class setting extends plugin {
  constructor () {
    super({
      name: 'll设置',
      dsc: 'luoluo-plugin-setting',
      event: 'message',
      priority: 1000,
      rule: [
        {
          reg: /^#?(ll|洛洛|luoluo)(插件)?(设置|修改)(一言|疯狂星期四|网易云热评|天气|歌曲类|唱鸭|随机表情包|攻受短文|ping地址|谁艾特我|是什么垃圾|随机动漫图|哔哩哔哩热搜榜|知乎热搜榜|抖音热搜榜|今日头条热搜榜|今日头条热点新闻|头像|群头像|举牌|网页截图|哔哩哔哩解析|更新推送)(开启|关闭)$/i,
          fnc: 'setting'
          // permission: "master",  //设置执行权限
        }
      ]
    })
  }

  async setting (e) {
    if (!this.e.isMaster) {
      e.reply('仅主人可用！')
      return true
    }

    let reg = /(?:一言|疯狂星期四|网易云热评|天气|歌曲类|唱鸭|随机表情包|攻受短文|ping地址|谁艾特我|是什么垃圾|随机动漫图|哔哩哔哩热搜榜|知乎热搜榜|抖音热搜榜|今日头条热搜榜|今日头条热点新闻|头像|群头像|举牌|网页截图|哔哩哔哩解析|更新推送)(开启|关闭)/i.exec(e.msg)
    if (!reg) {
      e.reply('命令格式错误或未匹配')
      return false
    }

    let [, type, status] = reg
    let settingKey = this.getSettingKey(type)
    let logMessage = `${type}已${status}\n开发者洛洛提醒您:\n为确保配置生效请自行重启`

    try {
      CONFIG_YAML[settingKey] = status === '开启'
      console.log(logMessage)
      let configContent = fs.readFileSync(
        `${PluginPath}/config/config.yaml`,
        'utf8'
      )
      let lines = configContent.split('\n')
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()
        if (line.startsWith(`${settingKey}: `)) {
          lines[i] = `${settingKey}: ${status === '开启'}`
          break
        }
      }
      let updatedContent = lines.join('\n')
      fs.writeFileSync(
        `${PluginPath}/config/config.yaml`,
        updatedContent,
        'utf8'
      )
      e.reply(logMessage)
      return true
    } catch (error) {
      // 错误处理
      console.error(`${type} 设置时发生错误:`, error)
      e.reply(`设置${type}时发生错误\n${error}`)
      return false
    }
  }

  getSettingKey (type) {
    const mapping = {
      一言: 'yiyan',
      疯狂星期四: 'KFC',
      网易云热评: 'wyyrp',
      天气: 'tianqi',
      歌曲类: 'geci',
      唱鸭: 'changya',
      随机表情包: 'sjbqb',
      攻受短文: 'gsdw',
      ping地址: 'ping',
      谁艾特我: 'shuianwo',
      是什么垃圾: 'ljfl',
      随机动漫图: 'sjdmt',
      哔哩哔哩热搜榜: 'bilihot',
      知乎热搜榜: 'zhihuhot',
      抖音热搜榜: 'douyinhot',
      今日头条热搜榜: 'toutiaohot',
      今日头条热点新闻: 'toutiaohotnew',
      头像: 'qqtx',
      群头像: 'qqqtx',
      举牌: 'jupai',
      网页截图: 'wyjt',
      哔哩哔哩解析: 'bilitv',
      更新推送: 'UpdateTask'
    }

    return mapping[type]
  }
}

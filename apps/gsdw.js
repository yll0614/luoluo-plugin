import fetch from 'node-fetch'
import fs from 'fs'
import { PluginPath } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(
  fs.readFileSync(`${PluginPath}/config/config.yaml`, 'utf8')
)
export class gsdw extends plugin {
  constructor () {
    super({
      name: '攻受短文',
      dsc: 'gsdw',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^[#/]?(.*)与(.*)攻受(短)?文$',
          fnc: 'gsdw'
        }
      ]
    })
  }

  async gsdw (e) {
    if (CONFIG_YAML.gsdw == false) {
      logger.info('[luoluo插件]攻受短文已关闭')
      return false
    }
    const msga = e.msg.match(/^[#/]?(.*)与(.*)攻受(短)?文$/)[1]
    const msgb = e.msg.match(/^[#/]?(.*)与(.*)攻受(短)?文$/)[2]
    let data = await fs.readFileSync(`${PluginPath}/config/AllAPI.json`)
    const API = JSON.parse(data)
    let api = API.api4.url + `?g=${msga}&s=${msgb}`
    let jx = await fetch(api)
    const Data = await jx.json()
    let msg = Data.data.msg
    e.reply(msg)
    return true
  }
}

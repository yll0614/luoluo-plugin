import fs from 'fs'
import { PluginPath } from '../components/index.js'
import YAML from 'yaml'
let CONFIG_YAML = YAML.parse(
  fs.readFileSync(`${PluginPath}/config/config.yaml`, 'utf8')
)
export class sjdmt extends plugin {
  constructor () {
    super({
      name: '随机动漫图',
      dsc: 'sjdmt',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^[#/]?随机动漫图$',
          fnc: 'sjdmt'
        }
      ]
    })
  }

  async sjdmt (e) {
    if (!CONFIG_YAML.sjdmt) {
      return logger.info('[luoluo插件]随机动漫图已关闭')
    }
    let data = await fs.readFileSync(`${PluginPath}/config/AllAPI.json`)
    const API = JSON.parse(data)
    let api = API.api12.url + '?format=json'
    let jx = await fetch(api)
    const Data = await jx.json()

    let msg = Data.data.url
    e.reply([segment.image(`${msg}`)])
    return true
  }
}

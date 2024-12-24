import fs from 'fs'
import { PluginPath } from '../components/index.js'
import puppeteer from 'puppeteer'
import YAML from 'yaml'

let CONFIG_YAML = YAML.parse(
  fs.readFileSync(`${PluginPath}/config/config.yaml`, 'utf8')
)

export class webico extends plugin {
  constructor () {
    super({
      name: '网站图标',
      dsc: '获取网站 favicon 图标',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^[#/]?网站图标(.*)$',
          fnc: 'webico'
        }
      ]
    })
  }

  async webico (e) {
    if (CONFIG_YAML.webico === false) {
      logger.info('[luoluo插件]网站图标功能已关闭')
      return false
    }

    const msg = e.msg.match(/^[#/]?网站图标(.*)$/)[1].trim()
    if (!msg) {
      e.reply('请提供一个有效的域名或网址', true)
      return false
    }

    const url = `http://${msg}`

    try {
      const faviconUrl = await this.getFavicon(url)
      if (faviconUrl) {
        e.reply([segment.image(faviconUrl)])
      } else {
        e.reply('无法找到网站的图标')
      }
    } catch (err) {
      logger.error(`获取网站图标时出错: ${err.message}`)
      e.reply('获取网站图标失败')
    }

    return true
  }

  async getFavicon (url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' })

      // 尝试从 <link> 标签中获取 favicon
      const favicon = await page.evaluate(() => {
        const iconLink = document.querySelector('link[rel~="icon"]')
        return iconLink ? iconLink.href : null
      })

      return favicon
    } catch (err) {
      throw new Error(`无法访问网站：${err.message}`)
    } finally {
      await browser.close()
    }
  }
}

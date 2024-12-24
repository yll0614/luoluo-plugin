import fetch from 'node-fetch'
import fs from 'fs'
import { PluginPath } from '../components/index.js'
import YAML from 'yaml'
import puppeteer from 'puppeteer'

let CONFIG_YAML = YAML.parse(
  fs.readFileSync(`${PluginPath}/config/config.yaml`, 'utf8')
)

export class tianqi extends plugin {
  constructor () {
    super({
      name: '天气',
      dsc: 'tianqi',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^[#/]?(.*)天气$',
          fnc: 'cstq'
        }
      ]
    })
  }

  async cstq (e) {
    if (!CONFIG_YAML.tianqi) {
      logger.info('[luoluo插件]天气功能已关闭')
      return e.reply('天气功能已关闭')
    }

    const city = e.msg.match(/^[#/]?(.*)天气$/)?.[1]
    if (!city) {
      return e.reply('请提供城市名称', true)
    }

    let data = await fs.promises.readFile(
      `${PluginPath}/config/AllAPI.json`,
      'utf8'
    )
    const API = JSON.parse(data)
    const api = `${API.api6.url}?city=${city}`

    try {
      let response = await fetch(api)
      let Data = await response.json()

      const code = Data.code
      if (code === '-2') {
        return e.reply('城市名称填写有误，请检查')
      }
      if (code === '-4') {
        return e.reply('缺少参数，请在命令前添加城市名称')
      }

      const citymsg = Data.data.city
      const days = ['昨天', '今天', '明天', '后天']
      const weatherInfo = Data.data.data
        .slice(0, 4)
        .map((weatherData, i) => ({
          day: days[i],
          date: weatherData.date,
          airQuality: weatherData.air_quality,
          weather: weatherData.weather,
          temperature: weatherData.temperature,
          wind: weatherData.wind
        }))

      const htmlContent = this.generateHTML(citymsg, weatherInfo)
      const buffer = await this.captureScreenshot(htmlContent)

      await e.reply(segment.image(buffer))
      return true
    } catch (error) {
      logger.error('天气数据获取失败:', error)
      return e.reply('天气数据获取失败，请稍后重试')
    }
  }

  generateHTML (citymsg, weatherInfo) {
    return `
            <html>
                <head>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            margin: 0;
                            padding: 10px; 
                            width: 250px; 
                            background: linear-gradient(135deg, #74ebd5, #ACB6E5);
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            color: #333;
                        }
                        .weather-day {
                            margin-bottom: 10px; 
                            padding: 10px;
                            border-radius: 5px;
                            background: rgba(249, 249, 249, 0.9);
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                        }
                        .day-title {
                            font-size: 20px; 
                            font-weight: bold;
                        }
                        .footer-text {
                            margin-top: auto; /* 将该元素推到底部 */
                            text-align: center; /* 文字居中 */
                            font-size: 18px; /* 字体大小 */
                            color: #333; /* 文字颜色 */
                        }
                    </style>
                </head>
                <body>
                    <div>
                        <h2 style="margin: 0;">天气信息 - ${citymsg}</h2>
                        ${weatherInfo
                          .map(
                            (info) => `
                            <div class="weather-day">
                                <div class="day-title">${info.day}</div>
                                <div>日期: ${info.date}</div>
                                <div>空气质量: ${info.airQuality}</div>
                                <div>天气: ${info.weather}</div>
                                <div>温度: ${info.temperature}</div>
                                <div>风向及强度: ${info.wind}</div>
                            </div>
                        `
                          )
                          .join('')}
                    </div>
                    <div class="footer-text"> </div> 
                </body>
            </html>
        `
  }

  async captureScreenshot (htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent)

    // 等待页面加载完成
    await page.waitForTimeout(100)

    // 计算内容的高度
    const bodyHandle = await page.$('body')
    const { height } = (await bodyHandle.boundingBox()) || { height: 0 }
    await bodyHandle.dispose()

    // 确保 height 是有效的
    if (height <= 0) {
      throw new Error('无法计算有效的高度')
    }

    const buffer = await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 250,
        height: Math.ceil(height)
      },
      omitBackground: true
    })

    await browser.close()
    return buffer
  }
}

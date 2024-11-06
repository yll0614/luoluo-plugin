import puppeteer from 'puppeteer'; // 直接从 puppeteer 导入
import { segment } from 'oicq';
import YAML from 'yaml';
import fs from 'fs';
import { Plugin_Path } from '../components/index.js';

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class Example extends plugin {
    constructor() {
        super({
            name: '[ll]网页截图预览',
            priority: 5000,
            rule: [
                {
                    reg: '网页截图(.*)',
                    fnc: 'autoScreenshot'
                }
            ]
        });
    }

    async autoScreenshot(e) {
        if (CONFIG_YAML.wyjt == false) {
            logger.error('网页截图已关闭');
            return false;
        }
        const url = this.extractUrl(e.msg);
        return url ? this.processUrl(url, e) : false;
    }

    extractUrl(message) {
        const urlPattern = /https?:\/\/[^\s]+/;
        const match = message.match(urlPattern);
        if (match) return this.ensureHttpScheme(match[0]);

        const simpleUrlPattern = /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\/[^\s]*)?/;
        const simpleMatch = message.match(simpleUrlPattern);
        return simpleMatch ? this.ensureHttpScheme(simpleMatch[0]) : '';
    }

    ensureHttpScheme(url) {
        return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
    }

    async processUrl(url, e) {
        const blockedPrefixes = ['http://tencent', 'http://com.tencent', 'https://tencent', 'https://com.tencent'];
        if (blockedPrefixes.some(prefix => url.startsWith(prefix))) return;

        try {
            const completionTime = new Date().toLocaleString();
            await e.reply('正在等待网页响应，响应后将开始截图，请稍候', false);
            if (url.includes('gchat.qpic.cn')) {
                await segment.image(url), true;
            } else {
                const img = await this.captureScreenshot(url);
              //  await e.reply(`截图完成时间：${completionTime}`,
                    segment.image(img), true;
            }
        } catch (err) {
            console.error(`截图错误 ${url}: ${err.message}`);
            e.reply(`截图错误 ${url}: ${err.message}`);
        }
    }


    async captureScreenshot(url) {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                headless: "new",
                defaultViewport: { width: 1280, height: 720 },
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--remote-debugging-port=9222'
                ]
            });
            const page = await browser.newPage();

            try {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
                const screenshot = await page.screenshot({ fullPage: true });
                return screenshot;
            } catch (err) {
                if (err.name === 'TimeoutError') throw new Error('网页访问超时');
                if (err.message.includes('net::ERR_NAME_NOT_RESOLVED')) throw new Error('无法解析域名');
                throw err;
            } finally {
                await page.close();
                await browser.close();
            }
        } catch (err) {
            throw new Error(`启动浏览器或截图时出错: ${err.message}`);
        }
    }


}

import plugin from '../../../lib/plugins/plugin.js'
import { Plugin_Path } from '../components/index.js'
import fs from 'fs'
import YAML from 'yaml'

let CONFIG_YAML = YAML.parse(fs.readFileSync(`${Plugin_Path}/config/config.yaml`, 'utf8'));

export class setting extends plugin {
    constructor() {
        super({
            name: 'll设置',
            dsc: 'luoluo-plugin-setting',
            event: 'message',
            priority: 1000,
            rule: [
                {
                    reg: `^#?(ll|LL|Ll|lL|luoluo|落落|luoluo插件|ll插件|LL插件|Ll插件|lL插件)(设置|修改)(一言|疯狂星期四|网易云热评|天气|列表|歌词|音频|歌曲|唱鸭|随机表情包|攻受短文|ping地址|谁艾特我|是什么垃圾|随机动漫图|哔哩哔哩热搜榜|知乎热搜榜|抖音热搜榜|今日头条热搜榜|今日头条热点新闻|生成二维码|头像|群头像|举牌|网页截图|表情包|哔哩哔哩解析|更新推送)(开启|关闭)$`,
                    fnc: 'setting',
                    // permission: "master",  //设置执行权限
                }
            ]
        });
    }

    async setting(e) {
        if (!this.e.isMaster) {
            e.reply('仅主人可用！');
            return true;
        }

        let reg = new RegExp(`(一言|疯狂星期四|网易云热评|天气|列表|歌词|音频|歌曲|唱鸭|随机表情包|攻受短文|ping地址|谁艾特我|是什么垃圾|随机动漫图|哔哩哔哩热搜榜|知乎热搜榜|抖音热搜榜|今日头条热搜榜|今日头条热点新闻|生成二维码|头像|群头像|举牌|网页截图|表情包|哔哩哔哩解析|更新推送)(开启|关闭)`).exec(e.msg);
        if (!reg) {
            e.reply('命令格式错误或未匹配');
            return false;
        }

        let [, type, status] = reg;
        let settingKey = this.getSettingKey(type);
        let logMessage = `${type}已${status}\n开发者落落提醒您:\n为确保配置生效请自行重启`;

        try {
            CONFIG_YAML[settingKey] = status === '开启';
            console.log(logMessage);

            fs.writeFileSync(`${Plugin_Path}/config/config.yaml`, YAML.stringify(CONFIG_YAML), 'utf8');
            e.reply(logMessage);
            return true;
        } catch (error) {
            console.error(`${type} 设置时发生错误:`, error);
            e.reply(`设置${type}时发生错误\n${error}`);
            return false;
        }
    }

    getSettingKey(type) {
        const mapping = {
            '一言': 'hitokoto',
            '疯狂星期四': 'crazyThursday',
            '网易云热评': 'neteaseComments',
            '天气': 'weather',
            '列表': 'songList',
            '歌词': 'lyrics',
            '音频': 'audio',
            '歌曲': 'song',
            '唱鸭': 'singDuck',
            '随机表情包': 'randomEmoticon',
            '攻受短文': 'shortStory',
            'ping地址': 'pingAddress',
            '谁艾特我': 'whoMentionedMe',
            '是什么垃圾': 'trashCategory',
            '随机动漫图': 'randomAnimeImage',
            '哔哩哔哩热搜榜': 'bilibiliHotSearch',
            '知乎热搜榜': 'zhihuHotSearch',
            '抖音热搜榜': 'douyinHotSearch',
            '今日头条热搜榜': 'toutiaoHotSearch',
            '今日头条热点新闻': 'toutiaoHotNews',
            '生成二维码': 'generateQRCode',
            '头像': 'avatar',
            '群头像': 'groupAvatar',
            '举牌': 'signBoard',
            '网页截图': 'webScreenshot',
            '表情包': 'emoticonPack',
            '哔哩哔哩解析': 'bilitv',
            '更新推送': 'UpdateTask'
        };

        return mapping[type];
    }
}

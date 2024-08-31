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
                    reg: `^#?(ll|LL|Ll|lL|luoluo|落落|luoluo插件|ll插件|LL插件|Ll插件|lL插件)(设置|修改)(更新推送|哔哩哔哩解析)(开启|关闭)$`,
                    fnc: 'setting',
                   // permission: "master",  //设置执行权限
                }
            ]
        });
    }

    async setting(e) {
        if (!this.e.isMaster) { 
        e.reply('仅主人可用！')
            return true
         }
        let reg = new RegExp(`(更新推送|哔哩哔哩解析)(开启|关闭)`).exec(e.msg);
        if (!reg) {
            e.reply('命令格式错误或未匹配');
            return false;
        }

        let [, type, status] = reg;
        let settingKey;
        let logMessage;

        if (type === '更新推送') {
            settingKey = 'UpdateTask';
            logMessage = `更新推送已${status}`;
        } else if (type === '哔哩哔哩解析') {
            settingKey = 'bilitv';
            logMessage = `哔哩哔哩解析已${status}`;
        }

        try {
            if (status === '开启') {
                CONFIG_YAML[settingKey] = true;
                console.log(logMessage);
            } else if (status === '关闭') {
                CONFIG_YAML[settingKey] = false;
                console.log(logMessage);
            }

            fs.writeFileSync(`${Plugin_Path}/config/config.yaml`, YAML.stringify(CONFIG_YAML), 'utf8');
            e.reply(logMessage);
            return true;
        } catch (error) {
            console.error(`${type} 设置时发生错误:`, error);
            e.reply(`设置${type}时发生错误\n${error}`);
            return false;
        }
    }
}

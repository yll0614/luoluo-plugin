import { exec } from "child_process";
import fs from "fs";
import os from "os";
import { PluginPath } from "../components/index.js";
import YAML from "yaml";
import iconv from "iconv-lite";
let CONFIG_YAML = YAML.parse(
  fs.readFileSync(`${PluginPath}/config/config.yaml`, "utf8"),
);
export class ping extends plugin {
  constructor() {
    super({
      name: "Ping",
      dsc: "本地Ping",
      event: "message",
      priority: 5000,
      rule: [
        {
          reg: "^[#/]?ping地址(.*)$",
          fnc: "ping",
        },
      ],
    });
  }

  async ping(e) {
    if (CONFIG_YAML.ping === false) {
      logger.info("[luoluo插件]ping功能已关闭");
      return false;
    }

    const msg = e.msg.match(/^[#/]?ping地址(.*)$/)[1].trim();
    if (!msg) {
      e.reply("请提供一个有效的IP地址或域名");
      return false;
    }

    try {
      const pingResult = await this.runPingCommand(msg);
      e.reply(pingResult);
    } catch (err) {
      logger.error(`Ping操作出错: ${err.message}`);
      e.reply("Ping失败，请检查IP地址或域名是否正确");
    }

    return true;
  }

  runPingCommand(address) {
    const platform = os.platform(); // 获取操作系统平台
    const pingCommand =
      platform === "win32" ? `ping -n 4 ${address}` : `ping -c 4 ${address}`;

    return new Promise((resolve, reject) => {
      exec(pingCommand, { encoding: "buffer" }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
          return;
        }
        // 将 Buffer 转换为 UTF-8 编码的字符串
        const output = iconv.decode(stdout, "gbk");
        resolve(output);
      });
    });
  }
}

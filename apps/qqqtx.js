import fs from "fs";
import { Plugin_Path } from "../components/index.js";
import YAML from "yaml";
let CONFIG_YAML = YAML.parse(
  fs.readFileSync(`${Plugin_Path}/config/config.yaml`, "utf8"),
);
export class qqqtx extends plugin {
  constructor() {
    super({
      name: "获取QQ群头像",
      dsc: "qqqtx",
      event: "message",
      priority: 5000,
      rule: [
        {
          reg: "^[#/]?群头像$",
          fnc: "qqqtx",
        },
      ],
    });
  }
  async qqqtx(e) {
    if (CONFIG_YAML.qqqtx == false && e.isGroup) {
      logger.info("[luoluo插件]QQ群头像已关闭");
      return false;
    } else
      return e.isGroup ? e.reply(segment.image(e.group.getAvatarUrl())) : false;
  }
}

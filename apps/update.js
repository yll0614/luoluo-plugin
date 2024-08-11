let Update
const PLUGIN_NAME = "luoluo-plugin"
try {
  Update = (await import("../../other/update.js")).update
} catch {
  logger.warn("[luoluo-plugin] 导入本体更新模块失败，将无法使用 #luoluo更新 命令")
}

export class luoluoupdate extends plugin {
  constructor() {
    super({
      name: "落落更新插件",
      event: "message",
      priority: 1000,
      rule: [
        {
          reg: "^#(luoluo|落落)(插件)?(强制)?更新$",
          fnc: "update"
        },
        {
          reg: "^#(luoluo|落落)(插件)?更新日志$",
          fnc: "updateLog"
        }
      ]
    })
  }

  async update(e = this.e) {
    const Type = e.msg.includes("强制") ? "#强制更新" : "#更新"
    e.msg = Type + PLUGIN_NAME
    const up = new Update(e)
    up.e = e
    return up.update()
  }

  async updateLog(e = this.e) {
    e.msg = "#更新日志" + PLUGIN_NAME
    const up = new Update(e)
    up.e = e
    return up.updateLog()
  }
}

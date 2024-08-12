import plugin from '../../../lib/plugins/plugin.js'
import lodash from 'lodash'
import { render, Data } from '../components/index.js'
import Theme from './Help/Helptheme.js'

export class luoluo_help extends plugin {
  constructor() {
    super({
      name: 'luoluo帮助',
      dsc: 'luoluohelp',
      event: 'message',
      priority: 1000,
      rule: [
        {
          reg: '^#?(ll|LL|Ll|lL|luoluo|落落|luoluo插件|ll插件|LL插件|Ll插件|lL插件|luoluo插件)(帮助|help|指令|菜单|命令)$',
          fnc: 'ahelp'
        },
        {
          reg: '^#?表情包帮助$',
          fnc : 'bqbhelp'
        }
      ]
    });
  }
  async ahelp() {
    return await help(this.e);
  }
  async bqbhelp() {
    return await help1(this.e)
  }
}
async function help(e) {
  let custom = {}
  let help = {}
  let { diyCfg, sysCfg } = await Data.importCfg('help')
  custom = help
  let helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg)
  let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList
  let helpGroup = []
  lodash.forEach(helpList, (group) => {
    if (group.auth && group.auth === 'master' && !e.isMaster) {
      return true
    }
    lodash.forEach(group.list, (help) => {
      let icon = help.icon * 1
      if (!icon) {
        help.css = 'display:none'
      } else {
        let x = (icon - 1) % 10
        let y = (icon - x - 1) / 10
        help.css = `background-position:-${x * 50}px -${y * 50}px`
      }
    })
    helpGroup.push(group)
  })
  let themeData = await Theme.getThemeData(diyCfg.helpCfg || {}, sysCfg.helpCfg || {})
  return await render('help/index', {
    helpCfg: helpConfig,
    helpGroup,
    ...themeData,
    element: 'default'
  }, { e, scale: 1 })
}

async function help1(e) {
  let custom = {}
  let bqbhelp = {}
  let { diyCfg, sysCfg } = await Data.importCfg('help')
  custom = bqbhelp
  let helpConfig = lodash.defaults(diyCfg.bqbhelpCfg || {}, custom.bqbhelpCfg, sysCfg.bqbhelpCfg)
  let helpList = diyCfg.bqbhelpList || custom.bqbhelpList || sysCfg.bqbhelpList
  let helpGroup = []
  lodash.forEach(helpList, (group) => {
    if (group.auth && group.auth === 'master' && !e.isMaster) {
      return true
    }
    lodash.forEach(group.list, (help) => {
      let icon = help.icon * 1
      if (!icon) {
        help.css = 'display:none'
      } else {
        let x = (icon - 1) % 10
        let y = (icon - x - 1) / 10
        help.css = `background-position:-${x * 50}px -${y * 50}px`
      }
    })
    helpGroup.push(group)
  })
  let themeData = await Theme.getThemeData(diyCfg.bqbhelpCfg || {}, sysCfg.bqbhelpCfg || {})
  return await render('help/index', {
    helpCfg: helpConfig,
    helpGroup,
    ...themeData,
    element: 'default'
  }, { e, scale: 1 })
}
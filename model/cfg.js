import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import { _paths } from './paths.js'
import YamlReader from './YamlReader.js'

/** 配置文件 */
class GuobaExampleConfig {
  constructor() {
    /** 默认配置 */
    this.defSet = {
      path: path.join(_paths.pluginRoot, 'config/defSet/config.yaml'),
      reader: null,
    }
    /** 用户配置 */
    this.config = {
      path: path.join(_paths.pluginRoot, 'config/config.yaml'),
      reader: null,
    }
    this.initConfig()
  }

  /** 合并默认配置和用户配置 */
  get merged() {
    return lodash.merge({}, this.defSet.reader.jsonData, this.config.reader.jsonData)
  }

  /** 通过配置路径获取值 */
  get(keyPath) {
    return lodash.get(this.merged, keyPath)
  }

  set(keyPath, value) {
    this.config.reader.set(keyPath, value)
  }

}

/** GuobaExample配置 */
export default new GuobaExampleConfig()

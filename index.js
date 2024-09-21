import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

let is_icqq = false;
let is_oicq = false;
let loadedFilesCount = 0;
let loadedFilesCounterr = 0;
let apps;
const moduleCache = new Map();

try {
  let icqq = await import("icqq");
  if (icqq) is_icqq = true;
} catch (err) {
  try {
    let oicq = await import("oicq");
    if (oicq) is_oicq = true;
  } catch (err) { }
}

if (!global.segment) {
  global.segment = (await import("oicq")).segment;
}

// 获取当前文件的绝对路径
let __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在目录的绝对路径
let __dirname = path.dirname(__filename);

let ConfigPath = __dirname;

// 确保文件存在，如果不存在则创建文件并写入内容
async function ensureFileExists(src, dest, defaultContent = '') {
  try {
    const fileExists = await fs.access(dest).then(() => true).catch(() => false);
    if (!fileExists) {
      // 如果源文件不存在，则写入默认内容
      if (!src) {
        await fs.writeFile(dest, defaultContent, 'utf8');
        logger.info(`已创建文件 ${dest} 并写入默认内容`);
      } else {
        await fs.copyFile(src, dest);
        logger.info(`已从 ${src} 复制文件到 ${dest}`);
      }
    }
  } catch (err) {
    console.error(`落落插件载入错误:`, err.message);
  }
}

// 插件加载时自动创建并写入文件
async function initializePlugin() {
  // 自动创建配置文件并写入默认内容
  const yamlContent = `
# config.yaml
# 一言设置
yiyan: true
# 疯狂星期四设置
KFC: true
# 网易云热评设置
wyyrp: true
# 天气查询设置
tianqi: true
# 歌曲类设置
geci: true
# 唱鸭设置
changya: true
# 随机表情包设置
sjbqb: true
# 攻受短文设置
gsdw: true
# ping 地址设置
ping: true
# 谁艾特我设置
shuianwo: true
# 垃圾分类设置
ljfl: true
# 随机动漫图设置
sjdmt: true
# 哔哩哔哩热搜榜设置
bilihot: true
# 知乎热搜榜设置
zhihuhot: true
# 抖音热搜榜设置
douyinhot: true
# 今日头条热搜榜设置
toutiaohot: true
# 今日头条热点新闻设置
toutiaohotnew: true
# 头像设置
qqtx: true
# 群头像设置
qqqtx: true
# 举牌设置
jupai: true
# 网页截图设置
wyjt: true
# 哔哩哔哩解析设置
bilitv: true
# 更新推送设置
UpdateTask: true
  `;
  const jsonContent = `
  {
    "QQskey": ""
  }
  `;
  await ensureFileExists(null, path.join(ConfigPath, 'config/config.yaml'), yamlContent);
  await ensureFileExists(null, path.join(ConfigPath, 'config/QQskey.json'), jsonContent);

  // 加载插件
  const startTime = Date.now();
  const { apps: loadedApps, loadedFilesCount: count, loadedFilesCounterr: counterr } = await appsOut({ AppsName: 'apps' });
  const endTime = Date.now();

  apps = loadedApps;
  loadedFilesCount = count;
  loadedFilesCounterr = counterr;

  // 输出日志
  logger.info('------（-＾〇＾-）-----');
  logger.info('落落插件初始化完成');
  logger.info('-----(/^▽^)/------');
  logger.info(logger.yellow(`[luoluo-plugin] 共加载了 ${loadedFilesCount} 个函数 ${loadedFilesCounterr} 个失败 耗时 ${endTime - startTime} 毫秒`));
}

// 遍历目录并加载插件
async function appsOut({ AppsName }) {
  const firstName = path.join('plugins', 'luoluo-plugin');
  const filepath = path.resolve(firstName, AppsName);
  let loadedFilesCount = 0;
  let loadedFilesCounterr = 0;
  const apps = {};

  try {
    const jsFilePaths = await traverseDirectory(filepath);
    await Promise.all(jsFilePaths.map(async (item) => {
      try {
        const allExport = moduleCache.has(item)
          ? moduleCache.get(item)
          : await import(`file://${item}`);

        for (const key of Object.keys(allExport)) {
          if (typeof allExport[key] === 'function' && allExport[key].prototype) {
            let className = key;
            if (Object.prototype.hasOwnProperty.call(apps, className)) {
              let counter = 1;
              while (Object.prototype.hasOwnProperty.call(apps, `${className}_${counter}`)) {
                counter++;
              }
              className = `${className}_${counter}`;
              logger.info(`[luoluo-plugin] 同名导出 ${key} 重命名为 ${className} : ${item}`);
            }
            apps[className] = allExport[key];
            loadedFilesCount++;
          }
        }
      } catch (error) {
        logger.error(`[luoluo-plugin] 加载 ${item} 文件失败: ${error.message}`);
        loadedFilesCounterr++;
      }
    }));
  } catch (error) {
    logger.error('读取插件目录失败:', error.message);
  }

  return { apps, loadedFilesCount, loadedFilesCounterr };
}

// 遍历目录，获取所有JS文件
async function traverseDirectory(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    const jsFiles = [];
    for (const file of files) {
      const pathname = path.join(dir, file.name);
      if (file.isDirectory()) {
        jsFiles.push(...await traverseDirectory(pathname));
      } else if (file.isFile() && file.name.endsWith('.js')) {
        jsFiles.push(pathname);
      }
    }
    return jsFiles;
  } catch (error) {
    console.error('读取插件目录失败:', error.message);
    return [];
  }
}

// 插件初始化
initializePlugin();

import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appsDir = path.join(__dirname, 'apps');

let successCount = 0;
let failureCount = 0;

const startTime = Date.now();
let apps = {};

logger.info(`\t${chalk.cyan('LuoLuo插件载入中···')}`);

const source = path.join(__dirname, 'config/defSet/config.yaml');
const target = path.join(__dirname, 'config/config.yaml');

fs.copyFile(source, target, (err) => {
  if (err) {
    console.error('[LuoLuo插件]配置文件载入失败：', err);
  } else {
    logger.debug('[LuoLuo插件]配置文件载入成功');
  }
});
try {
  const files = (await fs.readdir(appsDir)).filter(file => file.endsWith('.js'));

  const filePaths = files.map(file => ({
    name: path.basename(file, '.js'),
    filePath: pathToFileURL(path.join(appsDir, file)).href
  }));
  const loadModules = filePaths.map(async ({ name, filePath }) => {
    try {
      const moduleExports = await import(filePath);
      const defaultExport = moduleExports?.default || moduleExports[Object.keys(moduleExports)[0]];
      apps[name] = defaultExport;
      logger.debug(`LuoLuo插件成功载入：${chalk.green(name)}`);
      successCount++;
    } catch (error) {
      logger.error(`LuoLuo插件载入错误：${chalk.red(name)}`);
      logger.error(error);
      failureCount++;
    }
  });

  await Promise.allSettled(loadModules);

} catch (error) {
  logger.error(`读取文件时出错：${chalk.red(error.message)}`);
}

const endTime = Date.now();
const elapsedTime = (endTime - startTime);

logger.info(`${chalk.cyan('-------------------')}`);
logger.info(`${chalk.green('LuoLuo插件载入完成')}`);
logger.info(`成功加载：${chalk.green(successCount)} 个`);
logger.info(`加载失败：${chalk.red(failureCount)} 个`);
logger.info(`总耗时：${chalk.yellow(elapsedTime)} 毫秒`);
logger.info(`${chalk.cyan('-------------------')}`);

export { apps };
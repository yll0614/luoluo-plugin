import fetch from 'node-fetch';
import fs from 'fs';
import plugin from '../../../lib/plugins/plugin.js';
import cfg from '../../../lib/config/config.js';
import { exec } from 'child_process';
import path from 'node:path';
import moment from 'moment';

const prefix = 'bubble:codeUpdateTask:';
let REPOSITORY_LIST = [];
const GITEE_TOKEN = 'b6e769e57c1d4e7c8c9887988335a6c7';
const CUSTOM_REPOSITORY = ['https://gitee.com/yll0614/luoluo-plugin'];

init();

export class CodeUpdateTask extends plugin {
    constructor() {
        super({
            name: '定时检查项目更新任务',
            dsc: 'codeUpdate',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '#测试代码推送$',
                    permission: 'master',
                    fnc: 'autoUpdatePush'
                }
            ]
        });
        this.task = {
            cron: '0 */2 * * * *', // Cron表达式，(秒 分 时 日 月 星期)
            name: 'luoluo-plugin定时检查更新',
            fnc: () => this.autoUpdatePush()
        };
    }

    async sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async autoUpdatePush(e) {
        if (!GITEE_TOKEN) {
            logger.error('请先设置Gitee令牌');
            return false;
        }

        // 去重
        REPOSITORY_LIST = Array.from(new Set(REPOSITORY_LIST));
        if (REPOSITORY_LIST.length === 0) {
            logger.info('未检测到有效的仓库地址');
            return false;
        }

        logger.info(`检测到${REPOSITORY_LIST.length}个仓库地址`);
        let content = [];
        let index = -1;
        for (const item of REPOSITORY_LIST) {
            logger.info(`仓库地址：${item.owner}/${item.repo}`);
            index++;
            if (index > 1) {
                await this.sleep(1000);
            }

            let repositoryData = await this.getGiteeLatestCommit(item.owner, item.repo);
            if (!repositoryData?.sha) {
                logger.info(`Gitee仓库地址：${item.owner}/${item.repo}，未检测到提交记录`);
                continue;
            }

            logger.info(`Gitee仓库地址：${item.owner}/${item.repo}，最新提交：${repositoryData.date}`);
            const redisKey = `${prefix}${item.owner}/${item.repo}`;
            let redisSha = await redis.get(redisKey);
            if (redisSha) {
                if (String(redisSha) === String(repositoryData.sha)) {
                    logger.info(`仓库地址：${item.owner}/${item.repo} 暂无更新`);
                    continue;
                }
            }

            await redis.set(redisKey, repositoryData.sha);
            content.push(repositoryData);
        }

        if (content.length > 0) {
            const msg = '检测到luoluo-plugin更新...\n' + content.map(i => `项目名称：${i.owner}/${i.repo}\n开发者名称：${i.author}\n开发者邮箱：${i.email}\n更新信息：${i.message}\n更新时间：${i.date}\n`).join('\n');

            const masters = cfg.masterQQ;
            for (const master of masters) {
                if (master.toString().length > 11) continue;
                await Bot.pickFriend(master).sendMsg(msg);
                await this.sleep(2000);
            }

            if (GROUP_LIST && GROUP_LIST.length > 0) {
                for (const key of GROUP_LIST) {
                    Bot.pickGroup(key).sendMsg(msg);
                    await this.sleep(10000);
                }
            }
        }
    }

    async getGiteeLatestCommit(owner, repo) {
        const apiUrl = `https://gitee.com/api/v5/repos/${owner}/${repo}/commits`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GITEE_TOKEN}`
        };

        try {
            const response = await fetch(apiUrl, { headers });
            const commits = await response.json();

            if (commits.length > 0) {
                const latestCommit = commits[0];
                return {
                    owner,
                    repo,
                    sha: latestCommit.sha,
                    author: latestCommit.commit.author.name,
                    email: latestCommit.commit.author.email,
                    date: moment(latestCommit.commit.author.date).format('YYYY-MM-DD HH:mm:ss'),
                    message: latestCommit.commit.message.replace(/\n\s*$/, '')
                };
            } else {
                return { error: '该仓库没有提交记录。' };
            }
        } catch (error) {
            return { error: '查询出错：' + error.message };
        }
    }
}

function init() {
    function gitRemoteUrl(remoteUrl) {
        const urlMatch = remoteUrl.match(/^(?:https?:\/\/)?(?:[^/]+\/)+([^/]+)\/([^/]+)(?:\.git)?$/);
        const sshUrlMatch = remoteUrl.match(/^.+@(.+):([^/]+)\/([^/]+)\.git$/);

        if (urlMatch) {
            const owner = urlMatch[1];
            const repo = urlMatch[2].replace('.git', '');
            REPOSITORY_LIST.push({
                source: 'Gitee',
                owner,
                repo
            });
        } else if (sshUrlMatch) {
            const owner = sshUrlMatch[2];
            const repo = sshUrlMatch[3];
            REPOSITORY_LIST.push({
                source: 'Gitee',
                owner,
                repo
            });
        }
    }

    if (CUSTOM_REPOSITORY.length > 0) {
        CUSTOM_REPOSITORY.forEach(item => {
            gitRemoteUrl(item);
        });
    }

    // 删除了 traverseDirectory 调用
    // traverseDirectory('.\\plugins');
    logger.info('初始化完成，已处理 CUSTOM_REPOSITORY 列表');
}

<div align="center">
<h1>洛洛插件V4.0.0(luoluo-plugin)</h1>


 ###### 访问量<br><img src="https://count.moeyy.cn/get/@:yueyuez/"/></br>

 ## 插件功能 [v4.0.0](./CHANGELOG.md)
 </div>

# 功能命令与描述

| 命令                         | 描述                                  |
|----------------------------|-------------------------------------|
| #一言                        | 顾名思义，就是一言啦，可获取JSON数据更详细 |
| #疯狂星期四                   | 输出一句疯狂星期四                     |
| #网易云热评                   | 顾名思义，就是网易云热评啦              |
| #天气                        | 天气查询，在天气前面加城市名（仅国内城市） |
| #歌曲列表                     | 获取歌曲列表，再歌曲列表前面加歌曲名       |
| #歌词                        | 获取歌曲歌词，再歌词前面加歌曲名，可配合列表使用，在歌词后方加数字选取不同版本 |
| #音频                        | 获取歌曲音频，再音频前面加歌曲名，可配合列表使用，在歌词后方加数字选取不同版本 |
| #歌曲                        | 获取歌词+音频，可配合列表使用，在歌词后方加数字选取不同版本 |
| #唱鸭                        | 随机唱鸭                              |
| #随机表情包                   | 获取表情包，详情请查看洛洛表情包帮助        |
| #xx与xx攻受短文               | 写一段攻受短文[请输入名称]              |
| #ping地址                    | 在地址后面加IP或域名，仅支持IPv4地址和域名 |
| #谁艾特我                     | 查看4天内的艾特你的人及其内容，不支持face表情 |
| #是什么垃圾                   | 垃圾分类，在是什么垃圾前面加垃圾名称      |
| #随机动漫图                   | 随机获取一张动漫图                      |
| #哔哩哔哩热搜榜               | 哔哩哔哩热搜榜TOP10                    |
| #知乎热搜榜                   | 知乎热搜榜TOP10                        |
| #抖音热搜榜                   | 抖音热搜榜TOP10                        |
| #今日头条热搜榜               | 今日头条热搜榜TOP10                    |
| #今日头条热点新闻             | 今日头条热点新闻TOP10                  |
| #哔哩哔哩视频解析             | 发送视频链接即可，注：需将你的FFmpeg所在的文件夹在PATH环境变量中 |
| #头像                        | 获取群友的QQ头像，at就是拿群友的，不艾特就是自己的 |
| #群头像                      | 获取QQ群头像                            |
| #举牌                        | 生成一张小人举牌图片，在举牌后面加内容     |
| #网页截图                     | 网页截图，在命令后加网址                |
| #洛洛表情包帮助               | 表情包帮助                              |
| #洛洛设置帮助                 | 设置帮助                                |
| #洛洛插件更新                 | 更新插件                                |

# 表情包功能命令

| 命令                     | 功能描述                           | 示例                          |
|--------------------------|------------------------------------|-------------------------------|
| `#随机猫羽雫(甘城猫猫)表情包` | 来点Nacho！                        | `#随机猫羽雫(甘城猫猫)表情包`    |
| `#随机fufu表情包`           | 你就是歌姬吧！                      | `#随机fufu表情包`               |
| `#随机丛雨表情包`           | Ciallo～(∠・ω< )⌒☆                | `#随机丛雨表情包`               |
| `#随机小南梁表情包`         | 被小南梁害惨了                      | `#随机小南梁表情包`             |
| `#随机千恋万花表情包`       | 柚子厨蒸鹅心                        | `#随机千恋万花表情包`           |
| `#随机古拉表情包`           | 来点gura！                         | `#随机古拉表情包`               |
| `#随机心海表情包`           | 诶嘿嘿心海~                         | `#随机心海表情包`               |
| `#随机柴郡表情包`           | 搞什么啊我只是猫咪                  | `#随机柴郡表情包`               |
| `#随机满穗表情包`           | 参见万穗爷                          | `#随机满穗表情包`               |
| `#随机猫猫虫表情包`         | 咖波                                 | `#随机猫猫虫表情包`             |
| `#随机纳西妲表情包`         | 分享智慧                             | `#随机纳西妲表情包`             |
| `#随机诗歌剧表情包`         | 曼波！                               | `#随机诗歌剧表情包`             |
| `#随机kemomimi表情包`       | 兽耳酱                               | `#随机kemomimi表情包`           |
| `#随机表情包`               | 随机输出一张表情包                   | `#随机表情包`                   |

## 使用说明

- **获取随机表情包**：通过命令 `#随机表情包` 来获取一张随机的表情包。
- **特定表情包获取**：使用对应命令例如 `#随机猫羽雫(甘城猫猫)表情包` 获取特定主题的表情包。
# 洛洛设置帮助

| 功能命令                              | 功能描述                                  | 默认状态 |
|-------------------------------------|---------------------------------------|----------|
| `#洛洛设置更新推送开启/关闭`           | 开启/关闭更新推送                        | 开启     |
| `#洛洛设置哔哩哔哩解析开启/关闭`      | 开启/关闭哔哩哔哩视频解析                 | 开启     |
| `#洛洛设置一言开启/关闭`              | 开启/关闭一言                            | 开启     |
| `#洛洛设置疯狂星期四开启/关闭`        | 开启/关闭疯狂星期四                       | 开启     |
| `#洛洛设置网易云热评开启/关闭`        | 开启/关闭网易云热评                      | 开启     |
| `#洛洛设置天气查询开启/关闭`          | 开启/关闭天气查询                        | 开启     |
| `#洛洛设置歌曲类开启/关闭`            | 开启/关闭歌曲类                          | 开启     |
| `#洛洛设置唱鸭开启/关闭`              | 开启/关闭唱鸭                            | 开启     |
| `#洛洛设置随机表情包开启/关闭`        | 开启/关闭随机表情包                      | 开启     |
| `#洛洛设置攻受短文开启/关闭`          | 开启/关闭攻受短文                        | 开启     |
| `#洛洛设置ping地址开启/关闭`          | 开启/关闭ping地址                        | 开启     |
| `#洛洛设置谁艾特我开启/关闭`          | 开启/关闭谁艾特我                        | 开启     |
| `#洛洛设置垃圾分类开启/关闭`          | 开启/关闭垃圾分类                        | 开启     |
| `#洛洛设置随机动漫图开启/关闭`        | 开启/关闭随机动漫图                      | 开启     |
| `#洛洛设置哔哩哔哩热搜榜开启/关闭`    | 开启/关闭哔哩哔哩热搜榜                  | 开启     |
| `#洛洛设置知乎热搜榜开启/关闭`        | 开启/关闭知乎热搜榜                      | 开启     |
| `#洛洛设置抖音热搜榜开启/关闭`        | 开启/关闭抖音热搜榜                      | 开启     |
| `#洛洛设置今日头条热搜榜开启/关闭`    | 开启/关闭今日头条热搜榜                  | 开启     |
| `#洛洛设置今日头条热点新闻开启/关闭`  | 开启/关闭今日头条热点新闻                | 开启     |
| `#洛洛设置头像开启/关闭`              | 开启/关闭头像                            | 开启     |
| `#洛洛设置群头像开启/关闭`            | 开启/关闭群头像                          | 开启     |
| `#洛洛设置举牌开启/关闭`              | 开启/关闭举牌                            | 开启     |
| `#洛洛设置网页截图开启/关闭`          | 开启/关闭网页截图                        | 开启     |

 <div align="center">
 
 ## 安装教程  
### 方式一:通过git下载插件  
在云崽根目录执行命令(二选一)
***Gitee***
```sh
git clone --depth=1 https://gitee.com/yll0614/luoluo-plugin.git ./plugins/luoluo-plugin/
```
***Github***
```sh
git clone --depth=1 https://github.com/yll0614/luoluo-plugin.git ./plugins/luoluo-plugin/
```
***若拉取速度慢/无法访问 可通过镜像加速***
```sh
#Github-通过mirror.ghproxy.com镜像加速
git clone --depth=1 https://mirror.ghproxy.com/https://github.com/yll0614/luoluo-plugin.git ./plugins/luoluo-plugin/
#Github-通过ghproxy.net镜像加速
git clone --depth=1 https://ghproxy.net/https://github.com/yll0614/luoluo-plugin.git ./plugins/luoluo-plugin/
```
### 方式二:手动下载插件
下载仓库解压zip文件将luoluo-plugin-main放入Yunzai/Miao-Yunzai的/plugins目录下重命名去掉后面的<u>-main</u>

<img src='https://gitee.com/yll0614/img/raw/master/Download-luoluo-plugin.png'  alt='Download-luoluo-plugin.png'></img>
</div>

### 安装依赖 一定要安装依赖!!!

```
pnpm install --filter=luoluo-plugin
```

 ## 其他  
 - 由于插件性质 某些API可能会失效 若发现失效API 可联系作者或发起pr以更改失效api

 - 当然 为了功能稳定性 若是有新的api提供 也可联系作者或按照格式发起pr以更换API链接

 - 注意 如果您发起pr来更改API链接 您在进行pr之前须经本地测试以保证这是一个可供使用的api 若确认某api失效 发起pr后作者也会审查后才将其合并
<br/>
- 请注明来意及来源
<br/>

- QQ：```2443958507```[(高一小白)](https://qm.qq.com/cgi-bin/qm/qr?k=Vzr6Z6yISyfTNKic29xQEattdPxHldPW)

<br/>

- [企业微信联系方式(可通过微信扫码添加)](https://gitee.com/yll0614/img/raw/master/work.weixin.jpg)
<img src='https://gitee.com/yll0614/img/raw/master/work.weixin.jpg'  alt='work.weixin.png'>
<br/>

- ***邮箱联系方式***

- ``` yll@yll.info ```

- ``` 2443958507@qq.com```

- ``` czh0614@outlook.com ```


- 有没有觉得这个Readme和哪个插件相似?是的这个Readme就是是借鉴 [@xwy](https://gitee.com/xwy231321)的 [ql-plugin](https://gitee.com/xwy231321/ql-plugin)的Readme,部分逻辑也与其插件相似 (已经其本人同意)
<br/>
如果可以的话 给本项目个star 来支持本项目 您的支持就是给我的最大的鼓励 谢谢

### 鸣谢
###### ***不分先后顺序***


| 名单 | 主要贡献 | 名单  | 主要贡献  |
|:----: |:----: |:----: |:----: |
| [@xwy](https://gitee.com/xwy231321) | Readme及部分逻辑 | [@维拉](https://gitee.com/com190238) | 好耶~ 是奶茶一杯~  |
| [@Tloml-Starry](https://gitee.com/Tloml-Starry) | JSON读取方式 |[@白狐](https://gitee.com/baihu433)|适配锅巴面板| 
| [@叶殇](https://gitee.com/https://gitee.com/maple-leaf-sweeping) | 大量逻辑更新优化| [@Admilk](https://gitee.com/adrae) | 优化冗余|  
| [@君昭](https://gitee.com/jun-zhaojinzhaoei) | 部分API*1| [@心愿XY](https://gitee.com/hgh123520) | 插件更新

## 免责声明

1) 功能仅限内部交流与小范围使用，请勿将luoluo-plugin用于以盈利为目的的场景

2) 本插件仅供交流学习使用，如有侵权请联系，会立即删除

3) 使用本插件造成的一切损失，以及不良影响，由使用者承担

<div align="center">

Yunzai-Bot插件库：[☞Github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)/[☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

Yunzai-Bot（V3）：[☞Github](https://github.com/Le-niao/Yunzai-Bot)/[☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) 


ql-plugin：[☞Github](https://github.com/xwy231321/ql-plugin)/[☞Gitee](https://gitee.com/xwy231321/ql-plugin)


</div>

# Dot 云端接手

仓库：https://github.com/georgewang613-bit/policy-atlas

网站：https://georgewang613-bit.github.io/policy-atlas/

## 首次运行

1. 在 Dot 中连接可访问此仓库的 GitHub 插件，确认有写入权限。
2. 在 Dot 的云端电脑或关联的 Codex 云端环境读取 main。先读 `AGENTS.md`，再运行 `npm ci`、`npm run validate`、`npm run build`。
3. 检查站点已发布版本，确认能在云端完成研究、提交、构建和发布读回。使用云端工作目录，不调用作者的本机文件或应用。
4. 首轮完整运行通过后，确认每天北京时间（Asia/Shanghai）21:00 的云端日程。只在重大已核实变化、持续来源失败、发布失败或需要用户操作时通知。
5. 云端日程确认接手后，再停用原本机 `policy-atlas` 更新任务，避免两边重复运行。不要把代码已上传或构建通过当成日程已经建立。

## 每日更新

按 `AGENTS.md` 研究过去 24 小时的政策及技术进展，更新对应数据、短简报和真实核验时间。保留原有事件、字段、历史和证据；无实质变化不伪造更新。

发布前重新核对 main，运行核验和构建，提交必要文件；等待 Pages 成功，并匿名读回首页及资源。每次记录已复核来源、实质变化和发布结果。

代码和站点目前已在 GitHub 云端。仓库中的验证工作流负责数据检查和构建；研究和每日调度需要 Dot 接受任务后执行。

Dot 官方说明：https://learn.chatgpt.com/docs/dots

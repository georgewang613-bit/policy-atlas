# Policy Atlas · LIVE 内容治理

全球政策观察和 AI 审核技术研究。通过地图、时间线和技术动态，说明最新进展、直播用途及行动建议。

[公开网站](https://georgewang613-bit.github.io/policy-atlas/) · [Dot 云端接手](CLOUD.md)

## 运行

使用 Node.js 24。在本地或云端目录执行：

```sh
npm ci
npm run validate
npm run dev -- --host 0.0.0.0
```

`npm run build` 生成 `docs/`。GitHub Pages 从 main 的 `/docs` 发布。GitHub Actions 会独立检查数据和构建。

## 文件

- `app/`：页面和组件。
- `lib/`：政策阶段、时间线和数据结构。
- `data/seed.json`：政策记录、历史及证据。
- `data/technology.json`：技术动态及来源。
- `data/maps.json`：地图数据。
- `scripts/`：数据核验和构建收尾。
- `AGENTS.md`：研究、文案和发布约定。

研究和更新规则见 `AGENTS.md`。云端日程需由 Dot 接手后确认，操作步骤见 `CLOUD.md`。

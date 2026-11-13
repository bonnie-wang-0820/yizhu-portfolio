# 王一竹 · 个人作品集

[在线查看作品集](https://yizhu-visual-stories.ochre-scarf-7391.chatgpt.site)

AI 短片、游戏策划与美术、三维场景、交互与公益项目。首页以视频预览和简要职责介绍项目，详情按照制作工作流展开，每一步包含文字、图片轮播及相关视频。

## 项目

| 分类 | 作品 | 时间 |
| --- | --- | --- |
| AI 短片 | 五仙 | 2026.03 |
| AI 短片 | 古代慈城人的现代监考 | 2025.07 |
| 游戏策划与美术 | 梗噬 · TapTap 聚光灯 Game Jam | 2026.10 |
| 游戏策划与美术 | 从前有座山 · CIGA Game Jam 上海椰岛站 | 2024 |
| 3D 项目 | 李白诗意数字展馆 · 毕业设计 | 2026.10 |
| 3D 项目 | 躲猫猫 VR · 自主合作项目 | 2026.08 |
| 其他项目 | 菇毒患者 · 互动装置 | 2025.04 |
| 其他项目 | 畅行视界 · 无界柠檬 | 2025.06 |

## 运行与维护

纯静态 HTML、CSS、JavaScript，无需构建。使用 Python 3：

```sh
python -m http.server 4317 --directory dist
```

浏览器访问 `http://localhost:4317/`。部署时将 `dist` 作为站点根目录即可，支持子目录部署。

- `dist/index.html`：页面结构与个人介绍。
- `dist/projects.js`：分类、项目日期、职责、链接和工作流；每个 `workflows` 步骤分别维护 `title`、`text`、`images`、`clips`。
- `dist/portfolio.css`：桌面及手机端样式。
- `dist/portfolio-app.js`：导航、项目详情、独立轮播与视频预览。
- `dist/media/`：作品图片和视频。
- `dist/experience/mushroom/`：菇毒患者线上交互体验。

首页视频静音循环，仅在可视区域播放；打开项目详情时暂停首页预览。详情视频手动播放。轮播支持按钮、左右方向键与触屏滑动，点击图片可查看原图。

## 体验入口

- [无界柠檬前端 Demo](https://bonnie-wang-0820.github.io/lemon-accessibility-demo/)
- [菇毒患者线上交互体验](https://yizhu-visual-stories.ochre-scarf-7391.chatgpt.site/experience/mushroom/)
- [从前有座山 B 站 Demo](https://b23.tv/pFbrtCS)

菇毒患者网页为原 TouchDesigner 作品的 WebGL 重建版本。摄像头、麦克风均由体验者主动开启，音视频在本机处理；也可通过情绪卡、模拟音量、鼠标或触屏体验。设备功能需要 HTTPS 或 localhost。

## 展示说明

五仙为阶段作品。慈城部分图片为成片截帧。李白展馆的作揖交互当前以桌面点击模拟。躲猫猫的编辑器场景浏览、桌面操作、独立动画与资产组合演示均在页面注明。畅行视界展示已完成的前端原型与流程验证；真实 AI 评分、后端数据与语音模型尚未接入。

## 素材与第三方依赖

作品和媒体用于个人作品集展示，公开仓库不代表授予第三方转载、商用或素材再分发许可。菇毒患者所用第三方库及许可证保留在 `dist/experience/mushroom/vendor/licenses/`。

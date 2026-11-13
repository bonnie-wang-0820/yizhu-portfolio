// Portfolio content. Each workflow owns its images and optional video clips.
window.portfolio = {
  "sections": [
    {
      "id": "films",
      "label": "AI 短片",
      "english": "AI FILMS",
      "projects": [
        "wuxian",
        "cicheng"
      ]
    },
    {
      "id": "games",
      "label": "游戏策划与美术",
      "english": "GAME DESIGN & ART",
      "projects": [
        "gengshi",
        "mountain"
      ]
    },
    {
      "id": "spaces",
      "label": "3D 项目",
      "english": "SPACES & EXPERIENCES",
      "projects": [
        "libai",
        "hide"
      ]
    },
    {
      "id": "experiments",
      "label": "其他项目",
      "english": "INTERACTION & SOCIAL GOOD",
      "projects": [
        "mushroom",
        "lemon"
      ]
    }
  ],
  "projects": {
    "cicheng": {
      "title": "古代慈城人的现代监考",
      "subtitle": "慈城 · AI 叙事短片",
      "category": "AI FILM",
      "role": "独立制作",
      "status": "成片",
      "tools": "Midjourney / Nano Banana / 即梦 / 剪映",
      "poster": "media/ppt-image11.jpg",
      "preview": "media/cicheng-loop.mp4",
      "video": "media/cicheng.mp4",
      "portrait": true,
      "date": "2025.07",
      "type": "AIGC 文化宣传短片",
      "summary": "以慈城科考文化为题材，用现代元素制造古今反差。",
      "credit": "独立完成实地调研、选题与剧情设计、视频生成及剪辑。",
      "workflows": [
        {
          "title": "实地调研与选题",
          "text": "从慈城考场故址的实地调研出发，梳理当地科考文化，将选题聚焦到观众容易理解的“考试与监考”。以历史情境为基础，把具体的检查方式转译为短片中的人物行为和事件，建立文化内容与日常经验之间的联系。",
          "images": [
            {
              "src": "media/ppt-image11.jpg",
              "caption": "短片封面 · 慈城科考文化"
            }
          ],
          "clips": []
        },
        {
          "title": "古今反差与剧情设计",
          "text": "通过古代制度与现代物件的组合，设计可视化的反差：餐食夹带小抄对应汉堡，脱鞋与解发髻检查对应帆布鞋和假发，依照画册核验身份对应电子设备检查。让文化信息进入事件与笑点，推动短片情节。",
          "images": [
            {
              "src": "media/ppt-image12.jpg",
              "caption": "科考情境 · 人物画面"
            },
            {
              "src": "media/ppt-image13.jpg",
              "caption": "监考环节 · 画面设计"
            },
            {
              "src": "media/ppt-image14.jpg",
              "caption": "古代检查方式的视觉表达"
            },
            {
              "src": "media/ppt-image15.jpg",
              "caption": "现代元素的融入"
            }
          ],
          "clips": []
        },
        {
          "title": "关键帧生成与成片剪辑",
          "text": "使用 Midjourney、Nano Banana 制作关键帧，以即梦生成视频镜头，再完成剪辑、字幕和声音配置。音乐与音效使用剪映素材。下方为成片截帧，用于展示人物、场景和剪辑后的叙事效果。",
          "images": [
            {
              "src": "media/cicheng-frame-1.jpg",
              "caption": "成片截帧 · 人物与场景"
            },
            {
              "src": "media/cicheng-frame-2.jpg",
              "caption": "成片截帧 · 叙事情境"
            },
            {
              "src": "media/cicheng-frame-3.jpg",
              "caption": "成片截帧 · 画面细节"
            }
          ],
          "clips": []
        }
      ]
    },
    "wuxian": {
      "title": "五仙",
      "subtitle": "AI 叙事短片",
      "category": "AI FILM",
      "role": "合作创作 · 分镜与影像制作",
      "status": "阶段作品",
      "tools": "Nano Banana / Veo 3 / 即梦",
      "poster": "media/ppt-image1.jpg",
      "video": "media/ppt-wuxian.mp4",
      "preview": "media/ppt-wuxian-loop.mp4",
      "videoCaption": "阶段影像 · 项目尚未完成完整短片。",
      "date": "2026.03",
      "type": "合作创作 · AI 动画短片",
      "summary": "围绕五仙角色展开的 AI 动画短片，已完成阶段影像。",
      "credit": "参与脚本分镜、关键帧生成、视频生成与剪辑。",
      "workflows": [
        {
          "title": "人物参考形象设计",
          "text": "围绕五仙的角色设定，先建立各角色的外形、服饰与形象参考，再进入具体镜头制作。将角色参考作为后续画面生成的依据，关注同一角色在不同视角下的辨识度，以及整组人物的风格统一。",
          "images": [
            {
              "src": "media/ppt-image7.jpg",
              "caption": "五仙角色群像"
            },
            {
              "src": "media/ppt-image2.jpg",
              "caption": "狐仙 · 角色参考"
            },
            {
              "src": "media/ppt-image5.jpg",
              "caption": "黄仙 · 角色参考"
            },
            {
              "src": "media/ppt-image4.jpg",
              "caption": "柳仙 · 角色参考"
            },
            {
              "src": "media/ppt-image6.jpg",
              "caption": "白仙 · 角色参考"
            },
            {
              "src": "media/ppt-image3.jpg",
              "caption": "灰仙 · 角色参考"
            }
          ],
          "clips": []
        },
        {
          "title": "脚本分镜与关键帧",
          "text": "先完成分镜设计脚本，将剧情拆解为可以执行的镜头，再用 Nano Banana 生成关键帧。每张画面都需要同时考虑场景构图、角色位置和动作，并为后续动态镜头留出衔接空间。我参与脚本分镜，并承担约一半的关键帧制作。",
          "images": [
            {
              "src": "media/ppt-image8.jpg",
              "caption": "分镜脚本与对应关键帧"
            }
          ],
          "clips": []
        },
        {
          "title": "视频生成与剪辑",
          "text": "将关键帧交给 Veo 3 和即梦生成视频，围绕分镜中的人物动作与镜头要求调整画面，再进行镜头选择与剪辑。我承担约一半的视频生成工作。当前展示为阶段片段，项目尚未完成原计划的完整短片。",
          "images": [
            {
              "src": "media/ppt-image9.jpg",
              "caption": "关键帧到视频 · 生成过程"
            },
            {
              "src": "media/ppt-image10.jpg",
              "caption": "视频生成 · 镜头调整"
            }
          ],
          "clips": []
        }
      ]
    },
    "gengshi": {
      "title": "梗噬",
      "subtitle": "主题策划 × 手绘美术",
      "category": "GAME DESIGN",
      "role": "参与主题与剧情策划 · 手绘美术",
      "status": "可玩 Demo",
      "tools": "Game Jam / 叙事策划 / 手绘美术",
      "poster": "media/ppt-image16.jpg",
      "video": "media/ppt-gengshi.mp4",
      "preview": "media/ppt-gengshi-loop.mp4",
      "date": "2026.10",
      "type": "比赛项目 · TapTap 聚光灯 Game Jam",
      "summary": "围绕“涌现”主题制作的叙事游戏 Demo。",
      "credit": "参与剧情策划，负责人物立绘、场景、道具与 UI 绘制。",
      "workflows": [
        {
          "title": "主题拆解与剧情策划",
          "text": "参与“涌现”主题下的剧情讨论，将主题转化为游戏中的人物处境与叙事画面。围绕剧情所需的角色、环境与道具组织美术内容，让视觉资产与游戏体验保持关联。",
          "images": [
            {
              "src": "media/ppt-image16.jpg",
              "caption": "《梗噬》项目主视觉"
            }
          ],
          "clips": []
        },
        {
          "title": "人物立绘与道具绘制",
          "text": "负责角色立绘和道具素材的手绘制作。通过人物轮廓、服装与物件细节建立辨识度，并将卡牌、箱体、钟表等道具整理成可用于游戏的美术资产。",
          "images": [
            {
              "src": "media/ppt-image17.jpg",
              "caption": "人物立绘"
            },
            {
              "src": "media/ppt-image18.jpg",
              "caption": "卡牌道具"
            },
            {
              "src": "media/ppt-image19.jpg",
              "caption": "箱体与家具"
            },
            {
              "src": "media/ppt-image20.jpg",
              "caption": "时钟"
            },
            {
              "src": "media/ppt-image21.jpg",
              "caption": "怀表"
            }
          ],
          "clips": []
        },
        {
          "title": "场景绘制",
          "text": "根据情节需要绘制街道与异常状态下的场景画面。通过环境色彩、形态和视觉密度的变化区分不同叙事情境，同时维持角色、场景与道具之间的美术协调。",
          "images": [
            {
              "src": "media/ppt-image22.jpg",
              "caption": "街道场景"
            },
            {
              "src": "media/ppt-image23.jpg",
              "caption": "街道氛围变化"
            },
            {
              "src": "media/ppt-image24.jpg",
              "caption": "场景画面 01"
            },
            {
              "src": "media/ppt-image25.jpg",
              "caption": "场景画面 02"
            },
            {
              "src": "media/ppt-image26.jpg",
              "caption": "场景画面 03"
            },
            {
              "src": "media/ppt-image27.jpg",
              "caption": "场景画面 04"
            },
            {
              "src": "media/ppt-image28.jpg",
              "caption": "场景画面 05"
            }
          ],
          "clips": []
        },
        {
          "title": "UI 设计",
          "text": "将手绘风格延伸至游戏界面，组织标题、背景和操作入口的视觉关系，使界面与游戏内部画面保持统一。通过 Demo 展示美术素材进入实际游戏后的效果。",
          "images": [
            {
              "src": "media/ppt-image29.jpg",
              "caption": "UI 设计稿"
            },
            {
              "src": "media/ppt-image30.jpg",
              "caption": "主界面效果"
            }
          ],
          "clips": []
        }
      ]
    },
    "mountain": {
      "title": "从前有座山",
      "subtitle": "东方意境 × 循环叙事",
      "category": "GAME DESIGN",
      "role": "剧情与关卡设计 · 手绘美术",
      "status": "可玩 Demo",
      "tools": "Game Jam / 剧情与关卡 / 手绘美术",
      "poster": "media/ppt-image31.jpg",
      "video": "media/ppt-mountain.mp4",
      "preview": "media/ppt-mountain-loop.mp4",
      "date": "2024",
      "type": "比赛项目 · CIGA Game Jam 上海椰岛站",
      "summary": "双人组队完成的国风解谜叙事游戏 Demo。",
      "credit": "负责剧情与关卡策划，以及角色、场景、道具和 UI 美术。",
      "links": [
        {
          "label": "B 站观看游戏 Demo",
          "url": "https://b23.tv/pFbrtCS"
        }
      ],
      "workflows": [
        {
          "title": "主题拆解与剧情关卡",
          "text": "在 Game Jam 的限时协作中，从“从前有座山”的童谣与寺庙情境出发，设计循环叙事和解谜关卡。将上香、抽签、木鱼等具体行为嵌入流程，让剧情线索与玩家操作相互关联。",
          "images": [
            {
              "src": "media/ppt-image33.jpg",
              "caption": "剧情与关卡构思草图"
            }
          ],
          "clips": []
        },
        {
          "title": "角色与道具绘制",
          "text": "围绕寺庙主题绘制僧人角色与道具，将叙事中需要的物件转化为可识别的游戏素材。角色、道具与场景采用统一的手绘表达，服务于国风解谜体验。",
          "images": [
            {
              "src": "media/ppt-image34.jpg",
              "caption": "角色与道具素材"
            },
            {
              "src": "media/ppt-image32.jpg",
              "caption": "僧人角色"
            }
          ],
          "clips": []
        },
        {
          "title": "场景与 UI 设计",
          "text": "完成寺庙外部、室内空间与主界面绘制。通过空间布局组织玩家的观察与行动，再将这些美术素材接入游戏 Demo，呈现剧情、关卡和视觉设计共同形成的游玩流程。",
          "images": [
            {
              "src": "media/ppt-image35.jpg",
              "caption": "寺庙外部场景"
            },
            {
              "src": "media/ppt-image36.jpg",
              "caption": "室内场景"
            },
            {
              "src": "media/ppt-image37.jpg",
              "caption": "游戏主界面"
            }
          ],
          "clips": []
        }
      ]
    },
    "libai": {
      "title": "李白诗意数字展馆",
      "subtitle": "诗意空间 × 具身交互",
      "category": "3D EXPERIENCE",
      "role": "空间与交互叙事设计",
      "status": "桌面交互原型",
      "tools": "Unity / AI 辅助视觉与三维创作",
      "poster": "media/ppt-image43.jpg",
      "preview": "media/ppt-libai-loop.mp4",
      "video": "media/ppt-libai.mp4",
      "videoCaption": "李白展馆游览演示 · 主展馆空间、诗作展示与参观过程。",
      "date": "2026.10",
      "type": "毕业设计 · 数字展馆",
      "summary": "将李白诗词转化为三维场景与可参与的交互情节。",
      "credit": "负责诗意拆解、空间设计、三维资产与交互叙事。",
      "workflows": [
        {
          "title": "诗意拆解与场景设计",
          "text": "将抽象诗意具象为实境3D场景，将情感内涵转化为实操交互情节。\n从诗句中的意象、人物关系与情绪变化出发，先规划场景草图、观看位置和分镜视角，再组织空间布局。将“观众在哪里、看到什么、做什么”一起纳入设计，让空间与交互共同承担叙事。",
          "images": [
            {
              "src": "media/ppt-image45.jpg",
              "caption": "诗意拆解 · 场景草图"
            },
            {
              "src": "media/ppt-image46.jpg",
              "caption": "空间布局与观看位置"
            },
            {
              "src": "media/ppt-image47.jpg",
              "caption": "视角与场景构图"
            },
            {
              "src": "media/ppt-image48.jpg",
              "caption": "送别情境 · 分镜视角"
            }
          ],
          "clips": []
        },
        {
          "title": "历史参考与三维资产",
          "text": "参考历史建筑与物件资料，梳理建筑形制、结构和细节，再结合 AI 图像生成、三维制作与 Tripo 贴图，将参考转化为可放入展馆的资产。通过模型与材质效果对照，协调建筑的结构表达和整体场景风格。",
          "images": [
            {
              "src": "media/ppt-image49.jpg",
              "caption": "历史建筑资料参考"
            },
            {
              "src": "media/ppt-image50.jpg",
              "caption": "建筑结构参考"
            },
            {
              "src": "media/ppt-image51.jpg",
              "caption": "亭台资料参考"
            },
            {
              "src": "media/ppt-image52.jpg",
              "caption": "亭台模型"
            },
            {
              "src": "media/ppt-image53.jpg",
              "caption": "亭台材质效果"
            },
            {
              "src": "media/ppt-image54.jpg",
              "caption": "楼阁模型"
            },
            {
              "src": "media/ppt-image55.jpg",
              "caption": "楼阁材质效果"
            },
            {
              "src": "media/ppt-image56.jpg",
              "caption": "牌坊模型"
            },
            {
              "src": "media/ppt-image57.jpg",
              "caption": "牌坊材质效果"
            }
          ],
          "clips": []
        },
        {
          "title": "敬亭山：鸟云离去的交互",
          "text": "在《独坐敬亭山》中，观众选中落单的乌鸦，目送它跳跃起飞、随众鸟离去；孤云持续飘过，触发后加速远去。尝试建立的联系依次消散，最终留下人与山相对。\n孤独感通过观众的主动参与、事件发生的先后与等待的时间逐步建立。鸟与云的运动既是画面变化，也是情绪推进的具体环节。",
          "images": [
            {
              "src": "media/libai-jts.jpg",
              "caption": "《独坐敬亭山》实际交互场景"
            },
            {
              "src": "media/libai-birds.jpg",
              "caption": "鸟群动作预览"
            }
          ],
          "clips": [
            {
              "src": "media/libai-birds.mp4",
              "poster": "media/libai-birds.jpg",
              "caption": "鸟群动作预览 · 独立动画素材，非完整场景录屏。"
            }
          ]
        },
        {
          "title": "黄鹤楼：作揖与送别剧情",
          "text": "在《黄鹤楼送孟浩然之广陵》中，设计观众同步作揖拜别，触发人物回礼与送别情节。随后从甲板近距离相见转至楼上远望，用观看位置、空间距离与船行节奏呈现惜别。\n观众的行动成为剧情发生的一部分。现阶段已完成桌面交互原型，作揖以点击模拟，真实 VR 动作识别尚待接入。",
          "images": [
            {
              "src": "media/libai-farewell.jpg",
              "caption": "甲板相见与作别"
            },
            {
              "src": "media/libai-tower.jpg",
              "caption": "登楼目送船行"
            },
            {
              "src": "media/libai-bow.jpg",
              "caption": "孟浩然作揖动作"
            }
          ],
          "clips": [
            {
              "src": "media/libai-bow.mp4",
              "poster": "media/libai-bow.jpg",
              "caption": "孟浩然作揖动作预览 · 用于构建人物回礼与送别情节。"
            }
          ]
        },
        {
          "title": "展馆整合与游览",
          "text": "将诗作展示、三维建筑和诗境体验组织到展馆中，统筹入口、观看位置与参观路径。主展馆演示展示空间布局与游览过程；独立诗境继续通过交互情节把观众带入诗词。",
          "images": [
            {
              "src": "media/ppt-image43.jpg",
              "caption": "主展馆空间"
            },
            {
              "src": "media/ppt-image44.jpg",
              "caption": "展馆游览视角"
            }
          ],
          "clips": []
        }
      ]
    },
    "hide": {
      "title": "躲猫猫 VR",
      "subtitle": "三维场景 × 角色动效",
      "category": "3D EXPERIENCE",
      "role": "场景搭建与资产制作",
      "status": "开发中",
      "tools": "AI 图像 / Tripo / Blender / Mixamo",
      "poster": "media/ppt-image58.jpg",
      "preview": "media/ppt-hide-loop.mp4",
      "video": "media/ppt-hide.mp4",
      "videoCaption": "Unity 场景浏览 · PPT 中提供的编辑器录屏，展示场景布局与资产。",
      "date": "2026.08",
      "type": "自主合作项目 · VR 游戏",
      "summary": "围绕躲藏与探索玩法，制作室内三维场景和角色动效。",
      "credit": "负责场景搭建、三维资产制作与角色模型动画。",
      "workflows": [
        {
          "title": "角色模型与动画",
          "text": "从角色参考图出发，制作和整理三维模型，并结合绑定与动作素材探索角色的动态表现。围绕小猫角色检查外形、比例和行走动作，将静态设计逐步转化为可在场景中使用的角色资产。",
          "images": [
            {
              "src": "media/hide-cat-design-front.jpg",
              "caption": "小猫角色参考"
            },
            {
              "src": "media/hide-cat.jpg",
              "caption": "角色模型 · 灰模动作预览"
            }
          ],
          "clips": [
            {
              "src": "media/hide-cat.mp4",
              "poster": "media/hide-cat.jpg",
              "caption": "小猫角色 · 现有 Blender 模型的独立灰模动作预览。"
            }
          ]
        },
        {
          "title": "场景搭建",
          "text": "围绕厨房、客厅、卧室等室内环境组织场景，统筹空间布局、家具尺度和资产风格。将家具摆放与玩家的探索路线联系起来，并通过 Unity 场景浏览检查整体空间关系。",
          "images": [
            {
              "src": "media/ppt-image58.jpg",
              "caption": "厨房场景 · Unity 编辑器"
            },
            {
              "src": "media/hide-kitchen-unity.jpg",
              "caption": "厨房场景"
            },
            {
              "src": "media/hide-bedroom-unity.jpg",
              "caption": "卧室场景"
            },
            {
              "src": "media/hide-kitchen.jpg",
              "caption": "厨房资产 · 渲染展示"
            }
          ],
          "clips": []
        },
        {
          "title": "场景交互与角色展示",
          "text": "让家具既构成环境，也提供可打开与可躲藏的空间。柜门、冰箱等组件的开合与内部结构，需要与玩法需求一起考虑。下方展示基于原场景的桌面开合演示，以及现有小猫模型、行走动作与厨房资产的组合效果。",
          "images": [
            {
              "src": "media/hide-kitchen-open.jpg",
              "caption": "家具内部与开合结构"
            },
            {
              "src": "media/hide-operation.jpg",
              "caption": "厨房开合实操画面"
            },
            {
              "src": "media/hide-character-scene.jpg",
              "caption": "角色与厨房场景组合"
            }
          ],
          "clips": [
            {
              "src": "media/hide-operation.mp4",
              "poster": "media/hide-operation.jpg",
              "caption": "厨房开合实操 · 基于原 Unity 场景的桌面展示副本录制，演示柜门与冰箱交互。"
            },
            {
              "src": "media/hide-character-scene.mp4",
              "poster": "media/hide-character-scene.jpg",
              "caption": "角色与场景组合演示 · 基于现有小猫模型、行走动作与厨房资产制作。"
            }
          ]
        }
      ]
    },
    "mushroom": {
      "title": "菇毒患者",
      "subtitle": "TouchDesigner 互动装置",
      "category": "INTERACTIVE INSTALLATION",
      "role": "交互系统设计与制作",
      "status": "线下展出",
      "tools": "TouchDesigner / 摄像头 / 音频 / Leap Motion",
      "poster": "media/mushroom-interaction.jpg",
      "preview": "media/mushroom-interaction-loop.mp4",
      "video": "media/mushroom.mp4",
      "date": "2025.04",
      "type": "互动装置 · 线下展出",
      "summary": "以蘑菇形态与迷幻视觉构建 TouchDesigner 互动装置。",
      "credit": "负责交互系统设计与制作，参与线下体验展示。",
      "workflows": [
        {
          "title": "概念与视觉形态",
          "text": "以蘑菇为视觉主体，结合迷幻色彩探索互动装置的表达。不同蘑菇形态形成可辨识的视觉素材，与流动、扭曲的背景效果共同构成作品的画面语言。",
          "images": [
            {
              "src": "media/mushroom-form-2.jpg",
              "caption": "蘑菇形态 · 红色菌盖"
            },
            {
              "src": "media/mushroom-form-1.jpg",
              "caption": "蘑菇形态 · 形态变化"
            },
            {
              "src": "media/mushroom-form-3.jpg",
              "caption": "蘑菇形态 · 浅色菌盖"
            },
            {
              "src": "media/mushroom-form-4.jpg",
              "caption": "蘑菇形态 · 黄色菌盖"
            }
          ],
          "clips": []
        },
        {
          "title": "实时视觉与互动反馈",
          "text": "负责整套 TouchDesigner 交互系统搭建，将声音、摄像头与 Leap Motion 手势输入连接到实时视觉反馈。围绕输入与画面参数之间的映射关系，让参与者的声音、动作与身体轮廓进入作品。\n下方图片与补充录屏展示流动色彩、变形和人物轮廓进入画面的效果。",
          "images": [
            {
              "src": "media/mushroom-visual-1.jpg",
              "caption": "实时视觉效果 01"
            },
            {
              "src": "media/mushroom-visual-2.jpg",
              "caption": "实时视觉效果 02"
            },
            {
              "src": "media/mushroom-visual-3.jpg",
              "caption": "实时视觉效果 03"
            }
          ],
          "clips": [
            {
              "src": "media/mushroom-interaction.mp4",
              "poster": "media/mushroom-interaction.jpg",
              "caption": "TouchDesigner 实时视觉补充录屏 · 2026.06"
            }
          ]
        },
        {
          "title": "线下展出与体验",
          "text": "与 Seeking Project「寻则寻见」合作，在上海中山公园玫瑰坊举办线下快闪交互展演。观众通过声音、手势和身体参与影响画面，体验从蘑菇形态到迷幻视觉的变化。项目宣传视频记录了装置展示与现场互动。\n作品另有线上交互体验版本，以 WebGL 重建部分视觉与交互流程，可通过页面入口体验。",
          "images": [
            {
              "src": "media/mushroom-cover.jpg",
              "caption": "线下装置体验现场"
            }
          ],
          "clips": []
        }
      ],
      "links": [
        {
          "label": "线上交互体验",
          "url": "experience/mushroom/"
        }
      ]
    },
    "lemon": {
      "title": "畅行视界 · 无界柠檬",
      "subtitle": "景区无障碍信息 · 公益产品",
      "category": "SOCIAL GOOD",
      "role": "组长 · 项目统筹 · 小程序开发与设计",
      "status": "前端原型与流程验证",
      "tools": "产品设计 / 原型 / 前端 Demo",
      "poster": "media/lemon-cover.jpg",
      "preview": "media/lemon-loop.mp4",
      "video": "media/lemon.mp4",
      "portrait": true,
      "videoCaption": "“畅行视界”项目中的“无界柠檬”小程序 Demo 演示。",
      "date": "2025.06",
      "type": "公益项目 · 2025 LIGHT 创造营",
      "summary": "面向景区无障碍出行的友好度评分小程序原型。",
      "credit": "担任组长，负责项目统筹、小程序开发与设计。",
      "award": "2025 LIGHT 创造营 · 年度优秀项目",
      "links": [
        {
          "label": "在线体验无界柠檬",
          "url": "https://bonnie-wang-0820.github.io/lemon-accessibility-demo/"
        }
      ],
      "workflows": [
        {
          "title": "需求梳理与实地调研",
          "text": "围绕景区无障碍信息分散、更新滞后、缺少现场参考的问题，提出“畅行视界”项目，以“无界柠檬”作为小程序产品。\n团队收集入口、坡道、厕所、导览等真实设施图片，并按地点、城市与场景类型整理，为产品展示和后续评价体系提供基础。",
          "images": [
            {
              "src": "media/lemon-field-entry.jpg",
              "caption": "实地采集 · 龙音寺侧门通行条件"
            },
            {
              "src": "media/lemon-field-ramp.jpg",
              "caption": "实地采集 · 纺织博物馆坡道指引"
            },
            {
              "src": "media/lemon-field-audio.jpg",
              "caption": "实地采集 · 纺织博物馆语音讲解"
            }
          ],
          "clips": []
        },
        {
          "title": "产品方案与界面设计",
          "text": "担任项目组长，主导产品方案并参与原型设计。围绕景点推荐、地图、景点详情、设施照片与评论反馈组织浏览路径，通过标签和关键设施信息，帮助使用者判断目的地是否适合自身的出行需要。",
          "images": [
            {
              "src": "media/lemon-ui-welcome.jpg",
              "caption": "产品方案 · 欢迎页与易用性设计"
            },
            {
              "src": "media/lemon-ui-map.jpg",
              "caption": "产品方案 · 地图、设施信息与景区入口"
            }
          ],
          "clips": []
        },
        {
          "title": "前端 Demo 与流程验证",
          "text": "独立完成前端 Demo，将产品方案转化为可浏览、可操作的页面，展示景区信息、图片上传入口、评论反馈和社区互动流程。\n当前已完成前端原型与流程验证；后端数据库、真实语音模型及 AI 评分尚未接入。页面中的上传等功能用于演示，后续将继续完善数据存储与评价能力。",
          "images": [
            {
              "src": "media/lemon-demo-home.jpg",
              "caption": "前端 Demo · 地图与景区信息"
            },
            {
              "src": "media/lemon-demo-map.jpg",
              "caption": "前端 Demo · 社区反馈"
            },
            {
              "src": "media/lemon-demo-detail.jpg",
              "caption": "前端 Demo · 景点推荐"
            }
          ],
          "clips": []
        },
        {
          "title": "线下路演与项目成果",
          "text": "参加厦门线下路演，展示公益议题、产品方案、核心功能与迭代计划。项目获评“2025 LIGHT 创造营年度优秀项目”。下方展示荣誉证书、个人汇报与团队展示记录。",
          "images": [
            {
              "src": "media/lemon-light-award.jpg",
              "caption": "2025 LIGHT 创造营 · 年度优秀项目"
            },
            {
              "src": "media/lemon-roadshow-speaker.jpg",
              "caption": "厦门路演 · 产品核心功能介绍"
            },
            {
              "src": "media/lemon-roadshow-interface.jpg",
              "caption": "厦门路演 · 界面与交互方案展示"
            },
            {
              "src": "media/lemon-roadshow-team.jpg",
              "caption": "2025 LIGHT 创造营 · 团队展示"
            }
          ],
          "clips": []
        }
      ]
    }
  }
};

(() => {
  const PROFILES = [
    {
      key:"北京师范大学|曾祥龙", level:"low", label:"公开样本不足",
      style:"未知；公开材料只能确认其长期参与学生指导与数字心理产品实践。",
      signals:["曾承担本科生学业导师工作","研究与实践强调数字心理健康、AI干预和产品落地"],
      feedback:"未找到可独立核验的研究生培养评价。",
      fit:"产品形态高度匹配，但需要重点询问课题组管理方式、产品所有权和非临床行为干预的容纳度。",
      questions:["组会和一对一指导频率？","学生可否继续维护自己的产品？","论文选题由导师指定还是学生主导？","产品数据、代码和知识产权如何划分？"],
      sources:[
        ["官方教师主页","https://psych.bnu.edu.cn/szdw/zrjs/fjs/cxl/index.htm","official"],
        ["本科生学业导师工作记录","https://psych.bnu.edu.cn/xwzx/xwdt/3b7d1c5c9fe6427e99effad56561b5f1.htm","official"]
      ]
    },
    {
      key:"华东师范大学|胡谊", level:"low", label:"公开样本不足",
      style:"未知；公开页面主要反映研究方向与学术活动，缺少研究生对指导过程的可核验描述。",
      signals:["研究覆盖教育聊天机器人、AI心理陪伴与学习科学","方向允许将产品变成实验系统"],
      feedback:"未找到足够的实名学生反馈或独立匿名样本。",
      fit:"研究契合极高，但需要确认导师更看重理论实验、算法系统还是教育应用。",
      questions:["课题组目前最主要的方法路线？","是否接受以现有小程序为研究平台？","学生需要承担多少编程或模型开发？","导师是否支持创业或产品持续运营？"],
      sources:[["官方教师主页","https://faculty.ecnu.edu.cn/_s9/hy2/main.psp","official"]]
    },
    {
      key:"华东师范大学|顾小清", level:"medium", label:"有官方培养信号",
      style:"公开教学活动显示重视问题驱动、学习过程与实践应用；研究生具体管理方式仍未知。",
      signals:["长期负责教育技术与学习分析团队","公开讲座强调从学习过程数据改进教学设计","研究具有明显实践与系统设计取向"],
      feedback:"未找到可核验的课题组匿名口碑；现有证据主要来自学校教学和学术活动。",
      fit:"高校教师身份、学习坚持场景和APP可形成完整叙事，是交叉路线的重要候选。",
      questions:["博士生选题自由度如何？","课题组是否有稳定数据与学校合作场景？","学生一作论文和团队项目如何分配？","是否支持学生继续开发独立产品？"],
      sources:[
        ["团队/研究主页","https://e2lab.ecnu.edu.cn/19521/list.htm","official"],
        ["学习大数据讲座记录","https://ed.ecnu.edu.cn/b4/17/c45915a635927/page.htm","official"],
        ["专业建设与培养记录","https://www.ecnu.edu.cn/info/1094/61618.htm","official"]
      ]
    },
    {
      key:"南开大学|高楠", level:"medium", label:"培养理念公开",
      style:"导师本人公开说明重视真实落地，鼓励学生在严谨学术训练之外参与产学研合作；这是自述，不是学生评价。",
      signals:["明确欢迎博士、硕士、实习生与合作项目","鼓励研究被真实使用","公开学生竞赛、项目与开源数据集成果","研究方向直接覆盖心理健康干预和智能教育"],
      feedback:"未找到独立学生口碑样本；培养理念透明度较高，但仍需向在读生核验执行情况。",
      fit:"与你的技术产品最直接匹配之一，同时也是计算方法门槛最高的路线之一。",
      questions:["博士生的算法与系统论文最低预期？","组会、代码审查和论文反馈频率？","产学研项目是否占用大量学生时间？","APP可否作为个人长期研究平台？"],
      sources:[["南开软件学院官方主页","https://cs.nankai.edu.cn/szdw/fjs/gn.htm","official"]]
    },
    {
      key:"北京大学|甘怡群", level:"medium", label:"有学生产出信号",
      style:"公开活动显示课题组学生在行为健康与AI交叉会议中有多名获奖；具体管理强度和指导方式未知。",
      signals:["近年学生在行为健康与人工智能会议获优秀报告","研究方向覆盖数字心理健康、移动感知和大模型","2004年存在一条正面但严重过时的非官方点评"],
      feedback:"现代、可核验的学生培养评价不足。2004年网络点评距今过久，只作为历史弱信号，不进入当前判断。",
      fit:"学术与项目契合强，但竞争和方法要求极高。",
      questions:["导师当前亲自指导博士生的频率？","健康心理与通用行为改变之间的边界？","数据采集、移动感知和伦理资源是否开放？","学生是否有自主项目空间？"],
      sources:[
        ["学院青年学者与学生获奖记录","https://www.psy.lb.pku.edu.cn/xwzx/xyxw/50c8f6bcc44e46e1b57a173b5e538c5f.htm","official"],
        ["2004年非官方旧点评（低权重）","https://edu.sina.cn/sa/2004-12-01/detail-ikftpnny8683012.d.html?vt=4","anonymous"]
      ]
    },
    {
      key:"清华大学|饶培伦", level:"medium", label:"有教学与个案信号",
      style:"公开教学报道描述其授课风格幽默、重视讨论；一则毕业生故事显示其曾支持学生担任助教和发展教学能力。不能直接等同于博士课题组管理。",
      signals:["支持学生获得教学实践机会","公开课程记录显示互动性较强","人因、用户体验和福祉设计资源丰富"],
      feedback:"第三方导师平台显示0条匿名评价；现有信号主要来自官方教学与个案报道。",
      fit:"适合产品、人因和行为设计，但必须确认工程建模要求与产品所有权。",
      questions:["博士生每周汇报和里程碑制度？","学生可否保留创业/产品项目？","导师对定性、实验和工程建模的比例要求？","实验室项目与个人论文如何平衡？"],
      sources:[
        ["官方教师主页","https://www.ie.tsinghua.edu.cn/info/1051/2349.htm","official"],
        ["毕业生个案：支持助教发展","https://www.tsinghua.edu.cn/info/1181/54242.htm","named"],
        ["课程学习记录","https://www.imem.tsinghua.edu.cn/info/1217/1364.htm","official"],
        ["第三方匿名平台：0条评价","https://www.mysupervisor.org/topic/View/25470","anonymous"]
      ]
    },
    {
      key:"北京大学|符仲芳", level:"medium", label:"团队公开度较高",
      style:"个人网站公开合作成员、研究主题和部分在读博士，显示合作网络透明；具体组会与管理方式未知。",
      signals:["公开列出跨校合作伙伴与博士生","研究聚焦数字干预、CBT和机制验证","存在大学生团体治疗与网络心理干预项目"],
      feedback:"未找到足够的独立学生口碑。公开团队信息比多数导师更透明，但不能替代在读生访谈。",
      fit:"数字干预高度契合，临床伦理与循证要求是主要门槛。",
      questions:["非临床行为改变项目是否可进入课题组？","临床训练和伦理审批要求？","学生是否能主导数字产品迭代？","署名与数据使用规则？"],
      sources:[
        ["官方教师主页","https://www.psy.pku.edu.cn/szdw/qzjy/jsyjy/fzf/index.htm","official"],
        ["个人研究与合作团队页面","https://www.fuzhongfang.com/zh/","official"]
      ]
    },
    {
      key:"北京师范大学|骆方", level:"medium", label:"学生名单公开",
      style:"官方主页公开历届学生和学生参与论文，培养透明度较好；管理强度与反馈速度未知。",
      signals:["公开列出学生指导名单","多篇论文可见学生在前、导师通讯的合作模式","课程与研究方法训练体系完整"],
      feedback:"第三方平台显示1条匿名评价，但正文不可公开核验，因此不转述、不计入结论。",
      fit:"适合把产品日志转成心理测量和过程数据研究，统计门槛很高。",
      questions:["博士生统计基础的最低要求？","学生一作比例和项目分配方式？","导师改稿周期？","是否支持围绕自有平台长期积累数据？"],
      sources:[
        ["官方主页与学生指导名单","https://psych.bnu.edu.cn/szdw/zrjs/js/lf/index.htm","official"],
        ["第三方匿名平台：1条但内容不可核验","https://www.mysupervisor.org/Forum/View/6418","anonymous"]
      ]
    },
    {
      key:"华东师范大学|邓赐平", level:"low", label:"公开样本不足",
      style:"公开活动强调科研伦理和基础训练；未找到研究生对日常指导的可核验描述。",
      signals:["长期从事学习、认知发展和技术交叉研究","公开讲座强调科学性与科研伦理"],
      feedback:"缺少独立学生反馈、管理制度和毕业去向的公开材料。",
      fit:"研究方向可衔接学习动机和AI，但人群与方法需要精准匹配。",
      questions:["当前博士生主要研究人群？","课题组实验和技术开发要求？","选题自由度与导师指定比例？","是否支持高校成人样本与真实产品研究？"],
      sources:[
        ["官方教师主页","https://faculty.ecnu.edu.cn/_s9/dcp/main.psp","official"],
        ["科研伦理讲座记录","https://jsjyxy.wzu.edu.cn/info/1966/47479.htm","official"]
      ]
    },
    {
      key:"清华大学|张丹", level:"medium", label:"学生产出可见",
      style:"官方论文列表中大量学生/青年研究者位于前列，显示稳定团队产出；日常管理和压力水平未知。",
      signals:["研究成果中可见多名学生前置署名","研究横跨情感计算、学习科学和HCI","技术设备与多模态方法资源强"],
      feedback:"未找到可独立核验的培养口碑，不能从论文署名直接推断管理风格。",
      fit:"适合多模态升级版产品研究，但设备、信号处理和实验要求较高。",
      questions:["博士生是否必须以脑电/近红外为主？","学生一作与共同一作规则？","设备资源排期和数据所有权？","导师反馈频率和毕业标准？"],
      sources:[
        ["清华心理与认知科学系主页","https://www.pcs.tsinghua.edu.cn/info/1009/1355.htm","official"],
        ["脑与智能实验室主页","https://brain.tsinghua.edu.cn/info/1010/1017.htm","official"]
      ]
    },
    {
      key:"浙江大学|张祎祺", level:"low", label:"公开样本不足",
      style:"未知；公开材料主要反映人因工程与行为绩效研究。",
      signals:["官方标注博士生导师","研究聚焦人机交互和行为绩效建模"],
      feedback:"搜索中出现同名英语培训经历，已判定为非导师培养证据并剔除。未找到可靠学生口碑。",
      fit:"方法与HCI契合，但场景从自动驾驶迁移到行为改变需要导师认可。",
      questions:["是否接受非交通场景的HCI研究？","博士生建模与编程要求？","课题组项目是否限定特定行业？","组会和论文反馈节奏？"],
      sources:[["浙江大学官方主页","https://person.zju.edu.cn/yiqizhang","official"]]
    },
    {
      key:"浙江大学|刘鹏", level:"low", label:"公开样本不足",
      style:"未知；官方主页提供研究方向与加入团队入口，但缺少学生培养制度描述。",
      signals:["博士生导师","研究覆盖工程心理、人机交互和AI机器心理","页面设置加入团队入口"],
      feedback:"搜索中出现其他学校、其他院系同名刘鹏的评分，均已剔除，不能嫁接到本导师。",
      fit:"智能教练与人机协作方向匹配，实验和计算模型门槛较高。",
      questions:["当前博士名额与具体研究主题？","是否接受自有APP作为实验平台？","工程项目和论文任务比例？","学生毕业标准及常见周期？"],
      sources:[["浙江大学心理系官方主页","https://person.zju.edu.cn/pengliu","official"]]
    },
    {
      key:"浙江大学|陈珂", level:"low", label:"公开样本不足",
      style:"未知；官方主页公开实验室成员入口与研究方向，但缺少可核验学生评价。",
      signals:["博士生导师","研究覆盖科技接受、数智压力和人机交互","官方主页设实验室成员栏目"],
      feedback:"搜索到的“浙江大学计算机学院陈珂”匿名评价属于同名他人，已剔除。",
      fit:"适合研究技术接受与持续使用，但当前人群偏老年，需要确认是否接纳大学生或一般成人。",
      questions:["是否接受大学生/一般成人样本？","课题组是否有科技接受的纵向数据？","产品实验可否由学生自主设计？","导师亲自指导频率？"],
      sources:[["浙江大学心理系官方主页","https://person.zju.edu.cn/kechen","official"]]
    },
    {
      key:"北京师范大学|王文超", level:"medium", label:"培养信息透明",
      style:"官方主页公开招生层次、在读学生、研究项目和大量学生合作论文；具体管理强度未知。",
      signals:["明确列出学博、专博、教育博士等招生路径","公开2026级博士生和其他学生名单","获得优秀新生导师、优秀辅导员等校级荣誉","多篇近期论文由学生或青年合作者前置署名"],
      feedback:"没有找到独立匿名或实名研究生评价；官方透明度较高，但研究主题涉及危机与自杀风险，工作伦理压力大。",
      fit:"高校学生心理健康场景强匹配，临床风险管理要求也最突出。",
      questions:["危机数据与临床伦理培训如何安排？","博士生是否承担值班或高风险个案工作？","产品开发和论文任务如何分配？","导师改稿和一对一频率？"],
      sources:[
        ["官方主页与学生指导信息","https://psych.bnu.edu.cn/szdw/zrjs/fjs/wwc/index.htm","official"],
        ["教师主页论文与项目","https://faculty.bnu.edu.cn/wangwenchao/zh_CN/index.htm","official"]
      ]
    },
    {
      key:"北京师范大学|徐慰", level:"medium", label:"培养信息透明",
      style:"官方主页公开多年学生名单，并有优秀新生导师、优秀辅导员记录；具体研究生管理方式仍需在读生核验。",
      signals:["公开2019—2026多届学生名单","获得两次优秀新生导师和优秀辅导员","课程覆盖论文写作、研究方法与临床心理"],
      feedback:"未找到独立学生口碑；公开荣誉是正面信号，但不能替代博士生真实体验。",
      fit:"动态评估与微干预契合，但整体偏临床健康与正念。",
      questions:["课题组管理是细致指导还是相对放养？","学生论文反馈周期？","临床实践任务占比？","是否支持非临床行为改变产品？"],
      sources:[["官方主页、荣誉与学生名单","https://psych.bnu.edu.cn/szdw/zrjs/fjs/xw/index.htm","official"]]
    },
    {
      key:"同济大学|袁晓芳", level:"medium", label:"招生与指导信号公开",
      style:"官方主页明确招收多种专业背景学生，并公开学生竞赛指导成果；研究生日常管理未知。",
      signals:["明确欢迎心理学、计算机、设计、工程等多背景博士生","多次指导学生获得用户体验与设计竞赛奖项","研究强调HRI、HMI和用户体验"],
      feedback:"未找到独立学生口碑；竞赛指导能力是可验证信号，但不等于论文指导体验。",
      fit:"跨专业友好度高，适合把APP转成研究型交互原型。",
      questions:["博士申请是否必须有设计作品集？","论文和作品的评价权重？","学生是否可持续运营个人产品？","校企项目是否影响毕业论文节奏？"],
      sources:[["同济设计创意学院官方主页","https://tjdi.tongji.edu.cn/TeacherDetail.do?id=5725&lang=","official"]]
    },
    {
      key:"同济大学|陈晴", level:"medium", label:"有个性化支持信号",
      style:"学校班主任报道描述其关注个体差异、心理健康，并对论文困难学生提供一对一支持；这是班主任证据，不是博士培养全貌。",
      signals:["公开报道强调个性化成长和一对一沟通","与阿里、腾讯、蚂蚁、智谱等有校企合作项目","研究覆盖HCI、可视化、生成式AI和智慧教育"],
      feedback:"有官方学生工作信号，但缺少博士生对科研管理、署名和毕业压力的独立反馈。",
      fit:"AI教练、反馈可视化和智能教育高度契合，计算能力是核心门槛。",
      questions:["博士生需要达到什么编程和可视化水平？","校企项目是否支持学生一作论文？","导师一对一反馈频率？","产品原型与知识产权如何处理？"],
      sources:[
        ["同济设计创意学院官方主页","https://tjdi.tongji.edu.cn/TeacherDetail.do?id=5056","official"],
        ["同济优秀青年班主任报道","https://news.tongji.edu.cn/info/1003/86663.htm","named"]
      ]
    },
    {
      key:"北京大学|姜佟琳", level:"low", label:"公开样本不足",
      style:"未知；当前公开信息主要是研究主题和学术成果，缺少培养方式材料。",
      signals:["研究覆盖自我、意义、心理健康与行为实验","身份与自我机制和你的理论叙事较接近"],
      feedback:"未找到足够的实名学生叙述或独立匿名样本。",
      fit:"理论匹配较好，但必须把身份暗示转成可证伪机制。",
      questions:["导师当前招收方向与名额？","研究计划更偏基础机制还是数字干预？","学生选题自主度？","实验资源与样本支持？"],
      sources:[["北京大学官方教师主页","https://www.psy.pku.edu.cn/szdw/qzjy/jsyjy/jtl/index.htm","official"]]
    },
    {
      key:"南开大学|周详", level:"medium", label:"有指导荣誉与学生记录",
      style:"公开材料显示其长期参与学生指导、获优秀毕业论文指导教师奖，并强调沟通与师生关系；博士生科研管理细节未知。",
      signals:["获本科优秀毕业论文指导教师等奖项","公开课程/论文分组可见指导学生名单","研究覆盖人机协同、高效学习和行为适应","公开讲座强调尊重、真诚、共情和沟通"],
      feedback:"未找到独立博士生口碑；现有证据偏教学和本科指导。",
      fit:"社会心理与人智交互路线契合，但学位和理论框架需转向社会学/社会心理。",
      questions:["0303Z1博士的实际导师名额？","课题组更偏理论、实验还是工程合作？","博士生发表和毕业标准？","是否支持真实数字产品研究？"],
      sources:[
        ["南开官方教师主页","https://shxy.nankai.edu.cn/faculty/psychology/zx.htm","official"],
        ["历史学生指导名单","https://zfxy.nankai.edu.cn/info/1140/1142.htm","official"],
        ["师生关系讲座记录","https://webplus.hainnu.edu.cn/_s3/2016/1216/c1619a71651/page.psp","official"]
      ]
    },
    {
      key:"复旦大学|史慧静", level:"high", label:"有实名学生培养证据",
      style:"实名学生在复旦官方报道中描述：课题组有固定进度交流，强调自我管理和高年级带低年级；导师会关注职业选择与身心状态。疫情期组会频率显著提高，不能直接视作常态。",
      signals:["官方主页公开近三年学生指导数量和研究产出","实名学生描述组会、职业支持与课题组自治","多水平干预和学校健康资源丰富"],
      feedback:"目前是第一批导师中证据最具体的一位，但主要来自一名学生和疫情特殊场景，仍需访谈其他届学生交叉验证。",
      fit:"若APP转向睡眠、运动、压力等健康行为，培养资源和真实场景非常强。",
      questions:["疫情后组会频率和常态管理方式？","博士生是否承担大量队列与现场执行工作？","学生独立选题空间？","公共卫生实务和统计方法的补课要求？"],
      sources:[
        ["复旦公卫官方教师页","https://sph.fudan.edu.cn/employee/41","official"],
        ["实名学生培养叙述","https://news.fudan.edu.cn/2022/0524/c31a131437/page.htm","named"]
      ]
    }
  ];

  const mentorByKey = new Map((window.PHD_MENTORS || []).map(m => [`${m.school}|${m.name}`, m]));
  const esc = v => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const levelName = {high:'高',medium:'中',low:'低'};
  const sourceName = {official:'官方材料',named:'实名叙述',anonymous:'匿名/第三方'};
  const state = {level:'all', query:'', onlyFeedback:false};

  const style = document.createElement('style');
  style.textContent = `
    .reputation-section{scroll-margin-top:120px;margin-top:44px}.reputation-intro{padding:14px 16px;border:1px solid #f0d49e;border-radius:13px;background:#fff8e8;color:#70420c;font-size:11px;margin-bottom:14px}.reputation-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:14px}.reputation-summary article{padding:16px;background:#fff;border:1px solid var(--line);border-radius:14px}.reputation-summary span,.reputation-summary small{display:block;color:var(--muted);font-size:10px}.reputation-summary strong{display:block;margin:4px 0;font-size:24px}.reputation-controls{display:grid;grid-template-columns:minmax(260px,1fr) 1.5fr;gap:12px;padding:13px;background:#fff;border:1px solid var(--line);border-radius:14px}.reputation-filter-row{display:flex;flex-wrap:wrap;gap:6px;align-content:end}.reputation-filter{border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--muted);padding:7px 10px;font-size:10px;font-weight:800;cursor:pointer}.reputation-filter.active{color:#fff;background:var(--brand);border-color:var(--brand)}.reputation-toggle{display:inline-flex;align-items:center;gap:6px;padding:7px 9px;color:var(--muted);font-size:10px}.reputation-result{margin:9px 1px;color:var(--muted);font-size:10px}.reputation-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.reputation-card{display:flex;flex-direction:column;padding:17px;background:#fff;border:1px solid var(--line);border-radius:16px}.reputation-head{display:flex;justify-content:space-between;gap:12px}.reputation-head h3{margin:0;font-size:18px}.reputation-school{color:var(--muted);font-size:10px}.confidence{padding:5px 8px;border-radius:999px;font-size:9px;font-weight:900;white-space:nowrap}.confidence.high{color:#126143;background:#e6f7ef}.confidence.medium{color:#79500b;background:#fff4d9}.confidence.low{color:#8a3c42;background:#fff0f1}.reputation-label{margin:10px 0 8px;font-weight:850;font-size:12px}.reputation-block{padding:10px;border-radius:10px;background:#f7f8fa;margin-top:8px}.reputation-block span{display:block;color:var(--muted);font-size:9px}.reputation-block p{margin:4px 0 0;font-size:10.5px}.reputation-signals{margin:8px 0 0;padding-left:18px;color:#4f5b6c;font-size:10.5px}.reputation-signals li+li{margin-top:4px}.reputation-questions{margin-top:10px}.reputation-questions summary{cursor:pointer;color:var(--brand);font-size:10.5px;font-weight:850}.reputation-questions ol{padding-left:20px;font-size:10px;color:#4f5b6c}.reputation-sources{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:12px}.reputation-source{padding:6px 8px;border-radius:7px;background:var(--brand-soft);color:var(--brand);text-decoration:none;font-size:9px;font-weight:800}.reputation-source.anonymous{color:#82530c;background:var(--amber-soft)}.identity-warning{margin-top:13px;padding:12px 14px;border-radius:11px;background:#eef1f5;color:#526071;font-size:10px}
    @media(max-width:820px){.reputation-summary{grid-template-columns:1fr 1fr}.reputation-controls{grid-template-columns:1fr}.reputation-list{grid-template-columns:1fr}}
    @media(max-width:460px){.reputation-summary{grid-template-columns:1fr 1fr}.reputation-card{padding:15px}}
  `;
  document.head.appendChild(style);

  const nav = document.querySelector('.section-tabs');
  if(nav){
    const link = document.createElement('a'); link.href='#reputation'; link.textContent='培养与口碑';
    const history = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href') === '#history');
    nav.insertBefore(link, history || [...nav.querySelectorAll('a')].find(a => a.getAttribute('href') === '#evidence') || null);
  }

  const section = document.createElement('section');
  section.id='reputation'; section.className='reputation-section';
  section.innerHTML = `
    <div class="section-heading"><div><div class="eyebrow">MENTOR DUE DILIGENCE</div><h2>导师培养与公开口碑</h2></div><p>不做总分；将实名叙述、官方培养信号和匿名样本分层展示。</p></div>
    <div class="reputation-intro"><strong>读法：</strong>证据可信度只表示“我们对公开画像有多大把握”，不表示导师好坏。公开样本不足不等于口碑差；正面官方报道也不能替代在读生访谈。</div>
    <div class="reputation-summary">
      <article><span>首批尽调导师</span><strong id="rep-total"></strong><small>按项目适配度优先</small></article>
      <article><span>实名学生证据</span><strong id="rep-named"></strong><small>可核验具体叙述</small></article>
      <article><span>官方培养信号</span><strong id="rep-medium"></strong><small>名单、指导奖、学生成果</small></article>
      <article><span>样本不足</span><strong id="rep-low"></strong><small>需要直接访谈核实</small></article>
    </div>
    <div class="reputation-controls">
      <div class="search-wrap"><label for="reputation-search">搜索导师、学校或培养信号</label><input id="reputation-search" type="search" placeholder="例如：产品、组会、一对一、学生一作、匿名样本"></div>
      <div class="reputation-filter-row">
        <button class="reputation-filter active" data-rep-level="all" type="button">全部</button>
        <button class="reputation-filter" data-rep-level="high" type="button">高可信证据</button>
        <button class="reputation-filter" data-rep-level="medium" type="button">中等证据</button>
        <button class="reputation-filter" data-rep-level="low" type="button">样本不足</button>
        <label class="reputation-toggle"><input id="rep-feedback-only" type="checkbox">只看有学生叙述/匿名样本</label>
      </div>
    </div>
    <div id="reputation-result" class="reputation-result"></div>
    <div id="reputation-list" class="reputation-list"></div>
    <div class="identity-warning"><strong>同名校验：</strong>本轮已剔除多条同名错配结果，包括其他院系或其他学校的“陈珂”“刘鹏”“张丹”等。只有学校、院系和研究方向同时匹配，才进入证据库。</div>`;

  const history = document.getElementById('history');
  const anchor = history || document.querySelector('.decision-section') || document.getElementById('evidence');
  if(anchor) anchor.parentNode.insertBefore(section, anchor); else document.querySelector('main')?.appendChild(section);

  function hasFeedback(p){return p.sources.some(s => s[2] === 'named' || s[2] === 'anonymous');}
  function corpus(p){const m=mentorByKey.get(p.key)||{};return [p.key,p.label,p.style,p.feedback,p.fit,...p.signals,...p.questions,m.route,...(m.themes||[])].join(' ').toLowerCase();}
  function filtered(){return PROFILES.filter(p => (state.level==='all'||p.level===state.level) && (!state.onlyFeedback||hasFeedback(p)) && (!state.query||corpus(p).includes(state.query.toLowerCase())));}
  function render(){
    const rows=filtered();
    document.getElementById('rep-total').textContent=PROFILES.length;
    document.getElementById('rep-named').textContent=PROFILES.filter(p=>p.sources.some(s=>s[2]==='named')).length;
    document.getElementById('rep-medium').textContent=PROFILES.filter(p=>p.level==='medium').length;
    document.getElementById('rep-low').textContent=PROFILES.filter(p=>p.level==='low').length;
    document.getElementById('reputation-result').textContent=`显示 ${rows.length} / ${PROFILES.length} 位导师；${rows.filter(hasFeedback).length} 位存在公开学生叙述或匿名样本`;
    document.getElementById('reputation-list').innerHTML=rows.map(p=>{
      const [school,name]=p.key.split('|'); const m=mentorByKey.get(p.key)||{};
      return `<article class="reputation-card">
        <div class="reputation-head"><div><h3>${esc(name)}</h3><div class="reputation-school">${esc(school)} · ${esc(m.unit||'')}</div></div><span class="confidence ${p.level}">证据可信度 ${levelName[p.level]}</span></div>
        <div class="theme-row">${(m.themes||[]).map(t=>`<span class="theme">${esc(t)}</span>`).join('')}</div>
        <div class="reputation-label">${esc(p.label)}</div>
        <div class="reputation-block"><span>公开培养画像</span><p>${esc(p.style)}</p></div>
        <ul class="reputation-signals">${p.signals.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
        <div class="reputation-block"><span>公开学生反馈状态</span><p>${esc(p.feedback)}</p></div>
        <div class="reputation-block"><span>与你的匹配判断</span><p>${esc(p.fit)}</p></div>
        <details class="reputation-questions"><summary>联系导师/在读生时必须核实的4个问题</summary><ol>${p.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ol></details>
        <div class="reputation-sources">${p.sources.map(([label,url,type])=>`<a class="reputation-source ${type==='anonymous'?'anonymous':''}" href="${esc(url)}" target="_blank" rel="noreferrer">${esc(sourceName[type])} · ${esc(label)} ↗</a>`).join('')}</div>
      </article>`;
    }).join('') || '<div class="empty-state">没有符合当前条件的导师。</div>';
  }

  document.querySelector('.reputation-filter-row').addEventListener('click',e=>{const b=e.target.closest('[data-rep-level]');if(!b)return;state.level=b.dataset.repLevel;document.querySelectorAll('[data-rep-level]').forEach(x=>x.classList.toggle('active',x===b));render();});
  document.getElementById('reputation-search').addEventListener('input',e=>{state.query=e.target.value.trim();render();});
  document.getElementById('rep-feedback-only').addEventListener('change',e=>{state.onlyFeedback=e.target.checked;render();});
  render();
})();

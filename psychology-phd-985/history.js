(() => {
  const coreProjects = window.PSYCHOLOGY_PHD_PROJECTS || [];
  const crossProjects = window.CROSS_DISCIPLINARY_PROJECTS || [];
  const projectIndex = new Map([...coreProjects, ...crossProjects].map(p => [p.id, p]));

  const HISTORY = [
    {projectId:"bnu-academic",year:2023,scope:"core",kind:"计划",headline:"总计划73人，含直博和硕博连读",metrics:[['学院总计划','73'],['重点实验室名额','44'],['进入复试比例','不高于1:4']],note:"拟接收直博约16人；重点实验室拟接收硕博连读约20人，心理学部非国重拟接收硕博连读约5人。普通申请名额不能用73直接推算。",source:"https://yz.bnu.edu.cn/content/zyml/2023/bsxx_yxsm-038.html",quality:"quant"},
    {projectId:"bnu-academic",year:2024,scope:"core",kind:"计划",headline:"总计划74人，规模基本持平",metrics:[['学院总计划','74'],['重点实验室名额','43'],['复试总分','200']],note:"复试仍为笔试60分、面试140分，低于120分不录取；按专业和导师排序。",source:"https://yz.bnu.edu.cn/content/zyml/2024/bsxx_yxsm-038.html",quality:"quant"},
    {projectId:"bnu-academic",year:2025,scope:"core",kind:"计划",headline:"总计划增至99人",metrics:[['学院总计划','99'],['重点实验室名额','47']],note:"仍包含本科直博和硕博连读。总计划扩张不等于普通申请名额同比例增加。",source:"https://yz.bnu.edu.cn/content/zyml/2025/bsxx_yxsm-038.html",quality:"quant"},
    {projectId:"bnu-academic",year:2026,scope:"core",kind:"计划",headline:"总计划增至111人",metrics:[['学院总计划','111'],['重点实验室名额','54']],note:"四年总计划持续上升，但必须结合当年直博、硕博连读人数和导师余额判断公开招考机会。",source:"https://yz.bnu.edu.cn/content/zyml/2026/bsxx_yxsm-038.html",quality:"quant"},

    {projectId:"bnu-io",year:2025,scope:"core",kind:"新增项目",headline:"应用心理专业博士首届招生",metrics:[['起始年份','2025'],['工作经历','至少1年']],note:"北师大2024年获批首批应用心理专业博士培养单位，自2025年招生。工业与组织方向要求心理或相关领域全职经历。",source:"https://yz.bnu.edu.cn/content/zyml/2025/bsxx_yxsm-682.html",quality:"policy"},
    {projectId:"bnu-student",year:2025,scope:"core",kind:"新增项目",headline:"学生心理健康专业博士开始招生",metrics:[['起始年份','2025'],['工作经历','至少1年']],note:"具有心理学、医学、教育学背景或学生心理健康应用研究经验者更有优势。",source:"https://psych.bnu.edu.cn/xwzx/tzgg/7fdadfe19523457b9a5221e87fd94f40.htm",quality:"policy"},
    {projectId:"bnu-clinical",year:2025,scope:"core",kind:"新增项目",headline:"临床与咨询非全日制专博首届招生",metrics:[['学习方式','非全日制'],['学制','4年'],['年招生规模','约40']],note:"学院公开介绍为2025年开始招生、每年约40人；仍有咨询小时、督导和临床训练等专业门槛。",source:"https://psych.bnu.edu.cn/rcpy/zsxxa_0/index.htm",quality:"quant"},

    {projectId:"ecnu-academic",year:2024,scope:"core",kind:"筛选规则",headline:"材料审核把研究计划放在最高权重",metrics:[['教育背景','20分'],['学术表现','30分'],['研究计划','50分'],['入围比例','约3:1']],note:"综合考核为外语、专业基础、综合测评各100分；总分低于180或任一科低于60不录取。",source:"https://psy.ecnu.edu.cn/8c/33/c17478a560179/page.htm",quality:"quant"},
    {projectId:"ecnu-academic",year:2025,scope:"core",kind:"招生机制",headline:"继续按二级学科申请—考核",metrics:[['招生方式','申请—考核'],['导师关系','意向导师']],note:"意向导师不等于最终导师，实际录取仍受计划数、导师限招和双向选择影响。",source:"https://psy.ecnu.edu.cn/05/c0/c17481a656832/page.htm",quality:"policy"},
    {projectId:"ecnu-academic",year:2026,scope:"core",kind:"招生机制",headline:"申请—考核制延续",metrics:[['普通申请学制','4年']],note:"2026工作办法继续执行申请—考核；具体计划和导师以年度目录为准。",source:"https://psy.ecnu.edu.cn/19/57/c17481a727383/page.htm",quality:"policy"},
    {projectId:"ecnu-professional",year:2025,scope:"core",kind:"新增项目",headline:"新增非全日制应用心理博士",metrics:[['学习方式','非全日制'],['学费','9万元/年']],note:"2025年学校新增045400应用心理非全日制博士，非全日制只招定向就业。",source:"https://yjszs.ecnu.edu.cn/03/1a/c43459a656154/page.htm",quality:"quant"},
    {projectId:"ecnu-professional",year:2026,scope:"core",kind:"项目扩展",headline:"新增全日制收费路径",metrics:[['非全日制','9万元/年'],['全日制','8万元/年'],['培养改革全日制','1万元/年']],note:"2026学费表首次同时列出应用心理全日制和非全日制路径，具体招生方向与计划仍须查当年目录。",source:"https://yjszs.ecnu.edu.cn/_upload/article/files/0e/27/e52e3a9d45d3aaa0c20340f8a73a/f1289e9a-b350-40db-a38f-c665470f7459.pdf",quality:"quant"},

    {projectId:"zju-prof-full",year:2025,scope:"core",kind:"首届计划",headline:"首批应用心理专博公开招生",metrics:[['全日制计划','6'],['学制','4年'],['学费','29.8万元/全程']],note:"全日制要求至少1年心理或相关领域经历；报名阶段不选导师。",source:"https://www.psych.zju.edu.cn/2025/0331/c27648a3032938/page.htm",quality:"quant"},
    {projectId:"zju-prof-part",year:2025,scope:"core",kind:"首届计划",headline:"非全日制首届计划12人",metrics:[['非全日制计划','12'],['工作经历','硕士后至少3年'],['学费','39.8万元/全程']],note:"非全日制定向，工作经历按2025年9月入学时间计算。",source:"https://www.psych.zju.edu.cn/2025/0331/c27648a3032938/page.htm",quality:"quant"},
    {projectId:"zju-prof-full",year:2025,scope:"core",kind:"考核规则",headline:"材料审核后差额综合考核",metrics:[['面试合格线','60'],['单人面试','不少于30分钟']],note:"未达到英语或专业基础条件者可参加笔试补救，笔试60分通过后才能进入面试。",source:"https://www.psych.zju.edu.cn/2025/0514/c27648a3049386/page.htm",quality:"policy"},

    {projectId:"sjtu-prof",year:2025,scope:"core",kind:"导师名额",headline:"临床与健康方向计划加扩招共9人",metrics:[['原计划','8'],['扩招','1'],['合计','9']],note:"公开图片列出6位导师，计划分别为1、1、2、1、1、2；随后应用心理扩招1名。",source:"https://psychology.sjtu.edu.cn/zsxx/344.html",quality:"quant"},
    {projectId:"sjtu-academic",year:2025,scope:"core",kind:"扩招",headline:"脑与认知方向扩招2名",metrics:[['扩招名额','2']],note:"2025复试办法以图片公布基础导师计划，公开文本可确认心理学方向另扩招2名；基础计划需结合原图核验。",source:"https://psychology.sjtu.edu.cn/zsxx/344.html",quality:"partial"},
    {projectId:"sjtu-academic",year:2026,scope:"core",kind:"导师名额",headline:"官方名单11位导师，每位1名",metrics:[['导师数','11'],['公布名额','11']],note:"6位脑与认知科学、5位临床与健康心理学；2027是否延续需重新确认。",source:"https://psychology.sjtu.edu.cn/zsxx/468.html",quality:"quant"},
    {projectId:"sjtu-prof",year:2026,scope:"core",kind:"导师名额",headline:"官方名单8位导师，每位1名",metrics:[['导师数','8'],['公布名额','8']],note:"全部为临床与健康心理学方向，相比2025公开总计划少1名。",source:"https://psychology.sjtu.edu.cn/zsxx/468.html",quality:"quant"},

    {projectId:"thu-academic",year:2026,scope:"core",kind:"招生节奏",headline:"设置7月与11月两个申请时段",metrics:[['第一时段','7月'],['第二时段','11月']],note:"专项计划只在第一时段招生；是否两批都开放取决于年度简章和计划。",source:"https://www.pcs.tsinghua.edu.cn/info/1031/1791.htm",quality:"policy"},
    {projectId:"thu-academic",year:2027,scope:"core",kind:"招生节奏",headline:"第一批已结束，第二批取决于余额",metrics:[['第一批截止','2026-07-28'],['第二批','可能11月']],note:"2027第一批在2026年7月完成，第二批不是固定存在。",source:"https://www.pcs.tsinghua.edu.cn/info/1031/2141.htm",quality:"policy"},

    {projectId:"pku-academic",year:2026,scope:"core",kind:"复试规模",headline:"学术博士复试名单23人",metrics:[['复试总人数','23'],['其中专项','1'],['普通口径','22']],note:"覆盖基础心理学和应用心理学；这是进入复试人数，不是最终录取人数。",source:"https://psy.pku.edu.cn/docs/2026-03/cf51e0b39bee4c829c1851e2a4556c07.pdf",quality:"quant"},
    {projectId:"pku-prof",year:2026,scope:"core",kind:"首届复试",headline:"非全日制应用心理专博复试14人",metrics:[['复试人数','14'],['学费','46.4万元/全程'],['学制','4年']],note:"2026为该专业博士公开招生首届，复试采用不少于30分钟的综合面试。",source:"https://psy.pku.edu.cn/docs/2026-03/1aa40e44f8e942d793b51e663fafb529.pdf",quality:"quant"},

    {projectId:"sysu-academic",year:2024,scope:"core",kind:"复试录取",headline:"15名公开招考进入综合考核，首轮拟录取5人",metrics:[['公开招考复试','15'],['专项复试','2'],['首轮拟录取','5']],note:"之后至少发布两次补录公告，因此最终录取人数高于首轮5人；不能把首轮比例当最终报录比。",source:"https://psy.sysu.edu.cn/article/1156",quality:"quant"},
    {projectId:"sysu-academic",year:2025,scope:"core",kind:"复试录取",headline:"16名公开招考进入综合考核，8人拟录取",metrics:[['公开招考复试','16'],['专项复试','2'],['拟录取','8'],['候补','8']],note:"公开招考复试名单与结果一一对应，首轮拟录取率为50%；不含专项计划。",source:"https://psy.sysu.edu.cn/article/1290",quality:"quant"},

    {projectId:"csu-academic",year:2024,scope:"core",kind:"数据缺口",headline:"学校发布总简章，但心理学方向未集中披露",metrics:[['可比录取数据','未找到']],note:"心理学博士招生分散在湘雅相关培养单位，年度导师、复试和录取数据需要按医院和二级培养单位逐一追踪。",source:"https://gra.csu.edu.cn/info/1011/39699.htm",quality:"gap"},

    {projectId:"ecnu-edtech",year:2024,scope:"cross",kind:"招生机制",headline:"教育技术学实行申请—考核",metrics:[['年度','2024'],['方式','申请—考核']],note:"招生学科和导师以年度目录为准，材料审核后进入综合考核。",source:"https://www.deit.ecnu.edu.cn/8b/41/c26199a559937/page.htm",quality:"policy"},
    {projectId:"ecnu-edtech",year:2025,scope:"cross",kind:"招生机制",headline:"申请—考核延续",metrics:[['材料截止','2024-12-30']],note:"2025办法继续强调研究计划、科研成果、英语与导师双向选择。",source:"https://www.deit.ecnu.edu.cn/07/5c/c26199a657244/page.htm",quality:"policy"},
    {projectId:"nankai-software",year:2025,scope:"cross",kind:"招生节奏",headline:"全年至少两批申请—考核",metrics:[['申请批次','2批']],note:"学院公开了第二批材料审核结果，说明该项目并非只有一次年度窗口。",source:"https://cs.nankai.edu.cn/info/1076/3357.htm",quality:"policy"},
    {projectId:"nankai-software",year:2026,scope:"cross",kind:"招生节奏",headline:"继续执行两批申请—考核",metrics:[['第一批','已公示'],['第二批','已公示']],note:"分批次意味着导师余额会变化，不能只看第一批或只在春季临时准备。",source:"https://cs.nankai.edu.cn/index/yjszs.htm",quality:"policy"},
    {projectId:"tongji-design",year:2023,scope:"cross",kind:"材料竞争",headline:"材料成绩公示后有10人申请复核",metrics:[['复核申请','10']],note:"不是申请总人数，但反映材料审核是实质性竞争环节。",source:"https://tjdi.tongji.edu.cn/NewsDetail.do?ID=5375&lang=cn",quality:"partial"},
    {projectId:"tongji-design",year:2024,scope:"cross",kind:"材料竞争",headline:"材料审核成绩公示后有17人申请复核",metrics:[['复核申请','17']],note:"学院继续采用申请—考核，并公开复试结果和招生结果。",source:"https://tjdi.tongji.edu.cn/NewsDetail.do?ID=5569",quality:"partial"},
    {projectId:"tongji-design",year:2025,scope:"cross",kind:"招生机制",headline:"按报考代码和招生类型分别排序录取",metrics:[['方式','申请—考核']],note:"复试要求提交博士阶段研究内容和计划，且汇报材料需隐去报考导师信息。",source:"https://tjdi.tongji.edu.cn/NewsDetail.do?ID=5799",quality:"policy"},
    {projectId:"fudan-ph-academic",year:2024,scope:"cross",kind:"招生机制",headline:"公共卫生学院继续申请—考核",metrics:[['方式','申请—考核']],note:"公开招生资料按专业英语、材料初审和复试组织。",source:"https://sph.fudan.edu.cn/ac/44?p=2&s=18",quality:"policy"},
    {projectId:"fudan-ph-academic",year:2025,scope:"cross",kind:"招生机制",headline:"英语达线后进入材料专家审核",metrics:[['报名窗口','2024-12-05至12-31']],note:"学院先审核英语和材料完整性，再由专家组评价科研基础和研究计划。",source:"https://sph.fudan.edu.cn/a/2597",quality:"policy"},
    {projectId:"fudan-ph-part",year:2026,scope:"cross",kind:"新增项目",headline:"新增非全日制公共卫生专业博士",metrics:[['学习方式','非全日制'],['论文硬线','近3年第一作者英文论文≥1']],note:"属于新增在职路径，但公共卫生实务经历和英文论文要求构成明显门槛。",source:"https://sph.fudan.edu.cn/a/2786",quality:"policy"}
  ];

  const TRENDS = {
    'bnu-academic':'学院总计划从73增至111，但始终包含直博和硕博连读，不能据此估算普通申请录取率。',
    'bnu-io':'2025年新设专业博士，历史样本很短，重点观察2027导师名单与工作经历认定。',
    'bnu-student':'2025年新设，适合高校场景，但需证明学生心理健康相关全职经历。',
    'bnu-clinical':'2025年开始、规模较大，但临床资格门槛使其不构成普通在职捷径。',
    'ecnu-academic':'考核结构长期强调研究计划和材料质量，导师只是意向，最终仍按学科和双向选择配置。',
    'ecnu-professional':'2025仅非全日制，2026新增全日制收费路径，项目正处在快速调整期。',
    'zju-prof-full':'2025首届全日制计划6人，成本和科研门槛从一开始就较高。',
    'zju-prof-part':'2025首届非全日制计划12人，工作年限和39.8万元成本同时存在。',
    'sjtu-academic':'年度名额高度依赖导师名单；2026公开11名额，且录取后必须全脱产转档。',
    'sjtu-prof':'2025计划9人、2026公布8人，方向持续集中于临床与健康心理。',
    'thu-academic':'申请窗口早且第二批不确定，必须把准备时间提前到入学前一年的夏季。',
    'pku-academic':'公开可比数据主要从2026开始；复试人数不等于录取人数，且唯一导师制度放大匹配风险。',
    'pku-prof':'2026首届，14人进入复试；46.4万元成本和非全日制职业回报需单独评估。',
    'sysu-academic':'2024、2025公开招考复试池均约15—16人；2025首轮8人拟录取，竞争规模小而集中。',
    'csu-academic':'数据长期分散，信息透明度本身就是申请风险。',
    'ecnu-edtech':'2024—2025连续申请—考核，制度稳定，关键变量是导师方向和教育场景匹配。',
    'nankai-software':'连续实行分批申请，越晚申请越依赖剩余导师名额。',
    'tongji-design':'连续多年公开材料审核和复试结果，作品与研究计划是实质筛选，不是形式附件。',
    'fudan-ph-academic':'申请—考核制度稳定，英语、英文论文和公共卫生方法构成长期门槛。',
    'fudan-ph-part':'2026新增，历史尚不足以判断稳定招生规模。'
  };

  function esc(v){return String(v ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  const qualityLabel = {quant:'官方量化数据',policy:'官方制度数据',partial:'部分可比数据',gap:'数据缺口'};
  const years = [...new Set(HISTORY.map(x=>x.year))].sort((a,b)=>b-a);
  const state = {scope:'all',year:'all',query:'',quantOnly:false};

  const style = document.createElement('style');
  style.id = 'history-style';
  style.textContent = `
    .history-section{scroll-margin-top:120px;margin-top:44px}.history-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:15px}.history-summary article{padding:16px;background:#fff;border:1px solid var(--line);border-radius:14px}.history-summary span,.history-summary small{display:block;color:var(--muted);font-size:10px}.history-summary strong{display:block;margin:4px 0;font-size:24px}.history-controls{display:grid;grid-template-columns:minmax(260px,1fr) 1.6fr;gap:12px;padding:13px;background:#fff;border:1px solid var(--line);border-radius:14px}.history-filter-row{display:flex;flex-wrap:wrap;gap:6px;align-content:end}.history-filter{border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--muted);padding:7px 10px;font-size:10px;font-weight:800;cursor:pointer}.history-filter.active{color:#fff;background:var(--brand);border-color:var(--brand)}.quant-toggle{display:inline-flex;align-items:center;gap:6px;padding:7px 9px;color:var(--muted);font-size:10px}.history-result{margin:10px 1px;color:var(--muted);font-size:10px}.history-projects{display:grid;gap:13px}.history-project{background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden}.history-project-head{display:flex;justify-content:space-between;gap:16px;padding:17px 18px;background:#f8f9fb;border-bottom:1px solid var(--line)}.history-project-head h3{margin:0 0 3px;font-size:17px}.history-project-head p{margin:0;color:var(--muted);font-size:10.5px;max-width:820px}.history-coverage{text-align:right;color:var(--brand);font-size:11px;font-weight:850;white-space:nowrap}.history-timeline{display:grid}.history-record{display:grid;grid-template-columns:80px 145px 1fr;gap:14px;padding:15px 18px;border-bottom:1px solid var(--line)}.history-record:last-child{border-bottom:0}.history-year{font-size:22px;font-weight:900;color:var(--brand)}.history-kind{display:inline-flex;align-self:start;padding:5px 8px;border-radius:999px;background:var(--brand-soft);color:var(--brand);font-size:9px;font-weight:850}.history-record.partial .history-kind{color:var(--amber);background:var(--amber-soft)}.history-record.gap .history-kind{color:var(--red);background:var(--red-soft)}.history-body h4{margin:0 0 8px;font-size:14px}.history-metrics{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:8px}.history-metric{padding:6px 8px;border-radius:8px;background:#f4f6f9}.history-metric span{display:block;color:var(--muted);font-size:8px}.history-metric strong{display:block;font-size:11px}.history-note{margin:0;color:#536071;font-size:10.5px}.history-source{display:inline-block;margin-top:8px;color:var(--brand);font-size:9.5px;font-weight:800;text-decoration:none}.history-quality{margin-left:7px;color:var(--muted);font-size:8.5px}.history-empty{padding:34px;text-align:center;color:var(--muted);background:#fff;border:1px dashed var(--line);border-radius:14px}
    @media(max-width:820px){.history-summary{grid-template-columns:1fr 1fr}.history-controls{grid-template-columns:1fr}.history-record{grid-template-columns:58px 1fr}.history-kind{grid-column:2}.history-body{grid-column:2}.history-project-head{display:block}.history-coverage{margin-top:7px;text-align:left}.history-year{font-size:18px}}
    @media(max-width:460px){.history-summary{grid-template-columns:1fr 1fr}.history-record{padding:13px;gap:9px}.history-project-head{padding:14px}.history-metrics{display:grid;grid-template-columns:1fr 1fr}.history-metric{min-width:0}}
  `;
  document.head.appendChild(style);

  const nav = document.querySelector('.section-tabs');
  if(nav){
    const link=document.createElement('a');link.href='#history';link.textContent='历史趋势';
    const evidence=[...nav.querySelectorAll('a')].find(a=>a.getAttribute('href')==='#evidence');
    nav.insertBefore(link,evidence||null);
  }

  const section=document.createElement('section');
  section.id='history';section.className='history-section';
  section.innerHTML=`
    <div class="section-heading"><div><div class="eyebrow">HISTORICAL EVIDENCE</div><h2>往届招生与规则变化</h2></div><p>分别记录计划、复试、录取、导师名额和制度变化；不同口径绝不混算为“报录比”。</p></div>
    <div class="history-summary">
      <article><span>历史记录</span><strong id="history-record-count"></strong><small>官方页面逐条留源</small></article>
      <article><span>覆盖项目</span><strong id="history-project-count"></strong><small>心理学与交叉路径</small></article>
      <article><span>量化记录</span><strong id="history-quant-count"></strong><small>包含计划/复试/录取数字</small></article>
      <article><span>覆盖年份</span><strong>2023—2027</strong><small>以2023—2026为主</small></article>
    </div>
    <div class="history-controls">
      <div class="search-wrap"><label for="history-search">搜索学校、项目、年份或变化</label><input id="history-search" type="search" placeholder="例如：中山大学、2025、首届、学费、拟录取"></div>
      <div class="history-filter-row">
        <button class="history-filter active" data-history-scope="all" type="button">全部项目</button>
        <button class="history-filter" data-history-scope="core" type="button">心理学项目</button>
        <button class="history-filter" data-history-scope="cross" type="button">交叉项目</button>
        <button class="history-filter active" data-history-year="all" type="button">全部年份</button>
        ${years.map(y=>`<button class="history-filter" data-history-year="${y}" type="button">${y}</button>`).join('')}
        <label class="quant-toggle"><input id="history-quant-only" type="checkbox">只看量化数据</label>
      </div>
    </div>
    <div id="history-result" class="history-result"></div>
    <div id="history-projects" class="history-projects"></div>`;
  const anchor=document.querySelector('.decision-section') || document.getElementById('evidence');
  if(anchor) anchor.parentNode.insertBefore(section,anchor); else document.querySelector('main')?.appendChild(section);

  function projectLabel(id){
    const p=projectIndex.get(id);return p?`${p.school} · ${p.project}`:id;
  }
  function filtered(){
    return HISTORY.filter(r=>{
      if(state.scope!=='all'&&r.scope!==state.scope)return false;
      if(state.year!=='all'&&String(r.year)!==String(state.year))return false;
      if(state.quantOnly&&r.quality!=='quant')return false;
      if(!state.query)return true;
      const p=projectIndex.get(r.projectId)||{};
      return [p.school,p.project,r.year,r.kind,r.headline,r.note,...r.metrics.flat()].join(' ').toLowerCase().includes(state.query.toLowerCase());
    });
  }
  function render(){
    const rows=filtered();
    const groups=new Map();
    rows.forEach(r=>{if(!groups.has(r.projectId))groups.set(r.projectId,[]);groups.get(r.projectId).push(r)});
    document.getElementById('history-record-count').textContent=HISTORY.length;
    document.getElementById('history-project-count').textContent=new Set(HISTORY.map(r=>r.projectId)).size;
    document.getElementById('history-quant-count').textContent=HISTORY.filter(r=>r.quality==='quant').length;
    document.getElementById('history-result').textContent=`显示 ${rows.length} / ${HISTORY.length} 条记录，覆盖 ${groups.size} 个项目`;
    const root=document.getElementById('history-projects');
    if(!rows.length){root.innerHTML='<div class="history-empty">没有符合当前条件的历史记录。</div>';return;}
    root.innerHTML=[...groups.entries()].sort((a,b)=>projectLabel(a[0]).localeCompare(projectLabel(b[0]),'zh-CN')).map(([id,items])=>{
      items.sort((a,b)=>b.year-a.year);
      const trend=TRENDS[id]||'目前公开历史数据较少，继续追踪年度目录与录取公示。';
      const ys=[...new Set(items.map(x=>x.year))].sort();
      return `<article class="history-project"><div class="history-project-head"><div><h3>${esc(projectLabel(id))}</h3><p>${esc(trend)}</p></div><div class="history-coverage">${ys[0]}—${ys[ys.length-1]} · ${items.length}条</div></div><div class="history-timeline">${items.map(r=>`<div class="history-record ${esc(r.quality)}"><div class="history-year">${r.year}</div><div><span class="history-kind">${esc(r.kind)}</span></div><div class="history-body"><h4>${esc(r.headline)}</h4><div class="history-metrics">${r.metrics.map(([l,v])=>`<div class="history-metric"><span>${esc(l)}</span><strong>${esc(v)}</strong></div>`).join('')}</div><p class="history-note">${esc(r.note)}</p><a class="history-source" href="${esc(r.source)}" target="_blank" rel="noreferrer">官方历史来源 ↗</a><span class="history-quality">${esc(qualityLabel[r.quality])}</span></div></div>`).join('')}</div></article>`;
    }).join('');
  }

  section.addEventListener('click',e=>{
    const s=e.target.closest('[data-history-scope]');if(s){state.scope=s.dataset.historyScope;section.querySelectorAll('[data-history-scope]').forEach(b=>b.classList.toggle('active',b===s));render();return;}
    const y=e.target.closest('[data-history-year]');if(y){state.year=y.dataset.historyYear;section.querySelectorAll('[data-history-year]').forEach(b=>b.classList.toggle('active',b===y));render();}
  });
  document.getElementById('history-search').addEventListener('input',e=>{state.query=e.target.value.trim();render();});
  document.getElementById('history-quant-only').addEventListener('change',e=>{state.quantOnly=e.target.checked;render();});
  render();
})();

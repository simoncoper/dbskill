const schools = window.PSYCHOLOGY_PHD_SCHOOLS || [];
const projects = window.PSYCHOLOGY_PHD_PROJECTS || [];
const crossProjects = window.CROSS_DISCIPLINARY_PROJECTS || [];
const rawMentors = window.PHD_MENTORS || [];
const mentorPools = window.PROJECT_MENTOR_POOLS || {};
const crossMentorPools = window.CROSS_PROJECT_MENTOR_POOLS || {};

const mentorMap = new Map();
rawMentors.forEach(mentor => mentorMap.set(`${mentor.school}|${mentor.name}`, mentor));
const mentors = [...mentorMap.values()];

const state = { projectFilter:"all", projectSearch:"", tableView:"core", mentorFilter:"all", mentorSearch:"" };
const projectTableBody = document.getElementById("project-table-body");
const mobileProjectList = document.getElementById("mobile-project-list");
const projectEmpty = document.getElementById("project-empty");
const projectResultCount = document.getElementById("project-result-count");
const projectTableWrap = document.getElementById("project-table-wrap");
const dialog = document.getElementById("school-dialog");
const dialogContent = document.getElementById("dialog-content");

function esc(value){return String(value??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]))}
function itemList(items){return `<ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`}
function priorityBadge(p){return `<span class="decision-badge ${esc(p.priorityLevel)}">${esc(p.priority)}</span>`}
function categoryBadge(p){return `<span class="badge ${p.category}">${p.category==="academic"?"学术博士":"专业博士"}</span>`}
function englishClass(p){return p.englishLevel==="hard"?"cell-danger":p.englishLevel==="exam"?"cell-caution":""}
function mentorKey(mentor){return `${mentor.school}|${mentor.name}`}
function resolveMentors(pool){
  if(!pool?.mentorKeys?.length)return [];
  return pool.mentorKeys.map(key=>mentorMap.get(key)).filter(Boolean).sort((a,b)=>b.fit-a.fit||a.name.localeCompare(b.name,"zh-CN"));
}
function projectPool(project){return mentorPools[project.id] || {mentorKeys:[],basis:"尚未建立",complete:false,note:"导师信息待核验。",source:project.source}}
function crossPool(project){return crossMentorPools[project.id] || {mentorKeys:[],basis:"尚未建立",complete:false,note:"导师信息待核验。",source:project.source}}
function relatedMentors(project){return resolveMentors(projectPool(project))}
function relatedCrossMentors(project){return resolveMentors(crossPool(project))}
function poolLabel(pool,count){
  if(pool.complete && pool.basis.includes("官方招生名单"))return `官方年度名单 · ${count}位`;
  if(pool.complete)return `${pool.basis} · ${count}位`;
  return `${pool.basis} · 已核验${count}位`;
}
function mentorLinks(list, poolId, kind="core"){
  if(!list.length)return `<span class="cell-muted">尚无已确认导师</span>`;
  const top=list.slice(0,3);
  const button=list.length>3?`<button class="all-mentors-button" type="button" data-open-${kind}-mentors="${esc(poolId)}">全部${list.length}位</button>`:"";
  return `<div class="mentor-inline">${top.map(m=>`<a href="${esc(m.url)}" target="_blank" rel="noreferrer">${esc(m.name)}</a>`).join("")}${button}</div>`;
}
function projectCorpus(p){
  const pool=projectPool(p); const ms=resolveMentors(pool);
  return [p.school,p.project,p.code,p.category,p.mode,p.employment,p.english,p.research,p.work,p.tuition,p.plan,p.assessment,p.status,p.barrier,p.decision,p.priority,pool.basis,pool.note,...ms.flatMap(m=>[m.name,m.unit,m.status,...m.themes])].join(" ").toLowerCase();
}
function projectMatches(p){
  const f=state.projectFilter;
  if(f!=="all"){
    if(f==="hardEnglish"&&p.englishLevel!=="hard")return false;
    if(f==="highFit"&&p.fit<4.6)return false;
    if(!["hardEnglish","highFit"].includes(f)&&!p.tags.includes(f)&&p.category!==f)return false;
  }
  return !state.projectSearch||projectCorpus(p).includes(state.projectSearch.toLowerCase());
}

function renderProjectTable(){
  const visible=projects.filter(projectMatches);
  projectResultCount.textContent=`显示 ${visible.length} / ${projects.length} 个项目`;
  projectEmpty.hidden=visible.length>0;
  projectTableWrap.hidden=visible.length===0;
  mobileProjectList.hidden=visible.length===0;
  projectTableBody.innerHTML=visible.map(p=>{
    const pool=projectPool(p); const ms=resolveMentors(pool);
    return `<tr>
      <td class="project-name"><strong>${esc(p.school)}</strong><span>${esc(p.project)}</span><small>${esc(p.code)}</small></td>
      <td><div class="pool-label ${pool.complete?"verified":"candidate"}">${esc(poolLabel(pool,ms.length))}</div>${mentorLinks(ms,p.id,"project")}</td>
      <td>${categoryBadge(p)}<div class="cell-stack"><strong>${esc(p.mode)}</strong><span>${esc(p.employment)}</span></div></td>
      <td class="${englishClass(p)}">${esc(p.english)}</td>
      <td>${esc(p.research)}</td><td>${esc(p.work)}</td><td>${esc(p.tuition)}</td>
      <td class="optional-column">${esc(p.plan)}</td><td class="optional-column">${esc(p.assessment)}</td><td class="optional-column">${esc(p.status)}</td>
      <td><div class="fit-score">${p.fit.toFixed(1)}</div>${priorityBadge(p)}</td>
      <td class="barrier-cell">${esc(p.barrier)}</td><td>${esc(p.decision)}</td>
      <td class="optional-column"><a class="source-link" href="${esc(p.source)}" target="_blank" rel="noreferrer">官方原文 ↗</a></td>
    </tr>`;
  }).join("");
  mobileProjectList.innerHTML=visible.map(renderMobileProject).join("");
}

function mobileFact(label,value){return `<div class="mobile-fact"><span>${label}</span><strong>${esc(value)}</strong></div>`}
function renderMobileProject(p){
  const pool=projectPool(p); const ms=resolveMentors(pool);
  return `<article class="mobile-project-card">
    <div class="mobile-project-head"><div><h3>${esc(p.school)}</h3><strong>${esc(p.project)}</strong><br><small>${esc(p.code)}</small></div><div class="mobile-fit"><strong>${p.fit.toFixed(1)}</strong><span>适配 / 5</span></div></div>
    <div class="mobile-badges">${categoryBadge(p)}<span class="badge">${esc(p.mode)}</span>${priorityBadge(p)}</div>
    <div class="mobile-facts">${mobileFact("英语",p.english)}${mobileFact("科研",p.research)}${mobileFact("工作经历",p.work)}${mobileFact("成本",p.tuition)}</div>
    <div class="mobile-mentor-row"><div class="mentor-row-title"><span>项目导师池</span><em class="pool-label ${pool.complete?"verified":"candidate"}">${esc(poolLabel(pool,ms.length))}</em></div>${mentorLinks(ms,p.id,"project")}${ms.length?`<button class="mentor-pool-button" type="button" data-open-project-mentors="${esc(p.id)}">查看导师池与证据</button>`:`<div class="pool-note">${esc(pool.note)}</div>`}</div>
    <div class="mobile-callout barrier"><strong>首要阻断：</strong>${esc(p.barrier)}</div>
    <div class="mobile-callout decision"><strong>判断：</strong>${esc(p.decision)}</div>
    <details class="mobile-details"><summary>展开研究计划、考核和状态</summary><dl><dt>研究计划</dt><dd>${esc(p.plan)}</dd><dt>考核方式</dt><dd>${esc(p.assessment)}</dd><dt>2027状态</dt><dd>${esc(p.status)}</dd></dl><a class="source-link" href="${esc(p.source)}" target="_blank" rel="noreferrer">查看官方原文 ↗</a></details>
  </article>`;
}

function renderCrossProjects(){
  document.getElementById("cross-project-list").innerHTML=crossProjects.map(p=>{
    const pool=crossPool(p); const ms=resolveMentors(pool);
    return `<article class="cross-card">
      <div class="cross-card-head"><div><div class="eyebrow">${esc(p.school)}</div><h3>${esc(p.project)}</h3><div class="cross-unit">${esc(p.unit)} · ${esc(p.degree)}</div></div><div class="cross-score">${p.fit.toFixed(1)}</div></div>
      <div class="theme-row">${p.themes.map(t=>`<span class="theme">${esc(t)}</span>`).join("")}</div>
      <div class="cross-grid"><div class="cross-field"><span>学习方式</span><strong>${esc(p.mode)}</strong></div><div class="cross-field"><span>招生方式</span><strong>${esc(p.method)}</strong></div><div class="cross-field"><span>导师池</span><strong>${esc(poolLabel(pool,ms.length))}</strong></div><div class="cross-field"><span>适配度</span><strong>${p.fit.toFixed(1)} / 5.0</strong></div></div>
      <div class="mobile-mentor-row"><div class="mentor-row-title"><span>项目绑定导师</span></div>${mentorLinks(ms,p.id,"cross")}${ms.length?`<button class="mentor-pool-button" type="button" data-open-cross-mentors="${esc(p.id)}">查看全部导师与证据</button>`:`<div class="pool-note">${esc(pool.note)}</div>`}</div>
      <p class="cross-text"><strong>主要要求：</strong>${esc(p.requirements)}</p><p class="cross-text"><strong>首要阻断：</strong>${esc(p.barrier)}</p>
      <div class="cross-verdict">${esc(p.verdict)}</div><a class="official-button" href="${esc(p.source)}" target="_blank" rel="noreferrer">官方项目页面 ↗</a>
    </article>`;
  }).join("");
}

function projectRoutesForMentor(mentor){
  const key=mentorKey(mentor); const routes=[];
  projects.forEach(p=>{if((mentorPools[p.id]?.mentorKeys||[]).includes(key))routes.push({kind:"心理学",label:`${p.school} · ${p.project}`})});
  crossProjects.forEach(p=>{if((crossMentorPools[p.id]?.mentorKeys||[]).includes(key))routes.push({kind:"交叉",label:`${p.school} · ${p.project}`})});
  return routes;
}
function mentorCorpus(m){return [m.name,m.school,m.unit,m.route,m.match,m.risk,m.status,...m.themes,...projectRoutesForMentor(m).map(r=>r.label)].join(" ").toLowerCase()}
function mentorMatches(m){
  if(state.mentorFilter==="highFit"&&m.fit<4.8)return false;
  if(state.mentorFilter!=="all"&&state.mentorFilter!=="highFit"&&!mentorCorpus(m).includes(state.mentorFilter.toLowerCase()))return false;
  return !state.mentorSearch||mentorCorpus(m).includes(state.mentorSearch.toLowerCase());
}
function renderMentors(){
  const visible=mentors.filter(mentorMatches).sort((a,b)=>b.fit-a.fit||a.school.localeCompare(b.school,"zh-CN"));
  document.getElementById("mentor-result-count").textContent=`显示 ${visible.length} / ${mentors.length} 位导师候选`;
  document.getElementById("mentor-list").innerHTML=visible.map(m=>{
    const routes=projectRoutesForMentor(m);
    return `<article class="mentor-card">
      <div class="mentor-head"><div><h3>${esc(m.name)}</h3><div class="mentor-school">${esc(m.school)} · ${esc(m.unit)}</div></div><div class="mentor-score">${m.fit.toFixed(1)}</div></div>
      <div class="theme-row">${m.themes.map(t=>`<span class="theme">${esc(t)}</span>`).join("")}</div>
      <div class="mentor-route"><strong>个人方向：</strong>${esc(m.route)}</div>
      <div class="mentor-project-routes"><strong>已绑定项目：</strong>${routes.length?routes.map(r=>`<span class="route-chip ${r.kind==="交叉"?"cross":"core"}">${esc(r.label)}</span>`).join(""):`<span class="cell-muted">尚未绑定具体项目</span>`}</div>
      <div class="mentor-status"><strong>导师状态：</strong>${esc(m.status)}</div>
      <p class="mentor-match"><strong>为什么匹配：</strong>${esc(m.match)}</p><p class="mentor-risk"><strong>最大风险：</strong>${esc(m.risk)}</p>
      <a class="official-button" href="${esc(m.url)}" target="_blank" rel="noreferrer">官方主页 / 证据 ↗</a>
    </article>`;
  }).join("");
}

function openMentorPool(kind,id){
  const isCross=kind==="cross";
  const project=isCross?crossProjects.find(p=>p.id===id):projects.find(p=>p.id===id);
  const pool=isCross?crossPool(project):projectPool(project);
  const list=resolveMentors(pool);
  if(!project)return;
  dialogContent.innerHTML=`<div class="dialog-body">
    <div class="dialog-hero"><div class="eyebrow">${isCross?"交叉项目导师池":"心理学项目导师池"}</div><h2>${esc(project.school)} · ${esc(project.project)}</h2><p>${esc(pool.basis)}，核验 ${list.length} 位。</p></div>
    <div class="pool-evidence ${pool.complete?"verified":"candidate"}"><strong>${pool.complete?"名单口径已明确":"候选池，不是完整招生名单"}</strong><p>${esc(pool.note)}</p><a href="${esc(pool.source||project.source)}" target="_blank" rel="noreferrer">查看导师池依据 ↗</a></div>
    ${list.length?`<div class="mentor-pool-grid">${list.map(m=>`<article class="mentor-pool-card"><div class="mentor-head"><div><h3>${esc(m.name)}</h3><div class="mentor-school">${esc(m.unit)}</div></div><div class="mentor-score">${m.fit.toFixed(1)}</div></div><div class="theme-row">${m.themes.map(t=>`<span class="theme">${esc(t)}</span>`).join("")}</div><div class="mentor-status"><strong>招生状态：</strong>${esc(m.status)}</div><p class="mentor-match"><strong>匹配：</strong>${esc(m.match)}</p><p class="mentor-risk"><strong>风险：</strong>${esc(m.risk)}</p><a class="official-button" href="${esc(m.url)}" target="_blank" rel="noreferrer">官方主页 / 证据 ↗</a></article>`).join("")}</div>`:`<div class="empty-state">${esc(pool.note)}</div>`}
  </div>`;
  dialog.showModal();
}

function schoolBadges(s){const arr=[];if(s.types.includes("academic"))arr.push(`<span class="badge academic">学术博士</span>`);if(s.types.includes("professional"))arr.push(`<span class="badge professional">专业博士</span>`);return arr.join("")}
function renderSchools(){
  document.getElementById("school-list").innerHTML=schools.map(s=>`<article class="school-card"><div class="school-rank">${s.rank}</div><div><div class="school-title-row"><h3>${esc(s.name)}</h3>${schoolBadges(s)}</div><p class="school-summary">${esc(s.summary)}</p><div class="tag-row">${s.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div></div><div class="school-facts"><div class="fact"><span>学位</span><strong>${esc(s.degree)}</strong></div><div class="fact"><span>英语</span><strong>${esc(s.english)}</strong></div><div class="fact"><span>周期</span><strong>${esc(s.cycle)}</strong></div></div><div class="school-score"><div class="score-number">${s.fit.toFixed(1)}</div><div class="score-label">方向适配</div><button class="detail-button" data-open-school="${s.id}" type="button">完整资料</button></div></article>`).join("");
}
function openSchool(id){
  const s=schools.find(x=>x.id===id);if(!s)return;
  dialogContent.innerHTML=`<div class="dialog-body"><div class="dialog-hero"><div class="eyebrow">${esc(s.city)} · 适配 ${s.fit.toFixed(1)}/5</div><h2>${esc(s.name)}</h2><p>${esc(s.summary)}</p></div><div class="dialog-alert"><strong>首要风险：</strong>${esc(s.biggestRisk)}</div><div class="dialog-grid" style="margin-top:12px"><section class="detail-panel"><h3>学位与方式</h3><p>${esc(s.degree)}</p><p>${esc(s.study)}</p></section><section class="detail-panel"><h3>英语与科研</h3><p>${esc(s.english)}</p><p>${esc(s.researchGate)}</p></section><section class="detail-panel"><h3>研究方向</h3>${itemList(s.directions)}</section><section class="detail-panel"><h3>报考条件</h3>${itemList(s.requirements)}</section><section class="detail-panel"><h3>材料</h3>${itemList(s.materials)}</section><section class="detail-panel"><h3>考核</h3>${itemList(s.assessment)}</section><section class="detail-panel full"><h3>与你的匹配</h3><p>${esc(s.fitWhy)}</p><p><strong>建议：</strong>${esc(s.strategy)}</p></section><section class="detail-panel full"><h3>官方来源</h3><div class="official-links">${s.sources.map(([l,u])=>`<a href="${esc(u)}" target="_blank" rel="noreferrer">${esc(l)} ↗</a>`).join("")}</div></section></div></div>`;
  dialog.showModal();
}

function setMetrics(){
  document.getElementById("project-count").textContent=projects.length;
  document.getElementById("cross-count").textContent=crossProjects.length;
  document.getElementById("mentor-count").textContent=mentors.length;
  document.getElementById("mentor-high-count").textContent=mentors.filter(m=>m.fit>=4.8).length;
}

document.getElementById("project-filter-group").addEventListener("click",e=>{const b=e.target.closest("[data-project-filter]");if(!b)return;state.projectFilter=b.dataset.projectFilter;document.querySelectorAll("[data-project-filter]").forEach(x=>x.classList.toggle("active",x===b));renderProjectTable()});
document.getElementById("project-search").addEventListener("input",e=>{state.projectSearch=e.target.value.trim();renderProjectTable()});
document.querySelector(".view-switch").addEventListener("click",e=>{const b=e.target.closest("[data-table-view]");if(!b)return;state.tableView=b.dataset.tableView;document.querySelectorAll("[data-table-view]").forEach(x=>x.classList.toggle("active",x===b));projectTableWrap.classList.toggle("core-view",state.tableView==="core")});
document.getElementById("mentor-filter-group").addEventListener("click",e=>{const b=e.target.closest("[data-mentor-filter]");if(!b)return;state.mentorFilter=b.dataset.mentorFilter;document.querySelectorAll("[data-mentor-filter]").forEach(x=>x.classList.toggle("active",x===b));renderMentors()});
document.getElementById("mentor-search").addEventListener("input",e=>{state.mentorSearch=e.target.value.trim();renderMentors()});
document.body.addEventListener("click",e=>{
  const school=e.target.closest("[data-open-school]");if(school){openSchool(school.dataset.openSchool);return}
  const core=e.target.closest("[data-open-project-mentors]");if(core){openMentorPool("core",core.dataset.openProjectMentors);return}
  const cross=e.target.closest("[data-open-cross-mentors]");if(cross){openMentorPool("cross",cross.dataset.openCrossMentors)}
});
document.getElementById("dialog-close").addEventListener("click",()=>dialog.close());dialog.addEventListener("click",e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});document.getElementById("print-button").addEventListener("click",()=>window.print());

setMetrics();renderProjectTable();renderCrossProjects();renderMentors();renderSchools();

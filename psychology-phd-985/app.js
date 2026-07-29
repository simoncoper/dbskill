const schools = window.PSYCHOLOGY_PHD_SCHOOLS || [];
const projects = window.PSYCHOLOGY_PHD_PROJECTS || [];
const adjacentRoutes = window.PSYCHOLOGY_PHD_ADJACENT || [];

const state = { projectFilter: "all", projectSearch: "", tableView: "core" };
const schoolListNode = document.getElementById("school-list");
const projectTableBody = document.getElementById("project-table-body");
const projectEmpty = document.getElementById("project-empty");
const projectResultCount = document.getElementById("project-result-count");
const projectTableWrap = document.getElementById("project-table-wrap");
const dialog = document.getElementById("school-dialog");
const dialogContent = document.getElementById("dialog-content");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
}

function schoolBadges(school) {
  const items = [];
  if (school.types.includes("academic")) items.push(["academic", "学术博士"]);
  if (school.types.includes("professional")) items.push(["professional", "专业博士"]);
  if (school.types.includes("parttime")) items.push(["parttime", "有非全日制"]);
  if (school.hardEnglish) items.push(["alert", "英语硬线"]);
  return items.map(([klass, label]) => `<span class="badge ${klass}">${label}</span>`).join("");
}

function renderSchools() {
  schoolListNode.innerHTML = schools.map(school => `
    <article class="school-card">
      <div class="school-rank">${school.rank}</div>
      <div>
        <div class="school-title-row"><h3>${escapeHtml(school.name)}</h3>${schoolBadges(school)}</div>
        <p class="school-summary">${escapeHtml(school.summary)}</p>
        <div class="tag-row">${school.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
      <div class="school-facts">
        <div class="fact"><span>学位路径</span><strong>${escapeHtml(school.degree)}</strong></div>
        <div class="fact"><span>英语</span><strong>${escapeHtml(school.english)}</strong></div>
        <div class="fact"><span>当前周期</span><strong>${escapeHtml(school.cycle)}</strong></div>
      </div>
      <div class="school-score">
        <div><div class="score-number">${school.fit.toFixed(1)}</div><div class="score-label">方向适配 / 5.0</div></div>
        <button class="detail-button" type="button" data-open-school="${school.id}">查看学校详情</button>
      </div>
    </article>
  `).join("");
}

function itemList(items) {
  return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function openSchool(id) {
  const school = schools.find(item => item.id === id);
  if (!school) return;
  dialogContent.innerHTML = `
    <div class="dialog-body">
      <div class="dialog-hero"><div class="eyebrow">${escapeHtml(school.city)} · 方向适配 ${school.fit.toFixed(1)}/5.0</div><h2>${escapeHtml(school.name)}</h2><p>${escapeHtml(school.summary)}</p></div>
      <div class="dialog-alert"><strong>首要风险：</strong>${escapeHtml(school.biggestRisk)}</div>
      <div class="dialog-grid" style="margin-top:14px">
        <section class="detail-panel"><h3>学位与学习方式</h3><p>${escapeHtml(school.degree)}</p><p>${escapeHtml(school.study)}</p></section>
        <section class="detail-panel"><h3>英语与科研</h3><p><strong>英语：</strong>${escapeHtml(school.english)}</p><p><strong>科研：</strong>${escapeHtml(school.researchGate)}</p></section>
        <section class="detail-panel"><h3>研究方向</h3>${itemList(school.directions)}</section>
        <section class="detail-panel"><h3>报考条件</h3>${itemList(school.requirements)}</section>
        <section class="detail-panel"><h3>材料清单</h3>${itemList(school.materials)}</section>
        <section class="detail-panel"><h3>考核方式</h3>${itemList(school.assessment)}</section>
        <section class="detail-panel full"><h3>与你的匹配</h3><p>${escapeHtml(school.fitWhy)}</p><p><strong>建议：</strong>${escapeHtml(school.strategy)}</p></section>
        <section class="detail-panel"><h3>目前缺口</h3>${itemList(school.gaps)}</section>
        <section class="detail-panel"><h3>时间与成本</h3><p><strong>周期：</strong>${escapeHtml(school.cycle)}</p><p><strong>成本：</strong>${escapeHtml(school.cost)}</p><p><strong>工作要求：</strong>${escapeHtml(school.workGate)}</p></section>
        <section class="detail-panel full"><h3>官方来源</h3><div class="official-links">${school.sources.map(([label, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)} ↗</a>`).join("")}</div></section>
      </div>
    </div>`;
  dialog.showModal();
}

function projectMatches(project) {
  const filter = state.projectFilter;
  if (filter !== "all") {
    if (filter === "hardEnglish" && project.englishLevel !== "hard") return false;
    else if (filter === "highFit" && project.fit < 4.6) return false;
    else if (!["hardEnglish", "highFit"].includes(filter) && !project.tags.includes(filter) && project.category !== filter) return false;
  }
  if (!state.projectSearch) return true;
  const corpus = [project.school, project.project, project.code, project.category, project.mode, project.employment, project.english, project.research, project.work, project.tuition, project.plan, project.assessment, project.status, project.barrier, project.decision, project.priority].join(" ").toLowerCase();
  return corpus.includes(state.projectSearch.toLowerCase());
}

function priorityBadge(project) {
  return `<span class="decision-badge ${escapeHtml(project.priorityLevel)}">${escapeHtml(project.priority)}</span>`;
}

function englishCellClass(project) {
  if (project.englishLevel === "hard") return "cell-danger";
  if (project.englishLevel === "exam") return "cell-caution";
  return "cell-muted";
}

function renderProjectTable() {
  const visible = projects.filter(projectMatches);
  projectResultCount.textContent = `显示 ${visible.length} / ${projects.length} 个项目`;
  projectEmpty.hidden = visible.length > 0;
  projectTableWrap.hidden = visible.length === 0;
  projectTableBody.innerHTML = visible.map(project => `
    <tr>
      <td class="sticky-school"><button class="school-link" type="button" data-open-school="${project.schoolId}">${escapeHtml(project.school)}</button></td>
      <td class="sticky-project"><strong>${escapeHtml(project.project)}</strong><small>${escapeHtml(project.code)}</small></td>
      <td><span class="badge ${project.category}">${project.category === "academic" ? "学术博士" : "专业博士"}</span><div class="cell-stack"><strong>${escapeHtml(project.mode)}</strong><span>${escapeHtml(project.employment)}</span></div></td>
      <td class="${englishCellClass(project)}">${escapeHtml(project.english)}</td>
      <td>${escapeHtml(project.research)}</td>
      <td>${escapeHtml(project.work)}</td>
      <td>${escapeHtml(project.tuition)}</td>
      <td class="optional-column">${escapeHtml(project.plan)}</td>
      <td class="optional-column">${escapeHtml(project.assessment)}</td>
      <td class="optional-column">${escapeHtml(project.status)}</td>
      <td><div class="fit-score">${project.fit.toFixed(1)}</div>${priorityBadge(project)}</td>
      <td class="barrier-cell">${escapeHtml(project.barrier)}</td>
      <td class="decision-cell">${escapeHtml(project.decision)}</td>
      <td class="optional-column"><a class="source-link" href="${escapeHtml(project.source)}" target="_blank" rel="noreferrer">官方原文 ↗</a></td>
    </tr>
  `).join("");
}

function renderAdjacent() {
  document.getElementById("adjacent-list").innerHTML = adjacentRoutes.map(route => `
    <article class="adjacent-card"><div class="eyebrow">${escapeHtml(route.code)}</div><h3>${escapeHtml(route.name)}</h3><p>${escapeHtml(route.detail)}</p><div class="adjacent-meta"><strong>授予口径：</strong>${escapeHtml(route.degree)}<br><a href="${escapeHtml(route.source)}" target="_blank" rel="noreferrer">查看官方页面 ↗</a></div></article>
  `).join("");
}

function setMetrics() {
  document.getElementById("project-count").textContent = projects.length;
  document.getElementById("academic-count").textContent = projects.filter(project => project.category === "academic").length;
  document.getElementById("parttime-count").textContent = projects.filter(project => project.tags.includes("parttime")).length;
  document.getElementById("hard-english-count").textContent = projects.filter(project => project.englishLevel === "hard").length;
}

document.getElementById("project-filter-group").addEventListener("click", event => {
  const button = event.target.closest("[data-project-filter]");
  if (!button) return;
  state.projectFilter = button.dataset.projectFilter;
  document.querySelectorAll("[data-project-filter]").forEach(node => node.classList.toggle("active", node === button));
  renderProjectTable();
});

document.getElementById("project-search").addEventListener("input", event => {
  state.projectSearch = event.target.value.trim();
  renderProjectTable();
});

document.querySelector(".view-switch").addEventListener("click", event => {
  const button = event.target.closest("[data-table-view]");
  if (!button) return;
  state.tableView = button.dataset.tableView;
  document.querySelectorAll("[data-table-view]").forEach(node => node.classList.toggle("active", node === button));
  projectTableWrap.classList.toggle("core-view", state.tableView === "core");
  projectTableWrap.classList.toggle("full-view", state.tableView === "full");
});

document.body.addEventListener("click", event => {
  const button = event.target.closest("[data-open-school]");
  if (button) openSchool(button.dataset.openSchool);
});

document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
document.getElementById("print-button").addEventListener("click", () => window.print());

setMetrics();
renderProjectTable();
renderSchools();
renderAdjacent();

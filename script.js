// ===================================================================
// Case data — mock, standing in for a real case database
// ===================================================================
const CASES = {
  '1042': {
    title: 'State vs. Kumar', number: '#1042', court: 'Delhi High Court',
    status: 'ongoing', type: 'Criminal appeal — Section 420 IPC', docCount: 34, updated: '2 hours ago',
    timeline: [
      { date: '10 Jan 2026', text: 'Appeal filed against trial court conviction' },
      { date: '2 Feb 2026', text: 'Notice issued to State; bail application listed' },
      { date: '19 Mar 2026', text: 'Bail granted with conditions' },
      { date: '30 Jun 2026', text: 'Arguments on merits — appellant\u2019s side concluded' },
      { date: '9 Aug 2026', text: 'State filed reply on limitation point' },
    ],
    changes: [
      { tag: 'new', date: '2 hours ago', text: 'State filed its reply on the limitation objection raised at the last hearing' },
      { tag: 'updated', date: 'Yesterday', text: 'Bench composition updated — matter now listed before Justice Malhotra' },
      { tag: 'moved', date: '3 days ago', text: 'Next hearing moved from 14 Aug to 21 Aug 2026' },
    ],
    documents: [
      { name: 'Trial court judgment.pdf', meta: '18 pages · uploaded 10 Jan' },
      { name: 'Appeal memo.pdf', meta: '9 pages · uploaded 10 Jan' },
      { name: 'Bail order.pdf', meta: '3 pages · uploaded 19 Mar' },
      { name: 'State reply on limitation.pdf', meta: '6 pages · uploaded 2 hours ago' },
    ],
  },
  '1039': {
    title: 'Mehta v. Priya Holdings', number: '#1039', court: 'NCLT Mumbai',
    status: 'hearing', type: 'Company law dispute — winding up petition', docCount: 18, updated: 'Yesterday',
    timeline: [
      { date: '5 Apr 2026', text: 'Winding up petition filed under Section 271' },
      { date: '22 May 2026', text: 'Respondent filed counter-affidavit' },
      { date: '30 Jul 2026', text: 'Tribunal directed parties to explore settlement' },
      { date: '10 Aug 2026', text: 'Next hearing scheduled' },
    ],
    changes: [
      { tag: 'new', date: 'Yesterday', text: 'Respondent uploaded a revised settlement proposal' },
      { tag: 'updated', date: '4 days ago', text: 'Hearing confirmed for 10 Aug 2026, 11:00 AM' },
    ],
    documents: [
      { name: 'Winding up petition.pdf', meta: '22 pages · uploaded 5 Apr' },
      { name: 'Counter-affidavit.pdf', meta: '14 pages · uploaded 22 May' },
      { name: 'Settlement proposal (revised).pdf', meta: '5 pages · uploaded yesterday' },
    ],
  },
  '1036': {
    title: 'Union of India v. Saraswat', number: '#1036', court: 'Supreme Court of India',
    status: 'ongoing', type: 'Constitutional challenge — Article 32 petition', docCount: 52, updated: '3 days ago',
    timeline: [
      { date: '2 Nov 2025', text: 'Writ petition filed under Article 32' },
      { date: '18 Dec 2025', text: 'Notice issued; interim stay granted' },
      { date: '14 Mar 2026', text: 'Union filed counter-affidavit' },
      { date: '8 Aug 2026', text: 'Matter referred to a three-judge bench' },
    ],
    changes: [
      { tag: 'new', date: '3 days ago', text: 'Matter referred to a larger three-judge bench' },
    ],
    documents: [
      { name: 'Writ petition.pdf', meta: '31 pages · uploaded 2 Nov' },
      { name: 'Interim stay order.pdf', meta: '2 pages · uploaded 18 Dec' },
      { name: 'Union counter-affidavit.pdf', meta: '40 pages · uploaded 14 Mar' },
    ],
  },
  '1021': {
    title: 'Verma Estate Settlement', number: '#1021', court: 'Delhi District Court',
    status: 'closed', type: 'Probate — succession certificate matter', docCount: 26, updated: '2 weeks ago',
    timeline: [
      { date: '12 Jan 2025', text: 'Succession certificate petition filed' },
      { date: '30 Jun 2025', text: 'Objections from co-heir disposed of' },
      { date: '28 Jul 2026', text: 'Succession certificate granted' },
    ],
    changes: [
      { tag: 'updated', date: '2 weeks ago', text: 'Matter closed — succession certificate issued' },
    ],
    documents: [
      { name: 'Succession petition.pdf', meta: '11 pages · uploaded Jan 2025' },
      { name: 'Succession certificate (final).pdf', meta: '2 pages · uploaded 2 weeks ago' },
    ],
  },
};

const STATUS_LABEL = { ongoing: 'Ongoing', hearing: 'Hearing Set', closed: 'Closed' };
const STATUS_CLASS = { ongoing: 'ongoing', hearing: 'hearing', closed: 'closed' };

const DOC_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>`;
const CHEV_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 6l6 6-6 6"/></svg>`;

// ===================================================================
// Tab switching
// ===================================================================
const tabs = document.querySelectorAll('.tab-panel');
const navBtns = document.querySelectorAll('.navbtn');
const mainView = document.getElementById('mainView');

function showTab(name){
  closeAllSubScreens();
  mainView.style.display = 'block';
  tabs.forEach(t => t.classList.toggle('active', t.id === 'tab-' + name));
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.getElementById('scrollArea').scrollTop = 0;
  document.getElementById('researchBarWrap').style.display = (name === 'research') ? 'block' : 'none';
}
navBtns.forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
document.querySelectorAll('[data-goto]').forEach(el =>
  el.addEventListener('click', () => showTab(el.dataset.goto))
);

// ===================================================================
// Sub-screens (case detail, contradiction check, chat, pricing)
// ===================================================================
const subScreens = ['caseDetailScreen', 'contradictionScreen', 'chatScreen', 'pricingScreen', 'notifScreen'].map(id => document.getElementById(id));
function closeAllSubScreens(){ subScreens.forEach(s => s.classList.remove('active')); }
function openSubScreen(id){
  mainView.style.display = 'none';
  closeAllSubScreens();
  document.getElementById(id).classList.add('active');
}
function backToMain(){
  closeAllSubScreens();
  mainView.style.display = 'block';
}

// ===================================================================
// Cases filter (Cases tab)
// ===================================================================
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    document.querySelectorAll('#fullCaseList .case-card').forEach(card => {
      card.style.display = (f === 'all' || card.dataset.status === f) ? '' : 'none';
    });
  });
});

// ===================================================================
// Case detail screen
// ===================================================================
let activeCaseId = null;

function openCaseDetail(caseId, scrollToSection){
  const c = CASES[caseId];
  if (!c) return;
  activeCaseId = caseId;
  document.getElementById('caseHeaderTitle').textContent = c.number;

  const body = document.getElementById('caseDetailBody');
  body.innerHTML = `
    <h2 class="headline" style="font-size:22px; margin-bottom:4px;">${c.title}</h2>
    <div class="case-detail-meta">${c.number} · ${c.court}</div>
    <div class="case-detail-status-row">
      <span class="badge ${STATUS_CLASS[c.status]}">${STATUS_LABEL[c.status]}</span>
    </div>
    <div style="font-size:13.5px; color:var(--ink-soft); margin-bottom:24px; line-height:1.45;">${c.type} &middot; ${c.docCount} documents &middot; updated ${c.updated}</div>

    <div class="detail-section" id="section-changed">
      <div class="detail-section-title">What changed</div>
      ${c.changes.map(ch => `
        <div class="change-item">
          <span class="change-tag ${ch.tag}">${ch.tag === 'new' ? 'New' : ch.tag === 'moved' ? 'Moved' : 'Updated'}</span>
          <div>
            <div class="change-text">${ch.text}</div>
            <div class="change-date">${ch.date}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Timeline</div>
      <div class="timeline">
        ${c.timeline.map(t => `
          <div class="tl-item">
            <div class="tl-dot"></div>
            <div class="tl-date">${t.date}</div>
            <div class="tl-text">${t.text}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="detail-section" style="margin-bottom:8px;">
      <div class="detail-section-title">Documents (${c.documents.length})</div>
      ${c.documents.map(d => `
        <div class="doc-row">
          <div class="doc-icon">${DOC_ICON}</div>
          <div>
            <div class="doc-name">${d.name}</div>
            <div class="doc-meta">${d.meta}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  openSubScreen('caseDetailScreen');
  if (scrollToSection){
    setTimeout(() => {
      const el = document.getElementById('section-' + scrollToSection);
      if (el) el.scrollIntoView({ block: 'start' });
    }, 50);
  }
}

document.querySelectorAll('[data-open-case]').forEach(el =>
  el.addEventListener('click', () => openCaseDetail(el.dataset.openCase, el.dataset.tab))
);
document.getElementById('caseBack').addEventListener('click', backToMain);
document.getElementById('caseAskBtn').addEventListener('click', () => {
  if (activeCaseId) openChat('Summarize the current status of ' + CASES[activeCaseId].title);
});

// ===================================================================
// Contradiction checker
// ===================================================================
const CHECK_DOCS = [
  { id: 'd1', name: 'Appeal memo.pdf' },
  { id: 'd2', name: 'Trial court judgment.pdf' },
  { id: 'd3', name: 'State reply on limitation.pdf' },
  { id: 'd4', name: 'Bail order.pdf' },
];
let selectedDocs = [];

function renderContradictionPicker(){
  selectedDocs = [];
  const body = document.getElementById('contradictionBody');
  body.innerHTML = `
    <div style="font-size:13.5px; color:var(--ink-soft); line-height:1.5; margin-bottom:18px;">
      Select two or more documents from State vs. Kumar (#1042). LexAI will compare them and flag any statements that conflict.
    </div>
    <div id="docPickerList"></div>
    <button class="action-btn primary" id="runCheckBtn" disabled style="opacity:0.4;">Check for contradictions</button>
  `;
  const list = document.getElementById('docPickerList');
  CHECK_DOCS.forEach(d => {
    const row = document.createElement('div');
    row.className = 'doc-picker';
    row.dataset.id = d.id;
    row.innerHTML = `
      <div class="doc-checkbox"></div>
      <div class="doc-name">${d.name}</div>
    `;
    row.querySelector('.doc-checkbox').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>`;
    row.addEventListener('click', () => {
      row.classList.toggle('selected');
      if (row.classList.contains('selected')) selectedDocs.push(d.id);
      else selectedDocs = selectedDocs.filter(x => x !== d.id);
      const btn = document.getElementById('runCheckBtn');
      const ready = selectedDocs.length >= 2;
      btn.disabled = !ready;
      btn.style.opacity = ready ? '1' : '0.4';
    });
    list.appendChild(row);
  });
  document.getElementById('runCheckBtn').addEventListener('click', runContradictionCheck);
}

function runContradictionCheck(){
  const body = document.getElementById('contradictionBody');
  body.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <div class="loading-text">Comparing ${selectedDocs.length} documents for factual and date conflicts…</div>
    </div>
  `;
  setTimeout(() => {
    body.innerHTML = `
      <div style="font-size:13.5px; color:var(--ink-soft); line-height:1.5; margin-bottom:4px;">
        Compared ${selectedDocs.length} documents. LexAI found <strong style="color:var(--red);">2 potential conflicts</strong> — both need your review before filing.
      </div>
      <div class="contra-result">
        <div class="contra-flag">
          <div class="contra-flag-title">⚠ Conflicting dates of arrest</div>
          <div class="contra-src"><span class="src-label">TRIAL COURT JUDGMENT.PDF · p.3</span>States the appellant was arrested on 14 March 2024.</div>
          <div class="contra-src"><span class="src-label">APPEAL MEMO.PDF · p.2</span>States the arrest occurred on 17 March 2024.</div>
        </div>
        <div class="contra-flag">
          <div class="contra-flag-title">⚠ Inconsistent limitation calculation</div>
          <div class="contra-src"><span class="src-label">STATE REPLY ON LIMITATION.PDF · p.1</span>Calculates the appeal as filed 4 days beyond limitation.</div>
          <div class="contra-src"><span class="src-label">APPEAL MEMO.PDF · p.1</span>Relies on a certified copy date that would place it within limitation.</div>
        </div>
      </div>
      <button class="action-btn" id="rerunBtn">Check different documents</button>
    `;
    document.getElementById('rerunBtn').addEventListener('click', renderContradictionPicker);
  }, 1500);
}

document.getElementById('contraBack').addEventListener('click', backToMain);
document.querySelectorAll('[data-action="contradiction"]').forEach(el =>
  el.addEventListener('click', () => { renderContradictionPicker(); openSubScreen('contradictionScreen'); })
);

// ===================================================================
// Plan / pricing state
// ===================================================================
let currentPlan = 'free';
let freeMessagesUsed = 0;
const FREE_LIMIT = 3;
const planBadge = document.getElementById('planBadge');
const toast = document.getElementById('planToast');

function showToast(text){
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function openPricing(){ openSubScreen('pricingScreen'); updatePlanButtons(); }
document.getElementById('pricingBack').addEventListener('click', backToMain);
document.getElementById('manageSubItem').addEventListener('click', openPricing);
planBadge.addEventListener('click', openPricing);

function updatePlanButtons(){
  document.querySelectorAll('.plan-btn').forEach(btn => {
    const plan = btn.dataset.select;
    if (plan === currentPlan){
      btn.textContent = 'Current Plan';
      btn.classList.add('current');
      btn.disabled = true;
    } else {
      btn.textContent = 'Choose ' + (plan === 'basic' ? 'Basic' : 'Pro');
      btn.classList.remove('current');
      btn.disabled = false;
    }
  });
}
document.querySelectorAll('.plan-btn[data-select]').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.dataset.select;
    if (plan === currentPlan) return;
    currentPlan = plan;
    freeMessagesUsed = 0;
    const label = plan === 'basic' ? 'Basic' : 'Pro';
    planBadge.textContent = label + ' Plan · Renews next month';
    updatePlanButtons();
    showToast("You're now on the " + label + " plan");
    setTimeout(backToMain, 900);
  });
});

// ===================================================================
// Notifications (Pro feature — upcoming hearings + recent updates)
// ===================================================================
const HEARINGS_NEXT_5_DAYS = [
  { when: 'Today, 11:00 AM', title: 'State vs. Kumar', meta: '#1042 · Delhi High Court' },
  { when: 'Tomorrow, 3:30 PM', title: 'Mehta v. Priya Holdings', meta: '#1039 · NCLT Mumbai' },
  { when: 'In 3 days', title: 'Document deadline — State vs. Kumar', meta: 'Rejoinder due before next hearing' },
  { when: 'In 5 days', title: 'Union of India v. Saraswat', meta: '#1036 · Supreme Court of India' },
];
const RECENT_UPDATES = [
  { dot: 'gold', text: '3 case updates since your last visit' },
  { dot: 'orange', text: '2 citations need verification' },
  { dot: 'green', text: 'New judgment relevant to Case #1042' },
];

function renderNotifications(){
  const body = document.getElementById('notifBody');
  body.innerHTML = `
    <div class="detail-section-title">Hearings — today to next 5 days</div>
    ${HEARINGS_NEXT_5_DAYS.map(h => `
      <div class="change-item">
        <span class="change-tag moved">${h.when}</span>
        <div>
          <div class="change-text">${h.title}</div>
          <div class="change-date">${h.meta}</div>
        </div>
      </div>
    `).join('')}
    <div class="detail-section-title" style="margin-top:22px;">Recent updates</div>
    <div class="intel-list" style="padding:0;">
      ${RECENT_UPDATES.map(u => `
        <div class="intel-item"><div class="dot ${u.dot}"></div><div class="intel-text">${u.text}</div></div>
      `).join('')}
    </div>
  `;
}

function renderNotifUpsell(){
  const body = document.getElementById('notifBody');
  body.innerHTML = `
    <div class="upsell-card" style="border-style:solid;">
      <div class="upsell-title">Notifications are a Pro feature</div>
      <div class="upsell-text">Upgrade to Pro to get alerts on upcoming hearings (today through the next 5 days) and recent case updates, right when they happen.</div>
      <button class="upsell-btn" id="notifUpsellBtn">View plans</button>
    </div>
  `;
  document.getElementById('notifUpsellBtn').addEventListener('click', openPricing);
}

document.getElementById('notifItem').addEventListener('click', () => {
  openSubScreen('notifScreen');
  if (currentPlan === 'pro') renderNotifications();
  else renderNotifUpsell();
});
document.getElementById('notifBack').addEventListener('click', backToMain);

// ===================================================================
// Chat — with source trails + citation badges
// ===================================================================
const chatScreen = document.getElementById('chatScreen');
const chatLog = document.getElementById('chatLog');
const chatInput = document.getElementById('chatInput');

function openChat(firstPrompt){
  openSubScreen('chatScreen');
  chatLog.innerHTML = '';
  if (firstPrompt) sendToChat(firstPrompt);
}
document.getElementById('chatBack').addEventListener('click', backToMain);

function addMsg(who, text){
  const wrap = document.createElement('div');
  wrap.className = 'msg ' + who;
  wrap.innerHTML = `<div class="bubble"></div>`;
  wrap.querySelector('.bubble').textContent = text;
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
  return wrap;
}

function addBotAnswer(answer){
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = answer.text;
  wrap.appendChild(bubble);

  if (answer.sources && answer.sources.length){
    const toggle = document.createElement('div');
    toggle.className = 'sources-toggle';
    toggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 6l6 6-6 6"/></svg><span>${answer.sources.length} source${answer.sources.length > 1 ? 's' : ''}</span>`;
    const panel = document.createElement('div');
    panel.className = 'sources-panel';
    panel.innerHTML = answer.sources.map(s => `
      <div class="source-card">
        <div class="source-card-head">
          <span class="source-doc">${s.doc}</span>
          <span class="source-status ${s.status}">${s.status === 'confirmed' ? 'Confirmed' : 'Needs review'}</span>
        </div>
        <div class="source-excerpt">"${s.excerpt}"</div>
      </div>
    `).join('');
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      panel.classList.toggle('open');
    });
    wrap.appendChild(toggle);
    wrap.appendChild(panel);
  }
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function addTyping(){
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.innerHTML = `<div class="bubble typing"><span></span><span></span><span></span></div>`;
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
  return wrap;
}

// Each mock answer returns { text, sources: [{doc, excerpt, status}] }
function mockAnswer(q){
  const s = q.toLowerCase();

  if (s.includes('kumar') || s.includes('1042')) {
    return {
      text: "State vs. Kumar (#1042, Delhi High Court) is an ongoing criminal appeal under Section 420 IPC. The State filed its reply on the limitation objection 2 hours ago, and the bench has been reassigned to Justice Malhotra. Next hearing is 21 Aug 2026.",
      sources: [
        { doc: 'State reply on limitation.pdf', excerpt: 'The appeal is filed 4 days beyond the prescribed period of limitation under Section 374...', status: 'confirmed' },
        { doc: 'Cause list, 9 Aug 2026', excerpt: 'WP/1042 — Bench: Hon\u2019ble Justice R. Malhotra', status: 'confirmed' },
      ]
    };
  }
  if (s.includes('mehta') || s.includes('1039')) {
    return {
      text: "Mehta v. Priya Holdings (#1039, NCLT Mumbai) is a winding up petition. The respondent uploaded a revised settlement proposal yesterday; the tribunal has asked both sides to respond before the 10 Aug hearing.",
      sources: [
        { doc: 'Settlement proposal (revised).pdf', excerpt: 'Respondent proposes a phased buyout of petitioner\u2019s shareholding over 18 months...', status: 'confirmed' },
      ]
    };
  }
  if (s.includes('bail')) {
    return {
      text: "Courts assessing bail modification on medical grounds generally weigh the severity and verifiability of the condition, the treatment available in custody, and flight risk. Two Supreme Court authorities are directly on point below — one is confirmed against the reporter citation, the other still needs manual verification.",
      sources: [
        { doc: 'Indian Kanoon — 2019 SCC OnLine SC 412', excerpt: 'Where medical evidence is placed on record and is not seriously disputed, custodial treatment being inadequate is a relevant ground...', status: 'confirmed' },
        { doc: 'Manupatra — MANU/SC/0871/2021', excerpt: 'Bail modification sought solely on medical grounds must be supported by an independent medical board opinion...', status: 'review' },
      ]
    };
  }
  if (s.includes('adverse possession')) {
    return {
      text: "Adverse possession in India generally requires open, continuous, and hostile possession for 12 years under Article 65 of the Limitation Act, 1963. The possession must be to the knowledge of the true owner, and the claimant carries the burden of proof.",
      sources: [
        { doc: 'Limitation Act, 1963 — Article 65', excerpt: 'For possession of immovable property... twelve years from the date the possession of the defendant becomes adverse to the plaintiff.', status: 'confirmed' },
      ]
    };
  }
  if (s.includes('citation') || s.includes('verify')) {
    return {
      text: "Across your active cases, 2 citations currently need verification — both flagged because LexAI couldn't confirm the exact reporter citation against a verified database. Everything else has been cross-checked and confirmed.",
      sources: [
        { doc: 'Draft — adverse possession note.docx', excerpt: 'Cited as "(2020) 4 SCC 221" — reporter volume/page could not be confirmed against SCC Online.', status: 'review' },
        { doc: 'Draft — bail modification note.docx', excerpt: 'Cited as "MANU/SC/0871/2021" — case name mismatch found; please confirm before filing.', status: 'review' },
      ]
    };
  }
  if (s.includes('contradict') || s.includes('document')) {
    return {
      text: "I can compare documents within a Case Space and flag statements that conflict — dates, figures, or factual claims that don't match across filings. Open \u201cCheck documents\u201d from the home screen to try it on State vs. Kumar.",
      sources: []
    };
  }
  if (s.includes('analyze')) {
    return {
      text: "State vs. Kumar has one open issue worth flagging before the next hearing: the State's limitation objection conflicts with the arrest date recorded in the appeal memo versus the trial court judgment. I'd recommend reconciling that before the 21 Aug hearing.",
      sources: [
        { doc: 'Trial court judgment.pdf', excerpt: 'The accused was taken into custody on 14.03.2024...', status: 'confirmed' },
        { doc: 'Appeal memo.pdf', excerpt: 'The appellant states he was arrested on 17.03.2024...', status: 'review' },
      ]
    };
  }
  return {
    text: "In the connected version, LexAI would search verified case law, statutes, and your uploaded case files to answer that, and would show its sources here. This is a prototype response.",
    sources: []
  };
}

function addUpsell(){
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.style.maxWidth = '100%';
  wrap.innerHTML = `
    <div class="upsell-card">
      <div class="upsell-title">You've reached your free limit</div>
      <div class="upsell-text">You've used your ${FREE_LIMIT} free questions this session. Upgrade to Basic or Pro for unlimited research and case analysis.</div>
      <button class="upsell-btn">View plans</button>
    </div>`;
  wrap.querySelector('.upsell-btn').addEventListener('click', openPricing);
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function sendToChat(text){
  addMsg('user', text);
  if (currentPlan === 'free'){
    freeMessagesUsed++;
    if (freeMessagesUsed > FREE_LIMIT){
      setTimeout(addUpsell, 400);
      return;
    }
  }
  const typingEl = addTyping();
  const delay = 600 + Math.random() * 500;
  setTimeout(() => {
    typingEl.remove();
    addBotAnswer(mockAnswer(text));
  }, delay);
}

// Home input
const homeInput = document.getElementById('homeInput');
const homeSend = document.getElementById('homeSend');
homeInput.addEventListener('input', () => homeSend.classList.toggle('ready', homeInput.value.trim().length > 0));
function triggerHomeSend(){
  const val = homeInput.value.trim();
  if (!val) return;
  homeInput.value = '';
  homeSend.classList.remove('ready');
  openChat(val);
}
homeSend.addEventListener('click', triggerHomeSend);
homeInput.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); triggerHomeSend(); }});

// Quick action pills (chat-opening ones only; contradiction pill handled above)
document.querySelectorAll('.pill[data-prompt]').forEach(p =>
  p.addEventListener('click', () => openChat(p.dataset.prompt))
);

// Research items + bar
document.querySelectorAll('.research-item[data-prompt]').forEach(r =>
  r.addEventListener('click', () => openChat(r.dataset.prompt))
);
const researchInput = document.getElementById('researchInput');
document.getElementById('researchSend').addEventListener('click', () => {
  const val = researchInput.value.trim();
  if (!val) return;
  researchInput.value = '';
  openChat(val);
});
researchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter'){ e.preventDefault(); document.getElementById('researchSend').click(); }
});

// Chat composer
document.getElementById('chatSend').addEventListener('click', () => {
  const val = chatInput.value.trim();
  if (!val) return;
  chatInput.value = '';
  sendToChat(val);
});
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter'){ e.preventDefault(); document.getElementById('chatSend').click(); }
});

// Intel items without a case/tab target fall back to chat
document.querySelectorAll('.intel-item[data-prompt]').forEach(item =>
  item.addEventListener('click', () => openChat(item.dataset.prompt))
);

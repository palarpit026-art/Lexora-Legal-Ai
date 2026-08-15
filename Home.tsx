/**
 * Juris Orbital style reminder: this page pairs an asymmetric editorial narrative
 * with a spatial legal-intelligence object; all interaction states use Verdict Green sparingly.
 */
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  GraduationCap,
  Menu,
  MessageCircle,
  PanelTop,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import CourtroomScene from "@/components/CourtroomScene";

type RoleId = "lawyers" | "students" | "citizens";
type WorldId = "orbit" | "research" | "archive" | "resolution";

const roles = {
  lawyers: {
    label: "Lawyers",
    short: "Matter workspace",
    body: "Manage cases, search precedents, and analyze legal documents in one focused working space.",
    prompt: "Review the timeline for a breach-of-contract matter",
    Icon: Scale,
  },
  students: {
    label: "Students",
    short: "Study companion",
    body: "Draft memos, generate citations, and turn dense legal subjects into a more navigable study plan.",
    prompt: "Explain the elements of negligence with a case example",
    Icon: GraduationCap,
  },
  citizens: {
    label: "Citizens",
    short: "Plain-language help",
    body: "Ask legal questions and get clear, plain-English information to help you understand the next step.",
    prompt: "What should I keep after receiving a landlord notice?",
    Icon: UsersRound,
  },
} as const;

const features = [
  {
    index: "01",
    title: "Case file management",
    copy: "Create a matter, collect its documents, and keep the moving pieces in view with concise AI-assisted summaries.",
    Icon: FileText,
    tone: "green",
  },
  {
    index: "02",
    title: "Precedent search",
    copy: "Move from broad legal research to the cases worth reading with relevance-aware search pathways.",
    Icon: Search,
    tone: "blue",
  },
  {
    index: "03",
    title: "Study assistant",
    copy: "Approach constitutional law, torts, contracts, and more through questions, synthesis, and structured explanations.",
    Icon: BookOpen,
    tone: "amber",
  },
  {
    index: "04",
    title: "Citation generator",
    copy: "Format useful references in Bluebook, ALWD, APA, or Chicago style without breaking your research flow.",
    Icon: PanelTop,
    tone: "violet",
  },
  {
    index: "05",
    title: "Ask a question",
    copy: "A calm first place for citizens to translate legal language into clear, practical context.",
    Icon: MessageCircle,
    tone: "rose",
  },
  {
    index: "06",
    title: "Secure & private",
    copy: "A legal workspace should take confidentiality seriously from the first question to the final note.",
    Icon: ShieldCheck,
    tone: "green",
  },
];

const plans = [
  {
    name: "Citizen",
    role: "For everyday legal questions",
    price: "$0",
    cadence: "/ forever",
    features: ["5 free questions", "Plain-English answers", "Know your rights", "No card required"],
    guide: {
      bestFor: "You have an everyday legal question and want a clear starting point before deciding whether professional advice is needed.",
      why: "Citizen keeps the first step simple: ask up to five questions in plain language, then use the explanation to prepare for a conversation with the right person or service.",
      route: ["Choose Citizen", "Ask your question in plain language", "Use the explanation to identify your next useful step"],
      alternative: "Move to Lawyer — Basic when you need a dedicated case workspace, recurring research, or citation tracking.",
    },
  },
  {
    name: "Lawyer — Basic",
    role: "For solo practitioners",
    price: "$29",
    cadence: "/ month",
    features: ["Unlimited case files", "20 precedent searches/mo", "Citation tracking", "Email support"],
    guide: {
      bestFor: "You are a solo practitioner who needs a consistent workspace for active matters, legal research, and source tracking.",
      why: "Basic combines unlimited case files with a monthly precedent-search allowance, so routine matter work stays organized without paying for team-scale access.",
      route: ["Bring an active matter into the workspace", "Use the included research allowance for focused precedent work", "Keep citations and case context with the matter"],
      alternative: "Move to Lawyer — Pro when your research volume is high or several people need to work from the same matter context.",
    },
  },
  {
    name: "Lawyer — Pro",
    role: "For firms & power users",
    price: "$79",
    cadence: "/ month",
    features: ["Everything in Basic", "Unlimited searches", "AI case analysis", "Priority support", "Team collaboration"],
    featured: true,
    guide: {
      bestFor: "You work in a firm or high-volume practice and need unlimited research plus shared context across people and matters.",
      why: "Pro removes the search cap and adds advanced analysis, priority support, and collaboration so the legal workspace can support a broader practice rhythm.",
      route: ["Set up the shared workspace", "Bring team matters and source trails into the same context", "Use unlimited research and analysis for ongoing work"],
      alternative: "Choose Lawyer — Basic instead if you are an individual practitioner with a limited number of research-heavy matters each month.",
    },
  },
];

const worldChapters: { id: WorldId; index: string; label: string; section: string }[] = [
  { id: "orbit", index: "01", label: "Global context", section: "top" },
  { id: "research", index: "02", label: "Authority trail", section: "features" },
  { id: "archive", index: "03", label: "Evidence archive", section: "evidence" },
  { id: "resolution", index: "04", label: "Clear path", section: "pricing" },
];

function LexoraMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "lexora-mark lexora-mark--small" : "lexora-mark"} aria-hidden="true">
      <img src="/assets/lexora-mark.png" alt="" />
    </span>
  );
}

function DocketLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="docket-label">
      <span className="docket-label__dot" />
      {children}
    </div>
  );
}

export default function Home() {
  const [activeRole, setActiveRole] = useState<RoleId>("lawyers");
  const [activeWorld, setActiveWorld] = useState<WorldId>("orbit");
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      type: "assistant",
      body: "I’m Lexora. Choose a role, then ask about a matter, a concept, a citation, or the legal information you need to understand.",
    },
  ]);
  const role = roles[activeRole];
  const selectedPlan = selectedPlanIndex === null ? null : plans[selectedPlanIndex];

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-world]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const dominant = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const scene = dominant?.target.getAttribute("data-world") as WorldId | null;
        if (scene) setActiveWorld(scene);
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: [0.08, 0.32, 0.56] },
    );
    scenes.forEach((scene) => observer.observe(scene));

    const updateWorldPosition = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      document.documentElement.style.setProperty("--world-progress", String(window.scrollY / scrollRange));
    };
    updateWorldPosition();
    window.addEventListener("scroll", updateWorldPosition, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateWorldPosition);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const openChat = () => {
    setChatOpen(true);
    setMenuOpen(false);
  };

  const sendMessage = () => {
    const question = chatValue.trim();
    if (!question) return;
    setChatMessages((messages) => [
      ...messages,
      { type: "user", body: question },
      {
        type: "assistant",
        body: "This prototype demonstrates the Lexora conversation space. In the working product, this response would guide you through the relevant legal context and next useful source or action.",
      },
    ]);
    setChatValue("");
  };

  const showPlanGuide = (planIndex: number) => {
    setSelectedPlanIndex(planIndex);
    window.setTimeout(() => {
      document.getElementById("plan-guide")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const discussSelectedPlan = () => {
    if (!selectedPlan) return;
    setChatValue(`Help me decide whether ${selectedPlan.name} is the right Lexora plan for my needs.`);
    setChatOpen(true);
    toast("Plan guide opened", {
      description: "The pricing guide is a prototype. No plan or payment has been initiated.",
    });
  };

  return (
    <div className="lexora-site">
      <div className={`world-canvas world-canvas--${activeWorld}`} aria-hidden="true">
        <div className="world-canvas__starfield" />
        <div className="world-canvas__horizon" />
        <img className="world-scene world-scene--orbit" src="/assets/lexora-courtroom-atmosphere.png" alt="" />
        <img className="world-scene world-scene--research" src="/assets/lexora-earth-precedent-web.png" alt="" />
        <img className="world-scene world-scene--archive" src="/assets/lexora-earth-evidence-archive.png" alt="" />
        <img className="world-scene world-scene--resolution" src="/assets/lexora-earth-resolution.png" alt="" />
        <div className="world-canvas__rings"><i /><i /><i /></div>
        <div className="world-canvas__status"><span>Court / legal intelligence</span><i /><b>{worldChapters.find((chapter) => chapter.id === activeWorld)?.index}</b></div>
      </div>
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <div className="site-grain" />

      <aside className="world-navigation" aria-label="Legal world chapters">
        <span className="world-navigation__title">Legal world</span>
        {worldChapters.map((chapter) => (
          <button key={chapter.id} className={activeWorld === chapter.id ? "world-navigation__item world-navigation__item--active" : "world-navigation__item"} onClick={() => scrollTo(chapter.section)}>
            <span>{chapter.index}</span><i /><em>{chapter.label}</em>
          </button>
        ))}
      </aside>

      <header className="site-header">
        <a className="brand" href="#top" onClick={() => scrollTo("top")} aria-label="Lexora home">
          <LexoraMark small />
          <span>Lexora</span>
        </a>

        <nav className={menuOpen ? "site-nav site-nav--open" : "site-nav"} aria-label="Primary navigation">
          <button onClick={() => scrollTo("features")}>Capabilities</button>
          <button onClick={() => scrollTo("method")}>How it works</button>
          <button onClick={() => scrollTo("pricing")}>Plans</button>
          <button className="nav-chat-mobile" onClick={openChat}>Launch chat <ArrowUpRight size={15} /></button>
        </nav>

        <div className="header-actions">
          <button className="launch-chat" onClick={openChat}>Launch chat <ArrowUpRight size={15} /></button>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-shell" data-world="orbit">
          <div className="hero-copy">
            <DocketLabel>AI legal assistant / system 01</DocketLabel>
            <h1>Legal clarity, <em>placed in reach.</em></h1>
            <p className="hero-intro">Lexora brings case work, legal study, and plain-language questions into one considered conversation—made for the people who need a useful next step.</p>
            <div className="hero-actions">
              <button className="button button--primary" onClick={openChat}>Open your workspace <ArrowRight size={17} /></button>
              <button className="button button--quiet" onClick={() => scrollTo("features")}>Explore capabilities <ArrowDownLine /></button>
            </div>
            <div className="hero-proof">
              <div><span className="proof-line" />One chat, three legal modes</div>
              <div className="proof-mono">Matter-first interface</div>
            </div>
          </div>

          <CourtroomScene />
        </section>

        <section className="role-zone section-shell" data-world="orbit" aria-labelledby="role-heading">
          <div className="section-rail">
            <DocketLabel>Choose your frame / 02</DocketLabel>
            <h2 id="role-heading">The same intelligence. <em>A different point of entry.</em></h2>
          </div>
          <div className="role-layout">
            <div className="role-list" role="tablist" aria-label="Select your Lexora role">
              {(Object.keys(roles) as RoleId[]).map((key, index) => {
                const item = roles[key];
                const Icon = item.Icon;
                return (
                  <button
                    key={key}
                    className={activeRole === key ? "role-tab role-tab--active" : "role-tab"}
                    onClick={() => setActiveRole(key)}
                    role="tab"
                    aria-selected={activeRole === key}
                  >
                    <span className="role-tab__number">0{index + 1}</span>
                    <Icon size={21} />
                    <span className="role-tab__label">{item.label}<small>{item.short}</small></span>
                    <ArrowUpRight className="role-tab__arrow" size={17} />
                  </button>
                );
              })}
            </div>
            <div className="role-story" key={activeRole}>
              <div className="role-story__top"><role.Icon size={20} /><span>{role.label} mode</span><span className="live-dot">Active</span></div>
              <h3>{role.body}</h3>
              <div className="role-story__prompt"><Sparkles size={16} /><span>{role.prompt}</span><ArrowRight size={15} /></div>
              <button className="text-link" onClick={openChat}>Try this role <ArrowUpRight size={16} /></button>
              <div className="role-story__axis"><span>Context</span><i /><span>Clarity</span></div>
            </div>
          </div>
        </section>

        <section className="features-section section-shell" id="features" data-world="research" aria-labelledby="features-heading">
          <div className="features-heading">
            <div>
              <DocketLabel>Capability ledger / 03</DocketLabel>
              <h2 id="features-heading">Everything you need to <span className="heading-italics">move a legal question forward.</span></h2>
            </div>
            <div className="features-heading__aside"><p>Made for the different ways legal work arrives: a matter to manage, a doctrine to learn, an authority to verify, or a question that needs clearer language.</p><div className="case-index"><span>6 filed capabilities</span><i /><span>One matter trail</span></div></div>
          </div>
          <div className="feature-deck">
            <div className="feature-spine" aria-hidden="true"><span>CASE LEDGER / 03</span><i /><span>INDEXED</span></div>
            {features.map(({ index, title, copy, Icon, tone }) => (
              <article className={`feature-card feature-card--${tone}`} key={title}>
                <div className="feature-card__head"><span>{index}</span><Icon size={19} /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <button onClick={() => toast(title, { description: "This capability is represented in the front-end prototype." })} aria-label={`Learn about ${title}`}><ArrowUpRight size={18} /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="legal-frame-stack" id="evidence" data-world="archive" aria-label="Legal research in full frame">
          <article className="legal-frame legal-frame--signing">
            <img className="legal-frame__image" src="/assets/lexora-user-signing.jpg" alt="Legal professionals reviewing and signing a document" />
            <div className="legal-frame__overlay" aria-hidden="true" />
            <div className="legal-frame__content">
              <DocketLabel>Working record / 04</DocketLabel>
              <h2>Every matter begins with a <span className="heading-italics">record worth keeping.</span></h2>
              <p>Bring questions, documents, notes, and source trails into the same considered context before the next action is chosen.</p>
              <button className="text-link" onClick={openChat}>Open a matter workspace <ArrowRight size={16} /></button>
            </div>
            <div className="legal-frame__index" aria-hidden="true"><span>01</span><i />Matter context</div>
          </article>
          <article className="legal-frame legal-frame--justice">
            <img className="legal-frame__image" src="/assets/lexora-user-justice-statue.jpg" alt="Lady Justice statue, books, and a judge's gavel" />
            <div className="legal-frame__overlay" aria-hidden="true" />
            <div className="legal-frame__content">
              <DocketLabel>Measured authority / 05</DocketLabel>
              <h2>Authority is clearer when every source has its <span className="heading-italics">proper weight.</span></h2>
              <p>Keep precedent, cited authority, and the reasoning around them visible rather than separated across a maze of tabs.</p>
              <button className="text-link" onClick={() => scrollTo("features")}>Explore research capabilities <ArrowRight size={16} /></button>
            </div>
            <div className="legal-frame__index" aria-hidden="true"><span>02</span><i />Authority trail</div>
          </article>
          <article className="legal-frame legal-frame--gavel">
            <img className="legal-frame__image" src="/assets/lexora-user-gavel-scales.jpg" alt="Judge's gavel, scales of justice, and legal books" />
            <div className="legal-frame__overlay" aria-hidden="true" />
            <div className="legal-frame__content">
              <DocketLabel>Order, considered / 06</DocketLabel>
              <h2>Find the next useful fact before the <span className="heading-italics">next decision.</span></h2>
              <p>Lexora holds the evidence, explanation, and working thread together so legal work can move forward with less friction.</p>
              <button className="text-link" onClick={openChat}>Enter the conversation <ArrowRight size={16} /></button>
            </div>
            <div className="legal-frame__index" aria-hidden="true"><span>03</span><i />Order & balance</div>
          </article>
        </section>

        <section className="method-section section-shell" id="method" data-world="resolution" aria-labelledby="method-heading">
          <div className="method-intro">
            <DocketLabel>From question to next step / 05</DocketLabel>
            <h2 id="method-heading">One clean path through the complexity.</h2>
          </div>
          <div className="method-path">
            <article><span className="method-number">01</span><div><h3>Set your role</h3><p>Start in the legal mode that matches the work in front of you.</p></div></article>
            <article><span className="method-number">02</span><div><h3>Ask in context</h3><p>Search a case, draft a document, build a citation, or ask a direct question.</p></div></article>
            <article><span className="method-number">03</span><div><h3>Find your next useful fact</h3><p>Keep sources, explanations, and working notes within the same thread.</p></div></article>
          </div>
        </section>

        <section className="pricing-section section-shell" id="pricing" data-world="resolution" aria-labelledby="pricing-heading">
          <div className="pricing-intro">
            <DocketLabel>Access plans / 06</DocketLabel>
            <h2 id="pricing-heading">A clear place to begin.</h2>
            <div className="pricing-intro__guide"><p>Start with everyday legal questions at no cost. Tap a plan to see what it includes, who it suits, and the most sensible next step.</p><span><span className="pricing-intro__pulse" />Tap a plan for its guide</span></div>
          </div>
          <div className="pricing-deck">
            {plans.map((plan, index) => (
              <article
                className={`${plan.featured ? "plan-card plan-card--featured" : "plan-card"}${selectedPlanIndex === index ? " plan-card--selected" : ""}`}
                key={plan.name}
                role="button"
                tabIndex={0}
                aria-pressed={selectedPlanIndex === index}
                aria-label={`View the ${plan.name} plan guide`}
                onClick={() => showPlanGuide(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    showPlanGuide(index);
                  }
                }}
              >
                {plan.featured && <span className="plan-card__flag">Most complete</span>}
                {selectedPlanIndex === index && <span className="plan-card__selected">Guide open</span>}
                <span className="plan-card__file-tab" aria-hidden="true" />
                <div className="plan-card__meta"><span>Lexora / plan</span><span>{plan.featured ? "03" : plan.name === "Citizen" ? "01" : "02"}</span></div>
                <h3>{plan.name}</h3>
                <p>{plan.role}</p>
                <div className="plan-card__price">{plan.price}<small>{plan.cadence}</small></div>
                <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
                <span className={plan.featured ? "button button--primary button--wide" : "button button--outline button--wide"}>View plan guide <ArrowUpRight size={16} /></span>
              </article>
            ))}
          </div>
          <section id="plan-guide" className={selectedPlan ? "plan-guide plan-guide--open" : "plan-guide"} aria-live="polite">
            {selectedPlan ? (
              <>
                <div className="plan-guide__lead">
                  <DocketLabel>Plan guide / selected {String(selectedPlanIndex! + 1).padStart(2, "0")}</DocketLabel>
                  <h3><span>Best fit:</span> {selectedPlan.name}</h3>
                  <p className="plan-guide__fit">{selectedPlan.guide.bestFor}</p>
                  <p>{selectedPlan.guide.why}</p>
                </div>
                <div className="plan-guide__route">
                  <span className="plan-guide__route-label">A sensible route</span>
                  <ol>
                    {selectedPlan.guide.route.map((step, index) => <li key={step}><b>0{index + 1}</b><span>{step}</span></li>)}
                  </ol>
                </div>
                <div className="plan-guide__alternative">
                  <span>Not sure?</span>
                  <p>{selectedPlan.guide.alternative}</p>
                  <button className="text-link" onClick={discussSelectedPlan}>Talk it through in Lexora <ArrowRight size={16} /></button>
                </div>
                <div className="plan-guide__notice">Prototype pricing guide only. Choosing a plan here does not create an account, charge a card, or replace professional legal advice.</div>
              </>
            ) : (
              <div className="plan-guide__empty"><Sparkles size={18} /><span>Select any plan above to reveal a practical guide for that path.</span></div>
            )}
          </section>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-brand"><LexoraMark small /><span>Lexora</span></div>
        <p>Legal intelligence with a human-readable point of entry.</p>
        <div className="footer-legal"><span>© 2026 Lexora</span><span>Not a substitute for professional legal advice.</span></div>
      </footer>

      {chatOpen && (
        <div className="chat-overlay" role="dialog" aria-modal="true" aria-label="Lexora chat prototype">
          <button className="chat-overlay__backdrop" onClick={() => setChatOpen(false)} aria-label="Close chat" />
          <section className="chat-panel">
            <div className="chat-panel__top">
              <div className="chat-panel__brand"><LexoraMark small /><div><strong>Lexora</strong><span>Legal intelligence workspace</span></div></div>
              <button className="icon-button" onClick={() => setChatOpen(false)} aria-label="Close chat"><X size={20} /></button>
            </div>
            <div className="chat-panel__mode">
              {(Object.keys(roles) as RoleId[]).map((key) => <button onClick={() => setActiveRole(key)} className={activeRole === key ? "mode-button mode-button--active" : "mode-button"} key={key}>{roles[key].label}</button>)}
            </div>
            <div className="chat-messages">
              {chatMessages.map((message, index) => <div className={message.type === "user" ? "chat-message chat-message--user" : "chat-message"} key={`${message.body}-${index}`}>{message.type === "assistant" && <LexoraMark small />}{message.body}</div>)}
            </div>
            <div className="chat-suggestions"><button onClick={() => setChatValue(role.prompt)}>{role.prompt}</button><button onClick={() => setChatValue("Create a citation for this source")}>Create a citation for this source</button></div>
            <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
              <input value={chatValue} onChange={(event) => setChatValue(event.target.value)} placeholder="Ask Lexora a legal question…" aria-label="Chat prompt" />
              <button type="submit" aria-label="Send chat message"><Send size={17} /></button>
            </form>
            <p className="chat-disclaimer">Prototype interface. Lexora does not replace advice from a qualified legal professional.</p>
          </section>
        </div>
      )}
    </div>
  );
}

function ArrowDownLine() {
  return <span className="arrow-down-line" aria-hidden="true" />;
}

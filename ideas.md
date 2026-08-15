# Lexora 3D Front-End Prototype — Design Direction

## Ground-Truth Reference

The supplied Bolt prototype is the source of truth for Lexora’s product proposition, page flow, key messages, audiences, feature set, pricing tiers, and quiet legal-tech tone. The recreation will preserve the page’s core sections—navigation, audience-specific legal assistance, features, how-it-works, pricing, and legal disclosure—while making the interface substantially more dimensional, tactile, and product-led.

## Chosen Approach: Juris Orbital

### Design Movement

**Editorial futurism with restrained spatial computing.** A sculptural product surface brings the calm authority of legal publishing together with a navigation-and-orbit motif drawn from professional research rooms rather than science-fiction interfaces.

### Core Principles

1. **Trust is constructed, not announced.** Every treatment should feel deliberate, quiet, and legible—never noisy or gimmicky.
2. **Depth explains capability.** The 3D centerpiece gives Lexora’s unified chat a concrete spatial form, with role tools orbiting the same legal intelligence core.
3. **Editorial hierarchy guides complexity.** Large serif statements introduce ideas; compact sans-serif metadata and controls make the product feel precise.
4. **Attention moves along a legal argument.** The layout uses a left-aligned narrative and a right-side product artifact, then unfolds into a measured sequence of proof, procedure, and plan selection.

### Color Philosophy

The site uses **Midnight Docket** (#07111E) as the underlying legal archive: dark enough to make content surfaces recede and text remain controlled. **Verdict Green** (#8DE173) signals confidence, resolution, and safe progress, while a small amount of parchment-tinted ivory softens the editorial display type. Copper-amber appears only as an atmospheric backlight, suggesting an illuminated reading desk rather than a decorative gradient.

### Layout Paradigm

The hero is an **asymmetric research desk**: the legal promise occupies the left column, while a floating 3D chat instrument lives on the right. Feature areas use staggered vertical rails and offset panels rather than a generic three-column card grid. The pricing chapter shifts to a compact comparison deck with one foreground plan and two recessed plans.

### Signature Elements

- A **floating legal intelligence orb** built from translucent layered rings, connected tool satellites, and a rotating case-file panel.
- **Docket lines**: fine horizontal rules, tiny case-style numbering, and compact evidence labels that anchor content without feeling bureaucratic.
- **Verdict Green active states** used only for decisive interactions, selected roles, and the primary pathway.

### Interaction Philosophy

Interactions should feel like placing and retrieving documents: direct, weighted, and clear. Role chips change the active persona inside the 3D chat instrument. Buttons provide decisive press feedback. Navigation scrolls to a section rather than opening dead ends. Any unbuilt action explains its prototype status with an unobtrusive toast.

### Animation

The 3D art direction relies on slow orbital drift, alternating ring rotations, and a soft document float behind the chat input. User-triggered transitions remain under 300ms, use a crisp custom ease-out, and only animate transform and opacity. Section reveal is short and staggered; reduced-motion users receive a stable composition.

### Typography System

**DM Serif Display** drives the product promise in title case with large optical spacing. **Manrope** handles all controls, explanatory copy, legal data, and pricing with a crisp contemporary rhythm. Headlines use the serif in regular or italic emphasis; metadata is 11–12px Manrope with generous tracking and uppercase labels sparingly applied.

### Brand Essence

**Lexora makes legal intelligence feel navigable for the people who need clarity, not complexity.** Personality: **measured, capable, human**.

### Brand Voice

Headlines speak with calm certainty; CTAs are active and specific; microcopy explains rather than overpromises. Avoid generic growth-language and unsupported claims.

> “Find the next useful fact.”

> “Choose a matter. Lexora will help you move it forward.”

### Wordmark & Logo

The mark is an abstract **L formed by an open legal scale and a folded document corner**, constructed from two offset line weights. It appears in Verdict Green within a softly squared dark tile; the wordmark combines the custom icon with a compact serif logotype.

### Signature Brand Color

**Verdict Green — #8DE173.**

## Style Decisions

The implementation will use Verdict Green as a decisive signal for selected states, primary actions, key numerals, and a single major editorial emphasis per chapter rather than repeating it decoratively in every heading. The feature ledger and plan comparison will be organized as docketed evidence panels and comparison files, not equal-weight SaaS card grids. Each major section will retain at least one identifiable Lexora motif, including orbital rings, docket lines, case numbering, folded-document edges, evidence labels, or matter-context trails.

## Scroll-World Extension

Lexora now treats the page as one continuous journey through a legal world. A fixed Earth-scale scene shifts from **global context** to **authority trail**, **evidence archive**, and **clear path** as the reader travels down the page. The backdrop moves slowly in response to scroll position, while scene transitions crossfade with restrained motion. The world navigation rail makes chapter changes explicit on desktop, and mobile keeps the same environment without fixed controls. This extends the original Juris Orbital system instead of replacing it.

## Interactive 3D Extension

The hero becomes a **real-time legal globe instrument** rather than a purely decorative render. Its low-poly Earth core, transparent orbital rings, and three evidence markers are rendered in WebGL and continue the existing Midnight Docket / Verdict Green world.

Visitors can drag the globe to inspect it from different angles, move the pointer to influence the orbit’s pose, choose a case-file, precedent, or citation marker to focus that legal signal, and reset the scene to its default research-ready view. The active scroll chapter adjusts the 3D atmosphere instead of replacing the scene: research deepens the network, archive introduces warmer evidence tones, and resolution clears the visual noise. With reduced motion enabled, the globe remains controllable but stops automatic rotation and all non-essential drift.

## Courtroom 3D Extension

The globe is no longer the hero object. Lexora’s interactive scene becomes a **Judicial Instrument Table**: an atmospheric courtroom composition viewed from the counsel table, with a weighted gavel in the foreground, a balanced scale structure suspended above a plinth, and a sequence of case-file volumes forming the architecture behind it.

The composition treats legal work as ordered weight. The gavel represents decision and order; the scales represent balance and judgment; the layered files represent research, context, and evidence. The final scene will be physically constructed from WebGL meshes, not merely pictured: visitors drag to inspect it, click or focus a legal object to bring it forward, and use three clear controls—**Order**, **Balance**, and **Evidence**—to change the camera target and reveal contextual copy. A generated courtroom scene acts only as supporting atmosphere behind the actual geometry.

Verdict Green remains a sparing active-state color. Materials should feel credible and weighty: dark walnut, brushed bronze, parchment, matte graphite, and soft courtroom-window light. Motion is slow and gravity-aware; the gavel and scales never bounce or behave like decorative toys. Reduced-motion users see the same complete legal structure in a stable, manually selectable view.

## Style Decisions

The Judicial Instrument Table must read instantly as gavel, scales, case files, and table through distinct walnut, brushed bronze, parchment, graphite, and courtroom-window lighting. Verdict Green is reserved for the primary action, selected controls, key numerals, and one decisive editorial emphasis per chapter. The long scroll assigns a different legal-world structure to every chapter: instrument table, indexed ledger, evidence archive, procedure path, and plan files.

## Floating Court Artifact

The supplied gavel-and-scales image will appear as a framed judicial exhibit moving independently of the page content. It remains behind the primary text and cards, yet in front of the atmospheric background, so it reads as a physical object passing through the legal world rather than a static image section. Its travel is tied to page progress: it rises as the reader descends, makes a gradual clockwise turn, and reduces in scale and opacity at compact widths. The image keeps its original warm wood-and-brass character as a deliberate material contrast to Lexora’s midnight interface.

## Three-Exhibit Scroll Choreography

Lexora’s user-supplied imagery now works as a complete floating legal exhibit system. The gavel-and-scales image rises from the lower right as a judicial weight. The signing image enters from below on the left, travels upward through the matter and research chapters, then exits near the top. The justice-statue image enters from above at the right, lowers through the page frame as the signing image rises, and anchors the evidence-to-procedure transition. This opposing movement turns the long page into a dimensional legal archive rather than a flat sequence of sections.

## Full-Frame Legal Chapters

The supplied images will now serve as the page’s largest visual evidence, not miniature ornaments. Each scene becomes a dominant full-frame chapter: the signing record, the authority object, and the gavel decision. Each frame uses a separate overlay direction and text safe zone so its subject remains fully visible while all copy maintains reliable contrast. These chapters create the intended slide-through effect as readers move from working record, to authority, to ordered next step.

## Verification Notes

The completed desktop and mobile layouts render with the intended single-column fallback on narrow screens. The primary **Launch chat** action opens the accessible Lexora chat panel with role-mode controls, prototype suggestion chips, a working prompt field, a send action, and a clear professional-advice disclaimer. A live browser test confirmed that a prompt is added to the conversation and receives the explicit prototype response without leaving the page.

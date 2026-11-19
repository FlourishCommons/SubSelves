# SubSelves Brand Book

> **Every part belongs**

---

# 1. COMPANY BASICS

**Official Company/Organization Name:**
SubSelves

**Tagline/Slogan (if any):**
Every part belongs.

**What does your organization do?**
SubSelves is a gentle, guided companion for Parts Work and inner harmony. It helps people meet the protective, vulnerable, and child parts shaped by inherited patterns and build the capacity to hold competing needs with compassion.

**Industry/Sector:**
Mental health and wellbeing; self-guided inner work; digital health tools.

**Target Audience:**
Adults doing reflective, trauma-aware inner work—especially people exploring inherited family patterns, Parts Work, and intergenerational healing. Many are new to structured practice and want something safe, unhurried, and non-clinical.

**Brand Personality:**

- [x] Friendly & Approachable
- [ ] Innovative & Cutting-edge
- [x] Playful & Creative
- [ ] Bold & Energetic
- [x] Calm & Peaceful
- [ ] Other:

---

# 2. LOGO & VISUAL MARK

**Do you have an existing logo?**
- [ ] Yes
- [ ] No

**Logo Description:**
A circular mark containing concentric rings and four outward rays—a simple map of many parts held within one center. It reads as a whole made of smaller wholes: Self at the center, parts in relationship around it.

**Logo Variations:**

- [x] Full color
- [x] Black & white
- [x] Icon only
- [x] Horizontal
- [ ] Vertical
- [ ] Other:

**Logo Usage Rules:**
- The full-color mark uses an apricot → golden yellow → deep teal gradient on a soft ivory field.
- On deep teal surfaces, use the mark at full color with ivory or ink line work as contrast allows.
- Keep clear space equal to the mark's inner ring on all sides.
- Do not recolor the mark with a single part color, add shadows, or outline it.
- The wordmark is set in Geist Sans semibold with tight tracking and charcoal text.

---

# 3. BRAND COLORS

## Primary Colors

| Color Name | HEX | RGB |
|------------|-----|-----|
| Deep Teal — connection and clarity | `#246B68` | 36, 107, 104 |
| Apricot Coral — warmth and aliveness | `#EF9476` | 239, 148, 118 |
| Golden Yellow — insight and possibility | `#EAC461` | 234, 196, 97 |

## Secondary Colors

| Color Name | HEX | RGB |
|------------|-----|-----|
| Periwinkle — another distinct part | `#929AD5` | 146, 154, 213 |
| Fresh Sage — growth and renewal | `#9BBE9A` | 155, 190, 154 |
| Soft Ivory — background | `#FCFAF6` | 252, 250, 246 |

## Accent Colors

| Color Name | HEX | RGB |
|------------|-----|-----|
| Deep Charcoal (text) | `#263735` | 38, 55, 53 |
| Apricot Tint (surfaces) | `#FBE8E1` | 251, 232, 225 |
| Golden Tint (surfaces) | `#FBF1D8` | 251, 241, 216 |
| Teal Tint (surfaces) | `#E3EFED` | 227, 239, 237 |
| Periwinkle Tint (surfaces) | `#EAECF8` | 234, 236, 248 |
| Sage Tint (surfaces) | `#EAF1E7` | 234, 241, 231 |

**Accessible text variants**

| Token | HEX | Use |
|-------|-----|-----|
| Teal Deep | `#1B524F` | Hover states, small text on teal tints |
| Apricot Deep | `#8F422C` | Small labels on apricot tints |
| Golden Deep | `#7A5C18` | Small labels on golden tints |
| Periwinkle Deep | `#4F5A9E` | Small labels on periwinkle tints |
| Sage Deep | `#446E43` | Small labels on sage tints |

**Color Philosophy / Reasoning:**
The interface should feel calm and readable, while the parts inside it feel lively and distinct. Deep teal is the stable anchor: connection, clarity, and the color of every primary action. Apricot and golden yellow bring warmth and visible aliveness. Periwinkle and sage give other parts their own identities without competing with the anchor. Soft ivory and deep charcoal keep everything legible and unhurried.

**Color Usage Guidelines:**
- **Soft ivory is the default page and header field.** White may be used for raised cards and content bands; the two should alternate gently.
- **Keep headings and body text deep charcoal.** Never use pure black.
- **Deep teal is the primary action color.** Use it for primary buttons, selected states, focus rings, and the strongest surfaces. One clear teal anchor per view.
- **Give each part its own accent and a very pale matching background.** Apricot, golden, periwinkle, and sage are equal members of the palette. Do not imply that one part is "good" and another "bad" through color.
- **The Self conversation bubble is warm ivory with a deep teal border.** Part bubbles use their own tint and matching border.
- **Use apricot and golden visibly in the hero illustration**—large translucent fields, gradients, and shapes—rather than scattering them across small text.
- **Periwinkle is a supporting color, not the dominant one.** It helps multiplicity read without turning the interface purple or sleepy.
- **Use pale tints behind text.** Small text on tints uses the deep variants or charcoal, never bright apricot or golden.
- **Avoid bright blue and muted all-purple layouts.** Blue is not part of the system; pair a calm base with distinct, saturated part accents.
- **Dark surfaces** use Deep Teal with ivory text, not navy or charcoal.

**Design tokens (Tailwind / CSS):**

```css
--color-teal: #246b68;
--color-teal-deep: #1b524f;
--color-apricot: #ef9476;
--color-apricot-deep: #8f422c;
--color-golden: #eac461;
--color-golden-deep: #7a5c18;
--color-periwinkle: #929ad5;
--color-periwinkle-deep: #4f5a9e;
--color-sage: #9bbe9a;
--color-sage-deep: #446e43;
--color-ivory: #fcfaf6;
--color-ink: #263735;
--color-teal-tint: #e3efed;
--color-apricot-tint: #fbe8e1;
--color-golden-tint: #fbf1d8;
--color-periwinkle-tint: #eaecf8;
--color-sage-tint: #eaf1e7;
```

---

# 4. TYPOGRAPHY

## Primary Heading Font

**Font Name:**
Geist Sans

**Weights Used:**
500–600 (semibold preferred for headlines)

**Usage:**
Page titles, section headings, card titles, buttons, and the wordmark. Headlines use tight tracking and generous line height; avoid all-caps for long headings.

## Secondary Font

**Font Name:**
Geist Mono

**Weights Used:**
400–500

**Usage:**
Metadata, preview labels, tokens, timestamps, and small technical details. Use sparingly.

## Body Font

**Font Name:**
Geist Sans

**Weights Used:**
400 (body), 500–600 (labels and emphasis)

**Usage:**
Paragraphs, interface copy, form fields, and navigation. Body copy sits at 16–18px with a relaxed line height for a calm reading pace.

**Font Pairing Philosophy:**
One humanist sans carries nearly everything, with mono reserved for quiet metadata. Typography should feel open and unhurried—space is part of the voice.

---

# 5. IMAGE STYLE & PHOTOGRAPHY

**Photography Style**

- [x] Bright & Airy
- [ ] Dark & Moody
- [ ] High Contrast
- [x] Soft & Muted
- [ ] Vibrant & Colorful
- [ ] Black & White
- [x] Natural & Candid
- [ ] Staged & Professional
- [ ] Lifestyle
- [ ] Product-focused
- [x] Abstract
- [ ] Other:

**Subject Matter:**
Hands, windows, soft natural light, quiet domestic spaces, paths, overlapping translucent forms, and abstract circles in the brand palette. People appear as whole, unposed humans—never fragmented or pathologized.

**Photography Guidelines:**
- Favor warm, diffused daylight and soft ivory environments.
- Keep the frame calm, but allow real color and life—avoid washed-out, gray imagery.
- Do not depict distress graphically or use imagery that suggests a part is "bad."
- Abstract imagery uses overlapping apricot, golden, periwinkle, sage, and teal shapes to express multiplicity resolving into clarity.

---

# 6. GRAPHICS & ILLUSTRATIONS

**Do you use illustrations?**

- [x] Yes
- [ ] No
- [x] Sometimes

**Illustration Style**

- [ ] Flat
- [x] Line Art
- [ ] Hand Drawn
- [x] Geometric
- [x] Organic
- [x] Abstract
- [ ] Realistic
- [x] Minimalist
- [ ] Other:

**Graphic Elements:**
Concentric circles, overlapping translucent discs, soft blurred color fields, and simple rounded line icons. Color overlap is meaningful: transparency shows parts coexisting rather than competing. Gradients are soft but saturated enough to stay alive—apricot and golden should be clearly visible, never glossy.

---

# 7. ICONOGRAPHY

**Icon Style**

- [x] Outlined
- [ ] Filled
- [x] Rounded
- [ ] Sharp
- [x] Minimalist
- [ ] Detailed
- [ ] Other:

**Common Icons Needed:**
Parts library, conversation, saved part, harmony/heart, check-in, session, practice, journal, search, settings, support/donate, and progress.

**Icon Rules:**
Use a consistent 1.6–1.8 stroke width, rounded caps and joins, and a 24×24 viewBox. Place icons on pale palette tints with the matching deep accent or charcoal for contrast. Never use icons alone for meaning without an accessible label.

---

# 8. BRAND VOICE & TONE

**Brand Voice Description:**
Warm, steady, and curious. SubSelves speaks like a thoughtful guide sitting beside you—never above you. It makes room for complexity without dramatizing it, and it treats every part with dignity.

**Tone Characteristics**

- [ ] Professional
- [x] Conversational
- [x] Empathetic
- [x] Educational
- [x] Inspiring
- [x] Direct
- [ ] Playful
- [ ] Serious
- [x] Warm
- [ ] Technical
- [ ] Other:

**Words We Use:**
part, Self, curiosity, compassion, notice, listen, space, choice, steadiness, clarity, belongs, gentle, pace, grounded, inherited, pattern, capacity.

**Words We Avoid:**
bad part, fix, cure, broken, disorder, should, must, toxic, eliminate, get rid of, fight, failure. Avoid clinical diagnosis language and promises of outcome. Do not frame parts as enemies.

---

# 9. BRAND APPLICATIONS

**Brand Usage**

- [x] Website
- [x] Mobile App
- [ ] Social Media
- [ ] Print Materials
- [ ] Business Cards
- [ ] Presentations
- [ ] Email Marketing
- [ ] Packaging
- [ ] Signage
- [ ] Merchandise
- [ ] Video Content
- [ ] Other:

**Primary Platform / Medium:**
Responsive web application and mobile web.

**Application Rules:**
- Landing pages lead with ivory, a charcoal headline, a deep teal primary button, and a hero illustration with visible apricot and golden.
- The header stays ivory. Do not use navy, charcoal, or dark fills behind the primary navigation.
- The signed-in app carries the same tokens; replace legacy blue primary actions with teal and legacy gray text with charcoal.
- Account and authentication actions always use teal, never blue.
- Cards use soft borders (`ink` at 10–15% opacity) and restrained shadows tinted with teal.
- Part chips and bubbles use pale matching tints with a matching accent border; selected filter states use teal.

---

# 10. ADDITIONAL ELEMENTS

**Gradients**

- [x] Yes
- [ ] No

**Patterns / Textures**

- [ ] Yes
- [x] No

If yes:

Soft multi-color gradients and blurred translucent circles only. No repeating patterns, noise textures, or glossy effects.

**Special Effects:**
Large, low-opacity color fields; gentle blur; overlapping translucent shapes; subtle lift on interactive cards. Motion should be slow and optional, never urgent.

---

# 11. BRAND PERSONALITY & VALUES

**Mission Statement**
To give everyone a gentle, structured way to meet their parts, understand what they carry, and choose a new response.

**Core Values**
- 

**Brand Attributes (3–5 words)**
Warm · Steady · Alive · Curious · Grounded

---

# 12. INSPIRATION & REFERENCES

**Brands You Admire**
- not sure yet
**What You Like About Them**

**Competitor Brands**

**What to Avoid**
- Clinical blue-and-white healthcare aesthetics; 
- gamified streak pressure; 
- high-saturation gradients;
-  dark navy headers; muted all-purple layouts; 
-  any visual language that sorts parts into good and bad.

---

# 13. SPECIAL REQUIREMENTS

**Accessibility Needs**

- [ny] High contrast
- [ny] Color-blind considerations
- [ ] Other:

**Requirements:**
- Body text uses Deep Charcoal at sufficient contrast on ivory and white.
- Never rely on color alone to distinguish part groups; pair color with labels and dots.
- Small text on tints uses the deep variants or charcoal, not bright apricot or golden.
- Interactive targets meet 44×44px on touch.
- Respect reduced-motion preferences and maintain visible focus rings (teal).
- Color should remain meaningful without red/green differentiation.

**Industry-Specific Requirements**
Trauma-informed language and imagery. Clear crisis and scope disclaimers. No diagnosis, cure claims, or imagery of people in acute distress.

**Cultural Considerations**
Intergenerational and family patterns are treated with respect and without blame. Avoid depicting any culture, family, or part as deficient.

---

# FINAL NOTES

**Additional Information**
The central visual metaphor is **a calm, readable interface holding lively, distinct parts**. The base stays quiet—ivory field, charcoal text, one teal anchor—while each part carries its own saturated accent and pale matching background. When in doubt, keep the structure calm and let the parts stay colorful.

**Priority Sections**
Brand colors, color usage guidelines, and voice and tone.

**Timeline / Urgency**
Apply the palette to the landing page and primary navigation first; continue migrating component-level blue and gray values as surfaces are touched.

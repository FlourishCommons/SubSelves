import type { PartGroup } from '@/lib/types';

export interface PartArt {
  name: string;
  group: PartGroup;
  icon: string;
  thumbnail: string;
  scene: string;
  meaning: string;
  sourceUrl?: string;
  provisional: boolean;
  sourceStatus: string;
}

const partArtByName: Record<string, PartArt> = {
  "manager:(True) Self or Leader or Coach or CEO": {
    "name": "(True) Self or Leader or Coach or CEO",
    "group": "manager",
    "icon": "/part-art/icons/manager/true-self-or-leader-or-coach-or-ceo.png",
    "thumbnail": "/part-art/thumbnails/manager/true-self-or-leader-or-coach-or-ceo.png",
    "scene": "A calm coral conductor unites four distinct colored flowing paths into one circular meeting place; open-handed coordination, no crown or hierarchy.",
    "meaning": "Natural talent for effective inner-family leadership; guides all subselves with wisdom, compassion, and clarity.",
    "sourceUrl": "https://sfhelp.org/popIF/selves.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/selves.htm) — Mapped from supplied summary"
  },
  "manager:Achiever or Do-er or Driver": {
    "name": "Achiever or Do-er or Driver",
    "group": "manager",
    "icon": "/part-art/icons/manager/achiever-or-do-er-or-driver.png",
    "thumbnail": "/part-art/thumbnails/manager/achiever-or-do-er-or-driver.png",
    "scene": "A coral figure pushes a broad golden wheel up a gentle incline; visible momentum, purposeful effort, a clear resting ledge ahead.",
    "meaning": "Provides motivation and drive to 'get things done now'; fuels productivity and accomplishment in Self-led systems.",
    "sourceUrl": "https://sfhelp.org/popIF/achiever.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/achiever.htm) — Mapped from supplied summary"
  },
  "manager:Analyzer or Thinker": {
    "name": "Analyzer or Thinker",
    "group": "manager",
    "icon": "/part-art/icons/manager/analyzer-or-thinker.png",
    "thumbnail": "/part-art/thumbnails/manager/analyzer-or-thinker.png",
    "scene": "A thoughtful figure holds three golden pieces forming a coherent pattern.",
    "meaning": "Logic, evaluation and synthesis bring separate information into an understandable whole.",
    "sourceUrl": "https://sfhelp.org/popIF/analyzer.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/analyzer.htm) — Mapped from supplied summary"
  },
  "manager:Far Seer": {
    "name": "Far Seer",
    "group": "manager",
    "icon": "/part-art/icons/manager/far-seer.png",
    "thumbnail": "/part-art/thumbnails/manager/far-seer.png",
    "scene": "A figure on a tall periwinkle ridge looks through a golden telescope toward a distant branching horizon; long view.",
    "meaning": "Envisions long-range possibilities and future trajectories; provides strategic foresight.",
    "sourceUrl": "https://sfhelp.org/popIF/far_seer.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/far_seer.htm) — Provisional: description needs verification"
  },
  "manager:Healer or Health Director": {
    "name": "Healer or Health Director",
    "group": "manager",
    "icon": "/part-art/icons/manager/healer-or-health-director.png",
    "thumbnail": "/part-art/thumbnails/manager/healer-or-health-director.png",
    "scene": "A figure gently joins two halves of a cracked golden bowl using one smooth coral seam; attentive repair.",
    "meaning": "Promotes healthy diet, balanced work/play/exercise/rest, and appropriate preventive/curative care; coordinates wholistic wellbeing.",
    "sourceUrl": "https://sfhelp.org/popIF/health_director.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/health_director.htm) — Mapped from supplied summary"
  },
  "manager:Humanitarian": {
    "name": "Humanitarian",
    "group": "manager",
    "icon": "/part-art/icons/manager/humanitarian.png",
    "thumbnail": "/part-art/thumbnails/manager/humanitarian.png",
    "scene": "A wheelchair user cares for a bird and a German Shepherd beneath a broad shared canopy; care and belonging extend across different lives.",
    "meaning": "Motivates concern for welfare of others and living things; extends nurturance beyond self.",
    "sourceUrl": "https://sfhelp.org/popIF/humanitarian.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/humanitarian.htm) — Provisional: description needs verification"
  },
  "manager:Learner or Student": {
    "name": "Learner or Student",
    "group": "manager",
    "icon": "/part-art/icons/manager/learner-or-student.png",
    "thumbnail": "/part-art/thumbnails/manager/learner-or-student.png",
    "scene": "A small figure climbs broad golden book-shaped steps toward an open teal doorway; developing skill through learning.",
    "meaning": "Drives acquisition of knowledge and skills; maintains curiosity and growth orientation.",
    "sourceUrl": "https://sfhelp.org/popIF/learner.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/learner.htm) — Provisional: description needs verification"
  },
  "manager:Manipulator": {
    "name": "Manipulator",
    "group": "manager",
    "icon": "/part-art/icons/manager/manipulator.png",
    "thumbnail": "/part-art/thumbnails/manager/manipulator.png",
    "scene": "A coral figure arranges three golden stepping stones across water for another figure to follow; indirect influence, subtly constrained route, no villain.",
    "meaning": "Orchestrates people and situations to guarantee safety; uses covert influence and exploitation.",
    "sourceUrl": "https://sfhelp.org/popIF/controller.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/controller.htm) — Provisional: description needs verification"
  },
  "manager:Moralizer or Rule Keeper": {
    "name": "Moralizer or Rule Keeper",
    "group": "manager",
    "icon": "/part-art/icons/manager/moralizer-or-rule-keeper.png",
    "thumbnail": "/part-art/thumbnails/manager/moralizer-or-rule-keeper.png",
    "scene": "A figure measures a crooked golden path against a rigid straight teal ruler; tension between lived complexity and internal rules.",
    "meaning": "Enforces internalized moral standards and rules; evaluates behavior against ethical frameworks.",
    "sourceUrl": "https://sfhelp.org/popIF/moralizer.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/moralizer.htm) — Mapped from supplied summary"
  },
  "manager:Nurturer(s) or Loving Parent": {
    "name": "Nurturer(s) or Loving Parent",
    "group": "manager",
    "icon": "/part-art/icons/manager/nurturer-s-or-loving-parent.png",
    "thumbnail": "/part-art/thumbnails/manager/nurturer-s-or-loving-parent.png",
    "scene": "Curved hands shelter a golden sprout near the heart.",
    "meaning": "Care provides conditions for growth, nourishment and wellbeing.",
    "sourceUrl": "https://sfhelp.org/popIF/nurturer.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/nurturer.htm) — Mapped from supplied summary"
  },
  "manager:Observer or Reporter": {
    "name": "Observer or Reporter",
    "group": "manager",
    "icon": "/part-art/icons/manager/observer-or-reporter.png",
    "thumbnail": "/part-art/thumbnails/manager/observer-or-reporter.png",
    "scene": "A quiet figure stands beside a pool reflecting a golden crescent.",
    "meaning": "Calm awareness notices experience without changing or judging it.",
    "sourceUrl": "https://sfhelp.org/popIF/observer.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/observer.htm) — Mapped from supplied summary"
  },
  "manager:Pace-setter or Balancer": {
    "name": "Pace-setter or Balancer",
    "group": "manager",
    "icon": "/part-art/icons/manager/pace-setter-or-balancer.png",
    "thumbnail": "/part-art/thumbnails/manager/pace-setter-or-balancer.png",
    "scene": "A figure gently steadies a pendulum between a running-wave motif and a resting crescent; sustainable rhythm, no scales.",
    "meaning": "Regulates tempo of activity and rest; maintains sustainable rhythm across subselves.",
    "sourceUrl": "https://sfhelp.org/popIF/pace_setter.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/pace_setter.htm) — Provisional: description needs verification"
  },
  "manager:Philosopher": {
    "name": "Philosopher",
    "group": "manager",
    "icon": "/part-art/icons/manager/philosopher.png",
    "thumbnail": "/part-art/thumbnails/manager/philosopher.png",
    "scene": "A small seated figure contemplates a large golden question-shaped river winding through rock; mystery, meaning and perspective, no literal punctuation.",
    "meaning": "Seeks meaning, purpose, and understanding of life's fundamental questions; integrates experience into coherent worldview.",
    "sourceUrl": "https://sfhelp.org/popIF/philosopher.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/philosopher.htm) — Provisional: description needs verification"
  },
  "manager:Planner or Organizer": {
    "name": "Planner or Organizer",
    "group": "manager",
    "icon": "/part-art/icons/manager/planner-or-organizer.png",
    "thumbnail": "/part-art/thumbnails/manager/planner-or-organizer.png",
    "scene": "A figure unfolds a golden map whose few broad curved paths connect three teal destinations in a useful sequence.",
    "meaning": "Prioritizes and arranges physical/abstract things in useful order; devises and executes effective plans for short/long-term goals.",
    "sourceUrl": "https://sfhelp.org/popIF/organizer_planner.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/organizer_planner.htm) — Mapped from supplied summary"
  },
  "manager:Practical Adult (\"Common Sense\")": {
    "name": "Practical Adult (\"Common Sense\")",
    "group": "manager",
    "icon": "/part-art/icons/manager/practical-adult-common-sense.png",
    "thumbnail": "/part-art/thumbnails/manager/practical-adult-common-sense.png",
    "scene": "A figure places one sturdy golden plank across a small stream, choosing a simple workable crossing.",
    "meaning": "Applies pragmatic, grounded common sense to daily decisions; balances idealism with feasibility.",
    "sourceUrl": "https://sfhelp.org/popIF/adult.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/adult.htm) — Provisional: description needs verification"
  },
  "manager:Prioritizer": {
    "name": "Prioritizer",
    "group": "manager",
    "icon": "/part-art/icons/manager/prioritizer.png",
    "thumbnail": "/part-art/thumbnails/manager/prioritizer.png",
    "scene": "A figure fills a clear round vessel with three large golden stones while small periwinkle pebbles wait outside; essentials first.",
    "meaning": "Ranks tasks, values, and goals by importance; allocates energy and attention accordingly.",
    "sourceUrl": "https://sfhelp.org/popIF/prioritizer.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/prioritizer.htm) — Provisional: description needs verification"
  },
  "manager:Professor or Teacher": {
    "name": "Professor or Teacher",
    "group": "manager",
    "icon": "/part-art/icons/manager/professor-or-teacher.png",
    "thumbnail": "/part-art/thumbnails/manager/professor-or-teacher.png",
    "scene": "Two figures stand at opposite ends of a golden unfolding scroll; one points and the other discovers a simple constellation pattern.",
    "meaning": "Synthesizes and transmits knowledge; mentors other subselves and external others.",
    "sourceUrl": "https://sfhelp.org/popIF/professor.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/professor.htm) — Provisional: description needs verification"
  },
  "manager:Survivor": {
    "name": "Survivor",
    "group": "manager",
    "icon": "/part-art/icons/manager/survivor.png",
    "thumbnail": "/part-art/thumbnails/manager/survivor.png",
    "scene": "A rooted coral tree bends around a large teal boulder, its trunk intact and a single golden branch reaching onward; endurance.",
    "meaning": "Embodies resilience and endurance; ensures continuity through adversity.",
    "sourceUrl": "https://sfhelp.org/popIF/survivor.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/survivor.htm) — Provisional: description needs verification"
  },
  "manager:Wise One or Sage or Crone": {
    "name": "Wise One or Sage or Crone",
    "group": "manager",
    "icon": "/part-art/icons/manager/wise-one-or-sage-or-crone.png",
    "thumbnail": "/part-art/thumbnails/manager/wise-one-or-sage-or-crone.png",
    "scene": "A grandmother holds a book and walking stick within broad tree rings opening into a golden path; experience becomes wise guidance.",
    "meaning": "Embodies accumulated wisdom, discernment, and long-view perspective; mentors from experience.",
    "sourceUrl": "https://sfhelp.org/popIF/wise1.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/wise1.htm) — Provisional: description needs verification"
  },
  "guardian:Addict or Compulsive One": {
    "name": "Addict or Compulsive One",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/addict-or-compulsive-one.png",
    "thumbnail": "/part-art/thumbnails/guardian/addict-or-compulsive-one.png",
    "scene": "A figure walks around a golden circular treadmill-like path toward a relief cup that remains just ahead; repeating pursuit of relief, compassionate not punitive.",
    "meaning": "Uses substances, behaviors, or processes to numb, escape, or self-soothe; compulsive repetition.",
    "sourceUrl": "https://sfhelp.org/popIF/addict.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/addict.htm) — Mapped from supplied summary"
  },
  "guardian:Anesthetist or Numb-er or Blocker": {
    "name": "Anesthetist or Numb-er or Blocker",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/anesthetist-or-numb-er-or-blocker.png",
    "thumbnail": "/part-art/thumbnails/guardian/anesthetist-or-numb-er-or-blocker.png",
    "scene": "A soft periwinkle blanket covers a coral bell so its vibrations become still; temporary muffling of painful signals.",
    "meaning": "Numbs emotions, blocks awareness, and prevents remembering painful things; chemical/psychic anesthesia.",
    "sourceUrl": "https://sfhelp.org/popIF/numb-er.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/numb-er.htm) — Mapped from supplied summary"
  },
  "guardian:Avoider or Fugitive or Runner": {
    "name": "Avoider or Fugitive or Runner",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/avoider-or-fugitive-or-runner.png",
    "thumbnail": "/part-art/thumbnails/guardian/avoider-or-fugitive-or-runner.png",
    "scene": "A figure turns sideways into a soft teal alcove while an unopened golden envelope waits on the open path; retreat from anticipated discomfort.",
    "meaning": "Evades situations, people, and internal experiences perceived as threatening; flight response.",
    "sourceUrl": "https://sfhelp.org/popIF/avoider.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/avoider.htm) — Mapped from supplied summary"
  },
  "guardian:Catastrophizer": {
    "name": "Catastrophizer",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/catastrophizer.png",
    "thumbnail": "/part-art/thumbnails/guardian/catastrophizer.png",
    "scene": "A small real pebble casts an enormous jagged mountain-shaped periwinkle shadow toward a crouched figure; worst-case certainty exaggerates scale.",
    "meaning": "Imagines worst-case scenarios; 'We're gonna die!' Amplifies threat perception.",
    "sourceUrl": "https://sfhelp.org/popIF/catastrophizer.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/catastrophizer.htm) — Mapped from supplied summary"
  },
  "guardian:Competitor or Opponent": {
    "name": "Competitor or Opponent",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/competitor-or-opponent.png",
    "thumbnail": "/part-art/thumbnails/guardian/competitor-or-opponent.png",
    "scene": "One figure compares a small footprint with an oversized projected footprint along a measuring path; inner pressure to measure up, without a rival or winner.",
    "meaning": "Frames life as zero-sum contest; must win to be safe; views others as rivals.",
    "sourceUrl": "https://sfhelp.org/popIF/competitor.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/competitor.htm) — Provisional: description needs verification"
  },
  "guardian:Con artist or Thief or Cheat": {
    "name": "Con artist or Thief or Cheat",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/con-artist-or-thief-or-cheat.png",
    "thumbnail": "/part-art/thumbnails/guardian/con-artist-or-thief-or-cheat.png",
    "scene": "A figure slides a golden token beneath a curved tabletop while showing an empty open palm above; concealment to obtain safety or advantage, dignified.",
    "meaning": "Deceives, steals, and cheats to secure resources and advantage; manipulative exploitation.",
    "sourceUrl": "https://sfhelp.org/popIF/liar_con.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/liar_con.htm) — Mapped from supplied summary"
  },
  "guardian:Controller or Manipulator or User": {
    "name": "Controller or Manipulator or User",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/controller-or-manipulator-or-user.png",
    "thumbnail": "/part-art/thumbnails/guardian/controller-or-manipulator-or-user.png",
    "scene": "A figure pulls several golden strings attached to broad curved gates around a small inner courtyard; managing uncertainty through control.",
    "meaning": "Orchestrates people and situations to guarantee safety; uses covert influence and exploitation.",
    "sourceUrl": "https://sfhelp.org/popIF/controller.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/controller.htm) — Provisional: description needs verification"
  },
  "guardian:Critic or Shamer or Blamer": {
    "name": "Critic or Shamer or Blamer",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/critic-or-shamer-or-blamer.png",
    "thumbnail": "/part-art/thumbnails/guardian/critic-or-shamer-or-blamer.png",
    "scene": "A watchful figure holds a magnifying lens over a tiny irregularity in a broad golden vessel; flaw-finding intended to prevent rejection.",
    "meaning": "Ceaselessly catalogs flaws, failures, and mistakes; discounts praise; rebukes every perceived sin.",
    "sourceUrl": "https://sfhelp.org/popIF/critic.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/critic.htm) — Mapped from supplied summary"
  },
  "guardian:Cynic": {
    "name": "Cynic",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/cynic.png",
    "thumbnail": "/part-art/thumbnails/guardian/cynic.png",
    "scene": "A figure holds a dark teal tinted pane before a bright coral landscape, reducing its golden possibilities to muted silhouettes; protective distrust.",
    "meaning": "Expects the worst, discounts the positive; 'Nothing works, no one cares.'",
    "sourceUrl": "https://sfhelp.org/popIF/cynic_pessimist.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/cynic_pessimist.htm) — Mapped from supplied summary"
  },
  "guardian:Daredevil": {
    "name": "Daredevil",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/daredevil.png",
    "thumbnail": "/part-art/thumbnails/guardian/daredevil.png",
    "scene": "A figure balances joyfully on a golden tightrope across a teal gap, a quiet secure landing visible; risk to outrun vulnerability.",
    "meaning": "Seeks danger and intensity to feel alive; counters numbness through adrenaline.",
    "sourceUrl": "https://sfhelp.org/popIF/daredevil.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/daredevil.htm) — Provisional: description needs verification"
  },
  "guardian:Distracter or Defocuser": {
    "name": "Distracter or Defocuser",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/distracter-or-defocuser.png",
    "thumbnail": "/part-art/thumbnails/guardian/distracter-or-defocuser.png",
    "scene": "A figure turns a large golden pinwheel toward a small periwinkle raincloud behind them; attention redirected from discomfort.",
    "meaning": "Scatters attention, prevents sustained focus on painful or threatening material.",
    "sourceUrl": "https://sfhelp.org/popIF/distracter.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/distracter.htm) — Provisional: description needs verification"
  },
  "guardian:Egotist or Narissist": {
    "name": "Egotist or Narissist",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/egotist-or-narissist.png",
    "thumbnail": "/part-art/thumbnails/guardian/egotist-or-narissist.png",
    "scene": "A small figure stands behind a large ornate golden mirror reflecting a much larger silhouette; inflated appearance sheltering vulnerability, no caricature.",
    "meaning": "Inflates self-importance to mask deep inadequacy; demands admiration and special treatment.",
    "sourceUrl": "https://sfhelp.org/popIF/egotist.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/egotist.htm) — Provisional: description needs verification"
  },
  "guardian:Entertainer or Clown or Joker": {
    "name": "Entertainer or Clown or Joker",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/entertainer-or-clown-or-joker.png",
    "thumbnail": "/part-art/thumbnails/guardian/entertainer-or-clown-or-joker.png",
    "scene": "A coral performer holds a smiling golden theater mask while a small periwinkle tear-shaped patch rests behind the stage curtain; humor as protection.",
    "meaning": "Uses humor and performance to deflect, charm, and control; 'Laugh so you don't see me hurt.'",
    "sourceUrl": "https://sfhelp.org/popIF/entertainer.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/entertainer.htm) — Mapped from supplied summary"
  },
  "guardian:Entitled One or Jealous One": {
    "name": "Entitled One or Jealous One",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/entitled-one-or-jealous-one.png",
    "thumbnail": "/part-art/thumbnails/guardian/entitled-one-or-jealous-one.png",
    "scene": "A figure guards an oversized golden throne-like cushion while three smaller unoccupied cushions wait nearby; insistence on special treatment.",
    "meaning": "Demands special rights, resents others' advantages; 'I deserve more.'",
    "sourceUrl": "https://sfhelp.org/popIF/entitled_1.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/entitled_1.htm) — Provisional: description needs verification"
  },
  "guardian:Fanatic or Terrorist or Zealot": {
    "name": "Fanatic or Terrorist or Zealot",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/fanatic-or-terrorist-or-zealot.png",
    "thumbnail": "/part-art/thumbnails/guardian/fanatic-or-terrorist-or-zealot.png",
    "scene": "A figure grips a rigid single golden beam like a banner pole while a wide multicolored horizon is screened by a narrow teal opening; certainty narrowing possibility, no weapons or political symbols.",
    "meaning": "Imposes rigid ideology with absolute certainty; destroys dissent to maintain control.",
    "sourceUrl": "https://sfhelp.org/popIF/fanatic.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/fanatic.htm) — Provisional: description needs verification"
  },
  "guardian:Fantasizer or Dreamer": {
    "name": "Fantasizer or Dreamer",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/fantasizer-or-dreamer.png",
    "thumbnail": "/part-art/thumbnails/guardian/fantasizer-or-dreamer.png",
    "scene": "A figure reclines in a small teal boat whose golden sail turns into an impossible floating castle; imagined refuge above everyday water.",
    "meaning": "Escapes into elaborate fantasy worlds; denies reality through dissociation and magical thinking.",
    "sourceUrl": "https://sfhelp.org/popIF/fantasizer.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/fantasizer.htm) — Mapped from supplied summary"
  },
  "guardian:Flirt or Seducer": {
    "name": "Flirt or Seducer",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/flirt-or-seducer.png",
    "thumbnail": "/part-art/thumbnails/guardian/flirt-or-seducer.png",
    "scene": "A fully clothed adult figure casts a graceful golden ribbon outward like a beckoning invitation while standing behind a protective periwinkle screen; attraction used for reassurance, non-explicit.",
    "meaning": "Uses sexuality to gain power, validation, or safety; performs desirability.",
    "sourceUrl": "https://sfhelp.org/popIF/whore.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/whore.htm) — Provisional: description needs verification"
  },
  "guardian:Hermit or Loner or Recluse": {
    "name": "Hermit or Loner or Recluse",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/hermit-or-loner-or-recluse.png",
    "thumbnail": "/part-art/thumbnails/guardian/hermit-or-loner-or-recluse.png",
    "scene": "A small coral figure rests inside a rounded teal shell-house with a golden doorway only slightly open; solitude protects yet limits connection.",
    "meaning": "Withdraws from all social contact; isolates to avoid any relational risk.",
    "sourceUrl": "https://sfhelp.org/popIF/loner_recluse.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/loner_recluse.htm) — Provisional: description needs verification"
  },
  "guardian:Hypochondriac or Sick One": {
    "name": "Hypochondriac or Sick One",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/hypochondriac-or-sick-one.png",
    "thumbnail": "/part-art/thumbnails/guardian/hypochondriac-or-sick-one.png",
    "scene": "A figure listens intently through a broad golden stethoscope to a small ordinary leaf-shaped sensation on their chest; heightened health vigilance, not mockery.",
    "meaning": "Generates or amplifies physical symptoms to receive care and avoid demands.",
    "sourceUrl": "https://sfhelp.org/popIF/hypochondriac.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/hypochondriac.htm) — Provisional: description needs verification"
  },
  "guardian:Irresponsible One": {
    "name": "Irresponsible One",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/irresponsible-one.png",
    "thumbnail": "/part-art/thumbnails/guardian/irresponsible-one.png",
    "scene": "A figure releases a golden backpack onto a low bench and skips away while one untied strap trails back; escape from burdens and accountability.",
    "meaning": "Refuses accountability, blames others, avoids consequences; 'Not my fault.' Marked NEW.",
    "sourceUrl": "https://sfhelp.org/popIF/irresponsible.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/irresponsible.htm) — Provisional: description needs verification"
  },
  "guardian:Jealous or Envious One": {
    "name": "Jealous or Envious One",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/jealous-or-envious-one.png",
    "thumbnail": "/part-art/thumbnails/guardian/jealous-or-envious-one.png",
    "scene": "A figure looks over a teal garden wall toward a golden fruit while their own coral fruit rests unnoticed beside them; comparison and fear of lacking.",
    "meaning": "Resents others' possessions, qualities, luck; 'Why them, not me?'",
    "sourceUrl": "https://sfhelp.org/popIF/jealous_envious1.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/jealous_envious1.htm) — Provisional: description needs verification"
  },
  "guardian:Judge or bigot": {
    "name": "Judge or bigot",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/judge-or-bigot.png",
    "thumbnail": "/part-art/thumbnails/guardian/judge-or-bigot.png",
    "scene": "A figure sorts different organic shapes through one rigid golden square opening that cannot fit them all; narrow categories replacing understanding.",
    "meaning": "Condemns self and others by rigid moral categories; prejudice as protection. Marked NEW.",
    "sourceUrl": "https://sfhelp.org/popIF/judge.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/judge.htm) — Provisional: description needs verification"
  },
  "guardian:Liar or Spy or Secret Keeper": {
    "name": "Liar or Spy or Secret Keeper",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/liar-or-spy-or-secret-keeper.png",
    "thumbnail": "/part-art/thumbnails/guardian/liar-or-spy-or-secret-keeper.png",
    "scene": "A coral figure shelters a sealed golden box inside a folded periwinkle cloak, head turned toward a narrow window; concealment for protection.",
    "meaning": "Conceals truth, gathers intelligence, guards information; strategic deception.",
    "sourceUrl": "https://sfhelp.org/popIF/liar_con.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/liar_con.htm) — Mapped from supplied summary"
  },
  "guardian:Magician or Illusionist or Denier": {
    "name": "Magician or Illusionist or Denier",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/magician-or-illusionist-or-denier.png",
    "thumbnail": "/part-art/thumbnails/guardian/magician-or-illusionist-or-denier.png",
    "scene": "A figure draws a broad golden curtain across a visible crack in a teal wall; altered appearance hides what feels difficult to face.",
    "meaning": "Distorts reality: 'Problem? What problem?' Makes unacceptable truths disappear.",
    "sourceUrl": "https://sfhelp.org/popIF/magician.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/magician.htm) — Mapped from supplied summary"
  },
  "guardian:Nagger or Reminder": {
    "name": "Nagger or Reminder",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/nagger-or-reminder.png",
    "thumbnail": "/part-art/thumbnails/guardian/nagger-or-reminder.png",
    "scene": "A small golden woodpecker taps the same coral door marked by three simple concentric sound arcs; persistence seeking attention, no text.",
    "meaning": "Relentlessly points out obligations, errors, and duties; 'Don't forget, you should...'",
    "sourceUrl": "https://sfhelp.org/popIF/nagger.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/nagger.htm) — Provisional: description needs verification"
  },
  "guardian:Nihilist or Fatalist": {
    "name": "Nihilist or Fatalist",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/nihilist-or-fatalist.png",
    "thumbnail": "/part-art/thumbnails/guardian/nihilist-or-fatalist.png",
    "scene": "A figure sits beside a golden hourglass whose sand appears still, with an unused coral path extending quietly beside them; resignation and possibility.",
    "meaning": "Believes nothing matters, effort is futile; 'It's all pointless anyway.'",
    "sourceUrl": "https://sfhelp.org/popIF/fatalist_nihilist.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/fatalist_nihilist.htm) — Provisional: description needs verification"
  },
  "guardian:Obsesser": {
    "name": "Obsesser",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/obsesser.png",
    "thumbnail": "/part-art/thumbnails/guardian/obsesser.png",
    "scene": "A figure traces the same golden spiral groove repeatedly while several open coral paths remain outside the groove; attention held in a loop.",
    "meaning": "Loops on thoughts, images, or urges; cannot let go. Marked NEW.",
    "sourceUrl": "https://sfhelp.org/popIF/obssesser.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/obssesser.htm) — Provisional: description needs verification"
  },
  "guardian:People-Pleaser or Peacemaker": {
    "name": "People-Pleaser or Peacemaker",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/people-pleaser-or-peacemaker.png",
    "thumbnail": "/part-art/thumbnails/guardian/people-pleaser-or-peacemaker.png",
    "scene": "A figure stretches a golden cloth between two others, making a soft bridge while their own small coral seat remains empty; harmony at a personal cost.",
    "meaning": "Sacrifices own needs to appease others; 'Whatever you want.' Prevents conflict at all costs.",
    "sourceUrl": "https://sfhelp.org/popIF/pleaser.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/pleaser.htm) — Provisional: description needs verification"
  },
  "guardian:Perfectionist": {
    "name": "Perfectionist",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/perfectionist.png",
    "thumbnail": "/part-art/thumbnails/guardian/perfectionist.png",
    "scene": "A craftsperson polishes one tile while an unfinished bridge waits.",
    "meaning": "The wish to avoid criticism through flawlessness can delay completion and connection.",
    "sourceUrl": "https://sfhelp.org/popIF/perfectionist.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/perfectionist.htm) — Mapped from supplied summary"
  },
  "guardian:Predictor": {
    "name": "Predictor",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/predictor.png",
    "thumbnail": "/part-art/thumbnails/guardian/predictor.png",
    "scene": "A figure projects one remembered golden footprint forward into a repeated row before an unseen bend in the path; past experience extended into expectation.",
    "meaning": "Forecasts negative outcomes to prepare defenses; 'I knew this would happen.' Marked NEW.",
    "sourceUrl": "https://sfhelp.org/popIF/predictor.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/predictor.htm) — Provisional: description needs verification"
  },
  "guardian:Pretender or Phony or Politician": {
    "name": "Pretender or Phony or Politician",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/pretender-or-phony-or-politician.png",
    "thumbnail": "/part-art/thumbnails/guardian/pretender-or-phony-or-politician.png",
    "scene": "A figure wears a neatly fitted golden silhouette-panel before their coral torso while their own mismatched shape remains visible behind; managing appearance for acceptance.",
    "meaning": "Performs false self for approval; wears masks, hides authentic reactions.",
    "sourceUrl": "https://sfhelp.org/popIF/pretender.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/pretender.htm) — Provisional: description needs verification"
  },
  "guardian:Procrastinator or Evader": {
    "name": "Procrastinator or Evader",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/procrastinator-or-evader.png",
    "thumbnail": "/part-art/thumbnails/guardian/procrastinator-or-evader.png",
    "scene": "A figure rests beside a closed golden gate with its key already in their open hand, watching a periwinkle sundial shadow move; delaying exposure.",
    "meaning": "Delays action to avoid potential failure, judgment, or discomfort; 'Later.'",
    "sourceUrl": "https://sfhelp.org/popIF/procrastinator.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/procrastinator.htm) — Provisional: description needs verification"
  },
  "guardian:Rager (may be an inner child)": {
    "name": "Rager (may be an inner child)",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/rager-may-be-an-inner-child.png",
    "thumbnail": "/part-art/thumbnails/guardian/rager-may-be-an-inner-child.png",
    "scene": "A coral volcano releases three broad golden waves behind a strong teal boundary; fierce energy defending a small sheltered space, no destructive violence.",
    "meaning": "Weaponized rage; calculated destruction to control environment. Note: 'may be an inner child.'",
    "sourceUrl": "https://sfhelp.org/popIF/rageful_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/rageful_child.htm) — Mapped from supplied summary"
  },
  "guardian:Rationalizer or Explainer or Justifier": {
    "name": "Rationalizer or Explainer or Justifier",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/rationalizer-or-explainer-or-justifier.png",
    "thumbnail": "/part-art/thumbnails/guardian/rationalizer-or-explainer-or-justifier.png",
    "scene": "A figure builds a smooth golden explanatory arch over a crooked coral foundation; coherent story covering a difficult inconsistency.",
    "meaning": "Constructs logical-sounding excuses for behavior; makes unacceptable actions seem reasonable.",
    "sourceUrl": "https://sfhelp.org/popIF/rationalizer.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/rationalizer.htm) — Provisional: description needs verification"
  },
  "guardian:Rebel or Defiant One or Rule Breaker": {
    "name": "Rebel or Defiant One or Rule Breaker",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/rebel-or-defiant-one-or-rule-breaker.png",
    "thumbnail": "/part-art/thumbnails/guardian/rebel-or-defiant-one-or-rule-breaker.png",
    "scene": "An adult figure steps outside a rigid golden grid through one curved opening they have made; autonomy from imposed structure.",
    "meaning": "Systematically breaks rules and defies authority; 'You can't make me.'",
    "sourceUrl": "https://sfhelp.org/popIF/rebel.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/rebel.htm) — Mapped from supplied summary"
  },
  "guardian:Replayer or Repeater": {
    "name": "Replayer or Repeater",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/replayer-or-repeater.png",
    "thumbnail": "/part-art/thumbnails/guardian/replayer-or-repeater.png",
    "scene": "A figure turns a golden film reel whose broad ribbon loops back to the same small coral scene; recurring recollection, no detailed film frames.",
    "meaning": "Compulsively reenacts trauma scenarios; 'This time it'll be different.' Marked NEW.",
    "sourceUrl": "https://sfhelp.org/popIF/replayer.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/replayer.htm) — Provisional: description needs verification"
  },
  "guardian:Represser or Stuffer": {
    "name": "Represser or Stuffer",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/represser-or-stuffer.png",
    "thumbnail": "/part-art/thumbnails/guardian/represser-or-stuffer.png",
    "scene": "A figure presses soft periwinkle clouds into a golden chest whose lid bulges gently upward; unexpressed feelings kept out of awareness.",
    "meaning": "Pushes feelings and memories out of awareness; 'I don't feel that.' Marked NEW.",
    "sourceUrl": "https://sfhelp.org/popIF/represser.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/represser.htm) — Provisional: description needs verification"
  },
  "guardian:Righteous or Pious One": {
    "name": "Righteous or Pious One",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/righteous-or-pious-one.png",
    "thumbnail": "/part-art/thumbnails/guardian/righteous-or-pious-one.png",
    "scene": "A figure stands on a small golden pedestal holding an immaculate cloth above a messy coral ground; moral elevation shielding uncertainty, no religious emblems.",
    "meaning": "Claims moral superiority; judges others by rigid doctrinal standards.",
    "sourceUrl": "https://sfhelp.org/popIF/righteous.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/righteous.htm) — Provisional: description needs verification"
  },
  "guardian:Self-saboteur or Fail-er or Screw Up": {
    "name": "Self-saboteur or Fail-er or Screw Up",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/self-saboteur-or-fail-er-or-screw-up.png",
    "thumbnail": "/part-art/thumbnails/guardian/self-saboteur-or-fail-er-or-screw-up.png",
    "scene": "A figure's golden kite begins to rise while the same figure quietly anchors its string beneath their own foot; movement toward success and restraint coexist.",
    "meaning": "Undermines own success; 'If I fail on purpose, it hurts less.'",
    "sourceUrl": "https://sfhelp.org/popIF/saboteur.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/saboteur.htm) — Provisional: description needs verification"
  },
  "guardian:Skeptic or Doubter": {
    "name": "Skeptic or Doubter",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/skeptic-or-doubter.png",
    "thumbnail": "/part-art/thumbnails/guardian/skeptic-or-doubter.png",
    "scene": "One person stands with one foot in each of two separate boats drifting in different directions; doubt holds competing possibilities without committing.",
    "meaning": "Questions everything; 'Prove it.' Blocks trust and spontaneous action.",
    "sourceUrl": "https://sfhelp.org/popIF/skeptic_doubter.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/skeptic_doubter.htm) — Provisional: description needs verification"
  },
  "guardian:Slob or Apathetic-Lazy One": {
    "name": "Slob or Apathetic-Lazy One",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/slob-or-apathetic-lazy-one.png",
    "thumbnail": "/part-art/thumbnails/guardian/slob-or-apathetic-lazy-one.png",
    "scene": "A figure lies under a soft periwinkle cloud-quilt beside an unwound golden clockwork spring; low energy and disengagement, no filth or moral judgement.",
    "meaning": "Neglects self-care and environment; 'Why bother?' Passive resistance to demands.",
    "sourceUrl": "https://sfhelp.org/popIF/slob.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/slob.htm) — Provisional: description needs verification"
  },
  "guardian:Taskmaster or Overseer": {
    "name": "Taskmaster or Overseer",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/taskmaster-or-overseer.png",
    "thumbnail": "/part-art/thumbnails/guardian/taskmaster-or-overseer.png",
    "scene": "A figure winds an oversized golden clock while three small coral task blocks line up under its moving hand; relentless productivity pressure, no whip.",
    "meaning": "Drives relentless performance; 'Work harder, do more.' Internal slave driver.",
    "sourceUrl": "https://sfhelp.org/popIF/taskmaster.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/taskmaster.htm) — Provisional: description needs verification"
  },
  "guardian:Vagabond or Drifter or Bum": {
    "name": "Vagabond or Drifter or Bum",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/vagabond-or-drifter-or-bum.png",
    "thumbnail": "/part-art/thumbnails/guardian/vagabond-or-drifter-or-bum.png",
    "scene": "A small walking figure follows a golden meandering trail with a light bundle, passing several unchosen doorways; freedom and difficulty settling.",
    "meaning": "Rejects stability, commitment, and roots; 'I don't belong anywhere.'",
    "sourceUrl": "https://sfhelp.org/popIF/vagabond.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/vagabond.htm) — Provisional: description needs verification"
  },
  "guardian:Victim or Martyr or Loser": {
    "name": "Victim or Martyr or Loser",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/victim-or-martyr-or-loser.png",
    "thumbnail": "/part-art/thumbnails/guardian/victim-or-martyr-or-loser.png",
    "scene": "An adult figure carries a wide golden yoke with two baskets while an unoccupied support rests nearby; burden and difficulty receiving shared responsibility.",
    "meaning": "Identifies with powerlessness and suffering; 'Nothing I do matters, woe is me.'",
    "sourceUrl": "https://sfhelp.org/popIF/victim_martyr.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/victim_martyr.htm) — Mapped from supplied summary"
  },
  "guardian:Warrior or Amazon": {
    "name": "Warrior or Amazon",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/warrior-or-amazon.png",
    "thumbnail": "/part-art/thumbnails/guardian/warrior-or-amazon.png",
    "scene": "An adult with one biological leg and one prosthetic leg holds a shield and an open hand beside sheltered people; protective strength and calm boundaries. Disability is ordinary representation, not the symbolic problem.",
    "meaning": "Fights for survival and justice; disciplined aggression in service of protection.",
    "sourceUrl": "https://sfhelp.org/popIF/warrior.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/warrior.htm) — Provisional: description needs verification"
  },
  "guardian:Weirdo": {
    "name": "Weirdo",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/weirdo.png",
    "thumbnail": "/part-art/thumbnails/guardian/weirdo.png",
    "scene": "A uniquely shaped coral figure steps beyond a row of identical teal silhouette cutouts, wrapped in a bold golden irregular cloak; protective nonconformity without diagnostic imagery.",
    "meaning": "Embodies terrifying, chaotic, 'crazy' energies; scares self and others into compliance.",
    "sourceUrl": "https://sfhelp.org/popIF/psycho.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/psycho.htm) — Provisional: description needs verification"
  },
  "guardian:Whiner or Complainer": {
    "name": "Whiner or Complainer",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/whiner-or-complainer.png",
    "thumbnail": "/part-art/thumbnails/guardian/whiner-or-complainer.png",
    "scene": "A figure rings a golden handbell beside a tilted empty bowl; repeated expression asking unmet needs to be noticed, no mocking face.",
    "meaning": "Voices endless dissatisfaction; 'Nothing is right.' Signals distress without action.",
    "sourceUrl": "https://sfhelp.org/popIF/whiner_complainer.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/whiner_complainer.htm) — Provisional: description needs verification"
  },
  "guardian:Worrier or Cautious One": {
    "name": "Worrier or Cautious One",
    "group": "guardian",
    "icon": "/part-art/icons/guardian/worrier-or-cautious-one.png",
    "thumbnail": "/part-art/thumbnails/guardian/worrier-or-cautious-one.png",
    "scene": "A watchful figure shelters a golden core beneath curling clouds.",
    "meaning": "Anticipating danger expresses a protective intention, even when it sustains anxiety.",
    "sourceUrl": "https://sfhelp.org/popIF/worrier.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/worrier.htm) — Provisional: description needs verification"
  },
  "innerKid:Abandoned Child": {
    "name": "Abandoned Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/abandoned-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/abandoned-child.png",
    "scene": "A child holds a golden ribbon beside an open, empty doorway.",
    "meaning": "Longing for reliable connection remains present through absence and uncertainty.",
    "sourceUrl": "https://sfhelp.org/popIF/abandoned_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/abandoned_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Anxious or Scared or Worried Child": {
    "name": "Anxious or Scared or Worried Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/anxious-or-scared-or-worried-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/anxious-or-scared-or-worried-child.png",
    "scene": "A fully clothed child peers from beneath a broad periwinkle umbrella as three small golden uncertainty ripples approach; immediate fear seeking safety.",
    "meaning": "Anticipates danger and catastrophe; hypervigilant to threat cues.",
    "sourceUrl": "https://sfhelp.org/popIF/scared_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/scared_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Awed or Amazed Child": {
    "name": "Awed or Amazed Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/awed-or-amazed-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/awed-or-amazed-child.png",
    "scene": "A tiny child looks upward with open arms at an enormous golden nautilus-like shell opening across a teal sky; scale and wonder.",
    "meaning": "Experiences wonder, reverence, and openness to mystery; unguarded appreciation of beauty.",
    "sourceUrl": "https://sfhelp.org/popIF/awed_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/awed_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Bored Child": {
    "name": "Bored Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/bored-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/bored-child.png",
    "scene": "A child sits on a motionless golden swing above a flat teal ground, gaze toward a small unopened coral play-box; longing for engagement.",
    "meaning": "Feels listless, unstimulated, and empty; craves novelty and engagement.",
    "sourceUrl": "https://sfhelp.org/popIF/bored_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/bored_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Creative Child or Artist or Inventor": {
    "name": "Creative Child or Artist or Inventor",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/creative-child-or-artist-or-inventor.png",
    "thumbnail": "/part-art/thumbnails/innerKid/creative-child-or-artist-or-inventor.png",
    "scene": "A child paints one broad golden ribbon that leaves the page and becomes an imaginative coral bird; spontaneous creation.",
    "meaning": "Generates novel ideas and expressions free from adult logic; instinctive creativity and imagination.",
    "sourceUrl": "https://sfhelp.org/popIF/artist-creative.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/artist-creative.htm) — Mapped from supplied summary"
  },
  "innerKid:Curious Child or Explorer": {
    "name": "Curious Child or Explorer",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/curious-child-or-explorer.png",
    "thumbnail": "/part-art/thumbnails/innerKid/curious-child-or-explorer.png",
    "scene": "A crouching child reaches with wonder toward a golden sprout.",
    "meaning": "Open inquiry approaches what is unfamiliar through discovery rather than avoidance.",
    "sourceUrl": "https://sfhelp.org/popIF/curious_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/curious_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Defiant or Stubborn or Rebel": {
    "name": "Defiant or Stubborn or Rebel",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/defiant-or-stubborn-or-rebel.png",
    "thumbnail": "/part-art/thumbnails/innerKid/defiant-or-stubborn-or-rebel.png",
    "scene": "A small child plants both feet and holds an open palm against a giant softly curved golden pointing hand; a clear boundary and need for autonomy.",
    "meaning": "Resists control, demands autonomy; asserts 'no' against perceived oppression.",
    "sourceUrl": "https://sfhelp.org/popIF/rebel.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/rebel.htm) — Mapped from supplied summary"
  },
  "innerKid:Delighted or Excited child": {
    "name": "Delighted or Excited child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/delighted-or-excited-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/delighted-or-excited-child.png",
    "scene": "A child leaps through a broad golden splash from a shallow puddle, three simple coral droplets arcing upward; embodied joy.",
    "meaning": "Experiences unrestrained joy, enthusiasm, and anticipation; fully present in positive moments.",
    "sourceUrl": "https://sfhelp.org/popIF/delighted_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/delighted_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Entitled One": {
    "name": "Entitled One",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/entitled-one.png",
    "thumbnail": "/part-art/thumbnails/innerKid/entitled-one.png",
    "scene": "A child reaches for the largest golden slice on a round plate while several equal coral slices wait; urgent expectation of special provision, compassionate.",
    "meaning": "Provisional interpretation from the app part label; source description not matched.",
    "sourceUrl": "",
    "provisional": true,
    "sourceStatus": "Provisional: no matched source-map entry"
  },
  "innerKid:Friendly or Happy Child": {
    "name": "Friendly or Happy Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/friendly-or-happy-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/friendly-or-happy-child.png",
    "scene": "Two small children sit comfortably on opposite ends of a low golden bench with relaxed open space between; easy companionship.",
    "meaning": "Naturally sociable, content, and open; enjoys connection without agenda.",
    "sourceUrl": "https://sfhelp.org/popIF/friendly_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/friendly_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Friendly or Social or Playful Child": {
    "name": "Friendly or Social or Playful Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/friendly-or-social-or-playful-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/friendly-or-social-or-playful-child.png",
    "scene": "Three children pass one golden ball along a broad circular play path; mutual play and social reciprocity.",
    "meaning": "Engages others with ease, joy, and spontaneity; plays for play's sake.",
    "sourceUrl": "https://sfhelp.org/popIF/playful_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/playful_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Frustrated or Impatient Child": {
    "name": "Frustrated or Impatient Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/frustrated-or-impatient-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/frustrated-or-impatient-child.png",
    "scene": "A child tugs at a golden flower bud that remains closed while a broad periwinkle hourglass waits beside it; growth cannot be hurried.",
    "meaning": "Intolerant of delay, obstacles, and unmet wants; demands immediate gratification.",
    "sourceUrl": "https://sfhelp.org/popIF/frustrated_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/frustrated_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Grieving Child": {
    "name": "Grieving Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/grieving-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/grieving-child.png",
    "scene": "A child sits beside an empty golden bird nest, holding one fallen coral feather; love and absence, tender not frightening.",
    "meaning": "Provisional interpretation from the app part label; source description not matched.",
    "sourceUrl": "",
    "provisional": true,
    "sourceStatus": "Provisional: no matched source-map entry"
  },
  "innerKid:Guilty Child": {
    "name": "Guilty Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/guilty-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/guilty-child.png",
    "scene": "A child tries to repair a small tipped golden cup while carrying an oversized periwinkle responsibility sack; feeling responsible for a mistake.",
    "meaning": "Carries pervasive sense of wrongness; believes 'I am bad' for existing, feeling, or wanting.",
    "sourceUrl": "https://sfhelp.org/popIF/guilty_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/guilty_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Helpless Child or Victim": {
    "name": "Helpless Child or Victim",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/helpless-child-or-victim.png",
    "thumbnail": "/part-art/thumbnails/innerKid/helpless-child-or-victim.png",
    "scene": "A child stands before broad golden stairs whose first step is too high; one hand reaches toward a small nearby movable coral stool; need for help and agency.",
    "meaning": "Feels powerless, incapable, and at mercy of circumstances; expects rescue.",
    "sourceUrl": "https://sfhelp.org/popIF/victim_martyr.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/victim_martyr.htm) — Mapped from supplied summary"
  },
  "innerKid:Hurt or Resentful Child": {
    "name": "Hurt or Resentful Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/hurt-or-resentful-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/hurt-or-resentful-child.png",
    "scene": "A child shelters a golden bandaged heart-shaped stone behind a low curved teal wall; pain seeking recognition while guarding against re-injury.",
    "meaning": "Holds grievances, betrayals, and emotional wounds; 'You hurt me and I won't forget.'",
    "sourceUrl": "https://sfhelp.org/popIF/hurt_resentful_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/hurt_resentful_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Hyper Child": {
    "name": "Hyper Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/hyper-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/hyper-child.png",
    "scene": "A child springs between three broad golden stepping discs with a looping periwinkle motion ribbon; restless energy seeking regulation.",
    "meaning": "Excessive energy, impulsivity, and difficulty settling; 'NEW' per Gerlach roster.",
    "sourceUrl": "https://sfhelp.org/popIF/hyper_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/hyper_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Hypervigilant Protector": {
    "name": "Hypervigilant Protector",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/hypervigilant-protector.png",
    "thumbnail": "/part-art/thumbnails/innerKid/hypervigilant-protector.png",
    "scene": "A small youthful lookout holds a golden lantern at the edge of a teal tent with several wide eye-like windows around it; constant scanning to keep vulnerable life safe.",
    "meaning": "Provisional interpretation from the app part label; source description not matched.",
    "sourceUrl": "",
    "provisional": true,
    "sourceStatus": "Provisional: no matched source-map entry"
  },
  "innerKid:Innocent or Naive (Trusting) Child": {
    "name": "Innocent or Naive (Trusting) Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/innocent-or-naive-trusting-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/innocent-or-naive-trusting-child.png",
    "scene": "A child extends an open palm toward a tiny golden bird that lands freely, broad welcoming coral sky; unguarded trust.",
    "meaning": "Approaches world with openness and trust; lacks defensive cynicism.",
    "sourceUrl": "https://sfhelp.org/popIF/naive_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/naive_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Joker or Clown or Trickster or Imp": {
    "name": "Joker or Clown or Trickster or Imp",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/joker-or-clown-or-trickster-or-imp.png",
    "thumbnail": "/part-art/thumbnails/innerKid/joker-or-clown-or-trickster-or-imp.png",
    "scene": "A child flips a golden crown upside down to use it as a little boat in a teal puddle; playful reversal, mischief and possibility.",
    "meaning": "Uses humor, mischief, and absurdity to deflect tension and gain attention.",
    "sourceUrl": "https://sfhelp.org/popIF/entertainer.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/entertainer.htm) — Mapped from supplied summary"
  },
  "innerKid:Lonely or Needy Child": {
    "name": "Lonely or Needy Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/lonely-or-needy-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/lonely-or-needy-child.png",
    "scene": "A child on a small coral island reaches toward another island through a golden unconnected bridge segment; longing for present connection, no door or ribbon.",
    "meaning": "Aches for connection and attention; feels empty without others' presence.",
    "sourceUrl": "https://sfhelp.org/popIF/needy_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/needy_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Lost or Orphan Child": {
    "name": "Lost or Orphan Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/lost-or-orphan-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/lost-or-orphan-child.png",
    "scene": "A child stands at three broad golden branching paths beneath an oversized teal forest canopy, holding a small unmarked map upside down; disorientation and search for belonging.",
    "meaning": "Feels unseen, unknown, and without belonging; 'No one knows I'm here.'",
    "sourceUrl": "https://sfhelp.org/popIF/lost_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/lost_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Loving or Loyal Child": {
    "name": "Loving or Loyal Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/loving-or-loyal-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/loving-or-loyal-child.png",
    "scene": "A child carefully tends a golden ember in a small teal hearth while another figure's coral coat hangs nearby; enduring attachment and care, no seed.",
    "meaning": "Offers unconditional affection and devotion; seeks reciprocal bond.",
    "sourceUrl": "https://sfhelp.org/popIF/loving_child.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/loving_child.htm) — Provisional: description needs verification"
  },
  "innerKid:Overwhelmed or Paralyzed Child": {
    "name": "Overwhelmed or Paralyzed Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/overwhelmed-or-paralyzed-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/overwhelmed-or-paralyzed-child.png",
    "scene": "A small child sits still under a cascade of three oversized periwinkle folded-paper shapes, golden ground barely visible; too much arriving at once.",
    "meaning": "Freezes under excessive demand or stimulation; 'I can't handle this.' Marked NEW.",
    "sourceUrl": "https://sfhelp.org/popIF/overwhelmed.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/overwhelmed.htm) — Mapped from supplied summary"
  },
  "innerKid:Rageful or Aggressive Child": {
    "name": "Rageful or Aggressive Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/rageful-or-aggressive-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/rageful-or-aggressive-child.png",
    "scene": "A child stamps one foot and releases a broad golden thunderbolt-shaped ribbon into an empty teal sky; anger expressing an urgent boundary, no targets or harm.",
    "meaning": "Expresses raw fury and destructive impulses; 'I'll destroy what hurts me.'",
    "sourceUrl": "https://sfhelp.org/popIF/rageful_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/rageful_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Resilient Warrior": {
    "name": "Resilient Warrior",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/resilient-warrior.png",
    "thumbnail": "/part-art/thumbnails/innerKid/resilient-warrior.png",
    "scene": "A child crosses a shallow stream on a fallen golden branch, carrying a small repaired coral backpack; courage and adaptation after difficulty.",
    "meaning": "Provisional interpretation from the app part label; source description not matched.",
    "sourceUrl": "",
    "provisional": true,
    "sourceStatus": "Provisional: no matched source-map entry"
  },
  "innerKid:Responsible Child or Little Adult": {
    "name": "Responsible Child or Little Adult",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/responsible-child-or-little-adult.png",
    "thumbnail": "/part-art/thumbnails/innerKid/responsible-child-or-little-adult.png",
    "scene": "A child wears an oversized golden adult coat whose long sleeves hold a large teal house-shaped burden; maturity demanded too early.",
    "meaning": "Prematurely takes on adult roles, cares for others, suppresses own childhood needs.",
    "sourceUrl": "https://sfhelp.org/popIF/ltl_adult.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/ltl_adult.htm) — Mapped from supplied summary"
  },
  "innerKid:Selfish or Entitled Child": {
    "name": "Selfish or Entitled Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/selfish-or-entitled-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/selfish-or-entitled-child.png",
    "scene": "A child wraps both arms around a pile of three golden play blocks behind a curved teal boundary, one coral open hand outside; holding on to ensure enough.",
    "meaning": "Demands own way without regard for others; 'I deserve it all.' Marked NEW.",
    "sourceUrl": "https://sfhelp.org/popIF/selfish_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/selfish_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Sensual or Sexual One (often a teen)": {
    "name": "Sensual or Sexual One (often a teen)",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/sensual-or-sexual-one-often-a-teen.png",
    "thumbnail": "/part-art/thumbnails/innerKid/sensual-or-sexual-one-often-a-teen.png",
    "scene": "A golden ribbon flows through a coral wave while periwinkle ripples expand; tactile awareness, sensitivity, and aliveness.",
    "meaning": "Expresses sexuality, sensuality, and romantic longing; often manifests as teen energy.",
    "sourceUrl": "https://sfhelp.org/popIF/sexual1.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/sexual1.htm) — Mapped from supplied summary"
  },
  "innerKid:Shamed Child": {
    "name": "Shamed Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/shamed-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/shamed-child.png",
    "scene": "A fully clothed child hides behind a large periwinkle cloak while one golden inner patch remains visible at the chest; fear of being seen, inherent worth not extinguished.",
    "meaning": "Feels fundamentally flawed, exposed, and unworthy; 'There is something wrong with me.'",
    "sourceUrl": "https://sfhelp.org/popIF/shamed_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/shamed_child.htm) — Mapped from supplied summary"
  },
  "innerKid:Sly or Dishonest Child": {
    "name": "Sly or Dishonest Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/sly-or-dishonest-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/sly-or-dishonest-child.png",
    "scene": "A small child hides one golden marble behind their back while offering a coral decoy pebble; concealment seeking safety or avoiding punishment, not evil.",
    "meaning": "Uses deception, manipulation, and secrecy to navigate unsafe environments.",
    "sourceUrl": "https://sfhelp.org/popIF/liar_con.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/liar_con.htm) — Mapped from supplied summary"
  },
  "innerKid:Worried Child": {
    "name": "Worried Child",
    "group": "innerKid",
    "icon": "/part-art/icons/innerKid/worried-child.png",
    "thumbnail": "/part-art/thumbnails/innerKid/worried-child.png",
    "scene": "A child at bedtime arranges three golden toy houses into an endlessly checking row under a periwinkle moon; anticipatory thoughts unlike immediate scared-child umbrella.",
    "meaning": "Anticipates danger and catastrophe; hypervigilant to threat cues.",
    "sourceUrl": "https://sfhelp.org/popIF/scared_child.htm",
    "provisional": false,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/scared_child.htm) — Mapped from supplied summary"
  },
  "spiritual:Spiritual One (Higher-Power liaison)": {
    "name": "Spiritual One (Higher-Power liaison)",
    "group": "spiritual",
    "icon": "/part-art/icons/spiritual/spiritual-one-higher-power-liaison.png",
    "thumbnail": "/part-art/thumbnails/spiritual/spiritual-one-higher-power-liaison.png",
    "scene": "A small calm figure stands where a golden stream joins a vast teal sea, broad periwinkle sky arch connecting above; belonging to something larger, no prescribed deity or religious emblem.",
    "meaning": "Connects to Higher Power or spiritual dimension; provides transcendent perspective and guidance.",
    "sourceUrl": "https://sfhelp.org/popIF/spiritual1.htm",
    "provisional": true,
    "sourceStatus": "[Source](https://sfhelp.org/popIF/spiritual1.htm) — Provisional: description needs verification"
  }
};

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

const partArtByNormalizedName: Record<string, PartArt> = Object.values(
  partArtByName
).reduce<Record<string, PartArt>>((lookup, art) => {
  lookup[`${art.group}:${normalizeName(art.name)}`] = art;
  return lookup;
}, {});

export function getPartArt(
  name: string,
  group: PartGroup
): PartArt | undefined {
  return (
    partArtByName[`${group}:${name}`] ??
    partArtByNormalizedName[`${group}:${normalizeName(name)}`]
  );
}

export const partArt = Object.values(partArtByName);

// Body region SVG paths and metadata for InnerHarmony.
// All paths use the same 500 x 600 coordinate system.
// Render with <svg viewBox="0 0 500 600">.

export interface BodyRegion {
  label: string;
  path: string;
}

export interface BodyRegions {
  [key: string]: BodyRegion;
}

// The outline is shared by front and back views. Regions are intentionally
// separate hit targets; render the silhouette first and regions above it.
export const bodySilhouettePath = `
M250 20
C230 20 218 36 218 58 C218 76 226 90 238 98
L238 110 C227 116 211 118 195 122
C174 127 163 143 158 169 L143 249
C140 263 144 275 152 279 C161 283 169 277 172 265
L187 199 L187 265 C185 293 183 314 181 338
C178 356 183 372 195 381
L193 467 L188 545
C184 558 178 570 180 578 C182 586 212 588 223 582
C228 578 226 569 224 557 L235 467 L250 388
L265 467 L276 557 C274 569 272 578 277 582
C288 588 318 586 320 578 C322 570 316 558 312 545
L307 467 L305 381 C317 372 322 356 319 338
C317 314 315 293 313 265 L313 199
L328 265 C331 277 339 283 348 279
C356 275 360 263 357 249 L342 169
C337 143 326 127 305 122 C289 118 273 116 262 110
L262 98 C274 90 282 76 282 58
C282 36 270 20 250 20 Z`;

// Reusable bilateral regions; each path is one or more closed subpaths.
const shoulderPath = 'M195 122 C180 125 167 136 161 157 L187 168 L214 133 Z M305 122 C320 125 333 136 339 157 L313 168 L286 133 Z';
const armPath = 'M161 157 L143 249 C140 263 144 275 152 279 C161 283 169 277 172 265 L187 199 L187 168 Z M339 157 L357 249 C360 263 356 275 348 279 C339 283 331 277 328 265 L313 199 L313 168 Z';
const upperArmPath = 'M161 157 L151 211 L177 221 L187 199 L187 168 Z M339 157 L349 211 L323 221 L313 199 L313 168 Z';
const forearmPath = 'M151 211 L143 249 C142 256 143 262 146 267 L169 263 L177 221 Z M349 211 L357 249 C358 256 357 262 354 267 L331 263 L323 221 Z';
const handPath = 'M146 267 C149 281 166 284 172 265 L169 263 Z M354 267 C351 281 334 284 328 265 L331 263 Z';
const hipsPath = 'M187 313 L313 313 L319 338 C322 356 317 372 305 381 L250 388 L195 381 C183 372 178 356 181 338 Z';
const thighsPath = 'M195 381 L250 388 L235 467 L193 467 Z M250 388 L305 381 L307 467 L265 467 Z';
const kneesPath = 'M193 467 L235 467 L231 492 L191 492 Z M265 467 L307 467 L309 492 L269 492 Z';
const calvesPath = 'M191 492 L231 492 L224 557 L188 545 Z M269 492 L309 492 L312 545 L276 557 Z';
const feetPath = 'M188 545 L224 557 C226 569 228 578 223 582 C212 588 182 586 180 578 C178 570 184 558 188 545 Z M312 545 L276 557 C274 569 272 578 277 582 C288 588 318 586 320 578 C322 570 316 558 312 545 Z';
const legsPath = `${thighsPath} ${kneesPath} ${calvesPath} ${feetPath}`;
const neckPath = 'M238 98 L238 110 C244 118 256 118 262 110 L262 98 Z';
const headPath = 'M250 20 C230 20 218 36 218 58 C218 78 231 99 250 101 C269 99 282 78 282 58 C282 36 270 20 250 20 Z';
const spinePath = 'M247 132 Q250 128 253 132 L253 346 Q250 355 247 346 Z';

export const bodyRegionsFront: BodyRegions = {
  head: { label: 'Head', path: headPath },
  forehead: { label: 'Forehead', path: 'M224 39 Q250 20 276 39 L276 56 Q250 51 224 56 Z' },
  eyes: { label: 'Eyes', path: 'M223 56 Q250 51 277 56 L275 70 Q250 75 225 70 Z' },
  jaw: { label: 'Jaw', path: 'M225 70 Q250 75 275 70 C271 87 261 99 250 101 C239 99 229 87 225 70 Z' },
  neck: { label: 'Neck', path: neckPath },
  shoulders: { label: 'Shoulders', path: shoulderPath },
  heart: { label: 'Heart', path: 'M255 172 C251 163 238 163 235 174 C231 187 246 197 255 207 C264 197 279 187 275 174 C272 163 259 163 255 172 Z' },
  chest: { label: 'Chest', path: 'M214 133 L286 133 L313 168 L313 220 L187 220 L187 168 Z' },
  arms: { label: 'Arms', path: armPath },
  upperArm: { label: 'Upper Arm', path: upperArmPath },
  forearm: { label: 'Forearm', path: forearmPath },
  hands: { label: 'Hands', path: handPath },
  abdomen: { label: 'Abdomen', path: 'M187 220 L313 220 L313 265 L313 313 L187 313 L187 265 Z' },
  hips: { label: 'Hips / Pelvis', path: hipsPath },
  legs: { label: 'Legs', path: legsPath },
  thighs: { label: 'Thighs', path: thighsPath },
  knees: { label: 'Knees', path: kneesPath },
  calves: { label: 'Calves', path: calvesPath },
  feet: { label: 'Feet', path: feetPath },
};

export const bodyRegionsBack: BodyRegions = {
  head: { label: 'Back of Head', path: headPath },
  neck: { label: 'Neck', path: neckPath },
  upperBack: { label: 'Upper Back', path: 'M214 133 L286 133 L313 168 L313 244 L187 244 L187 168 Z' },
  shoulders: { label: 'Shoulders', path: shoulderPath },
  spine: { label: 'Spine', path: spinePath },
  lowerBack: { label: 'Lower Back', path: 'M187 244 L313 244 L313 313 L187 313 Z' },
  arms: { label: 'Arms', path: armPath },
  hands: { label: 'Hands', path: handPath },
  hips: { label: 'Hips / Pelvis', path: hipsPath },
  legs: { label: 'Legs', path: legsPath },
  thighs: { label: 'Thighs', path: thighsPath },
  knees: { label: 'Knees', path: kneesPath },
  calves: { label: 'Calves', path: calvesPath },
  feet: { label: 'Feet', path: feetPath },
};

export const bodyPartCatalog = [
  {
    "key": "pelvic_floor",
    "label": "Pelvic Floor Muscles",
    "region": "Pelvis",
    "emoji": "🍑"
  },
  {
    "key": "right_temple",
    "label": "Right Temple",
    "region": "Head",
    "emoji": "🗣"
  },
  {
    "key": "right_knee",
    "label": "Right Knee",
    "region": "Limbs",
    "emoji": "🧎"
  },
  {
    "key": "right_ankle",
    "label": "Right Ankle",
    "region": "Limbs",
    "emoji": "🦶"
  },
  {
    "key": "right_thigh",
    "label": "Right Thigh",
    "region": "Limbs",
    "emoji": "🦵"
  },
  {
    "key": "whole_body",
    "label": "Whole Body",
    "region": "Overall",
    "emoji": "🧘"
  },
  {
    "key": "right_shoulder",
    "label": "Right Shoulder",
    "region": "Torso",
    "emoji": "💪"
  },
  {
    "key": "skin",
    "label": "Skin",
    "region": "Overall",
    "emoji": "🧴"
  },
  {
    "key": "tongue",
    "label": "Tongue",
    "region": "Head",
    "emoji": "👅"
  },
  {
    "key": "back_of_head",
    "label": "Back of Head",
    "region": "Head",
    "emoji": "🦲"
  },
  {
    "key": "lower_pelvis",
    "label": "Lower Pelvis",
    "region": "Pelvis",
    "emoji": "🫃"
  },
  {
    "key": "heart",
    "label": "Heart",
    "region": "Torso",
    "emoji": "🫀"
  },
  {
    "key": "left_eye",
    "label": "Left Eye",
    "region": "Eyes",
    "emoji": "👁"
  },
  {
    "key": "arms",
    "label": "Arms",
    "region": "Limbs",
    "emoji": "💪"
  },
  {
    "key": "left_knee",
    "label": "Left Knee",
    "region": "Limbs",
    "emoji": "🧎"
  },
  {
    "key": "thighs",
    "label": "Thighs",
    "region": "Limbs",
    "emoji": "🦵"
  },
  {
    "key": "back_of_neck",
    "label": "Back of Neck",
    "region": "Neck",
    "emoji": "🧘"
  },
  {
    "key": "left_foot",
    "label": "Left Foot",
    "region": "Limbs",
    "emoji": "🦶"
  },
  {
    "key": "left_thigh",
    "label": "Left Thigh",
    "region": "Limbs",
    "emoji": "🦵"
  },
  {
    "key": "thumbs",
    "label": "Thumbs",
    "region": "Limbs",
    "emoji": "👍"
  },
  {
    "key": "heels",
    "label": "Heels",
    "region": "Limbs",
    "emoji": "👠"
  },
  {
    "key": "lips",
    "label": "Lips",
    "region": "Head",
    "emoji": "👄"
  },
  {
    "key": "arches_of_feet",
    "label": "Arches of Feet",
    "region": "Limbs",
    "emoji": "🦶"
  },
  {
    "key": "sides_of_neck",
    "label": "Sides of Neck",
    "region": "Neck",
    "emoji": "💆"
  },
  {
    "key": "right_arm",
    "label": "Right Arm",
    "region": "Limbs",
    "emoji": "🦾"
  },
  {
    "key": "hip_flexors",
    "label": "Hip Flexors",
    "region": "Pelvis",
    "emoji": "🦵"
  },
  {
    "key": "left_calf",
    "label": "Left Calf",
    "region": "Limbs",
    "emoji": "🦵"
  },
  {
    "key": "eye_muscles",
    "label": "Muscles Around Eyes",
    "region": "Eyes",
    "emoji": "😌"
  },
  {
    "key": "right_wrist",
    "label": "Right Wrist",
    "region": "Limbs",
    "emoji": "⌚"
  },
  {
    "key": "toes",
    "label": "Toes",
    "region": "Limbs",
    "emoji": "🦶"
  },
  {
    "key": "right_eye",
    "label": "Right Eye",
    "region": "Eyes",
    "emoji": "👁"
  },
  {
    "key": "ribs",
    "label": "Ribs",
    "region": "Torso",
    "emoji": "🩻"
  },
  {
    "key": "diaphragm",
    "label": "Diaphragm",
    "region": "Torso",
    "emoji": "🫁"
  },
  {
    "key": "lower_jaw",
    "label": "Lower Jaw",
    "region": "Head",
    "emoji": "😬"
  },
  {
    "key": "forearms",
    "label": "Forearms",
    "region": "Limbs",
    "emoji": "💪"
  },
  {
    "key": "right_elbow",
    "label": "Right Elbow",
    "region": "Limbs",
    "emoji": "💪"
  },
  {
    "key": "left_ankle",
    "label": "Left Ankle",
    "region": "Limbs",
    "emoji": "🦶"
  },
  {
    "key": "knees",
    "label": "Knees",
    "region": "Limbs",
    "emoji": "🧎"
  },
  {
    "key": "left_hand",
    "label": "Left Hand",
    "region": "Limbs",
    "emoji": "🤚"
  },
  {
    "key": "mid_back",
    "label": "Mid Back",
    "region": "Torso",
    "emoji": "🐫"
  },
  {
    "key": "tailbone",
    "label": "Tailbone",
    "region": "Pelvis",
    "emoji": "🦴"
  },
  {
    "key": "solar_plexus",
    "label": "Solar Plexus (Mid-Upper Stomach)",
    "region": "Torso",
    "emoji": "☀️"
  },
  {
    "key": "left_ear",
    "label": "Left Ear",
    "region": "Head",
    "emoji": "👂"
  },
  {
    "key": "left_arm",
    "label": "Left Arm",
    "region": "Limbs",
    "emoji": "🦾"
  },
  {
    "key": "right_calf",
    "label": "Right Calf",
    "region": "Limbs",
    "emoji": "🦵"
  },
  {
    "key": "face",
    "label": "Face",
    "region": "Head",
    "emoji": "😊"
  },
  {
    "key": "palms",
    "label": "Palms",
    "region": "Limbs",
    "emoji": "🤲"
  },
  {
    "key": "fingers",
    "label": "Fingers",
    "region": "Limbs",
    "emoji": "🖐"
  },
  {
    "key": "shoulders",
    "label": "Shoulders",
    "region": "Torso",
    "emoji": "🤷"
  },
  {
    "key": "shins",
    "label": "Shins",
    "region": "Limbs",
    "emoji": "🦴"
  },
  {
    "key": "left_wrist",
    "label": "Left Wrist",
    "region": "Limbs",
    "emoji": "⌚"
  },
  {
    "key": "nose",
    "label": "Nose",
    "region": "Head",
    "emoji": "👃"
  },
  {
    "key": "entire_body",
    "label": "Entire Body",
    "region": "Overall",
    "emoji": "🧍"
  },
  {
    "key": "right_eyebrow",
    "label": "Right Eyebrow",
    "region": "Head",
    "emoji": "🤨"
  },
  {
    "key": "eyes",
    "label": "Eyes",
    "region": "Eyes",
    "emoji": "👀"
  },
  {
    "key": "rib_muscles",
    "label": "Muscles Between Ribs",
    "region": "Torso",
    "emoji": "💪"
  },
  {
    "key": "spine",
    "label": "Spine",
    "region": "Torso",
    "emoji": "⚕️"
  },
  {
    "key": "right_ear",
    "label": "Right Ear",
    "region": "Head",
    "emoji": "👂"
  },
  {
    "key": "lower_stomach",
    "label": "Lower Stomach",
    "region": "Abdomen",
    "emoji": "🫄"
  },
  {
    "key": "right_foot",
    "label": "Right Foot",
    "region": "Limbs",
    "emoji": "🦶"
  },
  {
    "key": "psoas",
    "label": "Psoas",
    "region": "Pelvis",
    "emoji": "💪"
  },
  {
    "key": "navel",
    "label": "Navel",
    "region": "Abdomen",
    "emoji": "🔘"
  },
  {
    "key": "chest",
    "label": "Chest",
    "region": "Torso",
    "emoji": "🩱"
  },
  {
    "key": "collarbone",
    "label": "Collarbone",
    "region": "Torso",
    "emoji": "🦴"
  },
  {
    "key": "all_over",
    "label": "All Over",
    "region": "Overall",
    "emoji": "⚡"
  },
  {
    "key": "teeth",
    "label": "Teeth",
    "region": "Head",
    "emoji": "🦷"
  },
  {
    "key": "upper_back",
    "label": "Upper Back",
    "region": "Torso",
    "emoji": "⬆️"
  },
  {
    "key": "sides_of_belly",
    "label": "Sides of Belly",
    "region": "Abdomen",
    "emoji": "🤸"
  },
  {
    "key": "cheeks",
    "label": "Cheeks",
    "region": "Head",
    "emoji": "😊"
  },
  {
    "key": "right_hand",
    "label": "Right Hand",
    "region": "Limbs",
    "emoji": "🤚"
  },
  {
    "key": "feet",
    "label": "Feet",
    "region": "Limbs",
    "emoji": "🐾"
  },
  {
    "key": "hands",
    "label": "Hands",
    "region": "Limbs",
    "emoji": "🙌"
  },
  {
    "key": "upper_stomach",
    "label": "Upper Stomach",
    "region": "Abdomen",
    "emoji": "🫃"
  },
  {
    "key": "upper_jaw",
    "label": "Upper Jaw",
    "region": "Head",
    "emoji": "😮"
  },
  {
    "key": "shoulder_blades",
    "label": "Shoulder Blades",
    "region": "Torso",
    "emoji": "🦴"
  },
  {
    "key": "scalp",
    "label": "Scalp",
    "region": "Head",
    "emoji": "💆"
  },
  {
    "key": "left_hip",
    "label": "Left Hip",
    "region": "Pelvis",
    "emoji": "🕺"
  },
  {
    "key": "left_temple",
    "label": "Left Temple",
    "region": "Head",
    "emoji": "👤"
  },
  {
    "key": "left_shoulder",
    "label": "Left Shoulder",
    "region": "Torso",
    "emoji": "💪"
  },
  {
    "key": "ankles",
    "label": "Ankles",
    "region": "Limbs",
    "emoji": "🦶"
  },
  {
    "key": "hips",
    "label": "Hips",
    "region": "Pelvis",
    "emoji": "🤸‍♂️"
  },
  {
    "key": "groin",
    "label": "Groin",
    "region": "Pelvis",
    "emoji": "🦵"
  },
  {
    "key": "neck",
    "label": "Neck",
    "region": "Neck",
    "emoji": "📿"
  },
  {
    "key": "belly",
    "label": "Belly",
    "region": "Abdomen",
    "emoji": "🤰"
  },
  {
    "key": "intestines",
    "label": "Intestines",
    "region": "Abdomen",
    "emoji": "🍤"
  },
  {
    "key": "lower_back",
    "label": "Lower Back",
    "region": "Torso",
    "emoji": "⬇️"
  },
  {
    "key": "forehead",
    "label": "Forehead",
    "region": "Head",
    "emoji": "🤯"
  },
  {
    "key": "right_hip",
    "label": "Right Hip",
    "region": "Pelvis",
    "emoji": "🕺"
  },
  {
    "key": "calves",
    "label": "Calves",
    "region": "Limbs",
    "emoji": "🦵"
  },
  {
    "key": "sinuses",
    "label": "Sinuses",
    "region": "Head",
    "emoji": "🤧"
  },
  {
    "key": "left_eyebrow",
    "label": "Left Eyebrow",
    "region": "Head",
    "emoji": "🤔"
  },
  {
    "key": "throat",
    "label": "Throat",
    "region": "Head",
    "emoji": "🧣"
  },
  {
    "key": "glutes",
    "label": "Glutes",
    "region": "Pelvis",
    "emoji": "🩲"
  },
  {
    "key": "left_elbow",
    "label": "Left Elbow",
    "region": "Limbs",
    "emoji": "💪"
  },
  {
    "key": "eyelids",
    "label": "Eyelids",
    "region": "Eyes",
    "emoji": "😑"
  }
] as const;

export const bodyPartMarkers: Record<string, {x:number;y:number;view:"front"|"back"|"both"}> = {
  "left_eye": {
    "x": 238,
    "y": 63,
    "view": "front"
  },
  "right_eye": {
    "x": 262,
    "y": 63,
    "view": "front"
  },
  "left_eyebrow": {
    "x": 238,
    "y": 54,
    "view": "front"
  },
  "right_eyebrow": {
    "x": 262,
    "y": 54,
    "view": "front"
  },
  "left_temple": {
    "x": 224,
    "y": 59,
    "view": "front"
  },
  "right_temple": {
    "x": 276,
    "y": 59,
    "view": "front"
  },
  "left_ear": {
    "x": 218,
    "y": 70,
    "view": "front"
  },
  "right_ear": {
    "x": 282,
    "y": 70,
    "view": "front"
  },
  "nose": {
    "x": 250,
    "y": 73,
    "view": "front"
  },
  "lips": {
    "x": 250,
    "y": 85,
    "view": "front"
  },
  "tongue": {
    "x": 250,
    "y": 88,
    "view": "front"
  },
  "teeth": {
    "x": 250,
    "y": 83,
    "view": "front"
  },
  "upper_jaw": {
    "x": 250,
    "y": 79,
    "view": "front"
  },
  "lower_jaw": {
    "x": 250,
    "y": 93,
    "view": "front"
  },
  "cheeks": {
    "x": 232,
    "y": 78,
    "view": "front"
  },
  "sinuses": {
    "x": 250,
    "y": 65,
    "view": "front"
  },
  "eye_muscles": {
    "x": 250,
    "y": 61,
    "view": "front"
  },
  "eyelids": {
    "x": 250,
    "y": 66,
    "view": "front"
  },
  "scalp": {
    "x": 250,
    "y": 29,
    "view": "both"
  },
  "face": {
    "x": 250,
    "y": 77,
    "view": "front"
  },
  "throat": {
    "x": 250,
    "y": 113,
    "view": "front"
  },
  "sides_of_neck": {
    "x": 238,
    "y": 109,
    "view": "both"
  },
  "collarbone": {
    "x": 250,
    "y": 136,
    "view": "front"
  },
  "left_shoulder": {
    "x": 188,
    "y": 149,
    "view": "both"
  },
  "right_shoulder": {
    "x": 312,
    "y": 149,
    "view": "both"
  },
  "ribs": {
    "x": 222,
    "y": 192,
    "view": "front"
  },
  "rib_muscles": {
    "x": 286,
    "y": 191,
    "view": "front"
  },
  "diaphragm": {
    "x": 250,
    "y": 219,
    "view": "front"
  },
  "solar_plexus": {
    "x": 250,
    "y": 231,
    "view": "front"
  },
  "upper_stomach": {
    "x": 250,
    "y": 248,
    "view": "front"
  },
  "lower_stomach": {
    "x": 250,
    "y": 290,
    "view": "front"
  },
  "navel": {
    "x": 250,
    "y": 274,
    "view": "front"
  },
  "belly": {
    "x": 275,
    "y": 276,
    "view": "front"
  },
  "intestines": {
    "x": 250,
    "y": 302,
    "view": "front"
  },
  "sides_of_belly": {
    "x": 303,
    "y": 271,
    "view": "front"
  },
  "left_hip": {
    "x": 207,
    "y": 347,
    "view": "both"
  },
  "right_hip": {
    "x": 293,
    "y": 347,
    "view": "both"
  },
  "hip_flexors": {
    "x": 250,
    "y": 365,
    "view": "front"
  },
  "psoas": {
    "x": 240,
    "y": 350,
    "view": "front"
  },
  "groin": {
    "x": 250,
    "y": 378,
    "view": "front"
  },
  "lower_pelvis": {
    "x": 250,
    "y": 368,
    "view": "front"
  },
  "pelvic_floor": {
    "x": 250,
    "y": 382,
    "view": "front"
  },
  "left_arm": {
    "x": 167,
    "y": 191,
    "view": "both"
  },
  "right_arm": {
    "x": 333,
    "y": 191,
    "view": "both"
  },
  "left_elbow": {
    "x": 151,
    "y": 221,
    "view": "both"
  },
  "right_elbow": {
    "x": 349,
    "y": 221,
    "view": "both"
  },
  "left_wrist": {
    "x": 152,
    "y": 266,
    "view": "both"
  },
  "right_wrist": {
    "x": 348,
    "y": 266,
    "view": "both"
  },
  "left_hand": {
    "x": 159,
    "y": 275,
    "view": "both"
  },
  "right_hand": {
    "x": 341,
    "y": 275,
    "view": "both"
  },
  "thumbs": {
    "x": 168,
    "y": 271,
    "view": "both"
  },
  "palms": {
    "x": 160,
    "y": 274,
    "view": "both"
  },
  "fingers": {
    "x": 155,
    "y": 278,
    "view": "both"
  },
  "forearms": {
    "x": 159,
    "y": 239,
    "view": "both"
  },
  "left_thigh": {
    "x": 214,
    "y": 420,
    "view": "both"
  },
  "right_thigh": {
    "x": 286,
    "y": 420,
    "view": "both"
  },
  "left_knee": {
    "x": 211,
    "y": 479,
    "view": "both"
  },
  "right_knee": {
    "x": 289,
    "y": 479,
    "view": "both"
  },
  "left_calf": {
    "x": 208,
    "y": 518,
    "view": "both"
  },
  "right_calf": {
    "x": 292,
    "y": 518,
    "view": "both"
  },
  "shins": {
    "x": 280,
    "y": 530,
    "view": "both"
  },
  "left_ankle": {
    "x": 206,
    "y": 556,
    "view": "both"
  },
  "right_ankle": {
    "x": 294,
    "y": 556,
    "view": "both"
  },
  "ankles": {
    "x": 250,
    "y": 559,
    "view": "both"
  },
  "left_foot": {
    "x": 204,
    "y": 575,
    "view": "both"
  },
  "right_foot": {
    "x": 296,
    "y": 575,
    "view": "both"
  },
  "toes": {
    "x": 213,
    "y": 581,
    "view": "both"
  },
  "arches_of_feet": {
    "x": 203,
    "y": 569,
    "view": "both"
  },
  "heels": {
    "x": 289,
    "y": 574,
    "view": "both"
  },
  "back_of_head": {
    "x": 250,
    "y": 54,
    "view": "back"
  },
  "back_of_neck": {
    "x": 250,
    "y": 111,
    "view": "back"
  },
  "upper_back": {
    "x": 250,
    "y": 176,
    "view": "back"
  },
  "mid_back": {
    "x": 250,
    "y": 240,
    "view": "back"
  },
  "lower_back": {
    "x": 250,
    "y": 285,
    "view": "back"
  },
  "shoulder_blades": {
    "x": 276,
    "y": 181,
    "view": "back"
  },
  "tailbone": {
    "x": 250,
    "y": 364,
    "view": "back"
  },
  "glutes": {
    "x": 273,
    "y": 361,
    "view": "back"
  }
};

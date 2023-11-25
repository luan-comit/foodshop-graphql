import { ObjectId, ObjectID } from "bson"
import { createHash } from "crypto"

export interface SeedBrokenRice {
  _id: ObjectID
  name: string
  description: string
  sideDishIds: ObjectID[]
  imgSrc: string
  updatedAt: string
  createdAt: string
}

export interface SeedSideDish {
  _id: ObjectID
  name: string
  priceCents: number
  updatedAt: string
  createdAt: string
}

const randomizeId = (data: string): ObjectId => {
  const hash = createHash("sha1").update(data).digest("hex").slice(0, 24)

  return new ObjectId(hash)
}

const brRegular =
  "https://www.dropbox.com/scl/fi/o5ax6d699eo3hq95bh6z2/br_regular.jpeg?rlkey=q67dbgbdu46rabm52mdl2j0cv&raw=1"
const brRegularPlus =
  "https://www.dropbox.com/scl/fi/wk9pypsw69rhx3a54ojxi/br_regular_plus.jpeg?rlkey=zbejs2d9s324l9ypctg2suz0n&raw=1"
const brChickenSimple =
  "https://www.dropbox.com/scl/fi/ricboi77qlsb9uppq793h/br_chicken_simple.jpeg?rlkey=cck8iozhcz53powcq3ytotj5q&raw=1"
const brChickenPlus =
  "https://www.dropbox.com/scl/fi/5s1jp8htre16242m8fdzg/br_chicken_plus.jpeg?rlkey=yi8h70fecs811jod4wrdwp1kg&raw=1"
const brFishAllPlusSroll =
  "https://www.dropbox.com/scl/fi/pkwo3ogz5s6186xgpewpd/br_fish_all_plus_sroll.jpeg?rlkey=oexwm8nh4pn1w453btcc48jbm&raw=1"
const brFishAndSoup =
  "https://www.dropbox.com/scl/fi/hu5qlbk41so11gsf78fk3/br_fish_and_soup.jpeg?rlkey=3vwgmghn78s8xn9x6dprapmdm&raw=1"
const brFishSimple =
  "https://www.dropbox.com/scl/fi/dfvzneysuaw8qy8rs913s/br_fish_simple.jpeg?rlkey=u471gwdtykfiyjnz6cmlo9j9q&raw=1"
const brGrilledPork =
  "https://www.dropbox.com/scl/fi/kylnm2pmfvriop7febwoj/br_grilled_pork.jpeg?rlkey=u77t9cqy9lrtg3kkww7bn9g1i&raw=1"
const brSimple =
  "https://www.dropbox.com/scl/fi/ilev8775crp6vt64ei0lq/br_simple.jpeg?rlkey=qcsdu6mx2ncxcafbkeln0ylqp&raw=1"

const BR_IMG = {
  BrRegular: brRegular,
  BrRegularPlus: brRegularPlus,
  BrChickenSimple: brChickenSimple,
  BrChickenPlus: brChickenPlus,
  BrFishAllPlusSroll: brFishAllPlusSroll,
  BrFishAndSoup: brFishAndSoup,
  BrFishSimple: brFishSimple,
  BrGrilledPork: brGrilledPork,
  BrSimple: brSimple,
}

const SIDE_ID = {
  ShreddedPorkSkin: randomizeId("Shredded Pork Skin"),
  SteamedMeatloaf: randomizeId("Steamed Pork and Egg Meatloaf"),
  SpringRolls: randomizeId("Spring Rolls"),
  GrilledPork: randomizeId("Grilled Pork"),
  SteamedPork: randomizeId("Steamed Pork"),
  CaramelizedShrimps: randomizeId("Caramelized Shrimps"),
  SteamedEgg: randomizeId("Steam Egg"),
  PorkGreaves: randomizeId("Pork Greaves"),
  CharSiuPork: randomizeId("Char Siu Pork"),
  Omelet: randomizeId("Omelet"),
  BraisedChicken: randomizeId("Braised Chicken"),
  FriedMackerel: randomizeId("Fried Mackerel"),
  BraisedFish: randomizeId("Braised Fish"),
  BraisedFishPork: randomizeId("Braised Fish & Pork"),
  LuffaClamsSoup: randomizeId("Luffa & Clams Soup"),
  CabbageGroundPorkSoup: randomizeId("Cabbage & Ground Pork Soup"),
  SourFishSoup: randomizeId("Sour Fish Soup"),
  SourShrimpSoup: randomizeId("Sour Shrimp Soup"),
  LotusSalad: randomizeId("Lotus Salad"),
  SauteedWaterSpinach: randomizeId("Sauteed Water Spinach"),
  SpecialFishSoup: randomizeId("Special Fish Soup"),
}

export const brokenRices: SeedBrokenRice[] = [
  {
    _id: randomizeId("BR Regular"),
    name: "Best seller Pork",
    description:
      "Shredded Pork Skin with Grilled Pork and Steamed Egg & Pork Meatloaf",
    sideDishIds: [
      SIDE_ID.ShreddedPorkSkin,
      SIDE_ID.GrilledPork,
      SIDE_ID.SteamedMeatloaf,
    ],
    imgSrc: BR_IMG.BrRegular,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: randomizeId("BR Simple"),
    name: "Single Pork",
    description: "Grilled Pork only",
    sideDishIds: [SIDE_ID.GrilledPork],
    imgSrc: BR_IMG.BrSimple,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: randomizeId("BR Regular Plus"),
    name: "Regular Plus Omelet",
    description:
      "Shredded Pork Skin with Grilled Pork and Steamed Egg & Pork Meatloaf plus Omelet",
    sideDishIds: [
      SIDE_ID.ShreddedPorkSkin,
      SIDE_ID.GrilledPork,
      SIDE_ID.SteamedMeatloaf,
      SIDE_ID.Omelet,
    ],
    imgSrc: BR_IMG.BrRegularPlus,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: randomizeId("BR Chicken Simple"),
    name: "Chicken Simple",
    description: "Braised Chicken only",
    sideDishIds: [SIDE_ID.BraisedChicken],
    imgSrc: BR_IMG.BrChickenSimple,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: randomizeId("BR Chicken Plus"),
    name: "Chicken plus Omelet",
    description: "Braised Chicken served with Omelet",
    sideDishIds: [SIDE_ID.BraisedChicken, SIDE_ID.Omelet],
    imgSrc: BR_IMG.BrChickenPlus,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: randomizeId("BR Fish All Plus Spring Roll"),
    name: "All Fish plus Spring Rolls",
    description: "Braised Fish with Sour Fish Soup plus Spring Rolls",
    sideDishIds: [
      SIDE_ID.BraisedFish,
      SIDE_ID.SourFishSoup,
      SIDE_ID.SpringRolls,
    ],
    imgSrc: BR_IMG.BrFishAllPlusSroll,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: randomizeId("BR Fish and Soup"),
    name: "Braised Fish with Cabbage Soup",
    description: "Braised Fish and Cabbage with Ground Pork Soup",
    sideDishIds: [SIDE_ID.BraisedFish, SIDE_ID.CabbageGroundPorkSoup],
    imgSrc: BR_IMG.BrFishAndSoup,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: randomizeId("BR Fish Simple"),
    name: "Fried Mackerel only",
    description: "Fried Mackerel",
    sideDishIds: [SIDE_ID.FriedMackerel],
    imgSrc: BR_IMG.BrFishSimple,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
]

export const sideDishes: SeedSideDish[] = [
  {
    _id: SIDE_ID.ShreddedPorkSkin,
    name: "Shredded Pork Skin",
    priceCents: 200,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.SteamedMeatloaf,
    name: "Steamed Pork and Egg Meatloaf",
    priceCents: 450,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.SpringRolls,
    name: "Spring Rolls",
    priceCents: 200,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.GrilledPork,
    name: "Grilled Pork",
    priceCents: 350,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.SteamedPork,
    name: "Steamed Pork",
    priceCents: 350,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.CaramelizedShrimps,
    name: "Caramelized Shrimps",
    priceCents: 400,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.SteamedEgg,
    name: "Steamed Egg",
    priceCents: 300,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.PorkGreaves,
    name: "Pork Greaves",
    priceCents: 150,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.CharSiuPork,
    name: "Char Siu Pork",
    priceCents: 350,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.Omelet,
    name: "Omelet",
    priceCents: 250,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.BraisedChicken,
    name: "Braised Chicken",
    priceCents: 450,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.FriedMackerel,
    name: "Fried Mackerel",
    priceCents: 450,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.BraisedFish,
    name: "Braised Fish",
    priceCents: 450,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.BraisedFishPork,
    name: "Braised Fish & Pork",
    priceCents: 500,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.LuffaClamsSoup,
    name: "Luffa & Clams Soup",
    priceCents: 300,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.CabbageGroundPorkSoup,
    name: "Cabbage& Ground Pork Soup",
    priceCents: 250,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.SourFishSoup,
    name: "Sour Fish Soup",
    priceCents: 300,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.SourShrimpSoup,
    name: "Sour Shrimp Soup",
    priceCents: 350,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.LotusSalad,
    name: "Lotus Salad",
    priceCents: 300,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.SauteedWaterSpinach,
    name: "Sauteed Water Spinach",
    priceCents: 250,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: SIDE_ID.SpecialFishSoup,
    name: "Special Fish Soup",
    priceCents: 350,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
]

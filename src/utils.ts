import { format } from "date-fns"
import { find, isEmpty, memoize, padStart, replace, toString, trim } from "lodash"


export const NBSP = "\u00a0"
export const getTimestamp = (dateString: string) => format(new Date(dateString), `dd.MM'${NBSP}kl${NBSP}'HH:mm`)
export const getTimestampForInputField = (dateString: string) => format(new Date(dateString), "yyyy-MM-dd'T'kk:mm")

export const getDefaultActiveFrom = (door: number) => `${new Date().getFullYear()}-12-${padStart(toString(door), 2, "0")}T04:00+0100`
export const getDefaultActiveTo = () => `${new Date().getFullYear()}-12-25T04:00+0100`

export const squish = (str: string) => replace(trim(str), /\s+/g, " ")

// Easing helpers (https://easings.net)
export const easeInCubic = [.32, 0, .67, 0]
export const easeOutCubic = [.33, 1, .68, 1]
export const easeInOutCubic = [.65, 0, .35, 1]


const TENS = [
  [90, "nitti"],
  [80, "åtti"],
  [70, "sytti"],
  [60, "seksti"],
  [50, "femti"],
  [40, "førti"],
  [30, "tretti"],
  [20, "tjue"]
] as const
const lowNumbers = memoize((neutral: boolean, stringEmpty: boolean) => [
  "null", neutral && stringEmpty ? "ett" : "en", "to", "tre", "fire", "fem", "seks", "syv", "åtte", "ni",
  "ti", "elleve", "tolv", "tretten", "fjorten", "femten", "seksten", "sytten", "atten", "nitten"
])

// Generates a nice-ish Norwegian number string from given number `n`.
// Is it ugly? Yes. Is it strictly needed? Probably not. Can you do better? Submit a pull request :)
export const numberString = (n: number, neutral = false): string => {
  let str = ""
  let and = false

  if (n < 0) {
    str = "minus"
    n = -n
  }

  do {
    // 1000 <= n < 1100, 1300 <= n
    // Tusen og x, elleve hundre og x, ett tusen tre hundre og x, to tusen ...
    if (n >= 1300 || (n >= 1000 && n < 1100)) {
      const thousands = Math.floor(n / 1000)
      const s = n > 1100 ? `${numberString(thousands, true)} tusen` : "tusen"
      str += isEmpty(str) ? s : ` ${s}`
      n -= thousands * 1000
      and = true
      continue
    }

    // 100 <= n < 1000, 1100 <= n < 1300
    // Hundre og x, tolv hundre og x
    if (n >= 100) {
      const hundreds = Math.floor(n / 100)
      const s = hundreds >= 2 ? `${numberString(hundreds, true)} hundre` : "hundre"
      str += isEmpty(str) ? s : ` ${s}`
      n -= hundreds * 100
      and = true
      continue
    }

    // 20 <= n < 100
    const [limit, ten] = find(TENS, ([limit]) => n >= limit) ?? []
    if (limit && ten) {
      str += isEmpty(str) || !and ? ten : ` og ${ten}`
      n -= limit
      and = false
      continue
    }

    // n < 20
    const low = lowNumbers(neutral, isEmpty(str))[n]
    if (low) return str + (isEmpty(str) || !and ? low : `${str} og ${low}`)
  } while (n > 0)

  return str
}

const RANDOM_NAMES = [
  ["Ukjent snilt barn", "🧒"],
  ["Ukjent nissefar", "🎅"],
  ["Ukjent nissemor", "🧑‍🎄"],
  ["Ukjent alv", "🧝‍♀️"],
  ["Ukjent reinsdyr", "🦌"],
  ["Ukjent uåpnet pakke", "🎁"],
  ["Ukjent juletre", "🎄"]
]

export const getRandomDisplayName = () => RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]

// Weakmap to hold unique references to objects for use with React's required
// `key` props for mapping in JSX. Weakmap holds WEAK references to its keys,
// thus will not prevent garbage collection.
const keyMap = new WeakMap<object, number>()
let keyId = 0

// Get a unique key for an object. Use this when you need a key for a JSX map
// and there is no easy way to generate a string|number key for the object.
export const getObjKey = (obj: object) => {
  let key = keyMap.get(obj)
  if (key !== undefined) return key

  key = keyId++
  keyMap.set(obj, key)

  return key
}

#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/picocolors/picocolors.js"(exports, module) {
    var p = process || {};
    var argv2 = p.argv || [];
    var env = p.env || {};
    var isColorSupported = !(!!env.NO_COLOR || argv2.includes("--no-color")) && (!!env.FORCE_COLOR || argv2.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "", cursor2 = 0;
      do {
        result += string.substring(cursor2, index) + replace;
        cursor2 = index + close.length;
        index = string.indexOf(close, cursor2);
      } while (~index);
      return result + string.substring(cursor2);
    };
    var createColors = (enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m")
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});

// node_modules/@clack/core/dist/index.mjs
import { stdout, stdin } from "node:process";
import * as f$1 from "node:readline";
import f__default from "node:readline";

// node_modules/fast-string-truncated-width/dist/utils.js
var getCodePointsLength = /* @__PURE__ */ (() => {
  const SURROGATE_PAIR_RE = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  return (input) => {
    let surrogatePairsNr = 0;
    SURROGATE_PAIR_RE.lastIndex = 0;
    while (SURROGATE_PAIR_RE.test(input)) {
      surrogatePairsNr += 1;
    }
    return input.length - surrogatePairsNr;
  };
})();
var isFullWidth = (x) => {
  return x === 12288 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510;
};
var isWideNotCJKTNotEmoji = (x) => {
  return x === 8987 || x === 9001 || x >= 12272 && x <= 12287 || x >= 12289 && x <= 12350 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12591 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12771 || x >= 12783 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 19903 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 127488 && x <= 127490 || x >= 127504 && x <= 127547 || x >= 127552 && x <= 127560 || x >= 131072 && x <= 196605 || x >= 196608 && x <= 262141;
};

// node_modules/fast-string-truncated-width/dist/index.js
var ANSI_RE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\u001b\]8;[^;]*;.*?(?:\u0007|\u001b\u005c)/y;
var CONTROL_RE = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
var CJKT_WIDE_RE = /(?:(?![\uFF61-\uFF9F\uFF00-\uFFEF])[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Tangut}]){1,1000}/yu;
var TAB_RE = /\t{1,1000}/y;
var EMOJI_RE = new RegExp("[\\u{1F1E6}-\\u{1F1FF}]{2}|\\u{1F3F4}[\\u{E0061}-\\u{E007A}]{2}[\\u{E0030}-\\u{E0039}\\u{E0061}-\\u{E007A}]{1,3}\\u{E007F}|(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation})(?:\\u200D(?:\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation}|\\p{Emoji}\\uFE0F\\u20E3?))*", "yu");
var LATIN_RE = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
var MODIFIER_RE = new RegExp("\\p{M}+", "gu");
var NO_TRUNCATION = { limit: Infinity, ellipsis: "" };
var getStringTruncatedWidth = (input, truncationOptions = {}, widthOptions = {}) => {
  const LIMIT = truncationOptions.limit ?? Infinity;
  const ELLIPSIS = truncationOptions.ellipsis ?? "";
  const ELLIPSIS_WIDTH = truncationOptions?.ellipsisWidth ?? (ELLIPSIS ? getStringTruncatedWidth(ELLIPSIS, NO_TRUNCATION, widthOptions).width : 0);
  const ANSI_WIDTH = 0;
  const CONTROL_WIDTH = widthOptions.controlWidth ?? 0;
  const TAB_WIDTH = widthOptions.tabWidth ?? 8;
  const EMOJI_WIDTH = widthOptions.emojiWidth ?? 2;
  const FULL_WIDTH_WIDTH = 2;
  const REGULAR_WIDTH = widthOptions.regularWidth ?? 1;
  const WIDE_WIDTH = widthOptions.wideWidth ?? FULL_WIDTH_WIDTH;
  const PARSE_BLOCKS = [
    [LATIN_RE, REGULAR_WIDTH],
    [ANSI_RE, ANSI_WIDTH],
    [CONTROL_RE, CONTROL_WIDTH],
    [TAB_RE, TAB_WIDTH],
    [EMOJI_RE, EMOJI_WIDTH],
    [CJKT_WIDE_RE, WIDE_WIDTH]
  ];
  let indexPrev = 0;
  let index = 0;
  let length = input.length;
  let lengthExtra = 0;
  let truncationEnabled = false;
  let truncationIndex = length;
  let truncationLimit = Math.max(0, LIMIT - ELLIPSIS_WIDTH);
  let unmatchedStart = 0;
  let unmatchedEnd = 0;
  let width = 0;
  let widthExtra = 0;
  outer: while (true) {
    if (unmatchedEnd > unmatchedStart || index >= length && index > indexPrev) {
      const unmatched = input.slice(unmatchedStart, unmatchedEnd) || input.slice(indexPrev, index);
      lengthExtra = 0;
      for (const char of unmatched.replaceAll(MODIFIER_RE, "")) {
        const codePoint = char.codePointAt(0) || 0;
        if (isFullWidth(codePoint)) {
          widthExtra = FULL_WIDTH_WIDTH;
        } else if (isWideNotCJKTNotEmoji(codePoint)) {
          widthExtra = WIDE_WIDTH;
        } else {
          widthExtra = REGULAR_WIDTH;
        }
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, Math.max(unmatchedStart, indexPrev) + lengthExtra);
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break outer;
        }
        lengthExtra += char.length;
        width += widthExtra;
      }
      unmatchedStart = unmatchedEnd = 0;
    }
    if (index >= length) {
      break outer;
    }
    for (let i2 = 0, l = PARSE_BLOCKS.length; i2 < l; i2++) {
      const [BLOCK_RE, BLOCK_WIDTH] = PARSE_BLOCKS[i2];
      BLOCK_RE.lastIndex = index;
      if (BLOCK_RE.test(input)) {
        lengthExtra = BLOCK_RE === CJKT_WIDE_RE ? getCodePointsLength(input.slice(index, BLOCK_RE.lastIndex)) : BLOCK_RE === EMOJI_RE ? 1 : BLOCK_RE.lastIndex - index;
        widthExtra = lengthExtra * BLOCK_WIDTH;
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, index + Math.floor((truncationLimit - width) / BLOCK_WIDTH));
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break outer;
        }
        width += widthExtra;
        unmatchedStart = indexPrev;
        unmatchedEnd = index;
        index = indexPrev = BLOCK_RE.lastIndex;
        continue outer;
      }
    }
    index += 1;
  }
  return {
    width: truncationEnabled ? truncationLimit : width,
    index: truncationEnabled ? truncationIndex : length,
    truncated: truncationEnabled,
    ellipsed: truncationEnabled && LIMIT >= ELLIPSIS_WIDTH
  };
};
var dist_default = getStringTruncatedWidth;

// node_modules/fast-string-width/dist/index.js
var NO_TRUNCATION2 = {
  limit: Infinity,
  ellipsis: "",
  ellipsisWidth: 0
};
var fastStringWidth = (input, options = {}) => {
  return dist_default(input, NO_TRUNCATION2, options).width;
};
var dist_default2 = fastStringWidth;

// node_modules/fast-wrap-ansi/lib/main.js
var ESC = "\x1B";
var CSI = "\x9B";
var END_CODE = 39;
var ANSI_ESCAPE_BELL = "\x07";
var ANSI_CSI = "[";
var ANSI_OSC = "]";
var ANSI_SGR_TERMINATOR = "m";
var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
var GROUP_REGEX = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`, "y");
var getClosingCode = (openingCode) => {
  if (openingCode >= 30 && openingCode <= 37)
    return 39;
  if (openingCode >= 90 && openingCode <= 97)
    return 39;
  if (openingCode >= 40 && openingCode <= 47)
    return 49;
  if (openingCode >= 100 && openingCode <= 107)
    return 49;
  if (openingCode === 1 || openingCode === 2)
    return 22;
  if (openingCode === 3)
    return 23;
  if (openingCode === 4)
    return 24;
  if (openingCode === 7)
    return 27;
  if (openingCode === 8)
    return 28;
  if (openingCode === 9)
    return 29;
  if (openingCode === 0)
    return 0;
  return void 0;
};
var wrapAnsiCode = (code) => `${ESC}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
var wrapAnsiHyperlink = (url) => `${ESC}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
var wrapWord = (rows, word, columns) => {
  const characters = word[Symbol.iterator]();
  let isInsideEscape = false;
  let isInsideLinkEscape = false;
  let lastRow = rows.at(-1);
  let visible = lastRow === void 0 ? 0 : dist_default2(lastRow);
  let currentCharacter = characters.next();
  let nextCharacter = characters.next();
  let rawCharacterIndex = 0;
  while (!currentCharacter.done) {
    const character = currentCharacter.value;
    const characterLength = dist_default2(character);
    if (visible + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible = 0;
    }
    if (character === ESC || character === CSI) {
      isInsideEscape = true;
      isInsideLinkEscape = word.startsWith(ANSI_ESCAPE_LINK, rawCharacterIndex + 1);
    }
    if (isInsideEscape) {
      if (isInsideLinkEscape) {
        if (character === ANSI_ESCAPE_BELL) {
          isInsideEscape = false;
          isInsideLinkEscape = false;
        }
      } else if (character === ANSI_SGR_TERMINATOR) {
        isInsideEscape = false;
      }
    } else {
      visible += characterLength;
      if (visible === columns && !nextCharacter.done) {
        rows.push("");
        visible = 0;
      }
    }
    currentCharacter = nextCharacter;
    nextCharacter = characters.next();
    rawCharacterIndex += character.length;
  }
  lastRow = rows.at(-1);
  if (!visible && lastRow !== void 0 && lastRow.length && rows.length > 1) {
    rows[rows.length - 2] += rows.pop();
  }
};
var stringVisibleTrimSpacesRight = (string) => {
  const words = string.split(" ");
  let last = words.length;
  while (last) {
    if (dist_default2(words[last - 1])) {
      break;
    }
    last--;
  }
  if (last === words.length) {
    return string;
  }
  return words.slice(0, last).join(" ") + words.slice(last).join("");
};
var exec = (string, columns, options = {}) => {
  if (options.trim !== false && string.trim() === "") {
    return "";
  }
  let returnValue = "";
  let escapeCode;
  let escapeUrl;
  const words = string.split(" ");
  let rows = [""];
  let rowLength = 0;
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    if (options.trim !== false) {
      const row = rows.at(-1) ?? "";
      const trimmed = row.trimStart();
      if (row.length !== trimmed.length) {
        rows[rows.length - 1] = trimmed;
        rowLength = dist_default2(trimmed);
      }
    }
    if (index !== 0) {
      if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
        rows.push("");
        rowLength = 0;
      }
      if (rowLength || options.trim === false) {
        rows[rows.length - 1] += " ";
        rowLength++;
      }
    }
    const wordLength = dist_default2(word);
    if (options.hard && wordLength > columns) {
      const remainingColumns = columns - rowLength;
      const breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / columns);
      const breaksStartingNextLine = Math.floor((wordLength - 1) / columns);
      if (breaksStartingNextLine < breaksStartingThisLine) {
        rows.push("");
      }
      wrapWord(rows, word, columns);
      rowLength = dist_default2(rows.at(-1) ?? "");
      continue;
    }
    if (rowLength + wordLength > columns && rowLength && wordLength) {
      if (options.wordWrap === false && rowLength < columns) {
        wrapWord(rows, word, columns);
        rowLength = dist_default2(rows.at(-1) ?? "");
        continue;
      }
      rows.push("");
      rowLength = 0;
    }
    if (rowLength + wordLength > columns && options.wordWrap === false) {
      wrapWord(rows, word, columns);
      rowLength = dist_default2(rows.at(-1) ?? "");
      continue;
    }
    rows[rows.length - 1] += word;
    rowLength += wordLength;
  }
  if (options.trim !== false) {
    rows = rows.map((row) => stringVisibleTrimSpacesRight(row));
  }
  const preString = rows.join("\n");
  let inSurrogate = false;
  for (let i2 = 0; i2 < preString.length; i2++) {
    const character = preString[i2];
    returnValue += character;
    if (!inSurrogate) {
      inSurrogate = character >= "\uD800" && character <= "\uDBFF";
      if (inSurrogate) {
        continue;
      }
    } else {
      inSurrogate = false;
    }
    if (character === ESC || character === CSI) {
      GROUP_REGEX.lastIndex = i2 + 1;
      const groupsResult = GROUP_REGEX.exec(preString);
      const groups = groupsResult?.groups;
      if (groups?.code !== void 0) {
        const code = Number.parseFloat(groups.code);
        escapeCode = code === END_CODE ? void 0 : code;
      } else if (groups?.uri !== void 0) {
        escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
      }
    }
    if (preString[i2 + 1] === "\n") {
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink("");
      }
      const closingCode = escapeCode ? getClosingCode(escapeCode) : void 0;
      if (escapeCode && closingCode) {
        returnValue += wrapAnsiCode(closingCode);
      }
    } else if (character === "\n") {
      if (escapeCode && getClosingCode(escapeCode)) {
        returnValue += wrapAnsiCode(escapeCode);
      }
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink(escapeUrl);
      }
    }
  }
  return returnValue;
};
var CRLF_OR_LF = /\r?\n/;
function wrapAnsi(string, columns, options) {
  return String(string).normalize().split(CRLF_OR_LF).map((line) => exec(line, columns, options)).join("\n");
}

// node_modules/sisteransi/dist/index.js
var ESC2 = "\x1B";
var CSI2 = `${ESC2}[`;
var cursor = {
  to(x, y) {
    if (!y)
      return `${CSI2}${x + 1}G`;
    return `${CSI2}${y + 1};${x + 1}H`;
  },
  move(x, y) {
    let ret = "";
    if (x < 0)
      ret += `${CSI2}${-x}D`;
    else if (x > 0)
      ret += `${CSI2}${x}C`;
    if (y < 0)
      ret += `${CSI2}${-y}A`;
    else if (y > 0)
      ret += `${CSI2}${y}B`;
    return ret;
  },
  up: (count = 1) => `${CSI2}${count}A`,
  down: (count = 1) => `${CSI2}${count}B`,
  forward: (count = 1) => `${CSI2}${count}C`,
  backward: (count = 1) => `${CSI2}${count}D`,
  nextLine: (count = 1) => `${CSI2}E`.repeat(count),
  prevLine: (count = 1) => `${CSI2}F`.repeat(count),
  left: `${CSI2}G`,
  hide: `${CSI2}?25l`,
  show: `${CSI2}?25h`,
  save: `${ESC2}7`,
  restore: `${ESC2}8`
};
var erase = {
  screen: `${CSI2}2J`,
  up: (count = 1) => `${CSI2}1J`.repeat(count),
  down: (count = 1) => `${CSI2}J`.repeat(count),
  line: `${CSI2}2K`,
  lineEnd: `${CSI2}K`,
  lineStart: `${CSI2}1K`,
  lines(count) {
    let clear2 = "";
    for (let i2 = 0; i2 < count; i2++)
      clear2 += this.line + (i2 < count - 1 ? cursor.up() : "");
    if (count)
      clear2 += cursor.left;
    return clear2;
  }
};
var clear = {
  screen: `${ESC2}c`
};

// node_modules/@clack/core/dist/index.mjs
import { ReadStream } from "node:tty";
function findCursor(o, s, l) {
  if (!l.some((r2) => !r2.disabled))
    return o;
  const t2 = o + s, n3 = Math.max(l.length - 1, 0), e = t2 < 0 ? n3 : t2 > n3 ? 0 : t2;
  return l[e]?.disabled ? findCursor(e, s < 0 ? -1 : 1, l) : e;
}
var a$1 = ["up", "down", "left", "right", "space", "enter", "cancel"];
var t = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var settings = {
  actions: new Set(a$1),
  aliases: /* @__PURE__ */ new Map([
    // vim support
    ["k", "up"],
    ["j", "down"],
    ["h", "left"],
    ["l", "right"],
    ["", "cancel"],
    // opinionated defaults!
    ["escape", "cancel"]
  ]),
  messages: {
    cancel: "Canceled",
    error: "Something went wrong"
  },
  withGuide: true,
  accessible: void 0,
  date: {
    monthNames: [...t],
    messages: {
      required: "Please enter a valid date",
      invalidMonth: "There are only 12 months in a year",
      invalidDay: (n3, e) => `There are only ${n3} days in ${e}`,
      afterMin: (n3) => `Date must be on or after ${n3.toISOString().slice(0, 10)}`,
      beforeMax: (n3) => `Date must be on or before ${n3.toISOString().slice(0, 10)}`
    }
  }
};
function isAccessible(n3) {
  if (n3 !== void 0) return n3;
  if (settings.accessible !== void 0) return settings.accessible;
  const e = process.env.ACCESSIBLE;
  return e !== void 0 && e !== "" && e !== "0" && e !== "false";
}
function isActionKey(n3, e) {
  if (typeof n3 == "string")
    return settings.aliases.get(n3) === e;
  for (const s of n3)
    if (s !== void 0 && isActionKey(s, e))
      return true;
  return false;
}
function diffLines(i2, s) {
  if (i2 === s) return;
  const e = i2.split(`
`), t2 = s.split(`
`), r2 = Math.max(e.length, t2.length), f = [];
  for (let n3 = 0; n3 < r2; n3++)
    e[n3] !== t2[n3] && f.push(n3);
  return {
    lines: f,
    numLinesBefore: e.length,
    numLinesAfter: t2.length,
    numLines: r2
  };
}
var R = globalThis.process.platform.startsWith("win");
var CANCEL_SYMBOL = Symbol("clack:cancel");
function isCancel(e) {
  return e === CANCEL_SYMBOL;
}
function setRawMode(e, r2) {
  const o = e;
  o.isTTY && o.setRawMode(r2);
}
function block({
  input: e = stdin,
  output: r2 = stdout,
  overwrite: o = true,
  hideCursor: n3 = true
} = {}) {
  const s = f$1.createInterface({
    input: e,
    output: r2,
    prompt: "",
    tabSize: 1
  });
  f$1.emitKeypressEvents(e, s), e instanceof ReadStream && e.isTTY && e.setRawMode(true);
  const t2 = (l, { name: i2, sequence: p }) => {
    const w = String(l);
    if (isActionKey([w, i2, p], "cancel")) {
      n3 && r2.write(cursor.show), process.exit(0);
      return;
    }
    if (!o) return;
    const c3 = i2 === "return" ? 0 : -1, a2 = i2 === "return" ? -1 : 0;
    f$1.moveCursor(r2, c3, a2, () => {
      f$1.clearLine(r2, 1, () => {
        e.once("keypress", t2);
      });
    });
  };
  return n3 && r2.write(cursor.hide), e.once("keypress", t2), () => {
    e.off("keypress", t2), n3 && r2.write(cursor.show), e instanceof ReadStream && e.isTTY && !R && e.setRawMode(false), s.terminal = false, s.close();
  };
}
var getColumns = (e) => "columns" in e && typeof e.columns == "number" ? e.columns : 80;
var getRows = (e) => "rows" in e && typeof e.rows == "number" ? e.rows : 20;
function wrapTextWithPrefix(e, r2, o, n3 = o, s = o, t2) {
  const l = getColumns(e ?? stdout), i2 = dist_default2(o);
  return wrapAnsi(r2, l - i2, {
    hard: true,
    trim: false
  }).split(`
`).map((c3, a2, g) => {
    const m2 = t2 ? t2(c3, a2) : c3;
    return a2 === 0 ? `${n3}${m2}` : a2 === g.length - 1 ? `${s}${m2}` : `${o}${m2}`;
  }).join(`
`);
}
function runValidation(e, a2) {
  if ("~standard" in e) {
    const n3 = e["~standard"].validate(a2);
    return n3 instanceof Promise ? n3.then((r2) => r2.issues?.at(0)?.message) : n3.issues?.at(0)?.message;
  }
  return e(a2);
}
var C$1 = class C {
  input;
  output;
  _abortSignal;
  rl;
  opts;
  _render;
  _track = false;
  _prevFrame = "";
  _subscribers = /* @__PURE__ */ new Map();
  _cursor = 0;
  state = "initial";
  error = "";
  value;
  userInput = "";
  /**
   * Whether accessible (static, screen-reader friendly) output is enabled for
   * this prompt, resolved from the `accessible` option, the global setting,
   * and the `ACCESSIBLE` env var.
   */
  get accessible() {
    return isAccessible(this.opts.accessible);
  }
  constructor(t2, e = true) {
    const { input: i2 = stdin, output: s = stdout, render: r2, signal: n3, ...o } = t2;
    this.opts = o, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = r2.bind(this), this._track = e, this._abortSignal = n3, this.input = i2, this.output = s;
  }
  /**
   * Unsubscribe all listeners
   */
  unsubscribe() {
    this._subscribers.clear();
  }
  /**
   * Set a subscriber with opts
   * @param event - The event name
   */
  setSubscriber(t2, e) {
    const i2 = this._subscribers.get(t2) ?? [];
    i2.push(e), this._subscribers.set(t2, i2);
  }
  /**
   * Subscribe to an event
   * @param event - The event name
   * @param cb - The callback
   */
  on(t2, e) {
    this.setSubscriber(t2, { cb: e });
  }
  /**
   * Subscribe to an event once
   * @param event - The event name
   * @param cb - The callback
   */
  once(t2, e) {
    this.setSubscriber(t2, { cb: e, once: true });
  }
  /**
   * Emit an event with data
   * @param event - The event name
   * @param data - The data to pass to the callback
   */
  emit(t2, ...e) {
    const i2 = this._subscribers.get(t2) ?? [], s = [];
    for (const r2 of i2)
      r2.cb(...e), r2.once && s.push(() => i2.splice(i2.indexOf(r2), 1));
    for (const r2 of s)
      r2();
  }
  prompt() {
    return new Promise((t2) => {
      if (this._abortSignal) {
        if (this._abortSignal.aborted)
          return this.state = "cancel", this.close(), t2(CANCEL_SYMBOL);
        this._abortSignal.addEventListener(
          "abort",
          () => {
            this.state = "cancel", this.close();
          },
          { once: true }
        );
      }
      this.rl = f__default.createInterface({
        input: this.input,
        tabSize: 2,
        prompt: "",
        escapeCodeTimeout: 50,
        terminal: true
      }), this.rl.prompt(), this.opts.initialUserInput !== void 0 && this._setUserInput(this.opts.initialUserInput, true), this.input.on("keypress", this.onKeypress), setRawMode(this.input, true), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
        this.output.write(cursor.show), this.output.off("resize", this.render), setRawMode(this.input, false), t2(this.value);
      }), this.once("cancel", () => {
        this.output.write(cursor.show), this.output.off("resize", this.render), setRawMode(this.input, false), t2(CANCEL_SYMBOL);
      });
    });
  }
  _isActionKey(t2, e) {
    return t2 === "	";
  }
  _shouldSubmit(t2, e) {
    return true;
  }
  _setValue(t2) {
    this.value = t2, this.emit("value", this.value);
  }
  _setUserInput(t2, e) {
    this.userInput = t2 ?? "", this.emit("userInput", this.userInput), e && this._track && this.rl && (this.rl.write(this.userInput), this._cursor = this.rl.cursor);
  }
  _clearUserInput() {
    this.rl?.write(null, { ctrl: true, name: "u" }), this._setUserInput("");
  }
  async onKeypress(t2, e) {
    if (this.state !== "validating") {
      if (this._track && e.name !== "return" && (e.name && this._isActionKey(t2, e) && this.rl?.write(null, { ctrl: true, name: "h" }), this._cursor = this.rl?.cursor ?? 0, this._setUserInput(this.rl?.line)), this.state === "error" && (this.state = "active"), e?.name && (!this._track && settings.aliases.has(e.name) && this.emit("cursor", settings.aliases.get(e.name)), settings.actions.has(e.name) && this.emit("cursor", e.name)), t2 && (t2.toLowerCase() === "y" || t2.toLowerCase() === "n") && this.emit("confirm", t2.toLowerCase() === "y"), this.emit("key", t2, e), e?.name === "return" && this._shouldSubmit(t2, e)) {
        if (this.opts.validate) {
          const i2 = runValidation(this.opts.validate, this.value);
          let s;
          i2 instanceof Promise ? (this.state = "validating", this.render(), s = await i2) : s = i2, s && (this.error = s instanceof Error ? s.message : s, this.state = "error", this.rl?.write(this.userInput));
        }
        this.state !== "error" && (this.state = "submit");
      }
      isActionKey([t2, e?.name, e?.sequence], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
    }
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), setRawMode(this.input, false), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const t2 = wrapAnsi(this._prevFrame, getColumns(this.output), { hard: true, trim: false }).split(`
`).length - 1;
    this.output.write(cursor.move(-999, t2 * -1));
  }
  render() {
    const t2 = wrapAnsi(this._render(this) ?? "", getColumns(this.output), {
      hard: true,
      trim: false
    });
    if (t2 !== this._prevFrame) {
      if (this.state === "initial")
        this.output.write(cursor.hide);
      else {
        const e = diffLines(this._prevFrame, t2), i2 = getRows(this.output);
        if (this.restoreCursor(), e) {
          const s = Math.max(0, e.numLinesAfter - i2), r2 = Math.max(0, e.numLinesBefore - i2);
          let n3 = e.lines.find((o) => o >= s);
          if (n3 === void 0) {
            this._prevFrame = t2;
            return;
          }
          if (e.lines.length === 1) {
            this.output.write(cursor.move(0, n3 - r2)), this.output.write(erase.lines(1));
            const o = t2.split(`
`);
            this.output.write(o[n3]), this._prevFrame = t2, this.output.write(cursor.move(0, o.length - n3 - 1));
            return;
          } else if (e.lines.length > 1) {
            if (s < r2)
              n3 = s;
            else {
              const h2 = n3 - r2;
              h2 > 0 && this.output.write(cursor.move(0, h2));
            }
            this.output.write(erase.down());
            const m2 = t2.split(`
`).slice(n3);
            this.output.write(m2.join(`
`)), this._prevFrame = t2;
            return;
          }
        }
        this.output.write(erase.down());
      }
      this.output.write(t2), this.state === "initial" && (this.state = "active"), this._prevFrame = t2;
    }
  }
};
var r = class extends C$1 {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return this.cursor === 0;
  }
  constructor(t2) {
    super(t2, false), this.value = !!t2.initialValue, this.on("userInput", () => {
      this.value = this._value;
    }), this.on("confirm", (i2) => {
      this.output.write(cursor.move(0, -1)), this.value = i2, this.state = "submit", this.close();
    }), this.on("cursor", () => {
      this.value = !this.value;
    });
  }
};
var a = class extends C$1 {
  options;
  cursor = 0;
  get _value() {
    return this.options[this.cursor]?.value;
  }
  get _enabledOptions() {
    return this.options.filter((e) => e.disabled !== true);
  }
  toggleAll() {
    const e = this._enabledOptions, i2 = this.value !== void 0 && this.value.length === e.length;
    this.value = i2 ? [] : e.map((t2) => t2.value);
  }
  toggleInvert() {
    const e = this.value;
    if (!e)
      return;
    const i2 = this._enabledOptions.filter((t2) => !e.includes(t2.value));
    this.value = i2.map((t2) => t2.value);
  }
  toggleValue() {
    this.value === void 0 && (this.value = []);
    const e = this.value.includes(this._value);
    this.value = e ? this.value.filter((i2) => i2 !== this._value) : [...this.value, this._value];
  }
  constructor(e) {
    super(e, false), this.options = e.options, this.value = [...e.initialValues ?? []];
    const i2 = Math.max(
      this.options.findIndex(({ value: t2 }) => t2 === e.cursorAt),
      0
    );
    this.cursor = this.options[i2]?.disabled ? findCursor(i2, 1, this.options) : i2, this.on("key", (t2, s) => {
      s.name === "a" && this.toggleAll(), s.name === "i" && this.toggleInvert(), s.name === void 0 && t2 === "\u3000" && this.toggleValue();
    }), this.on("cursor", (t2) => {
      switch (t2) {
        case "left":
        case "up":
          this.cursor = findCursor(this.cursor, -1, this.options);
          break;
        case "down":
        case "right":
          this.cursor = findCursor(this.cursor, 1, this.options);
          break;
        case "space":
          this.toggleValue();
          break;
      }
    });
  }
};
var n$1 = class n extends C$1 {
  options;
  cursor = 0;
  get _selectedValue() {
    return this.options[this.cursor];
  }
  changeValue() {
    const e = this._selectedValue;
    this.value = e === void 0 ? void 0 : e.value;
  }
  constructor(e) {
    super(e, false), this.options = e.options;
    const o = this.options.findIndex(({ value: s }) => s === e.initialValue), t2 = o === -1 ? 0 : o;
    this.cursor = this.options[t2]?.disabled ? findCursor(t2, 1, this.options) : t2, this.changeValue(), this.on("cursor", (s) => {
      switch (s) {
        case "left":
        case "up":
          this.cursor = findCursor(this.cursor, -1, this.options);
          break;
        case "down":
        case "right":
          this.cursor = findCursor(this.cursor, 1, this.options);
          break;
      }
      this.changeValue();
    });
  }
};

// node_modules/@clack/prompts/dist/index.mjs
import { styleText, stripVTControlCharacters } from "node:util";
import process$1 from "node:process";
function isUnicodeSupported() {
  if (process$1.platform !== "win32") {
    return process$1.env.TERM !== "linux";
  }
  return Boolean(process$1.env.CI) || Boolean(process$1.env.WT_SESSION) || Boolean(process$1.env.TERMINUS_SUBLIME) || process$1.env.ConEmuTask === "{cmd::Cmder}" || process$1.env.TERM_PROGRAM === "Terminus-Sublime" || process$1.env.TERM_PROGRAM === "vscode" || process$1.env.TERM === "xterm-256color" || process$1.env.TERM === "alacritty" || process$1.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var unicode = isUnicodeSupported();
var isCI = () => process.env.CI === "true";
var unicodeOr = (e, o) => unicode ? e : o;
var S_STEP_ACTIVE = unicodeOr("\u25C6", "*");
var S_STEP_CANCEL = unicodeOr("\u25A0", "x");
var S_STEP_ERROR = unicodeOr("\u25B2", "x");
var S_STEP_SUBMIT = unicodeOr("\u25C7", "o");
var S_BAR_START = unicodeOr("\u250C", "T");
var S_BAR = unicodeOr("\u2502", "|");
var S_BAR_END = unicodeOr("\u2514", "\u2014");
var S_BAR_START_RIGHT = unicodeOr("\u2510", "T");
var S_BAR_END_RIGHT = unicodeOr("\u2518", "\u2014");
var S_RADIO_ACTIVE = unicodeOr("\u25CF", ">");
var S_RADIO_INACTIVE = unicodeOr("\u25CB", " ");
var S_CHECKBOX_ACTIVE = unicodeOr("\u25FB", "[\u2022]");
var S_CHECKBOX_SELECTED = unicodeOr("\u25FC", "[+]");
var S_CHECKBOX_INACTIVE = unicodeOr("\u25FB", "[ ]");
var S_PASSWORD_MASK = unicodeOr("\u25AA", "\u2022");
var S_BAR_H = unicodeOr("\u2500", "-");
var S_CORNER_TOP_RIGHT = unicodeOr("\u256E", "+");
var S_CONNECT_LEFT = unicodeOr("\u251C", "+");
var S_CORNER_BOTTOM_RIGHT = unicodeOr("\u256F", "+");
var S_CORNER_BOTTOM_LEFT = unicodeOr("\u2570", "+");
var S_CORNER_TOP_LEFT = unicodeOr("\u256D", "+");
var S_INFO = unicodeOr("\u25CF", "\u2022");
var S_SUCCESS = unicodeOr("\u25C6", "*");
var S_WARN = unicodeOr("\u25B2", "!");
var S_ERROR = unicodeOr("\u25A0", "x");
var symbol = (e) => {
  switch (e) {
    case "initial":
    case "active":
      return styleText("cyan", S_STEP_ACTIVE);
    case "cancel":
      return styleText("red", S_STEP_CANCEL);
    case "error":
      return styleText("yellow", S_STEP_ERROR);
    case "submit":
      return styleText("green", S_STEP_SUBMIT);
    case "validating":
      return styleText("dim", S_STEP_ACTIVE);
  }
};
var symbolBar = (e) => {
  switch (e) {
    case "initial":
    case "active":
      return styleText("cyan", S_BAR);
    case "cancel":
      return styleText("red", S_BAR);
    case "error":
      return styleText("yellow", S_BAR);
    case "submit":
      return styleText("green", S_BAR);
  }
};
function formatInstructionFooter(e, o, r2) {
  const s = r2 ? `${styleText("cyan", S_BAR)}  ` : "", n3 = wrapTextWithPrefix(e, o.join(" \u2022 "), s).split(`
`);
  return r2 && n3.push(styleText("cyan", S_BAR_END)), n3;
}
var E$1 = (l, e, w, p, b, C3 = false) => {
  let r2 = e, O = 0;
  if (C3)
    for (let i2 = p - 1; i2 >= w; i2--) {
      const m2 = l[i2];
      if (m2 && (r2 -= m2.length), O++, r2 <= b) break;
    }
  else
    for (let i2 = w; i2 < p; i2++) {
      const m2 = l[i2];
      if (m2 && (r2 -= m2.length), O++, r2 <= b) break;
    }
  return { lineCount: r2, removals: O };
};
var limitOptions = ({
  cursor: l,
  options: e,
  style: w,
  output: p = process.stdout,
  maxItems: b = Number.POSITIVE_INFINITY,
  columnPadding: C3 = 0,
  rowPadding: r2 = 4
}) => {
  const i2 = getColumns(p) - C3, m2 = getRows(p), M = styleText("dim", "..."), v = Math.max(m2 - r2, 0), a2 = Math.max(Math.min(b, v), 5);
  let f = 0;
  l >= a2 - 3 && (f = Math.max(
    Math.min(l - a2 + 3, e.length - a2),
    0
  ));
  let d = a2 < e.length && f > 0, c3 = a2 < e.length && f + a2 < e.length;
  const I = Math.min(
    f + a2,
    e.length
  ), s = [];
  let g = 0;
  d && g++, c3 && g++;
  const T = f + (d ? 1 : 0), W3 = I - (c3 ? 1 : 0);
  for (let t2 = T; t2 < W3; t2++) {
    const n3 = e[t2], o = n3 !== void 0 ? w(n3, t2 === l) : "", h2 = wrapAnsi(o, i2, {
      hard: true,
      trim: false
    }).split(`
`);
    s.push(h2), g += h2.length;
  }
  if (g > v) {
    let t2 = 0, n3 = 0, o = g;
    const h2 = l - T;
    let u3 = v;
    const L = () => E$1(s, o, 0, h2, u3), y = () => E$1(
      s,
      o,
      h2 + 1,
      s.length,
      u3,
      true
    );
    d ? ({ lineCount: o, removals: t2 } = L(), o > u3 && (c3 || (u3 -= 1), { lineCount: o, removals: n3 } = y())) : (c3 || (u3 -= 1), { lineCount: o, removals: n3 } = y(), o > u3 && (u3 -= 1, { lineCount: o, removals: t2 } = L())), t2 > 0 && (d = true, s.splice(0, t2)), n3 > 0 && (c3 = true, s.splice(s.length - n3, n3));
  }
  const x = [];
  d && x.push(M);
  for (const t2 of s)
    for (const n3 of t2)
      x.push(n3);
  return c3 && x.push(M), x;
};
var confirm = (e) => {
  const a2 = e.active ?? "Yes", o = e.inactive ?? "No";
  return new r({
    active: a2,
    inactive: o,
    signal: e.signal,
    input: e.input,
    output: e.output,
    initialValue: e.initialValue ?? true,
    render() {
      const i2 = e.withGuide ?? settings.withGuide, u3 = `${symbol(this.state)}  `, l = i2 ? `${styleText("gray", S_BAR)}  ` : "", f = wrapTextWithPrefix(
        e.output,
        e.message,
        l,
        u3
      ), s = `${i2 ? `${styleText("gray", S_BAR)}
` : ""}${f}
`, c3 = this.value ? a2 : o;
      switch (this.state) {
        case "submit": {
          const r2 = i2 ? `${styleText("gray", S_BAR)}  ` : "";
          return `${s}${r2}${styleText("dim", c3)}`;
        }
        case "cancel": {
          const r2 = i2 ? `${styleText("gray", S_BAR)}  ` : "";
          return `${s}${r2}${styleText(["strikethrough", "dim"], c3)}${i2 ? `
${styleText("gray", S_BAR)}` : ""}`;
        }
        default: {
          const r2 = i2 ? `${styleText("cyan", S_BAR)}  ` : "", g = i2 ? styleText("cyan", S_BAR_END) : "";
          return `${s}${r2}${this.value ? `${styleText("green", S_RADIO_ACTIVE)} ${a2}` : `${styleText("dim", S_RADIO_INACTIVE)} ${styleText("dim", a2)}`}${e.vertical ? i2 ? `
${styleText("cyan", S_BAR)}  ` : `
` : ` ${styleText("dim", "/")} `}${this.value ? `${styleText("dim", S_RADIO_INACTIVE)} ${styleText("dim", o)}` : `${styleText("green", S_RADIO_ACTIVE)} ${o}`}
${g}
`;
        }
      }
    }
  }).prompt();
};
var group = async (o, r2) => {
  const t2 = {}, p = Object.keys(o);
  for (const e of p) {
    const i2 = o[e], n3 = await i2({ results: t2 })?.catch((a2) => {
      throw a2;
    });
    if (typeof r2?.onCancel == "function" && isCancel(n3)) {
      t2[e] = "canceled", r2.onCancel({ results: t2 });
      continue;
    }
    t2[e] = n3;
  }
  return t2;
};
var MULTISELECT_INSTRUCTIONS = [
  `${styleText("dim", "\u2191/\u2193")} to navigate`,
  `${styleText("dim", "Space:")} select`,
  `${styleText("dim", "Enter:")} confirm`
];
var m = (n3, u3) => n3.split(`
`).map((d) => u3(d)).join(`
`);
var multiselect = (n3) => {
  const u3 = (t2, a2) => {
    const r2 = t2.label ?? String(t2.value);
    return a2 === "disabled" ? `${styleText("gray", S_CHECKBOX_INACTIVE)} ${m(r2, (o) => styleText(["strikethrough", "gray"], o))}${t2.hint ? ` ${styleText("dim", `(${t2.hint ?? "disabled"})`)}` : ""}` : a2 === "active" ? `${styleText("cyan", S_CHECKBOX_ACTIVE)} ${r2}${t2.hint ? ` ${styleText("dim", `(${t2.hint})`)}` : ""}` : a2 === "selected" ? `${styleText("green", S_CHECKBOX_SELECTED)} ${m(r2, (o) => styleText("dim", o))}${t2.hint ? ` ${styleText("dim", `(${t2.hint})`)}` : ""}` : a2 === "cancelled" ? `${m(r2, (o) => styleText(["strikethrough", "dim"], o))}` : a2 === "active-selected" ? `${styleText("green", S_CHECKBOX_SELECTED)} ${r2}${t2.hint ? ` ${styleText("dim", `(${t2.hint})`)}` : ""}` : a2 === "submitted" ? `${m(r2, (o) => styleText("dim", o))}` : `${styleText("dim", S_CHECKBOX_INACTIVE)} ${m(r2, (o) => styleText("dim", o))}`;
  }, d = n3.required ?? true, x = n3.showInstructions ?? true;
  return new a({
    options: n3.options,
    signal: n3.signal,
    input: n3.input,
    output: n3.output,
    initialValues: n3.initialValues,
    required: d,
    cursorAt: n3.cursorAt,
    validate(t2) {
      if (d && (t2 === void 0 || t2.length === 0))
        return `Please select at least one option.
${styleText(
          "reset",
          styleText(
            "dim",
            `Press ${styleText(["gray", "bgWhite", "inverse"], " space ")} to select, ${styleText(
              "gray",
              styleText("bgWhite", styleText("inverse", " enter "))
            )} to submit`
          )
        )}`;
    },
    render() {
      const t2 = n3.withGuide ?? settings.withGuide, a2 = wrapTextWithPrefix(
        n3.output,
        n3.message,
        t2 ? `${symbolBar(this.state)}  ` : "",
        `${symbol(this.state)}  `
      ), r2 = `${t2 ? `${styleText("gray", S_BAR)}
` : ""}${a2}
`, o = this.value ?? [], g = (i2, l) => {
        if (i2.disabled)
          return u3(i2, "disabled");
        const s = o.includes(i2.value);
        return l && s ? u3(i2, "active-selected") : s ? u3(i2, "selected") : u3(i2, l ? "active" : "inactive");
      };
      switch (this.state) {
        case "submit": {
          const i2 = this.options.filter(({ value: s }) => o.includes(s)).map((s) => u3(s, "submitted")).join(styleText("dim", ", ")) || styleText("dim", "none"), l = wrapTextWithPrefix(
            n3.output,
            i2,
            t2 ? `${styleText("gray", S_BAR)}  ` : ""
          );
          return `${r2}${l}`;
        }
        case "cancel": {
          const i2 = this.options.filter(({ value: s }) => o.includes(s)).map((s) => u3(s, "cancelled")).join(styleText("dim", ", "));
          if (i2.trim() === "")
            return `${r2}${styleText("gray", S_BAR)}`;
          const l = wrapTextWithPrefix(
            n3.output,
            i2,
            t2 ? `${styleText("gray", S_BAR)}  ` : ""
          );
          return `${r2}${l}${t2 ? `
${styleText("gray", S_BAR)}` : ""}`;
        }
        case "error": {
          const i2 = t2 ? `${styleText("yellow", S_BAR)}  ` : "", l = this.error.split(`
`).map(
            ($, v) => v === 0 ? `${t2 ? `${styleText("yellow", S_BAR_END)}  ` : ""}${styleText("yellow", $)}` : `   ${$}`
          ).join(`
`), s = r2.split(`
`).length, h2 = l.split(`
`).length + 1;
          return `${r2}${i2}${limitOptions({
            output: n3.output,
            options: this.options,
            cursor: this.cursor,
            maxItems: n3.maxItems,
            columnPadding: i2.length,
            rowPadding: s + h2,
            style: g
          }).join(`
${i2}`)}
${l}
`;
        }
        default: {
          const i2 = t2 ? `${styleText("cyan", S_BAR)}  ` : "", l = r2.split(`
`).length, s = x ? formatInstructionFooter(n3.output, MULTISELECT_INSTRUCTIONS, t2) : t2 ? [styleText("cyan", S_BAR_END)] : [], h2 = s.join(`
`), $ = s.length + 1;
          return `${r2}${i2}${limitOptions({
            output: n3.output,
            options: this.options,
            cursor: this.cursor,
            maxItems: n3.maxItems,
            columnPadding: i2.length,
            rowPadding: l + $,
            style: g
          }).join(`
${i2}`)}
${h2}
`;
        }
      }
    }
  }).prompt();
};
var log = {
  message: (s = [], {
    symbol: e = styleText("gray", S_BAR),
    secondarySymbol: r2 = styleText("gray", S_BAR),
    output: m2 = process.stdout,
    spacing: l = 1,
    withGuide: c3
  } = {}) => {
    const t2 = [], o = c3 ?? settings.withGuide, f = o ? r2 : "", O = o ? `${e}  ` : "", u3 = o ? `${r2}  ` : "";
    for (let i2 = 0; i2 < l; i2++)
      t2.push(f);
    const g = Array.isArray(s) ? s : s.split(`
`);
    if (g.length > 0) {
      const [i2, ...y] = g;
      i2.length > 0 ? t2.push(`${O}${i2}`) : t2.push(o ? e : "");
      for (const p of y)
        p.length > 0 ? t2.push(`${u3}${p}`) : t2.push(o ? r2 : "");
    }
    m2.write(`${t2.join(`
`)}
`);
  },
  info: (s, e) => {
    log.message(s, { ...e, symbol: styleText("blue", S_INFO) });
  },
  success: (s, e) => {
    log.message(s, { ...e, symbol: styleText("green", S_SUCCESS) });
  },
  step: (s, e) => {
    log.message(s, { ...e, symbol: styleText("green", S_STEP_SUBMIT) });
  },
  warn: (s, e) => {
    log.message(s, { ...e, symbol: styleText("yellow", S_WARN) });
  },
  /** alias for `log.warn()`. */
  warning: (s, e) => {
    log.warn(s, e);
  },
  error: (s, e) => {
    log.message(s, { ...e, symbol: styleText("red", S_ERROR) });
  }
};
var cancel = (o = "", t2) => {
  const i2 = t2?.output ?? process.stdout, e = t2?.withGuide ?? settings.withGuide ? `${styleText("gray", S_BAR_END)}  ` : "";
  i2.write(`${e}${styleText("red", o)}

`);
};
var intro = (o = "", t2) => {
  const i2 = t2?.output ?? process.stdout, e = t2?.withGuide ?? settings.withGuide ? `${styleText("gray", S_BAR_START)}  ` : "";
  i2.write(`${e}${o}
`);
};
var outro = (o = "", t2) => {
  const i2 = t2?.output ?? process.stdout, e = t2?.withGuide ?? settings.withGuide ? `${styleText("gray", S_BAR)}
${styleText("gray", S_BAR_END)}  ` : "";
  i2.write(`${e}${o}

`);
};
var W = (o) => o;
var C2 = (o, e, s) => {
  const a2 = {
    hard: true,
    trim: false
  }, i2 = wrapAnsi(o, e, a2).split(`
`), c3 = i2.reduce((n3, t2) => Math.max(dist_default2(t2), n3), 0), u3 = i2.map(s).reduce((n3, t2) => Math.max(dist_default2(t2), n3), 0), g = e - (u3 - c3);
  return wrapAnsi(o, g, a2);
};
var note = (o = "", e = "", s) => {
  const a2 = s?.output ?? process$1.stdout, i2 = s?.withGuide ?? settings.withGuide, c3 = s?.format ?? W, g = ["", ...C2(o, getColumns(a2) - 6, c3).split(`
`).map(c3), ""], n3 = dist_default2(e), t2 = Math.max(
    g.reduce((m2, F2) => {
      const O = dist_default2(F2);
      return O > m2 ? O : m2;
    }, 0),
    n3
  ) + 2, h2 = g.map(
    (m2) => `${styleText("gray", S_BAR)}  ${m2}${" ".repeat(t2 - dist_default2(m2))}${styleText("gray", S_BAR)}`
  ).join(`
`), T = i2 ? `${styleText("gray", S_BAR)}
` : "", l$1 = i2 ? S_CONNECT_LEFT : S_CORNER_BOTTOM_LEFT;
  a2.write(
    `${T}${styleText("green", S_STEP_SUBMIT)}  ${styleText("reset", e)} ${styleText(
      "gray",
      S_BAR_H.repeat(Math.max(t2 - n3 - 1, 1)) + S_CORNER_TOP_RIGHT
    )}
${h2}
${styleText("gray", l$1 + S_BAR_H.repeat(t2 + 2) + S_CORNER_BOTTOM_RIGHT)}
`
  );
};
var Y = 3e4;
var Z = (c3) => styleText("magenta", c3);
var spinner = ({
  indicator: c3 = "dots",
  onCancel: b,
  output: n3 = process.stdout,
  cancelMessage: _,
  errorMessage: C3,
  frames: M = unicode ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"],
  delay: O = unicode ? 80 : 120,
  signal: g,
  ...E
} = {}) => {
  const u3 = isCI(), h2 = isAccessible(E.accessible);
  let x, I, p = false, l = false, r2 = "", v, w = performance.now();
  const y = getColumns(n3), F2 = E?.styleFrame ?? Z, S = (e) => {
    const s = e > 1 ? C3 ?? settings.messages.error : _ ?? settings.messages.cancel;
    l = e === 1, p && (m2(s, e), l && typeof b == "function" && b());
  }, $ = () => S(2), a2 = () => S(1), H2 = () => {
    process.on("uncaughtExceptionMonitor", $), process.on("unhandledRejection", $), process.on("SIGINT", a2), process.on("SIGTERM", a2), process.on("exit", S), g && g.addEventListener("abort", a2);
  }, B = () => {
    process.removeListener("uncaughtExceptionMonitor", $), process.removeListener("unhandledRejection", $), process.removeListener("SIGINT", a2), process.removeListener("SIGTERM", a2), process.removeListener("exit", S), g && g.removeEventListener("abort", a2);
  }, R2 = () => {
    if (v === void 0) return;
    u3 && n3.write(`
`);
    const s = wrapAnsi(v, y, {
      hard: true,
      trim: false
    }).split(`
`);
    s.length > 1 && n3.write(cursor.up(s.length - 1)), n3.write(cursor.to(0)), n3.write(erase.down());
  }, L = (e) => e.replace(/\.+$/, ""), T = (e) => {
    const s = (performance.now() - e) / 1e3, i2 = Math.floor(s / 60), t2 = Math.floor(s % 60);
    return i2 > 0 ? `[${i2}m ${t2}s]` : `[${t2}s]`;
  }, N = E.withGuide ?? settings.withGuide, P = (e = "") => {
    if (p = true, l = false, r2 = L(e), w = performance.now(), H2(), h2) {
      r2 !== "" && n3.write(`${r2}
`), I = setInterval(() => {
        n3.write(r2 === "" ? `still working
` : `still working: ${r2}
`);
      }, Y);
      return;
    }
    x = block({ output: n3 }), N && n3.write(`${styleText("gray", S_BAR)}
`);
    let s = 0, i2 = 0;
    I = setInterval(() => {
      if (u3 && r2 === v)
        return;
      R2(), v = r2;
      const t2 = F2(M[s]);
      let o;
      if (u3)
        o = `${t2}  ${r2}...`;
      else if (c3 === "timer")
        o = `${t2}  ${r2} ${T(w)}`;
      else {
        const j2 = ".".repeat(Math.floor(i2)).slice(0, 3);
        o = `${t2}  ${r2}${j2}`;
      }
      const D = wrapAnsi(o, y, {
        hard: true,
        trim: false
      });
      n3.write(D), s = s + 1 < M.length ? s + 1 : 0, i2 = i2 < 4 ? i2 + 0.125 : 0;
    }, O);
  }, m2 = (e = "", s = 0, i2 = false) => {
    if (p) {
      if (p = false, l = s === 1, clearInterval(I), h2 || R2(), r2 = e ?? r2, !i2)
        if (h2) {
          const t2 = s === 1 ? _ ?? settings.messages.cancel : s === 2 ? C3 ?? settings.messages.error : "Done", o = r2 || t2;
          c3 === "timer" ? n3.write(`${o} ${T(w)}
`) : n3.write(`${o}
`);
        } else {
          const t2 = s === 0 ? styleText("green", S_STEP_SUBMIT) : s === 1 ? styleText("red", S_STEP_CANCEL) : styleText("red", S_STEP_ERROR);
          c3 === "timer" ? n3.write(`${t2}  ${r2} ${T(w)}
`) : n3.write(`${t2}  ${r2}
`);
        }
      B(), x?.();
    }
  };
  return {
    start: P,
    stop: (e = "") => m2(e, 0),
    message: (e = "") => {
      r2 = L(e ?? r2);
    },
    cancel: (e = "") => m2(e, 1),
    error: (e = "") => m2(e, 2),
    clear: () => m2("", 0, true),
    get isCancelled() {
      return l;
    }
  };
};
var u2 = {
  light: unicodeOr("\u2500", "-"),
  heavy: unicodeOr("\u2501", "="),
  block: unicodeOr("\u2588", "#")
};
var SELECT_INSTRUCTIONS = [
  `${styleText("dim", "\u2191/\u2193")} to navigate`,
  `${styleText("dim", "Enter:")} confirm`
];
var c2 = (t2, o) => t2.includes(`
`) ? t2.split(`
`).map((d) => o(d)).join(`
`) : o(t2);
var select = (t2) => {
  const o = (n3, m2) => {
    if (n3 === void 0)
      return "";
    const s = n3.label ?? String(n3.value);
    switch (m2) {
      case "disabled":
        return `${styleText("gray", S_RADIO_INACTIVE)} ${c2(s, (i2) => styleText("gray", i2))}${n3.hint ? ` ${styleText("dim", `(${n3.hint ?? "disabled"})`)}` : ""}`;
      case "selected":
        return `${c2(s, (i2) => styleText("dim", i2))}`;
      case "active":
        return `${styleText("green", S_RADIO_ACTIVE)} ${s}${n3.hint ? ` ${styleText("dim", `(${n3.hint})`)}` : ""}`;
      case "cancelled":
        return `${c2(s, (i2) => styleText(["strikethrough", "dim"], i2))}`;
      default:
        return `${styleText("dim", S_RADIO_INACTIVE)} ${c2(s, (i2) => styleText("dim", i2))}`;
    }
  }, d = t2.showInstructions ?? true;
  return new n$1({
    options: t2.options,
    signal: t2.signal,
    input: t2.input,
    output: t2.output,
    initialValue: t2.initialValue,
    render() {
      const n3 = t2.withGuide ?? settings.withGuide, m2 = `${symbol(this.state)}  `, s = `${symbolBar(this.state)}  `, i2 = wrapTextWithPrefix(
        t2.output,
        t2.message,
        s,
        m2
      ), u3 = `${n3 ? `${styleText("gray", S_BAR)}
` : ""}${i2}
`;
      switch (this.state) {
        case "submit": {
          const r2 = n3 ? `${styleText("gray", S_BAR)}  ` : "", a2 = wrapTextWithPrefix(
            t2.output,
            o(this.options[this.cursor], "selected"),
            r2
          );
          return `${u3}${a2}`;
        }
        case "cancel": {
          const r2 = n3 ? `${styleText("gray", S_BAR)}  ` : "", a2 = wrapTextWithPrefix(
            t2.output,
            o(this.options[this.cursor], "cancelled"),
            r2
          );
          return `${u3}${a2}${n3 ? `
${styleText("gray", S_BAR)}` : ""}`;
        }
        default: {
          const r2 = n3 ? `${styleText("cyan", S_BAR)}  ` : "", a2 = u3.split(`
`).length, p = d ? formatInstructionFooter(t2.output, SELECT_INSTRUCTIONS, n3) : n3 ? [styleText("cyan", S_BAR_END)] : [], f = p.join(`
`), b = p.length + 1;
          return `${u3}${r2}${limitOptions({
            output: t2.output,
            cursor: this.cursor,
            options: this.options,
            maxItems: t2.maxItems,
            columnPadding: r2.length,
            rowPadding: a2 + b,
            style: (g, x) => o(g, g.disabled ? "disabled" : x ? "active" : "inactive")
          }).join(`
${r2}`)}
${f}
`;
        }
      }
    }
  }).prompt();
};
var i = `${styleText("gray", S_BAR)}  `;

// src/cli.js
var import_picocolors2 = __toESM(require_picocolors(), 1);

// src/logo.js
var LOGO = [
  " \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2588\u2588\u2588\u2557  ",
  "\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2554\u2550\u2550\u255D  ",
  "\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2551 \u255A\u2550\u255D \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u2550\u2550\u255D\u255A\u2550\u255D\u255A\u2550\u255D     \u255A\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D   \u255A\u2550\u255D   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D"
];
var W2 = LOGO[0].length;
var TAG = "V I D E O   P R O";
var CREDIT = "By @joao_lopes";
var SUB = "narra\xE7\xE3o  \u2192  v\xEDdeo animado  \xB7  multi-harness";
var STOPS = [
  [124, 58, 237],
  [219, 39, 119],
  [249, 115, 22],
  [250, 204, 21]
];
var ESC3 = "\x1B[";
var rgb = ([r2, g, b]) => `${ESC3}38;2;${r2};${g};${b}m`;
var RESET = `${ESC3}0m`;
var DIM = `${ESC3}2m`;
var BOLD = `${ESC3}1m`;
var sleep = (ms) => new Promise((r2) => setTimeout(r2, ms));
function lerp(a2, b, t2) {
  return a2.map((v, i2) => Math.round(v + (b[i2] - v) * t2));
}
function grad(t2) {
  const x = Math.min(0.9999, Math.max(0, t2)) * (STOPS.length - 1);
  const i2 = Math.floor(x);
  return lerp(STOPS[i2], STOPS[i2 + 1], x - i2);
}
function mix(c3, w) {
  return lerp(c3, [255, 255, 255], w);
}
var colorOK = () => process.stdout.isTTY && !process.env.NO_COLOR && process.env.TERM !== "dumb";
function paintLine(line, revealCol, shineCol) {
  let out = "";
  for (let x = 0; x < line.length; x++) {
    const ch = line[x];
    if (x > revealCol) {
      out += " ";
      continue;
    }
    if (ch === " ") {
      out += " ";
      continue;
    }
    let c3 = grad(x / W2);
    if (ch !== "\u2588") c3 = lerp(c3, [40, 40, 60], 0.45);
    const dPlay = revealCol - x;
    if (dPlay >= 0 && dPlay < 3) c3 = mix(c3, 0.85 - dPlay * 0.25);
    if (shineCol != null) {
      const d = Math.abs(x - shineCol);
      if (d < 6) c3 = mix(c3, (1 - d / 6) * 0.7);
    }
    out += rgb(c3) + ch;
  }
  return out + RESET;
}
function filmStrip(offset) {
  const holes = "\u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE \u25AE ";
  const s = (holes + holes).slice(offset % 2, offset % 2 + W2);
  return DIM + rgb([120, 110, 160]) + s + RESET;
}
function playerBar(p) {
  const len = W2 - 16;
  const pos = Math.round(p * len);
  let bar = "";
  for (let i2 = 0; i2 < len; i2++) {
    if (i2 < pos) bar += rgb(grad(i2 / len)) + "\u2501";
    else if (i2 === pos) bar += rgb([255, 255, 255]) + "\u25CF";
    else bar += DIM + rgb([90, 90, 110]) + "\u2500" + RESET;
  }
  const secs = (n3) => `00:${String(n3).padStart(2, "0")}`;
  const icon = p >= 1 ? "\u25A0" : "\u25B6";
  return `${rgb([255, 255, 255])}${icon}${RESET} ${bar}${RESET} ${DIM}${secs(Math.round(p * 7))}/${secs(7)}${RESET}`;
}
function frame({ reveal, shine, strip, progress, tagChars }) {
  const lines = [];
  lines.push(filmStrip(strip));
  for (const l of LOGO) lines.push(paintLine(l, reveal, shine));
  lines.push(filmStrip(strip + 1));
  const pad = Math.floor((W2 - TAG.length) / 2);
  const tag = TAG.slice(0, tagChars);
  const credit = CREDIT.slice(0, Math.max(0, Math.round(tagChars / TAG.length * CREDIT.length)));
  const gap = W2 - pad - TAG.length - CREDIT.length;
  lines.push(" ".repeat(pad) + BOLD + rgb(grad(0.6)) + tag + RESET + " ".repeat(TAG.length - tag.length + gap + CREDIT.length - credit.length) + DIM + rgb([200, 190, 230]) + credit + RESET);
  const sp = Math.floor((W2 - SUB.length) / 2);
  lines.push(" ".repeat(sp) + DIM + (tagChars >= TAG.length ? SUB : " ".repeat(SUB.length)) + RESET);
  lines.push(playerBar(progress));
  return lines;
}
var MARGIN = "  ";
var compact = false;
function compactFrame({ reveal, progress, tagChars }) {
  const word = "A N I M A T E";
  const n3 = Math.round(reveal / W2 * word.length);
  let logo = "";
  for (let i2 = 0; i2 < word.length; i2++) {
    logo += i2 < n3 ? BOLD + rgb(grad(i2 / word.length)) + word[i2] : " ";
  }
  const tag = TAG.slice(0, tagChars);
  const len = 24;
  const pos = Math.round(progress * len);
  let bar = "";
  for (let i2 = 0; i2 < len; i2++) bar += i2 < pos ? rgb(grad(i2 / len)) + "\u2501" : DIM + "\u2500" + RESET;
  return [
    "",
    logo + RESET,
    rgb(grad(0.6)) + tag + RESET,
    DIM + (tagChars >= TAG.length ? CREDIT : "") + RESET,
    bar + RESET
  ];
}
function draw(lines) {
  const out = lines.map((l) => `${ESC3}2K${MARGIN}${l}`).join("\n");
  process.stdout.write(`${ESC3}H${out}
`);
}
var F = (o) => compact ? compactFrame(o) : frame(o);
async function playIntro({ animate = true } = {}) {
  if (!colorOK()) {
    const pad = Math.floor((W2 - TAG.length) / 2);
    console.log("\n" + LOGO.join("\n") + "\n" + " ".repeat(pad) + TAG + CREDIT.padStart(W2 - pad - TAG.length) + "\n   " + SUB + "\n");
    return;
  }
  compact = (process.stdout.columns || 80) < W2 + MARGIN.length + 4;
  const hide = () => process.stdout.write(`${ESC3}?25l`);
  const show = () => process.stdout.write(`${ESC3}?25h`);
  const restore = () => {
    show();
    process.stdout.write("\n");
    process.exit(130);
  };
  process.once("SIGINT", restore);
  process.stdout.write(`${ESC3}2J${ESC3}3J${ESC3}H`);
  hide();
  try {
    if (!animate) {
      draw(F({ reveal: W2, shine: null, strip: 0, progress: 1, tagChars: TAG.length }));
      return;
    }
    const steps2 = 45;
    for (let i2 = 0; i2 <= steps2; i2++) {
      const t2 = i2 / steps2;
      const ease = 1 - Math.pow(1 - t2, 3);
      draw(F({ reveal: Math.round(ease * (W2 + 2)), shine: null, strip: i2, progress: t2 * 0.35, tagChars: 0 }));
      await sleep(26);
    }
    for (let s = -6, k = 0; s <= W2 + 6; s += 2, k++) {
      draw(F({ reveal: W2, shine: s, strip: steps2 + k, progress: 0.35 + (s + 6) / (W2 + 12) * 0.4, tagChars: Math.min(TAG.length, k) }));
      await sleep(24);
    }
    for (let p = 0.75; p <= 1.0001; p += 0.025) {
      draw(F({ reveal: W2, shine: null, strip: 0, progress: Math.min(1, p), tagChars: TAG.length }));
      await sleep(28);
    }
    await sleep(450);
  } finally {
    show();
    process.removeListener("SIGINT", restore);
  }
}
var REEL_FRAMES = ["\u25D0", "\u25D3", "\u25D1", "\u25D2"];

// src/harnesses.js
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
var H = os.homedir();
var j = (...p) => path.join(...p);
var HARNESSES = [
  {
    id: "claude-code",
    label: "Claude Code",
    global: [j(H, ".claude", "skills")],
    project: [".claude/skills"],
    detect: [j(H, ".claude")],
    invoke: "/animate-video-pro"
  },
  {
    id: "codex",
    label: "OpenAI Codex (CLI, IDE e app)",
    global: [j(H, ".codex", "skills")],
    project: [".agents/skills"],
    detect: [j(H, ".codex")],
    invoke: "$animate-video-pro"
  },
  {
    id: "antigravity",
    label: "Google Antigravity",
    // App atual: ~/.gemini/config/skills · CLI: ~/.gemini/antigravity-cli/skills
    // Legado: ~/.gemini/antigravity/skills (gravado só se a pasta já existir)
    global: [j(H, ".gemini", "config", "skills"), j(H, ".gemini", "antigravity-cli", "skills")],
    legacyGlobal: [j(H, ".gemini", "antigravity", "skills")],
    project: [".agents/skills"],
    detect: [j(H, ".gemini", "antigravity"), j(H, ".gemini", "config"), j(H, ".gemini", "antigravity-cli")],
    invoke: "/animate-video-pro"
  },
  {
    id: "gemini-cli",
    label: "Gemini CLI",
    global: [j(H, ".gemini", "skills")],
    project: [".gemini/skills"],
    detect: [j(H, ".gemini")],
    invoke: "animate-video-pro"
  },
  {
    id: "cursor",
    label: "Cursor",
    global: [j(H, ".cursor", "skills")],
    project: [".cursor/skills"],
    detect: [j(H, ".cursor")],
    invoke: "/animate-video-pro"
  },
  {
    id: "opencode",
    label: "OpenCode",
    global: [j(H, ".config", "opencode", "skills")],
    project: [".opencode/skills"],
    detect: [j(H, ".config", "opencode")],
    invoke: "animate-video-pro"
  },
  {
    id: "copilot",
    label: "GitHub Copilot",
    global: [j(H, ".copilot", "skills")],
    project: [".github/skills"],
    detect: [j(H, ".copilot")],
    invoke: "/animate-video-pro"
  },
  {
    id: "universal",
    label: "Pasta universal ~/.agents/skills (Amp, Cline, Droid, Pi\u2026)",
    global: [j(H, ".agents", "skills")],
    project: [".agents/skills"],
    detect: [j(H, ".agents")],
    invoke: "animate-video-pro"
  }
];
var byId = (id) => HARNESSES.find((h2) => h2.id === id);
function detectInstalled() {
  return HARNESSES.filter((h2) => h2.id !== "universal" && h2.detect.some((d) => fs.existsSync(d))).map((h2) => h2.id);
}
function targetsFor(harness, scope, cwd = process.cwd()) {
  if (scope === "project") return harness.project.map((p) => path.resolve(cwd, p));
  const extra = (harness.legacyGlobal || []).filter((p) => fs.existsSync(path.dirname(p)));
  return [...harness.global, ...extra];
}

// src/options.js
var FORMATS = [
  { id: "9:16", w: 1080, h: 1920, label: "9:16  Vertical", hint: "Reels \xB7 Shorts \xB7 TikTok \xB7 Status" },
  { id: "1:1", w: 1080, h: 1080, label: "1:1   Quadrado", hint: "Feed Instagram/Facebook \xB7 LinkedIn" },
  { id: "4:5", w: 1080, h: 1350, label: "4:5   Retrato", hint: "Feed Instagram (ocupa mais tela)" },
  { id: "3:4", w: 1080, h: 1440, label: "3:4   Retrato", hint: "Feed novo do Instagram" },
  { id: "16:9", w: 1920, h: 1080, label: "16:9  Horizontal", hint: "YouTube \xB7 site \xB7 apresenta\xE7\xE3o" },
  { id: "4:3", w: 1440, h: 1080, label: "4:3   Cl\xE1ssico", hint: "Telas e TVs antigas" }
];
var FPS = [
  { value: 30, label: "30 fps", hint: "padr\xE3o, mais leve" },
  { value: 60, label: "60 fps", hint: "movimento mais suave" },
  { value: 24, label: "24 fps", hint: "visual de cinema" }
];
var RENDERERS = [
  { value: "remotion", label: "Remotion", hint: "padr\xE3o do scaffold \xB7 conferir licen\xE7a comercial" },
  { value: "hyperframes", label: "Hyperframes", hint: "HTML/GSAP \xB7 Apache 2.0 \xB7 Node 22+" },
  { value: "auto", label: "Deixar o agente decidir", hint: "escolhe por projeto" }
];
var MODULE_PACKS = [
  { value: "essencial", label: "Essencial", hint: "WhisperX + FFmpeg + renderizador" },
  { value: "visual", label: "Visual", hint: "+ YuNet, MediaPipe, BEN2, Depth Anything" },
  { value: "completo", label: "Completo", hint: "+ SAM 2, Demucs, PySceneDetect, CLAP (GPU recomendada)" }
];
var PACK_MODULES = {
  essencial: [],
  visual: ["yunet", "mediapipe", "ben2", "depth-anything"],
  completo: ["yunet", "mediapipe", "ben2", "depth-anything", "sam2", "demucs", "pyscenedetect", "clap"]
};
var fmt = (id) => FORMATS.find((f) => f.id === id);

// src/install.js
import fs2 from "node:fs";
import os2 from "node:os";
import path2 from "node:path";
import { fileURLToPath } from "node:url";
var SKILL_NAME = "animate-video-pro";
var PKG_ROOT = path2.resolve(path2.dirname(fileURLToPath(import.meta.url)), "..");
var SKILL_SRC = path2.join(PKG_ROOT, "skill", SKILL_NAME);
var STATE_DIR = path2.join(os2.homedir(), ".animate-video-pro");
var STATE_FILE = path2.join(STATE_DIR, "config.json");
var VERSION = JSON.parse(fs2.readFileSync(path2.join(PKG_ROOT, "package.json"), "utf8")).version;
function buildConfig(ans2) {
  const formats = ans2.formats.map((id) => {
    const f = fmt(id);
    return { ratio: f.id, width: f.w, height: f.h };
  });
  return {
    version: VERSION,
    video: {
      formats,
      primary: ans2.primary,
      fps: ans2.fps,
      codec: "h264",
      audio: "aac"
    },
    renderer: ans2.renderer,
    modules: { pack: ans2.pack, enabled: PACK_MODULES[ans2.pack] },
    installedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function readState() {
  try {
    return JSON.parse(fs2.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return { installs: [] };
  }
}
function writeState(state) {
  fs2.mkdirSync(STATE_DIR, { recursive: true });
  fs2.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}
function plan(ans2, cwd = process.cwd()) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const id of ans2.harnesses) {
    const h2 = byId(id);
    for (const root of targetsFor(h2, ans2.scope, cwd)) {
      const dest = path2.join(root, SKILL_NAME);
      const shared = seen.has(dest);
      seen.add(dest);
      out.push({ harness: h2, dest, shared, exists: fs2.existsSync(dest) });
    }
  }
  return out;
}
function installTo(dest, config2, { overwrite: overwrite2 = "backup", dryRun: dryRun2 = false } = {}) {
  let backup = null;
  if (fs2.existsSync(dest)) {
    if (overwrite2 === "skip") return { dest, skipped: true };
    if (overwrite2 === "backup" && !dryRun2) {
      backup = `${dest}.bak-${Date.now()}`;
      fs2.renameSync(dest, backup);
    } else if (overwrite2 === "replace" && !dryRun2) {
      fs2.rmSync(dest, { recursive: true, force: true });
    }
  }
  if (!dryRun2) {
    fs2.mkdirSync(path2.dirname(dest), { recursive: true });
    fs2.cpSync(SKILL_SRC, dest, { recursive: true });
    fs2.writeFileSync(path2.join(dest, "animate.config.json"), JSON.stringify(config2, null, 2) + "\n");
  }
  return { dest, backup };
}
function recordInstalls(entries, config2) {
  const state = readState();
  const map = new Map((state.installs || []).map((i2) => [i2.dest, i2]));
  for (const e of entries) map.set(e.dest, { dest: e.dest, harness: e.harness, at: (/* @__PURE__ */ new Date()).toISOString() });
  writeState({ ...state, lastConfig: config2, installs: [...map.values()] });
}
function uninstallAll({ dryRun: dryRun2 = false } = {}) {
  const state = readState();
  const removed = [];
  for (const i2 of state.installs || []) {
    const md = path2.join(i2.dest, "SKILL.md");
    const ok = path2.basename(i2.dest) === SKILL_NAME && fs2.existsSync(md) && fs2.readFileSync(md, "utf8").includes(`name: ${SKILL_NAME}`);
    if (!ok) continue;
    if (!dryRun2) fs2.rmSync(i2.dest, { recursive: true, force: true });
    removed.push(i2.dest);
  }
  if (!dryRun2) writeState({ ...state, installs: [] });
  return removed;
}
var tilde = (p) => p.replace(os2.homedir(), "~");

// src/doctor.js
var import_picocolors = __toESM(require_picocolors(), 1);
import { spawnSync } from "node:child_process";
import fs3 from "node:fs";
function run(cmd2, args) {
  try {
    const r2 = spawnSync(cmd2, args, { encoding: "utf8", shell: process.platform === "win32" });
    if (r2.status !== 0 && !r2.stdout) return null;
    return (r2.stdout || r2.stderr || "").split("\n")[0].trim();
  } catch {
    return null;
  }
}
var ver = (s) => s && s.match(/(\d+)\.(\d+)(?:\.(\d+))?/) || null;
function checks() {
  const node = process.versions.node;
  const nMaj = Number(node.split(".")[0]);
  const py = run("python3", ["--version"]) || run("python", ["--version"]);
  const pv = ver(py);
  const pyOk = pv && (Number(pv[1]) > 3 || Number(pv[1]) === 3 && Number(pv[2]) >= 10);
  const ff = run("ffmpeg", ["-version"]);
  const fp = run("ffprobe", ["-version"]);
  const gpu = run("nvidia-smi", ["--query-gpu=name", "--format=csv,noheader"]);
  const mps = process.platform === "darwin" && process.arch === "arm64";
  return [
    { name: "Node.js", ok: nMaj >= 20, warn: nMaj >= 20 && nMaj < 22, info: `v${node}${nMaj < 22 ? " (Hyperframes pede 22+)" : ""}`, need: true },
    { name: "npm", ok: !!run("npm", ["-v"]), info: run("npm", ["-v"]) || "n\xE3o encontrado", need: true },
    { name: "Python 3.10+", ok: !!pyOk, info: py || "n\xE3o encontrado", need: true },
    { name: "FFmpeg", ok: !!ff, info: ff ? ff.replace("ffmpeg version ", "").split(" ")[0] : "n\xE3o encontrado", need: true },
    { name: "FFprobe", ok: !!fp, info: fp ? "ok" : "n\xE3o encontrado", need: true },
    { name: "Git", ok: !!run("git", ["--version"]), info: run("git", ["--version"]) || "n\xE3o encontrado", need: false },
    { name: "GPU", ok: !!gpu || mps, info: gpu || (mps ? "Apple Silicon (MPS)" : "s\xF3 CPU, m\xF3dulos pesados ficam lentos"), need: false }
  ];
}
function printDoctor() {
  const rows = checks();
  console.log("\n" + import_picocolors.default.bold("  Diagn\xF3stico do ambiente") + "\n");
  for (const r2 of rows) {
    const mark = r2.ok ? r2.warn ? import_picocolors.default.yellow("\u25B2") : import_picocolors.default.green("\u2714") : r2.need ? import_picocolors.default.red("\u2716") : import_picocolors.default.yellow("\u25B2");
    console.log(`  ${mark} ${r2.name.padEnd(14)} ${import_picocolors.default.dim(r2.info)}`);
  }
  const st = readState();
  console.log("\n" + import_picocolors.default.bold("  Instala\xE7\xF5es registradas") + "\n");
  if (!st.installs?.length) console.log(import_picocolors.default.dim("  nenhuma"));
  for (const i2 of st.installs || []) {
    const ok = fs3.existsSync(i2.dest);
    console.log(`  ${ok ? import_picocolors.default.green("\u25CF") : import_picocolors.default.red("\u25CB")} ${import_picocolors.default.cyan(i2.harness.padEnd(12))} ${tilde(i2.dest)}`);
  }
  const missing = rows.filter((r2) => r2.need && !r2.ok);
  console.log(
    "\n" + (missing.length ? import_picocolors.default.yellow(`  Faltando: ${missing.map((m2) => m2.name).join(", ")}. O agente tenta instalar no runtime isolado na primeira produ\xE7\xE3o.`) : import_picocolors.default.green("  Tudo pronto para produzir v\xEDdeos.")) + "\n"
  );
  return missing.length === 0;
}

// src/cli.js
var argv = process.argv.slice(2);
var cmd = argv[0] && !argv[0].startsWith("-") ? argv[0] : "install";
var flag = (name) => {
  const hit = argv.find((a2) => a2 === `--${name}` || a2.startsWith(`--${name}=`));
  if (!hit) return void 0;
  return hit.includes("=") ? hit.split("=").slice(1).join("=") : true;
};
var list = (v) => typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : void 0;
var HELP = `
${import_picocolors2.default.bold("@joao_lopes/animate")} v${VERSION}  ${import_picocolors2.default.dim("\xB7 Animate Video Pro")}

  ${import_picocolors2.default.cyan("npx @joao_lopes/animate install")}                    instala\xE7\xE3o interativa
  ${import_picocolors2.default.cyan("npx @joao_lopes/animate doctor")}                     confere FFmpeg, Python, Node, GPU
  ${import_picocolors2.default.cyan("npx @joao_lopes/animate list")}                       mostra onde est\xE1 instalado
  ${import_picocolors2.default.cyan("npx @joao_lopes/animate uninstall")}                  remove as instala\xE7\xF5es registradas

  Modo direto (sem perguntas, bom para CI):
    --yes                       aceita os padr\xF5es
    --harness=claude-code,codex ${import_picocolors2.default.dim(HARNESSES.map((h2) => h2.id).join(" | "))}
    --scope=global|project
    --formats=9:16,16:9         ${import_picocolors2.default.dim(FORMATS.map((f) => f.id).join(" | "))}
    --primary=9:16              formato padr\xE3o
    --fps=30  --renderer=remotion|hyperframes|auto  --modules=essencial|visual|completo
    --overwrite=backup|replace|skip   --dry-run   --no-anim
`;
var brand = (s, t2 = 0.5) => colorOK() ? rgb(grad(t2)) + s + RESET : s;
var bail = (v) => {
  if (isCancel(v)) {
    cancel("Instala\xE7\xE3o cancelada. Nada foi alterado.");
    process.exit(0);
  }
  return v;
};
if (flag("help") || cmd === "help") {
  console.log(HELP);
  process.exit(0);
}
if (flag("version")) {
  console.log(VERSION);
  process.exit(0);
}
if (cmd === "doctor") {
  process.exit(printDoctor() ? 0 : 1);
}
if (cmd === "list") {
  const st = readState();
  if (!st.installs?.length) console.log("Nenhuma instala\xE7\xE3o registrada.");
  for (const i2 of st.installs || []) console.log(`${i2.harness.padEnd(12)} ${tilde(i2.dest)}`);
  process.exit(0);
}
if (cmd === "uninstall") {
  const st = readState();
  if (!st.installs?.length) {
    console.log("Nada para remover.");
    process.exit(0);
  }
  if (!flag("yes")) {
    intro(brand(" Remover Animate Video Pro "));
    note(st.installs.map((i2) => `${i2.harness.padEnd(12)} ${tilde(i2.dest)}`).join("\n"), "Pastas que ser\xE3o apagadas");
    const ok = bail(await confirm({ message: "Apagar essas pastas? N\xE3o d\xE1 para desfazer.", initialValue: false, active: "Sim", inactive: "N\xE3o" }));
    if (!ok) {
      outro("Nada foi removido.");
      process.exit(0);
    }
  }
  const removed = uninstallAll({ dryRun: !!flag("dry-run") });
  console.log(`Removidas ${removed.length} pasta(s).`);
  process.exit(0);
}
if (cmd !== "install") {
  console.log(HELP);
  process.exit(1);
}
var noTTY = !process.stdin.isTTY || !process.stdout.isTTY;
if (noTTY && !flag("yes") && !flag("dry-run")) {
  console.log(`
Animate Video Pro \xB7 instalador v${VERSION}

O painel de instala\xE7\xE3o precisa de um terminal de verdade, e este aqui n\xE3o \xE9
interativo (provavelmente voc\xEA rodou o comando dentro do chat de um agente).

  1) Abra o PowerShell, Windows Terminal, Terminal do macOS ou similar
  2) Rode:  npx -y github:UnnicaATM1/animate-video-pro install

Quer instalar daqui mesmo, sem o painel? Use o modo direto:

  npx -y github:UnnicaATM1/animate-video-pro install --yes --harness=claude-code,codex --formats=9:16,16:9

Op\xE7\xF5es: npx -y github:UnnicaATM1/animate-video-pro help
Nada foi instalado.`);
  process.exit(0);
}
var nonInteractive = !!flag("yes") || noTTY;
await playIntro({ animate: !flag("no-anim") && !nonInteractive });
var detected = detectInstalled();
var ans;
if (nonInteractive) {
  const formats = list(flag("formats")) || ["9:16"];
  ans = {
    harnesses: list(flag("harness")) || (detected.length ? detected : ["claude-code"]),
    scope: flag("scope") || "global",
    formats,
    primary: flag("primary") || formats[0],
    fps: Number(flag("fps") || 30),
    renderer: flag("renderer") || "remotion",
    pack: flag("modules") || "essencial"
  };
  const bad = [
    ...ans.harnesses.filter((h2) => !byId(h2)).map((h2) => `harness "${h2}"`),
    ...ans.formats.filter((f) => !fmt(f)).map((f) => `formato "${f}"`),
    ...ans.formats.includes(ans.primary) ? [] : [`primary "${ans.primary}" fora de --formats`]
  ];
  if (bad.length) {
    console.error(import_picocolors2.default.red("Valor inv\xE1lido: " + bad.join(", ")));
    process.exit(1);
  }
} else {
  intro(brand(` Animate Video Pro \xB7 instalador v${VERSION} `, 0.2));
  if (detected.length) log.info(`Encontrei no seu computador: ${detected.map((d) => import_picocolors2.default.bold(byId(d).label.split(" (")[0])).join(", ")}`);
  ans = await group(
    {
      harnesses: () => multiselect({
        message: `Em quais agentes instalar? ${import_picocolors2.default.dim("(espa\xE7o marca \xB7 enter confirma)")}`,
        options: HARNESSES.map((h2) => ({
          value: h2.id,
          label: h2.label,
          hint: detected.includes(h2.id) ? import_picocolors2.default.green("detectado") : void 0
        })),
        initialValues: detected.length ? detected : ["claude-code"],
        required: true
      }),
      scope: () => select({
        message: "Onde instalar?",
        options: [
          { value: "global", label: "Global", hint: "vale para todos os seus projetos" },
          { value: "project", label: "S\xF3 neste projeto", hint: tilde(process.cwd()) }
        ]
      }),
      formats: () => multiselect({
        message: `Quais formatos de v\xEDdeo voc\xEA usa? ${import_picocolors2.default.dim("(pode marcar v\xE1rios)")}`,
        options: FORMATS.map((f) => ({ value: f.id, label: f.label, hint: `${f.w}\xD7${f.h} \xB7 ${f.hint}` })),
        initialValues: ["9:16"],
        required: true
      }),
      primary: ({ results }) => results.formats.length === 1 ? Promise.resolve(results.formats[0]) : select({
        message: "Qual \xE9 o formato padr\xE3o quando voc\xEA n\xE3o disser nada?",
        options: results.formats.map((id) => ({ value: id, label: fmt(id).label, hint: fmt(id).hint }))
      }),
      fps: () => select({ message: "Taxa de quadros padr\xE3o", options: FPS }),
      renderer: () => select({ message: "Motor de renderiza\xE7\xE3o", options: RENDERERS }),
      pack: () => select({
        message: "Pacote de m\xF3dulos opcionais",
        options: MODULE_PACKS,
        initialValue: "visual"
      })
    },
    { onCancel: () => bail(CANCEL_SYMBOL) }
  );
}
var config = buildConfig(ans);
var steps = plan(ans);
if (!nonInteractive) {
  const summary = [
    `${import_picocolors2.default.dim("Agentes")}    ${ans.harnesses.map((h2) => byId(h2).label.split(" (")[0]).join(", ")}`,
    `${import_picocolors2.default.dim("Escopo")}     ${ans.scope === "global" ? "global" : "projeto atual"}`,
    `${import_picocolors2.default.dim("Formatos")}   ${ans.formats.map((f) => f === ans.primary ? import_picocolors2.default.bold(f + " \u2605") : f).join("  ")}`,
    `${import_picocolors2.default.dim("V\xEDdeo")}      ${ans.fps} fps \xB7 H.264/AAC \xB7 ${ans.renderer}`,
    `${import_picocolors2.default.dim("M\xF3dulos")}    ${ans.pack}`,
    "",
    ...steps.filter((s) => !s.shared).map((s) => `${s.exists ? import_picocolors2.default.yellow("\u21BB") : import_picocolors2.default.green("+")} ${tilde(s.dest)}`)
  ].join("\n");
  note(summary, "Resumo");
  const ok = bail(await confirm({ message: "Instalar agora?", active: "Sim", inactive: "N\xE3o" }));
  if (!ok) {
    cancel("Nada foi alterado.");
    process.exit(0);
  }
}
var overwrite = flag("overwrite") || "backup";
if (!nonInteractive && steps.some((s) => s.exists && !s.shared)) {
  overwrite = bail(await select({
    message: "J\xE1 existe uma instala\xE7\xE3o em alguma dessas pastas. O que fazer?",
    options: [
      { value: "backup", label: "Atualizar e guardar c\xF3pia da antiga", hint: "recomendado" },
      { value: "replace", label: "Substituir sem c\xF3pia" },
      { value: "skip", label: "Pular essas pastas" }
    ]
  }));
}
var dryRun = !!flag("dry-run");
var spin = nonInteractive ? { start: () => {
}, stop: (m2) => console.log(m2) } : spinner({ frames: REEL_FRAMES });
var done = [];
for (const s of steps) {
  if (s.shared) continue;
  spin.start(`${s.harness.label.split(" (")[0]} \u2192 ${tilde(s.dest)}`);
  await new Promise((r2) => setTimeout(r2, nonInteractive ? 0 : 180));
  try {
    const r2 = installTo(s.dest, config, { overwrite, dryRun });
    if (r2.skipped) spin.stop(`${import_picocolors2.default.yellow("pulado")}  ${tilde(s.dest)}`);
    else {
      done.push({ dest: s.dest, harness: s.harness.id });
      spin.stop(`${import_picocolors2.default.green("instalado")}  ${tilde(s.dest)}${r2.backup ? import_picocolors2.default.dim("  (c\xF3pia: " + tilde(r2.backup) + ")") : ""}`);
    }
  } catch (e) {
    spin.stop(`${import_picocolors2.default.red("falhou")}  ${tilde(s.dest)}: ${e.message}`, 1);
  }
}
if (!dryRun) recordInstalls(done, config);
var how = [...new Set(ans.harnesses)].map((id) => {
  const h2 = byId(id);
  return `${h2.label.split(" (")[0].padEnd(18)} ${import_picocolors2.default.cyan(h2.invoke)}`;
}).join("\n");
if (nonInteractive) {
  console.log(`
${done.length} pasta(s) ${dryRun ? "seriam instaladas (dry-run)" : "instaladas"}.`);
} else {
  note(`${how}

${import_picocolors2.default.dim("Mande um \xE1udio e pe\xE7a o v\xEDdeo. Os formatos escolhidos ficam em animate.config.json.")}`, "Como chamar");
  outro(`${brand("Pronto!", 0.9)} Confira o ambiente com ${import_picocolors2.default.cyan("npx @joao_lopes/animate doctor")}`);
}

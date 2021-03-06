import { User } from "node-telegram-bot-api";
import * as util from "util";
import { ObscureEntry } from "../templates";
import { texts } from "../texts";
import { randomBytes } from "crypto";

export const formatUsername = (user: User) => {
    return util.format(`%s <${user.id}>`, user.username ||
        `${user.first_name} ${user.last_name || '-'}`);
};

export const formatAnswerUnpreceded = (entry: ObscureEntry) =>
    `${entry.term} - ${entry.value}`;

export const formatAnswer = (entry: ObscureEntry) =>
    precedeChar(formatAnswerUnpreceded(entry));

export const capitalizeFirstLetter = ([...rest]) =>
    rest.shift().toLocaleUpperCase() + rest.join('');

export const capitalize: ([...st]: readonly any[]) => any = ([...st]) =>
    st.map(str => capitalizeFirstLetter(str));

export const precedeChar: (s: string) => string = (s: string) =>
    s.replace(/([_\]\[)(~>#+\-=|}{.!])/gm, `\\$1`);

export const grabUsrID: (s: string) => string = (s: string) =>
    s.slice(s.lastIndexOf('<') + 1, s.lastIndexOf('>'));

export const formatDBSize = (s: string | number) =>
    util.format(texts.dbSize, s.toString());

export const reformatStr = (s: string) =>
    s.replace("_", " ")
        .replace(/ {2,}/g, ` `)
        .replace(/([.,!?])(a-zA-Zа-яА-Я])/g, `$1 $2`);

export const reformat: ([...st]: readonly any[]) => any = ([...st]) =>
    st.map(str => reformatStr(str));

export function randomString(size = 8) {
    return randomBytes(size)
        .toString('base64')
        .slice(0, size)
}
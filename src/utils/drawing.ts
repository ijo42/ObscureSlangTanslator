import { bot } from "../app";
import Jimp from "jimp";
import { ObscureEntry } from "../templates";
import { Font } from "@jimp/plugin-print";

let template!: Jimp;
let titleFont!: Font;
let bodyFont!: Font;

export default async function setup() {
    Jimp.create("resources/template.png").then(x => template = x);
    Jimp.loadFont("resources/title.fnt").then(x => titleFont = x);
    Jimp.loadFont("resources/body.fnt").then(x => bodyFont = x);
}

export function sendPic(id: number | string, entry: ObscureEntry) {
    Jimp.create(template).then(image => {
        image.print(titleFont, 0, image.getHeight() / 10, {
            text: entry.term,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_TOP
        }, image.getWidth());

        image.print(bodyFont, 0, image.getHeight() / 3, {
            text: entry.value,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        }, image.getWidth());
        image.getBufferAsync(Jimp.MIME_PNG).then(i => bot.sendPhoto(id, i, {}))
    });
}
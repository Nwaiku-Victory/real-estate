import { config } from "../config.js";
import { position } from "./carrier.js";
import { comms } from "./comments.js";
import { rid } from "./compile.js";
import { fss } from "./fss.js";
import { program } from "./pgm.js";
import { modes } from "./ports.js";
import { rvescr } from "./removeSCR.js";
import { tgs } from "./tags.js";
import { transform } from "./translate.js";

let params = new URLSearchParams(window.location.search);
let page = params.get("page") || "index.sil";

var raw = await fss(page);
var mds = await modes(raw.text);
var psn = position(mds);
var trans = transform(psn);
var scrHide = rvescr(trans,program(trans).text)
var com = comms(scrHide);
var tg = tgs(com);
var final = rid(tg);

let allscripts = program(trans)

let distribute = {
    codes: final,
    scripts: allscripts
}


export default distribute;


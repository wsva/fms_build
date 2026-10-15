module.exports=[666680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},750227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},902157,(a,b,c)=>{b.exports=a.x("node:fs",()=>require("node:fs"))},912714,(a,b,c)=>{b.exports=a.x("node:fs/promises",()=>require("node:fs/promises"))},660526,(a,b,c)=>{b.exports=a.x("node:os",()=>require("node:os"))},254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},857764,(a,b,c)=>{b.exports=a.x("node:url",()=>require("node:url"))},522734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},446786,(a,b,c)=>{b.exports=a.x("os",()=>require("os"))},723862,a=>a.a(async(b,c)=>{try{let b=await a.y("pg-587764f78a6c7a9c");a.n(b),c()}catch(a){c(a)}},!0),784941,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6/runtime/client",()=>require("@prisma/client-2c3a283f134fdcb6/runtime/client"))},688947,(a,b,c)=>{b.exports=a.x("stream",()=>require("stream"))},687769,(a,b,c)=>{b.exports=a.x("node:events",()=>require("node:events"))},57328,(a,b,c)=>{b.exports=a.x("node:assert",()=>require("node:assert"))},500874,(a,b,c)=>{b.exports=a.x("buffer",()=>require("buffer"))},81111,(a,b,c)=>{b.exports=a.x("node:stream",()=>require("node:stream"))},449719,(a,b,c)=>{b.exports=a.x("assert",()=>require("assert"))},427699,(a,b,c)=>{b.exports=a.x("events",()=>require("events"))},406461,(a,b,c)=>{b.exports=a.x("zlib",()=>require("zlib"))},761095,(a,b,c)=>{b.exports=a.x("node:net",()=>require("node:net"))},685560,(a,b,c)=>{b.exports=a.x("node:tls",()=>require("node:tls"))},136340,(a,b,c)=>{b.exports=a.x("node:timers/promises",()=>require("node:timers/promises"))},719901,(a,b,c)=>{b.exports=a.x("dns/promises",()=>require("dns/promises"))},677652,(a,b,c)=>{b.exports=a.x("node:diagnostics_channel",()=>require("node:diagnostics_channel"))},233405,(a,b,c)=>{b.exports=a.x("child_process",()=>require("child_process"))},504446,(a,b,c)=>{b.exports=a.x("net",()=>require("net"))},524836,(a,b,c)=>{b.exports=a.x("https",()=>require("https"))},921517,(a,b,c)=>{b.exports=a.x("http",()=>require("http"))},755004,(a,b,c)=>{b.exports=a.x("tls",()=>require("tls"))},792509,(a,b,c)=>{b.exports=a.x("url",()=>require("url"))},870722,(a,b,c)=>{b.exports=a.x("tty",()=>require("tty"))},785148,(a,b,c)=>{b.exports=a.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},300748,a=>{"use strict";let b=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:?\d{2})?$/;function c(a){return a.toISOString()}function d(a){let c=a.trim();if(!c)return null;let d=b.exec(c);if(!d)return null;let[,e,f,g,h,i,j,k,l]=d,m=k?Math.floor(1e3*Number("0."+k)):0,n=Date.UTC(Number(e),Number(f)-1,Number(g),Number(h),Number(i),Number(j),m);if(l&&"Z"!==l){let a="+"===l[0]?-1:1,b=l.slice(1).replace(":","");n+=a*(60*Number(b.slice(0,2))+Number(b.slice(2,4)))*6e4}return Number.isNaN(n)?null:n}a.s(["canonicalStamp",0,function(a){let b=d(a);return null===b?a.trim():new Date(b).toISOString()},"nowRowStamp",0,function(){return c(new Date)},"parseStampMs",0,d,"rowStampAt",0,c,"stampsCmp",0,function(a,b){let c=d(a),e=d(b);return null===c||null===e?null:c<e?-1:+(c>e)}])},147352,a=>{"use strict";var b=a.i(522734),c=a.i(814747),d=a.i(785148),e=a.i(300748);function f(a){return c.default.join(a,"data.sqlite3")}let g=`
CREATE TABLE IF NOT EXISTS card (
    uuid                  TEXT PRIMARY KEY,
    question              TEXT NOT NULL,
    suggestion            TEXT NOT NULL DEFAULT '',
    answer                TEXT NOT NULL DEFAULT '',
    note                  TEXT NOT NULL DEFAULT '',
    familiarity           INTEGER NOT NULL DEFAULT 0,
    question_hash         TEXT,
    source_card_uuid      TEXT,
    source_dataset_uuid   TEXT,
    deleted_at            TEXT,
    created_at            TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at            TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_card_hash ON card(question_hash);
CREATE INDEX IF NOT EXISTS idx_card_familiarity ON card(familiarity);
CREATE INDEX IF NOT EXISTS idx_card_deleted ON card(deleted_at);
CREATE INDEX IF NOT EXISTS idx_card_source ON card(source_card_uuid);

CREATE TABLE IF NOT EXISTS card_review (
    uuid           TEXT PRIMARY KEY,
    card_uuid      TEXT NOT NULL,
    familiarity    INTEGER NOT NULL DEFAULT 0,
    interval_days  INTEGER NOT NULL DEFAULT 0,
    ease_factor    INTEGER NOT NULL DEFAULT 250,
    repetitions    INTEGER NOT NULL DEFAULT 0,
    last_review_at TEXT,
    next_review_at TEXT,
    FOREIGN KEY (card_uuid) REFERENCES card(uuid) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_review_card ON card_review(card_uuid);
CREATE INDEX IF NOT EXISTS idx_review_next ON card_review(next_review_at);

CREATE TABLE IF NOT EXISTS tag (
    uuid         TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    color        TEXT,
    deleted_at   TEXT,
    created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS card_tag (
    uuid        TEXT PRIMARY KEY,
    card_uuid   TEXT NOT NULL,
    tag_uuid    TEXT NOT NULL,
    deleted_at  TEXT,
    created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    FOREIGN KEY (card_uuid) REFERENCES card(uuid) ON DELETE CASCADE,
    FOREIGN KEY (tag_uuid) REFERENCES tag(uuid) ON DELETE CASCADE,
    UNIQUE(card_uuid, tag_uuid)
);
CREATE INDEX IF NOT EXISTS idx_card_tag_card ON card_tag(card_uuid);
CREATE INDEX IF NOT EXISTS idx_card_tag_tag ON card_tag(tag_uuid);

CREATE TABLE IF NOT EXISTS sync_state (
    dataset_uuid    TEXT PRIMARY KEY,
    last_synced_at  TEXT NOT NULL,
    clock_offset_ms INTEGER NOT NULL DEFAULT 0,
    pending_push    INTEGER NOT NULL DEFAULT 0
);
`,h=new Map;async function i(a,b){let c,d=f(a),e=h.get(d)??Promise.resolve(),g=new Promise(a=>c=a);h.set(d,e.then(()=>g)),await e;try{return await b()}finally{c(),g.then(()=>{h.get(d)===g&&h.delete(d)})}}function j(a){let c=f(a);if(!b.default.existsSync(c))return null;try{return new d.default(c,{readonly:!0,fileMustExist:!0})}catch{return null}}function k(a,b){return!!a.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(b)}a.s(["cardDbPath",0,f,"countLiveCards",0,function(a){let b=j(a);if(!b)return 0;try{if(!k(b,"card"))return 0;return b.prepare("SELECT COUNT(*) AS n FROM card WHERE deleted_at IS NULL").get().n}finally{b.close()}},"getCardTagLinks",0,function(a){let b=j(a);if(!b)return[];try{if(!k(b,"card_tag")||!k(b,"tag"))return[];return b.prepare(`SELECT ct.card_uuid, ct.tag_uuid
                 FROM card_tag ct
                 JOIN tag t ON t.uuid = ct.tag_uuid
                 WHERE ct.deleted_at IS NULL AND t.deleted_at IS NULL
                 ORDER BY ct.card_uuid ASC, ct.tag_uuid ASC`).all()}finally{b.close()}},"getChangesSince",0,function(a,b){let c=j(a);if(!c)return{cards:[],tags:[]};try{let a=(0,e.canonicalStamp)(b),d=k(c,"card"),f=k(c,"tag"),g=d?c.prepare(`SELECT uuid, question, suggestion, answer, note, familiarity, question_hash,
                            source_card_uuid, source_dataset_uuid, deleted_at, created_at, updated_at
                     FROM card WHERE updated_at > ? ORDER BY updated_at ASC`).all(a):[],h=f?c.prepare(`SELECT uuid, name, color, deleted_at, created_at, updated_at
                     FROM tag WHERE updated_at > ? ORDER BY updated_at ASC`).all(a):[];return{cards:g,tags:h}}finally{c.close()}},"openCardDb",0,function(a){let c=f(a);b.default.mkdirSync(a,{recursive:!0});let e=new d.default(c);return e.pragma("journal_mode = WAL"),e.pragma("busy_timeout = 5000"),e.exec(g),e},"openCardDbReadonly",0,j,"tableExists",0,k,"withDatasetLock",0,i])},8769,a=>{"use strict";var b=a.i(522734),c=a.i(785148),d=a.i(147352);function e(a,b,c){return a.prepare(`PRAGMA table_info(${b})`).all().some(a=>a.name===c)}async function f(a,f,g){return(0,d.withDatasetLock)(a,()=>{let h=(0,d.cardDbPath)(a);if(!b.default.existsSync(h))throw Error("Dataset database not ready");let i=new c.default(h,{fileMustExist:!0});try{if(!(0,d.tableExists)(i,"listen_subtitle_cue"))throw Error("Dataset database not ready");let a=e(i,"listen_subtitle_cue","version_created"),b=g.filter(a=>!a.deleted).map((a,b)=>({...a,order_num:b+1}));return i.transaction(()=>{i.prepare(`DELETE FROM listen_subtitle_cue WHERE subtitle_uuid = ?${a?" AND version_superseded IS NULL":""}`).run(f);let c=a?i.prepare(`INSERT INTO listen_subtitle_cue
                             (uuid, subtitle_uuid, order_num, start_ms, end_ms, content, reference, version_created)
                         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`):i.prepare(`INSERT INTO listen_subtitle_cue
                             (uuid, subtitle_uuid, order_num, start_ms, end_ms, content, reference)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`);for(let a of b)c.run(a.uuid,f,a.order_num,a.start_ms,a.end_ms,a.content,a.reference??null)})(),b.map(a=>({uuid:a.uuid,subtitle_uuid:f,order_num:a.order_num,start_ms:a.start_ms,end_ms:a.end_ms,content:a.content,reference:a.reference??null}))}finally{i.close()}})}a.s(["listCurrentCues",0,function(a,b){let c=(0,d.openCardDbReadonly)(a);if(!c)return null;try{if(!(0,d.tableExists)(c,"listen_subtitle_cue"))return null;let a=e(c,"listen_subtitle_cue","version_superseded"),f=`
            SELECT uuid, subtitle_uuid, order_num, start_ms, end_ms, content, reference
            FROM listen_subtitle_cue
            WHERE subtitle_uuid = ?${a?" AND version_superseded IS NULL":""}
            ORDER BY order_num ASC
        `;return c.prepare(f).all(b)}finally{c.close()}},"listMediaAndSubtitles",0,function(a){let b=(0,d.openCardDbReadonly)(a);if(!b)return null;try{if(!(0,d.tableExists)(b,"listen_media")||!(0,d.tableExists)(b,"listen_subtitle"))return null;let a=b.prepare("SELECT uuid, source, duration_ms FROM listen_media ORDER BY source").all(),c=b.prepare(`SELECT uuid, media_uuid, name, version, is_active
                 FROM listen_subtitle WHERE is_active = 1 ORDER BY created_at ASC`).all(),e=new Map;for(let a of c){let b=e.get(a.media_uuid)??[];b.push({...a,is_active:1===a.is_active}),e.set(a.media_uuid,b)}return{media:a.map(a=>({...a,subtitles:e.get(a.uuid)??[]}))}}finally{b.close()}},"saveCues",0,f])},474657,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(905246),f=a.i(109307),g=a.i(719406),h=a.i(103931),i=a.i(91255),j=a.i(8769),k=a.i(265365),l=a.i(713095),m=b([h,k]);async function n(){let a=await f.auth.api.getSession({headers:await (0,e.headers)()});return a?.user?.email??null}async function o(){let a=await (0,k.listMarketDatasets)(["dictation"]);return"error"===a.status?a:{status:"success",data:a.data.filter(a=>a.is_owner||"public"===a.visibility||"shared"===a.visibility&&a.is_subscribed)}}async function p(a){try{let b=await n(),c=await (0,h.gateDatasetRead)(a,b);if(!c.ok)return{status:"error",error:c.error};let d=(0,j.listMediaAndSubtitles)(c.dir);if(!d)return{status:"error",error:"Dataset database not ready"};return{status:"success",data:{dataset:(0,h.serializeDataset)(c.ds),media:d.media}}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function q(a,b){try{let c=await n(),d=await (0,h.gateDatasetRead)(a,c);if(!d.ok)return{status:"error",error:d.error};let e=(0,j.listCurrentCues)(d.dir,b);if(null===e)return{status:"error",error:"Dataset database not ready"};return{status:"success",data:e}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function r(a,b,c){try{let d=await n(),e=await (0,h.gateDatasetRead)(a,d);if(!e.ok)return{status:"error",error:e.error};if(!await (0,h.canPushDataset)(e.ds,d))return{status:"error",error:"Only the owner or a subscriber may change this dataset"};let f=(0,i.liveEditRefusal)(e.ds.journal_role);if(f)return{status:"error",error:f};let g=await (0,j.saveCues)(e.dir,b,c);return{status:"success",data:g}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}[h,k]=m.then?(await m)():m,(0,l.ensureServerEntryExports)([o,p,q,r]),(0,d.registerServerReference)(o,"0017ad55439c3ec122c59733d96b7d2d5c5adb6b53",null),(0,d.registerServerReference)(p,"403edad5735384b8aa7d2c558370945dd470da4899",null),(0,d.registerServerReference)(q,"60fc88d65da441baf7c1e37383a696626662fbcab7",null),(0,d.registerServerReference)(r,"70292ee87540c4718618d3d54b3f59cf620c08541d",null),a.s(["getDatasetDictationCues",0,q,"getDatasetDictationMedia",0,p,"listDictationDatasets",0,o,"saveDatasetDictationCues",0,r]),c()}catch(a){c(a)}},!1),325888,a=>a.a(async(b,c)=>{try{var d=a.i(483456);a.i(763003);var e=a.i(55815),f=a.i(914621);a.i(719789);var g=a.i(256315),h=a.i(474657),i=a.i(942993),j=b([d,e,f,g,h,i]);[d,e,f,g,h,i]=j.then?(await j)():j,a.s([]),c()}catch(a){c(a)}},!1),333765,a=>a.a(async(b,c)=>{try{var d=a.i(325888),e=a.i(483456),f=a.i(763003),g=a.i(55815),h=a.i(914621),i=a.i(719789),j=a.i(256315),k=a.i(474657),l=a.i(942993),m=b([d,e,g,h,j,k,l]);[d,e,g,h,j,k,l]=m.then?(await m)():m,a.s(["001381f2281abba3f8bd73b7b76ad8d61ea38a623c",()=>i.deleteAuthTokens,"0017ad55439c3ec122c59733d96b7d2d5c5adb6b53",()=>k.listDictationDatasets,"4026b0783602ef05c780b9065d6f4a8f8cffbe7f76",()=>g.generateInterviewAnswer,"4027830b4852fd97b7d2130f116aea0a6aed7ffca5",()=>j.saveRecord,"403edad5735384b8aa7d2c558370945dd470da4899",()=>k.getDatasetDictationMedia,"404c4ece9967de197c14b1d22776caa0f8c7782a10",()=>j.getPlanAll,"40530883673a1eb1170756a6729b517a2cbd3d537f",()=>h.getCardsByQuestionHashes,"4055d263a4832b99473cb2a9315aa4e460f4439598",()=>h.saveCardTag,"407998b32bef42b45bfa35ee205894ecba1f674540",()=>e.getKey,"40af407e13aab38d511c752bff2f43d6613ade00e0",()=>h.saveCard,"601a2b2c30a2bbe8e19d3f18cb9b159d4868e47439",()=>g.callSTT,"6033a80859b99cc9fa90fce0284d9da31f2ce9347c",()=>f.callSTT,"604ff96bf7cd1e2a150b78d3b38cc7e0a58a129408",()=>g.callTTS,"60fc88d65da441baf7c1e37383a696626662fbcab7",()=>k.getDatasetDictationCues,"70292ee87540c4718618d3d54b3f59cf620c08541d",()=>k.saveDatasetDictationCues,"70fe5718c3809b19b8eaf064acba1b18eb07568587",()=>l.getDictation,"7ccbbd694afe22a84fb292a0d3e934265652918e6f",()=>l.saveDictation]),c()}catch(a){c(a)}},!1),577062,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@better-auth_memory-adapter_dist_index_mjs_0ptlb60._.js"].map(b=>a.l(b))).then(()=>b(17616)))},860484,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_better-auth_dist_adapters_kysely-adapter_index_mjs_01xuj8~._.js"].map(b=>a.l(b))).then(()=>b(536063)))},580632,a=>{a.v(a=>Promise.resolve().then(()=>a(270406)))},957160,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0t6k_@better-auth_kysely-adapter_dist_bun-sqlite-dialect-DzNwOpKv_mjs_01.6sa~._.js"].map(b=>a.l(b))).then(()=>b(372467)))},908409,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@better-auth_kysely-adapter_dist_node-sqlite-dialect_mjs_0snx9-g._.js"].map(b=>a.l(b))).then(()=>b(869959)))},771115,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0_lp_modules_@better-auth_kysely-adapter_dist_d1-sqlite-dialect-C2B7YsIT_mjs_0ux35az._.js"].map(b=>a.l(b))).then(()=>b(415669)))},916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_0qpdcgw._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__0h4w4af._.js","server/chunks/ssr/[root-of-the-server]__0elika5._.js","server/chunks/ssr/[root-of-the-server]__0gv111y._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_iaj8i._.js.map
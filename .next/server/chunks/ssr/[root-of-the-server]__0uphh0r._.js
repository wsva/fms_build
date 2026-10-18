module.exports=[666680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},750227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},902157,(a,b,c)=>{b.exports=a.x("node:fs",()=>require("node:fs"))},912714,(a,b,c)=>{b.exports=a.x("node:fs/promises",()=>require("node:fs/promises"))},660526,(a,b,c)=>{b.exports=a.x("node:os",()=>require("node:os"))},254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},857764,(a,b,c)=>{b.exports=a.x("node:url",()=>require("node:url"))},446786,(a,b,c)=>{b.exports=a.x("os",()=>require("os"))},522734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},723862,a=>a.a(async(b,c)=>{try{let b=await a.y("pg-587764f78a6c7a9c");a.n(b),c()}catch(a){c(a)}},!0),784941,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6/runtime/client",()=>require("@prisma/client-2c3a283f134fdcb6/runtime/client"))},688947,(a,b,c)=>{b.exports=a.x("stream",()=>require("stream"))},500874,(a,b,c)=>{b.exports=a.x("buffer",()=>require("buffer"))},81111,(a,b,c)=>{b.exports=a.x("node:stream",()=>require("node:stream"))},427699,(a,b,c)=>{b.exports=a.x("events",()=>require("events"))},406461,(a,b,c)=>{b.exports=a.x("zlib",()=>require("zlib"))},449719,(a,b,c)=>{b.exports=a.x("assert",()=>require("assert"))},687769,(a,b,c)=>{b.exports=a.x("node:events",()=>require("node:events"))},57328,(a,b,c)=>{b.exports=a.x("node:assert",()=>require("node:assert"))},504446,(a,b,c)=>{b.exports=a.x("net",()=>require("net"))},524836,(a,b,c)=>{b.exports=a.x("https",()=>require("https"))},921517,(a,b,c)=>{b.exports=a.x("http",()=>require("http"))},755004,(a,b,c)=>{b.exports=a.x("tls",()=>require("tls"))},792509,(a,b,c)=>{b.exports=a.x("url",()=>require("url"))},870722,(a,b,c)=>{b.exports=a.x("tty",()=>require("tty"))},233405,(a,b,c)=>{b.exports=a.x("child_process",()=>require("child_process"))},761095,(a,b,c)=>{b.exports=a.x("node:net",()=>require("node:net"))},785148,(a,b,c)=>{b.exports=a.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},300748,a=>{"use strict";let b=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:?\d{2})?$/;function c(a){return a.toISOString()}function d(a){let c=a.trim();if(!c)return null;let d=b.exec(c);if(!d)return null;let[,e,f,g,h,i,j,k,l]=d,m=k?Math.floor(1e3*Number("0."+k)):0,n=Date.UTC(Number(e),Number(f)-1,Number(g),Number(h),Number(i),Number(j),m);if(l&&"Z"!==l){let a="+"===l[0]?-1:1,b=l.slice(1).replace(":","");n+=a*(60*Number(b.slice(0,2))+Number(b.slice(2,4)))*6e4}return Number.isNaN(n)?null:n}a.s(["canonicalStamp",0,function(a){let b=d(a);return null===b?a.trim():new Date(b).toISOString()},"nowRowStamp",0,function(){return c(new Date)},"parseStampMs",0,d,"rowStampAt",0,c,"stampsCmp",0,function(a,b){let c=d(a),e=d(b);return null===c||null===e?null:c<e?-1:+(c>e)}])},147352,a=>{"use strict";var b=a.i(522734),c=a.i(814747),d=a.i(785148),e=a.i(300748);function f(a){return c.default.join(a,"data.sqlite3")}let g=`
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
                     FROM tag WHERE updated_at > ? ORDER BY updated_at ASC`).all(a):[];return{cards:g,tags:h}}finally{c.close()}},"openCardDb",0,function(a){let c=f(a);b.default.mkdirSync(a,{recursive:!0});let e=new d.default(c);return e.pragma("journal_mode = WAL"),e.pragma("busy_timeout = 5000"),e.exec(g),e},"openCardDbReadonly",0,j,"tableExists",0,k,"withDatasetLock",0,i])},309431,a=>{"use strict";let b="@app";function c(a){if("number"==typeof a)return a;if("bigint"==typeof a||"string"==typeof a)return Number(a);if(a&&"object"==typeof a){let b=Number(String(a));if(Number.isFinite(b))return b}return 0}async function d(a,b){await a.$executeRaw`
        INSERT INTO app_sync_seq (cluster_id, next_seq)
        VALUES (${b}, 1)
        ON CONFLICT (cluster_id) DO NOTHING
    `;let d=await a.$queryRaw`
        UPDATE app_sync_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${b}
        RETURNING next_seq - 1 AS seq
    `;return c(d[0]?.seq)}async function e(a,b,d){await a.$executeRaw`
        INSERT INTO dataset_sync_seq (cluster_id, scope, next_seq)
        SELECT ${b}, ${d}, COALESCE(MAX(seq), 0) + 1
        FROM app_sync_log
        WHERE cluster_id = ${b} AND scope = ${d}
        ON CONFLICT (cluster_id, scope) DO NOTHING
    `;let e=await a.$queryRaw`
        UPDATE dataset_sync_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${b} AND scope = ${d}
        RETURNING next_seq - 1 AS seq
    `;return c(e[0]?.seq)}async function f(a,b,c,d,e,f,g,h,i){let j=JSON.stringify(i??null);await a.$executeRaw`
        INSERT INTO app_sync_log
            (cluster_id, seq, scope, object_id, kind, op, edit_time, user_key, payload)
        VALUES
            (${b}, ${c}, ${d}, ${e}, ${f}, ${f.endsWith("_delete")?"delete":"upsert"},
             ${g}, ${h}, ${j}::jsonb)
    `}async function g(a,b,d,e){let f=await a.$queryRaw`
        SELECT seq, edit_time, op, payload FROM app_sync_log
        WHERE cluster_id = ${b} AND scope = ${d} AND object_id = ${e}
        ORDER BY seq DESC LIMIT 1
    `;return f.length?{seq:c(f[0].seq),edit_time:f[0].edit_time,op:f[0].op,payload:f[0].payload}:null}a.s(["APP_SCOPE",0,b,"appendJournal",0,f,"changeClassOf",0,function(a){switch(a){case"cue_save":case"cue_delete":case"card_save":case"card_delete":case"card_tag_save":case"card_tag_delete":case"card_set_tags":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentences_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":case"wiki_file_save":case"wiki_file_delete":case"dictation":return"state";case"xp":return"counter";default:return"appendOnly"}},"clampEditTimeMs",0,function(a,b){return null===a?b:Math.min(a,b)},"coalescible",0,function(a){return"state"===a},"latestForObject",0,g,"lwwLoses",0,function(a,b){return null!==a&&a>=b},"nextDatasetSeq",0,e,"nextSeq",0,d,"objectIdFor",0,function(a,b,c){let d=a=>(function(a,b){if(a&&"object"==typeof a){let c=a[b];if("string"==typeof c)return c}return""})(b,a);switch(a){case"cue_save":case"card_save":case"card_tag_save":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":default:return d("uuid");case"cue_delete":return d("cue_uuid")||d("uuid");case"dictation":return`${c}:${d("media_uuid")}:${d("subtitle_uuid")}`;case"card_delete":case"card_set_tags":return d("card_uuid");case"card_review":{let a=d("event_uuid");return a?`${c}:${a}`:`${c}:${d("card_uuid")}`}case"card_tag_delete":return d("tag_uuid");case"book_sentences_save":return"";case"read_attempt_save":case"read_attempt_delete":return`${c}:${d("uuid")}`;case"wiki_file_save":case"wiki_file_delete":return d("rel_path");case"xp":return`${c}:${d("reference_id")}`}},"parseEditTime",0,function(a){let b=(a??"").trim();if(!b)return null;if(/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}/.test(b)){let a=/(Z|[+-]\d{2}:?\d{2})$/i.test(b),c=Date.parse(b.replace(" ","T")+(a?"":"Z"));return Number.isNaN(c)?null:c}let c=Date.parse(b);return Number.isNaN(c)?null:c},"scopeFor",0,function(a,c){return"dictation"===a||"xp"===a||"card_review"===a||"read_attempt_save"===a||"read_attempt_delete"===a?b:c},"toNum",0,c])},390028,a=>a.a(async(b,c)=>{try{a.i(719789);var d=a.i(353045);a.i(763003);var e=a.i(55815),f=a.i(914621),g=a.i(256315),h=a.i(694295),i=b([d,e,f,g,h]);[d,e,f,g,h]=i.then?(await i)():i,a.s([]),c()}catch(a){c(a)}},!1),986776,a=>a.a(async(b,c)=>{try{var d=a.i(390028),e=a.i(719789),f=a.i(353045),g=a.i(763003),h=a.i(55815),i=a.i(914621),j=a.i(256315),k=a.i(694295),l=b([d,f,h,i,j,k]);[d,f,h,i,j,k]=l.then?(await l)():l,a.s(["00ac9ad5577ec20f24c84445061a6a1c05888b3cff",()=>e.deleteAuthTokens,"405b3835c2fbbf5443b6492f711d4b4761dd0e856d",()=>k.getPendingProposals,"405b832c4b32233e3a85de571c5a34d41c86542b32",()=>k.getCardEditor,"407342a915e549dd6234b52803134d2d1d3a0fc75b",()=>f.getKey,"407cb820d64b17c68388821bb8d082149977ed4389",()=>k.getProposalOutcomes,"40954911e1aa373f0768558b50df52b6aa3a93154b",()=>i.getCardsByQuestionHashes,"40a170de642401ef793c2666f9f73d74696f763462",()=>j.getPlanAll,"40a663309b963214af65534dd3de785c9677e80acb",()=>i.saveCardTag,"40ca8ed8760f19e45a35371dc4c58632b603a65216",()=>i.saveCard,"40ed4086c900f623fcde46d3f73d8ebe9591f51d6a",()=>j.saveRecord,"40f45dc6b1c45a61434d6053631fa0fe1fb2f9d889",()=>h.generateInterviewAnswer,"606cce290f9d0ec869aff476b128b890887575a37f",()=>g.callSTT,"607a843be325b23c1ed2a9535cf386398e9f5cd3b2",()=>h.callTTS,"60e06c3a27fc5453e1179952efad11d4f20d7b3042",()=>h.callSTT,"70073efa5ca5a3cfa099dff882abd22f052576e3fb",()=>k.proposeDeleteTag,"703eebb523d33b13ae0cf83fbefaae7c1e3ea64fb1",()=>k.proposeSaveTag,"70b4acba6a3392a49149672169dd778db082e5b8c8",()=>k.proposeSaveCard,"70c1b70cb1893979524ef89edb57c21d41382678fa",()=>k.proposeDeleteCard,"786335bbec2def19e4226b034762920408d992a503",()=>k.proposeSetCardTags]),c()}catch(a){c(a)}},!1),577062,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@better-auth_memory-adapter_dist_index_mjs_0ptlb60._.js"].map(b=>a.l(b))).then(()=>b(17616)))},860484,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_better-auth_dist_adapters_kysely-adapter_index_mjs_01xuj8~._.js"].map(b=>a.l(b))).then(()=>b(536063)))},580632,a=>{a.v(a=>Promise.resolve().then(()=>a(270406)))},957160,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0t6k_@better-auth_kysely-adapter_dist_bun-sqlite-dialect-DzNwOpKv_mjs_01.6sa~._.js"].map(b=>a.l(b))).then(()=>b(372467)))},908409,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@better-auth_kysely-adapter_dist_node-sqlite-dialect_mjs_0snx9-g._.js"].map(b=>a.l(b))).then(()=>b(869959)))},771115,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0_lp_modules_@better-auth_kysely-adapter_dist_d1-sqlite-dialect-C2B7YsIT_mjs_0ux35az._.js"].map(b=>a.l(b))).then(()=>b(415669)))},916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_0qpdcgw._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__0s_zf-7._.js","server/chunks/ssr/[root-of-the-server]__0elika5._.js","server/chunks/ssr/[root-of-the-server]__01i6~5p._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0uphh0r._.js.map
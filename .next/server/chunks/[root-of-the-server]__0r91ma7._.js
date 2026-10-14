module.exports=[86560,e=>{"use strict";var t=e.i(469719);let a=["dictation","card","book","read_aloud","wiki"],r={dictation:"dictation-v2",card:"card-v1",book:"book-v1",read_aloud:"read_aloud-v1",wiki:"wiki-v1"},i=/^[A-Za-z0-9_-]{1,100}$/,u=t.z.looseObject({visibility:t.z.string().default("private"),owner_id:t.z.string().default(""),subscribers:t.z.array(t.z.string()).default([])}),d=t.z.looseObject({spec:t.z.number().int().default(2),uuid:t.z.string(),type:t.z.enum(a),format:t.z.string(),name:t.z.string(),description:t.z.string().default(""),language:t.z.string().default(""),created_at:t.z.string().default(""),updated_at:t.z.string().default(""),sharing:u.default({visibility:"private",owner_id:"",subscribers:[]})});e.s(["DATASET_TYPES",0,a,"UUID_RE",0,i,"VISIBILITIES",0,["private","shared","public"],"parseDatasetInfoJson",0,function(e){let t;try{t=JSON.parse(e)}catch(e){return{ok:!1,error:`invalid JSON: ${e instanceof Error?e.message:String(e)}`}}return function(e){let t=d.safeParse(e);if(!t.success)return{ok:!1,error:t.error.issues.map(e=>`${e.path.join(".")}: ${e.message}`).join("; ")};let{spec:a,uuid:u,type:n,format:s,name:_,description:c,language:l,created_at:o,updated_at:p,sharing:E,...T}=t.data;return i.test(u)?_?s!==r[n]?{ok:!1,error:`format "${s}" does not match type "${n}" (expected "${r[n]}")`}:{ok:!0,info:{spec:a,uuid:u,type:n,format:s,name:_,description:c,language:l,created_at:o,updated_at:p,sharing:{visibility:E.visibility,owner_id:E.owner_id,subscribers:E.subscribers},extra:T}}:{ok:!1,error:"name is required"}:{ok:!1,error:`uuid "${u}" must match ${i}`}}(t)}])},452900,e=>{"use strict";var t=e.i(814747),a=e.i(86560);let r=process.env.DATASET_ROOT||"/fms_datasets",i=Number(process.env.MAX_DATASET_UPLOAD_MB||512);function u(e){if(!a.UUID_RE.test(e))throw Error(`invalid dataset uuid: ${JSON.stringify(e.slice(0,40))}`)}function d(e){if(!a.DATASET_TYPES.includes(e))throw Error(`invalid dataset type: ${JSON.stringify(e.slice(0,40))}`)}function n(e,a){return t.default.join(r,"_archive",e,a)}e.s(["DATASET_ROOT",0,r,"MAX_UPLOAD_MB",0,i,"archiveDir",0,n,"archivePath",0,function(e,a,r){if(u(a),d(e),!Number.isInteger(r)||r<1)throw Error("invalid dataset version");return t.default.join(n(e,a),`v${r}.tar.gz`)},"assertValidUuid",0,u,"datasetDir",0,function(e,a){return u(a),d(e),t.default.join(r,e,a)},"tmpDir",0,function(e){return u(e),t.default.join(r,"_tmp",e)}])},847115,e=>{"use strict";let t="@app";function a(e){if("number"==typeof e)return e;if("bigint"==typeof e||"string"==typeof e)return Number(e);if(e&&"object"==typeof e){let t=Number(String(e));if(Number.isFinite(t))return t}return 0}async function r(e,t){await e.$executeRaw`
        INSERT INTO app_sync_seq (cluster_id, next_seq)
        VALUES (${t}, 1)
        ON CONFLICT (cluster_id) DO NOTHING
    `;let r=await e.$queryRaw`
        UPDATE app_sync_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${t}
        RETURNING next_seq - 1 AS seq
    `;return a(r[0]?.seq)}async function i(e,t,r){await e.$executeRaw`
        INSERT INTO dataset_sync_seq (cluster_id, scope, next_seq)
        SELECT ${t}, ${r}, COALESCE(MAX(seq), 0) + 1
        FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r}
        ON CONFLICT (cluster_id, scope) DO NOTHING
    `;let i=await e.$queryRaw`
        UPDATE dataset_sync_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${t} AND scope = ${r}
        RETURNING next_seq - 1 AS seq
    `;return a(i[0]?.seq)}async function u(e,t,a,r,i,u,d,n,s){let _=JSON.stringify(s??null);await e.$executeRaw`
        INSERT INTO app_sync_log
            (cluster_id, seq, scope, object_id, kind, op, edit_time, user_key, payload)
        VALUES
            (${t}, ${a}, ${r}, ${i}, ${u}, ${u.endsWith("_delete")?"delete":"upsert"},
             ${d}, ${n}, ${_}::jsonb)
    `}async function d(e,t,r){let i=await e.$queryRaw`
        SELECT pruned_up_to FROM app_sync_prune_mark
        WHERE cluster_id = ${t} AND scope = ${r}
    `;return i.length?a(i[0].pruned_up_to):0}async function n(e,t,r){let i=await e.$queryRaw`
        SELECT COALESCE(MAX(seq), 0) AS m FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r}
    `;return a(i[0]?.m)}async function s(e,t,a){return n(e,t,a)}async function _(e,a,r){if(r===t)return 0;let i=await e.dataset.findFirst({where:{uuid:r,user_id:a,deleted:"N"},select:{journal_epoch:!0}});return i?.journal_epoch??0}async function c(e,t,r,i,u){let s=await d(e,t,r),c=i<s,l=[];if(!c)for(let d of(await e.$queryRaw`
            SELECT seq, object_id, kind, op, edit_time, user_key, payload
            FROM app_sync_log
            WHERE cluster_id = ${t} AND scope = ${r} AND seq > ${i}
            ORDER BY seq ASC
            LIMIT ${u}
        `))l.push({seq:a(d.seq),object_id:d.object_id,kind:d.kind,op:d.op,edit_time:d.edit_time,user_key:d.user_key,payload:d.payload});let o=l.length===u&&u>0&&l.length>0?l[l.length-1].seq:await n(e,t,r),p=await _(e,t,r);return{dataset_uuid:r,entries:l,pruned_up_to:s,hub_seq:o,epoch:p,resync_required:c}}async function l(e,t,r,i){let u=await e.$queryRaw`
        SELECT seq, edit_time, op, payload FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r} AND object_id = ${i}
        ORDER BY seq DESC LIMIT 1
    `;return u.length?{seq:a(u[0].seq),edit_time:u[0].edit_time,op:u[0].op,payload:u[0].payload}:null}async function o(e,t,r,i){let u=new Date(Date.now()-24*i*36e5),n=await e.$queryRaw`
        SELECT COALESCE(MAX(seq), 0) AS m FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r}
          AND kind NOT IN ('card_review', 'read_attempt_save', 'read_attempt_delete')
          AND edit_time ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}'
          AND edit_time::timestamptz < ${u}
    `,s=a(n[0]?.m);return await e.$executeRaw`
        DELETE FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r}
          AND kind NOT IN ('card_review', 'read_attempt_save', 'read_attempt_delete')
          AND edit_time ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}'
          AND edit_time::timestamptz < ${u}
    `,await e.$executeRaw`
        DELETE FROM app_applied_change
        WHERE cluster_id = ${t} AND applied_at < ${u}
    `,s>0&&await e.$executeRaw`
            INSERT INTO app_sync_prune_mark (cluster_id, scope, pruned_up_to)
            VALUES (${t}, ${r}, ${s})
            ON CONFLICT (cluster_id, scope)
            DO UPDATE SET pruned_up_to = GREATEST(app_sync_prune_mark.pruned_up_to, ${s})
        `,Math.max(s,await d(e,t,r))}let p=new Map;async function E(e,a){let r=Date.now();if(!(r-(p.get(a)??0)<864e5)){p.set(a,r);try{await e.$transaction(async e=>{for(let{scope:r}of(await e.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${a}))`,await e.$queryRaw`
                SELECT DISTINCT scope FROM app_sync_log WHERE cluster_id = ${a}
            `)){if(r!==t){let t=await e.dataset.findFirst({where:{uuid:r,user_id:a,deleted:"N"},select:{journal_role:!0}});if(!t||"authority"!==t.journal_role)continue}await o(e,a,r,30)}})}catch(e){console.warn("[sync] change-log retention sweep failed:",e)}}}e.s(["APP_SCOPE",0,t,"appendJournal",0,u,"changeClassOf",0,function(e){switch(e){case"cue_save":case"cue_delete":case"card_save":case"card_delete":case"card_tag_save":case"card_tag_delete":case"card_set_tags":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentences_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":case"wiki_file_save":case"wiki_file_delete":case"dictation":return"state";case"xp":return"counter";default:return"appendOnly"}},"clampEditTimeMs",0,function(e,t){return null===e?t:Math.min(e,t)},"coalescible",0,function(e){return"state"===e},"journalHighWater",0,s,"latestForObject",0,l,"lwwLoses",0,function(e,t){return null!==e&&e>=t},"maybePrune",0,E,"nextDatasetSeq",0,i,"nextSeq",0,r,"normalizeChange",0,function(e){let a="string"==typeof e?.id?e.id:"",r="string"==typeof e?.kind?e.kind:"",i="string"==typeof e.edit_time?e.edit_time:"";if(!a||!r)return{id:a,kind:r,missing:!0,scope:"",epoch:0,editTime:i};let u="string"==typeof e.dataset_uuid?e.dataset_uuid:"",d=Number(e.epoch);return{id:a,kind:r,missing:!1,scope:"dictation"===r||"xp"===r||"card_review"===r||"read_attempt_save"===r||"read_attempt_delete"===r?t:u,epoch:Number.isFinite(d)?Math.trunc(d):0,editTime:i}},"objectIdFor",0,function(e,t,a){let r=e=>(function(e,t){if(e&&"object"==typeof e){let a=e[t];if("string"==typeof a)return a}return""})(t,e);switch(e){case"cue_save":case"card_save":case"card_tag_save":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":default:return r("uuid");case"cue_delete":return r("cue_uuid")||r("uuid");case"dictation":return`${a}:${r("media_uuid")}:${r("subtitle_uuid")}`;case"card_delete":case"card_set_tags":return r("card_uuid");case"card_review":{let e=r("event_uuid");return e?`${a}:${e}`:`${a}:${r("card_uuid")}`}case"card_tag_delete":return r("tag_uuid");case"book_sentences_save":return"";case"read_attempt_save":case"read_attempt_delete":return`${a}:${r("uuid")}`;case"wiki_file_save":case"wiki_file_delete":return r("rel_path");case"xp":return`${a}:${r("reference_id")}`}},"parseEditTime",0,function(e){let t=(e??"").trim();if(!t)return null;if(/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}/.test(t)){let e=/(Z|[+-]\d{2}:?\d{2})$/i.test(t),a=Date.parse(t.replace(" ","T")+(e?"":"Z"));return Number.isNaN(a)?null:a}let a=Date.parse(t);return Number.isNaN(a)?null:a},"readChanges",0,c,"scopeAuthorityEpoch",0,_,"staleEpochReason",0,function(e,t,a){return`stale_epoch: presented ${e} < authority ${t} for scope '${a}'; re-pull this scope to learn the new epoch, then retry (INV-13/INV-20)`},"toNum",0,a])},785148,(e,t,a)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},640216,e=>{"use strict";let t=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:?\d{2})?$/;function a(e){return e.toISOString()}function r(e){let a=e.trim();if(!a)return null;let r=t.exec(a);if(!r)return null;let[,i,u,d,n,s,_,c,l]=r,o=c?Math.floor(1e3*Number("0."+c)):0,p=Date.UTC(Number(i),Number(u)-1,Number(d),Number(n),Number(s),Number(_),o);if(l&&"Z"!==l){let e="+"===l[0]?-1:1,t=l.slice(1).replace(":","");p+=e*(60*Number(t.slice(0,2))+Number(t.slice(2,4)))*6e4}return Number.isNaN(p)?null:p}e.s(["canonicalStamp",0,function(e){let t=r(e);return null===t?e.trim():new Date(t).toISOString()},"descriptorStamp",0,function(e){let t=r(e);return null===t?e.trim():new Date(t).toISOString().slice(0,19)+"Z"},"nowRowStamp",0,function(){return a(new Date)},"rowStampAt",0,a])},736735,e=>{"use strict";var t=e.i(522734),a=e.i(814747),r=e.i(785148),i=e.i(640216);function u(e){return a.default.join(e,"data.sqlite3")}let d=`
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
`,n=new Map;async function s(e,t){let a,r=u(e),i=n.get(r)??Promise.resolve(),d=new Promise(e=>a=e);n.set(r,i.then(()=>d)),await i;try{return await t()}finally{a(),d.then(()=>{n.get(r)===d&&n.delete(r)})}}function _(e){let a=u(e);t.default.mkdirSync(e,{recursive:!0});let i=new r.default(a);return i.pragma("journal_mode = WAL"),i.pragma("busy_timeout = 5000"),i.exec(d),i}function c(e){let a=u(e);if(!t.default.existsSync(a))return null;try{return new r.default(a,{readonly:!0,fileMustExist:!0})}catch{return null}}function l(e,t){return!!e.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(t)}function o(e,t){let a=(0,i.canonicalStamp)(e),r=(0,i.canonicalStamp)(t);return a<r?-1:+(a>r)}async function p(e,a){let i,d=u(e);if(!t.default.existsSync(d))return!1;try{i=new r.default(d,{readonly:!0,fileMustExist:!0})}catch{i=new r.default(d,{fileMustExist:!0})}try{t.default.existsSync(a)&&t.default.rmSync(a),await i.backup(a);let e=new r.default(a);try{e.pragma("journal_mode = DELETE")}finally{e.close()}return!0}finally{i.close()}}e.s(["backupDb",0,p,"cardDbPath",0,u,"countLiveCards",0,function(e){let t=c(e);if(!t)return 0;try{if(!l(t,"card"))return 0;return t.prepare("SELECT COUNT(*) AS n FROM card WHERE deleted_at IS NULL").get().n}finally{t.close()}},"countMedia",0,function(e){let t=c(e);if(!t)return 0;try{if(!l(t,"listen_media"))return 0;return t.prepare("SELECT COUNT(*) AS n FROM listen_media").get().n}finally{t.close()}},"getChangesSince",0,function(e,t){let a=c(e);if(!a)return{cards:[],tags:[]};try{let e=(0,i.canonicalStamp)(t),r=l(a,"card"),u=l(a,"tag"),d=r?a.prepare(`SELECT uuid, question, suggestion, answer, note, familiarity, question_hash,
                            source_card_uuid, source_dataset_uuid, deleted_at, created_at, updated_at
                     FROM card WHERE updated_at > ? ORDER BY updated_at ASC`).all(e):[],n=u?a.prepare(`SELECT uuid, name, color, deleted_at, created_at, updated_at
                     FROM tag WHERE updated_at > ? ORDER BY updated_at ASC`).all(e):[];return{cards:d,tags:n}}finally{a.close()}},"openCardDb",0,_,"pushChanges",0,function(e,t,a){let r=_(e);try{let e=0,u=[];return r.transaction(()=>{for(let a of t){let t=r.prepare("SELECT updated_at FROM card WHERE uuid = ?").get(a.uuid);if(t){if(0>=o(a.updated_at,t.updated_at)){u.push({uuid:a.uuid,local_updated_at:a.updated_at,remote_updated_at:t.updated_at,winner:"remote"});continue}r.prepare(`UPDATE card SET question = ?, suggestion = ?, answer = ?, note = ?,
                                familiarity = ?, question_hash = ?, source_card_uuid = ?,
                                source_dataset_uuid = ?, deleted_at = ?, updated_at = ?
                         WHERE uuid = ?`).run(a.question,a.suggestion??"",a.answer??"",a.note??"",a.familiarity??0,a.question_hash??null,a.source_card_uuid??null,a.source_dataset_uuid??null,a.deleted_at?(0,i.canonicalStamp)(a.deleted_at):null,(0,i.canonicalStamp)(a.updated_at),a.uuid)}else r.prepare(`INSERT INTO card (uuid, question, suggestion, answer, note, familiarity,
                                question_hash, source_card_uuid, source_dataset_uuid, deleted_at,
                                created_at, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(a.uuid,a.question,a.suggestion??"",a.answer??"",a.note??"",a.familiarity??0,a.question_hash??null,a.source_card_uuid??null,a.source_dataset_uuid??null,a.deleted_at?(0,i.canonicalStamp)(a.deleted_at):null,(0,i.canonicalStamp)(a.created_at)||(0,i.rowStampAt)(new Date),(0,i.canonicalStamp)(a.updated_at));e+=1}for(let t of a){let a=r.prepare("SELECT updated_at FROM tag WHERE uuid = ?").get(t.uuid);if(a){if(0>=o(t.updated_at,a.updated_at)){u.push({uuid:t.uuid,local_updated_at:t.updated_at,remote_updated_at:a.updated_at,winner:"remote"});continue}r.prepare(`UPDATE tag SET name = ?, color = ?, deleted_at = ?, updated_at = ?
                         WHERE uuid = ?`).run(t.name,t.color??null,t.deleted_at?(0,i.canonicalStamp)(t.deleted_at):null,(0,i.canonicalStamp)(t.updated_at),t.uuid)}else r.prepare(`INSERT INTO tag (uuid, name, color, deleted_at, created_at, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?)`).run(t.uuid,t.name,t.color??null,t.deleted_at?(0,i.canonicalStamp)(t.deleted_at):null,(0,i.canonicalStamp)(t.created_at)||(0,i.rowStampAt)(new Date),(0,i.canonicalStamp)(t.updated_at));e+=1}})(),{accepted:e,conflicts:u}}finally{r.close()}},"tableExists",0,l,"withDatasetLock",0,s])},571893,e=>{"use strict";var t=e.i(847115);function a(e){return e&&"object"==typeof e?e:{}}function r(e,t,i=""){let u=a(e)[t];return"string"==typeof u?u:i}function i(e,t){let r=a(e)[t];return"number"==typeof r&&Number.isFinite(r)?Math.trunc(r):"string"!=typeof r||""===r.trim()||Number.isNaN(Number(r))?null:Math.trunc(Number(r))}function u(e,t){let r=a(e)[t];return"string"==typeof r&&""!==r?r:null}async function d(e,t,d,n,s){switch(n){case"dictation":{let i=r(s,"media_uuid"),u=r(s,"subtitle_uuid"),d=r(s,"status"),n=a(s).completed,_="string"==typeof n?n:null==n?"":String(n);await e.app_dictation.upsert({where:{cluster_id_media_uuid_subtitle_uuid:{cluster_id:t,media_uuid:i,subtitle_uuid:u}},create:{cluster_id:t,media_uuid:i,subtitle_uuid:u,status:d,completed:_,edit_time:r(s,"edit_time")},update:{status:d,completed:_,edit_time:r(s,"edit_time"),updated_at:new Date}});return}case"xp":{let a=i(s,"amount")??0,u=r(s,"source","sync"),d=r(s,"reference_id"),n=r(s,"dataset_uuid");await e.app_xp_ledger.createMany({data:[{cluster_id:t,amount:BigInt(a),source:u,reference_id:d,dataset_uuid:n}],skipDuplicates:!0});return}case"card_review":{let a=r(s,"event_uuid"),n=r(s,"card_uuid");if(!n)return;await e.app_card_review_event.createMany({data:[{cluster_id:t,event_uuid:a,user_id:d||r(s,"user_id"),dataset_uuid:r(s,"dataset_uuid"),card_uuid:n,quality:i(s,"quality"),reviewed_at:u(s,"reviewed_at"),familiarity:i(s,"familiarity")??0,interval_days:i(s,"interval_days")??0,ease_factor:i(s,"ease_factor")??250,repetitions:i(s,"repetitions")??0,next_review_at:u(s,"next_review_at")}],skipDuplicates:!0});return}case"read_attempt_save":{let i,n=r(s,"uuid");if(!n)return;await e.app_read_attempt_event.createMany({data:[{cluster_id:t,uuid:n,user_id:d||r(s,"user_id"),dataset_uuid:r(s,"dataset_uuid"),text_uuid:r(s,"text_uuid"),audio_path:u(s,"audio_path"),recognized:r(s,"recognized"),score:"number"==typeof(i=a(s).score)&&Number.isFinite(i)?i:"string"!=typeof i||""===i.trim()||Number.isNaN(Number(i))?0:Number(i),created_at:r(s,"created_at")}],skipDuplicates:!0});return}case"read_attempt_delete":{let a=r(s,"uuid");if(!a)return;await e.app_read_attempt_event.deleteMany({where:{cluster_id:t,uuid:a}});return}default:return}}async function n(e,a){let r=await e.$queryRaw`
        SELECT COALESCE(SUM(amount), 0) AS total FROM app_xp_ledger WHERE cluster_id = ${a}
    `;return(0,t.toNum)(r[0]?.total)}async function s(e,t,a,r,i,u,d,s){let _=await e.app_dictation.findMany({where:{cluster_id:t,id:{gt:BigInt(r)}},orderBy:{id:"asc"},take:s}),c=await e.app_xp_ledger.findMany({where:{cluster_id:t,id:{gt:BigInt(i)}},orderBy:{id:"asc"},take:s}),l=await e.app_card_review_event.findMany({where:{cluster_id:t,id:{gt:BigInt(u)}},orderBy:{id:"asc"},take:s}),o=await e.app_read_attempt_event.findMany({where:{cluster_id:t,id:{gt:BigInt(d)}},orderBy:{id:"asc"},take:s}),p=e=>e.length===s?Number(e[e.length-1].id):null;return{user_key:a,dictation:_.map(e=>({media_uuid:e.media_uuid,subtitle_uuid:e.subtitle_uuid,status:e.status,completed:e.completed})),xp:c.map(e=>({amount:Number(e.amount),source:e.source,reference_id:e.reference_id,dataset_uuid:e.dataset_uuid})),reviews:l.map(e=>({event_uuid:e.event_uuid,user_id:e.user_id,dataset_uuid:e.dataset_uuid,card_uuid:e.card_uuid,quality:e.quality,reviewed_at:e.reviewed_at,familiarity:e.familiarity,interval_days:e.interval_days,ease_factor:e.ease_factor,repetitions:e.repetitions,next_review_at:e.next_review_at})),attempts:o.map(e=>({uuid:e.uuid,user_id:e.user_id,dataset_uuid:e.dataset_uuid,text_uuid:e.text_uuid,audio_path:e.audio_path,recognized:e.recognized,score:e.score,created_at:e.created_at})),next_dictation_after:p(_),next_xp_after:p(c),next_reviews_after:p(l),next_attempts_after:p(o),lifetime_xp:await n(e,t),generated_at:new Date().toISOString()}}e.s(["HISTORY_ROW_LIMIT",0,2e4,"applyAppChange",0,d,"assembleAppState",0,s])},916005,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_node_buffer_0063pbu._.js"].map(t=>e.l(t))).then(()=>t(951615)))},918707,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(t=>e.l(t))).then(()=>t(407142)))},480599,e=>{e.v(t=>Promise.all(["server/chunks/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(t=>e.l(t))).then(()=>t(417734)))},563921,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_@better-auth_memory-adapter_dist_index_mjs_07pm9hq._.js"].map(t=>e.l(t))).then(()=>t(268905)))},246120,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_better-auth_dist_adapters_kysely-adapter_index_mjs_0.9gz-c._.js"].map(t=>e.l(t))).then(()=>t(69580)))},580632,e=>{e.v(e=>Promise.resolve().then(()=>e(270406)))},787731,e=>{e.v(t=>Promise.all(["server/chunks/0t6k_@better-auth_kysely-adapter_dist_bun-sqlite-dialect-DzNwOpKv_mjs_0zlu99c._.js"].map(t=>e.l(t))).then(()=>t(444599)))},209477,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_@better-auth_kysely-adapter_dist_node-sqlite-dialect_mjs_036w40n._.js"].map(t=>e.l(t))).then(()=>t(689127)))},935319,e=>{e.v(t=>Promise.all(["server/chunks/0_lp_modules_@better-auth_kysely-adapter_dist_d1-sqlite-dialect-C2B7YsIT_mjs_0wg4bd9._.js"].map(t=>e.l(t))).then(()=>t(354422)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0r91ma7._.js.map
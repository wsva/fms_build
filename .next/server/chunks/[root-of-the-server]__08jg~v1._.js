module.exports=[86560,e=>{"use strict";var t=e.i(469719);let a=["dictation","card","book","read_aloud","wiki"],i={dictation:"dictation-v2",card:"card-v1",book:"book-v1",read_aloud:"read_aloud-v1",wiki:"wiki-v1"},r=/^[A-Za-z0-9_-]{1,100}$/,n=t.z.looseObject({visibility:t.z.string().default("private"),owner_id:t.z.string().default(""),subscribers:t.z.array(t.z.string()).default([])}),u=t.z.looseObject({spec:t.z.number().int().default(2),uuid:t.z.string(),type:t.z.enum(a),format:t.z.string(),name:t.z.string(),description:t.z.string().default(""),language:t.z.string().default(""),created_at:t.z.string().default(""),updated_at:t.z.string().default(""),sharing:n.default({visibility:"private",owner_id:"",subscribers:[]})});e.s(["DATASET_TYPES",0,a,"UUID_RE",0,r,"VISIBILITIES",0,["private","shared","public"],"parseDatasetInfoJson",0,function(e){let t;try{t=JSON.parse(e)}catch(e){return{ok:!1,error:`invalid JSON: ${e instanceof Error?e.message:String(e)}`}}return function(e){let t=u.safeParse(e);if(!t.success)return{ok:!1,error:t.error.issues.map(e=>`${e.path.join(".")}: ${e.message}`).join("; ")};let{spec:a,uuid:n,type:d,format:s,name:c,description:_,language:l,created_at:o,updated_at:p,sharing:E,...f}=t.data;return r.test(n)?c?s!==i[d]?{ok:!1,error:`format "${s}" does not match type "${d}" (expected "${i[d]}")`}:{ok:!0,info:{spec:a,uuid:n,type:d,format:s,name:c,description:_,language:l,created_at:o,updated_at:p,sharing:{visibility:E.visibility,owner_id:E.owner_id,subscribers:E.subscribers},extra:f}}:{ok:!1,error:"name is required"}:{ok:!1,error:`uuid "${n}" must match ${r}`}}(t)}])},452900,e=>{"use strict";var t=e.i(814747),a=e.i(86560);let i=process.env.DATASET_ROOT||"/fms_datasets",r=Number(process.env.MAX_DATASET_UPLOAD_MB||512);function n(e){if(!a.UUID_RE.test(e))throw Error(`invalid dataset uuid: ${JSON.stringify(e.slice(0,40))}`)}function u(e){if(!a.DATASET_TYPES.includes(e))throw Error(`invalid dataset type: ${JSON.stringify(e.slice(0,40))}`)}function d(e,a){return t.default.join(i,"_archive",e,a)}e.s(["DATASET_ROOT",0,i,"MAX_UPLOAD_MB",0,r,"archiveDir",0,d,"archivePath",0,function(e,a,i){if(n(a),u(e),!Number.isInteger(i)||i<1)throw Error("invalid dataset version");return t.default.join(d(e,a),`v${i}.tar.gz`)},"assertValidUuid",0,n,"datasetDir",0,function(e,a){return n(a),u(e),t.default.join(i,e,a)},"tmpDir",0,function(e){return n(e),t.default.join(i,"_tmp",e)}])},847115,e=>{"use strict";let t="@app";function a(e){if("number"==typeof e)return e;if("bigint"==typeof e||"string"==typeof e)return Number(e);if(e&&"object"==typeof e){let t=Number(String(e));if(Number.isFinite(t))return t}return 0}async function i(e,t){await e.$executeRaw`
        INSERT INTO app_sync_seq (cluster_id, next_seq)
        VALUES (${t}, 1)
        ON CONFLICT (cluster_id) DO NOTHING
    `;let i=await e.$queryRaw`
        UPDATE app_sync_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${t}
        RETURNING next_seq - 1 AS seq
    `;return a(i[0]?.seq)}async function r(e,t,i){await e.$executeRaw`
        INSERT INTO dataset_sync_seq (cluster_id, scope, next_seq)
        SELECT ${t}, ${i}, COALESCE(MAX(seq), 0) + 1
        FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${i}
        ON CONFLICT (cluster_id, scope) DO NOTHING
    `;let r=await e.$queryRaw`
        UPDATE dataset_sync_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${t} AND scope = ${i}
        RETURNING next_seq - 1 AS seq
    `;return a(r[0]?.seq)}async function n(e,t,a,i,r,n,u,d,s){let c=JSON.stringify(s??null);await e.$executeRaw`
        INSERT INTO app_sync_log
            (cluster_id, seq, scope, object_id, kind, op, edit_time, user_key, payload)
        VALUES
            (${t}, ${a}, ${i}, ${r}, ${n}, ${n.endsWith("_delete")?"delete":"upsert"},
             ${u}, ${d}, ${c}::jsonb)
    `}async function u(e,t,i){let r=await e.$queryRaw`
        SELECT pruned_up_to FROM app_sync_prune_mark
        WHERE cluster_id = ${t} AND scope = ${i}
    `;return r.length?a(r[0].pruned_up_to):0}async function d(e,t,i){let r=await e.$queryRaw`
        SELECT COALESCE(MAX(seq), 0) AS m FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${i}
    `;return a(r[0]?.m)}async function s(e,t,a){return d(e,t,a)}async function c(e,a,i){if(i===t)return 0;let r=await e.dataset.findFirst({where:{uuid:i,user_id:a,deleted:"N"},select:{journal_epoch:!0}});return r?.journal_epoch??0}async function _(e,t,i,r,n){let s=await u(e,t,i),_=r<s,l=[];if(!_)for(let u of(await e.$queryRaw`
            SELECT seq, object_id, kind, op, edit_time, user_key, payload
            FROM app_sync_log
            WHERE cluster_id = ${t} AND scope = ${i} AND seq > ${r}
            ORDER BY seq ASC
            LIMIT ${n}
        `))l.push({seq:a(u.seq),object_id:u.object_id,kind:u.kind,op:u.op,edit_time:u.edit_time,user_key:u.user_key,payload:u.payload});let o=l.length===n&&n>0&&l.length>0?l[l.length-1].seq:await d(e,t,i),p=await c(e,t,i);return{dataset_uuid:i,entries:l,pruned_up_to:s,hub_seq:o,epoch:p,resync_required:_}}async function l(e,t,i,r){let n=await e.$queryRaw`
        SELECT seq, edit_time, op, payload FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${i} AND object_id = ${r}
        ORDER BY seq DESC LIMIT 1
    `;return n.length?{seq:a(n[0].seq),edit_time:n[0].edit_time,op:n[0].op,payload:n[0].payload}:null}async function o(e,t,i,r){let n=new Date(Date.now()-24*r*36e5),d=await e.$queryRaw`
        SELECT COALESCE(MAX(seq), 0) AS m FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${i}
          AND kind NOT IN ('card_review', 'read_attempt_save', 'read_attempt_delete')
          AND edit_time ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}'
          AND edit_time::timestamptz < ${n}
    `,s=a(d[0]?.m);return await e.$executeRaw`
        DELETE FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${i}
          AND kind NOT IN ('card_review', 'read_attempt_save', 'read_attempt_delete')
          AND edit_time ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}'
          AND edit_time::timestamptz < ${n}
    `,await e.$executeRaw`
        DELETE FROM app_applied_change
        WHERE cluster_id = ${t} AND applied_at < ${n}
    `,s>0&&await e.$executeRaw`
            INSERT INTO app_sync_prune_mark (cluster_id, scope, pruned_up_to)
            VALUES (${t}, ${i}, ${s})
            ON CONFLICT (cluster_id, scope)
            DO UPDATE SET pruned_up_to = GREATEST(app_sync_prune_mark.pruned_up_to, ${s})
        `,Math.max(s,await u(e,t,i))}let p=new Map;async function E(e,a){let i=Date.now();if(!(i-(p.get(a)??0)<864e5)){p.set(a,i);try{await e.$transaction(async e=>{for(let{scope:i}of(await e.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${a}))`,await e.$queryRaw`
                SELECT DISTINCT scope FROM app_sync_log WHERE cluster_id = ${a}
            `)){if(i!==t){let t=await e.dataset.findFirst({where:{uuid:i,user_id:a,deleted:"N"},select:{journal_role:!0}});if(!t||"authority"!==t.journal_role)continue}await o(e,a,i,30)}})}catch(e){console.warn("[sync] change-log retention sweep failed:",e)}}}e.s(["APP_SCOPE",0,t,"appendJournal",0,n,"changeClassOf",0,function(e){switch(e){case"cue_save":case"cue_delete":case"card_save":case"card_delete":case"card_tag_save":case"card_tag_delete":case"card_set_tags":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentences_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":case"wiki_file_save":case"wiki_file_delete":case"dictation":return"state";case"xp":return"counter";default:return"appendOnly"}},"clampEditTimeMs",0,function(e,t){return null===e?t:Math.min(e,t)},"coalescible",0,function(e){return"state"===e},"journalHighWater",0,s,"latestForObject",0,l,"lwwLoses",0,function(e,t){return null!==e&&e>=t},"maybePrune",0,E,"nextDatasetSeq",0,r,"nextSeq",0,i,"normalizeChange",0,function(e){let a="string"==typeof e?.id?e.id:"",i="string"==typeof e?.kind?e.kind:"",r="string"==typeof e.edit_time?e.edit_time:"";if(!a||!i)return{id:a,kind:i,missing:!0,scope:"",epoch:0,editTime:r};let n="string"==typeof e.dataset_uuid?e.dataset_uuid:"",u=Number(e.epoch);return{id:a,kind:i,missing:!1,scope:"dictation"===i||"xp"===i||"card_review"===i||"read_attempt_save"===i||"read_attempt_delete"===i?t:n,epoch:Number.isFinite(u)?Math.trunc(u):0,editTime:r}},"objectIdFor",0,function(e,t,a){let i=e=>(function(e,t){if(e&&"object"==typeof e){let a=e[t];if("string"==typeof a)return a}return""})(t,e);switch(e){case"cue_save":case"card_save":case"card_tag_save":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":default:return i("uuid");case"cue_delete":return i("cue_uuid")||i("uuid");case"dictation":return`${a}:${i("media_uuid")}:${i("subtitle_uuid")}`;case"card_delete":case"card_set_tags":return i("card_uuid");case"card_review":{let e=i("event_uuid");return e?`${a}:${e}`:`${a}:${i("card_uuid")}`}case"card_tag_delete":return i("tag_uuid");case"book_sentences_save":return"";case"read_attempt_save":case"read_attempt_delete":return`${a}:${i("uuid")}`;case"wiki_file_save":case"wiki_file_delete":return i("rel_path");case"xp":return`${a}:${i("reference_id")}`}},"parseEditTime",0,function(e){let t=(e??"").trim();if(!t)return null;if(/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}/.test(t)){let e=/(Z|[+-]\d{2}:?\d{2})$/i.test(t),a=Date.parse(t.replace(" ","T")+(e?"":"Z"));return Number.isNaN(a)?null:a}let a=Date.parse(t);return Number.isNaN(a)?null:a},"readChanges",0,_,"scopeAuthorityEpoch",0,c,"staleEpochReason",0,function(e,t,a){return`stale_epoch: presented ${e} < authority ${t} for scope '${a}'; re-pull this scope to learn the new epoch, then retry (INV-13/INV-20)`},"toNum",0,a])},785148,(e,t,a)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},640216,e=>{"use strict";let t=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:?\d{2})?$/;function a(e){return e.toISOString()}function i(e){let a=e.trim();if(!a)return null;let i=t.exec(a);if(!i)return null;let[,r,n,u,d,s,c,_,l]=i,o=_?Math.floor(1e3*Number("0."+_)):0,p=Date.UTC(Number(r),Number(n)-1,Number(u),Number(d),Number(s),Number(c),o);if(l&&"Z"!==l){let e="+"===l[0]?-1:1,t=l.slice(1).replace(":","");p+=e*(60*Number(t.slice(0,2))+Number(t.slice(2,4)))*6e4}return Number.isNaN(p)?null:p}e.s(["canonicalStamp",0,function(e){let t=i(e);return null===t?e.trim():new Date(t).toISOString()},"descriptorStamp",0,function(e){let t=i(e);return null===t?e.trim():new Date(t).toISOString().slice(0,19)+"Z"},"nowRowStamp",0,function(){return a(new Date)},"parseStampMs",0,i,"rowStampAt",0,a,"stampsCmp",0,function(e,t){let a=i(e),r=i(t);return null===a||null===r?null:a<r?-1:+(a>r)}])},736735,e=>{"use strict";var t=e.i(522734),a=e.i(814747),i=e.i(785148),r=e.i(640216);function n(e){return a.default.join(e,"data.sqlite3")}let u=`
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
`,d=new Map;async function s(e,t){let a,i=n(e),r=d.get(i)??Promise.resolve(),u=new Promise(e=>a=e);d.set(i,r.then(()=>u)),await r;try{return await t()}finally{a(),u.then(()=>{d.get(i)===u&&d.delete(i)})}}function c(e){let a=n(e);t.default.mkdirSync(e,{recursive:!0});let r=new i.default(a);return r.pragma("journal_mode = WAL"),r.pragma("busy_timeout = 5000"),r.exec(u),r}function _(e){let a=n(e);if(!t.default.existsSync(a))return null;try{return new i.default(a,{readonly:!0,fileMustExist:!0})}catch{return null}}function l(e,t){return!!e.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(t)}function o(e,t){let a=(0,r.canonicalStamp)(e),i=(0,r.canonicalStamp)(t);return a<i?-1:+(a>i)}async function p(e,a){let r,u=n(e);if(!t.default.existsSync(u))return!1;try{r=new i.default(u,{readonly:!0,fileMustExist:!0})}catch{r=new i.default(u,{fileMustExist:!0})}try{t.default.existsSync(a)&&t.default.rmSync(a),await r.backup(a);let e=new i.default(a);try{e.pragma("journal_mode = DELETE")}finally{e.close()}return!0}finally{r.close()}}e.s(["backupDb",0,p,"cardDbPath",0,n,"countLiveCards",0,function(e){let t=_(e);if(!t)return 0;try{if(!l(t,"card"))return 0;return t.prepare("SELECT COUNT(*) AS n FROM card WHERE deleted_at IS NULL").get().n}finally{t.close()}},"countMedia",0,function(e){let t=_(e);if(!t)return 0;try{if(!l(t,"listen_media"))return 0;return t.prepare("SELECT COUNT(*) AS n FROM listen_media").get().n}finally{t.close()}},"getChangesSince",0,function(e,t){let a=_(e);if(!a)return{cards:[],tags:[]};try{let e=(0,r.canonicalStamp)(t),i=l(a,"card"),n=l(a,"tag"),u=i?a.prepare(`SELECT uuid, question, suggestion, answer, note, familiarity, question_hash,
                            source_card_uuid, source_dataset_uuid, deleted_at, created_at, updated_at
                     FROM card WHERE updated_at > ? ORDER BY updated_at ASC`).all(e):[],d=n?a.prepare(`SELECT uuid, name, color, deleted_at, created_at, updated_at
                     FROM tag WHERE updated_at > ? ORDER BY updated_at ASC`).all(e):[];return{cards:u,tags:d}}finally{a.close()}},"openCardDb",0,c,"pushChanges",0,function(e,t,a){let i=c(e);try{let e=0,n=[];return i.transaction(()=>{for(let a of t){let t=i.prepare("SELECT updated_at FROM card WHERE uuid = ?").get(a.uuid);if(t){if(0>=o(a.updated_at,t.updated_at)){n.push({uuid:a.uuid,local_updated_at:a.updated_at,remote_updated_at:t.updated_at,winner:"remote"});continue}i.prepare(`UPDATE card SET question = ?, suggestion = ?, answer = ?, note = ?,
                                familiarity = ?, question_hash = ?, source_card_uuid = ?,
                                source_dataset_uuid = ?, deleted_at = ?, updated_at = ?
                         WHERE uuid = ?`).run(a.question,a.suggestion??"",a.answer??"",a.note??"",a.familiarity??0,a.question_hash??null,a.source_card_uuid??null,a.source_dataset_uuid??null,a.deleted_at?(0,r.canonicalStamp)(a.deleted_at):null,(0,r.canonicalStamp)(a.updated_at),a.uuid)}else i.prepare(`INSERT INTO card (uuid, question, suggestion, answer, note, familiarity,
                                question_hash, source_card_uuid, source_dataset_uuid, deleted_at,
                                created_at, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(a.uuid,a.question,a.suggestion??"",a.answer??"",a.note??"",a.familiarity??0,a.question_hash??null,a.source_card_uuid??null,a.source_dataset_uuid??null,a.deleted_at?(0,r.canonicalStamp)(a.deleted_at):null,(0,r.canonicalStamp)(a.created_at)||(0,r.rowStampAt)(new Date),(0,r.canonicalStamp)(a.updated_at));e+=1}for(let t of a){let a=i.prepare("SELECT updated_at FROM tag WHERE uuid = ?").get(t.uuid);if(a){if(0>=o(t.updated_at,a.updated_at)){n.push({uuid:t.uuid,local_updated_at:t.updated_at,remote_updated_at:a.updated_at,winner:"remote"});continue}i.prepare(`UPDATE tag SET name = ?, color = ?, deleted_at = ?, updated_at = ?
                         WHERE uuid = ?`).run(t.name,t.color??null,t.deleted_at?(0,r.canonicalStamp)(t.deleted_at):null,(0,r.canonicalStamp)(t.updated_at),t.uuid)}else i.prepare(`INSERT INTO tag (uuid, name, color, deleted_at, created_at, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?)`).run(t.uuid,t.name,t.color??null,t.deleted_at?(0,r.canonicalStamp)(t.deleted_at):null,(0,r.canonicalStamp)(t.created_at)||(0,r.rowStampAt)(new Date),(0,r.canonicalStamp)(t.updated_at));e+=1}})(),{accepted:e,conflicts:n}}finally{i.close()}},"tableExists",0,l,"withDatasetLock",0,s])},324398,e=>{"use strict";var t=e.i(847115),a=e.i(452900);let i=["upsert","delete"];function r(e){return"string"==typeof e?e:null}function n(e){if("number"==typeof e)return Number.isInteger(e)&&e>=1?e:null;if("string"==typeof e&&""!==e.trim()){let t=Number(e);return Number.isInteger(t)&&t>=1?t:null}return null}async function u(e,a,i){await e.$executeRaw`
        INSERT INTO app_inbox_seq (cluster_id, scope, next_seq)
        VALUES (${a}, ${i}, 1)
        ON CONFLICT (cluster_id, scope) DO NOTHING
    `;let r=await e.$queryRaw`
        UPDATE app_inbox_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${a} AND scope = ${i}
        RETURNING next_seq - 1 AS seq
    `;return(0,t.toNum)(r[0]?.seq)}async function d(e,n,d,s){let c=0,_=0,l=[],o=(e,t)=>l.push({change_id:e,error:t});for(let l of s){let s=l??{},p=r(s.change_id),E=p||"(missing change_id)";if(!p){o(E,"change_id is required and must be a non-empty string");continue}if(p.length>128){o(E,"change_id exceeds 128 characters");continue}let f=r(s.scope);if(!f){o(E,"scope is required and must be a non-empty string");continue}if(f.length>100){o(E,"scope exceeds 100 characters");continue}if(f===t.APP_SCOPE){o(E,"scope '@app' is the cloud-authority journal; push it to /api/v1/sync/changes, not the inbox");continue}try{(0,a.assertValidUuid)(f)}catch{o(E,`scope ${JSON.stringify(f.slice(0,40))} is not a valid dataset uuid`);continue}let T=r(s.kind);if(!T){o(E,"kind is required and must be a non-empty string");continue}if(T.length>40){o(E,"kind exceeds 40 characters");continue}let m=r(s.op);if(!m||!i.includes(m)){o(E,`op must be one of ${i.join(" | ")}`);continue}let N=r(s.object_id);if(!N){o(E,"object_id is required and must be a non-empty string");continue}let g="";if(void 0!==s.edit_time&&null!==s.edit_time){let e=r(s.edit_time);if(null===e){o(E,"edit_time must be a string");continue}if(e.length>64){o(E,"edit_time exceeds 64 characters");continue}g=e}let h=d;if(void 0!==s.author&&null!==s.author){let e=r(s.author);if(null===e){o(E,"author must be a string");continue}if(e.length>320){o(E,"author exceeds 320 characters");continue}h=e}if(await e.app_inbox.findUnique({where:{cluster_id_change_id:{cluster_id:n,change_id:p}}})){_++;continue}let y=await u(e,n,f),w=JSON.stringify(s.payload??null);await e.$executeRaw`
            INSERT INTO app_inbox
                (cluster_id, scope, proposal_seq, change_id, object_id, kind, op,
                 edit_time, author, payload)
            VALUES
                (${n}, ${f}, ${BigInt(y)}, ${p}, ${N}, ${T},
                 ${m}, ${g}, ${h}, ${w}::jsonb)
        `,c++}return{queued:c,deduped:_,refused:l}}async function s(e,a,i,r,n){let u=r<0,d=[];if(!u)for(let u of(await e.$queryRaw`
            SELECT change_id, proposal_seq, object_id, kind, op, edit_time, author, payload
            FROM app_inbox
            WHERE cluster_id = ${a} AND scope = ${i}
              AND status = 'pending' AND proposal_seq > ${r}
            ORDER BY proposal_seq ASC
            LIMIT ${n}
        `))d.push({change_id:u.change_id,proposal_seq:(0,t.toNum)(u.proposal_seq),object_id:u.object_id,kind:u.kind,op:u.op,edit_time:u.edit_time,author:u.author,payload:u.payload});let s=d.length===n&&n>0&&d.length>0?d[d.length-1].proposal_seq:(0,t.toNum)((await e.$queryRaw`
                SELECT COALESCE(MAX(proposal_seq), 0) AS m FROM app_inbox
                WHERE cluster_id = ${a} AND scope = ${i}
            `)[0]?.m);return{dataset_uuid:i,entries:d,pruned_up_to:0,inbox_seq:s,resync_required:u}}async function c(e,a,i,u){let d=0,s=0,c=[],_=[],l=t=>e.app_inbox.findUnique({where:{cluster_id_change_id:{cluster_id:a,change_id:t}}}),o=(e,a)=>{for(let i of e)_.push({change_id:i.change_id,scope:i.scope,object_id:i.object_id,kind:i.kind,edit_time:i.edit_time,status:i.status,winner_seq:null===i.winner_seq||void 0===i.winner_seq?null:(0,t.toNum)(i.winner_seq),winner_payload:i.winner_payload,winner_kind:a})};for(let t of i){let i=r(t?.change_id);if(!i){c.push("(missing change_id)");continue}let u=n(t?.seq),s=null===u?null:BigInt(u),_=await e.$queryRaw`
            UPDATE app_inbox
            SET status = 'accepted', winner_seq = ${s}, acked_at = now()
            WHERE cluster_id = ${a} AND change_id = ${i} AND status = 'pending'
            RETURNING change_id, scope, object_id, kind, edit_time, status, winner_seq, winner_payload
        `;if(o(_,null),1===_.length){d++;continue}await l(i)?d++:c.push(i)}for(let t of u){let i=r(t?.change_id);if(!i){c.push("(missing change_id)");continue}let u=n(t?.winner_seq),d=null===u?null:BigInt(u),_=t?.winner_payload,p=null==_?null:JSON.stringify(_),E=r(t?.winner_kind),f=null===E||""===E?null:E,T=await e.$queryRaw`
            UPDATE app_inbox
            SET status = 'rejected', winner_seq = ${d},
                winner_payload = ${p}::jsonb, acked_at = now()
            WHERE cluster_id = ${a} AND change_id = ${i} AND status = 'pending'
            RETURNING change_id, scope, object_id, kind, edit_time, status, winner_seq, winner_payload
        `;if(o(T,f),1===T.length){s++;continue}await l(i)?s++:c.push(i)}return{accepted:d,rejected:s,unknown:c,flipped:_}}e.s(["ingestProposals",0,d,"readInbox",0,s,"recordAck",0,c])},715581,e=>{"use strict";var t=e.i(522734),a=e.i(254799),i=e.i(785148),r=e.i(736735),n=e.i(640216);let u=["cue_save","cue_delete","card_save","card_delete","card_tag_save","card_tag_delete","card_set_tags"];function d(e,t){let a=e[t];return"string"==typeof a?a:""}function s(e,t){let a=d(e,t);if(!a)throw Error(`${t} is required and must be a non-empty string`);return a}function c(e,t){let a=e[t];return"number"==typeof a&&Number.isFinite(a)?a:0}function _(e,t){let a=e[t];return"string"==typeof a&&a?a:null}function l(e,t,a){return e.prepare(`PRAGMA table_info(${t})`).all().some(e=>e.name===a)}function o(e,t,i,r){switch(t){case"card_save":let u,l,o;u=s(i,"uuid"),l=d(i,"created_at")?(0,n.canonicalStamp)(d(i,"created_at")):r,o=d(i,"updated_at")?(0,n.canonicalStamp)(d(i,"updated_at")):r,e.prepare(`INSERT INTO card (uuid, question, suggestion, answer, note, familiarity,
                            question_hash, source_card_uuid, source_dataset_uuid, deleted_at,
                            created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?)
         ON CONFLICT(uuid) DO UPDATE SET
            question = excluded.question, suggestion = excluded.suggestion,
            answer = excluded.answer, note = excluded.note, familiarity = excluded.familiarity,
            question_hash = excluded.question_hash, source_card_uuid = excluded.source_card_uuid,
            source_dataset_uuid = excluded.source_dataset_uuid, updated_at = excluded.updated_at`).run(u,d(i,"question"),d(i,"suggestion"),d(i,"answer"),d(i,"note"),c(i,"familiarity"),_(i,"question_hash"),_(i,"source_card_uuid"),_(i,"source_dataset_uuid"),l,o);break;case"card_delete":let p;p=d(i,"card_uuid")||s(i,"uuid"),e.prepare("UPDATE card SET deleted_at = ?, updated_at = ? WHERE uuid = ?").run(r,r,p);break;case"card_tag_save":let E,f,T,m,N;E=s(i,"uuid"),f=s(i,"name"),T=_(i,"color"),m=d(i,"created_at")?(0,n.canonicalStamp)(d(i,"created_at")):r,N=d(i,"updated_at")?(0,n.canonicalStamp)(d(i,"updated_at")):r,e.prepare(`INSERT INTO tag (uuid, name, color, deleted_at, created_at, updated_at)
         VALUES (?, ?, ?, NULL, ?, ?)
         ON CONFLICT(uuid) DO UPDATE SET name = excluded.name, color = excluded.color,
                                         updated_at = excluded.updated_at`).run(E,f,T,m,N);break;case"card_tag_delete":let g;g=d(i,"tag_uuid")||s(i,"uuid"),e.prepare("UPDATE tag SET deleted_at = ?, updated_at = ? WHERE uuid = ?").run(r,r,g);break;case"card_set_tags":let h=s(i,"card_uuid"),y=Array.isArray(i.tag_uuids)?i.tag_uuids.filter(e=>"string"==typeof e&&!!e):[];e.prepare("UPDATE card_tag SET deleted_at = ?, updated_at = ? WHERE card_uuid = ? AND deleted_at IS NULL").run(r,r,h);let w=e.prepare(`INSERT INTO card_tag (uuid, card_uuid, tag_uuid, deleted_at, created_at, updated_at)
         VALUES (?, ?, ?, NULL, ?, ?)
         ON CONFLICT(card_uuid, tag_uuid) DO UPDATE SET deleted_at = NULL, updated_at = excluded.updated_at`);for(let e of y)w.run((0,a.randomUUID)(),h,e,r,r);break;default:throw Error(`no cloud writer for kind '${t}'`)}}async function p(e,a,u,p){let E=u&&"object"==typeof u?u:{},f=(0,n.canonicalStamp)(p);"cue_save"===a||"cue_delete"===a?await (0,r.withDatasetLock)(e,()=>{let n=function(e){let a=(0,r.cardDbPath)(e);if(!t.default.existsSync(a))throw Error("Dataset database not ready");return new i.default(a,{fileMustExist:!0})}(e);try{if(!(0,r.tableExists)(n,"listen_subtitle_cue"))throw Error("Dataset database not ready");if("cue_delete"===a){let e=d(E,"cue_uuid")||s(E,"uuid");n.prepare("DELETE FROM listen_subtitle_cue WHERE uuid = ?").run(e);return}let e=s(E,"uuid"),t=["uuid","subtitle_uuid","order_num","start_ms","end_ms","content","reference"],i=[e,s(E,"subtitle_uuid"),c(E,"order_num"),c(E,"start_ms"),c(E,"end_ms"),d(E,"content"),_(E,"reference")];l(n,"listen_subtitle_cue","confidence")&&(t.push("confidence"),i.push("number"==typeof E.confidence&&Number.isFinite(E.confidence)?E.confidence:null)),l(n,"listen_subtitle_cue","version_created")&&(t.push("version_created"),i.push(1));let u=`INSERT INTO listen_subtitle_cue (${t.join(", ")}) VALUES (${t.map(()=>"?").join(", ")}) ON CONFLICT(uuid) DO UPDATE SET subtitle_uuid = excluded.subtitle_uuid, order_num = excluded.order_num, start_ms = excluded.start_ms, end_ms = excluded.end_ms, content = excluded.content, reference = excluded.reference`;n.prepare(u).run(...i)}finally{n.close()}}):await (0,r.withDatasetLock)(e,()=>{let t=(0,r.openCardDb)(e);try{o(t,a,E,f)}finally{t.close()}})}async function E(e,a,i,u,s){let c=i&&"object"==typeof i?i:{};if(!t.default.existsSync((0,r.cardDbPath)(e)))return"not-ready";let _=function(e,t){switch(e){case"card_save":return{table:"card",uuid:d(t,"uuid")};case"card_delete":return{table:"card",uuid:d(t,"card_uuid")||d(t,"uuid")};case"card_set_tags":return{table:"card",uuid:d(t,"card_uuid")};case"card_tag_save":return{table:"tag",uuid:d(t,"uuid")};case"card_tag_delete":return{table:"tag",uuid:d(t,"tag_uuid")||d(t,"uuid")};default:return null}}(a,c);if(!_||!_.uuid)throw Error(`no stale-guard row for kind '${a}' (payload is missing its row uuid)`);let l=(0,n.canonicalStamp)(u);return(0,r.withDatasetLock)(e,()=>{let t=(0,r.openCardDb)(e);try{let e=t.prepare(`SELECT updated_at FROM ${_.table} WHERE uuid = ?`).get(_.uuid);if(e){let t=(0,n.stampsCmp)(String(e.updated_at??""),s);if(null===t||t>0)return"superseded"}return o(t,a,c,l),"applied"}finally{t.close()}})}async function f(e,t,a){await e.dataset.update({where:{uuid:t},data:{card_count:(0,r.countLiveCards)(a),updated_at:new Date}})}e.s(["JOURNAL_WRITABLE_KINDS",0,u,"applyDatasetChange",0,p,"applyDatasetChangeIfStale",0,E,"isJournalWritableKind",0,function(e){return u.includes(e)},"refreshCardCounts",0,f])},916005,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_node_buffer_0063pbu._.js"].map(t=>e.l(t))).then(()=>t(951615)))},918707,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(t=>e.l(t))).then(()=>t(407142)))},480599,e=>{e.v(t=>Promise.all(["server/chunks/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(t=>e.l(t))).then(()=>t(417734)))},563921,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_@better-auth_memory-adapter_dist_index_mjs_07pm9hq._.js"].map(t=>e.l(t))).then(()=>t(268905)))},246120,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_better-auth_dist_adapters_kysely-adapter_index_mjs_0.9gz-c._.js"].map(t=>e.l(t))).then(()=>t(69580)))},580632,e=>{e.v(e=>Promise.resolve().then(()=>e(270406)))},787731,e=>{e.v(t=>Promise.all(["server/chunks/0t6k_@better-auth_kysely-adapter_dist_bun-sqlite-dialect-DzNwOpKv_mjs_0zlu99c._.js"].map(t=>e.l(t))).then(()=>t(444599)))},209477,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_@better-auth_kysely-adapter_dist_node-sqlite-dialect_mjs_036w40n._.js"].map(t=>e.l(t))).then(()=>t(689127)))},935319,e=>{e.v(t=>Promise.all(["server/chunks/0_lp_modules_@better-auth_kysely-adapter_dist_d1-sqlite-dialect-C2B7YsIT_mjs_0wg4bd9._.js"].map(t=>e.l(t))).then(()=>t(354422)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__08jg~v1._.js.map
module.exports=[687769,(e,t,a)=>{t.exports=e.x("node:events",()=>require("node:events"))},57328,(e,t,a)=>{t.exports=e.x("node:assert",()=>require("node:assert"))},688947,(e,t,a)=>{t.exports=e.x("stream",()=>require("stream"))},427699,(e,t,a)=>{t.exports=e.x("events",()=>require("events"))},406461,(e,t,a)=>{t.exports=e.x("zlib",()=>require("zlib"))},449719,(e,t,a)=>{t.exports=e.x("assert",()=>require("assert"))},500874,(e,t,a)=>{t.exports=e.x("buffer",()=>require("buffer"))},81111,(e,t,a)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},847115,e=>{"use strict";let t="@app";function a(e){if("number"==typeof e)return e;if("bigint"==typeof e||"string"==typeof e)return Number(e);if(e&&"object"==typeof e){let t=Number(String(e));if(Number.isFinite(t))return t}return 0}async function r(e,t){await e.$executeRaw`
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
    `;return a(i[0]?.seq)}async function s(e,t,a,r,i,s,n,u,d){let _=JSON.stringify(d??null);await e.$executeRaw`
        INSERT INTO app_sync_log
            (cluster_id, seq, scope, object_id, kind, op, edit_time, user_key, payload)
        VALUES
            (${t}, ${a}, ${r}, ${i}, ${s}, ${s.endsWith("_delete")?"delete":"upsert"},
             ${n}, ${u}, ${_}::jsonb)
    `}async function n(e,t,r){let i=await e.$queryRaw`
        SELECT pruned_up_to FROM app_sync_prune_mark
        WHERE cluster_id = ${t} AND scope = ${r}
    `;return i.length?a(i[0].pruned_up_to):0}async function u(e,t,r){let i=await e.$queryRaw`
        SELECT COALESCE(MAX(seq), 0) AS m FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r}
    `;return a(i[0]?.m)}async function d(e,t,a){return u(e,t,a)}async function _(e,t,r,i,s){let d=await n(e,t,r),_=i<d,c=[];if(!_)for(let n of(await e.$queryRaw`
            SELECT seq, object_id, kind, op, edit_time, user_key, payload
            FROM app_sync_log
            WHERE cluster_id = ${t} AND scope = ${r} AND seq > ${i}
            ORDER BY seq ASC
            LIMIT ${s}
        `))c.push({seq:a(n.seq),object_id:n.object_id,kind:n.kind,op:n.op,edit_time:n.edit_time,user_key:n.user_key,payload:n.payload});let l=c.length===s&&s>0&&c.length>0?c[c.length-1].seq:await u(e,t,r);return{dataset_uuid:r,entries:c,pruned_up_to:d,hub_seq:l,resync_required:_}}async function c(e,t,r,i){let s=await e.$queryRaw`
        SELECT seq, edit_time, op, payload FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r} AND object_id = ${i}
        ORDER BY seq DESC LIMIT 1
    `;return s.length?{seq:a(s[0].seq),edit_time:s[0].edit_time,op:s[0].op,payload:s[0].payload}:null}async function l(e,t,r,i){let s=new Date(Date.now()-24*i*36e5),u=await e.$queryRaw`
        SELECT COALESCE(MAX(seq), 0) AS m FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r}
          AND kind NOT IN ('card_review', 'read_attempt_save', 'read_attempt_delete')
          AND edit_time ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}'
          AND edit_time::timestamptz < ${s}
    `,d=a(u[0]?.m);return await e.$executeRaw`
        DELETE FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${r}
          AND kind NOT IN ('card_review', 'read_attempt_save', 'read_attempt_delete')
          AND edit_time ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}'
          AND edit_time::timestamptz < ${s}
    `,await e.$executeRaw`
        DELETE FROM app_applied_change
        WHERE cluster_id = ${t} AND applied_at < ${s}
    `,d>0&&await e.$executeRaw`
            INSERT INTO app_sync_prune_mark (cluster_id, scope, pruned_up_to)
            VALUES (${t}, ${r}, ${d})
            ON CONFLICT (cluster_id, scope)
            DO UPDATE SET pruned_up_to = GREATEST(app_sync_prune_mark.pruned_up_to, ${d})
        `,Math.max(d,await n(e,t,r))}let o=new Map;async function p(e,a){let r=Date.now();if(!(r-(o.get(a)??0)<864e5)){o.set(a,r);try{await e.$transaction(async e=>{for(let{scope:r}of(await e.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${a}))`,await e.$queryRaw`
                SELECT DISTINCT scope FROM app_sync_log WHERE cluster_id = ${a}
            `)){if(r!==t){let t=await e.dataset.findFirst({where:{uuid:r,user_id:a,deleted:"N"},select:{journal_role:!0}});if(!t||"authority"!==t.journal_role)continue}await l(e,a,r,30)}})}catch(e){console.warn("[sync] change-log retention sweep failed:",e)}}}e.s(["APP_SCOPE",0,t,"appendJournal",0,s,"changeClassOf",0,function(e){switch(e){case"cue_save":case"cue_delete":case"card_save":case"card_delete":case"card_tag_save":case"card_tag_delete":case"card_set_tags":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentences_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":case"wiki_file_save":case"wiki_file_delete":case"dictation":return"state";case"xp":return"counter";default:return"appendOnly"}},"coalescible",0,function(e){return"state"===e},"journalHighWater",0,d,"latestForObject",0,c,"maybePrune",0,p,"nextDatasetSeq",0,i,"nextSeq",0,r,"objectIdFor",0,function(e,t,a){let r=e=>(function(e,t){if(e&&"object"==typeof e){let a=e[t];if("string"==typeof a)return a}return""})(t,e);switch(e){case"cue_save":case"card_save":case"card_tag_save":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":default:return r("uuid");case"cue_delete":return r("cue_uuid")||r("uuid");case"dictation":return`${a}:${r("media_uuid")}:${r("subtitle_uuid")}`;case"card_delete":case"card_set_tags":return r("card_uuid");case"card_review":{let e=r("event_uuid");return e?`${a}:${e}`:`${a}:${r("card_uuid")}`}case"card_tag_delete":return r("tag_uuid");case"book_sentences_save":return"";case"read_attempt_save":case"read_attempt_delete":return`${a}:${r("uuid")}`;case"wiki_file_save":case"wiki_file_delete":return r("rel_path");case"xp":return`${a}:${r("reference_id")}`}},"parseEditTime",0,function(e){let t=(e??"").trim();if(!t)return null;if(/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}/.test(t)){let e=/(Z|[+-]\d{2}:?\d{2})$/i.test(t),a=Date.parse(t.replace(" ","T")+(e?"":"Z"));return Number.isNaN(a)?null:a}let a=Date.parse(t);return Number.isNaN(a)?null:a},"readChanges",0,_,"scopeFor",0,function(e,a){return"dictation"===e||"xp"===e||"card_review"===e||"read_attempt_save"===e||"read_attempt_delete"===e?t:a},"toNum",0,a])},86560,e=>{"use strict";var t=e.i(469719);let a=["dictation","card","book","read_aloud","wiki"],r={dictation:"dictation-v2",card:"card-v1",book:"book-v1",read_aloud:"read_aloud-v1",wiki:"wiki-v1"},i=/^[A-Za-z0-9_-]{1,100}$/,s=t.z.looseObject({visibility:t.z.string().default("private"),owner_id:t.z.string().default(""),subscribers:t.z.array(t.z.string()).default([])}),n=t.z.looseObject({spec:t.z.number().int().default(2),uuid:t.z.string(),type:t.z.enum(a),format:t.z.string(),name:t.z.string(),description:t.z.string().default(""),language:t.z.string().default(""),created_at:t.z.string().default(""),updated_at:t.z.string().default(""),sharing:s.default({visibility:"private",owner_id:"",subscribers:[]})});e.s(["DATASET_TYPES",0,a,"UUID_RE",0,i,"VISIBILITIES",0,["private","shared","public"],"parseDatasetInfoJson",0,function(e){let t;try{t=JSON.parse(e)}catch(e){return{ok:!1,error:`invalid JSON: ${e instanceof Error?e.message:String(e)}`}}return function(e){let t=n.safeParse(e);if(!t.success)return{ok:!1,error:t.error.issues.map(e=>`${e.path.join(".")}: ${e.message}`).join("; ")};let{spec:a,uuid:s,type:u,format:d,name:_,description:c,language:l,created_at:o,updated_at:p,sharing:E,...f}=t.data;return i.test(s)?_?d!==r[u]?{ok:!1,error:`format "${d}" does not match type "${u}" (expected "${r[u]}")`}:{ok:!0,info:{spec:a,uuid:s,type:u,format:d,name:_,description:c,language:l,created_at:o,updated_at:p,sharing:{visibility:E.visibility,owner_id:E.owner_id,subscribers:E.subscribers},extra:f}}:{ok:!1,error:"name is required"}:{ok:!1,error:`uuid "${s}" must match ${i}`}}(t)}])},452900,e=>{"use strict";var t=e.i(814747),a=e.i(86560);let r=process.env.DATASET_ROOT||"/fms_datasets",i=Number(process.env.MAX_DATASET_UPLOAD_MB||512);function s(e){if(!a.UUID_RE.test(e))throw Error(`invalid dataset uuid: ${JSON.stringify(e.slice(0,40))}`)}function n(e){if(!a.DATASET_TYPES.includes(e))throw Error(`invalid dataset type: ${JSON.stringify(e.slice(0,40))}`)}function u(e,a){return t.default.join(r,"_archive",e,a)}e.s(["DATASET_ROOT",0,r,"MAX_UPLOAD_MB",0,i,"archiveDir",0,u,"archivePath",0,function(e,a,r){if(s(a),n(e),!Number.isInteger(r)||r<1)throw Error("invalid dataset version");return t.default.join(u(e,a),`v${r}.tar.gz`)},"assertValidUuid",0,s,"datasetDir",0,function(e,a){return s(a),n(e),t.default.join(r,e,a)},"tmpDir",0,function(e){return s(e),t.default.join(r,"_tmp",e)}])},723380,e=>e.a(async(t,a)=>{try{var r=e.i(522734),i=e.i(698043),s=e.i(452900),n=t([i]);function u(e,t){return!!t&&e.user_id===t}async function d(e,t){return!!t&&!!await i.prisma.dataset_subscription.findFirst({where:{user_id:t,dataset_uuid:e},select:{uuid:!0}})}async function _(e,t){return!!u(e,t)||"public"===e.visibility||"shared"===e.visibility&&await d(e.uuid,t)}async function c(e,t){return!!t&&(e.user_id===t||"private"!==e.visibility&&await d(e.uuid,t))}[i]=n.then?(await n)():n;let o={uuid:!0,user_id:!0,name:!0,description:!0,dataset_type:!0,format:!0,language:!0,spec:!0,visibility:!0,status:!0,info_created_at:!0,info_updated_at:!0,archive_path:!0,archive_sha256:!0,archive_size:!0,file_count:!0,total_bytes:!0,overall_hash:!0,snapshot_seq:!0,current_version:!0,media_count:!0,card_count:!0,deleted:!0};async function l(e,t){let a=await i.prisma.dataset.findUnique({where:{uuid:e},select:o});if(!a||"Y"===a.deleted||"ready"!==a.status)return{ok:!1,status:404,error:"Dataset not found"};if(!await _(a,t))return{ok:!1,status:t?403:401,error:t?"Forbidden":"Unauthorized"};let n=(0,s.datasetDir)(a.dataset_type,a.uuid);return r.default.existsSync(n)?{ok:!0,ds:a,dir:n}:{ok:!1,status:404,error:"Dataset not found"}}e.s(["canManageDataset",0,function(e,t){return u(e,t)},"canPushDataset",0,c,"canReadDataset",0,_,"datasetCatalogFields",0,o,"gateDatasetRead",0,l,"serializeDataset",0,function(e){return{uuid:e.uuid,user_id:e.user_id,name:e.name,description:e.description,dataset_type:e.dataset_type,format:e.format,language:e.language,spec:e.spec,visibility:e.visibility,status:e.status,info_created_at:e.info_created_at,info_updated_at:e.info_updated_at,archive_sha256:e.archive_sha256,archive_size:null===e.archive_size?null:e.archive_size.toString(),file_count:e.file_count,total_bytes:e.total_bytes.toString(),overall_hash:e.overall_hash,snapshot_seq:e.snapshot_seq.toString(),current_version:e.current_version,media_count:e.media_count,card_count:e.card_count,deleted:e.deleted}}]),a()}catch(e){a(e)}},!1),951581,e=>e.a(async(t,a)=>{try{var r=e.i(522734),i=e.i(814747),s=e.i(254799),n=e.i(698043),u=t([n]);[n]=u.then?(await u)():u;let E=["data.sqlite3","data.sqlite3-wal","data.sqlite3-shm"],f="fts5.sqlite3";function d(e){return E.includes(e)||e===f||e.startsWith(`${f}-`)}async function _(e){return await new Promise((t,a)=>{let i=(0,s.createHash)("sha256"),n=r.default.createReadStream(e);n.on("error",a),n.on("data",e=>i.update(e)),n.on("end",()=>t(i.digest("hex")))})}async function c(e,t,a,r,i){let s=await n.prisma.dataset_file_hash.findUnique({where:{dataset_uuid_path:{dataset_uuid:e,path:t}}});if(s&&s.size===r&&s.mtime===i)return s.sha256;let u=await _(a);return await n.prisma.dataset_file_hash.upsert({where:{dataset_uuid_path:{dataset_uuid:e,path:t}},create:{dataset_uuid:e,path:t,size:r,mtime:i,sha256:u},update:{size:r,mtime:i,sha256:u}}),u}function l(e){let t=[];return!function e(t,a,s){let n;try{n=r.default.readdirSync(a,{withFileTypes:!0})}catch{return}for(let r of n){let n=i.default.join(a,r.name);r.isDirectory()?e(t,n,s):r.isFile()&&s.push({rel:i.default.relative(t,n).split(i.default.sep).join("/"),abs:n})}}(e,e,t),t.sort((e,t)=>{var a,r;return a=e.rel,r=t.rel,Buffer.compare(Buffer.from(a,"utf8"),Buffer.from(r,"utf8"))}),t}async function o(e,t){let a=l(e),i=(0,s.createHash)("sha256"),n=BigInt(0),u={};for(let{rel:e,abs:s}of a){if(d(e))continue;let a=r.default.statSync(s),_=BigInt(a.size),l=BigInt(Math.floor(a.mtimeMs));n+=_;let o=await c(t,e,s,_,l);i.update(e,"utf8"),i.update(Buffer.from([0])),i.update(o,"utf8"),u[e]=o}return{file_count:Object.keys(u).length,total_bytes:n,overall_hash:i.digest("hex"),updated_at:"",dataset_type:"",files:u}}async function p(e,t){await n.prisma.dataset_file_hash.deleteMany({where:{dataset_uuid:e,path:{notIn:t}}})}e.s(["computeManifest",0,o,"isDbFile",0,d,"isSnapshotSkipped",0,function(e){return"data.sqlite3-wal"===e||"data.sqlite3-shm"===e||e===f||e.startsWith(`${f}-`)},"listDatasetFiles",0,l,"pruneFileHashes",0,p]),a()}catch(e){a(e)}},!1),785148,(e,t,a)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},640216,e=>{"use strict";let t=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:?\d{2})?$/;function a(e){return e.toISOString()}function r(e){let a=e.trim();if(!a)return null;let r=t.exec(a);if(!r)return null;let[,i,s,n,u,d,_,c,l]=r,o=c?Math.floor(1e3*Number("0."+c)):0,p=Date.UTC(Number(i),Number(s)-1,Number(n),Number(u),Number(d),Number(_),o);if(l&&"Z"!==l){let e="+"===l[0]?-1:1,t=l.slice(1).replace(":","");p+=e*(60*Number(t.slice(0,2))+Number(t.slice(2,4)))*6e4}return Number.isNaN(p)?null:p}e.s(["canonicalStamp",0,function(e){let t=r(e);return null===t?e.trim():new Date(t).toISOString()},"descriptorStamp",0,function(e){let t=r(e);return null===t?e.trim():new Date(t).toISOString().slice(0,19)+"Z"},"nowRowStamp",0,function(){return a(new Date)},"rowStampAt",0,a])},736735,e=>{"use strict";var t=e.i(522734),a=e.i(814747),r=e.i(785148),i=e.i(640216);function s(e){return a.default.join(e,"data.sqlite3")}let n=`
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
`,u=new Map;async function d(e,t){let a,r=s(e),i=u.get(r)??Promise.resolve(),n=new Promise(e=>a=e);u.set(r,i.then(()=>n)),await i;try{return await t()}finally{a(),n.then(()=>{u.get(r)===n&&u.delete(r)})}}function _(e){let a=s(e);t.default.mkdirSync(e,{recursive:!0});let i=new r.default(a);return i.pragma("journal_mode = WAL"),i.pragma("busy_timeout = 5000"),i.exec(n),i}function c(e){let a=s(e);if(!t.default.existsSync(a))return null;try{return new r.default(a,{readonly:!0,fileMustExist:!0})}catch{return null}}function l(e,t){return!!e.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(t)}function o(e,t){let a=(0,i.canonicalStamp)(e),r=(0,i.canonicalStamp)(t);return a<r?-1:+(a>r)}async function p(e,a){let i,n=s(e);if(!t.default.existsSync(n))return!1;try{i=new r.default(n,{readonly:!0,fileMustExist:!0})}catch{i=new r.default(n,{fileMustExist:!0})}try{t.default.existsSync(a)&&t.default.rmSync(a),await i.backup(a);let e=new r.default(a);try{e.pragma("journal_mode = DELETE")}finally{e.close()}return!0}finally{i.close()}}e.s(["backupDb",0,p,"cardDbPath",0,s,"countLiveCards",0,function(e){let t=c(e);if(!t)return 0;try{if(!l(t,"card"))return 0;return t.prepare("SELECT COUNT(*) AS n FROM card WHERE deleted_at IS NULL").get().n}finally{t.close()}},"countMedia",0,function(e){let t=c(e);if(!t)return 0;try{if(!l(t,"listen_media"))return 0;return t.prepare("SELECT COUNT(*) AS n FROM listen_media").get().n}finally{t.close()}},"getChangesSince",0,function(e,t){let a=c(e);if(!a)return{cards:[],tags:[]};try{let e=(0,i.canonicalStamp)(t),r=l(a,"card"),s=l(a,"tag"),n=r?a.prepare(`SELECT uuid, question, suggestion, answer, note, familiarity, question_hash,
                            source_card_uuid, source_dataset_uuid, deleted_at, created_at, updated_at
                     FROM card WHERE updated_at > ? ORDER BY updated_at ASC`).all(e):[],u=s?a.prepare(`SELECT uuid, name, color, deleted_at, created_at, updated_at
                     FROM tag WHERE updated_at > ? ORDER BY updated_at ASC`).all(e):[];return{cards:n,tags:u}}finally{a.close()}},"openCardDb",0,_,"pushChanges",0,function(e,t,a){let r=_(e);try{let e=0,s=[];return r.transaction(()=>{for(let a of t){let t=r.prepare("SELECT updated_at FROM card WHERE uuid = ?").get(a.uuid);if(t){if(0>=o(a.updated_at,t.updated_at)){s.push({uuid:a.uuid,local_updated_at:a.updated_at,remote_updated_at:t.updated_at,winner:"remote"});continue}r.prepare(`UPDATE card SET question = ?, suggestion = ?, answer = ?, note = ?,
                                familiarity = ?, question_hash = ?, source_card_uuid = ?,
                                source_dataset_uuid = ?, deleted_at = ?, updated_at = ?
                         WHERE uuid = ?`).run(a.question,a.suggestion??"",a.answer??"",a.note??"",a.familiarity??0,a.question_hash??null,a.source_card_uuid??null,a.source_dataset_uuid??null,a.deleted_at?(0,i.canonicalStamp)(a.deleted_at):null,(0,i.canonicalStamp)(a.updated_at),a.uuid)}else r.prepare(`INSERT INTO card (uuid, question, suggestion, answer, note, familiarity,
                                question_hash, source_card_uuid, source_dataset_uuid, deleted_at,
                                created_at, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(a.uuid,a.question,a.suggestion??"",a.answer??"",a.note??"",a.familiarity??0,a.question_hash??null,a.source_card_uuid??null,a.source_dataset_uuid??null,a.deleted_at?(0,i.canonicalStamp)(a.deleted_at):null,(0,i.canonicalStamp)(a.created_at)||(0,i.rowStampAt)(new Date),(0,i.canonicalStamp)(a.updated_at));e+=1}for(let t of a){let a=r.prepare("SELECT updated_at FROM tag WHERE uuid = ?").get(t.uuid);if(a){if(0>=o(t.updated_at,a.updated_at)){s.push({uuid:t.uuid,local_updated_at:t.updated_at,remote_updated_at:a.updated_at,winner:"remote"});continue}r.prepare(`UPDATE tag SET name = ?, color = ?, deleted_at = ?, updated_at = ?
                         WHERE uuid = ?`).run(t.name,t.color??null,t.deleted_at?(0,i.canonicalStamp)(t.deleted_at):null,(0,i.canonicalStamp)(t.updated_at),t.uuid)}else r.prepare(`INSERT INTO tag (uuid, name, color, deleted_at, created_at, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?)`).run(t.uuid,t.name,t.color??null,t.deleted_at?(0,i.canonicalStamp)(t.deleted_at):null,(0,i.canonicalStamp)(t.created_at)||(0,i.rowStampAt)(new Date),(0,i.canonicalStamp)(t.updated_at));e+=1}})(),{accepted:e,conflicts:s}}finally{r.close()}},"tableExists",0,l,"withDatasetLock",0,d])},916005,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_node_buffer_0063pbu._.js"].map(t=>e.l(t))).then(()=>t(951615)))},918707,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(t=>e.l(t))).then(()=>t(407142)))},480599,e=>{e.v(t=>Promise.all(["server/chunks/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(t=>e.l(t))).then(()=>t(417734)))},563921,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_@better-auth_memory-adapter_dist_index_mjs_07pm9hq._.js"].map(t=>e.l(t))).then(()=>t(268905)))},246120,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_better-auth_dist_adapters_kysely-adapter_index_mjs_0.9gz-c._.js"].map(t=>e.l(t))).then(()=>t(69580)))},580632,e=>{e.v(e=>Promise.resolve().then(()=>e(270406)))},787731,e=>{e.v(t=>Promise.all(["server/chunks/0t6k_@better-auth_kysely-adapter_dist_bun-sqlite-dialect-DzNwOpKv_mjs_0zlu99c._.js"].map(t=>e.l(t))).then(()=>t(444599)))},209477,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_@better-auth_kysely-adapter_dist_node-sqlite-dialect_mjs_036w40n._.js"].map(t=>e.l(t))).then(()=>t(689127)))},935319,e=>{e.v(t=>Promise.all(["server/chunks/0_lp_modules_@better-auth_kysely-adapter_dist_d1-sqlite-dialect-C2B7YsIT_mjs_0wg4bd9._.js"].map(t=>e.l(t))).then(()=>t(354422)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0grhw0p._.js.map
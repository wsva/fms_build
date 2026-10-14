module.exports=[86560,e=>{"use strict";var t=e.i(469719);let a=["dictation","card","book","read_aloud","wiki"],s={dictation:"dictation-v2",card:"card-v1",book:"book-v1",read_aloud:"read_aloud-v1",wiki:"wiki-v1"},r=/^[A-Za-z0-9_-]{1,100}$/,i=t.z.looseObject({visibility:t.z.string().default("private"),owner_id:t.z.string().default(""),subscribers:t.z.array(t.z.string()).default([])}),_=t.z.looseObject({spec:t.z.number().int().default(2),uuid:t.z.string(),type:t.z.enum(a),format:t.z.string(),name:t.z.string(),description:t.z.string().default(""),language:t.z.string().default(""),created_at:t.z.string().default(""),updated_at:t.z.string().default(""),sharing:i.default({visibility:"private",owner_id:"",subscribers:[]})});e.s(["DATASET_TYPES",0,a,"UUID_RE",0,r,"VISIBILITIES",0,["private","shared","public"],"parseDatasetInfoJson",0,function(e){let t;try{t=JSON.parse(e)}catch(e){return{ok:!1,error:`invalid JSON: ${e instanceof Error?e.message:String(e)}`}}return function(e){let t=_.safeParse(e);if(!t.success)return{ok:!1,error:t.error.issues.map(e=>`${e.path.join(".")}: ${e.message}`).join("; ")};let{spec:a,uuid:i,type:n,format:c,name:u,description:d,language:o,created_at:l,updated_at:p,sharing:m,...f}=t.data;return r.test(i)?u?c!==s[n]?{ok:!1,error:`format "${c}" does not match type "${n}" (expected "${s[n]}")`}:{ok:!0,info:{spec:a,uuid:i,type:n,format:c,name:u,description:d,language:o,created_at:l,updated_at:p,sharing:{visibility:m.visibility,owner_id:m.owner_id,subscribers:m.subscribers},extra:f}}:{ok:!1,error:"name is required"}:{ok:!1,error:`uuid "${i}" must match ${r}`}}(t)}])},452900,e=>{"use strict";var t=e.i(814747),a=e.i(86560);let s=process.env.DATASET_ROOT||"/fms_datasets",r=Number(process.env.MAX_DATASET_UPLOAD_MB||512);function i(e){if(!a.UUID_RE.test(e))throw Error(`invalid dataset uuid: ${JSON.stringify(e.slice(0,40))}`)}function _(e){if(!a.DATASET_TYPES.includes(e))throw Error(`invalid dataset type: ${JSON.stringify(e.slice(0,40))}`)}function n(e,a){return t.default.join(s,"_archive",e,a)}e.s(["DATASET_ROOT",0,s,"MAX_UPLOAD_MB",0,r,"archiveDir",0,n,"archivePath",0,function(e,a,s){if(i(a),_(e),!Number.isInteger(s)||s<1)throw Error("invalid dataset version");return t.default.join(n(e,a),`v${s}.tar.gz`)},"assertValidUuid",0,i,"datasetDir",0,function(e,a){return i(a),_(e),t.default.join(s,e,a)},"tmpDir",0,function(e){return i(e),t.default.join(s,"_tmp",e)}])},847115,e=>{"use strict";let t="@app";function a(e){if("number"==typeof e)return e;if("bigint"==typeof e||"string"==typeof e)return Number(e);if(e&&"object"==typeof e){let t=Number(String(e));if(Number.isFinite(t))return t}return 0}async function s(e,t){await e.$executeRaw`
        INSERT INTO app_sync_seq (cluster_id, next_seq)
        VALUES (${t}, 1)
        ON CONFLICT (cluster_id) DO NOTHING
    `;let s=await e.$queryRaw`
        UPDATE app_sync_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${t}
        RETURNING next_seq - 1 AS seq
    `;return a(s[0]?.seq)}async function r(e,t,s){await e.$executeRaw`
        INSERT INTO dataset_sync_seq (cluster_id, scope, next_seq)
        SELECT ${t}, ${s}, COALESCE(MAX(seq), 0) + 1
        FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${s}
        ON CONFLICT (cluster_id, scope) DO NOTHING
    `;let r=await e.$queryRaw`
        UPDATE dataset_sync_seq SET next_seq = next_seq + 1
        WHERE cluster_id = ${t} AND scope = ${s}
        RETURNING next_seq - 1 AS seq
    `;return a(r[0]?.seq)}async function i(e,t,a,s,r,i,_,n,c){let u=JSON.stringify(c??null);await e.$executeRaw`
        INSERT INTO app_sync_log
            (cluster_id, seq, scope, object_id, kind, op, edit_time, user_key, payload)
        VALUES
            (${t}, ${a}, ${s}, ${r}, ${i}, ${i.endsWith("_delete")?"delete":"upsert"},
             ${_}, ${n}, ${u}::jsonb)
    `}async function _(e,t,s){let r=await e.$queryRaw`
        SELECT pruned_up_to FROM app_sync_prune_mark
        WHERE cluster_id = ${t} AND scope = ${s}
    `;return r.length?a(r[0].pruned_up_to):0}async function n(e,t,s){let r=await e.$queryRaw`
        SELECT COALESCE(MAX(seq), 0) AS m FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${s}
    `;return a(r[0]?.m)}async function c(e,t,a){return n(e,t,a)}async function u(e,t,s,r,i){let c=await _(e,t,s),u=r<c,d=[];if(!u)for(let _ of(await e.$queryRaw`
            SELECT seq, object_id, kind, op, edit_time, user_key, payload
            FROM app_sync_log
            WHERE cluster_id = ${t} AND scope = ${s} AND seq > ${r}
            ORDER BY seq ASC
            LIMIT ${i}
        `))d.push({seq:a(_.seq),object_id:_.object_id,kind:_.kind,op:_.op,edit_time:_.edit_time,user_key:_.user_key,payload:_.payload});let o=d.length===i&&i>0&&d.length>0?d[d.length-1].seq:await n(e,t,s);return{dataset_uuid:s,entries:d,pruned_up_to:c,hub_seq:o,resync_required:u}}async function d(e,t,s,r){let i=await e.$queryRaw`
        SELECT seq, edit_time, op, payload FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${s} AND object_id = ${r}
        ORDER BY seq DESC LIMIT 1
    `;return i.length?{seq:a(i[0].seq),edit_time:i[0].edit_time,op:i[0].op,payload:i[0].payload}:null}async function o(e,t,s,r){let i=new Date(Date.now()-24*r*36e5),n=await e.$queryRaw`
        SELECT COALESCE(MAX(seq), 0) AS m FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${s}
          AND kind NOT IN ('card_review', 'read_attempt_save', 'read_attempt_delete')
          AND edit_time ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}'
          AND edit_time::timestamptz < ${i}
    `,c=a(n[0]?.m);return await e.$executeRaw`
        DELETE FROM app_sync_log
        WHERE cluster_id = ${t} AND scope = ${s}
          AND kind NOT IN ('card_review', 'read_attempt_save', 'read_attempt_delete')
          AND edit_time ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}'
          AND edit_time::timestamptz < ${i}
    `,await e.$executeRaw`
        DELETE FROM app_applied_change
        WHERE cluster_id = ${t} AND applied_at < ${i}
    `,c>0&&await e.$executeRaw`
            INSERT INTO app_sync_prune_mark (cluster_id, scope, pruned_up_to)
            VALUES (${t}, ${s}, ${c})
            ON CONFLICT (cluster_id, scope)
            DO UPDATE SET pruned_up_to = GREATEST(app_sync_prune_mark.pruned_up_to, ${c})
        `,Math.max(c,await _(e,t,s))}let l=new Map;async function p(e,a){let s=Date.now();if(!(s-(l.get(a)??0)<864e5)){l.set(a,s);try{await e.$transaction(async e=>{for(let{scope:s}of(await e.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${a}))`,await e.$queryRaw`
                SELECT DISTINCT scope FROM app_sync_log WHERE cluster_id = ${a}
            `)){if(s!==t){let t=await e.dataset.findFirst({where:{uuid:s,user_id:a,deleted:"N"},select:{journal_role:!0}});if(!t||"authority"!==t.journal_role)continue}await o(e,a,s,30)}})}catch(e){console.warn("[sync] change-log retention sweep failed:",e)}}}e.s(["APP_SCOPE",0,t,"appendJournal",0,i,"changeClassOf",0,function(e){switch(e){case"cue_save":case"cue_delete":case"card_save":case"card_delete":case"card_tag_save":case"card_tag_delete":case"card_set_tags":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentences_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":case"wiki_file_save":case"wiki_file_delete":case"dictation":return"state";case"xp":return"counter";default:return"appendOnly"}},"coalescible",0,function(e){return"state"===e},"journalHighWater",0,c,"latestForObject",0,d,"maybePrune",0,p,"nextDatasetSeq",0,r,"nextSeq",0,s,"objectIdFor",0,function(e,t,a){let s=e=>(function(e,t){if(e&&"object"==typeof e){let a=e[t];if("string"==typeof a)return a}return""})(t,e);switch(e){case"cue_save":case"card_save":case"card_tag_save":case"book_chapter_save":case"book_chapter_delete":case"book_sentence_save":case"book_sentence_delete":case"book_word_save":case"book_word_delete":case"read_text_save":case"read_text_delete":default:return s("uuid");case"cue_delete":return s("cue_uuid")||s("uuid");case"dictation":return`${a}:${s("media_uuid")}:${s("subtitle_uuid")}`;case"card_delete":case"card_set_tags":return s("card_uuid");case"card_review":{let e=s("event_uuid");return e?`${a}:${e}`:`${a}:${s("card_uuid")}`}case"card_tag_delete":return s("tag_uuid");case"book_sentences_save":return"";case"read_attempt_save":case"read_attempt_delete":return`${a}:${s("uuid")}`;case"wiki_file_save":case"wiki_file_delete":return s("rel_path");case"xp":return`${a}:${s("reference_id")}`}},"parseEditTime",0,function(e){let t=(e??"").trim();if(!t)return null;if(/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}/.test(t)){let e=/(Z|[+-]\d{2}:?\d{2})$/i.test(t),a=Date.parse(t.replace(" ","T")+(e?"":"Z"));return Number.isNaN(a)?null:a}let a=Date.parse(t);return Number.isNaN(a)?null:a},"readChanges",0,u,"scopeFor",0,function(e,a){return"dictation"===e||"xp"===e||"card_review"===e||"read_attempt_save"===e||"read_attempt_delete"===e?t:a},"toNum",0,a])},916005,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_node_buffer_0063pbu._.js"].map(t=>e.l(t))).then(()=>t(951615)))},918707,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(t=>e.l(t))).then(()=>t(407142)))},480599,e=>{e.v(t=>Promise.all(["server/chunks/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(t=>e.l(t))).then(()=>t(417734)))},563921,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_@better-auth_memory-adapter_dist_index_mjs_07pm9hq._.js"].map(t=>e.l(t))).then(()=>t(268905)))},246120,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_better-auth_dist_adapters_kysely-adapter_index_mjs_0.9gz-c._.js"].map(t=>e.l(t))).then(()=>t(69580)))},580632,e=>{e.v(e=>Promise.resolve().then(()=>e(270406)))},787731,e=>{e.v(t=>Promise.all(["server/chunks/0t6k_@better-auth_kysely-adapter_dist_bun-sqlite-dialect-DzNwOpKv_mjs_0zlu99c._.js"].map(t=>e.l(t))).then(()=>t(444599)))},209477,e=>{e.v(t=>Promise.all(["server/chunks/node_modules_@better-auth_kysely-adapter_dist_node-sqlite-dialect_mjs_036w40n._.js"].map(t=>e.l(t))).then(()=>t(689127)))},935319,e=>{e.v(t=>Promise.all(["server/chunks/0_lp_modules_@better-auth_kysely-adapter_dist_d1-sqlite-dialect-C2B7YsIT_mjs_0wg4bd9._.js"].map(t=>e.l(t))).then(()=>t(354422)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0k5hfz1._.js.map
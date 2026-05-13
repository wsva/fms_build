module.exports=[666680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},857764,(a,b,c)=>{b.exports=a.x("node:url",()=>require("node:url"))},522734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},446786,(a,b,c)=>{b.exports=a.x("os",()=>require("os"))},723862,a=>a.a(async(b,c)=>{try{let b=await a.y("pg-587764f78a6c7a9c");a.n(b),c()}catch(a){c(a)}},!0),784941,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6/runtime/client",()=>require("@prisma/client-2c3a283f134fdcb6/runtime/client"))},750227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},902157,(a,b,c)=>{b.exports=a.x("node:fs",()=>require("node:fs"))},912714,(a,b,c)=>{b.exports=a.x("node:fs/promises",()=>require("node:fs/promises"))},660526,(a,b,c)=>{b.exports=a.x("node:os",()=>require("node:os"))},752893,a=>{"use strict";a.s(["DialectAdapterBase",0,class{get supportsCreateIfNotExists(){return!0}get supportsTransactionalDdl(){return!1}get supportsReturning(){return!1}get supportsOutput(){return!1}}])},500992,a=>{"use strict";var b=a.i(776452);let c=/"/g,d=/[\\'"]/g;class e extends b.DefaultQueryCompiler{visitOrAction(a){this.append("or "),this.append(a.action)}getCurrentParameterPlaceholder(){return"?"}getLeftExplainOptionsWrapper(){return""}getRightExplainOptionsWrapper(){return""}getLeftIdentifierWrapper(){return'"'}getRightIdentifierWrapper(){return'"'}getAutoIncrement(){return"autoincrement"}sanitizeIdentifier(a){return a.replace(c,'""')}sanitizeJSONPathMemberValue(a){return a.replace(d,a=>"\\"===a?"\\\\":"'"===a?"''":'\\"')}visitDefaultInsertValue(a){this.append("null")}}a.s(["SqliteQueryCompiler",0,e])},786333,a=>{"use strict";var b=a.i(752893);class c extends b.DialectAdapterBase{get supportsTransactionalDdl(){return!1}get supportsReturning(){return!0}async acquireMigrationLock(a,b){}async releaseMigrationLock(a,b){}}a.s(["SqliteAdapter",0,c])},761771,a=>{"use strict";var b=a.i(405890);a.s(["Prisma",0,b])},353045,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(905246),f=a.i(109307),g=a.i(766518),h=a.i(719406),i=a.i(713095),j=b([g]);async function k(a,b){try{let c=await g.prisma.settings_general.findUnique({where:{user_id_key:{user_id:a,key:b}}});return{status:"success",data:c?.value??""}}catch(a){return console.error(a),{status:"error",error:(0,h.toErrorMessage)(a)}}}async function l(a,b,c){try{return await g.prisma.settings_general.upsert({where:{user_id_key:{user_id:a,key:b}},create:{user_id:a,key:b,value:c},update:{value:c,updated_at:new Date}}),{status:"success",data:void 0}}catch(a){return console.error(a),{status:"error",error:(0,h.toErrorMessage)(a)}}}async function m(a){let b=await f.auth.api.getSession({headers:await (0,e.headers)()}),c=b?.user?.email||"",d=await k(c,a);return"success"===d.status&&"string"==typeof d.data?d.data:null}async function n(a,b){let c=await f.auth.api.getSession({headers:await (0,e.headers)()}),d=c?.user?.email||"";return l(d,a,b)}[g]=j.then?(await j)():j,(0,i.ensureServerEntryExports)([k,l,m,n]),(0,d.registerServerReference)(k,"606f12ad9858958eefeea5d656eb489f156b58c33a",null),(0,d.registerServerReference)(l,"704431ebd1864bf405620b2c6124915f95bc97f6af",null),(0,d.registerServerReference)(m,"40a474201523db7a4e75066d49cc0589c34246c779",null),(0,d.registerServerReference)(n,"603026fce095f858ae7eb8433bd9edb1468bc2d111",null),a.s(["getKey",0,m,"getSetting",0,k,"setKey",0,n,"setSetting",0,l]),c()}catch(a){c(a)}},!1),58651,a=>{"use strict";var b,c=((b={}).Normal="normal",b.Easy="easy",b.Unspecified="unspecified",b.Incomplete="incomplete",b);a.s(["FilterType",()=>c,"TagAll",0,"all tagged","TagNo",0,"not tagged","TagUnspecified",0,"unspecified"])},914621,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(58651),j=a.i(713095),k=b([e]);async function l(a,b,c,d,g,j){let k,l=h.Prisma.sql`
        select * from qsa_card t0 where t0.user_id = ${a}
    `,m=h.Prisma.sql`
        select count(1) as total from qsa_card t0 where t0.user_id = ${a}
    `,n=h.Prisma.sql`
        -- use this condition only when tag_uuid is a uuid
        -- don't use this condition if tag_uuid = unspecified/all/no (always true)
        and (exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid
                and t1.tag_uuid = ${c})
            or ${c} = ${i.TagUnspecified}
            or ${c} = ${i.TagAll}
            or ${c} = ${i.TagNo})
        -- need no condition if tag_uuid = unspecified
        and 1 = 1
        -- use this condition only when tag_uuid = all
        -- don't use this condition if tag_uuid != all (always true)
        and (exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid)
            or ${c} != ${i.TagAll})
        -- use this condition only when tag_uuid = no
        -- don't use this condition if tag_uuid != no
        and (not exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid)
            or ${c} != ${i.TagNo})
    `,o=d.replaceAll(/\s+/g," ").replaceAll(/^\s+|\s+$/g,""),p=d?h.Prisma.sql`
            and (lower(t0.question) like lower(${"%"+o+"%"})
                or lower(t0.answer) like lower(${"%"+o+"%"}))
        `:h.Prisma.sql``,q=h.Prisma.sql`
        limit ${j} offset ${(g-1)*j}
    `,r=h.Prisma.sql`
        order by updated_at desc
    `;switch(b){case i.FilterType.Unspecified:k=h.Prisma.join([n,p]," ");break;case i.FilterType.Normal:k=h.Prisma.join([h.Prisma.sql`
                    and length(t0.question) > 0
                    and length(t0.answer) > 0
                    and t0.familiarity < 6
                `,n,p]," ");break;case i.FilterType.Easy:k=h.Prisma.join([h.Prisma.sql`
                    and t0.familiarity = 6
                `,n,p]," ");break;case i.FilterType.Incomplete:k=h.Prisma.join([h.Prisma.sql`
                    and (length(t0.question) = 0 or length(t0.answer) = 0)
                `,n,p]," ")}try{let a=h.Prisma.join([l,k,r,q]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.join([m,k]," "),d=await e.prisma.$queryRaw(c),f=Number(d[0]?.total||0);return{status:"success",data:b,total_records:f,page:g,total_pages:Math.ceil(f/j)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function m(a){try{let b=await e.prisma.qsa_card.findUnique({where:{uuid:a}});if(!b)return{status:"error",error:"no data found"};return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function n(a){if(0===a.question.length)return{status:"error",error:"invalid card"};try{a.uuid&&""!==a.uuid||(a.uuid=(0,g.getUUID)());let b=await e.prisma.qsa_card.upsert({where:{uuid:a.uuid},create:a,update:a});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function o(a){try{let b=await e.prisma.qsa_card.delete({where:{uuid:a}});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function p(a){try{let[b,c]=await Promise.all([e.prisma.qsa_card.findUnique({where:{uuid:a}}),e.prisma.qsa_card_review.findUnique({where:{uuid:a}})]);if(!b)return{status:"error",error:"no data found"};if(c)return{status:"success",data:{...c,card:b}};return{status:"success",data:{uuid:(0,g.getUUID)(),card_uuid:b.uuid,user_id:b.user_id,interval_days:0,ease_factor:2.5,repetitions:0,familiarity:0,last_review_at:new Date,next_review_at:new Date,card:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function q(a,b){try{let c=await e.prisma.$queryRaw(h.Prisma.sql`SELECT t0.*,
                    row_to_json(c.*) AS card
                FROM qsa_card_review t0
                JOIN qsa_card c ON c.uuid = t0.card_uuid
                WHERE t0.familiarity < 6
                  AND t0.user_id = ${a}
                  AND t0.next_review_at < now()
                  AND EXISTS (SELECT 1 FROM qsa_card_tag t1
                              WHERE t1.card_uuid = t0.card_uuid
                                AND t1.tag_uuid = ${b})
                ORDER BY RANDOM() * (6 - t0.familiarity) DESC
                LIMIT 1`);if(c.length>0)return{status:"success",data:c[0]};let d=await e.prisma.$queryRaw(h.Prisma.sql`SELECT t0.*
                FROM qsa_card t0
                WHERE length(t0.question) > 0
                  AND length(t0.answer) > 0
                  AND t0.familiarity < 6
                  AND t0.user_id = ${a}
                  AND EXISTS (SELECT 1 FROM qsa_card_tag t1
                              WHERE t1.card_uuid = t0.uuid
                                AND t1.tag_uuid = ${b})
                  AND NOT EXISTS (SELECT 1 FROM qsa_card_review r
                                  WHERE r.card_uuid = t0.uuid
                                    AND r.user_id = ${a})
                ORDER BY RANDOM() * (6 - t0.familiarity) DESC
                LIMIT 1`);if(d.length>0)return{status:"success",data:{uuid:(0,g.getUUID)(),card_uuid:d[0].uuid,user_id:d[0].user_id,interval_days:0,ease_factor:2.5,repetitions:0,familiarity:0,last_review_at:new Date,next_review_at:new Date,card:d[0]}};return{status:"error",error:"no card found for test"}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function r(a){try{return await e.prisma.qsa_card_review.upsert({where:{uuid:a.uuid},create:a,update:a}),await e.prisma.qsa_card.update({where:{uuid:a.card_uuid},data:{familiarity:a.familiarity}}),{status:"success",data:null}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function s(a,b){try{return await e.prisma.qsa_card.update({where:{uuid:a},data:{familiarity:b}}),!0}catch(a){return console.error(a),!1}}async function t(a,b){try{let c=await e.prisma.$queryRaw(h.Prisma.sql`select t0.* from qsa_card_tag t0, settings_tag t1 where
                t0.tag_uuid = t1.uuid
                and t0.card_uuid = ${b}
                and t1.user_id in (${a}, 'public')
                `);if(!c)return{status:"error",error:"no data found"};let d={uuid:b,tag_list_added:c.map(a=>a.tag_uuid)};return{status:"success",data:d}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function u(a){if("string"!=typeof a.uuid)return{status:"error",error:"card uuid is empty"};let b=a.uuid;try{return a.tag_list_new&&a.tag_list_new.length>0&&await e.prisma.qsa_card_tag.createMany({data:a.tag_list_new.map(a=>({uuid:(0,g.getUUID)(),card_uuid:b,tag_uuid:a,created_at:new Date,updated_at:new Date}))}),a.tag_list_remove&&a.tag_list_remove.length>0&&await e.prisma.qsa_card_tag.deleteMany({where:{card_uuid:b,tag_uuid:{in:a.tag_list_remove}}}),{status:"success",data:{uuid:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=k.then?(await k)():k,(0,j.ensureServerEntryExports)([l,m,n,o,p,q,r,s,t,u]),(0,d.registerServerReference)(l,"7e28035bfdc233f27267cfcecc789ef0599b0a6a53",null),(0,d.registerServerReference)(m,"40173b9875138b07e1a4024844aef7e72267589cd9",null),(0,d.registerServerReference)(n,"402be7bd96da059929264f8fd001907ca2be1ba20e",null),(0,d.registerServerReference)(o,"400019a15a2664ac769f9e6f54b346579a71d759c7",null),(0,d.registerServerReference)(p,"40f3baf5c26f772ffd5e96022b1e5d4ba26170fa94",null),(0,d.registerServerReference)(q,"603b9995fb645b69409ade07c3b9b8fa17ac6e0eaf",null),(0,d.registerServerReference)(r,"4055c7213749d6910c0dd5f077e8dd3efdc834b6fd",null),(0,d.registerServerReference)(s,"60da5e6f3feec327593c79bfca95a665e98289efe9",null),(0,d.registerServerReference)(t,"6073b4c6ea26e96b31677f42a0d7ed0d4efb4d2227",null),(0,d.registerServerReference)(u,"40168d2ed2262d476d91829e93399b5958a02d328a",null),a.s(["getCard",0,m,"getCardAll",0,l,"getCardTag",0,t,"getCardTest",0,q,"getCardTestByUUID",0,p,"removeCard",0,o,"saveCard",0,n,"saveCardReview",0,r,"saveCardTag",0,u,"setCardFamiliarity",0,s]),c()}catch(a){c(a)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__0t4v7fp._.js.map
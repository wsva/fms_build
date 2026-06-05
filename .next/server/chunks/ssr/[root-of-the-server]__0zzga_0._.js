module.exports=[750227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},902157,(a,b,c)=>{b.exports=a.x("node:fs",()=>require("node:fs"))},912714,(a,b,c)=>{b.exports=a.x("node:fs/promises",()=>require("node:fs/promises"))},660526,(a,b,c)=>{b.exports=a.x("node:os",()=>require("node:os"))},666680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},857764,(a,b,c)=>{b.exports=a.x("node:url",()=>require("node:url"))},522734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},446786,(a,b,c)=>{b.exports=a.x("os",()=>require("os"))},723862,a=>a.a(async(b,c)=>{try{let b=await a.y("pg-587764f78a6c7a9c");a.n(b),c()}catch(a){c(a)}},!0),784941,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6/runtime/client",()=>require("@prisma/client-2c3a283f134fdcb6/runtime/client"))},752893,a=>{"use strict";a.s(["DialectAdapterBase",0,class{get supportsCreateIfNotExists(){return!0}get supportsTransactionalDdl(){return!1}get supportsReturning(){return!1}get supportsOutput(){return!1}}])},500992,a=>{"use strict";var b=a.i(776452);let c=/"/g,d=/[\\'"]/g;class e extends b.DefaultQueryCompiler{visitOrAction(a){this.append("or "),this.append(a.action)}getCurrentParameterPlaceholder(){return"?"}getLeftExplainOptionsWrapper(){return""}getRightExplainOptionsWrapper(){return""}getLeftIdentifierWrapper(){return'"'}getRightIdentifierWrapper(){return'"'}getAutoIncrement(){return"autoincrement"}sanitizeIdentifier(a){return a.replace(c,'""')}sanitizeJSONPathMemberValue(a){return a.replace(d,a=>"\\"===a?"\\\\":"'"===a?"''":'\\"')}visitDefaultInsertValue(a){this.append("null")}}a.s(["SqliteQueryCompiler",0,e])},786333,a=>{"use strict";var b=a.i(752893);class c extends b.DialectAdapterBase{get supportsTransactionalDdl(){return!1}get supportsReturning(){return!0}async acquireMigrationLock(a,b){}async releaseMigrationLock(a,b){}}a.s(["SqliteAdapter",0,c])},761771,a=>{"use strict";var b=a.i(405890);a.s(["Prisma",0,b])},353045,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(905246),f=a.i(109307),g=a.i(766518),h=a.i(719406),i=a.i(713095),j=b([g]);async function k(a,b){try{let c=await g.prisma.settings_general.findUnique({where:{user_id_key:{user_id:a,key:b}}});return{status:"success",data:c?.value??""}}catch(a){return console.error(a),{status:"error",error:(0,h.toErrorMessage)(a)}}}async function l(a,b,c){try{return await g.prisma.settings_general.upsert({where:{user_id_key:{user_id:a,key:b}},create:{user_id:a,key:b,value:c},update:{value:c,updated_at:new Date}}),{status:"success",data:void 0}}catch(a){return console.error(a),{status:"error",error:(0,h.toErrorMessage)(a)}}}async function m(a){let b=await f.auth.api.getSession({headers:await (0,e.headers)()}),c=b?.user?.email||"",d=await k(c,a);return"success"===d.status&&"string"==typeof d.data?d.data:null}async function n(a,b){let c=await f.auth.api.getSession({headers:await (0,e.headers)()}),d=c?.user?.email||"";return l(d,a,b)}[g]=j.then?(await j)():j,(0,i.ensureServerEntryExports)([k,l,m,n]),(0,d.registerServerReference)(k,"609ba7a13b607b42959c748c080029cef058527eb5",null),(0,d.registerServerReference)(l,"70e2b61a3a7b6207c0309085bb61d4dc0b5959877e",null),(0,d.registerServerReference)(m,"40c3dc3a14204cebd86fa5f0079ee17e154244df62",null),(0,d.registerServerReference)(n,"60065e7321d78120ec1b29639bbeea9f2d7ed00746",null),a.s(["getKey",0,m,"getSetting",0,k,"setKey",0,n,"setSetting",0,l]),c()}catch(a){c(a)}},!1),58651,a=>{"use strict";var b,c=((b={}).Normal="normal",b.Easy="easy",b.Unspecified="unspecified",b.Incomplete="incomplete",b);a.s(["FilterType",()=>c,"TagAll",0,"all tagged","TagNo",0,"not tagged","TagUnspecified",0,"unspecified","normalizeQuestion",0,function(a){let b=a.trim().toLowerCase();return(b=(b=b.replace(/\s+/g," ")).replace(/[?.!,;:]+$/,"")).replace(/^(der|die|das|ein|eine|sich)\s+(\S+)$/,"$2")}])},914621,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(254799),f=a.i(766518),g=a.i(719406),h=a.i(139138);a.i(659281);var i=a.i(761771),j=a.i(58651),k=a.i(713095),l=b([f]);function m(a){return(0,e.createHash)("sha256").update((0,j.normalizeQuestion)(a)).digest("hex")}async function n(a,b,c,d,e,h){let k,l=i.Prisma.sql`
        select * from qsa_card t0 where t0.user_id = ${a}
    `,m=i.Prisma.sql`
        select count(1) as total from qsa_card t0 where t0.user_id = ${a}
    `,n=i.Prisma.sql`
        -- use this condition only when tag_uuid is a uuid
        -- don't use this condition if tag_uuid = unspecified/all/no (always true)
        and (exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid
                and t1.tag_uuid = ${c})
            or ${c} = ${j.TagUnspecified}
            or ${c} = ${j.TagAll}
            or ${c} = ${j.TagNo})
        -- need no condition if tag_uuid = unspecified
        and 1 = 1
        -- use this condition only when tag_uuid = all
        -- don't use this condition if tag_uuid != all (always true)
        and (exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid)
            or ${c} != ${j.TagAll})
        -- use this condition only when tag_uuid = no
        -- don't use this condition if tag_uuid != no
        and (not exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid)
            or ${c} != ${j.TagNo})
    `,o=d.replaceAll(/\s+/g," ").replaceAll(/^\s+|\s+$/g,""),p=d?i.Prisma.sql`
            and (lower(t0.question) like lower(${"%"+o+"%"})
                or lower(t0.answer) like lower(${"%"+o+"%"}))
        `:i.Prisma.sql``,q=i.Prisma.sql`
        limit ${h} offset ${(e-1)*h}
    `,r=i.Prisma.sql`
        order by updated_at desc
    `;switch(b){case j.FilterType.Unspecified:k=i.Prisma.join([n,p]," ");break;case j.FilterType.Normal:k=i.Prisma.join([i.Prisma.sql`
                    and length(t0.question) > 0
                    and length(t0.answer) > 0
                    and t0.familiarity < 6
                `,n,p]," ");break;case j.FilterType.Easy:k=i.Prisma.join([i.Prisma.sql`
                    and t0.familiarity = 6
                `,n,p]," ");break;case j.FilterType.Incomplete:k=i.Prisma.join([i.Prisma.sql`
                    and (length(t0.question) = 0 or length(t0.answer) = 0)
                `,n,p]," ")}try{let a=i.Prisma.join([l,k,r,q]," "),b=await f.prisma.$queryRaw(a),c=i.Prisma.join([m,k]," "),d=await f.prisma.$queryRaw(c),g=Number(d[0]?.total||0);return{status:"success",data:b,total_records:g,page:e,total_pages:Math.ceil(g/h)}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function o(a){try{let b=await f.prisma.qsa_card.findUnique({where:{uuid:a}});if(!b)return{status:"error",error:"no data found"};return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function p(a){if(0===a.question.length)return{status:"error",error:"invalid card"};try{a.uuid&&""!==a.uuid||(a.uuid=(0,h.getUUID)());let b=await f.prisma.qsa_card.upsert({where:{uuid:a.uuid},create:a,update:a}),c=m(a.question);return await f.prisma.$executeRaw`UPDATE qsa_card SET question_hash = ${c} WHERE uuid = ${a.uuid}`,{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function q(a,b){if(!a.trim())return{status:"success",data:[]};let c=m(a);try{let a=b?await f.prisma.$queryRaw(i.Prisma.sql`SELECT * FROM qsa_card WHERE question_hash = ${c} AND uuid != ${b} LIMIT 10`):await f.prisma.$queryRaw(i.Prisma.sql`SELECT * FROM qsa_card WHERE question_hash = ${c} LIMIT 10`);return{status:"success",data:a}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function r(a){let b=[...new Set(a.map(a=>a.trim()).filter(Boolean).map(m))];if(!b.length)return{status:"success",data:[]};try{let a=await f.prisma.$queryRaw(i.Prisma.sql`SELECT * FROM qsa_card WHERE question_hash IN (${i.Prisma.join(b)}) LIMIT 20`);return{status:"success",data:a}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function s(a){try{let b=await f.prisma.qsa_card.delete({where:{uuid:a}});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function t(a){try{let[b,c]=await Promise.all([f.prisma.qsa_card.findUnique({where:{uuid:a}}),f.prisma.qsa_card_review.findUnique({where:{uuid:a}})]);if(!b)return{status:"error",error:"no data found"};if(c)return{status:"success",data:{...c,card:b}};return{status:"success",data:{uuid:(0,h.getUUID)(),card_uuid:b.uuid,user_id:b.user_id,interval_days:0,ease_factor:2.5,repetitions:0,familiarity:0,last_review_at:new Date,next_review_at:new Date,card:b}}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function u(a,b){try{let c=await f.prisma.$queryRaw(i.Prisma.sql`SELECT t0.*,
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
                LIMIT 1`);if(c.length>0)return{status:"success",data:c[0]};let d=await f.prisma.$queryRaw(i.Prisma.sql`SELECT t0.*
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
                LIMIT 1`);if(d.length>0)return{status:"success",data:{uuid:(0,h.getUUID)(),card_uuid:d[0].uuid,user_id:d[0].user_id,interval_days:0,ease_factor:2.5,repetitions:0,familiarity:0,last_review_at:new Date,next_review_at:new Date,card:d[0]}};return{status:"error",error:"no card found for test"}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function v(a){try{return await f.prisma.qsa_card_review.upsert({where:{uuid:a.uuid},create:a,update:a}),await f.prisma.qsa_card.update({where:{uuid:a.card_uuid},data:{familiarity:a.familiarity}}),{status:"success",data:null}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function w(a,b){try{return await f.prisma.qsa_card.update({where:{uuid:a},data:{familiarity:b}}),!0}catch(a){return console.error(a),!1}}async function x(a,b){try{let c=await f.prisma.$queryRaw(i.Prisma.sql`select t0.* from qsa_card_tag t0, settings_tag t1 where
                t0.tag_uuid = t1.uuid
                and t0.card_uuid = ${b}
                and t1.user_id in (${a}, 'public')
                `);if(!c)return{status:"error",error:"no data found"};let d={uuid:b,tag_list_added:c.map(a=>a.tag_uuid)};return{status:"success",data:d}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}async function y(a){if("string"!=typeof a.uuid)return{status:"error",error:"card uuid is empty"};let b=a.uuid;try{return a.tag_list_new&&a.tag_list_new.length>0&&await f.prisma.qsa_card_tag.createMany({data:a.tag_list_new.map(a=>({uuid:(0,h.getUUID)(),card_uuid:b,tag_uuid:a,created_at:new Date,updated_at:new Date}))}),a.tag_list_remove&&a.tag_list_remove.length>0&&await f.prisma.qsa_card_tag.deleteMany({where:{card_uuid:b,tag_uuid:{in:a.tag_list_remove}}}),{status:"success",data:{uuid:b}}}catch(a){return console.error(a),{status:"error",error:(0,g.toErrorMessage)(a)}}}[f]=l.then?(await l)():l,(0,k.ensureServerEntryExports)([n,o,p,q,r,s,t,u,v,w,x,y]),(0,d.registerServerReference)(n,"7e2614f231f50e68c36f27423f994c02b258ddacfd",null),(0,d.registerServerReference)(o,"4088d574e6053ea81dd80bbdcf51820dac527beada",null),(0,d.registerServerReference)(p,"4018983372a381ba6aa018e868d48b5737079c42e7",null),(0,d.registerServerReference)(q,"605a11dd027c3af0a50dd8207fc5cfbee99e594ddc",null),(0,d.registerServerReference)(r,"403d637a684835c6106c4a39603ca7de02e3042d49",null),(0,d.registerServerReference)(s,"403b5dd6679cac4b3055c709ec69753b6265b1cc57",null),(0,d.registerServerReference)(t,"40c11d1ebe33f78838515e1c6f70fda48f4f00d81e",null),(0,d.registerServerReference)(u,"60f6d585caac29baf7e66e67d80634d328c28d944d",null),(0,d.registerServerReference)(v,"40ff2dbdf9b6280b2637e7ce98beb235f3b747d275",null),(0,d.registerServerReference)(w,"60e518e341142df240e40f2099201de71c3c940cb7",null),(0,d.registerServerReference)(x,"604b6a9bec930ec109bbd0118acd3e9c844e7161e7",null),(0,d.registerServerReference)(y,"408ef363155a7e33e17a2e584abc27464175d149e1",null),a.s(["getCard",0,o,"getCardAll",0,n,"getCardTag",0,x,"getCardTest",0,u,"getCardTestByUUID",0,t,"getCardsByQuestionHash",0,q,"getCardsByQuestionHashes",0,r,"removeCard",0,s,"saveCard",0,p,"saveCardReview",0,v,"saveCardTag",0,y,"setCardFamiliarity",0,w]),c()}catch(a){c(a)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__0zzga_0._.js.map
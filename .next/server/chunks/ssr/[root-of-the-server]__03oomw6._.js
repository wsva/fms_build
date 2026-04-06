module.exports=[254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},666680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},750227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},857764,(a,b,c)=>{b.exports=a.x("node:url",()=>require("node:url"))},446786,(a,b,c)=>{b.exports=a.x("os",()=>require("os"))},522734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},723862,a=>a.a(async(b,c)=>{try{let b=await a.y("pg-587764f78a6c7a9c");a.n(b),c()}catch(a){c(a)}},!0),784941,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6/runtime/client",()=>require("@prisma/client-2c3a283f134fdcb6/runtime/client"))},761771,a=>{"use strict";var b=a.i(405890);a.s(["Prisma",0,b])},58651,a=>{"use strict";var b,c=((b={}).Normal="normal",b.Easy="easy",b.Unspecified="unspecified",b.Uncomplete="uncomplete",b);a.s(["FilterType",()=>c,"TagAll",0,"all tagged","TagNo",0,"not tagged","TagUnspecified",0,"unspecified"])},914621,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(58651),j=a.i(713095),k=b([e]);async function l(a,b,c,d,g,j){let k,l=h.Prisma.sql`
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
                `,n,p]," ");break;case i.FilterType.Uncomplete:k=h.Prisma.join([h.Prisma.sql`
                    and (length(t0.question) = 0 or length(t0.answer) = 0)
                `,n,p]," ")}try{let a=h.Prisma.join([l,k,r,q]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.join([m,k]," "),d=await e.prisma.$queryRaw(c),f=Number(d[0]?.total||0);return{status:"success",data:b,total_records:f,page:g,total_pages:Math.ceil(f/j)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function m(a){try{let b=await e.prisma.qsa_card.findUnique({where:{uuid:a}});if(!b)return{status:"error",error:"no data found"};return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function n(a){if(0===a.question.length||0===a.answer.length)return{status:"error",error:"invalid card"};try{a.uuid&&""!==a.uuid||(a.uuid=(0,g.getUUID)());let b=await e.prisma.qsa_card.upsert({where:{uuid:a.uuid},create:a,update:a});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function o(a){try{let b=await e.prisma.qsa_card.delete({where:{uuid:a}});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function p(a){try{let[b,c]=await Promise.all([e.prisma.qsa_card.findUnique({where:{uuid:a}}),e.prisma.qsa_card_review.findUnique({where:{uuid:a}})]);if(!b)return{status:"error",error:"no data found"};if(c)return{status:"success",data:{...c,card:b}};return{status:"success",data:{uuid:(0,g.getUUID)(),card_uuid:b.uuid,user_id:b.user_id,interval_days:0,ease_factor:2.5,repetitions:0,familiarity:0,last_review_at:new Date,next_review_at:new Date,card:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function q(a,b){try{let c=await e.prisma.$queryRaw(h.Prisma.sql`SELECT t0.*,
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
                LIMIT 1`);if(d.length>0)return{status:"success",data:{uuid:(0,g.getUUID)(),card_uuid:d[0].uuid,user_id:d[0].user_id,interval_days:0,ease_factor:2.5,repetitions:0,familiarity:0,last_review_at:new Date,next_review_at:new Date,card:d[0]}};return{status:"error",error:"no card found for test"}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function r(a){try{return await e.prisma.qsa_card_review.upsert({where:{uuid:a.uuid},create:a,update:a}),await e.prisma.qsa_card.update({where:{uuid:a.card_uuid},data:{familiarity:a.familiarity}}),{status:"success",data:null}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function s(a,b){try{return await e.prisma.qsa_card.update({where:{uuid:a},data:{familiarity:b}}),!0}catch(a){return console.error(a),!1}}async function t(a){try{let b=await e.prisma.qsa_tag.findUnique({where:{uuid:a}});if(!b)return{status:"error",error:"no data found"};return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function u(a){try{let b=await e.prisma.qsa_tag.findMany({where:{OR:[{user_id:a},{user_id:"public"}]},orderBy:{tag:"asc"}});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function v(a){if(0===a.tag.length)return{status:"error",error:"empty tag content"};try{a.uuid&&""!==a.uuid||(a.uuid=(0,g.getUUID)());let b=await e.prisma.qsa_tag.upsert({where:{uuid:a.uuid},create:a,update:a});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function w(a){try{let b=await e.prisma.qsa_tag.create({data:a});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function x(a){if(a.match(/_by_system$/))return{status:"error",error:"cannot remove tag created by system"};try{let b=await e.prisma.qsa_tag.delete({where:{uuid:a}});return await e.prisma.qsa_card_tag.deleteMany({where:{tag_uuid:a}}),{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function y(a,b){try{let c=await e.prisma.$queryRaw(h.Prisma.sql`select t0.* from qsa_card_tag t0, qsa_tag t1 where
                t0.tag_uuid = t1.uuid
                and t0.card_uuid = ${b}
                and t1.user_id in (${a}, 'public')
                `);if(!c)return{status:"error",error:"no data found"};let d={uuid:b,tag_list_added:c.map(a=>a.tag_uuid)};return{status:"success",data:d}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function z(a){if("string"!=typeof a.uuid)return{status:"error",error:"card uuid is empty"};let b=a.uuid;try{return a.tag_list_new&&a.tag_list_new.length>0&&await e.prisma.qsa_card_tag.createMany({data:a.tag_list_new.map(a=>({uuid:(0,g.getUUID)(),card_uuid:b,tag_uuid:a,created_at:new Date,updated_at:new Date}))}),a.tag_list_remove&&a.tag_list_remove.length>0&&await e.prisma.qsa_card_tag.deleteMany({where:{card_uuid:b,tag_uuid:{in:a.tag_list_remove}}}),{status:"success",data:{uuid:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=k.then?(await k)():k,(0,j.ensureServerEntryExports)([l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]),(0,d.registerServerReference)(l,"7eb9558ef4fe059e786bc6bbdf108575fb083cad52",null),(0,d.registerServerReference)(m,"40307582454f790091a66510cb2a08e26b2f7f2524",null),(0,d.registerServerReference)(n,"4060e9d5bc5b1e8580f0cafe09090e189c97a40aca",null),(0,d.registerServerReference)(o,"4018206b4172d65dcc3fb2a13b1f1dd3da57278d30",null),(0,d.registerServerReference)(p,"405c6eeb97c9f8f918a0ef3a32725c6f7b21c7e9cc",null),(0,d.registerServerReference)(q,"607a5291e5645ba76df32b04e9759317c553285b75",null),(0,d.registerServerReference)(r,"405440ab00b657e06cf48798b1bd2a34df4081437c",null),(0,d.registerServerReference)(s,"60e00e09a4d6574f918bdd6166c0bce2cf84031a7b",null),(0,d.registerServerReference)(t,"404e3282a8dcfc13ca759c0cc2fe6c209188edfe5f",null),(0,d.registerServerReference)(u,"406f416fcea79c92e79a071b8b6059fe923154c95a",null),(0,d.registerServerReference)(v,"404c9e0cf1b8f5b6019dfae67d529ff704cddb4e8a",null),(0,d.registerServerReference)(w,"40fc210c0c0565ca374271337b40057a93220c2520",null),(0,d.registerServerReference)(x,"40a8b1619f8adc1c5f9440b9fc0488603f18002cd5",null),(0,d.registerServerReference)(y,"6023bf0446a9ae44b006bcebc16ea5c2f5b8aa979e",null),(0,d.registerServerReference)(z,"40db994d64176e5a91f4d79d62c6b885956c23838e",null),a.s(["createTag",0,w,"getCard",0,m,"getCardAll",0,l,"getCardTag",0,y,"getCardTest",0,q,"getCardTestByUUID",0,p,"getTag",0,t,"getTagAll",0,u,"removeCard",0,o,"removeTag",0,x,"saveCard",0,n,"saveCardReview",0,r,"saveCardTag",0,z,"saveTag",0,v,"setCardFamiliarity",0,s]),c()}catch(a){c(a)}},!1),192111,a=>a.a(async(b,c)=>{try{var d=a.i(914621),e=b([d]);[d]=e.then?(await e)():e,a.s([]),c()}catch(a){c(a)}},!1),406179,a=>a.a(async(b,c)=>{try{var d=a.i(192111),e=a.i(914621),f=b([d,e]);[d,e]=f.then?(await f)():f,a.s(["4018206b4172d65dcc3fb2a13b1f1dd3da57278d30",()=>e.removeCard,"40307582454f790091a66510cb2a08e26b2f7f2524",()=>e.getCard,"404c9e0cf1b8f5b6019dfae67d529ff704cddb4e8a",()=>e.saveTag,"404e3282a8dcfc13ca759c0cc2fe6c209188edfe5f",()=>e.getTag,"405440ab00b657e06cf48798b1bd2a34df4081437c",()=>e.saveCardReview,"405c6eeb97c9f8f918a0ef3a32725c6f7b21c7e9cc",()=>e.getCardTestByUUID,"4060e9d5bc5b1e8580f0cafe09090e189c97a40aca",()=>e.saveCard,"406f416fcea79c92e79a071b8b6059fe923154c95a",()=>e.getTagAll,"40a8b1619f8adc1c5f9440b9fc0488603f18002cd5",()=>e.removeTag,"40db994d64176e5a91f4d79d62c6b885956c23838e",()=>e.saveCardTag,"40fc210c0c0565ca374271337b40057a93220c2520",()=>e.createTag,"6023bf0446a9ae44b006bcebc16ea5c2f5b8aa979e",()=>e.getCardTag,"607a5291e5645ba76df32b04e9759317c553285b75",()=>e.getCardTest,"60e00e09a4d6574f918bdd6166c0bce2cf84031a7b",()=>e.setCardFamiliarity,"7eb9558ef4fe059e786bc6bbdf108575fb083cad52",()=>e.getCardAll]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__03oomw6._.js.map
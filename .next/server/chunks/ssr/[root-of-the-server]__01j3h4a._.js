module.exports=[254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},666680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},750227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},857764,(a,b,c)=>{b.exports=a.x("node:url",()=>require("node:url"))},522734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},446786,(a,b,c)=>{b.exports=a.x("os",()=>require("os"))},723862,a=>a.a(async(b,c)=>{try{let b=await a.y("pg-587764f78a6c7a9c");a.n(b),c()}catch(a){c(a)}},!0),784941,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6/runtime/client",()=>require("@prisma/client-2c3a283f134fdcb6/runtime/client"))},504446,(a,b,c)=>{b.exports=a.x("net",()=>require("net"))},449719,(a,b,c)=>{b.exports=a.x("assert",()=>require("assert"))},870722,(a,b,c)=>{b.exports=a.x("tty",()=>require("tty"))},524836,(a,b,c)=>{b.exports=a.x("https",()=>require("https"))},921517,(a,b,c)=>{b.exports=a.x("http",()=>require("http"))},755004,(a,b,c)=>{b.exports=a.x("tls",()=>require("tls"))},792509,(a,b,c)=>{b.exports=a.x("url",()=>require("url"))},688947,(a,b,c)=>{b.exports=a.x("stream",()=>require("stream"))},924868,(a,b,c)=>{b.exports=a.x("fs/promises",()=>require("fs/promises"))},500874,(a,b,c)=>{b.exports=a.x("buffer",()=>require("buffer"))},761095,(a,b,c)=>{b.exports=a.x("node:net",()=>require("node:net"))},81111,(a,b,c)=>{b.exports=a.x("node:stream",()=>require("node:stream"))},761771,a=>{"use strict";var b=a.i(405890);a.s(["Prisma",0,b])},58651,a=>{"use strict";var b,c=((b={}).Normal="normal",b.Easy="easy",b.Unspecified="unspecified",b.Uncomplete="uncomplete",b);a.s(["FilterType",()=>c,"TagAll",0,"all tagged","TagNo",0,"not tagged","TagUnspecified",0,"unspecified"])},914621,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(58651),j=a.i(713095),k=b([e]);async function l(a,b,c,d,g,j){let k,l=h.Prisma.sql`
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
                `,n,p]," ")}try{let a=h.Prisma.join([l,k,r,q]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.join([m,k]," "),d=await e.prisma.$queryRaw(c),f=Number(d[0]?.total||0);return{status:"success",data:b,total_records:f,page:g,total_pages:Math.ceil(f/j)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function m(a){try{let b=await e.prisma.qsa_card.findUnique({where:{uuid:a}});if(!b)return{status:"error",error:"no data found"};return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function n(a){if(0===a.question.length||0===a.answer.length)return{status:"error",error:"invalid card"};try{a.uuid&&""!==a.uuid||(a.uuid=(0,g.getUUID)());let b=await e.prisma.qsa_card.upsert({where:{uuid:a.uuid},create:a,update:a});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function o(a){try{let b=await e.prisma.qsa_card.delete({where:{uuid:a}});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function p(a){try{let[b,c]=await Promise.all([e.prisma.qsa_card.findUnique({where:{uuid:a}}),e.prisma.qsa_card_review.findUnique({where:{uuid:a}})]);if(!b)return{status:"error",error:"no data found"};if(c)return{status:"success",data:{...c,card:b}};return{status:"success",data:{uuid:(0,g.getUUID)(),card_uuid:b.uuid,user_id:b.user_id,interval_days:0,ease_factor:0,repetitions:0,familiarity:0,last_review_at:new Date,next_review_at:new Date,card:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function q(a,b){try{let c=await e.prisma.$queryRaw(h.Prisma.sql`SELECT t0.*
                    FROM qsa_card_review t0
                    WHERE t0.familiarity < 6
                    and t0.user_id = ${a}
                    and t0.next_review_at < now()
                    and exists (select 1 from qsa_card_tag t1 where
                        t1.card_uuid = t0.card_uuid
                        and t1.tag_uuid = ${b})
                    `);if(c.length>0){let a=c.map(a=>6-a.familiarity),b=c[(0,g.getWeightedRandom)(a)],d=await e.prisma.qsa_card.findUnique({where:{uuid:b.card_uuid}});if(!d)return{status:"error",error:`no card found by uuid: ${b.card_uuid}`};return{status:"success",data:{...b,card:d}}}let d=await e.prisma.$queryRaw(h.Prisma.sql`SELECT t0.* 
                FROM qsa_card t0 
                WHERE length(t0.question) > 0
                and length(t0.answer) > 0
                and t0.familiarity < 6
                and t0.user_id = ${a}
                and exists (select 1 from qsa_card_tag t1 where
                    t1.card_uuid = t0.uuid
                    and t1.tag_uuid = ${b})
                `);if(d.length>0){let a=d.map(a=>6-a.familiarity),b=(0,g.getWeightedRandom)(a);return{status:"success",data:{uuid:(0,g.getUUID)(),card_uuid:d[b].uuid,user_id:d[b].user_id,interval_days:0,ease_factor:0,repetitions:0,familiarity:0,last_review_at:new Date,next_review_at:new Date,card:d[b]}}}return{status:"error",error:"no card found for test"}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function r(a){try{return await e.prisma.qsa_card_review.upsert({where:{uuid:a.uuid},create:a,update:a}),await e.prisma.qsa_card.update({where:{uuid:a.card_uuid},data:{familiarity:a.familiarity}}),!0}catch(a){return console.error(a),!1}}async function s(a,b){try{return await e.prisma.qsa_card.update({where:{uuid:a},data:{familiarity:b}}),!0}catch(a){return console.error(a),!1}}async function t(a){try{let b=await e.prisma.qsa_tag.findUnique({where:{uuid:a}});if(!b)return{status:"error",error:"no data found"};return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function u(a){try{let b=await e.prisma.qsa_tag.findMany({where:{OR:[{user_id:a},{user_id:"public"}]},orderBy:{tag:"asc"}});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function v(a){if(0===a.tag.length)return{status:"error",error:"empty tag content"};try{a.uuid&&""!==a.uuid||(a.uuid=(0,g.getUUID)());let b=await e.prisma.qsa_tag.upsert({where:{uuid:a.uuid},create:a,update:a});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function w(a){try{let b=await e.prisma.qsa_tag.create({data:a});return{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function x(a){if(a.match(/_by_system$/))return{status:"error",error:"cannot remove tag created by system"};try{let b=await e.prisma.qsa_tag.delete({where:{uuid:a}});return await e.prisma.qsa_card_tag.deleteMany({where:{tag_uuid:a}}),{status:"success",data:b}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function y(a,b){try{let c=await e.prisma.$queryRaw(h.Prisma.sql`select t0.* from qsa_card_tag t0, qsa_tag t1 where
                t0.tag_uuid = t1.uuid
                and t0.card_uuid = ${b}
                and t1.user_id in (${a}, 'public')
                `);if(!c)return{status:"error",error:"no data found"};let d={uuid:b,tag_list_added:c.map(a=>a.tag_uuid)};return{status:"success",data:d}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function z(a){if("string"!=typeof a.uuid)return{status:"error",error:"card uuid is empty"};let b=a.uuid;try{return a.tag_list_new&&a.tag_list_new.length>0&&await e.prisma.qsa_card_tag.createMany({data:a.tag_list_new.map(a=>({uuid:(0,g.getUUID)(),card_uuid:b,tag_uuid:a,created_at:new Date,updated_at:new Date}))}),a.tag_list_remove&&a.tag_list_remove.length>0&&await e.prisma.qsa_card_tag.deleteMany({where:{card_uuid:b,tag_uuid:{in:a.tag_list_remove}}}),{status:"success",data:{uuid:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=k.then?(await k)():k,(0,j.ensureServerEntryExports)([l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]),(0,d.registerServerReference)(l,"7e90246aa2656e2f48e7b03ca867b6184cb45a4537",null),(0,d.registerServerReference)(m,"40104992633b5d4c39a21599d20bb7587b84a493e6",null),(0,d.registerServerReference)(n,"40e663f9e135a5558c1e900e8fd68e530b4f5a0313",null),(0,d.registerServerReference)(o,"4002efe62c5b419b6a55be8f9bb92ddfa2e463adc0",null),(0,d.registerServerReference)(p,"404fab41876c2d6b9bfcae7867e53e2e29650eb898",null),(0,d.registerServerReference)(q,"6030fe82b85ffa448dae9fd0b02f56d3ea553155ba",null),(0,d.registerServerReference)(r,"40e8c2d8cadd3584ef1d3a922300ca25fc4fd8bca5",null),(0,d.registerServerReference)(s,"60c71a9eee0c1247a9363b81a43af945aed3007bd0",null),(0,d.registerServerReference)(t,"40ef79a3226d7716d2c92118662ae22dead6ded7dd",null),(0,d.registerServerReference)(u,"40a84cc895421b42a5e3fe222d1c7e67fa5a4e9888",null),(0,d.registerServerReference)(v,"40d81fd4d4b7eb8737bce788a918d38535e76531a0",null),(0,d.registerServerReference)(w,"40a4448582499d0910f37496f6b796608e98c64bad",null),(0,d.registerServerReference)(x,"403bf43bd14bca4a4aa4d37814014f783d01819d28",null),(0,d.registerServerReference)(y,"6020859598c1ec826c0003179e191cd6abc1ff6cee",null),(0,d.registerServerReference)(z,"409d087dc41ecdb6375c2668344118fe3b2bb6c776",null),a.s(["createTag",0,w,"getCard",0,m,"getCardAll",0,l,"getCardTag",0,y,"getCardTest",0,q,"getCardTestByUUID",0,p,"getTag",0,t,"getTagAll",0,u,"removeCard",0,o,"removeTag",0,x,"saveCard",0,n,"saveCardReview",0,r,"saveCardTag",0,z,"saveTag",0,v,"setCardFamiliarity",0,s]),c()}catch(a){c(a)}},!1),907101,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(713095),j=b([e]);async function k(){try{let a=await e.prisma.qsa_card.findMany({select:{user_id:!0},distinct:["user_id"]});return{status:"success",data:a.map(a=>a.user_id)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=j.then?(await j)():j;let l=async(a,b)=>{try{return await e.prisma.$transaction(async c=>{let d=(await c.$queryRaw(h.Prisma.sql`
                select c.uuid
                from qsa_card c
                join qsa_card_tag t on t.card_uuid = c.uuid
                where c.user_id = ${a}
                  and t.tag_uuid = ${b}
            `)).map(a=>a.uuid);if(0!==d.length)for(let e of(await c.$executeRaw(h.Prisma.sql`
                delete from qsa_card_tag t
                using qsa_card c
                where t.card_uuid = c.uuid
                  and c.user_id = ${a}
                  and t.tag_uuid = ${b}
            `),d))await c.$executeRaw(h.Prisma.sql`
                    delete from qsa_card c
                    where c.user_id = ${a}
                      and c.uuid = ${e}
                      and not exists (select 1 from qsa_card_tag t where t.card_uuid = c.uuid)
                `)}),{status:"success",data:!0}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}},m=async(a,b,c,d)=>{try{return await e.prisma.$transaction(async e=>{let f=(await e.$queryRaw(h.Prisma.sql`
                select c.uuid
                from qsa_card c
                join qsa_card_tag t on t.card_uuid = c.uuid
                where c.user_id = ${a}
                  and t.tag_uuid = ${b}
                  and length(c.question) > 0
                  and length(c.answer) > 0
            `)).map(a=>a.uuid);if(0!==f.length)for(let a of f){let b=(0,g.getUUID)(),f=await e.qsa_card.findUnique({where:{uuid:a}});if(!f)throw Error(`card not found by uuid: ${a}`);await e.qsa_card.create({data:{...f,uuid:b,user_id:c}}),await e.qsa_card_tag.create({data:{uuid:(0,g.getUUID)(),card_uuid:b,tag_uuid:d,created_at:new Date,updated_at:new Date}})}}),{status:"success",data:!0}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}};(0,i.ensureServerEntryExports)([k,l,m]),(0,d.registerServerReference)(k,"00f6729adccc3a7eb484df601795979b75f6e1c2a7",null),(0,d.registerServerReference)(l,"60b4aac7d85bdcedd8f5b9ccb8fe37d6c9c61b6411",null),(0,d.registerServerReference)(m,"78728f6379eae7db68f397ccee843ed97d3a9e8e44",null),a.s(["copyCardsByTag",0,m,"getUserIDAll",0,k,"removeCardsByTag",0,l]),c()}catch(a){c(a)}},!1),340833,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(907101),f=a.i(914621),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s([]),c()}catch(a){c(a)}},!1),815963,a=>a.a(async(b,c)=>{try{var d=a.i(340833),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(907101),i=a.i(914621),j=b([d,e,h,i]);[d,e,h,i]=j.then?(await j)():j,a.s(["0047f87d4e351e67699498e63ced153f0396ee4f20",()=>e.initCmdHelpMap,"00eb9f6f38f4f74a5d9ba485cf3455b75564c745b6",()=>e.initCmdMap,"00f6729adccc3a7eb484df601795979b75f6e1c2a7",()=>h.getUserIDAll,"400d766baefb30934aac4d7db2010e0ea6170ad15f",()=>g.callSTT,"408954ea14baa6af7012a6cc0f1e0811809ddeecde",()=>f.callSTT,"409d087dc41ecdb6375c2668344118fe3b2bb6c776",()=>i.saveCardTag,"40a84cc895421b42a5e3fe222d1c7e67fa5a4e9888",()=>i.getTagAll,"40e663f9e135a5558c1e900e8fd68e530b4f5a0313",()=>i.saveCard,"6020859598c1ec826c0003179e191cd6abc1ff6cee",()=>i.getCardTag,"606ce5ec274f926c223b28076200dd50780f875bce",()=>g.callTTS,"60b4aac7d85bdcedd8f5b9ccb8fe37d6c9c61b6411",()=>h.removeCardsByTag,"60c71a9eee0c1247a9363b81a43af945aed3007bd0",()=>i.setCardFamiliarity,"78728f6379eae7db68f397ccee843ed97d3a9e8e44",()=>h.copyCardsByTag,"7e90246aa2656e2f48e7b03ca867b6184cb45a4537",()=>i.getCardAll]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_0qpdcgw._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__00fpy54._.js","server/chunks/ssr/[root-of-the-server]__0-uebne._.js","server/chunks/ssr/[root-of-the-server]__01i6~5p._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__01j3h4a._.js.map
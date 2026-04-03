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
                `);if(!c)return{status:"error",error:"no data found"};let d={uuid:b,tag_list_added:c.map(a=>a.tag_uuid)};return{status:"success",data:d}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function z(a){if("string"!=typeof a.uuid)return{status:"error",error:"card uuid is empty"};let b=a.uuid;try{return a.tag_list_new&&a.tag_list_new.length>0&&await e.prisma.qsa_card_tag.createMany({data:a.tag_list_new.map(a=>({uuid:(0,g.getUUID)(),card_uuid:b,tag_uuid:a,created_at:new Date,updated_at:new Date}))}),a.tag_list_remove&&a.tag_list_remove.length>0&&await e.prisma.qsa_card_tag.deleteMany({where:{card_uuid:b,tag_uuid:{in:a.tag_list_remove}}}),{status:"success",data:{uuid:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=k.then?(await k)():k,(0,j.ensureServerEntryExports)([l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]),(0,d.registerServerReference)(l,"7ec3ccf2bfea6330495bb21aaca51e4f2d142e81a8",null),(0,d.registerServerReference)(m,"4042fb7b4c66edd567855afa9f4649f9eaa20898b2",null),(0,d.registerServerReference)(n,"4036c784124c71a26ff3a9bbb2fa4695c7c079658f",null),(0,d.registerServerReference)(o,"40ccd099305f681a5edc678a13291c9f4952638f62",null),(0,d.registerServerReference)(p,"40b5112537e3b8e77d82fc1e2f3c70d7695da34d4d",null),(0,d.registerServerReference)(q,"60d510cd9ae0b952e2d572a89f85f16f6933d7d283",null),(0,d.registerServerReference)(r,"4046874df52f209a010736798834efc6b7f5e45692",null),(0,d.registerServerReference)(s,"603a28005d1398825d7d0b66f655f280599a68df8b",null),(0,d.registerServerReference)(t,"407578613616c5b8d07853dfee5ec51eefc5083805",null),(0,d.registerServerReference)(u,"409906fdbd2dca6cc90a1df6d419c2cc0cdec0b313",null),(0,d.registerServerReference)(v,"402485242e8db9cbc5a76e897f6cae4a55a2cb2847",null),(0,d.registerServerReference)(w,"40f225cea5d1b54b4879bec48693cb8f6f790dbef3",null),(0,d.registerServerReference)(x,"405985728671485dcb0b969b2af97f7bb11c10a23c",null),(0,d.registerServerReference)(y,"6079fdc61527c12f71b3009a040731f72ff8b2f18c",null),(0,d.registerServerReference)(z,"407ed55019ba980f2acc9f091a3d5cdd59e8bb94cf",null),a.s(["createTag",0,w,"getCard",0,m,"getCardAll",0,l,"getCardTag",0,y,"getCardTest",0,q,"getCardTestByUUID",0,p,"getTag",0,t,"getTagAll",0,u,"removeCard",0,o,"removeTag",0,x,"saveCard",0,n,"saveCardReview",0,r,"saveCardTag",0,z,"saveTag",0,v,"setCardFamiliarity",0,s]),c()}catch(a){c(a)}},!1),907101,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(713095),j=b([e]);async function k(){try{let a=await e.prisma.qsa_card.findMany({select:{user_id:!0},distinct:["user_id"]});return{status:"success",data:a.map(a=>a.user_id)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=j.then?(await j)():j;let l=async(a,b)=>{try{return await e.prisma.$transaction(async c=>{let d=(await c.$queryRaw(h.Prisma.sql`
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
            `)).map(a=>a.uuid);if(0!==f.length)for(let a of f){let b=(0,g.getUUID)(),f=await e.qsa_card.findUnique({where:{uuid:a}});if(!f)throw Error(`card not found by uuid: ${a}`);await e.qsa_card.create({data:{...f,uuid:b,user_id:c}}),await e.qsa_card_tag.create({data:{uuid:(0,g.getUUID)(),card_uuid:b,tag_uuid:d,created_at:new Date,updated_at:new Date}})}}),{status:"success",data:!0}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}};(0,i.ensureServerEntryExports)([k,l,m]),(0,d.registerServerReference)(k,"00451da9db7f47a9634eccb593da64c8798f518a46",null),(0,d.registerServerReference)(l,"60457954526ad285d90d521e990b7b15b4abfceae6",null),(0,d.registerServerReference)(m,"78553cc32d0c1c06fda48358cef909e3926273d8af",null),a.s(["copyCardsByTag",0,m,"getUserIDAll",0,k,"removeCardsByTag",0,l]),c()}catch(a){c(a)}},!1),340833,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(907101),f=a.i(914621),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s([]),c()}catch(a){c(a)}},!1),815963,a=>a.a(async(b,c)=>{try{var d=a.i(340833),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(907101),i=a.i(914621),j=b([d,e,h,i]);[d,e,h,i]=j.then?(await j)():j,a.s(["004369ceb292b9adcb88a68131d37f41d5752f2767",()=>e.initCmdMap,"00451da9db7f47a9634eccb593da64c8798f518a46",()=>h.getUserIDAll,"0084601d441d17f360865ee646b039e0dcbc66d6f5",()=>e.initCmdHelpMap,"4029832cb1bffc6069a82844c85f2e3689e0bdd735",()=>g.callSTT,"4036c784124c71a26ff3a9bbb2fa4695c7c079658f",()=>i.saveCard,"407ed55019ba980f2acc9f091a3d5cdd59e8bb94cf",()=>i.saveCardTag,"409906fdbd2dca6cc90a1df6d419c2cc0cdec0b313",()=>i.getTagAll,"40f512870df80d354b338ddc3b9cff27d3f0edd2cc",()=>f.callSTT,"603a28005d1398825d7d0b66f655f280599a68df8b",()=>i.setCardFamiliarity,"60457954526ad285d90d521e990b7b15b4abfceae6",()=>h.removeCardsByTag,"6079fdc61527c12f71b3009a040731f72ff8b2f18c",()=>i.getCardTag,"60d8f882202284fbc7871311c61492723b832444ae",()=>g.callTTS,"78553cc32d0c1c06fda48358cef909e3926273d8af",()=>h.copyCardsByTag,"7ec3ccf2bfea6330495bb21aaca51e4f2d142e81a8",()=>i.getCardAll]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_0qpdcgw._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__00fpy54._.js","server/chunks/ssr/[root-of-the-server]__0-uebne._.js","server/chunks/ssr/[root-of-the-server]__01i6~5p._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__01j3h4a._.js.map
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
                `);if(!c)return{status:"error",error:"no data found"};let d={uuid:b,tag_list_added:c.map(a=>a.tag_uuid)};return{status:"success",data:d}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function z(a){if("string"!=typeof a.uuid)return{status:"error",error:"card uuid is empty"};let b=a.uuid;try{return a.tag_list_new&&a.tag_list_new.length>0&&await e.prisma.qsa_card_tag.createMany({data:a.tag_list_new.map(a=>({uuid:(0,g.getUUID)(),card_uuid:b,tag_uuid:a,created_at:new Date,updated_at:new Date}))}),a.tag_list_remove&&a.tag_list_remove.length>0&&await e.prisma.qsa_card_tag.deleteMany({where:{card_uuid:b,tag_uuid:{in:a.tag_list_remove}}}),{status:"success",data:{uuid:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=k.then?(await k)():k,(0,j.ensureServerEntryExports)([l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]),(0,d.registerServerReference)(l,"7e40b34de6613cbe2697bf0f0eee58b9a01c3307d2",null),(0,d.registerServerReference)(m,"40980d896b3aee05747d71205ad16cbd3671d5c497",null),(0,d.registerServerReference)(n,"401a7afa69b80fe553ef56bf58c086f99a385dbfa9",null),(0,d.registerServerReference)(o,"405657d8eb647055c6b50c6edf262b10ae94031342",null),(0,d.registerServerReference)(p,"40d2eed92b903f9c1bda38b743fd3255a59b38deac",null),(0,d.registerServerReference)(q,"604f111057546a2692d5f88b67f31902546a73af5d",null),(0,d.registerServerReference)(r,"4026a4425f377c591fb6a4d05f6a44ca6f6828f7ee",null),(0,d.registerServerReference)(s,"60ede05655642db9e75b37d53302f6cbaf38b9764f",null),(0,d.registerServerReference)(t,"402beeac507e6537627eef957486168db1b8bfcf4e",null),(0,d.registerServerReference)(u,"40ba4ef5eb0537013569b2c91f4b388ef320652748",null),(0,d.registerServerReference)(v,"40b37677efc5e9e58c3f4b6672bc3457bb8d8088cb",null),(0,d.registerServerReference)(w,"40208db8da5b1e99d2444b8d3dad820b80c9b79660",null),(0,d.registerServerReference)(x,"40730c624ccebe45424b884d1c1b32ed047db80b9b",null),(0,d.registerServerReference)(y,"60f2153c57a4b20158c341cd362ba4e5abb9560f90",null),(0,d.registerServerReference)(z,"40fa07d976e6bc24693e50eaf943e87eca4caec9e8",null),a.s(["createTag",0,w,"getCard",0,m,"getCardAll",0,l,"getCardTag",0,y,"getCardTest",0,q,"getCardTestByUUID",0,p,"getTag",0,t,"getTagAll",0,u,"removeCard",0,o,"removeTag",0,x,"saveCard",0,n,"saveCardReview",0,r,"saveCardTag",0,z,"saveTag",0,v,"setCardFamiliarity",0,s]),c()}catch(a){c(a)}},!1),696068,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(713095),j=b([e]);async function k(a,b,c,d,g){let i=h.Prisma.raw(`topword_${b}`),j=h.Prisma.sql`
        select
        id,
        word,
        in_dict,
        case 
            when exists (select 1 from qsa_card qc where qc.question = t0.word and qc.user_id = ${a}) 
            then 'Y' else 'N'
        end as in_card,
        level
        from ${i} t0
        where 1 = 1
    `,k=h.Prisma.sql`
        and not exists(select 1 from word_trash t1 where t1.word = t0.word)
    `,l=a&&!c?h.Prisma.sql`
            and not exists(select 1 from qsa_card t1
                where (t1.question = t0.word or t1.suggestion = t0.word) and t1.user_id = ${a})
        `:h.Prisma.sql``,m=h.Prisma.sql`
        order by id asc
    `,n=h.Prisma.sql`
        limit ${g} offset ${(d-1)*g}
    `;try{let a=h.Prisma.join([j,k,l,m,n]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.sql`select count(1) as total from ${i}`,f=await e.prisma.$queryRaw(c),o=Number(f[0]?.total||0);return{status:"success",data:b,total_records:o,page:d,total_pages:Math.ceil(o/g)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function l(a,b,c,d,g){let i=h.Prisma.raw(`topword_${b}`),j=(a,b)=>a?h.Prisma.sql`
                select
                id,
                word,
                in_dict,
                case 
                    when exists (select 1 from qsa_card qc where qc.question = t0.word and qc.user_id = ${a}) 
                    then 'Y' else 'N'
                end as in_card,
                ${b} as sort_order
                from ${i} t0 where 1 = 1
            `:h.Prisma.sql`
            select
            id,
            word,
            in_dict,
            'N' as in_card,
            ${b} as sort_order
            from ${i} t0 where 1 = 1
        `,k=c.replaceAll(/\s+/g," ").replaceAll(/^\s+|\s+$/g,""),l=h.Prisma.sql`
        and t0.word = ${k}
    `,m=h.Prisma.sql`
        and lower(t0.word) = lower(${k})
        and t0.word != ${k}
    `,n=h.Prisma.sql`
        and lower(t0.word) != lower(${k})
        and lower(t0.word) like lower(${"%"+k+"%"})
    `,o=h.Prisma.join([j(a,1),l,h.Prisma.sql`union`,j(a,2),m,h.Prisma.sql`union`,j(a,3),n]," ");try{let a=h.Prisma.join([h.Prisma.sql`select * from (`,o,h.Prisma.sql`) as t`,h.Prisma.sql`order by sort_order, id asc`,h.Prisma.sql`limit ${g} offset ${(d-1)*g}`]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.join([h.Prisma.sql`select count(1) as total from (`,o,h.Prisma.sql`) as t`]," "),f=await e.prisma.$queryRaw(c),i=Number(f[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/g)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function m(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,g.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function o(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=j.then?(await j)():j,(0,i.ensureServerEntryExports)([k,l,m,n,o]),(0,d.registerServerReference)(k,"7c350b59c3da48e7381cbf66190b6d3db35dd3ef48",null),(0,d.registerServerReference)(l,"7ce8c4c8df5d9ad6666505c87a8c16b27c3325a813",null),(0,d.registerServerReference)(m,"601f0820c820dfc8c3fba425dc16bf09153f66bb74",null),(0,d.registerServerReference)(n,"4078316cae08dd68eb397c0d40b53c3cf2153ba37a",null),(0,d.registerServerReference)(o,"40995f4d2a4417467997603ca57108b1032925cfdf",null),a.s(["getExample",0,n,"getTopword",0,k,"searchExample",0,o,"searchTopword",0,l,"trashWord",0,m]),c()}catch(a){c(a)}},!1),882813,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(696068),f=a.i(914621),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s([]),c()}catch(a){c(a)}},!1),193409,a=>a.a(async(b,c)=>{try{var d=a.i(882813),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(696068),i=a.i(914621),j=b([d,e,h,i]);[d,e,h,i]=j.then?(await j)():j,a.s(["0052a22f965a660482ca68fc188e3a0ec7010cfdce",()=>e.initCmdHelpMap,"00674ef116a6e95b47c27a81329c6747ecccaba63b",()=>e.initCmdMap,"401a7afa69b80fe553ef56bf58c086f99a385dbfa9",()=>i.saveCard,"40208db8da5b1e99d2444b8d3dad820b80c9b79660",()=>i.createTag,"40393d2d937d977942b8d7ee6e7fb778d91c06eb2c",()=>f.callSTT,"404330e6fafbe77fe8c6af9f6199831250d411734f",()=>g.callSTT,"40ba4ef5eb0537013569b2c91f4b388ef320652748",()=>i.getTagAll,"40fa07d976e6bc24693e50eaf943e87eca4caec9e8",()=>i.saveCardTag,"601f0820c820dfc8c3fba425dc16bf09153f66bb74",()=>h.trashWord,"60d96e25c440dd94ce287ac12e30ffd880e9d2ec22",()=>g.callTTS,"7c350b59c3da48e7381cbf66190b6d3db35dd3ef48",()=>h.getTopword,"7ce8c4c8df5d9ad6666505c87a8c16b27c3325a813",()=>h.searchTopword]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_0qpdcgw._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__0.6k3bk._.js","server/chunks/ssr/[root-of-the-server]__0-uebne._.js","server/chunks/ssr/[root-of-the-server]__01i6~5p._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ygx5am._.js.map
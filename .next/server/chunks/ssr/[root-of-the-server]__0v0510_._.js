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
                `);if(!c)return{status:"error",error:"no data found"};let d={uuid:b,tag_list_added:c.map(a=>a.tag_uuid)};return{status:"success",data:d}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function z(a){if("string"!=typeof a.uuid)return{status:"error",error:"card uuid is empty"};let b=a.uuid;try{return a.tag_list_new&&a.tag_list_new.length>0&&await e.prisma.qsa_card_tag.createMany({data:a.tag_list_new.map(a=>({uuid:(0,g.getUUID)(),card_uuid:b,tag_uuid:a,created_at:new Date,updated_at:new Date}))}),a.tag_list_remove&&a.tag_list_remove.length>0&&await e.prisma.qsa_card_tag.deleteMany({where:{card_uuid:b,tag_uuid:{in:a.tag_list_remove}}}),{status:"success",data:{uuid:b}}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=k.then?(await k)():k,(0,j.ensureServerEntryExports)([l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]),(0,d.registerServerReference)(l,"7e854427c4068dabea938dc1c19ca4ed995672c8ef",null),(0,d.registerServerReference)(m,"40f6d8eb665ac345c10fd06a2632c43c6f022a9861",null),(0,d.registerServerReference)(n,"40784e934c8f161ab7876415adf5714a24803689a7",null),(0,d.registerServerReference)(o,"409a104ca8307ca9b38973f82914f036c2b475f305",null),(0,d.registerServerReference)(p,"40d9a1275621534a2b554bffd013cae699a16fac15",null),(0,d.registerServerReference)(q,"60da4b23a692da2e5a996953fae5a09b37a2b93626",null),(0,d.registerServerReference)(r,"40de8714f08875e0de8b00132bd0ca4dc63ed7bd28",null),(0,d.registerServerReference)(s,"6085ac47aba6ef26a87519382c01ca875811df73b8",null),(0,d.registerServerReference)(t,"4033348d4712c75b979842fbe6f5fea5a9dee44885",null),(0,d.registerServerReference)(u,"40c291147560ac3f435efb28f3f753d57279c6f31e",null),(0,d.registerServerReference)(v,"40ef19d60519c8cc6baa80fb78070e0dd56c0a0328",null),(0,d.registerServerReference)(w,"40e0ea2a4ae0ff131b4e01e31232af9b66d3032647",null),(0,d.registerServerReference)(x,"407850a40ad702a4b26eb26f89d064f06e9c2e7531",null),(0,d.registerServerReference)(y,"6000c4af0f434e8d161c7ec5b470ec85ef5f67cac4",null),(0,d.registerServerReference)(z,"4041ae7d59daf0e54b227b10012dce1df950f60955",null),a.s(["createTag",0,w,"getCard",0,m,"getCardAll",0,l,"getCardTag",0,y,"getCardTest",0,q,"getCardTestByUUID",0,p,"getTag",0,t,"getTagAll",0,u,"removeCard",0,o,"removeTag",0,x,"saveCard",0,n,"saveCardReview",0,r,"saveCardTag",0,z,"saveTag",0,v,"setCardFamiliarity",0,s]),c()}catch(a){c(a)}},!1),696068,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(713095),j=b([e]);async function k(a,b,c,d,g){let i=h.Prisma.raw(`topword_${b}`),j=h.Prisma.sql`
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
    `,o=h.Prisma.join([j(a,1),l,h.Prisma.sql`union`,j(a,2),m,h.Prisma.sql`union`,j(a,3),n]," ");try{let a=h.Prisma.join([h.Prisma.sql`select * from (`,o,h.Prisma.sql`) as t`,h.Prisma.sql`order by sort_order, id asc`,h.Prisma.sql`limit ${g} offset ${(d-1)*g}`]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.join([h.Prisma.sql`select count(1) as total from (`,o,h.Prisma.sql`) as t`]," "),f=await e.prisma.$queryRaw(c),i=Number(f[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/g)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function m(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,g.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function o(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=j.then?(await j)():j,(0,i.ensureServerEntryExports)([k,l,m,n,o]),(0,d.registerServerReference)(k,"7cb20f624991683e7a839f930f9365148144ccb800",null),(0,d.registerServerReference)(l,"7cbae18e1010f670e8b54d6c3b164d4a7ef3a6e2c8",null),(0,d.registerServerReference)(m,"604d81f8dfedcbe4dd94fb0a341cff1b4bfe7232da",null),(0,d.registerServerReference)(n,"40504f84e653e178f80d412b9dfffe82cc3bbfe62f",null),(0,d.registerServerReference)(o,"40e6ab6cebf7f764fce23ba219e44423cc8f61d62a",null),a.s(["getExample",0,n,"getTopword",0,k,"searchExample",0,o,"searchTopword",0,l,"trashWord",0,m]),c()}catch(a){c(a)}},!1),753748,a=>a.a(async(b,c)=>{try{var d=a.i(914621),e=a.i(696068),f=b([d,e]);[d,e]=f.then?(await f)():f,a.s([]),c()}catch(a){c(a)}},!1),64332,a=>a.a(async(b,c)=>{try{var d=a.i(753748),e=a.i(914621),f=a.i(696068),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s(["4033348d4712c75b979842fbe6f5fea5a9dee44885",()=>e.getTag,"40c291147560ac3f435efb28f3f753d57279c6f31e",()=>e.getTagAll,"40d9a1275621534a2b554bffd013cae699a16fac15",()=>e.getCardTestByUUID,"40de8714f08875e0de8b00132bd0ca4dc63ed7bd28",()=>e.saveCardReview,"40e6ab6cebf7f764fce23ba219e44423cc8f61d62a",()=>f.searchExample,"60da4b23a692da2e5a996953fae5a09b37a2b93626",()=>e.getCardTest]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0v0510_._.js.map
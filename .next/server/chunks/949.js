"use strict";exports.id=949,exports.ids=[949],exports.modules={60449:(t,e,r)=>{r.d(e,{Cm:()=>c,Ml:()=>i,Sj:()=>d,f:()=>o,qS:()=>s,s7:()=>n}),r(15424);var a=r(46242),s=(0,a.$)("21dad0493aed015526a61d45c462822ff3dbe078"),i=(0,a.$)("5fb9f8b82dcff8496f64ded8cf754dc38af18221"),c=(0,a.$)("b8b1a6dfe5222788dead20e81fc3b2e67f2fd00b");(0,a.$)("27292e0db1ea049094aca5cea9ce727e7660c6ad"),(0,a.$)("17626542b799ad55d66a61eb1c6c83387f0dcdc7"),(0,a.$)("8123b9003e0dd95f542ea2ad28583619676cff06"),(0,a.$)("e7f35a88891f29a76dee37b1ae73232f1f359a93"),(0,a.$)("d3974c3afa23da13df974e0a5eaa4527d6f92ffa"),(0,a.$)("5d22d26a5bc6b5a20c845591229338f4b5ef7c4c"),(0,a.$)("e5dbf3bb47056ca07728ecfa957e5fca01fb4a8f");var o=(0,a.$)("9ca37af446368f4f1c00eda88cedaf4a6ff1320d"),n=(0,a.$)("f85ba165a1d481d90f9bccb76e2b9271e773c70c"),d=(0,a.$)("50109cb65c1da634a1805882896e3f4b886dc3b6")},98956:(t,e,r)=>{r.r(e),r.d(e,{getOriginal:()=>l,getOriginalByDomain:()=>u,getOriginalCategory:()=>d,getText:()=>w,getTextByDomain:()=>g,getTextByOriginal:()=>m,getTextCategory:()=>f,getWordInStore:()=>o,saveCorrectionMap:()=>S,searchSentenceByKeyword:()=>b,searchSentenceByLemma:()=>_,searchWordInStore:()=>n,trashWord:()=>y});var a=r(27745);r(26461);var s=r(24831),i=r(43811),c=r(53524);async function o(t,e,r,a){let i=c.Prisma.sql`
        select * from word_store t0 where 1 = 1
    `;c.Prisma.sql`
        select count(1) as total from word_store t0 where 1 = 1
    `;let o=c.Prisma.sql`
        and not exists(select 1 from word_trash t1 where t1.word = t0.word)
    `,n=t?c.Prisma.sql`
            and not exists(select 1 from qsa_card t1
                where (t1.question = t0.word or t1.suggestion = t0.word) and t1.user_id = ${t})
        `:c.Prisma.sql``,d=e?c.Prisma.sql`
            and t0.language = ${e}
        `:c.Prisma.sql``,u=c.Prisma.sql`
        order by count desc, word asc
    `,l=c.Prisma.sql`
        limit ${a} offset ${(r-1)*a}
    `;try{let t=c.Prisma.join([i,o,n,d,u,l]," "),e=await s.prisma.$queryRaw(t),f=c.Prisma.sql`select count(1) as total from word_store`,g=await s.prisma.$queryRaw(f),m=Number(g[0]?.total||0);return{status:"success",data:e,total_records:m,page:r,total_pages:Math.ceil(m/a)}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function n(t,e,r,a,i){let o=(t,e)=>t?c.Prisma.sql`
                select t0.*,
                (select string_agg(t1.uuid, ',') from qsa_card t1 where 1 =1 
                    and (t1.question = t0.word or t1.suggestion = t0.word)
                    and t1.user_id = ${t}
                ) as card_uuid,
                ${e} as sort_order
                from word_store t0 where 1 = 1
            `:c.Prisma.sql`
            select t0.*,
            null as card_uuid,
            ${e} as sort_order
            from word_store t0 where 1 = 1
        `,n=r.replaceAll(/\s+/g," ").replaceAll(/^\s+|\s+$/g,""),d=c.Prisma.sql`
        and lower(t0.word) = lower(${n})
    `,u=c.Prisma.sql`
        and lower(t0.word) != lower(${n})
        and lower(t0.word) like lower(${"%"+n+"%"})
    `,l=c.Prisma.join([o(t,1),d,c.Prisma.sql`union`,o(t,2),u]," ");try{let t=c.Prisma.join([c.Prisma.sql`select * from (`,l,c.Prisma.sql`) as t`,c.Prisma.sql`order by sort_order`,c.Prisma.sql`limit ${i} offset ${(a-1)*i}`]," "),e=await s.prisma.$queryRaw(t),r=c.Prisma.join([c.Prisma.sql`select count(1) as total from (`,l,c.Prisma.sql`) as t`]," "),o=await s.prisma.$queryRaw(r),n=Number(o[0]?.total||0);return{status:"success",data:e,total_records:n,page:a,total_pages:Math.ceil(n/i)}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function d(){try{let t=await s.prisma.statistic_original.findMany({distinct:["domain","language"],select:{domain:!0,language:!0}});return{status:"success",data:t}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function u(t,e){try{let r=await s.prisma.statistic_original.findMany({where:{domain:t,language:e},select:{uuid:!0,source:!0,domain:!0,language:!0}});return{status:"success",data:r}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function l(t){try{let e=await s.prisma.statistic_original.findUnique({where:{uuid:t}});if(!e)return{status:"error",error:"no original found"};return{status:"success",data:e}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function f(){try{let t=await s.prisma.$queryRaw(c.Prisma.sql`SELECT distinct t1.domain, t1.language
        FROM
        	statistic_text t0, statistic_original t1
        WHERE
            t0.original_uuid = t1.uuid
        `);return{status:"success",data:t}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function g(t,e){if(!(0,i.checkSQLSafe)(t)||!(0,i.checkSQLSafe)(e))return{status:"error",error:"invaid sql param"};try{let r=await s.prisma.$queryRaw(c.Prisma.sql`SELECT t1.source source, t1.domain, t1.language,
        t0.uuid, t0.version, '' content, t0.created_by, t0.created_at, t0.updated_at
        FROM
        	statistic_text t0, statistic_original t1
        WHERE
            t0.original_uuid = t1.uuid
            and t1.domain = ${t}
            and t1.language = ${e}
        `);return{status:"success",data:r}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function m(t){if(!(0,i.checkSQLSafe)(t))return{status:"error",error:"invaid sql param"};try{let e=await s.prisma.$queryRaw(c.Prisma.sql`SELECT t1.source source, t1.domain, t1.language,
        t0.uuid, t0.version, '' content, t0.created_by, t0.created_at, t0.updated_at
        FROM
        	statistic_text t0, statistic_original t1
        WHERE
            t0.original_uuid = t1.uuid
            and t0.original_uuid = ${t}
        `);return{status:"success",data:e}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function w(t){if(!(0,i.checkSQLSafe)(t))return{status:"error",error:"invaid sql param"};try{let e=await s.prisma.$queryRaw(c.Prisma.sql`SELECT t1.source source, t0.* 
            FROM
                statistic_text t0, statistic_original t1
            WHERE
                t0.original_uuid = t1.uuid
                and t0.uuid=${t}
            `);return{status:"success",data:e}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function b(t){if(0==t.length)return{status:"error",error:"no keyword found"};try{let e=`SELECT t2.source source, t2.domain, t0.* 
            FROM
                statistic_sentence t0, statistic_text t1, statistic_original t2
            WHERE
                t0.text_uuid = t1.uuid
                and t1.original_uuid = t2.uuid
                ${t.map(t=>`and LOWER(t0.sentence) like '%${t.toLowerCase()}%'`).join(" ")}
                limit 100
            `,r=await s.prisma.$queryRaw(c.Prisma.sql([e]));return{status:"success",data:r}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function _(t){if(0==t.length)return{status:"error",error:"no keyword found"};try{let e=`SELECT t2.source source, t2.domain, t0.* 
            FROM
                statistic_sentence t0, statistic_text t1, statistic_original t2
            WHERE
                t0.text_uuid = t1.uuid
                and t1.original_uuid = t2.uuid
                and exists (select 1 from statistic_lemma t3
                        where t3.sentence_uuid = t0.uuid
                        ${t.map(t=>`and t3.lemma = '${t}'`).join(" ")}
                    )
                limit 100
            `,r=await s.prisma.$queryRaw(c.Prisma.sql([e]));return{status:"success",data:r}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function y(t,e){try{let r=await s.prisma.word_trash.create({data:{uuid:(0,i.getUUID)(),word:t,created_by:e,created_at:new Date,updated_at:new Date}});return{status:"success",data:r}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function S(t){try{let e=await s.prisma.statistic_correction_map.create({data:t});return{status:"success",data:e}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}(0,r(85723).ensureServerEntryExports)([o,n,d,u,l,f,g,m,w,b,_,y,S]),(0,a.registerServerReference)("5fb9f8b82dcff8496f64ded8cf754dc38af18221",o),(0,a.registerServerReference)("b8b1a6dfe5222788dead20e81fc3b2e67f2fd00b",n),(0,a.registerServerReference)("27292e0db1ea049094aca5cea9ce727e7660c6ad",d),(0,a.registerServerReference)("17626542b799ad55d66a61eb1c6c83387f0dcdc7",u),(0,a.registerServerReference)("8123b9003e0dd95f542ea2ad28583619676cff06",l),(0,a.registerServerReference)("e7f35a88891f29a76dee37b1ae73232f1f359a93",f),(0,a.registerServerReference)("d3974c3afa23da13df974e0a5eaa4527d6f92ffa",g),(0,a.registerServerReference)("5d22d26a5bc6b5a20c845591229338f4b5ef7c4c",m),(0,a.registerServerReference)("e5dbf3bb47056ca07728ecfa957e5fca01fb4a8f",w),(0,a.registerServerReference)("9ca37af446368f4f1c00eda88cedaf4a6ff1320d",b),(0,a.registerServerReference)("f85ba165a1d481d90f9bccb76e2b9271e773c70c",_),(0,a.registerServerReference)("50109cb65c1da634a1805882896e3f4b886dc3b6",y),(0,a.registerServerReference)("21dad0493aed015526a61d45c462822ff3dbe078",S)},24831:(t,e,r)=>{r.d(e,{prisma:()=>s});var a=r(53524);let s=global.prisma||new a.PrismaClient({log:["query"]})},43811:(t,e,r)=>{r.d(e,{checkSQLSafe:()=>i,getUUID:()=>s,getWeightedRandom:()=>c}),r(20610),r(97308),r(94997);var a=r(38608);let s=()=>(0,a.v4)().replaceAll("-",""),i=t=>!!t.match(/^[^'"=]+$/),c=t=>{let e=0;for(e=1;e<t.length;e++)t[e]+=t[e-1];let r=Math.random()*t[t.length-1];for(e=0;e<t.length&&!(t[e]>r);e++);return e}}};
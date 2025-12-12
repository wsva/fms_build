module.exports=[696068,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(139138);a.i(659281);var g=a.i(761771),h=a.i(713095),i=b([e]);async function j(a,b,c,d,f){let h=g.Prisma.raw(`topword_${b}`),i=g.Prisma.sql`
        select
        id,
        word,
        in_dict,
        case 
            when exists (select 1 from qsa_card qc where qc.question = t0.word and qc.user_id = ${a}) 
            then 'Y' else 'N'
        end as in_card,
        level
        from ${h} t0
        where 1 = 1
    `,j=g.Prisma.sql`
        and not exists(select 1 from word_trash t1 where t1.word = t0.word)
    `,k=a&&!c?g.Prisma.sql`
            and not exists(select 1 from qsa_card t1
                where (t1.question = t0.word or t1.suggestion = t0.word) and t1.user_id = ${a})
        `:g.Prisma.sql``,l=g.Prisma.sql`
        order by id asc
    `,m=g.Prisma.sql`
        limit ${f} offset ${(d-1)*f}
    `;try{let a=g.Prisma.join([i,j,k,l,m]," "),b=await e.prisma.$queryRaw(a),c=g.Prisma.sql`select count(1) as total from ${h}`,n=await e.prisma.$queryRaw(c),o=Number(n[0]?.total||0);return{status:"success",data:b,total_records:o,page:d,total_pages:Math.ceil(o/f)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function k(a,b,c,d,f){let h=g.Prisma.raw(`topword_${b}`),i=(a,b)=>a?g.Prisma.sql`
                select
                id,
                word,
                in_dict,
                case 
                    when exists (select 1 from qsa_card qc where qc.question = t0.word and qc.user_id = ${a}) 
                    then 'Y' else 'N'
                end as in_card,
                ${b} as sort_order
                from ${h} t0 where 1 = 1
            `:g.Prisma.sql`
            select
            id,
            word,
            in_dict,
            'N' as in_card,
            ${b} as sort_order
            from ${h} t0 where 1 = 1
        `,j=c.replaceAll(/\s+/g," ").replaceAll(/^\s+|\s+$/g,""),k=g.Prisma.sql`
        and t0.word = ${j}
    `,l=g.Prisma.sql`
        and lower(t0.word) = lower(${j})
        and t0.word != ${j}
    `,m=g.Prisma.sql`
        and lower(t0.word) != lower(${j})
        and lower(t0.word) like lower(${"%"+j+"%"})
    `,n=g.Prisma.join([i(a,1),k,g.Prisma.sql`union`,i(a,2),l,g.Prisma.sql`union`,i(a,3),m]," ");try{let a=g.Prisma.join([g.Prisma.sql`select * from (`,n,g.Prisma.sql`) as t`,g.Prisma.sql`order by sort_order, id asc`,g.Prisma.sql`limit ${f} offset ${(d-1)*f}`]," "),b=await e.prisma.$queryRaw(a),c=g.Prisma.join([g.Prisma.sql`select count(1) as total from (`,n,g.Prisma.sql`) as t`]," "),h=await e.prisma.$queryRaw(c),i=Number(h[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/f)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function l(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,f.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function m(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}[e]=i.then?(await i)():i,(0,h.ensureServerEntryExports)([j,k,l,m,n]),(0,d.registerServerReference)(j,"7c597e14c2b7a2393214eedcb348591764120e92ca",null),(0,d.registerServerReference)(k,"7cec173e587199ce2d02e589da8ba3ea92fc4a3e66",null),(0,d.registerServerReference)(l,"60712873a07ecdf81a2b0b19e63d630854d8552bb2",null),(0,d.registerServerReference)(m,"4049ebf422fbab5ed48ca1740db86da5a252acd08b",null),(0,d.registerServerReference)(n,"406ddee4427c9f4b238a1d87c8751f27b4a0acd949",null),a.s(["getExample",()=>m,"getTopword",()=>j,"searchExample",()=>n,"searchTopword",()=>k,"trashWord",()=>l]),c()}catch(a){c(a)}},!1),713537,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(914621),f=a.i(696068),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s([]),c()}catch(a){c(a)}},!1),271715,a=>a.a(async(b,c)=>{try{var d=a.i(713537),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(914621),i=a.i(696068),j=b([d,e,h,i]);[d,e,h,i]=j.then?(await j)():j,a.s(["002eeb6f06dc71b98843ce74aa13e74672c420a2dc",()=>e.initCmdMap,"00e0b59d9a1c351cb1002c7abad28ee2d8cf7099e9",()=>e.initCmdHelpMap,"404f8b3b74bd61b24c31d225bc6b8a907a7d178737",()=>h.getTag,"406ddee4427c9f4b238a1d87c8751f27b4a0acd949",()=>i.searchExample,"409ceb04a416e281034b408d691693c57ae2a6eaa5",()=>h.saveCardReview,"40c78fa8d8876b66f47d6c3f8f8fd8d58e64f4fe42",()=>h.getTagAll,"40e20362c875f73fbb72aa3da48bcb106be3fa3128",()=>h.getCardTestByUUID,"40fe50c00ba128bd71620290e1c9d8017e411e25e0",()=>f.callSTT,"40fedd02abf4a1023065a9d6033cab2b0fbfbe5fa4",()=>g.callSTT,"6005abba36f75cec5a97450986068dfde7f779396b",()=>h.getCardTest,"60c79253df8a7f3656afb0b035ec7a78d8612e69bd",()=>g.callTTS]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node:buffer_00e2e67a._.js"].map(b=>a.l(b))).then(()=>b(951615)))},386314,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_bg_postgresql_mjs_49b2f844._.js"].map(b=>a.l(b))).then(()=>b(50492)))},145694,a=>{a.v(b=>Promise.all(["server/chunks/ssr/2e4a4_@prisma_client_runtime_query_compiler_bg_postgresql_wasm-base64_mjs_ead821ad._.js"].map(b=>a.l(b))).then(()=>b(904568)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_9b06bcf1._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__ad0c9994._.js","server/chunks/ssr/[root-of-the-server]__dbc93115._.js","server/chunks/ssr/[root-of-the-server]__087724f4._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__9c07a35f._.js.map
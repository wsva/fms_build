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
    `,n=g.Prisma.join([i(a,1),k,g.Prisma.sql`union`,i(a,2),l,g.Prisma.sql`union`,i(a,3),m]," ");try{let a=g.Prisma.join([g.Prisma.sql`select * from (`,n,g.Prisma.sql`) as t`,g.Prisma.sql`order by sort_order, id asc`,g.Prisma.sql`limit ${f} offset ${(d-1)*f}`]," "),b=await e.prisma.$queryRaw(a),c=g.Prisma.join([g.Prisma.sql`select count(1) as total from (`,n,g.Prisma.sql`) as t`]," "),h=await e.prisma.$queryRaw(c),i=Number(h[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/f)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function l(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,f.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function m(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}[e]=i.then?(await i)():i,(0,h.ensureServerEntryExports)([j,k,l,m,n]),(0,d.registerServerReference)(j,"7c7e762900b6c405d30f8a46f6801bba36ccb52ae8",null),(0,d.registerServerReference)(k,"7cff3f174c444c1689616e38d4ace1d3cedc344f4a",null),(0,d.registerServerReference)(l,"602dff08fb687b7fb0182da284c76eca4146c2caee",null),(0,d.registerServerReference)(m,"402b02168b20db855e2d95ba4f7e1c2bbb8fb8073e",null),(0,d.registerServerReference)(n,"402ae7de26910f840b4519ec687337d815dea5e0c9",null),a.s(["getExample",()=>m,"getTopword",()=>j,"searchExample",()=>n,"searchTopword",()=>k,"trashWord",()=>l]),c()}catch(a){c(a)}},!1),882813,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(696068),f=a.i(914621),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s([]),c()}catch(a){c(a)}},!1),193409,a=>a.a(async(b,c)=>{try{var d=a.i(882813),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(696068),i=a.i(914621),j=b([d,e,h,i]);[d,e,h,i]=j.then?(await j)():j,a.s(["001ef3e5feb7c5c7eeef79a166d9b973e6a44ba532",()=>e.initCmdHelpMap,"00ca0a06b07190044b51c3dd31c6263a03de2f2a0c",()=>e.initCmdMap,"4007f27b3b0b1bf2d2eeed4306da9bb4ac305b5cd0",()=>i.saveCard,"4035056e2b3b21f939d7cc5dad9eba698df987a4b3",()=>i.getTagAll,"405f1575ad2509540d85e9e08859b9c78c06d5c41c",()=>i.saveCardTag,"40a1811b4adf90da477251094d2a28a5e7f82db752",()=>f.callSTT,"40a39893b50991f4eba95cbc7b92732877bb7d1193",()=>i.createTag,"40dc38a8f30f3aec2348c0fb1acd546f993ae42cea",()=>g.callSTT,"602dff08fb687b7fb0182da284c76eca4146c2caee",()=>h.trashWord,"60509af8ba843a0c88ffd79362b0a2426254227533",()=>g.callTTS,"7c7e762900b6c405d30f8a46f6801bba36ccb52ae8",()=>h.getTopword,"7cff3f174c444c1689616e38d4ace1d3cedc344f4a",()=>h.searchTopword]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node:buffer_00e2e67a._.js"].map(b=>a.l(b))).then(()=>b(951615)))},386314,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_bg_postgresql_mjs_49b2f844._.js"].map(b=>a.l(b))).then(()=>b(50492)))},145694,a=>{a.v(b=>Promise.all(["server/chunks/ssr/2e4a4_@prisma_client_runtime_query_compiler_bg_postgresql_wasm-base64_mjs_ead821ad._.js"].map(b=>a.l(b))).then(()=>b(904568)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_9b06bcf1._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__ad0c9994._.js","server/chunks/ssr/[root-of-the-server]__dbc93115._.js","server/chunks/ssr/[root-of-the-server]__087724f4._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__fcf60d15._.js.map
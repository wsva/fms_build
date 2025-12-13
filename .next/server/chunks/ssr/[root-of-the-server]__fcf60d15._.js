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
    `,n=g.Prisma.join([i(a,1),k,g.Prisma.sql`union`,i(a,2),l,g.Prisma.sql`union`,i(a,3),m]," ");try{let a=g.Prisma.join([g.Prisma.sql`select * from (`,n,g.Prisma.sql`) as t`,g.Prisma.sql`order by sort_order, id asc`,g.Prisma.sql`limit ${f} offset ${(d-1)*f}`]," "),b=await e.prisma.$queryRaw(a),c=g.Prisma.join([g.Prisma.sql`select count(1) as total from (`,n,g.Prisma.sql`) as t`]," "),h=await e.prisma.$queryRaw(c),i=Number(h[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/f)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function l(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,f.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function m(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}[e]=i.then?(await i)():i,(0,h.ensureServerEntryExports)([j,k,l,m,n]),(0,d.registerServerReference)(j,"7cd13441d0be3e12825c17de51250421b8b60b08d5",null),(0,d.registerServerReference)(k,"7cdef1e5b5030c235dfb43796f6b0692cddbab2dc7",null),(0,d.registerServerReference)(l,"60777e0d78545d65c9561d6c0572cd731bd2eb5efe",null),(0,d.registerServerReference)(m,"40bfd570f200b90035eccaf2194882834f4a575ed6",null),(0,d.registerServerReference)(n,"40f133223989bc5a2803eaa2bce9d019001f1208b0",null),a.s(["getExample",()=>m,"getTopword",()=>j,"searchExample",()=>n,"searchTopword",()=>k,"trashWord",()=>l]),c()}catch(a){c(a)}},!1),882813,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(696068),f=a.i(914621),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s([]),c()}catch(a){c(a)}},!1),193409,a=>a.a(async(b,c)=>{try{var d=a.i(882813),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(696068),i=a.i(914621),j=b([d,e,h,i]);[d,e,h,i]=j.then?(await j)():j,a.s(["002b1efc64df726b3c6e27c12858723156910bdb3c",()=>e.initCmdHelpMap,"007ae9ea31be088c70041c663d1656ee451afe40b8",()=>e.initCmdMap,"400c7f3f86ef473460c485191a6570d9a78b6a39c2",()=>i.saveCardTag,"400d4055fab9d850fd0e225bab377b6c3fb578a9e4",()=>i.saveCard,"4081edae522a99e6f648b3a5fea107182775942c1f",()=>g.callSTT,"40a7267f75033833a6eda79518da25a439e52bc4ae",()=>i.getTagAll,"40a7b81409fc516e1af214cf152cfa393c14178617",()=>f.callSTT,"40c3b7a2169653fdcd3a27177d7972f2cd9ad0a8c8",()=>i.createTag,"6015ec9d6a0794a74cd11935756ced17624f3a6b46",()=>g.callTTS,"60777e0d78545d65c9561d6c0572cd731bd2eb5efe",()=>h.trashWord,"7cd13441d0be3e12825c17de51250421b8b60b08d5",()=>h.getTopword,"7cdef1e5b5030c235dfb43796f6b0692cddbab2dc7",()=>h.searchTopword]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node:buffer_00e2e67a._.js"].map(b=>a.l(b))).then(()=>b(951615)))},386314,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_bg_postgresql_mjs_49b2f844._.js"].map(b=>a.l(b))).then(()=>b(50492)))},145694,a=>{a.v(b=>Promise.all(["server/chunks/ssr/2e4a4_@prisma_client_runtime_query_compiler_bg_postgresql_wasm-base64_mjs_ead821ad._.js"].map(b=>a.l(b))).then(()=>b(904568)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_9b06bcf1._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__ad0c9994._.js","server/chunks/ssr/[root-of-the-server]__dbc93115._.js","server/chunks/ssr/[root-of-the-server]__087724f4._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__fcf60d15._.js.map
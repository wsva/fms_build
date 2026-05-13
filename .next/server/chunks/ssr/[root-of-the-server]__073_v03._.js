module.exports=[504446,(a,b,c)=>{b.exports=a.x("net",()=>require("net"))},524836,(a,b,c)=>{b.exports=a.x("https",()=>require("https"))},921517,(a,b,c)=>{b.exports=a.x("http",()=>require("http"))},755004,(a,b,c)=>{b.exports=a.x("tls",()=>require("tls"))},792509,(a,b,c)=>{b.exports=a.x("url",()=>require("url"))},449719,(a,b,c)=>{b.exports=a.x("assert",()=>require("assert"))},870722,(a,b,c)=>{b.exports=a.x("tty",()=>require("tty"))},500874,(a,b,c)=>{b.exports=a.x("buffer",()=>require("buffer"))},761095,(a,b,c)=>{b.exports=a.x("node:net",()=>require("node:net"))},81111,(a,b,c)=>{b.exports=a.x("node:stream",()=>require("node:stream"))},688947,(a,b,c)=>{b.exports=a.x("stream",()=>require("stream"))},924868,(a,b,c)=>{b.exports=a.x("fs/promises",()=>require("fs/promises"))},427699,(a,b,c)=>{b.exports=a.x("events",()=>require("events"))},233405,(a,b,c)=>{b.exports=a.x("child_process",()=>require("child_process"))},406461,(a,b,c)=>{b.exports=a.x("zlib",()=>require("zlib"))},696068,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(713095),j=b([e]);async function k(a,b,c,d,g){let i=h.Prisma.raw(`topword_${b}`),j=h.Prisma.sql`
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
    `,o=h.Prisma.join([j(a,1),l,h.Prisma.sql`union`,j(a,2),m,h.Prisma.sql`union`,j(a,3),n]," ");try{let a=h.Prisma.join([h.Prisma.sql`select * from (`,o,h.Prisma.sql`) as t`,h.Prisma.sql`order by sort_order, id asc`,h.Prisma.sql`limit ${g} offset ${(d-1)*g}`]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.join([h.Prisma.sql`select count(1) as total from (`,o,h.Prisma.sql`) as t`]," "),f=await e.prisma.$queryRaw(c),i=Number(f[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/g)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function m(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,g.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function o(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=j.then?(await j)():j,(0,i.ensureServerEntryExports)([k,l,m,n,o]),(0,d.registerServerReference)(k,"7cb53d168a465be7c8d18140fe4a16c4d71d5287bf",null),(0,d.registerServerReference)(l,"7c68daec68e457ae98de9d7789ffd673507e21405a",null),(0,d.registerServerReference)(m,"60e3278fd660392eef0eacc0e866dc4b187c315a9d",null),(0,d.registerServerReference)(n,"4099307b8369153be06a9ca75b90b8ca8314b40505",null),(0,d.registerServerReference)(o,"402d294585e04eee0ee9b2254e51189f6b1ae7206d",null),a.s(["getExample",0,n,"getTopword",0,k,"searchExample",0,o,"searchTopword",0,l,"trashWord",0,m]),c()}catch(a){c(a)}},!1),833299,a=>a.a(async(b,c)=>{try{var d=a.i(353045);a.i(763003);var e=a.i(55815),f=a.i(914621);a.i(719789);var g=a.i(696068),h=b([d,e,f,g]);[d,e,f,g]=h.then?(await h)():h,a.s([]),c()}catch(a){c(a)}},!1),736052,a=>a.a(async(b,c)=>{try{var d=a.i(833299),e=a.i(353045),f=a.i(763003),g=a.i(55815),h=a.i(914621),i=a.i(719789),j=a.i(696068),k=b([d,e,g,h,j]);[d,e,g,h,j]=k.then?(await k)():k,a.s(["0005d33e2a0b932d026b2e99a1e005dd6d252d3bb8",()=>i.deleteAuthTokens,"40148975f38ebf306b2d1ef80323f44d642b4087fc",()=>h.saveCard,"402d294585e04eee0ee9b2254e51189f6b1ae7206d",()=>j.searchExample,"408f54fe6686ef73dfa5ad11033c9eaa97ce912597",()=>e.getKey,"4099307b8369153be06a9ca75b90b8ca8314b40505",()=>j.getExample,"40f718fbbab44e83817517ee100e60aa2e340bf2e6",()=>h.saveCardTag,"60314d31461f0d7ee4cb58a611cd38e19c4b419cd9",()=>g.callTTS,"604729479e6fae132a3dd2ef58fdcd9e399944478c",()=>f.callSTT,"60ea5abf84d4b3faf6cfcc2e0e91bdb6333caff867",()=>g.callSTT]),c()}catch(a){c(a)}},!1),577062,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@better-auth_memory-adapter_dist_index_mjs_0ptlb60._.js"].map(b=>a.l(b))).then(()=>b(17616)))},860484,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_better-auth_dist_adapters_kysely-adapter_index_mjs_01xuj8~._.js"].map(b=>a.l(b))).then(()=>b(536063)))},580632,a=>{a.v(a=>Promise.resolve().then(()=>a(270406)))},80343,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0t6k_@better-auth_kysely-adapter_dist_bun-sqlite-dialect-na--YwnN_mjs_0_2jtem._.js"].map(b=>a.l(b))).then(()=>b(343112)))},908409,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@better-auth_kysely-adapter_dist_node-sqlite-dialect_mjs_0snx9-g._.js"].map(b=>a.l(b))).then(()=>b(869959)))},771115,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0_lp_modules_@better-auth_kysely-adapter_dist_d1-sqlite-dialect-C2B7YsIT_mjs_0ux35az._.js"].map(b=>a.l(b))).then(()=>b(415669)))},916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_0qpdcgw._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__037beas._.js","server/chunks/ssr/[root-of-the-server]__0elika5._.js","server/chunks/ssr/[root-of-the-server]__01i6~5p._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__073_v03._.js.map
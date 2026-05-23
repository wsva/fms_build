module.exports=[687769,(a,b,c)=>{b.exports=a.x("node:events",()=>require("node:events"))},685560,(a,b,c)=>{b.exports=a.x("node:tls",()=>require("node:tls"))},136340,(a,b,c)=>{b.exports=a.x("node:timers/promises",()=>require("node:timers/promises"))},719901,(a,b,c)=>{b.exports=a.x("dns/promises",()=>require("dns/promises"))},57328,(a,b,c)=>{b.exports=a.x("node:assert",()=>require("node:assert"))},677652,(a,b,c)=>{b.exports=a.x("node:diagnostics_channel",()=>require("node:diagnostics_channel"))},524836,(a,b,c)=>{b.exports=a.x("https",()=>require("https"))},921517,(a,b,c)=>{b.exports=a.x("http",()=>require("http"))},755004,(a,b,c)=>{b.exports=a.x("tls",()=>require("tls"))},792509,(a,b,c)=>{b.exports=a.x("url",()=>require("url"))},449719,(a,b,c)=>{b.exports=a.x("assert",()=>require("assert"))},870722,(a,b,c)=>{b.exports=a.x("tty",()=>require("tty"))},504446,(a,b,c)=>{b.exports=a.x("net",()=>require("net"))},688947,(a,b,c)=>{b.exports=a.x("stream",()=>require("stream"))},427699,(a,b,c)=>{b.exports=a.x("events",()=>require("events"))},233405,(a,b,c)=>{b.exports=a.x("child_process",()=>require("child_process"))},406461,(a,b,c)=>{b.exports=a.x("zlib",()=>require("zlib"))},924868,(a,b,c)=>{b.exports=a.x("fs/promises",()=>require("fs/promises"))},761095,(a,b,c)=>{b.exports=a.x("node:net",()=>require("node:net"))},500874,(a,b,c)=>{b.exports=a.x("buffer",()=>require("buffer"))},81111,(a,b,c)=>{b.exports=a.x("node:stream",()=>require("node:stream"))},696068,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(713095),j=b([e]);async function k(a,b,c,d,g){let i=h.Prisma.raw(`topword_${b}`),j=h.Prisma.sql`
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
    `,o=h.Prisma.join([j(a,1),l,h.Prisma.sql`union`,j(a,2),m,h.Prisma.sql`union`,j(a,3),n]," ");try{let a=h.Prisma.join([h.Prisma.sql`select * from (`,o,h.Prisma.sql`) as t`,h.Prisma.sql`order by sort_order, id asc`,h.Prisma.sql`limit ${g} offset ${(d-1)*g}`]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.join([h.Prisma.sql`select count(1) as total from (`,o,h.Prisma.sql`) as t`]," "),f=await e.prisma.$queryRaw(c),i=Number(f[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/g)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function m(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,g.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function o(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=j.then?(await j)():j,(0,i.ensureServerEntryExports)([k,l,m,n,o]),(0,d.registerServerReference)(k,"7c7d86e28b7b26aeb68ff499d0da3cc3f6de0392f6",null),(0,d.registerServerReference)(l,"7cabb5177eab566cdcf8eb5ae7274c459bc742b4b9",null),(0,d.registerServerReference)(m,"60443fe16bc6cfc6f258942ef8be07c7967c5287f6",null),(0,d.registerServerReference)(n,"40821dc6591d5f8a1ca96cd116063ff54d7042c0c8",null),(0,d.registerServerReference)(o,"406e79b625fde3970097af57d245f3e85cb4d65a1b",null),a.s(["getExample",0,n,"getTopword",0,k,"searchExample",0,o,"searchTopword",0,l,"trashWord",0,m]),c()}catch(a){c(a)}},!1),167878,a=>a.a(async(b,c)=>{try{var d=a.i(353045);a.i(763003);var e=a.i(55815),f=a.i(914621);a.i(719789);var g=a.i(256315),h=a.i(696068),i=b([d,e,f,g,h]);[d,e,f,g,h]=i.then?(await i)():i,a.s([]),c()}catch(a){c(a)}},!1),479302,a=>a.a(async(b,c)=>{try{var d=a.i(167878),e=a.i(353045),f=a.i(763003),g=a.i(55815),h=a.i(914621),i=a.i(719789),j=a.i(256315),k=a.i(696068),l=b([d,e,g,h,j,k]);[d,e,g,h,j,k]=l.then?(await l)():l,a.s(["00f28e56d26497ebda5b5573ebd1cc26c7e53c5f34",()=>i.deleteAuthTokens,"401847b6942e93561bd80808aaf8c7454f38a9e6cb",()=>h.saveCardTag,"403316f7e4562c09c1bbe9e47b19b567a5a6677490",()=>g.generateInterviewAnswer,"405519b95a046f90d8346162c83f0b12106d5130cf",()=>h.getCardsByQuestionHashes,"406863da32a605caad606d85252d0e0a41579f6209",()=>j.getPlanAll,"406e79b625fde3970097af57d245f3e85cb4d65a1b",()=>k.searchExample,"40821dc6591d5f8a1ca96cd116063ff54d7042c0c8",()=>k.getExample,"40b20563bb93a54e4d1dddf72758a6129f916487c5",()=>h.saveCard,"40b4439f9909af4803c2bbdb2c17464ea975932570",()=>e.getKey,"40c0b6f8ad618724cbd702b59b1c79e3120005f0e8",()=>j.saveRecord,"6032fe770405e1f91e3b84a413579d527731fd0a65",()=>g.callTTS,"607164abc0c157475eaae37adafb06d03ce25b95de",()=>f.callSTT,"60fffe66a8359074e74705536fd06d17dfda10775a",()=>g.callSTT]),c()}catch(a){c(a)}},!1),577062,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@better-auth_memory-adapter_dist_index_mjs_0ptlb60._.js"].map(b=>a.l(b))).then(()=>b(17616)))},860484,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_better-auth_dist_adapters_kysely-adapter_index_mjs_01xuj8~._.js"].map(b=>a.l(b))).then(()=>b(536063)))},580632,a=>{a.v(a=>Promise.resolve().then(()=>a(270406)))},80343,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0t6k_@better-auth_kysely-adapter_dist_bun-sqlite-dialect-na--YwnN_mjs_0_2jtem._.js"].map(b=>a.l(b))).then(()=>b(343112)))},908409,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@better-auth_kysely-adapter_dist_node-sqlite-dialect_mjs_0snx9-g._.js"].map(b=>a.l(b))).then(()=>b(869959)))},771115,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0_lp_modules_@better-auth_kysely-adapter_dist_d1-sqlite-dialect-C2B7YsIT_mjs_0ux35az._.js"].map(b=>a.l(b))).then(()=>b(415669)))},916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_0qpdcgw._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__0_3wl5t._.js","server/chunks/ssr/[root-of-the-server]__0elika5._.js","server/chunks/ssr/[root-of-the-server]__0gv111y._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0bjlp8l._.js.map
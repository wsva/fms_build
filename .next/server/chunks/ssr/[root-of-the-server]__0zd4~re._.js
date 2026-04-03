module.exports=[254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},666680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},750227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},857764,(a,b,c)=>{b.exports=a.x("node:url",()=>require("node:url"))},522734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},446786,(a,b,c)=>{b.exports=a.x("os",()=>require("os"))},723862,a=>a.a(async(b,c)=>{try{let b=await a.y("pg-587764f78a6c7a9c");a.n(b),c()}catch(a){c(a)}},!0),784941,(a,b,c)=>{b.exports=a.x("@prisma/client-2c3a283f134fdcb6/runtime/client",()=>require("@prisma/client-2c3a283f134fdcb6/runtime/client"))},504446,(a,b,c)=>{b.exports=a.x("net",()=>require("net"))},449719,(a,b,c)=>{b.exports=a.x("assert",()=>require("assert"))},870722,(a,b,c)=>{b.exports=a.x("tty",()=>require("tty"))},524836,(a,b,c)=>{b.exports=a.x("https",()=>require("https"))},921517,(a,b,c)=>{b.exports=a.x("http",()=>require("http"))},755004,(a,b,c)=>{b.exports=a.x("tls",()=>require("tls"))},792509,(a,b,c)=>{b.exports=a.x("url",()=>require("url"))},688947,(a,b,c)=>{b.exports=a.x("stream",()=>require("stream"))},924868,(a,b,c)=>{b.exports=a.x("fs/promises",()=>require("fs/promises"))},500874,(a,b,c)=>{b.exports=a.x("buffer",()=>require("buffer"))},761095,(a,b,c)=>{b.exports=a.x("node:net",()=>require("node:net"))},81111,(a,b,c)=>{b.exports=a.x("node:stream",()=>require("node:stream"))},761771,a=>{"use strict";var b=a.i(405890);a.s(["Prisma",0,b])},696068,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(719406),g=a.i(139138);a.i(659281);var h=a.i(761771),i=a.i(713095),j=b([e]);async function k(a,b,c,d,g){let i=h.Prisma.raw(`topword_${b}`),j=h.Prisma.sql`
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
    `,o=h.Prisma.join([j(a,1),l,h.Prisma.sql`union`,j(a,2),m,h.Prisma.sql`union`,j(a,3),n]," ");try{let a=h.Prisma.join([h.Prisma.sql`select * from (`,o,h.Prisma.sql`) as t`,h.Prisma.sql`order by sort_order, id asc`,h.Prisma.sql`limit ${g} offset ${(d-1)*g}`]," "),b=await e.prisma.$queryRaw(a),c=h.Prisma.join([h.Prisma.sql`select count(1) as total from (`,o,h.Prisma.sql`) as t`]," "),f=await e.prisma.$queryRaw(c),i=Number(f[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/g)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function m(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,g.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}async function o(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.error(a),{status:"error",error:(0,f.toErrorMessage)(a)}}}[e]=j.then?(await j)():j,(0,i.ensureServerEntryExports)([k,l,m,n,o]),(0,d.registerServerReference)(k,"7cf02ca8fbd8debba3378ae37528729b90161e529a",null),(0,d.registerServerReference)(l,"7cfb79d9afa8fff130cdefcda89675f44fac9294a9",null),(0,d.registerServerReference)(m,"60150ef2af5272e592a08ede10ac07a278817c5c35",null),(0,d.registerServerReference)(n,"40ef15ec10ccaf83d73930d3277028a2464a8fe6b4",null),(0,d.registerServerReference)(o,"4091d9524057434ebbaebbc2cc76e08b2b7555aeae",null),a.s(["getExample",0,n,"getTopword",0,k,"searchExample",0,o,"searchTopword",0,l,"trashWord",0,m]),c()}catch(a){c(a)}},!1),333410,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(696068),f=b([d,e]);[d,e]=f.then?(await f)():f,a.s([]),c()}catch(a){c(a)}},!1),800457,a=>a.a(async(b,c)=>{try{var d=a.i(333410),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(696068),i=b([d,e,h]);[d,e,h]=i.then?(await i)():i,a.s(["0005336a8f150be4900b8a56bfe414cd621bdefcb5",()=>e.initCmdMap,"00e37cbbb4d632a384763efcbc7d1bfc76bff6bbf3",()=>e.initCmdHelpMap,"408041a9c0f0c8a59ce288ff0c15cf1b23912e4043",()=>f.callSTT,"4091d9524057434ebbaebbc2cc76e08b2b7555aeae",()=>h.searchExample,"40e49979df1d39470a490d1dfa4ab4bb69e9d906f2",()=>g.callSTT,"40ef15ec10ccaf83d73930d3277028a2464a8fe6b4",()=>h.getExample,"60dcbf4c1557a63ddacd4519dce4d726c649d040c1",()=>g.callTTS]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node_buffer_0063pbu._.js"].map(b=>a.l(b))).then(()=>b(951615)))},918707,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_fast_bg_postgresql_mjs_099j3lu._.js"].map(b=>a.l(b))).then(()=>b(407142)))},480599,a=>{a.v(b=>Promise.all(["server/chunks/ssr/0q_8_client_runtime_query_compiler_fast_bg_postgresql_wasm-base64_mjs_0r8o7i7._.js"].map(b=>a.l(b))).then(()=>b(417734)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_0qpdcgw._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__0cu6wjw._.js","server/chunks/ssr/[root-of-the-server]__0-uebne._.js","server/chunks/ssr/[root-of-the-server]__01i6~5p._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0zd4~re._.js.map
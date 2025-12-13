module.exports=[688947,(a,b,c)=>{b.exports=a.x("stream",()=>require("stream"))},924868,(a,b,c)=>{b.exports=a.x("fs/promises",()=>require("fs/promises"))},500874,(a,b,c)=>{b.exports=a.x("buffer",()=>require("buffer"))},761095,(a,b,c)=>{b.exports=a.x("node:net",()=>require("node:net"))},81111,(a,b,c)=>{b.exports=a.x("node:stream",()=>require("node:stream"))},254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},666680,(a,b,c)=>{b.exports=a.x("node:crypto",()=>require("node:crypto"))},750227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},857764,(a,b,c)=>{b.exports=a.x("node:url",()=>require("node:url"))},446786,(a,b,c)=>{b.exports=a.x("os",()=>require("os"))},522734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},180490,a=>{a.v({name:"dotenv",version:"17.2.3",description:"Loads environment variables from .env file",main:"lib/main.js",types:"lib/main.d.ts",exports:{".":{types:"./lib/main.d.ts",require:"./lib/main.js",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},scripts:{"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard",pretest:"npm run lint && npm run dts-check",test:"tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",prerelease:"npm test",release:"standard-version"},repository:{type:"git",url:"git://github.com/motdotla/dotenv.git"},homepage:"https://github.com/motdotla/dotenv#readme",funding:"https://dotenvx.com",keywords:["dotenv","env",".env","environment","variables","config","settings"],readmeFilename:"README.md",license:"BSD-2-Clause",devDependencies:{"@types/node":"^18.11.3",decache:"^4.6.2",sinon:"^14.0.1",standard:"^17.0.0","standard-version":"^9.5.0",tap:"^19.2.0",typescript:"^4.8.4"},engines:{node:">=12"},browser:{fs:!1}})},230056,a=>a.a(async(b,c)=>{try{let b=await a.y("pg");a.n(b),c()}catch(a){c(a)}},!0),678911,(a,b,c)=>{b.exports=a.x("@prisma/client/runtime/client",()=>require("@prisma/client/runtime/client"))},504446,(a,b,c)=>{b.exports=a.x("net",()=>require("net"))},449719,(a,b,c)=>{b.exports=a.x("assert",()=>require("assert"))},870722,(a,b,c)=>{b.exports=a.x("tty",()=>require("tty"))},524836,(a,b,c)=>{b.exports=a.x("https",()=>require("https"))},921517,(a,b,c)=>{b.exports=a.x("http",()=>require("http"))},755004,(a,b,c)=>{b.exports=a.x("tls",()=>require("tls"))},792509,(a,b,c)=>{b.exports=a.x("url",()=>require("url"))},761771,a=>{"use strict";var b=a.i(405890);a.s(["Prisma",0,b])},696068,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(139138);a.i(659281);var g=a.i(761771),h=a.i(713095),i=b([e]);async function j(a,b,c,d,f){let h=g.Prisma.raw(`topword_${b}`),i=g.Prisma.sql`
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
    `,n=g.Prisma.join([i(a,1),k,g.Prisma.sql`union`,i(a,2),l,g.Prisma.sql`union`,i(a,3),m]," ");try{let a=g.Prisma.join([g.Prisma.sql`select * from (`,n,g.Prisma.sql`) as t`,g.Prisma.sql`order by sort_order, id asc`,g.Prisma.sql`limit ${f} offset ${(d-1)*f}`]," "),b=await e.prisma.$queryRaw(a),c=g.Prisma.join([g.Prisma.sql`select count(1) as total from (`,n,g.Prisma.sql`) as t`]," "),h=await e.prisma.$queryRaw(c),i=Number(h[0]?.total||0);return{status:"success",data:b,total_records:i,page:d,total_pages:Math.ceil(i/f)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function l(a,b){try{let c=await e.prisma.word_trash.create({data:{uuid:(0,f.getUUID)(),word:a,created_by:b,created_at:new Date,updated_at:new Date}});return{status:"success",data:c}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function m(a){try{let b=await e.prisma.topword_de_example.findMany({where:{word_id:a}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}async function n(a){try{let b=await e.prisma.topword_de_example.findMany({where:{example:{contains:a}},distinct:["example"],take:100,select:{example:!0}});return{status:"success",data:b.map(a=>a.example)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}[e]=i.then?(await i)():i,(0,h.ensureServerEntryExports)([j,k,l,m,n]),(0,d.registerServerReference)(j,"7cd13441d0be3e12825c17de51250421b8b60b08d5",null),(0,d.registerServerReference)(k,"7cdef1e5b5030c235dfb43796f6b0692cddbab2dc7",null),(0,d.registerServerReference)(l,"60777e0d78545d65c9561d6c0572cd731bd2eb5efe",null),(0,d.registerServerReference)(m,"40bfd570f200b90035eccaf2194882834f4a575ed6",null),(0,d.registerServerReference)(n,"40f133223989bc5a2803eaa2bce9d019001f1208b0",null),a.s(["getExample",()=>m,"getTopword",()=>j,"searchExample",()=>n,"searchTopword",()=>k,"trashWord",()=>l]),c()}catch(a){c(a)}},!1),333410,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(696068),f=b([d,e]);[d,e]=f.then?(await f)():f,a.s([]),c()}catch(a){c(a)}},!1),800457,a=>a.a(async(b,c)=>{try{var d=a.i(333410),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(696068),i=b([d,e,h]);[d,e,h]=i.then?(await i)():i,a.s(["002b1efc64df726b3c6e27c12858723156910bdb3c",()=>e.initCmdHelpMap,"007ae9ea31be088c70041c663d1656ee451afe40b8",()=>e.initCmdMap,"4081edae522a99e6f648b3a5fea107182775942c1f",()=>g.callSTT,"40a7b81409fc516e1af214cf152cfa393c14178617",()=>f.callSTT,"40bfd570f200b90035eccaf2194882834f4a575ed6",()=>h.getExample,"40f133223989bc5a2803eaa2bce9d019001f1208b0",()=>h.searchExample,"6015ec9d6a0794a74cd11935756ced17624f3a6b46",()=>g.callTTS]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node:buffer_00e2e67a._.js"].map(b=>a.l(b))).then(()=>b(951615)))},386314,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_bg_postgresql_mjs_49b2f844._.js"].map(b=>a.l(b))).then(()=>b(50492)))},145694,a=>{a.v(b=>Promise.all(["server/chunks/ssr/2e4a4_@prisma_client_runtime_query_compiler_bg_postgresql_wasm-base64_mjs_ead821ad._.js"].map(b=>a.l(b))).then(()=>b(904568)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_9b06bcf1._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__ad0c9994._.js","server/chunks/ssr/[root-of-the-server]__dbc93115._.js","server/chunks/ssr/[root-of-the-server]__087724f4._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__b20bf579._.js.map
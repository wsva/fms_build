module.exports=[907101,a=>a.a(async(b,c)=>{try{var d=a.i(137936),e=a.i(766518),f=a.i(139138);a.i(659281);var g=a.i(761771),h=a.i(713095),i=b([e]);async function j(){try{let a=await e.prisma.qsa_card.findMany({select:{user_id:!0},distinct:["user_id"]});return{status:"success",data:a.map(a=>a.user_id)}}catch(a){return console.log(a),{status:"error",error:a.toString()}}}[e]=i.then?(await i)():i;let k=async(a,b)=>{try{return await e.prisma.$transaction(async c=>{let d=(await c.$queryRaw(g.Prisma.sql`
                select c.uuid
                from qsa_card c
                join qsa_card_tag t on t.card_uuid = c.uuid
                where c.user_id = ${a}
                  and t.tag_uuid = ${b}
            `)).map(a=>a.uuid);if(0!==d.length)for(let e of(await c.$executeRaw(g.Prisma.sql`
                delete from qsa_card_tag t
                using qsa_card c
                where t.card_uuid = c.uuid
                  and c.user_id = ${a}
                  and t.tag_uuid = ${b}
            `),d))await c.$executeRaw(g.Prisma.sql`
                    delete from qsa_card c
                    where c.user_id = ${a}
                      and c.uuid = ${e}
                      and not exists (select 1 from qsa_card_tag t where t.card_uuid = c.uuid)
                `)}),{status:"success",data:!0}}catch(a){return console.log(a),{status:"error",error:a.toString()}}},l=async(a,b,c,d)=>{try{return await e.prisma.$transaction(async e=>{let h=(await e.$queryRaw(g.Prisma.sql`
                select c.uuid
                from qsa_card c
                join qsa_card_tag t on t.card_uuid = c.uuid
                where c.user_id = ${a}
                  and t.tag_uuid = ${b}
                  and length(c.question) > 0
                  and length(c.answer) > 0
            `)).map(a=>a.uuid);if(0!==h.length)for(let a of h){let b=(0,f.getUUID)(),g=await e.qsa_card.findUnique({where:{uuid:a}});if(!g)throw Error(`card not found by uuid: ${a}`);await e.qsa_card.create({data:{...g,uuid:b,user_id:c}}),await e.qsa_card_tag.create({data:{uuid:(0,f.getUUID)(),card_uuid:b,tag_uuid:d,created_at:new Date,updated_at:new Date}})}}),{status:"success",data:!0}}catch(a){return console.log(a),{status:"error",error:a.toString()}}};(0,h.ensureServerEntryExports)([j,k,l]),(0,d.registerServerReference)(j,"00bc3a24bd0d360427a27f81103b9501b03bd7a1d8",null),(0,d.registerServerReference)(k,"7ff06ac81b796ae5560a1f03cfee328d9f5040c6ef",null),(0,d.registerServerReference)(l,"7f5d198b4ad50bd4eb142a1a3db78374a8076bcad7",null),a.s(["copyCardsByTag",0,l,"getUserIDAll",()=>j,"removeCardsByTag",0,k]),c()}catch(a){c(a)}},!1),340833,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(907101),f=a.i(914621),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s([]),c()}catch(a){c(a)}},!1),815963,a=>a.a(async(b,c)=>{try{var d=a.i(340833),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(907101),i=a.i(914621),j=b([d,e,h,i]);[d,e,h,i]=j.then?(await j)():j,a.s(["002eeb6f06dc71b98843ce74aa13e74672c420a2dc",()=>e.initCmdMap,"00bc3a24bd0d360427a27f81103b9501b03bd7a1d8",()=>h.getUserIDAll,"00e0b59d9a1c351cb1002c7abad28ee2d8cf7099e9",()=>e.initCmdHelpMap,"4088f47ce078ca1b49f045364e6376d72b0a77d2a4",()=>i.saveCardTag,"40acb5f9d8c64167ae23263501643c3738b9e5c92f",()=>i.saveCard,"40c78fa8d8876b66f47d6c3f8f8fd8d58e64f4fe42",()=>i.getTagAll,"40fe50c00ba128bd71620290e1c9d8017e411e25e0",()=>f.callSTT,"40fedd02abf4a1023065a9d6033cab2b0fbfbe5fa4",()=>g.callSTT,"604411ae1e0dbd5fa170981f6c1671266441dcfb62",()=>i.getCardTag,"6064e3258929f80533596cc59553361f6539fc3062",()=>i.setCardFamiliarity,"60c79253df8a7f3656afb0b035ec7a78d8612e69bd",()=>g.callTTS,"7ef478a6b7ff45438587b2a116300f01d25d6c8b14",()=>i.getCardAll,"7f5d198b4ad50bd4eb142a1a3db78374a8076bcad7",()=>h.copyCardsByTag,"7ff06ac81b796ae5560a1f03cfee328d9f5040c6ef",()=>h.removeCardsByTag]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node:buffer_00e2e67a._.js"].map(b=>a.l(b))).then(()=>b(951615)))},386314,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_bg_postgresql_mjs_49b2f844._.js"].map(b=>a.l(b))).then(()=>b(50492)))},145694,a=>{a.v(b=>Promise.all(["server/chunks/ssr/2e4a4_@prisma_client_runtime_query_compiler_bg_postgresql_wasm-base64_mjs_ead821ad._.js"].map(b=>a.l(b))).then(()=>b(904568)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_9b06bcf1._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__ad0c9994._.js","server/chunks/ssr/[root-of-the-server]__dbc93115._.js","server/chunks/ssr/[root-of-the-server]__087724f4._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__19847a6c._.js.map
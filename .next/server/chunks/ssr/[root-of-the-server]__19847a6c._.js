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
            `)).map(a=>a.uuid);if(0!==h.length)for(let a of h){let b=(0,f.getUUID)(),g=await e.qsa_card.findUnique({where:{uuid:a}});if(!g)throw Error(`card not found by uuid: ${a}`);await e.qsa_card.create({data:{...g,uuid:b,user_id:c}}),await e.qsa_card_tag.create({data:{uuid:(0,f.getUUID)(),card_uuid:b,tag_uuid:d,created_at:new Date,updated_at:new Date}})}}),{status:"success",data:!0}}catch(a){return console.log(a),{status:"error",error:a.toString()}}};(0,h.ensureServerEntryExports)([j,k,l]),(0,d.registerServerReference)(j,"00bd3c4fd1b46e2cea7496586e700fb53bfaa8533e",null),(0,d.registerServerReference)(k,"7fb4d9d05c33c1826c67dfa6a5837882b3769c353b",null),(0,d.registerServerReference)(l,"7f016f2d8f7e45d053544fb54dc4b9303a77136de8",null),a.s(["copyCardsByTag",0,l,"getUserIDAll",()=>j,"removeCardsByTag",0,k]),c()}catch(a){c(a)}},!1),340833,a=>a.a(async(b,c)=>{try{var d=a.i(289254);a.i(763003),a.i(55815);var e=a.i(907101),f=a.i(914621),g=b([d,e,f]);[d,e,f]=g.then?(await g)():g,a.s([]),c()}catch(a){c(a)}},!1),815963,a=>a.a(async(b,c)=>{try{var d=a.i(340833),e=a.i(289254),f=a.i(763003),g=a.i(55815),h=a.i(907101),i=a.i(914621),j=b([d,e,h,i]);[d,e,h,i]=j.then?(await j)():j,a.s(["002b1efc64df726b3c6e27c12858723156910bdb3c",()=>e.initCmdHelpMap,"007ae9ea31be088c70041c663d1656ee451afe40b8",()=>e.initCmdMap,"00bd3c4fd1b46e2cea7496586e700fb53bfaa8533e",()=>h.getUserIDAll,"400c7f3f86ef473460c485191a6570d9a78b6a39c2",()=>i.saveCardTag,"400d4055fab9d850fd0e225bab377b6c3fb578a9e4",()=>i.saveCard,"4081edae522a99e6f648b3a5fea107182775942c1f",()=>g.callSTT,"40a7267f75033833a6eda79518da25a439e52bc4ae",()=>i.getTagAll,"40a7b81409fc516e1af214cf152cfa393c14178617",()=>f.callSTT,"6015ec9d6a0794a74cd11935756ced17624f3a6b46",()=>g.callTTS,"60b8f41eb8d4431d24921e73d8415a6fc70d0433f1",()=>i.setCardFamiliarity,"60f9279d7594255b59f3ffae78d8147a2fe4196b3c",()=>i.getCardTag,"7e3ab634cbf0abbc1d9625f0334607df6fddb8db19",()=>i.getCardAll,"7f016f2d8f7e45d053544fb54dc4b9303a77136de8",()=>h.copyCardsByTag,"7fb4d9d05c33c1826c67dfa6a5837882b3769c353b",()=>h.removeCardsByTag]),c()}catch(a){c(a)}},!1),916005,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_node:buffer_00e2e67a._.js"].map(b=>a.l(b))).then(()=>b(951615)))},386314,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[externals]_@prisma_client_runtime_query_compiler_bg_postgresql_mjs_49b2f844._.js"].map(b=>a.l(b))).then(()=>b(50492)))},145694,a=>{a.v(b=>Promise.all(["server/chunks/ssr/2e4a4_@prisma_client_runtime_query_compiler_bg_postgresql_wasm-base64_mjs_ead821ad._.js"].map(b=>a.l(b))).then(()=>b(904568)))},485685,a=>{a.v(a=>Promise.resolve().then(()=>a(254799)))},706179,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_9b06bcf1._.js"].map(b=>a.l(b))).then(()=>b(48081)))},790407,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__ad0c9994._.js","server/chunks/ssr/[root-of-the-server]__dbc93115._.js","server/chunks/ssr/[root-of-the-server]__087724f4._.js"].map(b=>a.l(b))).then(()=>b(525659)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__19847a6c._.js.map
"use strict";exports.id=851,exports.ids=[851],exports.modules={53134:(t,a,e)=>{e.d(a,{CZ:()=>u,LG:()=>c,ln:()=>o,lq:()=>d,pl:()=>s,tc:()=>l,yJ:()=>i,z_:()=>n}),e(15424);var r=e(46242),s=(0,r.$)("ae2756021412af3c7533170046625d9bfe173ca7");(0,r.$)("50b8ee2c01702d556b77028eb169eaff9ea0f820"),(0,r.$)("92a63b1efc916ff008d1272dc5a65580af78af67"),(0,r.$)("40b0e9a5fae5e29abe9213bb007d11cec6f7e31f");var n=(0,r.$)("2c8f731e7c04d6b71f833304321e741fa16aeefd");(0,r.$)("0032af294b820d5b2f6ecb599810073224fb8405");var i=(0,r.$)("479742cc8645e1909d54f38cd9fe015e9621ab60"),d=(0,r.$)("6d2e69b109044da9a0608b4844be959036b9b175");(0,r.$)("b9098ba02eb30e332c60e216b96eda5868da288a");var u=(0,r.$)("651d629a9efc5ac1f2e83ecc837477b8129dac19"),c=(0,r.$)("32a3617889b58b88de5846c96efc11d8a1322d4a"),o=(0,r.$)("59141756fe4b901c2b6407bb9725bab62d2967e1"),l=(0,r.$)("523b5dd287e6725b6f91274aca1051653bfdf0e6");(0,r.$)("fbde93d90dfb682967795128b2ca856ab81d14aa")},15316:(t,a,e)=>{e.r(a),e.d(a,{createTag:()=>$,getCard:()=>f,getCardTag:()=>P,getCardTest:()=>b,getCardsOfMy:()=>l,getCardsOfOthers:()=>g,getTag:()=>w,getTagAll:()=>y,removeCard:()=>m,removeTag:()=>p,saveCard:()=>_,saveCardTag:()=>S,saveTag:()=>q,setCardFamiliarity:()=>h});var r,s,n=e(24330);e(60166);var i=e(13538),d=e(40644),u=e(53524);!function(t){t.Normal="normal",t.Easy="easy",t.Unspecified="unspecified",t.Uncomplete="uncomplete"}(r||(r={}));let c="all tagged",o="not tagged";async function l(t,a,e,s,n,d){let l;let g=u.Prisma.sql`
        select * from qsa_card t0 where t0.user_id = ${t}
    `,f=u.Prisma.sql`
        select count(1) as total from qsa_card t0 where t0.user_id = ${t}
    `,_=u.Prisma.sql`
        -- use this condition only when tag_uuid is a uuid
        -- don't use this condition if tag_uuid = unspecified/all/no (always true)
        and (exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid
                and t1.tag_uuid = ${e})
            or ${e} = ${"unspecified"}
            or ${e} = ${c}
            or ${e} = ${o})
        -- need no condition if tag_uuid = unspecified
        and 1 = 1
        -- use this condition only when tag_uuid = all
        -- don't use this condition if tag_uuid != all (always true)
        and (exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid)
            or ${e} != ${c})
        -- use this condition only when tag_uuid = no
        -- don't use this condition if tag_uuid != no
        and (not exists (select 1 from qsa_card_tag t1 where
                t1.card_uuid = t0.uuid)
            or ${e} != ${o})
    `,b=s.replaceAll(/\s+/g," ").replaceAll(/^\s+|\s+$/g,""),m=s?u.Prisma.sql`
            and (lower(t0.question) like lower(${"%"+b+"%"})
                or lower(t0.answer) like lower(${"%"+b+"%"}))
        `:u.Prisma.sql``,h=u.Prisma.sql`
        limit ${d} offset ${(n-1)*d}
    `,w=u.Prisma.sql`
        order by updated_at desc
    `;switch(a){case r.Unspecified:l=u.Prisma.join([_,m]," ");break;case r.Normal:l=u.Prisma.join([u.Prisma.sql`
                    and length(t0.question) > 0
                    and length(t0.answer) > 0
                    and t0.familiarity < 6
                `,_,m]," ");break;case r.Easy:l=u.Prisma.join([u.Prisma.sql`
                    and t0.familiarity = 6
                `,_,m]," ");break;case r.Uncomplete:l=u.Prisma.join([u.Prisma.sql`
                    and (length(t0.question) = 0 or length(t0.answer) = 0)
                `,_,m]," ")}try{let t=u.Prisma.join([g,l,w,h]," "),a=await i._.$queryRaw(t),e=u.Prisma.join([f,l]," "),r=await i._.$queryRaw(e),s=Number(r[0]?.total||0);return{status:"success",data:a,total_records:s,page:n,total_pages:Math.ceil(s/d)}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function g(t,a,e,r){let s=u.Prisma.sql`
        select * from qsa_card t0 where t0.user_id != ${t}
    `,n=u.Prisma.sql`
        select count(1) as total from qsa_card t0 where t0.user_id != ${t}
    `,d=u.Prisma.sql`
        and length(t0.question) > 0
        and length(t0.answer) > 0
    `,c=a?u.Prisma.sql`and t0.user_id = ${a}`:u.Prisma.sql``,o=u.Prisma.sql`
        order by created_at desc
    `,l=u.Prisma.sql`
        limit ${r} offset ${(e-1)*r}
    `;try{let t=u.Prisma.join([s,d,c,o,l]," "),a=await i._.$queryRaw(t),g=u.Prisma.join([n,d,c]," "),f=await i._.$queryRaw(g),_=Number(f[0]?.total||0);return{status:"success",data:a,total_records:_,page:e,total_pages:Math.ceil(_/r)}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function f(t){try{let a=await i._.qsa_card.findUnique({where:{uuid:t}});if(!a)return{status:"error",error:"no data found"};return{status:"success",data:a}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function _(t){if(0===t.question.length||0===t.answer.length)return{status:"error",error:"invalid card"};try{t.uuid&&""!==t.uuid||(t.uuid=(0,d.Fs)());let a=await i._.qsa_card.upsert({where:{uuid:t.uuid},create:t,update:t});return{status:"success",data:a}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function b(t,a){try{let e=await i._.$queryRaw(u.Prisma.sql`SELECT * FROM qsa_card t0 WHERE
                    length(t0.question) > 0
                    and length(t0.answer) > 0
                    and t0.familiarity < 6
                    and t0.user_id = ${t}
                    and exists (select 1 from qsa_card_tag t1 where
                        t1.card_uuid = t0.uuid
                        and t1.tag_uuid = ${a})
                    `);if(e.length<1)return{status:"error",error:"no card found for test"};let r=e.map(t=>6-t.familiarity),s=(0,d.u1)(r);return{status:"success",data:e[s]}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function m(t){try{let a=await i._.qsa_card.delete({where:{uuid:t}});return{status:"success",data:a}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function h(t,a,e){try{let r=await i._.qsa_card.update({where:{uuid:a,user_id:t},data:{familiarity:e}});return await i._.qsa_card_log.create({data:{uuid:(0,d.Fs)(),card_uuid:a,familiarity:e,created_at:new Date,updated_at:new Date}}),{status:"success",data:r}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function w(t){try{let a=await i._.qsa_tag.findUnique({where:{uuid:t}});if(!a)return{status:"error",error:"no data found"};return{status:"success",data:a}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function y(t){try{let a=await i._.qsa_tag.findMany({where:{OR:[{user_id:t},{user_id:"public"}]},orderBy:{tag:"asc"}});return{status:"success",data:a}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function q(t){if(0===t.tag.length)return{status:"error",error:"empty tag content"};try{t.uuid&&""!==t.uuid||(t.uuid=(0,d.Fs)());let a=await i._.qsa_tag.upsert({where:{uuid:t.uuid},create:t,update:t});return{status:"success",data:a}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function $(t){try{let a=await i._.qsa_tag.create({data:t});return{status:"success",data:a}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function p(t){if(t.match(/_by_system$/))return{status:"error",error:"cannot remove tag created by system"};try{let a=await i._.qsa_tag.delete({where:{uuid:t}});return await i._.qsa_card_tag.deleteMany({where:{tag_uuid:t}}),{status:"success",data:a}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function P(t,a){try{let e=await i._.$queryRaw(u.Prisma.sql`select t0.* from qsa_card_tag t0, qsa_tag t1 where
                t0.tag_uuid = t1.uuid
                and t0.card_uuid = ${a}
                and t1.user_id in (${t}, 'public')
                `);if(!e)return{status:"error",error:"no data found"};let r={uuid:a,tag_list_added:e.map(t=>t.tag_uuid)};return{status:"success",data:r}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}async function S(t){if("string"!=typeof t.uuid)return{status:"error",error:"card uuid is empty"};let a=t.uuid;try{return t.tag_list_new&&t.tag_list_new.length>0&&await i._.qsa_card_tag.createMany({data:t.tag_list_new.map(t=>({uuid:(0,d.Fs)(),card_uuid:a,tag_uuid:t,created_at:new Date,updated_at:new Date}))}),t.tag_list_remove&&t.tag_list_remove.length>0&&await i._.qsa_card_tag.deleteMany({where:{card_uuid:a,tag_uuid:{in:t.tag_list_remove}}}),{status:"success",data:{uuid:a}}}catch(t){return console.log(t),{status:"error",error:t.toString()}}}(function(t){t[t.NewlyAdded=0]="NewlyAdded",t[t.StillUnfamiliar=1]="StillUnfamiliar",t[t.PassiveUnderstanding=2]="PassiveUnderstanding",t[t.RecognitionWithoutUnderstanding=3]="RecognitionWithoutUnderstanding",t[t.UnderstandingInContext=4]="UnderstandingInContext",t[t.ActiveRecall=5]="ActiveRecall",t[t.NaturalUsage=6]="NaturalUsage"})(s||(s={})),(0,e(40618).h)([l,g,f,_,b,m,h,w,y,q,$,p,P,S]),(0,n.j)("50b8ee2c01702d556b77028eb169eaff9ea0f820",l),(0,n.j)("92a63b1efc916ff008d1272dc5a65580af78af67",g),(0,n.j)("40b0e9a5fae5e29abe9213bb007d11cec6f7e31f",f),(0,n.j)("2c8f731e7c04d6b71f833304321e741fa16aeefd",_),(0,n.j)("0032af294b820d5b2f6ecb599810073224fb8405",b),(0,n.j)("479742cc8645e1909d54f38cd9fe015e9621ab60",m),(0,n.j)("6d2e69b109044da9a0608b4844be959036b9b175",h),(0,n.j)("b9098ba02eb30e332c60e216b96eda5868da288a",w),(0,n.j)("651d629a9efc5ac1f2e83ecc837477b8129dac19",y),(0,n.j)("32a3617889b58b88de5846c96efc11d8a1322d4a",q),(0,n.j)("59141756fe4b901c2b6407bb9725bab62d2967e1",$),(0,n.j)("523b5dd287e6725b6f91274aca1051653bfdf0e6",p),(0,n.j)("fbde93d90dfb682967795128b2ca856ab81d14aa",P),(0,n.j)("ae2756021412af3c7533170046625d9bfe173ca7",S)},40644:(t,a,e)=>{e.d(a,{Fs:()=>n,p6:()=>s,u1:()=>d,x:()=>i}),e(16725),e(40525),e(37661);var r=e(9576);let s=t=>{let a=t.getFullYear(),e=(t.getMonth()+1).toString().padStart(2,"0"),r=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),n=t.getMinutes().toString().padStart(2,"0"),i=t.getSeconds().toString().padStart(2,"0");return`${a}-${e}-${r} ${s}:${n}:${i}`},n=()=>(0,r.Z)().replaceAll("-",""),i=t=>!!t.match(/^[^'"=]+$/),d=t=>{let a=0;for(a=1;a<t.length;a++)t[a]+=t[a-1];let e=Math.random()*t[t.length-1];for(a=0;a<t.length&&!(t[a]>e);a++);return a}},33159:(t,a,e)=>{e.r(a),e.d(a,{default:()=>s});var r=e(66621);let s=t=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",t.params,"favicon.ico")+""}]}};
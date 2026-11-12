import{e as o,z as J,a as K}from"./Dryij9QL.js";import{n as Q,h as z,a as M}from"./DyzxMmQS.js";import"./Du2vhNja.js";const F="OEBPS/content.opf",tt=new Set(["content.opf","nav.xhtml","toc.ncx","cover.xhtml","style.css"]),X={"image/jpeg":"jpg","image/png":"png","image/gif":"gif","image/webp":"webp","image/svg+xml":"svg"},et=`body { line-height: 1.4; }
img { max-width: 100%; height: auto; }
`;function D(i){let a=i;try{a=decodeURIComponent(i)}catch{}const r=[];for(const c of a.replace(/\\/g,"/").split("/"))c===""||c==="."||c===".."||r.push(c);return r.join("/")}const y=i=>i.split("/").map(encodeURIComponent).join("/");function nt(i){const a=(...c)=>c.every((p,x)=>i[x]===p);if(a(255,216,255))return"image/jpeg";if(a(137,80,78,71))return"image/png";if(a(71,73,70,56))return"image/gif";if(a(82,73,70,70)&&i[8]===87&&i[9]===69&&i[10]===66&&i[11]===80)return"image/webp";const r=new TextDecoder().decode(i.slice(0,512)).trimStart();return/^(<\?xml[\s\S]*?)?<svg[\s>]/i.test(r)?"image/svg+xml":null}function it(i){const a=i?.trim();return a&&/^\d{4}(-\d{2}(-\d{2})?)?([T ][\d:.]+(Z|[+-]\d{2}:?\d{2})?)?$/.test(a)?a.replace(" ","T"):null}function R(i,a,r){return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${i}" lang="${i}">
<head><meta charset="UTF-8"/><title>${o(a)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
${r}
</body>
</html>
`}async function ct(i,a=new Date){if(i.chapters.length===0)throw new Error("El libro no tiene capítulos");const{metadata:r}=i,c=Q(r.language),p=r.title.trim()||"Sin título",x=crypto.randomUUID(),N=a.toISOString().replace(/\.\d{3}Z$/,"Z"),$=new Set(tt),v=[],b=new Map;for(const t of i.resources){const e=D(t.path);if(!e||b.has(e))continue;let n=e;for(;$.has(n)||/^ch\d+\.xhtml$/.test(n);)n=`res/${n}`;$.add(n),b.set(e,n),v.push({id:`res-${v.length+1}`,path:n,mediaType:t.mediaType,data:t.data})}const S=t=>encodeURIComponent(t),T=i.chapters.map(t=>{const e=new Set;return z(t.html,{claimId:n=>!e.has(n)&&(e.add(n),!0)}),e}),I=(t,e)=>T[e]?.has(t)?e:T.findIndex(n=>n.has(t))>=0?T.findIndex(n=>n.has(t)):void 0,P=t=>`ch${String(t+1).padStart(3,"0")}.xhtml`,L=t=>e=>{if(e.startsWith("#")){if(e==="#")return e;let d=e.slice(1);try{d=decodeURIComponent(d)}catch{}const m=M(d),g=m?I(m,t):void 0;return g===void 0?null:g===t?`#${S(m)}`:`${P(g)}#${S(m)}`}const n=e.match(/^([^?#]*)([?#].*)?$/);if(!n||/^[a-z][a-z0-9+.-]*:/i.test(e))return e;const s=b.get(D(n[1]));return s?y(s)+(n[2]??""):e},f=i.chapters.map((t,e)=>{const n=`ch${String(e+1).padStart(3,"0")}`,s=t.title.trim()||String(e+1),d=new Set,m=z(t.html,{rewriteUrl:L(e),claimId:g=>!d.has(g)&&(d.add(g),!0)});return{id:n,href:P(e),title:s,hasSvg:/<svg[\s>]/.test(m),content:R(c,s,m)}});let h=null,l=i.cover;if(l&&!X[l.mediaType]){const t=nt(l.data);l=t?{data:l.data,mediaType:t}:void 0}if(l){let e=`cover.${X[l.mediaType]}`;for(;$.has(e);)e=`cover-${e}`;$.add(e),h=e}const u=h?R(c,p,`<div style="text-align:center"><img src="${y(h)}" alt="${o(p)}"/></div>`):null,U=t=>{const e=(t.children??[]).flatMap(U),n=f[t.chapterIndex];if(!n)return e;const s=t.anchor?M(t.anchor):"",d=s?I(s,t.chapterIndex):void 0,m=d===void 0?n.href:`${P(d)}#${S(s)}`;return[{title:t.title.trim()||n.title,href:m,children:e}]};let w=(i.toc??[]).flatMap(U);w.length===0&&(w=f.map(t=>({title:t.title,href:t.href,children:[]})));const B=t=>`<ol>
${t.map(e=>`<li><a href="${e.href}">${o(e.title)}</a>${e.children.length?`
${B(e.children)}
`:""}</li>`).join(`
`)}
</ol>`,k=[u?'<li><a epub:type="cover" href="cover.xhtml">Cover</a></li>':"",`<li><a epub:type="bodymatter" href="${f[0].href}">Start</a></li>`].filter(Boolean).join(`
`),A=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${c}" lang="${c}">
<head><meta charset="UTF-8"/><title>${o(p)}</title></head>
<body>
<nav epub:type="toc" id="toc">
<h1>${o(p)}</h1>
${B(w)}
</nav>
<nav epub:type="landmarks" id="landmarks" hidden="hidden">
<ol>
${k}
</ol>
</nav>
</body>
</html>
`;let Z=0;const E=new Map;let O=1;const j=(t,e)=>(t.length>0&&(O=Math.max(O,e)),t.map(n=>{let s=E.get(n.href);return s===void 0&&(s=E.size+1,E.set(n.href,s)),`<navPoint id="nav-${++Z}" playOrder="${s}"><navLabel><text>${o(n.title)}</text></navLabel><content src="${n.href}"/>${j(n.children,e+1)}</navPoint>`}).join(`
`)),H=j(w,1),V=`<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="${c}">
<head>
<meta name="dtb:uid" content="urn:uuid:${x}"/>
<meta name="dtb:depth" content="${O}"/>
<meta name="dtb:totalPageCount" content="0"/>
<meta name="dtb:maxPageNumber" content="0"/>
</head>
<docTitle><text>${o(p)}</text></docTitle>
<navMap>
${H}
</navMap>
</ncx>
`,C=it(r.date),Y=[`<dc:identifier id="book-id">urn:uuid:${x}</dc:identifier>`,`<dc:title>${o(p)}</dc:title>`,...r.authors.filter(t=>t.trim()).map(t=>`<dc:creator>${o(t.trim())}</dc:creator>`),`<dc:language>${o(c)}</dc:language>`,r.publisher?`<dc:publisher>${o(r.publisher)}</dc:publisher>`:"",r.description?`<dc:description>${o(r.description)}</dc:description>`:"",C?`<dc:date>${o(C)}</dc:date>`:"",`<meta property="dcterms:modified">${N}</meta>`,h?'<meta name="cover" content="cover-image"/>':""].filter(Boolean).join(`
`),_=['<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>','<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>','<item id="css" href="style.css" media-type="text/css"/>',u?'<item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>':"",...f.map(t=>`<item id="${t.id}" href="${t.href}" media-type="application/xhtml+xml"${t.hasSvg?' properties="svg"':""}/>`),h?`<item id="cover-image" href="${y(h)}" media-type="${o(l.mediaType)}" properties="cover-image"/>`:"",...v.map(t=>`<item id="${t.id}" href="${y(t.path)}" media-type="${o(t.mediaType)}"/>`)].filter(Boolean).join(`
`),q=[u?'<itemref idref="cover"/>':"",...f.map(t=>`<itemref idref="${t.id}"/>`)].filter(Boolean).join(`
`),W=`<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id" xml:lang="${c}">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
${Y}
</metadata>
<manifest>
${_}
</manifest>
<spine toc="ncx">
${q}
</spine>
</package>
`,G=await J([{name:"mimetype",input:"application/epub+zip"},{name:"META-INF/container.xml",input:K(F)},{name:F,input:W},{name:"OEBPS/nav.xhtml",input:A},{name:"OEBPS/toc.ncx",input:V},{name:"OEBPS/style.css",input:et},...u?[{name:"OEBPS/cover.xhtml",input:u}]:[],...f.map(t=>({name:`OEBPS/${t.href}`,input:t.content})),...h?[{name:`OEBPS/${h}`,input:l.data}]:[],...v.map(t=>({name:`OEBPS/${t.path}`,input:t.data}))]);return new Uint8Array(await G.arrayBuffer())}export{ct as writeEpub};

var s=function(t,r){return r===void 0&&(r=2),t.toString().padStart(r,"0")};function f(n,t){t===void 0&&(t={format:"srt"});var r=new Date(0,0,0,0,0,0,n),e=r.getHours(),a=r.getMinutes(),i=r.getSeconds(),c=n-(e*36e5+a*6e4+i*1e3);return s(e)+":"+s(a)+":"+s(i)+(t.format==="vtt"?".":",")+s(c,3)}function p(){return p=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(n[e]=r[e])}return n},p.apply(this,arguments)}function m(n){var t=n.match(/^(?:(\d{1,}):)?(\d{2}):(\d{2})[,.](\d{3})$/);if(!t)throw new Error('Invalid SRT or VTT time format: "'+n+'"');var r=t[1]?parseInt(t[1],10)*36e5:0,e=parseInt(t[2],10)*6e4,a=parseInt(t[3],10)*1e3,i=parseInt(t[4],10);return r+e+a+i}var d=/^((?:\d{1,}:)?\d{2}:\d{2}[,.]\d{3}) --> ((?:\d{1,}:)?\d{2}:\d{2}[,.]\d{3})(?: (.*))?$/;function v(n){var t=d.exec(n);if(!t)throw new Error("Invalid timestamp format");var r={start:m(t[1]),end:m(t[2])};return t[3]&&(r.settings=t[3]),r}var x=function(t){return t.trim().concat(`
`).replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).replace(/^WEBVTT.*\n(?:.*: .*\n)*\n/,"").split(`
`)},u=function(t){return/^\d+$/.test(t.trim())},o=function(t){return d.test(t)},T=function(t,r,e){throw new Error("expected "+t+" at row "+(r+1)+", but received "+e)};function h(n){var t=x(n),r={expect:"index",caption:{start:0,end:0,text:""},captions:[]};return t.forEach(function(e,a){if(!(r.expect==="index"&&(r.expect="timestamp",u(e)))){if(r.expect==="timestamp"){o(e)||T("timestamp",a,e),r.caption=p({},r.caption,v(e)),r.expect="text";return}if(r.expect==="text"){if(o(t[a+1])){r.expect="timestamp",r.captions.push(r.caption),r.caption={start:0,end:0,text:""};return}var i=a===t.length-1,c=u(t[a+1]||"")&&o(t[a+2]);i||c?(r.expect="index",r.captions.push(r.caption),r.caption={start:0,end:0,text:""}):r.caption.text=r.caption.text?r.caption.text+`
`+e:e}}}),r.captions}function l(n,t){t===void 0&&(t={format:"srt"});var r=t.format==="vtt";return(r?`WEBVTT

`:"")+n.map(function(e,a){return(a>0?`
`:"")+[a+1,f(e.start,t)+" --> "+f(e.end,t)+(r&&e.settings?" "+e.settings:""),e.text].join(`
`)}).join(`
`)+`
`}export{d as RE_TIMESTAMP,f as formatTimestamp,h as parse,m as parseTimestamp,v as parseTimestamps,l as stringify};

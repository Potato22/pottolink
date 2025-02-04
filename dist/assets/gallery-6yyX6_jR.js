import"./poc-CFonUFvD.js";(()=>{const o=localStorage.getItem("filterNSFW"),r=localStorage.getItem("filterSketch"),b=localStorage.getItem("filterVersion"),g=document.getElementById("loadMore");if(console.log("dataNSFW display:",o,`
dataSketch display:`,r,`
dataVersion display:`,b),console.log("init"),o==="displayed")var p=!1;else var p=!0;if(r==="displayed")var F=!1;else var F=!0;if(b==="displayed")var k=!1;else var k=!0;console.log("nsfw hidden",p,`
sketch hidden`,F,`
versioning hidden`,k);let n=[],T=[];async function D(){console.log("async fetchDisplay");try{$(".galleryLoadingInd").html("Hold on...").addClass("holdon"),console.log("attempting to call");const s=await fetch("https://pottob2-dispgallery.pottoart.workers.dev/api/v1/list_all_files?maxFileCount=800");if(!s.ok)throw $(".galleryLoadingInd").html("Bucket responded with "+s.status).removeClass("holdon"),new Error("Something went wrong while trying to fetch files",s.status);return await s.json()}catch(s){return $(".galleryLoadingInd").html("Something went horribly wrong: list_all_files: "+s.message).removeClass("holdon"),console.error("*blows up json with mind*",s.message),null}}function y(s,e){const a=n.slice(s,e),c=document.getElementById("latestWorks"),f=document.createDocumentFragment();a.forEach(l=>{const t=new Image,d=document.createElement("p");t.setAttribute("data-aos","zoom-in"),t.setAttribute("class","imgs self cards b2Imgs"),t.setAttribute("orbReact","true"),t.src=l.urlLossy,t.alt=l.nameLossy,t.dataset.nsfw=l.nsfw?"true":"false",t.dataset.sketch=l.sketch?"true":"false",t.dataset.versioning=l.versioning?"true":"false";const w=T.find(N=>N.nameLossless===l.nameLossy);w?(d.textContent="lossless: "+w.urlLossless,t.dataset.lossless=w.urlLossless):l.sketch?d.textContent="Sketch: "+l.urlLossy:(d.textContent="No lossless version available",t.dataset.lossless=!1),f.append(t)}),console.log("Display Data:",a),console.log("Lossless Data:",T),c.appendChild(f)}D().then(s=>{s&&(console.log("Fetched files:",s),console.log("filtering"),s.forEach(e=>{if(e.contentType.includes("image/"))if(e.name.includes("display/")){const a="nameLossy",c="urlLossy",f="date",l=e.url.includes("sketch"),t=e.url.includes("nsfw"),d=V(e.name);(!p||!t)&&(!k||!d)&&(!F||!l)&&n.push({[a]:e.name.replace(/(?:display|lossless)\//,"").replace("nsfw/","").replace("sketch/","").split(".")[0],[c]:e.url,[f]:e.uploadTime,sketch:l?!0:null,nsfw:t?!0:null,versioning:d?!0:null})}else e.name.includes("lossless/")&&T.push({["nameLossless"]:e.name.replace(/(?:display|lossless)\//,"").replace("nsfw/","").split(".")[0],urlLossless:e.url,date:e.uploadTime})}),n.sort((e,a)=>new Date(a.date)-new Date(e.date)),y(0,16),$(".galleryLoadingInd").fadeOut(),$(g).fadeIn())}).catch(s=>{console.error("Error during fetch:",s),$(".galleryLoadingInd").html("Fetching was successful but something still went wrong, not good news tell you that now. "+s).removeClass("holdon")});function E(s){let e=[];return s.split(".").join(" ").split(" ").forEach(c=>{c.startsWith("-")&&e.push(c.substr(1))}),e}function V(s){const e=E(s);return!(e.length===0||e.length===1&&e.includes("sfw")||e.includes("0"))}let h=16,i=24;function W(){$(".wideGoTitle").html("Nothing else to load or limit reached!..."),$(g).css("pointer-events","none"),setTimeout(()=>{$(g).fadeOut()},5e3)}g.addEventListener("click",()=>{console.log("loading more"),console.log("end, ",i," less equal ","allDisplayImages, ",n.length," = ",i<=n.length),i<=n.length?(y(h,i),h+=8,i+=8,console.log("start, ",h," end, ",i)):(y(h,n.length),W())})})();const v=document.getElementById("nsfwFTT"),I=document.getElementById("sketchFTT"),C=document.getElementById("versioningFTT"),u=localStorage.getItem("filterNSFW"),m=localStorage.getItem("filterSketch"),S=localStorage.getItem("filterVersion");function B(o){$("#reloadButton").addClass("reloadReady");let r=this.id;if(o.target.checked)switch(r){case"nsfwFTT":localStorage.setItem("filterNSFW","displayed"),$("#nsfw-FT").addClass("FTon");break;case"sketchFTT":localStorage.setItem("filterSketch","displayed"),$("#sketch-FT").addClass("FTon");break;case"versioningFTT":localStorage.setItem("filterVersion","displayed"),$("#versioning-FT").addClass("FTon");break}else switch(r){case"nsfwFTT":localStorage.setItem("filterNSFW","hidden"),$("#nsfw-FT").removeClass("FTon");break;case"sketchFTT":localStorage.setItem("filterSketch","hidden"),$("#sketch-FT").removeClass("FTon");break;case"versioningFTT":localStorage.setItem("filterVersion","hidden"),$("#versioning-FT").removeClass("FTon");break}console.log("which: ",r,"(displayed:",o.target.checked,")")}function L(){$("#nsfw-FT").removeClass("FTon"),v.checked=!1,localStorage.setItem("filterNSFW","hidden"),$("#sketch-FT").addClass("FTon"),I.checked=!0,localStorage.setItem("filterSketch","displayed"),$("#versioning-FT").addClass("FTon"),C.checked=!0,localStorage.setItem("filterVersion","displayed")}u===null||m===null||S===null||[u,m,S].every(o=>o==="hidden")?L():(u==="displayed"?(v.checked=!0,$("#nsfw-FT").addClass("FTon")):(v.checked=!1,$("#nsfw-FT").removeClass("FTon")),m==="displayed"?(I.checked=!0,$("#sketch-FT").addClass("FTon")):(I.checked=!1,$("#sketch-FT").removeClass("FTon")),S==="displayed"?(C.checked=!0,$("#versioning-FT").addClass("FTon")):(C.checked=!1,$("#versioning-FT").removeClass("FTon")));$(".filterDropdown").click(function(){$(".filterDropdown").toggleClass("holdDrop"),$(".filterDrop").toggleClass("dropped")});$("#reloadButton").click(function(){console.log("reloading"),console.log("dataNSFW: ",u,"dataSketch:",m,"dataVersion:","dataVersion"),location.reload()});document.querySelectorAll('.FTbutton input[type="checkbox"]').forEach(function(o){o.addEventListener("change",B,!1)});

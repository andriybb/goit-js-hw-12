/* empty css                      */import{a as b,S as v,i as l}from"./assets/vendor-MgecxatS.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const L=void 0,S="https://pixabay.com/api/";function f(e,s){const i={key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15};return b.get(S,{params:i}).then(o=>o.data)}let n=null;function q(){const e=document.querySelector(".loader");e&&e.classList.remove("hidden")}function d(){const e=document.querySelector(".loader");e&&e.classList.add("hidden")}function C(){const e=document.querySelector(".btn-load");e&&e.classList.remove("hidden")}function w(){const e=document.querySelector(".btn-load");e&&e.classList.add("hidden")}function x(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function u(e){const s=document.querySelector(".gallery");if(!s){console.error("Element .gallery not found in HTML");return}const i=e.map(o=>{const{webformatURL:t,largeImageURL:r,tags:a,likes:g,views:p,comments:y,downloads:h}=o;return`
        <li class="gallery-item">
          <a class="gallery-link" href="${r}">
            <img 
              class="gallery-image" 
              src="${t}" 
              alt="${a}" 
              loading="lazy"
            />
          </a>
          <div class="image-box-statistic">
            <div class="image-box-statistic-item">
              <p class="info-label">Likes</p>
              <p class="info-value">${g}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Views</p>
              <p class="info-value">${p}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Comments</p>
              <p class="info-value">${y}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Downloads</p>
              <p class="info-value">${h}</p>
            </div>
          </div>
        </li>
      `}).join("");s.insertAdjacentHTML("beforeend",i),n?n.refresh():n=new v(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8})}const m=document.querySelector(".form"),E=document.querySelector(".btn-load");let c=1;m.addEventListener("submit",e=>{e.preventDefault();const s=m.elements["search-text"],i=s.value.trim();if(!i){l.warning({title:"Warning",message:"Please enter a search query!",position:"topRight",backgroundColor:"#ffa500",messageColor:"#fff",titleColor:"#fff"});return}x(),q(),w(),f(i,c).then(o=>{if(d(),o.hits.length===0){l.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff"});return}u(o.hits),l.success({title:"Success",message:`Found ${o.totalHits} images!`,position:"topRight",backgroundColor:"#59A10D",messageColor:"#fff",titleColor:"#fff",timeout:3e3}),C(),E.addEventListener("click",async function(){return c+=1,f(i,c),u(o.hits)})}).catch(o=>{d(),l.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff"}),console.error("Error:",o)}),s.value=""});
//# sourceMappingURL=index.js.map

import{a as S,S as q,i}from"./assets/vendor-CNqCr-V-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const E="53379433-198b2b18e5117643ffa461def",P="https://pixabay.com/api/";async function y(e,o){const a={key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};return(await S.get(P,{params:a})).data}let d=null;async function h(){const e=document.querySelector(".loader");e&&e.classList.remove("hidden")}async function f(){const e=document.querySelector(".loader");e&&e.classList.add("hidden")}async function u(){const e=document.querySelector(".btn-load");e&&e.classList.remove("hidden")}async function m(){const e=document.querySelector(".btn-load");e&&e.classList.add("hidden")}async function x(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}async function b(e){const o=document.querySelector(".gallery");if(!o){console.error("Element .gallery not found in HTML");return}const a=e.map(r=>{const{webformatURL:t,largeImageURL:s,tags:n,likes:v,views:L,comments:w,downloads:C}=r;return`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img 
              class="gallery-image" 
              src="${t}" 
              alt="${n}" 
              loading="lazy"
            />
          </a>
          <div class="image-box-statistic">
            <div class="image-box-statistic-item">
              <p class="info-label">Likes</p>
              <p class="info-value">${v}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Views</p>
              <p class="info-value">${L}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Comments</p>
              <p class="info-value">${w}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Downloads</p>
              <p class="info-value">${C}</p>
            </div>
          </div>
        </li>
      `}).join("");o.insertAdjacentHTML("beforeend",a),await new Promise(r=>setTimeout(r,0)),d?d.refresh():d=new q(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8})}const p=document.querySelector(".form"),R=document.querySelector(".btn-load");let l=1,g="",c=0;p.addEventListener("submit",async e=>{e.preventDefault();const o=p.elements["search-text"],a=o.value.trim();if(!a){i.warning({title:"Warning",message:"Please enter a search query!",position:"topRight",backgroundColor:"#ffa500",messageColor:"#fff",titleColor:"#fff"});return}l=1,g=a,x(),h(),m();try{const r=await y(g,l);if(f(),r.hits.length===0){i.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff"});return}c=r.totalHits,await b(r.hits),i.success({title:"Success",message:`Hooray! We found ${c} images!`,position:"topRight",backgroundColor:"#59A10D",messageColor:"#fff",titleColor:"#fff",timeout:3e3}),l*15<c&&u()}catch(r){f(),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff"}),console.error("Error:",r)}o.value=""});R.addEventListener("click",async()=>{l+=1,h(),m();try{const e=await y(g,l);f(),await b(e.hits),l*15>=c?(m(),i.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#4A90E2",messageColor:"#fff",titleColor:"#fff"})):u(),setTimeout(()=>{const o=document.querySelector(".gallery-item");if(o){const{height:a}=o.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}},200)}catch(e){f(),u(),i.error({title:"Error",message:"Failed to load more images. Please try again.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff"}),console.error("Error loading more:",e)}});
//# sourceMappingURL=index.js.map

const toggle=document.querySelector('.theme-toggle');
const saved=localStorage.getItem('portfolio-theme');
if(saved)document.documentElement.dataset.theme=saved;
function label(){const dark=document.documentElement.dataset.theme==='dark';toggle.textContent=dark?'☀ Light':'◐ Dark';toggle.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} theme`)}
label();
toggle.addEventListener('click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';localStorage.setItem('portfolio-theme',document.documentElement.dataset.theme);label()});

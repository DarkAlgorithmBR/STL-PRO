(function(){
function enhance(){
 const bonus=document.querySelector('#bonus');if(bonus&&!bonus.querySelector('.bonus-summary')){const p=document.createElement('p');p.className='bonus-summary';p.textContent='Todas as 20 coleções estão incluídas no plano Pro, sem pagamento adicional.';bonus.append(p)}
 document.querySelectorAll('#depoimentos img').forEach(img=>{if(img.dataset.zoom)return;img.dataset.zoom='1';img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar imagem de depoimento');const open=()=>{const dialog=document.createElement('dialog');dialog.className='cro-lightbox';const close=document.createElement('button');close.textContent='Fechar';const full=document.createElement('img');full.src=img.src;full.alt=img.alt;close.onclick=()=>dialog.close();dialog.append(close,full);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{dialog.remove();img.focus()});document.body.append(dialog);dialog.showModal();close.focus()};img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});
}
const observer=new MutationObserver(enhance);observer.observe(document.getElementById('root'),{childList:true,subtree:true});enhance();
})();

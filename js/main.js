(() => {
  const IVA = 0.07;
  const WSP_NUM = '50379553318';
  const SOPORTE_MAIL = 'ventas-online@tati-shop.com';
  const ADMIN_EMAIL = SOPORTE_MAIL;
  const ADMIN_PIN = '8642';

  const LS_USERS  = 'tati_users';
  const LS_ORDERS = 'tati_orders';
  const LS_SESS   = 'tati_session';
  const LS_CART   = 'tati_cart';

  const money = n => `$${Number(n || 0).toFixed(2)}`;
  const nowISO = () => new Date().toISOString();
  const safeId = () => `PED-${Date.now()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const normEmail = e => (e || '').trim().toLowerCase();

  const giftcards = [
    { id:'amazon', nombre:'Amazon', montos:[10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { id:'google', nombre:'Google Play', montos:[10,15,25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Google-Play.webp' },
    { id:'psn', nombre:'PlayStation', montos:[10,20,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
    { id:'xbox', nombre:'Xbox', montos:[15,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/e/e5/Xbox_Logo.svg' },
    { id:'steam', nombre:'Steam', montos:[5,10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/a/ae/Steam_logo.svg' },
    { id:'apple', nombre:'Apple', montos:[10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Apple_Logo.svg' },
    { id:'spotify', nombre:'Spotify', montos:[10,15,30], logo:'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
    { id:'netflix', nombre:'Netflix', montos:[15,30,50], logo:'https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg' },
    { id:'disney', nombre:'Disney+', montos:[25,50], logo:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" },
    { id:'uber', nombre:'Uber', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Uber.png' },
    { id:'airbnb', nombre:'Airbnb', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Airbnb.png' },
    { id:'starbucks', nombre:'Starbucks', montos:[10,20,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Starbucks.webp' },
    { id:'tiktok', nombre:'TikTok', montos:[10,20], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/TikTok.png' },
    { id:'epicgames', nombre:'Epic Games', montos:[30,60], logo:'https://static-assets-prod.epicgames.com/fgc-portal/static/_next/media/assets/Fortnite_Gift_Card_Art.png' },
    { id:'nike', nombre:'Nike', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Nike.png' },
    { id:'adidas', nombre:'Adidas', montos:[25,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/adidas.png' },
    { id:'sephora', nombre:'Sephora', montos:[25,50,75], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Sephora.png' },
    { id:'walmart', nombre:'Walmart', montos:[20,40,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Walmart.png' },
    { id:'target', nombre:'Target', montos:[20,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Target.webp' },
    { id:'bestbuy', nombre:'Best Buy', montos:[25,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Best-Buy.webp' },
    { id:'hbo', nombre:'HBO Max', montos:[30,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/HBO.png' },
    { id:'homeDepot', nombre:'Home Depot', montos:[50,100], logo:'https://images.thdstatic.com/giftcards/catalog/53L1QLAXWKVF06WJ8DLHBYT6S8/xxlarge/RH6VN7060A1LR3FWD0WJKNVBV8_0608202315:36:58.PNG' },
    { id:'lowes', nombre:"Lowe's", montos:[25,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Lowes.png' },
    { id:'rolex', nombre:'Rolex', montos:[250], logo:'https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1724322589/rolexcom/rolex-retailers/rolex-certified-pre-owned-watches/2024-updates/rcpo-rolex-certified-pre-owned-watches-elmt_2403ac_007' },
    { id:'discord', nombre:'Discord Nitro', montos:[10,15], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Discord.png' },
    { id:'facebook', nombre:'Facebook', montos:[25], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Facebook-Ads-by-Rewarble.png' },
    { id:'roblox', nombre:'Roblox', montos:[10,25], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Roblox.png' },
    { id:'visa', nombre:'Visa Prepaid', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/My-Prepaid-Center-VISA.png' },
    { id:'mastercard', nombre:'MasterCard Prepaid', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Mastercard-by-Rewarble.png' }
  ];

  const descripciones = {
    amazon:"Compra millones de productos en Amazon desde cualquier lugar.",
    psn:"Juega online y compra juegos en PlayStation Store.",
    google:"Apps, juegos, películas y más en Google Play.",
    xbox:"Suscripciones y juegos digitales para tu Xbox.",
    spotify:"Escucha música sin anuncios con Spotify Premium.",
    netflix:"Series y películas en streaming cuando quieras.",
    disney:"Disney, Pixar, Marvel y Star Wars en una sola app.",
    steam:"Tu biblioteca de videojuegos para PC en Steam."
  };

  const brandBg = {
    amazon:['#232F3E','#FF9900'], psn:['#003791','#0a5bd7'],
    google:['#4285F4','#34A853'], xbox:['#107C10','#0B6B0B'],
    spotify:['#1DB954','#0F0F0F'], netflix:['#E50914','#0B0B0B'],
    disney:['#113CCF','#3BA0FF'],  steam:['#151A21','#2A475E']
  };

  const LS = {
    get: (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } },
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
    del: (k) => localStorage.removeItem(k),
  };

  const getUsers  = () => LS.get(LS_USERS, []);
  const setUsers  = v  => LS.set(LS_USERS, v);
  const getOrders = () => LS.get(LS_ORDERS, []);
  const setOrders = v  => LS.set(LS_ORDERS, v);
  const getSess   = () => LS.get(LS_SESS, null);
  const setSess   = v  => LS.set(LS_SESS, v);
  const clearSess = () => LS.del(LS_SESS);
  const getCart   = () => LS.get(LS_CART, []);
  const setCart   = v  => LS.set(LS_CART, v);

  const $  = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const escapeHtml = (str='') =>
    str.replace(/[&<>"'`=\/]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'}[s]));

  let lastFocus = null;
  function openModal(id){
    const m = document.getElementById(id); if(!m) return;
    lastFocus = document.activeElement;
    m.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    (m.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')||m).focus();
  }
  function closeModal(id){
    const m = document.getElementById(id); if(!m) return;
    m.style.display = 'none';
    document.documentElement.style.overflow = '';
    lastFocus?.focus?.();
  }
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape'){ ['carrito-modal','contacto-modal','auth-modal','admin-modal'].forEach(closeModal); }
  });

  function agruparCarrito(items){
    const m = new Map();
    items.forEach(it=>{
      const k = `${it.id}|${it.precio}`;
      if(!m.has(k)) m.set(k,{...it,cantidad:0});
      m.get(k).cantidad += 1;
    });
    return [...m.values()];
  }

  function renderCart(){
    const cart = getCart();
    $('#cart-count').textContent = cart.length;

    const cartWrap = $('#cart-items');
    const totales = $('#totales');

    if(!cart.length){
      cartWrap.innerHTML = '<p>Tu carrito está vacío.</p>';
      totales.innerHTML = '';
      return;
    }

    const items = agruparCarrito(cart);
    let sub = 0;
    cartWrap.innerHTML = items.map(it=>{
      const l = it.precio * it.cantidad; sub += l;
      return `<p>${escapeHtml(it.nombre)} — ${it.cantidad} × ${money(it.precio)} = <strong>${money(l)}</strong></p>`;
    }).join('');

    const iva = sub * IVA;
    const total = sub + iva;
    totales.innerHTML = `
      <p><strong>Subtotal:</strong> ${money(sub)}</p>
      <p><strong>IVA (${(IVA*100).toFixed(0)}%):</strong> ${money(iva)}</p>
      <p><strong>Total a pagar:</strong> ${money(total)}</p>
    `;
  }

  function renderGiftCards(){
    const c = document.getElementById('giftcards-grid');
    c.innerHTML = '';
    giftcards.forEach(gc=>{
      const selectId = `select-${gc.id}`;
      const d = document.createElement('div');
      d.className = 'card';
      d.innerHTML = `
        <img src="${gc.logo}" alt="${escapeHtml(gc.nombre)}" onerror="this.onerror=null; this.src='img/cards/default.svg'">
        <h3>${escapeHtml(gc.nombre)}</h3>
        <p>Selecciona un monto:</p>
        <select id="${selectId}">
          ${gc.montos.map(m=>`<option value="${m}">${money(m)}</option>`).join('')}
        </select>
        <button class="buy-btn" onclick="agregarAlCarrito('${gc.id}','${escapeHtml(gc.nombre)}','${selectId}')">Agregar al carrito</button>
      `;
      c.appendChild(d);
    });
  }

  function agregarAlCarrito(id,nombre,selectId){
    const sel = document.getElementById(selectId);
    const monto = Number(sel?.value || 0);
    if(!monto || isNaN(monto)){ alert('Selecciona un monto válido'); return; }
    const cart = getCart(); cart.push({ id, nombre, precio:monto });
    setCart(cart); renderCart();

    const cc = document.getElementById('cart-count');
    cc.classList.remove('bump'); void cc.offsetWidth; cc.classList.add('bump');
    try { event?.target?.classList?.add('added'); setTimeout(()=>event?.target?.classList?.remove('added'), 650); } catch {}
  }

  function buildOrderSummary(){
    const items = agruparCarrito(getCart());
    let sub=0;
    const lines = items.map(it=>{
      const l=it.precio*it.cantidad; sub+=l;
      return `• ${it.nombre} — ${it.cantidad} × ${money(it.precio)} = ${money(l)}`;
    });
    const iva=sub*IVA,total=sub+iva;
    return {lines, sub, iva, total, items};
  }

  function crearPedido(meta){
    const { sub, iva, total, items } = buildOrderSummary();
    const sess = getSess();
    const order = {
      id: safeId(),
      userEmail: sess?.email || 'invitado',
      items, subtotal: sub, iva, total,
      estado:'PENDIENTE',
      metodo: meta.metodo,
      banco: meta.banco || null,
      nota: meta.nota || '',
      creadoEn: nowISO()
    };
    const orders = getOrders(); orders.unshift(order); setOrders(orders);
    return order;
  }

  function pagarWhatsAppFlow(nota){
    const o = crearPedido({metodo:'whatsapp', nota});
    const {lines, sub, iva, total} = buildOrderSummary();
    let msg = `*Pedido Tati Shop – Gift Cards*\nID: *${o.id}*\n\n*Artículos:*\n${lines.join('\n')}\n\n*Subtotal:* ${money(sub)}\n*IVA (7%):* ${money(iva)}\n*Total:* ${money(total)}`;
    if(nota) msg += `\n\n*Nota del comprador:* ${nota}`;
    msg += `\n\nSoporte: ${SOPORTE_MAIL}`;
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`,'_blank');
    setCart([]); renderCart();
  }

  function pagarTransferFlow(nota){
    const bancoSel = document.getElementById('transfer-bank');
    const banco = bancoSel ? bancoSel.value : 'Cuscatlán';
    crearPedido({metodo:'transfer', banco, nota});
    alert(`Pedido creado. Banco: ${banco}. Envía tu comprobante por WhatsApp para verificarlo.`);
    setCart([]); renderCart();
  }

  function procesarPago(){
    if(getCart().length===0){ alert('Tu carrito está vacío.'); return; }
    const metodo = [...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked)?.value || 'whatsapp';
    const nota = (document.getElementById('buyer-note')?.value || '').trim();
    if(metodo==='transfer') pagarTransferFlow(nota); else pagarWhatsAppFlow(nota);
  }

  function updateTransferVisibility(){
    const method = [...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked)?.value;
    const panel = document.getElementById('transfer-form');
    const radioTransfer = document.querySelector('input[name="paymethod"][value="transfer"]');
    const show = method === 'transfer';
    if(panel){ panel.hidden = !show; panel.style.display = show ? 'block' : 'none'; }
    if(radioTransfer) radioTransfer.setAttribute('aria-expanded', show ? 'true' : 'false');
  }
  document.addEventListener('change',e=>{
    if(e.target.name==='paymethod') updateTransferVisibility();
  });
  document.addEventListener('change',e=>{
    if(e.target.id==='transfer-bank'){
      const bank = e.target.value, list = document.getElementById('bank-data'); if(!list) return;
      list.innerHTML = bank==='Cuscatlán'
        ? `<li><strong>Beneficiario:</strong> Margarita Castro</li>
           <li><strong>Banco:</strong> Banco Cuscatlán</li>
           <li><strong>Cuenta:</strong> 401495002273779 (Ahorros)</li>`
        : `<li><strong>Beneficiario:</strong> Elsa Castro</li>
           <li><strong>Banco:</strong> Banco Agrícola</li>
           <li><strong>Cuenta:</strong> 3710993183 (Ahorros)</li>`;
    }
  });

  function abrirContacto(){ openModal('contacto-modal'); }
  function cerrarContacto(){ closeModal('contacto-modal'); }
  function enviarWhatsAppContacto(){
    const t = (document.getElementById('contact-msg')?.value || '').trim() || 'Hola, necesito ayuda.';
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(t)}`,'_blank');
  }

  async function hash(t){
    try{
      const enc = new TextEncoder().encode(t);
      const buf = await crypto.subtle.digest('SHA-256', enc);
      return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
    }catch{
      let h=0; for(let i=0;i<t.length;i++){ h=(h<<5)-h+t.charCodeAt(i); h|=0; } return String(h);
    }
  }
  function abrirAuth(){ openModal('auth-modal'); }
  function cerrarAuth(){ closeModal('auth-modal'); }
  function mostrarLogin(){
    $('#tab-login').classList.add('active'); $('#tab-register').classList.remove('active');
    $('#login-form').style.display='grid'; $('#register-form').style.display='none';
    $('#tab-login').setAttribute('aria-selected','true'); $('#tab-register').setAttribute('aria-selected','false');
  }
  function mostrarRegistro(){
    $('#tab-register').classList.add('active'); $('#tab-login').classList.remove('active');
    $('#register-form').style.display='grid'; $('#login-form').style.display='none';
    $('#tab-register').setAttribute('aria-selected','true'); $('#tab-login').setAttribute('aria-selected','false');
  }
  async function registrar(){
    const name = ($('#reg-name')?.value || '').trim();
    const email = normEmail($('#reg-email')?.value);
    const pass = $('#reg-pass')?.value || '';
    if(!name || !email || !pass){ alert('Completa todos los campos'); return; }
    const users = getUsers();
    if(users.some(u=>u.email===email)){ alert('Ese email ya está registrado'); return; }
    const passh = await hash(pass);
    users.push({ name, email, passh, createdAt: nowISO() });
    setUsers(users);
    setSess({ email, name, isAdmin: email===ADMIN_EMAIL });
    actualizarUIAuth(); cerrarAuth(); alert('Cuenta creada.');
  }
  async function login(){
    const email = normEmail($('#login-email')?.value);
    const pass = $('#login-pass')?.value || '';
    if(!email || !pass){ alert('Completa email y contraseña'); return; }
    const users = getUsers(); const u = users.find(u=>u.email===email);
    if(!u){ alert('No existe ese usuario'); return; }
    const passh = await hash(pass);
    if(passh!==u.passh){ alert('Contraseña incorrecta'); return; }
    setSess({ email: u.email, name: u.name, isAdmin: email===ADMIN_EMAIL });
    actualizarUIAuth(); cerrarAuth(); alert('Sesión iniciada.');
  }
  function logout(){ clearSess(); actualizarUIAuth(); alert('Sesión cerrada.'); }
  function adminAccesoRapido(){
    const pin = prompt('PIN admin:');
    if(pin===ADMIN_PIN){ setSess({ email: ADMIN_EMAIL, name:'Administrador', isAdmin:true }); actualizarUIAuth(); cerrarAuth(); abrirAdmin(); }
    else alert('PIN incorrecto');
  }
  function actualizarUIAuth(){
    const sess = getSess();
    const btn = $('#auth-btn'); const adminBtn = $('#admin-open');
    if(sess){
      btn.textContent = `👤 ${sess.name || sess.email}`;
      btn.onclick = () => { if(confirm('¿Cerrar sesión?')) logout(); };
      adminBtn.style.display = sess.isAdmin ? 'inline-block' : 'none';
      const span = $('#admin-session-email'); if(span) span.textContent = sess.email;
    }else{
      btn.textContent = '👤 Acceder'; btn.onclick = abrirAuth; adminBtn.style.display = 'none';
      const span = $('#admin-session-email'); if(span) span.textContent = '-';
    }
  }

  function abrirAdmin(){
    const s = getSess(); if(!(s?.isAdmin)){ abrirAuth(); return; }
    openModal('admin-modal'); renderPedidos(); renderUsuarios();
  }
  function cerrarAdmin(){ closeModal('admin-modal'); }

  function renderPedidos(){
    const list = $('#orders-list');
    const filter = $('#orders-filter')?.value || 'ALL';
    const orders = getOrders();
    const rows = (filter==='ALL'?orders:orders.filter(o=>o.estado===filter));
    list.innerHTML = rows.length ? '' : '<p class="small">No hay pedidos.</p>';
    rows.forEach(o=>{
      const d = document.createElement('div');
      d.className = 'order';
      const fecha = new Date(o.creadoEn).toLocaleString();
      d.innerHTML = `
        <div class="row"><strong>${o.id}</strong><span class="small">${fecha}</span></div>
        <div class="small">Cliente: ${escapeHtml(o.userEmail)}</div>
        <div class="small">Método: ${o.metodo}${o.banco?` (${escapeHtml(o.banco)})`:''}</div>
        <div class="small">Total: ${money(o.total)}</div>
        ${o.nota?`<div class="small"><em>Nota:</em> ${escapeHtml(o.nota)}</div>`:''}
        <div class="row">
          <label>Estado:</label>
          <select onchange="cambiarEstado('${o.id}', this.value)">
            ${['PENDIENTE','PAGADO','ENTREGADO','CANCELADO'].map(s=>`<option value="${s}" ${o.estado===s?'selected':''}>${s}</option>`).join('')}
          </select>
          <button class="secundario-btn" onclick="enviarWhatsDePedido('${o.id}')">Enviar por WhatsApp</button>
        </div>
      `;
      list.appendChild(d);
    });
  }
  function cambiarEstado(id,estado){
    const orders = getOrders();
    const i = orders.findIndex(o=>o.id===id);
    if(i>-1){ orders[i].estado=estado; setOrders(orders); renderPedidos(); }
  }
  function enviarWhatsDePedido(id){
    const o = getOrders().find(x=>x.id===id); if(!o) return;
    const lines = o.items.map(it=>`• ${it.nombre} — ${it.cantidad} × ${money(it.precio)} = ${money(it.precio*it.cantidad)}`);
    const msg = `*Pedido Tati Shop – ${id}*\nCliente: ${o.userEmail}\n\n*Artículos:*\n${lines.join('\n')}\n\n*Subtotal:* ${money(o.subtotal)}\n*IVA:* ${money(o.iva)}\n*Total:* ${money(o.total)}\n*Estado:* ${o.estado}\n*Método:* ${o.metodo}${o.banco?` (${o.banco})`:''}`;
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`,'_blank');
  }
  function renderUsuarios(){
    const list = $('#users-list'); const users = getUsers();
    list.innerHTML = users.length ? '' : '<p class="small">Sin usuarios registrados.</p>';
    users.forEach(u=>{
      const d = document.createElement('div'); d.className='order';
      const fecha = new Date(u.createdAt).toLocaleString();
      d.innerHTML = `
        <div class="row"><strong>${escapeHtml(u.name || '(sin nombre)')}</strong><span class="small">${escapeHtml(u.email)}</span></div>
        <div class="small">Registrado: ${fecha}</div>
      `;
      list.appendChild(d);
    });
  }

  const slideshowIds = ['amazon','psn','google','xbox','spotify','netflix','disney','steam'];
  let slideIndex=0, slideTimer=null;

  function setSlideBackground(id){
    const [c1,c2] = brandBg[id] || ['#7c5cff','#2ee6a6'];
    const bg = document.getElementById('slide-bg');
    bg.classList.remove('show');
    bg.style.setProperty('--c1',c1);
    bg.style.setProperty('--c2',c2);
    void bg.offsetWidth;
    bg.classList.add('show');
  }
  function pintarSlide(index){
    const id = slideshowIds[index];
    const it = giftcards.find(g=>g.id===id);
    const card = document.getElementById('slide-card');
    const desc = descripciones[id] || '';
    if(!it || !card) return;
    setSlideBackground(id);
    card.classList.remove('active');
    card.innerHTML = `
      <img src="${it.logo}" alt="${escapeHtml(it.nombre)}" onerror="this.onerror=null; this.src='img/cards/default.svg'">
      <h3>${escapeHtml(it.nombre)}</h3>
      <p>${escapeHtml(desc)}</p>
    `;
    void card.offsetWidth;
    card.classList.add('active');
    document.querySelectorAll('#slide-dots button').forEach((b,i)=>b.classList.toggle('active',i===index));
  }
  function slideNext(){ slideIndex=(slideIndex+1)%slideshowIds.length; pintarSlide(slideIndex); }
  function slidePrev(){ slideIndex=(slideIndex-1+slideshowIds.length)%slideshowIds.length; pintarSlide(slideIndex); }
  function iniciarAutoSlide(){ detenerAutoSlide(); slideTimer=setInterval(slideNext,3000); }
  function detenerAutoSlide(){ if(slideTimer) clearInterval(slideTimer); slideTimer=null; }
  function initSlideshow(){
    const dots = document.getElementById('slide-dots'); dots.innerHTML='';
    slideshowIds.forEach((_,i)=>{
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Ir a la diapositiva ${i+1}`);
      b.addEventListener('click',()=>{ slideIndex=i; pintarSlide(slideIndex); iniciarAutoSlide(); });
      dots.appendChild(b);
    });
    document.getElementById('slide-next').addEventListener('click',()=>{ slideNext(); iniciarAutoSlide(); });
    document.getElementById('slide-prev').addEventListener('click',()=>{ slidePrev(); iniciarAutoSlide(); });
    const ss = document.getElementById('slideshow');
    ss.addEventListener('mouseenter',detenerAutoSlide);
    ss.addEventListener('mouseleave',iniciarAutoSlide);
    pintarSlide(slideIndex); iniciarAutoSlide();
  }

  window.agregarAlCarrito = agregarAlCarrito;
  window.vaciarCarrito = () => { setCart([]); renderCart(); };
  window.abrirCarrito  = () => { renderCart(); openModal('carrito-modal'); };
  window.cerrarCarrito = () => closeModal('carrito-modal');
  window.procesarPago  = procesarPago;

  window.abrirContacto = abrirContacto;
  window.cerrarContacto = cerrarContacto;
  window.enviarWhatsAppContacto = enviarWhatsAppContacto;

  window.abrirAuth = abrirAuth;
  window.cerrarAuth = cerrarAuth;
  window.mostrarLogin = mostrarLogin;
  window.mostrarRegistro = mostrarRegistro;
  window.registrar = registrar;
  window.login = login;
  window.logout = logout;
  window.adminAccesoRapido = adminAccesoRapido;
  window.actualizarUIAuth = actualizarUIAuth;

  window.abrirAdmin = abrirAdmin;
  window.cerrarAdmin = cerrarAdmin;
  window.renderPedidos = renderPedidos;
  window.cambiarEstado = cambiarEstado;
  window.enviarWhatsDePedido = enviarWhatsDePedido;
  window.renderUsuarios = renderUsuarios;

  document.addEventListener('DOMContentLoaded', ()=>{
    actualizarUIAuth();
    initSlideshow();
    renderGiftCards();
    renderCart();

    const bankSelect = document.getElementById('transfer-bank');
    if(bankSelect){ bankSelect.value='Cuscatlán'; bankSelect.dispatchEvent(new Event('change')); }
    updateTransferVisibility();
  });
})();

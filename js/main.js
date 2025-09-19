(() => {
  const IVA = 0.07;
  const WSP_NUM = '50379553318';
  const SOPORTE_MAIL = 'ventas-online@tati-shop.com';
  const ADMIN_EMAIL = SOPORTE_MAIL;
  const ADMIN_PIN = '8642';

  const LS_USERS   = 'tati_users';
  const LS_ORDERS  = 'tati_orders';
  const LS_SESS    = 'tati_session';
  const LS_CART    = 'tati_cart';
  const LS_CODES   = 'tati_codes';
  const LS_AUDIT   = 'tati_audit';

  const money   = n => `$${Number(n || 0).toFixed(2)}`;
  const nowISO  = () => new Date().toISOString();
  const safeId  = p => `${p||'PED'}-${Date.now()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const normEmail = e => (e || '').trim().toLowerCase();
  const idLike = () => Math.random().toString(36).slice(2,10);

  const $  = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const on = (el,ev,fn) => el && el.addEventListener(ev,fn);
  const html = s => s;

  const escapeHtml = (str='') => str.replace(/[&<>"'`=\/]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F','`':'&#x60','=':'&#x3D;'}[s]));

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
  const getCodes  = () => LS.get(LS_CODES, []);
  const setCodes  = v  => LS.set(LS_CODES, v);
  const pushAudit = (evt, meta={}) => {
    const a = LS.get(LS_AUDIT, []);
    a.unshift({ id: safeId('AUD'), evt, meta, at: nowISO(), by: getSess()?.email || 'anon' });
    LS.set(LS_AUDIT, a);
  };

  const giftcards = [
    { id:'amazon', nombre:'Amazon', montos:[10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { id:'google', nombre:'Google Play', montos:[10,15,25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Google-Play.webp' },
    { id:'psn', nombre:'PlayStation', montos:[10,20,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
    { id:'xbox', nombre:'Xbox', montos:[15,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/e/e5/Xbox_Logo.svg' },
    { id:'steam', nombre:'Steam', montos:[5,10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/a/ae/Steam_logo.svg' },
    { id:'apple', nombre:'Apple', montos:[10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Apple_Logo.svg' },
    { id:'spotify', nombre:'Spotify', montos:[10,15,30], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Spotify_logo_with_text.svg' },
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

  let lastFocus = null;
  function openModal(id){ const m = document.getElementById(id); if(!m) return; lastFocus=document.activeElement; m.classList.add('open'); (m.querySelector('.close')||m).focus(); }
  function closeModal(id){ const m = document.getElementById(id); if(!m) return; m.classList.remove('open'); lastFocus?.focus?.(); }
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ ['carrito-modal','contacto-modal','auth-modal','admin-modal','orders-modal'].forEach(closeModal); } });

  function agruparCarrito(items){ const m=new Map(); items.forEach(it=>{ const k=`${it.id}|${it.precio}`; if(!m.has(k)) m.set(k,{...it,cantidad:0}); m.get(k).cantidad+=1; }); return [...m.values()]; }

  function renderCart(){
    const cart = getCart();
    const cc = $('#cart-count'); if(cc) cc.textContent = cart.length;
    const cartWrap = $('#cart-items'); const totales = $('#totales');
    if(!cartWrap || !totales) return;

    if(!cart.length){ cartWrap.innerHTML = '<p>Tu carrito está vacío.</p>'; totales.innerHTML=''; return; }

    const items = agruparCarrito(cart);
    let sub=0; cartWrap.innerHTML = items.map(it=>{ const l=it.precio*it.cantidad; sub+=l; return `<p>${escapeHtml(it.nombre)} — ${it.cantidad} × ${money(it.precio)} = <strong>${money(l)}</strong></p>`; }).join('');
    const iva=sub*IVA,total=sub+iva;
    totales.innerHTML = html`
      <p><strong>Subtotal:</strong> ${money(sub)}</p>
      <p><strong>IVA (${(IVA*100).toFixed(0)}%):</strong> ${money(iva)}</p>
      <p><strong>Total a pagar:</strong> ${money(total)}</p>`;
  }

  function renderGiftCards(){
    const c = document.getElementById('giftcards-grid'); if(!c) return;
    c.innerHTML='';
    giftcards.forEach(gc=>{
      const selectId = `select-${gc.id}`;
      const d = document.createElement('div'); d.className='card';
      d.innerHTML = html`
        <img src="${gc.logo}" alt="${escapeHtml(gc.nombre)}" onerror="this.onerror=null; this.src='img/cards/default.svg'">
        <h3>${escapeHtml(gc.nombre)}</h3>
        <p>Selecciona un monto:</p>
        <select id="${selectId}">${gc.montos.map(m=>`<option value="${m}">${money(m)}</option>`).join('')}</select>
        <button class="buy-btn" data-gc="${gc.id}" data-sel="${selectId}">Agregar al carrito</button>`;
      c.appendChild(d);
    });
  }

  function agregarAlCarrito(id,nombre,selectId){
    const sel = document.getElementById(selectId); const monto = Number(sel?.value||0);
    if(!monto){ alert('Selecciona un monto válido'); return; }
    const cart = getCart(); cart.push({ id, nombre, precio:monto }); setCart(cart); renderCart();
    const cc = document.getElementById('cart-count'); cc?.classList.remove('bump'); void cc?.offsetWidth; cc?.classList.add('bump');
  }

  function buildOrderSummary(){
    const items = agruparCarrito(getCart()); let sub=0;
    const lines = items.map(it=>{ const l=it.precio*it.cantidad; sub+=l; return `• ${it.nombre} — ${it.cantidad} × ${money(it.precio)} = ${money(l)}`; });
    const iva=sub*IVA,total=sub+iva; return {lines, sub, iva, total, items};
  }

  function importCodesFromCSVText(text){
    const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
    const header = lines.shift()?.toLowerCase();
    if(!header || !(header.includes('sku') && header.includes('code'))) throw new Error('CSV debe tener encabezados sku,code');
    const get = name => header.split(',').map(h=>h.trim()).indexOf(name);
    const idxSku = get('sku'); const idxCode = get('code');
    const curr = getCodes();
    let ok=0, dup=0;
    for(const line of lines){
      const cols = line.split(','); const sku = cols[idxSku]?.trim(); const code = cols[idxCode]?.trim();
      if(!sku || !code) continue;
      if(curr.some(c=>c.code===code && c.sku===sku)){ dup++; continue; }
      curr.push({ id: safeId('COD'), sku, code, status:'available' }); ok++;
    }
    setCodes(curr); pushAudit('codes.import',{ok,dup});
    return {ok,dup,count:curr.length};
  }

  function statsCodes(){
    const all = getCodes();
    const bySku = {};
    for(const c of all){
      if(!bySku[c.sku]) bySku[c.sku] = { available:0, assigned:0, invalidated:0 };
      bySku[c.sku][c.status] = (bySku[c.sku][c.status]||0)+1;
    }
    return { total: all.length, bySku };
  }

  function assignCodeAuto(sku, orderId, itemKey, amount){
    const pool = getCodes();
    let assigned = [];
    for(let i=0;i<amount;i++){
      const c = pool.find(x=>x.sku===sku && x.status==='available');
      if(!c) break;
      c.status='assigned'; c.assignedTo={orderId,itemKey,unit:i};
      assigned.push(c);
    }
    setCodes(pool);
    if(assigned.length) pushAudit('codes.assigned.auto',{orderId,sku,count:assigned.length});
    return assigned;
  }

  function assignCodeManual(orderId, itemKey, rawCode, sku){
    const pool = getCodes();
    let c = pool.find(x=>x.code===rawCode && x.sku===(sku||x.sku));
    if(!c){ c = { id:safeId('COD'), sku: sku||'manual', code: rawCode, status:'assigned' }; pool.push(c); }
    c.status='assigned'; c.assignedTo={orderId,itemKey,unit:0, manual:true};
    setCodes(pool); pushAudit('codes.assigned.manual',{orderId,itemKey,code:rawCode});
    return c;
  }

  function revealCode(orderId, itemKey){
    const all = getCodes();
    const found = all.filter(c=>c.assignedTo && c.assignedTo.orderId===orderId && c.assignedTo.itemKey===itemKey);
    if(!found.length) throw new Error('Código no asignado aún');
    found.forEach(c=>{ c.revealedAt = nowISO(); });
    setCodes(all); pushAudit('codes.revealed',{orderId,itemKey,count:found.length});
    return found.map(f=>f.code).join('  ');
  }

  function crearPedido(meta){
    const { sub, iva, total, items } = buildOrderSummary();
    const sess = getSess();
    const orderItems = items.map((it,idx)=>({
      key: `${it.id}|${it.precio}`,
      sku: it.id,
      nombre: it.nombre,
      precio: it.precio,
      cantidad: it.cantidad,
      fulfill:'UNFULFILLED'
    }));

    const order = {
      id: safeId('PED'),
      userEmail: sess?.email || 'invitado',
      items: orderItems,
      subtotal: sub, iva, total,
      estado:'PENDIENTE',
      metodo: meta.metodo,
      banco: meta.banco || null,
      nota: meta.nota || '',
      creadoEn: nowISO()
    };
    const orders = getOrders(); orders.unshift(order); setOrders(orders);
    pushAudit('order.created',{orderId:order.id, metodo: order.metodo});
    return order;
  }

  function onOrderPaid(orderId){
    const orders = getOrders();
    const o = orders.find(x=>x.id===orderId); if(!o) return;
    o.items.forEach(it=>{
      const taken = assignCodeAuto(it.sku, o.id, it.key, it.cantidad);
      if(taken.length===it.cantidad){ it.fulfill='FULFILLED'; }
      else if(taken.length>0){ it.fulfill='PARTIAL'; }
      else { it.fulfill='UNFULFILLED'; }
    });
    setOrders(orders);
  }

  function marcarEntregadoSiListo(orderId){
    const orders = getOrders();
    const o = orders.find(x=>x.id===orderId); if(!o) return;
    if(o.items.every(i=>i.fulfill==='FULFILLED')){
      o.estado='ENTREGADO'; setOrders(orders); pushAudit('order.delivered',{orderId});
    }
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

  async function hash(t){
    try{ const enc=new TextEncoder().encode(t); const buf=await crypto.subtle.digest('SHA-256',enc); return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join(''); }
    catch{ let h=0; for(let i=0;i<t.length;i++){ h=(h<<5)-h+t.charCodeAt(i); h|=0; } return String(h); }
  }
  function abrirAuth(){ openModal('auth-modal'); }
  function cerrarAuth(){ closeModal('auth-modal'); }
  function mostrarLogin(){
    $('#tab-login')?.classList.add('active'); $('#tab-register')?.classList.remove('active');
    $('#login-form')?.style && ($('#login-form').style.display='grid');
    $('#register-form')?.style && ($('#register-form').style.display='none');
    $('#tab-login')?.setAttribute('aria-selected','true'); $('#tab-register')?.setAttribute('aria-selected','false');
  }
  function mostrarRegistro(){
    $('#tab-register')?.classList.add('active'); $('#tab-login')?.classList.remove('active');
    $('#register-form')?.style && ($('#register-form').style.display='grid');
    $('#login-form')?.style && ($('#login-form').style.display='none');
    $('#tab-register')?.setAttribute('aria-selected','true'); $('#tab-login')?.setAttribute('aria-selected','false');
  }
  async function registrar(){
    const name = ($('#reg-name')?.value || '').trim();
    const email = normEmail($('#reg-email')?.value);
    const pass = $('#reg-pass')?.value || '';
    if(!name || !email || !pass){ alert('Completa todos los campos'); return; }
    const users = getUsers(); if(users.some(u=>u.email===email)){ alert('Ese email ya está registrado'); return; }
    const passh = await hash(pass);
    users.push({ name, email, passh, createdAt: nowISO() }); setUsers(users);
    setSess({ email, name, isAdmin: email===ADMIN_EMAIL }); actualizarUIAuth(); cerrarAuth(); alert('Cuenta creada.');
  }
  async function login(){
    const email = normEmail($('#login-email')?.value);
    const pass = $('#login-pass')?.value || '';
    if(!email || !pass){ alert('Completa email y contraseña'); return; }
    const users = getUsers(); const u = users.find(u=>u.email===email);
    if(!u){ alert('No existe ese usuario'); return; }
    const passh = await hash(pass); if(passh!==u.passh){ alert('Contraseña incorrecta'); return; }
    setSess({ email: u.email, name: u.name, isAdmin: email===ADMIN_EMAIL }); actualizarUIAuth(); cerrarAuth(); alert('Sesión iniciada.');
  }
  function logout(){ clearSess(); actualizarUIAuth(); alert('Sesión cerrada.'); }
  function adminAccesoRapido(){ const pin = prompt('PIN admin:'); if(pin===ADMIN_PIN){ setSess({ email: ADMIN_EMAIL, name:'Administrador', isAdmin:true }); actualizarUIAuth(); cerrarAuth(); abrirAdmin(); } else alert('PIN incorrecto'); }
  function actualizarUIAuth(){
    const sess = getSess(); const btn = $('#auth-btn'); const adminBtn = $('#admin-open');
    if(sess){
      if(btn){ btn.textContent = `👤 ${sess.name || sess.email}`; btn.onclick = () => { if(confirm('¿Cerrar sesión?')) logout(); }; }
      if(adminBtn) adminBtn.style.display = sess.isAdmin ? 'inline-block' : 'none';
      const span = $('#admin-session-email'); if(span) span.textContent = sess.email;
    }else{
      if(btn){ btn.textContent = '👤 Acceder'; btn.onclick = abrirAuth; }
      if(adminBtn) adminBtn.style.display = 'none';
      const span = $('#admin-session-email'); if(span) span.textContent = '-';
    }
  }

  function abrirAdmin(){ const s=getSess(); if(!(s?.isAdmin)){ abrirAuth(); return; } openModal('admin-modal'); renderPedidos(); renderUsuarios(); renderCodesStats(); }
  function cerrarAdmin(){ closeModal('admin-modal'); }

  function renderPedidos(){
    const list = $('#orders-list'); if(!list) return;
    const filter = $('#orders-filter')?.value || 'ALL';
    const orders = getOrders();
    const rows = (filter==='ALL'?orders:orders.filter(o=>o.estado===filter));
    list.innerHTML = rows.length ? '' : '<p class="small">No hay pedidos.</p>';
    rows.forEach(o=>{
      const d = document.createElement('div'); d.className='order';
      const fecha = new Date(o.creadoEn).toLocaleString();
      d.innerHTML = html`
        <div class="row"><strong>${o.id}</strong><span class="small">${fecha}</span></div>
        <div class="small">Cliente: ${escapeHtml(o.userEmail)}</div>
        <div class="small">Método: ${o.metodo}${o.banco?` (${escapeHtml(o.banco)})`:''}</div>
        <div class="small">Total: ${money(o.total)}</div>
        ${o.nota?`<div class="small"><em>Nota:</em> ${escapeHtml(o.nota)}</div>`:''}
        <div class="small">Items: ${o.items.map(it=>`${escapeHtml(it.nombre)} x${it.cantidad} [${it.fulfill}]`).join(', ')}</div>
        <div class="row">
          <label>Estado:</label>
          <select data-order="${o.id}">
            ${['PENDIENTE','PAGADO','ENTREGADO','CANCELADO'].map(s=>`<option value="${s}" ${o.estado===s?'selected':''}>${s}</option>`).join('')}
          </select>
          <button class="secundario-btn" data-wsp="${o.id}">Enviar por WhatsApp</button>
        </div>`;
      list.appendChild(d);
    });
  }

  function cambiarEstado(id,estado){
    const orders = getOrders(); const i = orders.findIndex(o=>o.id===id); if(i===-1) return;
    orders[i].estado = estado; setOrders(orders);
    if(estado==='PAGADO') onOrderPaid(id);
    if(estado==='ENTREGADO') marcarEntregadoSiListo(id);
    renderPedidos();
  }

  function enviarWhatsDePedido(id){
    const o = getOrders().find(x=>x.id===id); if(!o) return;
    const lines = o.items.map(it=>`• ${it.nombre} — ${it.cantidad} × ${money(it.precio)} = ${money(it.precio*it.cantidad)}`);
    const msg = `*Pedido Tati Shop – ${id}*\nCliente: ${o.userEmail}\n\n*Artículos:*\n${lines.join('\n')}\n\n*Subtotal:* ${money(o.subtotal)}\n*IVA:* ${money(o.iva)}\n*Total:* ${money(o.total)}\n*Estado:* ${o.estado}\n*Método:* ${o.metodo}${o.banco?` (${o.banco})`:''}`;
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`,'_blank');
  }

  function renderUsuarios(){
    const list = $('#users-list'); if(!list) return; const users = getUsers();
    list.innerHTML = users.length ? '' : '<p class="small">Sin usuarios registrados.</p>';
    users.forEach(u=>{ const d=document.createElement('div'); d.className='order'; const fecha=new Date(u.createdAt).toLocaleString(); d.innerHTML = html`<div class="row"><strong>${escapeHtml(u.name||'(sin nombre)')}</strong><span class="small">${escapeHtml(u.email)}</span></div><div class="small">Registrado: ${fecha}</div>`; list.appendChild(d); });
  }

  function renderCodesStats(){
    const box = $('#codes-stats'); if(!box) return;
    const { total, bySku } = statsCodes();
    box.innerHTML = '';
    const totalCard = document.createElement('div'); totalCard.className='card'; totalCard.innerHTML = `<strong>Total códigos:</strong> ${total}`; box.appendChild(totalCard);
    Object.entries(bySku).forEach(([sku,stat])=>{
      const c = document.createElement('div'); c.className='card';
      c.innerHTML = `<strong>${escapeHtml(sku)}</strong><br>Disponibles: ${stat.available||0} · Asignados: ${stat.assigned||0} · Invalidados: ${stat.invalidated||0}`;
      box.appendChild(c);
    });
  }

  function handleCodesImport(file){
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{ const {ok,dup,count} = importCodesFromCSVText(String(reader.result)); alert(`Importados: ${ok}\nDuplicados: ${dup}\nTotal en pool: ${count}`); renderCodesStats(); }
      catch(err){ alert('Error al importar CSV: '+err.message); }
    };
    reader.readAsText(file);
  }

  function handleAssignManual(){
    const orderId = $('#manual-order')?.value?.trim();
    const itemKey  = $('#manual-item')?.value?.trim();
    const rawCode  = $('#manual-code')?.value?.trim();
    if(!orderId || !itemKey || !rawCode){ alert('Completa Pedido, Item y Código'); return; }
    const orders = getOrders(); const o = orders.find(x=>x.id===orderId);
    if(!o){ alert('Pedido no encontrado'); return; }
    const it = o.items.find(i=>i.key===itemKey);
    if(!it){ alert('Item no encontrado'); return; }
    assignCodeManual(orderId, itemKey, rawCode, it.sku);
    it.fulfill='FULFILLED'; setOrders(orders); renderPedidos(); renderCodesStats(); alert('Código asignado.');
  }

  function cargarMisPedidos(){
    const sess = getSess(); if(!sess){ abrirAuth(); return; }
    const wrap = $('#my-orders'); if(!wrap){ alert('No hay contenedor de pedidos.'); return; }
    const tplRow = $('#order-row-tpl'); const tplItem = $('#order-item-tpl');
    const orders = getOrders().filter(o=>o.userEmail===sess.email);
    wrap.innerHTML = orders.length? '' : '<p class="small">Aún no tienes pedidos.</p>';

    orders.forEach(o=>{
      const row = tplRow.content.cloneNode(true);
      row.querySelector('[data-fn="order-number"]').textContent = o.id;
      row.querySelector('[data-fn="order-date"]').textContent   = new Date(o.creadoEn).toLocaleString();
      const st = row.querySelector('[data-fn="order-status"]'); st.textContent = o.estado; st.classList.add('badge', 'status-'+o.estado);
      const itemsBox = row.querySelector('[data-fn="order-items"]');

      o.items.forEach(it=>{
        const n = tplItem.content.cloneNode(true);
        n.querySelector('[data-fn="item-name"]').textContent = `${it.nombre} x${it.cantidad}`;
        n.querySelector('[data-fn="item-sku"]').textContent = it.sku;
        const ff = n.querySelector('[data-fn="item-ff-status"]'); ff.textContent = it.fulfill;
        const codeBox = n.querySelector('[data-fn="code-mask"]');
        const btnReveal = n.querySelector('[data-fn="btn-reveal"]');
        const btnCopy   = n.querySelector('[data-fn="btn-copy"]');

        const canReveal = (o.estado==='PAGADO' || o.estado==='ENTREGADO') && (it.fulfill==='FULFILLED' || it.fulfill==='PARTIAL');
        if(canReveal){ btnReveal.hidden=false; btnReveal.addEventListener('click',()=>{
          try{ const code = revealCode(o.id, it.key); codeBox.classList.remove('masked'); codeBox.classList.add('revealed'); codeBox.textContent = code; btnCopy.hidden=false; }
          catch(err){ alert(err.message); }
        }); }
        else { codeBox.classList.add('masked'); }

        btnCopy?.addEventListener('click',()=>{ navigator.clipboard.writeText(codeBox.textContent||''); btnCopy.textContent='Copiado'; setTimeout(()=>btnCopy.textContent='Copiar',900); });
        itemsBox.appendChild(n);
      });

      wrap.appendChild(row);
    });
  }

  function abrirContacto(){ openModal('contacto-modal'); }
  function cerrarContacto(){ closeModal('contacto-modal'); }
  function enviarWhatsAppContacto(){ const t = ($('#contact-msg')?.value || '').trim() || 'Hola, necesito ayuda.'; window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(t)}`,'_blank'); }

  function updateTransferVisibility(){ const method=[...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked)?.value; const panel=$('#transfer-form'); const radioTransfer=$('input[name="paymethod"][value="transfer"]'); const show=method==='transfer'; if(panel){ panel.hidden=!show; panel.style.display=show?'block':'none'; } if(radioTransfer) radioTransfer.setAttribute('aria-expanded', show?'true':'false'); }

  const slideshowIds = ['amazon','psn','google','xbox','spotify','netflix','disney','steam'];
  let slideIndex=0, slideTimer=null;
  function setSlideBackground(id){ const [c1,c2]=brandBg[id]||['#7c5cff','#2ee6a6']; const bg=$('#slide-bg'); if(!bg) return; bg.classList.remove('show'); bg.style.setProperty('--c1',c1); bg.style.setProperty('--c2',c2); void bg.offsetWidth; bg.classList.add('show'); }
  function pintarSlide(index){ const id=slideshowIds[index]; const it=giftcards.find(g=>g.id===id); const card=$('#slide-card'); const desc=descripciones[id]||''; if(!it||!card) return; setSlideBackground(id); card.classList.remove('active'); card.innerHTML = html`<img src="${it.logo}" alt="${escapeHtml(it.nombre)}" onerror="this.onerror=null; this.src='img/cards/default.svg'"><h3>${escapeHtml(it.nombre)}</h3><p>${escapeHtml(desc)}</p>`; void card.offsetWidth; card.classList.add('active'); $$('#slide-dots button').forEach((b,i)=>b.classList.toggle('active',i===index)); }
  function slideNext(){ slideIndex=(slideIndex+1)%slideshowIds.length; pintarSlide(slideIndex); }
  function slidePrev(){ slideIndex=(slideIndex-1+slideshowIds.length)%slideshowIds.length; pintarSlide(slideIndex); }
  function iniciarAutoSlide(){ detenerAutoSlide(); slideTimer=setInterval(slideNext,3000); }
  function detenerAutoSlide(){ if(slideTimer) clearInterval(slideTimer); slideTimer=null; }
  function initSlideshow(){ const dots=$('#slide-dots'); if(!dots) return; dots.innerHTML=''; slideshowIds.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label',`Ir a la diapositiva ${i+1}`); b.addEventListener('click',()=>{ slideIndex=i; pintarSlide(slideIndex); iniciarAutoSlide(); }); dots.appendChild(b); }); $('#slide-next')?.addEventListener('click',()=>{ slideNext(); iniciarAutoSlide(); }); $('#slide-prev')?.addEventListener('click',()=>{ slidePrev(); iniciarAutoSlide(); }); const ss=$('#slideshow'); ss?.addEventListener('mouseenter',detenerAutoSlide); ss?.addEventListener('mouseleave',iniciarAutoSlide); pintarSlide(slideIndex); iniciarAutoSlide(); }

  window.agregarAlCarrito = (id,nombre,selectId)=>agregarAlCarrito(id,nombre,selectId);
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

  window.app = {
    cargarMisPedidos,
    cargarAdmin(){ renderPedidos(); renderUsuarios(); renderCodesStats(); }
  };

  document.addEventListener('change', (e)=>{
    if(e.target.matches('#orders-list select[data-order]')){ cambiarEstado(e.target.getAttribute('data-order'), e.target.value); }
    if(e.target.id==='transfer-bank'){
      const bank = e.target.value, list = $('#bank-data'); if(!list) return;
      list.innerHTML = bank==='Cuscatlán'
        ? `<li><strong>Beneficiario:</strong> Margarita Castro</li><li><strong>Banco:</strong> Banco Cuscatlán</li><li><strong>Cuenta:</strong> 401495002273779 (Ahorros)</li>`
        : `<li><strong>Beneficiario:</strong> Elsa Castro</li><li><strong>Banco:</strong> Banco Agrícola</li><li><strong>Cuenta:</strong> 3710993183 (Ahorros)</li>`;
    }
    if(e.target.name==='paymethod') updateTransferVisibility();
    if(e.target.id==='codes-file'){ handleCodesImport(e.target.files?.[0]); e.target.value=''; }
  });

  document.addEventListener('click', (e)=>{
    if(e.target.matches('#orders-list [data-wsp]')){ enviarWhatsDePedido(e.target.getAttribute('data-wsp')); }
    if(e.target.matches('[data-action="codes-download-template"]')){
      const blob = new Blob([`sku,code\nsteam,AAAA-BBBB-CCCC\npsn,XXXX-YYYY-ZZZZ`],{type:'text/csv'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'tati-codes-template.csv'; a.click(); URL.revokeObjectURL(a.href);
    }
    if(e.target.matches('[data-action="assign-code"]')){ handleAssignManual(); }
    if(e.target.matches('.buy-btn')){
      const id = e.target.getAttribute('data-gc'); const sel = e.target.getAttribute('data-sel'); const gc = giftcards.find(g=>g.id===id); if(!gc) return; agregarAlCarrito(id, gc.nombre, sel);
      e.target.classList.add('added'); setTimeout(()=>e.target.classList.remove('added'),650);
    }
  });

  document.addEventListener('DOMContentLoaded', ()=>{
    actualizarUIAuth();
    initSlideshow();
    renderGiftCards();
    renderCart();
    const bankSelect = $('#transfer-bank'); if(bankSelect){ bankSelect.value='Cuscatlán'; bankSelect.dispatchEvent(new Event('change')); }
    updateTransferVisibility();
  });
})();

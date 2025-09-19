(()=>{
  const IVA = 0.07;
  const WSP_NUM = '50379553318';
  const SOPORTE_MAIL = 'ventas-online@tati-shop.com';
  const ADMIN_EMAILS = ['ventas-online@tati-shop.com'];
  const ADMIN_PIN = '8642';

  const LS_USERS  = 'tati_users';
  const LS_ORDERS = 'tati_orders';
  const LS_SESS   = 'tati_session';
  const LS_CART   = 'tati_cart';
  const LS_CODES  = 'tati_codes';

  const money = n => `$${Number(n||0).toFixed(2)}`;
  const nowISO = () => new Date().toISOString();
  const safeId = () => `PED-${Date.now()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const normEmail = e => (e||'').trim().toLowerCase();

  const byId = id => document.getElementById(id);
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const escapeHtml = (str='') =>
    str.replace(/[&<>"'`=\/]/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'
    }[s]));

  const LS = {
    get:(k,fb)=>{ try{ return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } },
    set:(k,v)=>localStorage.setItem(k, JSON.stringify(v)),
    del:(k)=>localStorage.removeItem(k)
  };
  const getUsers=()=>LS.get(LS_USERS,[]), setUsers=v=>LS.set(LS_USERS,v);
  const getOrders=()=>LS.get(LS_ORDERS,[]), setOrders=v=>LS.set(LS_ORDERS,v);
  const getSess=()=>LS.get(LS_SESS,null), setSess=v=>LS.set(LS_SESS,v), clearSess=()=>LS.del(LS_SESS);
  const getCart=()=>LS.get(LS_CART,[]), setCart=v=>LS.set(LS_CART,v);
  const getCodes=()=>LS.get(LS_CODES,[]), setCodes=v=>LS.set(LS_CODES,v);

  const giftcards = [
    {id:'amazon', nombre:'Amazon', brand:'Amazon', montos:[10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'},
    {id:'google', nombre:'Google Play', brand:'Google Play', montos:[10,15,25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Google-Play.webp'},
    {id:'psn', nombre:'PlayStation', brand:'Sony', montos:[10,20,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg'},
    {id:'xbox', nombre:'Xbox', brand:'Microsoft', montos:[15,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/e/e5/Xbox_Logo.svg'},
    {id:'steam', nombre:'Steam', brand:'Valve', montos:[5,10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/a/ae/Steam_logo.svg'},
    {id:'apple', nombre:'Apple', brand:'Apple', montos:[10,25,50,100], logo:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Apple_Logo.svg'},
    {id:'spotify', nombre:'Spotify', brand:'Spotify', montos:[10,15,30], logo:'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg'},
    {id:'netflix', nombre:'Netflix', brand:'Netflix', montos:[15,30,50], logo:'https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg'},
    {id:'disney', nombre:'Disney+', brand:'Disney', montos:[25,50], logo:'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg'},
    {id:'uber', nombre:'Uber', brand:'Uber', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Uber.png'},
    {id:'airbnb', nombre:'Airbnb', brand:'Airbnb', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Airbnb.png'},
    {id:'starbucks', nombre:'Starbucks', brand:'Starbucks', montos:[10,20,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Starbucks.webp'},
    {id:'tiktok', nombre:'TikTok', brand:'TikTok', montos:[10,20], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/TikTok.png'},
    {id:'epicgames', nombre:'Epic Games', brand:'Epic Games', montos:[30,60], logo:'https://static-assets-prod.epicgames.com/fgc-portal/static/_next/media/assets/Fortnite_Gift_Card_Art.png'},
    {id:'nike', nombre:'Nike', brand:'Nike', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Nike.png'},
    {id:'adidas', nombre:'Adidas', brand:'Adidas', montos:[25,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/adidas.png'},
    {id:'sephora', nombre:'Sephora', brand:'Sephora', montos:[25,50,75], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Sephora.png'},
    {id:'walmart', nombre:'Walmart', brand:'Walmart', montos:[20,40,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Walmart.png'},
    {id:'target', nombre:'Target', brand:'Target', montos:[20,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Target.webp'},
    {id:'bestbuy', nombre:'Best Buy', brand:'Best Buy', montos:[25,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Best-Buy.webp'},
    {id:'hbo', nombre:'HBO Max', brand:'Warner', montos:[30,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/HBO.png'},
    {id:'homeDepot', nombre:'Home Depot', brand:'Home Depot', montos:[50,100], logo:'https://images.thdstatic.com/giftcards/catalog/53L1QLAXWKVF06WJ8DLHBYT6S8/xxlarge/RH6VN7060A1LR3FWD0WJKNVBV8_0608202315:36:58.PNG'},
    {id:'lowes', nombre:"Lowe's", brand:"Lowe's", montos:[25,50], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Lowes.png'},
    {id:'rolex', nombre:'Rolex', brand:'Rolex', montos:[250], logo:'https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1724322589/rolexcom/rolex-retailers/rolex-certified-pre-owned-watches/2024-updates/rcpo-rolex-certified-pre-owned-watches-elmt_2403ac_007'},
    {id:'discord', nombre:'Discord Nitro', brand:'Discord', montos:[10,15], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Discord.png'},
    {id:'facebook', nombre:'Facebook Ads', brand:'Meta', montos:[25], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Facebook-Ads-by-Rewarble.png'},
    {id:'roblox', nombre:'Roblox', brand:'Roblox', montos:[10,25], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Roblox.png'},
    {id:'visa', nombre:'Visa Prepaid', brand:'Visa', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/My-Prepaid-Center-VISA.png'},
    {id:'mastercard', nombre:'MasterCard Prepaid', brand:'Mastercard', montos:[25,50,100], logo:'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Mastercard-by-Rewarble.png'}
  ];

  const descripciones = {
    amazon:"Compra millones de productos en Amazon desde cualquier lugar.",
    google:"Apps, juegos, películas y más en Google Play.",
    psn:"Juega online y compra juegos en PlayStation Store.",
    xbox:"Suscripciones y juegos digitales para tu Xbox.",
    steam:"Recarga tu biblioteca de PC en segundos.",
    apple:"Compra apps, juegos, iCloud y más en App Store.",
    spotify:"Música sin anuncios y descargas offline.",
    netflix:"Series y películas en streaming cuando quieras.",
    disney:"Disney, Pixar, Marvel y Star Wars en una sola app.",
    uber:"Paga viajes o Uber Eats al instante.",
    airbnb:"Alojamientos y experiencias en todo el mundo.",
    starbucks:"Café, bebidas y comida en tus tiendas favoritas.",
    tiktok:"Recarga para regalos y funciones premium.",
    epicgames:"V-Bucks y compras en Fortnite/Epic.",
    nike:"Ropa y calzado deportivo.",
    adidas:"Rendimiento y estilo para entrenar.",
    sephora:"Maquillaje y skincare de las mejores marcas.",
    walmart:"Todo para el hogar en un solo lugar.",
    target:"Moda y hogar a excelentes precios.",
    bestbuy:"Tecnología, gaming y electrodomésticos.",
    hbo:"Series y cine premium en HBO Max.",
    homeDepot:"Materiales y herramientas para tu proyecto.",
    lowes:"Mejora tu casa con facilidad.",
    rolex:"Certificados de servicio y accesorios (simbólico).",
    discord:"Nitro, emojis y mejoras del servidor.",
    facebook:"Créditos para campañas publicitarias.",
    roblox:"Robux para experiencias y accesorios.",
    visa:"Tarjeta prepago para usar en miles de sitios.",
    mastercard:"Prepago aceptado globalmente."
  };

  const brandBg = {
    amazon:['#232F3E','#FF9900'],
    psn:['#003791','#0a5bd7'],
    google:['#4285F4','#34A853'],
    xbox:['#107C10','#0B6B0B'],
    spotify:['#1DB954','#0F0F0F'],
    netflix:['#E50914','#0B0B0B'],
    disney:['#113CCF','#3BA0FF'],
    steam:['#151A21','#2A475E']
  };

  let lastFocus = null;
  function modal(el, open){
    const m = typeof el==='string' ? byId(el) : el;
    if(!m) return;
    if(open){
      lastFocus = document.activeElement;
      m.classList.add('open');
      (m.querySelector('[data-close], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')||m).focus?.();
      document.documentElement.style.overflow = 'hidden';
    }else{
      m.classList.remove('open');
      document.documentElement.style.overflow = '';
      lastFocus?.focus?.();
    }
  }
  function openModal(id){ modal(id, true); }
  function closeModal(id){ modal(id, false); }

  addEventListener('keydown', e=>{
    if(e.key==='Escape'){
      ['carrito-modal','contacto-modal','auth-modal','admin-modal','orders-modal','product-modal'].forEach(id=>modal(id,false));
    }
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
    const cc = byId('cart-count');
    if(cc) cc.textContent = cart.length;

    const wrap = byId('cart-items');
    const totales = byId('totales');
    if(!wrap || !totales) return;

    if(!cart.length){
      wrap.innerHTML = '<p>Tu carrito está vacío.</p>';
      totales.innerHTML = '';
      return;
    }
    const items = agruparCarrito(cart);
    let sub = 0;
    wrap.innerHTML = items.map(it=>{
      const l = it.precio*it.cantidad; sub+=l;
      return `<p>${escapeHtml(it.nombre)} — ${it.cantidad} × ${money(it.precio)} = <strong>${money(l)}</strong></p>`;
    }).join('');
    const iva=sub*IVA, total=sub+iva;
    totales.innerHTML = `
      <p><strong>Subtotal:</strong> ${money(sub)}</p>
      <p><strong>IVA (${(IVA*100).toFixed(0)}%):</strong> ${money(iva)}</p>
      <p><strong>Total a pagar:</strong> ${money(total)}</p>`;
  }

  function agregarAlCarrito(id,nombre,monto){
    const cart = getCart(); cart.push({id, nombre, precio:Number(monto)});
    setCart(cart); renderCart();
    const cc = byId('cart-count');
    if(cc){ cc.classList.remove('bump'); void cc.offsetWidth; cc.classList.add('bump'); }
  }

  function buildOrderSummary(){
    const items = agruparCarrito(getCart());
    let sub=0;
    const lines = items.map(it=>{
      const l=it.precio*it.cantidad; sub+=l;
      return `• ${it.nombre} — ${it.cantidad} × ${money(it.precio)} = ${money(l)}`;
    });
    const iva=sub*IVA, total=sub+iva;
    return {lines, sub, iva, total, items};
  }

  function crearPedido(meta){
    const { sub, iva, total, items } = buildOrderSummary();
    const sess = getSess();
    const order = {
      id: safeId(),
      userEmail: sess?.email || 'invitado',
      items, subtotal: sub, iva, total,
      estado: 'PENDIENTE',
      metodo: meta.metodo,
      banco: meta.banco || null,
      nota: meta.nota || '',
      creadoEn: nowISO(),
      asignaciones: {}
    };
    const orders = getOrders(); orders.unshift(order); setOrders(orders);
    return order;
  }

  function pagarWhatsAppFlow(nota){
    const o = crearPedido({metodo:'whatsapp', nota});
    const { lines, sub, iva, total } = buildOrderSummary();
    let msg = `*Pedido Tati Shop – Gift Cards*\nID: *${o.id}*\n\n*Artículos:*\n${lines.join('\n')}\n\n*Subtotal:* ${money(sub)}\n*IVA (7%):* ${money(iva)}\n*Total:* ${money(total)}`;
    if(nota) msg += `\n\n*Nota del comprador:* ${nota}`;
    msg += `\n\nSoporte: ${SOPORTE_MAIL}`;
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`,'_blank');
    setCart([]); renderCart();
  }

  function pagarTransferFlow(nota){
    const bancoSel = byId('transfer-bank');
    const banco = bancoSel ? bancoSel.value : 'Cuscatlán';
    crearPedido({metodo:'transfer', banco, nota});
    alert(`Pedido creado. Banco: ${banco}. Envía tu comprobante por WhatsApp para verificarlo.`);
    setCart([]); renderCart();
  }

  function procesarPago(){
    if(getCart().length===0){ alert('Tu carrito está vacío.'); return; }
    const metodo = [...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked)?.value || 'whatsapp';
    const nota = (byId('buyer-note')?.value || '').trim();
    if(metodo==='transfer') pagarTransferFlow(nota); else pagarWhatsAppFlow(nota);
  }

  function updateTransferVisibility(){
    const method = [...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked)?.value;
    const panel = byId('transfer-form');
    const radioTransfer = document.querySelector('input[name="paymethod"][value="transfer"]');
    const show = method === 'transfer';
    if(panel){ panel.hidden = !show; panel.style.display = show ? 'block' : 'none'; }
    if(radioTransfer) radioTransfer.setAttribute('aria-expanded', show ? 'true' : 'false');
  }

  addEventListener('change', e=>{
    if(e.target.name==='paymethod') updateTransferVisibility();
    if(e.target.id==='transfer-bank'){
      const bank = e.target.value, list = byId('bank-data'); if(!list) return;
      list.innerHTML = bank==='Cuscatlán'
        ? `<li><strong>Beneficiario:</strong> Margarita Castro</li>
           <li><strong>Banco:</strong> Banco Cuscatlán</li>
           <li><strong>Cuenta:</strong> 401495002273779 (Ahorros)</li>`
        : `<li><strong>Beneficiario:</strong> Elsa Castro</li>
           <li><strong>Banco:</strong> Banco Agrícola</li>
           <li><strong>Cuenta:</strong> 3710993183 (Ahorros)</li>`;
    }
  });

  function enviarWhatsAppContacto(){
    const t = (byId('contact-msg')?.value || '').trim() || 'Hola, necesito ayuda.';
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
  function mostrarLogin(){
    $('#tab-login')?.classList.add('active'); $('#tab-register')?.classList.remove('active');
    byId('login-form')?.style && (byId('login-form').style.display='grid');
    byId('register-form')?.style && (byId('register-form').style.display='none');
    $('#tab-login')?.setAttribute('aria-selected','true');
    $('#tab-register')?.setAttribute('aria-selected','false');
  }
  function mostrarRegistro(){
    $('#tab-register')?.classList.add('active'); $('#tab-login')?.classList.remove('active');
    byId('register-form')?.style && (byId('register-form').style.display='grid');
    byId('login-form')?.style && (byId('login-form').style.display='none');
    $('#tab-register')?.setAttribute('aria-selected','true');
    $('#tab-login')?.setAttribute('aria-selected','false');
  }
  async function registrar(){
    const name = (byId('reg-name')?.value || '').trim();
    const email = normEmail(byId('reg-email')?.value);
    const pass = byId('reg-pass')?.value || '';
    if(!name || !email || !pass){ alert('Completa todos los campos'); return; }
    const users = getUsers();
    if(users.some(u=>u.email===email)){ alert('Ese email ya está registrado'); return; }
    const passh = await hash(pass);
    users.push({ name, email, passh, createdAt: nowISO() });
    setUsers(users);
    const isAdmin = ADMIN_EMAILS.includes(email);
    setSess({ email, name, isAdmin });
    actualizarUIAuth(); closeModal('auth-modal'); alert('Cuenta creada.');
  }
  async function login(){
    const email = normEmail(byId('login-email')?.value);
    const pass = byId('login-pass')?.value || '';
    if(!email || !pass){ alert('Completa email y contraseña'); return; }
    const users = getUsers(); const u = users.find(u=>u.email===email);
    if(!u){ alert('No existe ese usuario'); return; }
    const passh = await hash(pass);
    if(passh!==u.passh){ alert('Contraseña incorrecta'); return; }
    const isAdmin = ADMIN_EMAILS.includes(email);
    setSess({ email: u.email, name: u.name, isAdmin });
    actualizarUIAuth(); closeModal('auth-modal'); alert('Sesión iniciada.');
  }
  function logout(){ clearSess(); actualizarUIAuth(); alert('Sesión cerrada.'); }
  function adminAccesoRapido(){
    const pin = prompt('PIN admin:');
    if(pin===ADMIN_PIN){
      const cur = getSess() || {email:'admin@local', name:'Administrador'};
      setSess({...cur, isAdmin:true});
      actualizarUIAuth(); closeModal('auth-modal'); abrirAdmin();
    }else alert('PIN incorrecto');
  }
  function actualizarUIAuth(){
    const sess = getSess();
    const btn = byId('auth-btn');
    const adminBtn = byId('admin-open');
    if(sess){
      if(btn){ btn.textContent = `👤 ${sess.name || sess.email}`; btn.onclick = () => { if(confirm('¿Cerrar sesión?')) logout(); }; }
      if(adminBtn) adminBtn.style.display = sess.isAdmin ? 'inline-block' : 'none';
      const span = byId('admin-session-email'); if(span) span.textContent = sess.email;
    }else{
      if(btn){ btn.textContent = '👤 Acceder'; btn.onclick = abrirAuth; }
      if(adminBtn) adminBtn.style.display = 'none';
      const span = byId('admin-session-email'); if(span) span.textContent = '-';
    }
  }

  function renderPedidos(){
    const list = byId('orders-list'); if(!list) return;
    const filter = $('#orders-filter')?.value || 'ALL';
    const orders = getOrders();
    const rows = (filter==='ALL' ? orders : orders.filter(o=>o.estado===filter));
    list.innerHTML = rows.length ? '' : '<p class="small">No hay pedidos.</p>';
    rows.forEach(o=>{
      const d = document.createElement('div'); d.className = 'order';
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
        </div>`;
      list.appendChild(d);
    });
  }
  function cambiarEstado(id,estado){
    const orders = getOrders();
    const i = orders.findIndex(o=>o.id===id);
    if(i>-1){
      orders[i].estado = estado;
      setOrders(orders);
      if(estado==='PAGADO'){ autoAsignarCodigos(orders[i]); }
      renderPedidos();
    }
  }
  function enviarWhatsDePedido(id){
    const o = getOrders().find(x=>x.id===id); if(!o) return;
    const lines = o.items.map(it=>`• ${it.nombre} — ${it.cantidad} × ${money(it.precio)} = ${money(it.precio*it.cantidad)}`);
    const msg = `*Pedido Tati Shop – ${id}*\nCliente: ${o.userEmail}\n\n*Artículos:*\n${lines.join('\n')}\n\n*Subtotal:* ${money(o.subtotal)}\n*IVA:* ${money(o.iva)}\n*Total:* ${money(o.total)}\n*Estado:* ${o.estado}\n*Método:* ${o.metodo}${o.banco?` (${o.banco})`:''}`;
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`,'_blank');
  }
  function renderUsuarios(){
    const list = byId('users-list'); if(!list) return;
    const users = getUsers();
    list.innerHTML = users.length ? '' : '<p class="small">Sin usuarios registrados.</p>';
    users.forEach(u=>{
      const d = document.createElement('div'); d.className='order';
      const fecha = new Date(u.createdAt).toLocaleString();
      d.innerHTML = `
        <div class="row"><strong>${escapeHtml(u.name || '(sin nombre)')}</strong><span class="small">${escapeHtml(u.email)}</span></div>
        <div class="small">Registrado: ${fecha}</div>`;
      list.appendChild(d);
    });
  }

  function parseCSV(text){
    const lines=text.split(/\r?\n/).filter(Boolean);
    const [h,...rows]=lines;
    const heads=h.split(',').map(s=>s.trim().toLowerCase());
    const skuIdx=heads.indexOf('sku'), codeIdx=heads.indexOf('code');
    if(skuIdx===-1||codeIdx===-1) throw new Error('CSV debe tener columnas sku,code');
    return rows.map(r=>{
      const c=r.split(',');
      return { sku:c[skuIdx]?.trim(), code:c[codeIdx]?.trim(), status:'available' };
    });
  }
  async function importarCSV(file){
    const text = await file.text();
    const rows = parseCSV(text);
    const pool = getCodes();
    rows.forEach(r=>{
      if(r.sku && r.code && !pool.some(x=>x.code===r.code)) pool.push(r);
    });
    setCodes(pool);
    alert(`Importados ${rows.length} códigos.`);
    pintarStatsCodigos();
  }
  function descargarPlantillaCSV(){
    const sample = `sku,code\napple,ABCD-EFGH-IJKL\npsn,AAAA-BBBB-CCCC\n`;
    const blob = new Blob([sample],{type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download='plantilla_codigos.csv'; a.click();
    URL.revokeObjectURL(url);
  }
  function pintarStatsCodigos(){
    const el = byId('codes-stats'); if(!el) return;
    const pool = getCodes();
    const bySku = {};
    pool.forEach(c=>{
      bySku[c.sku] ??= {available:0,assigned:0,invalidated:0,total:0};
      bySku[c.sku][c.status]++; bySku[c.sku].total++;
    });
    el.innerHTML = Object.entries(bySku).map(([sku,st]) =>
      `<div class="order"><strong>${sku}</strong><div class="small">Disponibles: ${st.available} · Asignados: ${st.assigned} · Invalidados: ${st.invalidated} · Total: ${st.total}</div></div>`
    ).join('') || '<p class="small">Sin códigos importados.</p>';
  }
  function tomarCodigoDisponible(sku){
    const pool = getCodes();
    const i = pool.findIndex(c=>c.sku===sku && c.status==='available');
    if(i>-1){ const code = pool[i]; pool[i].status='assigned'; setCodes(pool); return code.code; }
    return null;
  }
  function autoAsignarCodigos(order){
    order.items.forEach(it=>{
      const sku = it.id;
      const need = it.cantidad || 1;
      order.asignaciones[sku] = order.asignaciones[sku] || [];
      for(let k=0;k<need;k++){
        const code = tomarCodigoDisponible(sku);
        if(code) order.asignaciones[sku].push(code);
      }
    });
    const orders = getOrders();
    const pos = orders.findIndex(o=>o.id===order.id);
    if(pos>-1){ orders[pos]=order; setOrders(orders); }
  }
  function asignarManualCodigo(){
    const orderId = (byId('manual-order')?.value||'').trim();
    const itemId  = (byId('manual-item')?.value||'').trim();
    const code    = (byId('manual-code')?.value||'').trim();
    if(!orderId||!itemId||!code){ alert('Completa pedido, item y código'); return; }
    const orders = getOrders();
    const idx = orders.findIndex(o=>o.id===orderId);
    if(idx===-1){ alert('Pedido no encontrado'); return; }
    const pool = getCodes();
    const pidx = pool.findIndex(c=>c.code===code && c.status!=='invalidated');
    if(pidx===-1){
      orders[idx].asignaciones[itemId] = [...(orders[idx].asignaciones[itemId]||[]), code];
    }else{
      pool[pidx].status='assigned'; setCodes(pool);
      orders[idx].asignaciones[itemId] = [...(orders[idx].asignaciones[itemId]||[]), code];
    }
    setOrders(orders); alert('Código asignado'); renderPedidos();
  }
  addEventListener('change', e=>{
    if(e.target.id==='codes-file' && e.target.files?.[0]) importarCSV(e.target.files[0]);
  });

  function renderGiftCards(){
    const c = byId('giftcards-grid'); if(!c) return;
    c.innerHTML = '';
    giftcards.forEach(gc=>{
      const selectId = `select-${gc.id}`;
      const d = document.createElement('div');
      d.className = 'card';
      d.innerHTML = `
        <img src="${gc.logo}" alt="${escapeHtml(gc.nombre)}" referrerpolicy="no-referrer" crossorigin="anonymous"
             onerror="this.onerror=null; this.src='img/cards/default.svg'">
        <h3>${escapeHtml(gc.nombre)}</h3>
        <p class="small">${escapeHtml(descripciones[gc.id]||'Código digital canjeable en el servicio/tienda del fabricante.')}</p>
        <label for="${selectId}" class="sr-only">Selecciona monto</label>
        <select id="${selectId}">${gc.montos.map(m=>`<option value="${m}">${money(m)}</option>`).join('')}</select>
        <div class="btn-row">
          <button class="btn" data-view="${gc.id}">Ver detalles</button>
          <button class="btn btn-cart" data-add="${gc.id}" data-sel="${selectId}">Agregar</button>
        </div>`;
      c.appendChild(d);
    });
  }

  function ensureProductModal(){
    if(byId('product-modal')) return;
    const box = document.createElement('div');
    box.className = 'modal'; box.id = 'product-modal';
    box.setAttribute('role','dialog'); box.setAttribute('aria-modal','true'); box.setAttribute('aria-labelledby','product-title');
    box.innerHTML = `
      <div class="modal-content">
        <button class="close" data-close aria-label="Cerrar">×</button>
        <div class="product-detail">
          <img id="product-logo" alt="" style="max-height:72px;object-fit:contain;">
          <h3 id="product-title">Producto</h3>
          <div class="small" id="product-brand"></div>
          <p id="product-desc" class="small"></p>
          <label for="product-amount">Selecciona un monto:</label>
          <select id="product-amount"></select>
          <div class="btn-row">
            <button class="btn btn-cart" id="product-add">Agregar al carrito</button>
            <button class="btn pagar-wsp-btn" id="product-buy">Comprar ahora</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(box);
  }
  function abrirFichaProducto(id){
    ensureProductModal();
    const prod = giftcards.find(g=>g.id===id); if(!prod) return;
    const logo  = byId('product-logo'),
          title = byId('product-title'),
          brand = byId('product-brand'),
          desc  = byId('product-desc'),
          amount= byId('product-amount');
    if(logo){ logo.src=prod.logo; logo.alt=prod.nombre; }
    if(title) title.textContent=prod.nombre;
    if(brand) brand.textContent=prod.brand||'';
    if(desc)  desc.textContent=descripciones[id]||'Código digital.';
    if(amount) amount.innerHTML = prod.montos.map(m=>`<option value="${m}">${money(m)}</option>`).join('');
    const addBtn = byId('product-add'), buyBtn = byId('product-buy');
    if(addBtn) addBtn.onclick = ()=>{ const m=Number(byId('product-amount').value); agregarAlCarrito(prod.id, prod.nombre, m); };
    if(buyBtn) buyBtn.onclick = ()=>{ const m=Number(byId('product-amount').value); setCart([{id:prod.id, nombre:prod.nombre, precio:m}]); renderCart(); abrirCarrito(); };
    openModal('product-modal');
  }

  function ensureOrdersModal(){
    if(byId('orders-modal')) return;
    const box = document.createElement('div');
    box.className='modal'; box.id='orders-modal';
    box.setAttribute('role','dialog'); box.setAttribute('aria-modal','true'); box.setAttribute('aria-labelledby','orders-title');
    box.innerHTML = `
      <div class="modal-content">
        <button class="close" data-close aria-label="Cerrar">×</button>
        <h2 id="orders-title">📦 Mis pedidos</h2>
        <div id="my-orders"></div>
      </div>`;
    document.body.appendChild(box);
  }
  function renderMisPedidos(){
    ensureOrdersModal();
    const cont = byId('my-orders'); if(!cont) return;
    const sess = getSess();
    const mine = getOrders().filter(o=>o.userEmail===(sess?.email||'invitado'));
    if(mine.length===0){ cont.innerHTML = '<p class="small">Aún no tienes pedidos.</p>'; return; }
    cont.innerHTML = mine.map(o=>{
      const items = o.items.map(it=>{
        const codes = o.asignaciones?.[it.id]||[];
        const canReveal = (o.estado==='PAGADO'||o.estado==='ENTREGADO') && codes.length>0;
        const codeHtml = canReveal
          ? `<div class="code" data-code="${codes.join(' | ')}">•••• •••• •••• ••••</div>
             <div class="btn-row">
               <button class="btn" data-reveal>Mostrar códigos</button>
               <button class="btn" data-copy hidden>Copiar</button>
             </div>`
          : `<div class="code">En proceso…</div>`;
        return `
          <div class="order-item">
            <div class="info">
              <strong>${escapeHtml(it.nombre)} × ${it.cantidad}</strong>
              <span class="small">SKU: ${escapeHtml(it.id)}</span>
            </div>
            <div class="actions">${codeHtml}</div>
          </div>`;
      }).join('');
      return `
        <div class="order-row">
          <header>
            <strong>${o.id}</strong>
            <span class="badge status-${o.estado}">${o.estado}</span>
            <span class="small">${new Date(o.creadoEn).toLocaleString()}</span>
          </header>
          ${items}
        </div>`;
    }).join('');

    cont.querySelectorAll('[data-reveal]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const wrap = btn.closest('.actions');
        const box = wrap.querySelector('.code');
        const copy = wrap.querySelector('[data-copy]');
        box.textContent = box.getAttribute('data-code') || box.textContent;
        copy.hidden = false;
      });
    });
    cont.querySelectorAll('[data-copy]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const box = btn.closest('.actions').querySelector('.code');
        navigator.clipboard.writeText(box.textContent||'');
        btn.textContent='Copiado ✓'; setTimeout(()=>btn.textContent='Copiar',1200);
      });
    });
  }

  function initSlideshow(){
    const slideshowIds = ['amazon','psn','google','xbox','spotify','netflix','disney','steam'];
    let slideIndex=0, timer=null;

    const dots = byId('slide-dots'); const card = byId('slide-card');
    const bgEl = byId('slide-bg'); const prev = byId('slide-prev'); const next = byId('slide-next');
    const ss = byId('slideshow');
    if(!dots || !card || !bgEl || !prev || !next || !ss) return;

    dots.innerHTML='';
    slideshowIds.forEach((_,i)=>{
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Ir a la diapositiva ${i+1}`);
      b.addEventListener('click',()=>{ slideIndex=i; pintar(); start(); });
      dots.appendChild(b);
    });

    function setSlideBackground(id){
      const [c1,c2] = brandBg[id] || ['#7c5cff','#2ee6a6'];
      bgEl.classList.remove('show');
      bgEl.style.setProperty('--c1',c1);
      bgEl.style.setProperty('--c2',c2);
      void bgEl.offsetWidth;
      bgEl.classList.add('show');
    }
    function pintar(){
      const id = slideshowIds[slideIndex];
      const it = giftcards.find(g=>g.id===id);
      if(!it) return;
      setSlideBackground(id);
      card.classList.remove('active');
      card.innerHTML = `
        <img src="${it.logo}" alt="${escapeHtml(it.nombre)}" onerror="this.onerror=null; this.src='img/cards/default.svg'">
        <h3>${escapeHtml(it.nombre)}</h3>
        <p>${escapeHtml(descripciones[id]||'')}</p>`;
      void card.offsetWidth;
      card.classList.add('active');
      dots.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active', i===slideIndex));
    }
    function start(){ if(timer) clearInterval(timer); timer=setInterval(()=>{ slideIndex=(slideIndex+1)%slideshowIds.length; pintar(); }, 3000); }
    function stop(){ if(timer) clearInterval(timer); }

    next.addEventListener('click',()=>{ slideIndex=(slideIndex+1)%slideshowIds.length; pintar(); start(); });
    prev.addEventListener('click',()=>{ slideIndex=(slideIndex-1+slideshowIds.length)%slideshowIds.length; pintar(); start(); });
    ss.addEventListener('mouseenter', stop);
    ss.addEventListener('mouseleave', start);

    pintar(); start();
  }

  function initHeaderScroll(){
    const bar = $('.top-bar'); if(!bar) return;
    const onScroll = () => bar.classList.toggle('is-scrolled', window.scrollY>10);
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  addEventListener('click', e=>{
    const openAttr = e.target.closest?.('[data-open]')?.getAttribute('data-open');
    if(openAttr){
      e.preventDefault();
      if(openAttr==='orders'){ renderMisPedidos(); }
      if(openAttr==='admin'){ const s=getSess(); if(!(s?.isAdmin)) return openModal('auth-modal'); }
      if(openAttr==='product'){ /* se abre desde abrirFichaProducto */ }
      openModal(`${openAttr}-modal`);
      return;
    }
    if(e.target.matches('[data-close]')){ const m=e.target.closest('.modal'); m&&modal(m,false); }

    const add = e.target.getAttribute('data-add');
    if(add){
      const selId = e.target.getAttribute('data-sel');
      const sel = byId(selId);
      const monto = Number(sel?.value || 0) || giftcards.find(g=>g.id===add)?.montos?.[0];
      const nombre = giftcards.find(g=>g.id===add)?.nombre || add;
      agregarAlCarrito(add, nombre, monto);
      return;
    }
    const view = e.target.getAttribute('data-view');
    if(view){ abrirFichaProducto(view); }
  });

  window.abrirCarrito  = () => { renderCart(); openModal('carrito-modal'); };
  window.cerrarCarrito = () => closeModal('carrito-modal');
  window.procesarPago  = procesarPago;

  window.abrirContacto = () => openModal('contacto-modal');
  window.cerrarContacto= () => closeModal('contacto-modal');
  window.enviarWhatsAppContacto = enviarWhatsAppContacto;

  window.abrirAuth     = () => openModal('auth-modal');
  window.cerrarAuth    = () => closeModal('auth-modal');
  window.mostrarLogin  = mostrarLogin;
  window.mostrarRegistro = mostrarRegistro;
  window.registrar     = registrar;
  window.login         = login;
  window.logout        = logout;
  window.adminAccesoRapido = adminAccesoRapido;
  window.actualizarUIAuth   = actualizarUIAuth;

  window.abrirAdmin    = () => { const s=getSess(); if(!(s?.isAdmin)){ openModal('auth-modal'); return; } openModal('admin-modal'); renderPedidos(); renderUsuarios(); pintarStatsCodigos(); };
  window.cerrarAdmin   = () => closeModal('admin-modal');
  window.renderPedidos = renderPedidos;
  window.cambiarEstado = cambiarEstado;
  window.enviarWhatsDePedido = enviarWhatsDePedido;

  window.abrirMisPedidos = () => { renderMisPedidos(); openModal('orders-modal'); };

  document.addEventListener('DOMContentLoaded', ()=>{
    ensureOrdersModal();
    ensureProductModal();

    actualizarUIAuth();
    initHeaderScroll();
    initSlideshow();
    renderGiftCards();
    renderCart();

    const bankSelect = byId('transfer-bank');
    if(bankSelect){ bankSelect.value='Cuscatlán'; bankSelect.dispatchEvent(new Event('change')); }
    updateTransferVisibility();

    document.querySelectorAll('.modal').forEach(m=>{
      m.addEventListener('click', (e)=>{
        if(e.target === m) modal(m,false);
      });
    });
  });

})();

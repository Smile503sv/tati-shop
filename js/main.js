const IVA = 0.07;
const WSP_NUM = '50379553318';
const SOPORTE_MAIL = 'ventas-online@tati-shop.com';
const ADMIN_EMAIL = SOPORTE_MAIL;
const ADMIN_PIN = '8642';

const LS_USERS  = 'tati_users';
const LS_ORDERS = 'tati_orders';
const LS_SESS   = 'tati_session';

const money = n => `$${Number(n).toFixed(2)}`;

const giftcards = [
  { id: 'amazon', nombre: 'Amazon', montos: [10, 25, 50, 100], logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { id: 'google', nombre: 'Google Play', montos: [10, 15, 25, 50, 100], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Google-Play.webp' },
  { id: 'psn', nombre: 'PlayStation', montos: [10, 20, 50, 100], logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { id: 'xbox', nombre: 'Xbox', montos: [15, 25, 50, 100], logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Xbox_Logo.svg' },
  { id: 'steam', nombre: 'Steam', montos: [5, 10, 25, 50, 100], logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Steam_logo.svg' },
  { id: 'apple', nombre: 'Apple', montos: [10, 25, 50, 100], logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Apple_Logo.svg' },
  { id: 'spotify', nombre: 'Spotify', montos: [10, 15, 30], logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
  { id: 'netflix', nombre: 'Netflix', montos: [15, 30, 50], logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg' },
  { id: 'disney', nombre: 'Disney+', montos: [25, 50], logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg' },
  { id: 'uber', nombre: 'Uber', montos: [25, 50, 100], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Uber.png' },
  { id: 'airbnb', nombre: 'Airbnb', montos: [25, 50, 100], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Airbnb.png' },
  { id: 'starbucks', nombre: 'Starbucks', montos: [10, 20, 50], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Starbucks.webp' },
  { id: 'tiktok', nombre: 'TikTok', montos: [10, 20], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/TikTok.png' },
  { id: 'epicgames', nombre: 'Epic Games', montos: [30, 60], logo: 'https://static-assets-prod.epicgames.com/fgc-portal/static/_next/media/assets/Fortnite_Gift_Card_Art.png' },
  { id: 'nike', nombre: 'Nike', montos: [25, 50, 100], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Nike.png' },
  { id: 'adidas', nombre: 'Adidas', montos: [25, 50], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/adidas.png' },
  { id: 'sephora', nombre: 'Sephora', montos: [25, 50, 75], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Sephora.png' },
  { id: 'walmart', nombre: 'Walmart', montos: [20, 40, 100], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Walmart.png' },
  { id: 'target', nombre: 'Target', montos: [20, 50], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Target.webp' },
  { id: 'bestbuy', nombre: 'Best Buy', montos: [25, 50], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Best-Buy.webp' },
  { id: 'hbo', nombre: 'HBO Max', montos: [30, 50], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/HBO.png' },
  { id: 'homeDepot', nombre: 'Home Depot', montos: [50, 100], logo: 'https://images.thdstatic.com/giftcards/catalog/53L1QLAXWKVF06WJ8DLHBYT6S8/xxlarge/RH6VN7060A1LR3FWD0WJKNVBV8_0608202315:36:58.PNG' },
  { id: 'lowes', nombre: "Lowe's", montos: [25, 50], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Lowes.png' },
  { id: 'rolex', nombre: 'Rolex', montos: [250], logo: 'https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1724322589/rolexcom/rolex-retailers/rolex-certified-pre-owned-watches/2024-updates/rcpo-rolex-certified-pre-owned-watches-elmt_2403ac_007' },
  { id: 'discord', nombre: 'Discord Nitro', montos: [10, 15], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Discord.png' },
  { id: 'facebook', nombre: 'Facebook', montos: [25], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Facebook-Ads-by-Rewarble.png' },
  { id: 'roblox', nombre: 'Roblox', montos: [10, 25], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Roblox.png' },
  { id: 'visa', nombre: 'Visa Prepaid', montos: [25, 50, 100], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/My-Prepaid-Center-VISA.png' },
  { id: 'mastercard', nombre: 'MasterCard Prepaid', montos: [25, 50, 100], logo: 'https://cdn.coinsbee.com/version2/dist/assets/img/brands/Mastercard-by-Rewarble.png' }
];

const descripciones = {
  amazon:  "Compra millones de productos en Amazon desde cualquier lugar.",
  psn:     "Juega online y compra juegos en PlayStation Store.",
  google:  "Apps, juegos, películas y más en Google Play.",
  xbox:    "Suscripciones y juegos digitales para tu Xbox.",
  spotify: "Escucha música sin anuncios con Spotify Premium.",
  netflix: "Series y películas en streaming cuando quieras.",
  disney:  "Disney, Pixar, Marvel y Star Wars en una sola app.",
  steam:   "Tu biblioteca de videojuegos para PC en Steam."
};

const brandBg = {
  amazon:  ['#232F3E', '#FF9900'],
  psn:     ['#003791', '#0a5bd7'],
  google:  ['#4285F4', '#34A853'],
  xbox:    ['#107C10', '#0B6B0B'],
  spotify: ['#1DB954', '#0F0F0F'],
  netflix: ['#E50914', '#0B0B0B'],
  disney:  ['#113CCF', '#3BA0FF'],
  steam:   ['#151A21', '#2A475E']
};

const getUsers  = () => JSON.parse(localStorage.getItem(LS_USERS)  || '[]');
const setUsers  = v  => localStorage.setItem(LS_USERS,  JSON.stringify(v));
const getOrders = () => JSON.parse(localStorage.getItem(LS_ORDERS) || '[]');
const setOrders = v  => localStorage.setItem(LS_ORDERS, JSON.stringify(v));
const getSess   = () => JSON.parse(localStorage.getItem(LS_SESS)   || 'null');
const setSess   = v  => localStorage.setItem(LS_SESS,   JSON.stringify(v));
const clearSess = () => localStorage.removeItem(LS_SESS);

let carrito = [];

function renderGiftCards() {
  const container = document.getElementById('giftcards-grid');
  container.innerHTML = '';
  giftcards.forEach(gc => {
    const selectId = `select-${gc.id}`;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${gc.logo}" alt="${gc.nombre}" onerror="this.onerror=null; this.src='img/cards/default.svg'">
      <h3>${gc.nombre}</h3>
      <p>Selecciona un monto:</p>
      <select id="${selectId}">
        ${gc.montos.map(m => `<option value="${m}">$${m}</option>`).join('')}
      </select>
      <button class="buy-btn" onclick="agregarAlCarrito('${gc.id}', '${gc.nombre}', '${selectId}')">Agregar al carrito</button>
    `;
    container.appendChild(card);
  });
}

function agregarAlCarrito(id, nombre, selectId) {
  const select = document.getElementById(selectId);
  const monto = parseFloat(select.value);
  carrito.push({ id, nombre, precio: monto });
  actualizarCarritoListado();
}

function agruparCarrito(items) {
  const map = new Map();
  items.forEach(it => {
    const key = `${it.id}|${it.precio}`;
    if (!map.has(key)) map.set(key, { ...it, cantidad: 0 });
    map.get(key).cantidad += 1;
  });
  return Array.from(map.values());
}

function actualizarCarritoListado() {
  const cart = document.getElementById('cart-items');
  const count = document.getElementById('cart-count');
  const totales = document.getElementById('totales');

  count.textContent = carrito.length;

  if (carrito.length === 0) {
    cart.innerHTML = '<p>Tu carrito está vacío.</p>';
    totales.innerHTML = '';
    return;
  }

  const agrupado = agruparCarrito(carrito);

  let subtotalSinIva = 0;
  let html = '';

  agrupado.forEach(item => {
    const linea = item.precio * item.cantidad;
    subtotalSinIva += linea;
    html += `<p>${item.nombre} — ${item.cantidad} × ${money(item.precio)} = <strong>${money(linea)}</strong></p>`;
  });

  const iva = subtotalSinIva * IVA;
  const total = subtotalSinIva + iva;

  cart.innerHTML = html;
  totales.innerHTML = `
    <p><strong>Subtotal:</strong> ${money(subtotalSinIva)}</p>
    <p><strong>IVA (${(IVA*100).toFixed(0)}%):</strong> ${money(iva)}</p>
    <p><strong>Total a pagar:</strong> ${money(total)}</p>
  `;
}

function vaciarCarrito(){ carrito = []; actualizarCarritoListado(); }
function abrirCarrito(){ document.getElementById('carrito-modal').style.display='flex'; }
function cerrarCarrito(){ document.getElementById('carrito-modal').style.display='none'; }

function buildOrderSummary() {
  const agrupado = agruparCarrito(carrito);
  let subtotalSinIva = 0;
  const lines = agrupado.map(it => {
    const linea = it.precio * it.cantidad;
    subtotalSinIva += linea;
    return `• ${it.nombre} — ${it.cantidad} × ${money(it.precio)} = ${money(linea)}`;
  });
  const iva = subtotalSinIva * IVA;
  const total = subtotalSinIva + iva;
  return { lines, subtotalSinIva, iva, total };
}

function crearPedido(meta) {
  const { lines, subtotalSinIva, iva, total } = buildOrderSummary();
  const sess = getSess();
  const userEmail = sess?.email || 'invitado';

  const order = {
    id: 'PED-' + Date.now(),
    userEmail,
    items: agruparCarrito(carrito),
    subtotal: subtotalSinIva,
    iva,
    total,
    estado: 'PENDIENTE',
    metodo: meta.metodo,
    banco: meta.banco || null,
    nota: meta.nota || '',
    creadoEn: new Date().toISOString()
  };

  const orders = getOrders();
  orders.unshift(order);
  setOrders(orders);
  return order;
}

function pagarWhatsAppFlow(nota) {
  const order = crearPedido({ metodo:'whatsapp', nota });
  const { lines, subtotalSinIva, iva, total } = buildOrderSummary();

  let msg = `*Pedido Tati Shop – Gift Cards*\nID: *${order.id}*\n\n*Artículos:*\n${lines.join('\n')}\n\n*Subtotal:* ${money(subtotalSinIva)}\n*IVA (7%):* ${money(iva)}\n*Total:* ${money(total)}`;
  if (nota) msg += `\n\n*Nota del comprador:* ${nota}`;
  msg += `\n\nPor favor confírmame método de pago y entrega.\nSoporte: ${SOPORTE_MAIL}`;

  const url = `https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function pagarTransferFlow(nota) {
  const banco = document.getElementById('transfer-bank').value;
  const order = crearPedido({ metodo:'transfer', banco, nota });

  alert(`Pedido creado (${order.id}).\nBanco seleccionado: ${banco}.\nEnvía tu comprobante por WhatsApp para verificarlo.`);
}

function procesarPago(){
  if (carrito.length === 0) { alert('Tu carrito está vacío.'); return; }
  const metodo = [...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked)?.value || 'whatsapp';
  const nota = (document.getElementById('buyer-note')?.value || '').trim();

  if(metodo==='transfer') pagarTransferFlow(nota);
  else pagarWhatsAppFlow(nota);
}

const cuentasBancarias = {
  "Cuscatlán": {
    beneficiario: "MARGARITA CASTRO",
    cuenta: "401495002273779",
    tipo: "Ahorros"
  },
  "Agrícola": {
    beneficiario: "ELSA CASTRO",
    cuenta: "3710993183",
    tipo: "Ahorros"
  }
};

function actualizarDatosBanco() {
  const select = document.getElementById('transfer-bank');
  if (!select) return;
  const banco = select.value;
  const datos = cuentasBancarias[banco];
  const cont = document.getElementById('bank-instructions');
  if (!cont || !datos) return;

  cont.innerHTML = `
    <p><strong>Datos para Transfer365:</strong></p>
    <ul>
      <li><strong>Beneficiario:</strong> ${datos.beneficiario}</li>
      <li><strong>Banco:</strong> Banco ${banco}</li>
      <li><strong>Cuenta:</strong> ${datos.cuenta} (${datos.tipo})</li>
    </ul>
    <p>💡 Tras realizar la transferencia, envía el comprobante al WhatsApp para verificar y aprobar tu pedido.</p>
  `;
}

document.addEventListener('change', (e)=>{
  if(e.target.name==='paymethod'){
    const isTransfer = e.target.value==='transfer';
    const form = document.getElementById('transfer-form');
    if (form) {
      form.style.display = isTransfer ? 'block' : 'none';
      if (isTransfer) actualizarDatosBanco();
    }
  }
});

document.addEventListener('change', (e)=>{
  if(e.target.id==='transfer-bank'){
    actualizarDatosBanco();
  }
});

function abrirContacto(){ document.getElementById('contacto-modal').style.display='flex'; }
function cerrarContacto(){ document.getElementById('contacto-modal').style.display='none'; }
function enviarWhatsAppContacto(){
  const texto = (document.getElementById('contact-msg')?.value || '').trim() || 'Hola, necesito ayuda.';
  const url = `https://wa.me/${WSP_NUM}?text=${encodeURIComponent(texto)}`;
  window.open(url,'_blank');
}

async function hash(text){
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

function abrirAuth(){ document.getElementById('auth-modal').style.display='flex'; }
function cerrarAuth(){ document.getElementById('auth-modal').style.display='none'; }
function mostrarLogin(){
  document.getElementById('tab-login').classList.add('active');
  document.getElementById('tab-register').classList.remove('active');
  document.getElementById('login-form').style.display='grid';
  document.getElementById('register-form').style.display='none';
}
function mostrarRegistro(){
  document.getElementById('tab-register').classList.add('active');
  document.getElementById('tab-login').classList.remove('active');
  document.getElementById('register-form').style.display='grid';
  document.getElementById('login-form').style.display='none';
}

async function registrar(){
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const pass = document.getElementById('reg-pass').value;
  if(!name || !email || !pass) return alert('Completa todos los campos');

  const users = getUsers();
  if(users.some(u=>u.email===email)) return alert('Ese email ya está registrado');

  const passh = await hash(pass);
  users.push({ name, email, passh, createdAt: new Date().toISOString() });
  setUsers(users);
  setSess({ email, name, isAdmin: email===ADMIN_EMAIL });
  actualizarUIAuth();
  cerrarAuth();
  alert('Cuenta creada. ¡Bienvenido!');
}

async function login(){
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value;
  if(!email || !pass) return alert('Completa email y contraseña');

  const users = getUsers();
  const u = users.find(u=>u.email===email);
  if(!u) return alert('No existe ese usuario');

  const passh = await hash(pass);
  if(passh !== u.passh) return alert('Contraseña incorrecta');

  setSess({ email: u.email, name: u.name, isAdmin: email===ADMIN_EMAIL });
  actualizarUIAuth();
  cerrarAuth();
  alert('Sesión iniciada.');
}

function logout(){
  clearSess();
  actualizarUIAuth();
  alert('Sesión cerrada.');
}

function adminAccesoRapido(){
  const pin = prompt('PIN admin:');
  if(pin === ADMIN_PIN){
    setSess({ email: ADMIN_EMAIL, name: 'Administrador', isAdmin: true });
    actualizarUIAuth();
    cerrarAuth();
    abrirAdmin();
  }else{
    alert('PIN incorrecto');
  }
}

function actualizarUIAuth(){
  const sess = getSess();
  const authBtn = document.getElementById('auth-btn');
  const adminOpen = document.getElementById('admin-open');

  if(sess){
    authBtn.textContent = `👤 ${sess.name || sess.email}`;
    authBtn.onclick = () => { if(confirm('¿Cerrar sesión?')) logout(); };
    adminOpen.style.display = sess.isAdmin ? 'inline-block' : 'none';
    document.getElementById('admin-session-email')?.replaceChildren(document.createTextNode(sess.email));
  }else{
    authBtn.textContent = '👤 Acceder';
    authBtn.onclick = abrirAuth;
    adminOpen.style.display = 'none';
  }
}

function abrirAdmin(){
  const sess = getSess();
  if(!(sess?.isAdmin) && !confirm('No eres admin. ¿Intentar acceso rápido?')) return abrirAuth();
  document.getElementById('admin-modal').style.display='flex';
  renderPedidos();
  renderUsuarios();
}
function cerrarAdmin(){ document.getElementById('admin-modal').style.display='none'; }

function renderPedidos(){
  const list = document.getElementById('orders-list');
  const filter = document.getElementById('orders-filter')?.value || 'ALL';
  const orders = getOrders();
  const filtered = filter==='ALL' ? orders : orders.filter(o=>o.estado===filter);

  list.innerHTML = '';
  if(filtered.length===0){ list.innerHTML = '<p class="small">No hay pedidos.</p>'; return; }

  filtered.forEach(o=>{
    const div = document.createElement('div');
    div.className = 'order';
    div.innerHTML = `
      <div class="row"><strong>${o.id}</strong><span class="small">${new Date(o.creadoEn).toLocaleString()}</span></div>
      <div class="small">Cliente: ${o.userEmail}</div>
      <div class="small">Método: ${o.metodo}${o.banco ? ' ('+o.banco+')' : ''}</div>
      <div class="small">Total: ${money(o.total)}</div>
      ${o.nota ? `<div class="small"><em>Nota:</em> ${o.nota}</div>`:''}
      <div class="row">
        <label>Estado:</label>
        <select onchange="cambiarEstado('${o.id}', this.value)">
          ${['PENDIENTE','PAGADO','ENTREGADO','CANCELADO'].map(s=>`<option value="${s}" ${o.estado===s?'selected':''}>${s}</option>`).join('')}
        </select>
        <button class="secundario-btn" onclick="enviarWhatsDePedido('${o.id}')">Enviar por WhatsApp</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function cambiarEstado(id, estado){
  const orders = getOrders();
  const idx = orders.findIndex(o=>o.id===id);
  if(idx>-1){
    orders[idx].estado = estado;
    setOrders(orders);
    renderPedidos();
  }
}

function enviarWhatsDePedido(id){
  const orders = getOrders();
  const o = orders.find(x=>x.id===id);
  if(!o) return;
  const lines = o.items.map(it => `• ${it.nombre} — ${it.cantidad} × ${money(it.precio)} = ${money(it.precio*it.cantidad)}`);
  let msg = `*Pedido Tati Shop – ${id}*\nCliente: ${o.userEmail}\n\n*Artículos:*\n${lines.join('\n')}\n\n*Subtotal:* ${money(o.subtotal)}\n*IVA:* ${money(o.iva)}\n*Total:* ${money(o.total)}\n*Estado:* ${o.estado}\n*Método:* ${o.metodo}${o.banco?(' ('+o.banco+')'):''}`;
  const url = `https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`;
  window.open(url,'_blank');
}

function renderUsuarios(){
  const list = document.getElementById('users-list');
  const users = getUsers();
  list.innerHTML = users.length ? '' : '<p class="small">Sin usuarios registrados.</p>';
  users.forEach(u=>{
    const d = document.createElement('div');
    d.className='order';
    d.innerHTML = `
      <div class="row"><strong>${u.name || '(sin nombre)'} </strong><span class="small">${u.email}</span></div>
      <div class="small">Registrado: ${new Date(u.createdAt).toLocaleString()}</div>
    `;
    list.appendChild(d);
  });
}

const slideshowIds = ['amazon','psn','google','xbox','spotify','netflix','disney','steam'];
let slideIndex = 0; let slideTimer = null;

function setSlideBackground(id){
  const [c1,c2] = brandBg[id] || ['#ff9ec1','#ff5d96'];
  const bg = document.getElementById('slide-bg');
  bg.classList.remove('show');
  bg.style.setProperty('--c1', c1);
  bg.style.setProperty('--c2', c2);
  void bg.offsetWidth;
  bg.classList.add('show');
}

function pintarSlide(index){
  const id = slideshowIds[index];
  const item = giftcards.find(g=>g.id===id);
  const slideCard = document.getElementById('slide-card');
  const desc = descripciones[id] || '';
  if(!item || !slideCard) return;

  setSlideBackground(id);
  slideCard.classList.remove('active');
  slideCard.innerHTML = `
    <img src="${item.logo}" alt="${item.nombre}" onerror="this.onerror=null; this.src='img/cards/default.svg'">
    <h3>${item.nombre}</h3>
    <p>${desc}</p>
  `;
  void slideCard.offsetWidth;
  slideCard.classList.add('active');

  const dots = document.querySelectorAll('#slide-dots button');
  dots.forEach((d,i)=>d.classList.toggle('active', i===index));
}

function slideNext(){ slideIndex = (slideIndex+1)%slideshowIds.length; pintarSlide(slideIndex); }
function slidePrev(){ slideIndex = (slideIndex-1+slideshowIds.length)%slideshowIds.length; pintarSlide(slideIndex); }
function iniciarAutoSlide(){ detenerAutoSlide(); slideTimer = setInterval(slideNext, 3000); }
function detenerAutoSlide(){ if(slideTimer) clearInterval(slideTimer); slideTimer = null; }

function initSlideshow(){
  const dotsWrap = document.getElementById('slide-dots');
  dotsWrap.innerHTML = '';
  slideshowIds.forEach((_,i)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=>{ slideIndex=i; pintarSlide(slideIndex); iniciarAutoSlide(); });
    dotsWrap.appendChild(b);
  });

  document.getElementById('slide-next').addEventListener('click', ()=>{ slideNext(); iniciarAutoSlide(); });
  document.getElementById('slide-prev').addEventListener('click', ()=>{ slidePrev(); iniciarAutoSlide(); });

  const ss = document.getElementById('slideshow');
  ss.addEventListener('mouseenter', detenerAutoSlide);
  ss.addEventListener('mouseleave', iniciarAutoSlide);

  pintarSlide(slideIndex);
  iniciarAutoSlide();
}

window.onload = () => {
  actualizarUIAuth();
  initSlideshow();
  renderGiftCards();
  actualizarCarritoListado();

  const payRadio = [...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked);
  if (payRadio && payRadio.value === 'transfer') {
    const form = document.getElementById('transfer-form');
    if (form) {
      form.style.display = 'block';
      actualizarDatosBanco();
    }
  }
};

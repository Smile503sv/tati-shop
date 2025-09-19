(() => {
  "use strict";

  const IVA = 0.07;
  const WSP_NUM = "50379553318";
  const SOPORTE_MAIL = "ventas-online@tati-shop.com";
  const ADMIN_EMAIL = SOPORTE_MAIL;
  const ADMIN_PIN = "8642";

  const LS_USERS  = "tati_users";
  const LS_ORDERS = "tati_orders";
  const LS_SESS   = "tati_session";
  const LS_CART   = "tati_cart";
  const LS_CODES  = "tati_codes";

  const money   = n => `$${Number(n || 0).toFixed(2)}`;
  const nowISO  = () => new Date().toISOString();
  const safeId  = () => `PED-${Date.now()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const normEmail = e => (e || "").trim().toLowerCase();

  const giftcards = [
    { id:"amazon", nombre:"Amazon", montos:[10,25,50,100], logo:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { id:"google", nombre:"Google Play", montos:[10,15,25,50,100], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Google-Play.webp" },
    { id:"psn", nombre:"PlayStation", montos:[10,20,50,100], logo:"https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg" },
    { id:"xbox", nombre:"Xbox", montos:[15,25,50,100], logo:"https://upload.wikimedia.org/wikipedia/commons/e/e5/Xbox_Logo.svg" },
    { id:"steam", nombre:"Steam", montos:[5,10,25,50,100], logo:"https://upload.wikimedia.org/wikipedia/commons/a/ae/Steam_logo.svg" },
    { id:"apple", nombre:"Apple", montos:[10,25,50,100], logo:"https://upload.wikimedia.org/wikipedia/commons/8/8a/Apple_Logo.svg" },
    { id:"spotify", nombre:"Spotify", montos:[10,15,30], logo:"https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
    { id:"netflix", nombre:"Netflix", montos:[15,30,50], logo:"https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg" },
    { id:"disney", nombre:"Disney+", montos:[25,50], logo:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" },
    { id:"uber", nombre:"Uber", montos:[25,50,100], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Uber.webp" },
    { id:"airbnb", nombre:"Airbnb", montos:[25,50,100], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Airbnb.webp" },
    { id:"starbucks", nombre:"Starbucks", montos:[10,20,50], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Starbucks.png" },
    { id:"tiktok", nombre:"TikTok", montos:[10,20], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/TikTok.png" },
    { id:"epicgames", nombre:"Epic Games", montos:[30,60], logo:"https://gift-cards.coingate.com/_next/image?url=ht…f38e72-808a-4521-bb8f-65056815402c.png&w=384&q=75" },
    { id:"nike", nombre:"Nike", montos:[25,50,100], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Nike.png" },
    { id:"adidas", nombre:"Adidas", montos:[25,50], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/adidas.png" },
    { id:"sephora", nombre:"Sephora", montos:[25,50,75], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Sephora.png" },
    { id:"walmart", nombre:"Walmart", montos:[20,40,100], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Walmart.png" },
    { id:"target", nombre:"Target", montos:[20,50], logo:"https://www.giftcards.com/content/dam/bhn/live/nam/us/en/catalog-assets/product-images/07675015835/07675015835_72786_master.png/_jcr_content/renditions/cq5dam.zoom.2048.2048.jpeg" },
    { id:"bestbuy", nombre:"Best Buy", montos:[25,50], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Best-Buy.webp" },
    { id:"hbo", nombre:"HBO Max", montos:[30,50], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/HBO.png" },
    { id:"homeDepot", nombre:"Home Depot", montos:[50,100], logo:"https://images.thdstatic.com/giftcards/catalog/53L1QLAXWKVF06WJ8DLHBYT6S8/xxlarge/RH6VN7060A1LR3FWD0WJKNVBV8_0608202315:36:58.PNG" },
    { id:"lowes", nombre:"Lowe's", montos:[25,50], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Lowes.png" },
    { id:"rolex", nombre:"Rolex", montos:[250], logo:"https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1724322589/rolexcom/rolex-retailers/rolex-certified-pre-owned-watches/2024-updates/rcpo-rolex-certified-pre-owned-watches-elmt_2403ac_007" },
    { id:"discord", nombre:"Discord Nitro", montos:[10,15], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Discord.png" },
    { id:"facebook", nombre:"Facebook", montos:[25], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Facebook-Ads-by-Rewarble.png" },
    { id:"roblox", nombre:"Roblox", montos:[10,25], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Roblox.png" },
    { id:"visa", nombre:"Visa Prepaid", montos:[25,50,100], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/My-Prepaid-Center-VISA.png" },
    { id:"mastercard", nombre:"MasterCard Prepaid", montos:[25,50,100], logo:"https://cdn.coinsbee.com/version2/dist/assets/img/brands/Mastercard-by-Rewarble.png" }
  ];

  const descripciones = {
    amazon:"Compra millones de productos en Amazon desde cualquier lugar.",
    psn:"Juega online y compra juegos en PlayStation Store.",
    google:"Apps, juegos, películas y más en Google Play.",
    xbox:"Suscripciones y juegos digitales para tu Xbox.",
    spotify:"Escucha música sin anuncios con Spotify Premium.",
    netflix:"Series y películas en streaming cuando quieras.",
    disney:"Disney, Pixar, Marvel y Star Wars en una sola app.",
    steam:"Tu biblioteca de videojuegos para PC en Steam.",
    apple:"Tarjetas para App Store, iCloud y suscripciones de Apple.",
  };

  const brandBg = {
    amazon:["#232F3E","#FF9900"], psn:["#003791","#0a5bd7"],
    google:["#4285F4","#34A853"], xbox:["#107C10","#0B6B0B"],
    spotify:["#1DB954","#0F0F0F"], netflix:["#E50914","#0B0B0B"],
    disney:["#113CCF","#3BA0FF"], steam:["#151A21","#2A475E"]
  };

  const LS = {
    get:(k,fb)=>{ try{ return JSON.parse(localStorage.getItem(k)) ?? fb; }catch{ return fb; } },
    set:(k,v)=> localStorage.setItem(k, JSON.stringify(v)),
    del:(k)=> localStorage.removeItem(k),
  };

  const getUsers  = ()=> LS.get(LS_USERS, []);
  const setUsers  = v => LS.set(LS_USERS, v);
  const getOrders = ()=> LS.get(LS_ORDERS, []);
  const setOrders = v => LS.set(LS_ORDERS, v);
  const getSess   = ()=> LS.get(LS_SESS, null);
  const setSess   = v => LS.set(LS_SESS, v);
  const clearSess = ()=> LS.del(LS_SESS);
  const getCart   = ()=> LS.get(LS_CART, []);
  const setCart   = v => LS.set(LS_CART, v);
  const getCodes  = ()=> LS.get(LS_CODES, []);
  const setCodes  = v => LS.set(LS_CODES, v);

  const $  = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const escapeHtml = (str="") =>
    str.replace(/[&<>"'`=\/]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'}[s]));


  function modalIdFromName(name){
    if(name === "contact") return "contacto-modal";
    if(name === "cart")    return "carrito-modal";
    if(name === "auth")    return "auth-modal";
    if(name === "admin")   return "admin-modal";
    if(name === "orders")  return "orders-modal";
    return `${name}-modal`;
  }

  function abrirModal(name){
    const id = modalIdFromName(name);
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.add("open");
    el.querySelector(".close")?.focus();
    if (name === "orders") cargarMisPedidos();
    if (name === "admin")  cargarAdmin();
  }
  function cerrarModal(node){
    (node || document.querySelector(".modal.open"))?.classList.remove("open");
  }

  document.addEventListener("click", (e)=>{
    const openT = e.target.closest("[data-open]");
    if(openT){
      e.preventDefault();
      abrirModal(openT.getAttribute("data-open"));
    }
    if(e.target.matches("[data-close]")){
      e.preventDefault();
      cerrarModal(e.target.closest(".modal"));
    }
    const m = e.target.closest(".modal");
    if(m && e.target === m){ cerrarModal(m); }
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape"){
      document.querySelectorAll(".modal.open").forEach(m=>m.classList.remove("open"));
    }
  });

  function initHeaderScroll(){
    const top = document.querySelector(".top-bar");
    const set = () => {
      if(!top) return;
      if(window.scrollY > 10) top.classList.add("is-scrolled");
      else top.classList.remove("is-scrolled");
    };
    set();
    window.addEventListener("scroll", set, { passive:true });
  }

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
    $("#cart-count").textContent = cart.length;

    const cartWrap = $("#cart-items");
    const totales = $("#totales");

    if(!cart.length){
      if(cartWrap) cartWrap.innerHTML = "<p>Tu carrito está vacío.</p>";
      if(totales)  totales.innerHTML = "";
      return;
    }

    const items = agruparCarrito(cart);
    let sub = 0;
    if(cartWrap){
      cartWrap.innerHTML = items.map(it=>{
        const l = it.precio * it.cantidad; sub += l;
        return `<p>${escapeHtml(it.nombre)} — ${it.cantidad} × ${money(it.precio)} = <strong>${money(l)}</strong></p>`;
      }).join("");
    }
    const iva = sub * IVA;
    const total = sub + iva;
    if(totales){
      totales.innerHTML = `
        <p><strong>Subtotal:</strong> ${money(sub)}</p>
        <p><strong>IVA (${(IVA*100).toFixed(0)}%):</strong> ${money(iva)}</p>
        <p><strong>Total a pagar:</strong> ${money(total)}</p>
      `;
    }
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
      userEmail: sess?.email || "invitado",
      items: items.map((it, idx)=>({ ...it, sku:`${it.id}-${Date.now()}-${idx}` })),
      subtotal: sub, iva, total,
      estado:"PENDIENTE",
      metodo: meta.metodo,
      banco: meta.banco || null,
      nota: meta.nota || "",
      creadoEn: nowISO()
    };
    const orders = getOrders(); orders.unshift(order); setOrders(orders);
    return order;
  }

  function pagarWhatsAppFlow(nota){
    const o = crearPedido({metodo:"whatsapp", nota});
    const {lines, sub, iva, total} = buildOrderSummary();
    let msg = `*Pedido Tati Shop – Gift Cards*\nID: *${o.id}*\n\n*Artículos:*\n${lines.join("\n")}\n\n*Subtotal:* ${money(sub)}\n*IVA (7%):* ${money(iva)}\n*Total:* ${money(total)}`;
    if(nota) msg += `\n\n*Nota del comprador:* ${nota}`;
    msg += `\n\nSoporte: ${SOPORTE_MAIL}`;
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`,"_blank");
    setCart([]); renderCart();
  }

  function pagarTransferFlow(nota){
    const bancoSel = document.getElementById("transfer-bank");
    const banco = bancoSel ? bancoSel.value : "Cuscatlán";
    crearPedido({metodo:"transfer", banco, nota});
    alert(`Pedido creado. Banco: ${banco}. Envía tu comprobante por WhatsApp para verificarlo.`);
    setCart([]); renderCart();
  }

  function procesarPago(){
    if(getCart().length===0){ alert("Tu carrito está vacío."); return; }
    const metodo = [...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked)?.value || "whatsapp";
    const nota = (document.getElementById("buyer-note")?.value || "").trim();
    if(metodo==="transfer") pagarTransferFlow(nota); else pagarWhatsAppFlow(nota);
  }

  function updateTransferVisibility(){
    const method = [...document.querySelectorAll('input[name="paymethod"]')].find(r=>r.checked)?.value;
    const panel = document.getElementById("transfer-form");
    const radioTransfer = document.querySelector('input[name="paymethod"][value="transfer"]');
    const show = method === "transfer";
    if(panel){ panel.hidden = !show; panel.style.display = show ? "block" : "none"; }
    if(radioTransfer) radioTransfer.setAttribute("aria-expanded", show ? "true" : "false");
  }
  document.addEventListener("change",e=>{
    if(e.target.name==="paymethod") updateTransferVisibility();
  });
  document.addEventListener("change",e=>{
    if(e.target.id==="transfer-bank"){
      const bank = e.target.value, list = document.getElementById("bank-data"); if(!list) return;
      list.innerHTML = bank==="Cuscatlán"
        ? `<li><strong>Beneficiario:</strong> Margarita Castro</li>
           <li><strong>Banco:</strong> Banco Cuscatlán</li>
           <li><strong>Cuenta:</strong> 401495002273779 (Ahorros)</li>`
        : `<li><strong>Beneficiario:</strong> Elsa Castro</li>
           <li><strong>Banco:</strong> Banco Agrícola</li>
           <li><strong>Cuenta:</strong> 3710993183 (Ahorros)</li>`;
    }
  });

  function enviarWhatsAppContacto(){
    const t = (document.getElementById("contact-msg")?.value || "").trim() || "Hola, necesito ayuda.";
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(t)}`,"_blank");
  }

  async function hash(t){
    try{
      const enc = new TextEncoder().encode(t);
      const buf = await crypto.subtle.digest("SHA-256", enc);
      return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
    }catch{
      let h=0; for(let i=0;i<t.length;i++){ h=(h<<5)-h+t.charCodeAt(i); h|=0; } return String(h);
    }
  }
  function mostrarLogin(){
    $("#tab-login").classList.add("active"); $("#tab-register").classList.remove("active");
    $("#login-form").style.display="grid"; $("#register-form").style.display="none";
    $("#tab-login").setAttribute("aria-selected","true"); $("#tab-register").setAttribute("aria-selected","false");
  }
  function mostrarRegistro(){
    $("#tab-register").classList.add("active"); $("#tab-login").classList.remove("active");
    $("#register-form").style.display="grid"; $("#login-form").style.display="none";
    $("#tab-register").setAttribute("aria-selected","true"); $("#tab-login").setAttribute("aria-selected","false");
  }
  async function registrar(){
    const name = ($("#reg-name")?.value || "").trim();
    const email = normEmail($("#reg-email")?.value);
    const pass = $("#reg-pass")?.value || "";
    if(!name || !email || !pass){ alert("Completa todos los campos"); return; }
    const users = getUsers();
    if(users.some(u=>u.email===email)){ alert("Ese email ya está registrado"); return; }
    const passh = await hash(pass);
    users.push({ name, email, passh, createdAt: nowISO() });
    setUsers(users);
    setSess({ email, name, isAdmin: email===ADMIN_EMAIL });
    actualizarUIAuth(); cerrarModal($("#auth-modal")); alert("Cuenta creada.");
  }
  async function login(){
    const email = normEmail($("#login-email")?.value);
    const pass = $("#login-pass")?.value || "";
    if(!email || !pass){ alert("Completa email y contraseña"); return; }
    const users = getUsers(); const u = users.find(u=>u.email===email);
    if(!u){ alert("No existe ese usuario"); return; }
    const passh = await hash(pass);
    if(passh!==u.passh){ alert("Contraseña incorrecta"); return; }
    setSess({ email: u.email, name: u.name, isAdmin: email===ADMIN_EMAIL });
    actualizarUIAuth(); cerrarModal($("#auth-modal")); alert("Sesión iniciada.");
  }
  function logout(){ clearSess(); actualizarUIAuth(); alert("Sesión cerrada."); }
  function adminAccesoRapido(){
    const pin = prompt("PIN admin:");
    if(pin===ADMIN_PIN){ setSess({ email: ADMIN_EMAIL, name:"Administrador", isAdmin:true }); actualizarUIAuth(); abrirModal("admin"); }
    else alert("PIN incorrecto");
  }
  function actualizarUIAuth(){
    const sess = getSess();
    const btn = $("#auth-btn"); const adminBtn = $("#admin-open");
    if(btn){
      if(sess){
        btn.textContent = `👤 ${sess.name || sess.email}`;
        btn.setAttribute("data-open","auth");
        btn.onclick = ()=>{ if(confirm("¿Cerrar sesión?")) logout(); };
      }else{
        btn.textContent = "👤 Acceder";
        btn.onclick = ()=> abrirModal("auth");
      }
    }
    if(adminBtn){ adminBtn.style.display = sess?.isAdmin ? "inline-block" : "none"; }
    const span = $("#admin-session-email"); if(span) span.textContent = sess?.email || "-";
  }

  function renderPedidos(){
    const list = $("#orders-list");
    const filter = $("#orders-filter")?.value || "ALL";
    const orders = getOrders();
    const rows = (filter==="ALL"?orders:orders.filter(o=>o.estado===filter));
    if(!list) return;
    list.innerHTML = rows.length ? "" : '<p class="small">No hay pedidos.</p>';
    rows.forEach(o=>{
      const d = document.createElement("div");
      d.className = "order";
      const fecha = new Date(o.creadoEn).toLocaleString();
      d.innerHTML = `
        <div class="row"><strong>${o.id}</strong><span class="small">${fecha}</span></div>
        <div class="small">Cliente: ${escapeHtml(o.userEmail)}</div>
        <div class="small">Método: ${o.metodo}${o.banco?` (${escapeHtml(o.banco)})`:""}</div>
        <div class="small">Total: ${money(o.total)}</div>
        ${o.nota?`<div class="small"><em>Nota:</em> ${escapeHtml(o.nota)}</div>`:""}
        <div class="row">
          <label>Estado:</label>
          <select data-action="order-status" data-id="${o.id}">
            ${["PENDIENTE","PAGADO","ENTREGADO","CANCELADO"].map(s=>`<option value="${s}" ${o.estado===s?"selected":""}>${s}</option>`).join("")}
          </select>
          <button class="btn" data-action="order-wsp" data-id="${o.id}">Enviar por WhatsApp</button>
        </div>
        <details>
          <summary>Items</summary>
          <ul class="small" style="margin:.25rem 0 0 1rem;">
            ${o.items.map(it=>`<li>${escapeHtml(it.nombre)} — ${it.cantidad} × ${money(it.precio)} (SKU: ${escapeHtml(it.sku)})</li>`).join("")}
          </ul>
        </details>
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
    const msg = `*Pedido Tati Shop – ${id}*\nCliente: ${o.userEmail}\n\n*Artículos:*\n${lines.join("\n")}\n\n*Subtotal:* ${money(o.subtotal)}\n*IVA:* ${money(o.iva)}\n*Total:* ${money(o.total)}\n*Estado:* ${o.estado}\n*Método:* ${o.metodo}${o.banco?` (${o.banco})`:""}`;
    window.open(`https://wa.me/${WSP_NUM}?text=${encodeURIComponent(msg)}`,"_blank");
  }
  function renderUsuarios(){
    const list = $("#users-list"); const users = getUsers();
    if(!list) return;
    list.innerHTML = users.length ? "" : '<p class="small">Sin usuarios registrados.</p>';
    users.forEach(u=>{
      const d = document.createElement("div"); d.className="order";
      const fecha = new Date(u.createdAt).toLocaleString();
      d.innerHTML = `
        <div class="row"><strong>${escapeHtml(u.name || "(sin nombre)")}</strong><span class="small">${escapeHtml(u.email)}</span></div>
        <div class="small">Registrado: ${fecha}</div>
      `;
      list.appendChild(d);
    });
  }

  function renderCodesStats(){
    const box = $("#codes-stats"); if(!box) return;
    const codes = getCodes();
    const libres = codes.filter(c=>!c.assignedToOrder).length;
    const usados  = codes.filter(c=>c.usedAt).length;
    box.innerHTML = `
      <div class="card"><strong>Total códigos:</strong> ${codes.length}</div>
      <div class="card"><strong>Disponibles:</strong> ${libres}</div>
      <div class="card"><strong>Asignados/Usados:</strong> ${codes.length - libres}</div>
      <div class="card"><strong>Marcados usados:</strong> ${usados}</div>
    `;
  }

  function parseCSV(text){
    const rows = text.split(/\r?\n/).map(r=>r.trim()).filter(Boolean);
    const out = [];
    for(const r of rows){
      const [idItem, code] = r.split(",").map(x=>x?.trim());
      if(idItem && code) out.push({ idItem, code });
    }
    return out;
  }
  function importCodesFromCSV(file){
    if(!file) return;
    const fr = new FileReader();
    fr.onload = () => {
      try{
        const arr = parseCSV(String(fr.result || ""));
        if(!arr.length){ alert("CSV vacío o sin columnas válidas (idItem,code)"); return; }
        const codes = getCodes();
        let add=0;
        arr.forEach(x=>{
          if(!codes.some(c=>c.idItem===x.idItem && c.code===x.code)){
            codes.push({ ...x, usedAt:null, assignedToOrder:null });
            add++;
          }
        });
        setCodes(codes);
        alert(`Importados ${add} códigos.`);
        renderCodesStats();
      }catch(e){ console.error(e); alert("Error leyendo CSV"); }
    };
    fr.readAsText(file);
  }

  function assignCodeManual(){
    const orderId = ($("#manual-order")?.value || "").trim();
    const itemId  = ($("#manual-item")?.value || "").trim();
    const codeStr = ($("#manual-code")?.value || "").trim();
    if(!orderId || !itemId || !codeStr){ alert("Completa pedido, item y código"); return; }
    const orders = getOrders();
    const o = orders.find(x=>x.id===orderId);
    if(!o){ alert("No existe el pedido"); return; }
    const it = o.items.find(i=> i.id===itemId || i.sku===itemId );
    if(!it){ alert("No existe ese item en el pedido"); return; }
    it.code = codeStr;
    setOrders(orders);
    alert("Código asignado al item.");
    renderPedidos();
  }

  function cargarAdmin(){
    renderPedidos();
    renderUsuarios();
    renderCodesStats();
  }


  // Add category mapping
  const cardCategories = {
    amazon: "shopping", google: "gaming", psn: "gaming", xbox: "gaming", 
    steam: "gaming", apple: "shopping", spotify: "streaming", netflix: "streaming",
    disney: "streaming", uber: "lifestyle", airbnb: "lifestyle", starbucks: "lifestyle",
    tiktok: "lifestyle", epicgames: "gaming", nike: "shopping", adidas: "shopping",
    sephora: "shopping", walmart: "shopping", target: "shopping", bestbuy: "shopping",
    hbo: "streaming", homeDepot: "shopping", lowes: "shopping", rolex: "lifestyle",
    discord: "gaming", facebook: "lifestyle", roblox: "gaming", visa: "shopping", 
    mastercard: "shopping"
  };

  const categoryNames = {
    gaming: "Gaming",
    streaming: "Streaming", 
    shopping: "Compras",
    lifestyle: "Estilo de vida"
  };

  function renderGiftCards(filterCategory = 'all'){
    const c = document.getElementById("giftcards-grid");
    if(!c) return;
    c.innerHTML = "";
    
    const filteredCards = filterCategory === 'all' 
      ? giftcards 
      : giftcards.filter(gc => cardCategories[gc.id] === filterCategory);
    
    filteredCards.forEach(gc=>{
      const selectId = `select-${gc.id}`;
      const category = cardCategories[gc.id] || 'lifestyle';
      const d = document.createElement("div");
      d.className = "card";
      d.innerHTML = `
        <div class="card-image">
          <span class="tag ${category}">${categoryNames[category] || 'General'}</span>
          <img src="${gc.logo}"
               alt="${escapeHtml(gc.nombre)}"
               referrerpolicy="no-referrer" crossorigin="anonymous"
               onerror="this.onerror=null; this.src='img/default.svg'">
        </div>
        <div class="card-content">
          <h3>${escapeHtml(gc.nombre)}</h3>
          <p>${escapeHtml(descripciones[gc.id] || "Selecciona un monto:")}</p>
          <select id="${selectId}">
            ${gc.montos.map(m=>`<option value="${m}">${money(m)}</option>`).join("")}
          </select>
          <div class="row">
            <button data-add="${gc.id}" data-name="${escapeHtml(gc.nombre)}" data-select="${selectId}">Agregar</button>
            <button class="primary" data-buy-now="${gc.id}" data-name="${escapeHtml(gc.nombre)}" data-select="${selectId}">Comprar</button>
          </div>
        </div>
      `;
      c.appendChild(d);
    });
  }

  function agregarAlCarrito(id,nombre,selectId){
    const sel = document.getElementById(selectId);
    const monto = Number(sel?.value || 0);
    if(!monto || isNaN(monto)){ alert("Selecciona un monto válido"); return; }
    const cart = getCart(); cart.push({ id, nombre, precio:monto, cantidad:1 });
    setCart(cart); renderCart();

    const cc = document.getElementById("cart-count");
    cc?.classList.remove("bump"); void cc?.offsetWidth; cc?.classList.add("bump");
  }

  function comprarAhora(id,nombre,selectId){
    agregarAlCarrito(id,nombre,selectId);
    abrirModal("cart");
  }

  const slideshowIds = ["amazon","psn","google","xbox","spotify","netflix","disney","steam"];
  let slideIndex=0, slideTimer=null;

  function setSlideBackground(id){
    const [c1,c2] = brandBg[id] || ["#7c5cff","#2ee6a6"];
    const bg = document.getElementById("slide-bg");
    if(!bg) return;
    bg.classList.remove("show");
    bg.style.setProperty("--c1",c1);
    bg.style.setProperty("--c2",c2);
    void bg.offsetWidth;
    bg.classList.add("show");
  }
  function pintarSlide(index){
    const id = slideshowIds[index];
    const it = giftcards.find(g=>g.id===id);
    const card = document.getElementById("slide-card");
    const desc = descripciones[id] || "";
    if(!it || !card) return;
    setSlideBackground(id);
    card.classList.remove("active");
    card.innerHTML = `
      <img src="${it.logo}" alt="${escapeHtml(it.nombre)}"
           referrerpolicy="no-referrer" crossorigin="anonymous"
           onerror="this.onerror=null; this.src='img/cards/default.svg'">
      <h3>${escapeHtml(it.nombre)}</h3>
      <p>${escapeHtml(desc)}</p>
    `;
    void card.offsetWidth;
    card.classList.add("active");
    document.querySelectorAll("#slide-dots button").forEach((b,i)=>b.classList.toggle("active",i===index));
  }
  function slideNext(){ slideIndex=(slideIndex+1)%slideshowIds.length; pintarSlide(slideIndex); }
  function slidePrev(){ slideIndex=(slideIndex-1+slideshowIds.length)%slideshowIds.length; pintarSlide(slideIndex); }
  function iniciarAutoSlide(){ detenerAutoSlide(); slideTimer=setInterval(slideNext,3000); }
  function detenerAutoSlide(){ if(slideTimer) clearInterval(slideTimer); slideTimer=null; }
  function initSlideshow(){
    const dots = document.getElementById("slide-dots"); if(!dots) return;
    dots.innerHTML="";
    slideshowIds.forEach((_,i)=>{
      const b = document.createElement("button");
      b.setAttribute("aria-label", `Ir a la diapositiva ${i+1}`);
      b.addEventListener("click",()=>{ slideIndex=i; pintarSlide(slideIndex); iniciarAutoSlide(); });
      dots.appendChild(b);
    });
    document.getElementById("slide-next")?.addEventListener("click",()=>{ slideNext(); iniciarAutoSlide(); });
    document.getElementById("slide-prev")?.addEventListener("click",()=>{ slidePrev(); iniciarAutoSlide(); });
    const ss = document.getElementById("slideshow");
    ss?.addEventListener("mouseenter",detenerAutoSlide);
    ss?.addEventListener("mouseleave",iniciarAutoSlide);
    pintarSlide(slideIndex); iniciarAutoSlide();
  }

  function cargarMisPedidos(){
    const sess = getSess();
    const my = (sess?.email) ? getOrders().filter(o=>o.userEmail===sess.email) : [];
    const cont = $("#my-orders");
    const tplRow = document.getElementById("order-row-tpl");
    const tplItem = document.getElementById("order-item-tpl");
    if(!cont || !tplRow || !tplItem) return;

    cont.innerHTML = my.length ? "" : '<p class="small">Aún no tienes pedidos.</p>';

    my.forEach(o=>{
      const node = tplRow.content.cloneNode(true);
      node.querySelector('[data-fn="order-number"]').textContent = o.id;
      node.querySelector('[data-fn="order-date"]').textContent   = new Date(o.creadoEn).toLocaleString();
      const st = node.querySelector('[data-fn="order-status"]');
      st.textContent = o.estado;
      st.classList.add(`status-${o.estado}`);

      const itemsWrap = node.querySelector('[data-fn="order-items"]');

      o.items.forEach(it=>{
        const iNode = tplItem.content.cloneNode(true);
        iNode.querySelector('[data-fn="item-name"]').textContent = it.nombre;
        iNode.querySelector('[data-fn="item-sku"]').textContent  = it.sku;

        const codeBox = iNode.querySelector('[data-fn="code-mask"]');
        const btnReveal = iNode.querySelector('[data-fn="btn-reveal"]');
        const btnCopy   = iNode.querySelector('[data-fn="btn-copy"]');

        const hasCode = Boolean(it.code);
        const canReveal = hasCode && (o.estado === "ENTREGADO" || o.estado === "PAGADO");

        codeBox.classList.toggle("masked", hasCode && !canReveal);
        codeBox.classList.toggle("revealed", false);
        codeBox.textContent = hasCode ? (canReveal ? it.code : "") : "Sin código asignado aún.";

        btnReveal.hidden = !(hasCode && !canReveal);
        btnCopy.hidden   = !canReveal;

        iNode.querySelector('[data-action="reveal"]')?.addEventListener("click", ()=>{
          if(o.estado === "PENDIENTE" || o.estado === "CANCELADO"){
            alert("Tu pedido aún no está listo para revelar el código.");
            return;
          }
          codeBox.classList.remove("masked");
          codeBox.classList.add("revealed");
          codeBox.textContent = it.code || "—";
          btnCopy.hidden = !it.code;
        });

        iNode.querySelector('[data-action="copy"]')?.addEventListener("click", async ()=>{
          try{
            await navigator.clipboard.writeText(it.code || "");
            alert("Código copiado");
          }catch{ alert("No se pudo copiar"); }
        });

        itemsWrap.appendChild(iNode);
      });

      cont.appendChild(node);
    });
  }

  // Search functionality
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchGiftCards(query);
      });
    }
  }

  function searchGiftCards(query) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';
      const isVisible = !query || title.includes(query) || description.includes(query);
      card.style.display = isVisible ? 'block' : 'none';
    });
  }

  // Category filtering
  function initCategoryFilters() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active state
        categoryItems.forEach(cat => cat.classList.remove('active'));
        item.classList.add('active');
        
        // Filter cards
        const category = item.getAttribute('data-category');
        renderGiftCards(category);
      });
    });
  }


  document.addEventListener("click",(e)=>{
    const add = e.target.closest("[data-add]");
    if(add){
      const id = add.getAttribute("data-add");
      const name = add.getAttribute("data-name");
      const sel = add.getAttribute("data-select");
      agregarAlCarrito(id,name,sel);
    }
    const buy = e.target.closest("[data-buy-now]");
    if(buy){
      const id = buy.getAttribute("data-buy-now");
      const name = buy.getAttribute("data-name");
      const sel = buy.getAttribute("data-select");
      comprarAhora(id,name,sel);
    }

    const vaciar = e.target.closest('[data-action="vaciar"]');
    if(vaciar){ setCart([]); renderCart(); }

    const pagar = e.target.closest('[data-action="pagar"]');
    if(pagar){ procesarPago(); }

    const wspc = e.target.closest('[data-action="wsp-contact"]');
    if(wspc){ enviarWhatsAppContacto(); }

    const selStatus = e.target.closest('select[data-action="order-status"]');
    if(selStatus){
      cambiarEstado(selStatus.getAttribute("data-id"), selStatus.value);
    }
    const wspBtn = e.target.closest('button[data-action="order-wsp"]');
    if(wspBtn){ enviarWhatsDePedido(wspBtn.getAttribute("data-id")); }

    if(e.target.matches('[data-action="codes-download-template"]')){
      const csv = "idItem,code\napple-123,AAAA-BBBB-CCCC\nxbox-987,XXXX-YYYY-ZZZZ\n";
      const blob = new Blob([csv], {type:"text/csv"});
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = "plantilla_codigos.csv"; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
    }
    if(e.target.matches('[data-action="assign-code"]')) assignCodeManual();
  });

  document.addEventListener("change",(e)=>{
    if(e.target.matches('[data-action="codes-import"]')){
      importCodesFromCSV(e.target.files?.[0]);
      e.target.value = "";
    }
    if(e.target.matches('[data-action="filter-orders"]')){
      renderPedidos();
    }
  });

  function init(){
    actualizarUIAuth();
    initHeaderScroll();
    initSlideshow();
    renderGiftCards();
    renderCart();
    initSearch();
    initCategoryFilters();

    const bankSelect = document.getElementById("transfer-bank");
    if(bankSelect){ bankSelect.value="Cuscatlán"; bankSelect.dispatchEvent(new Event("change")); }
    updateTransferVisibility();

    document.querySelector('[data-auth-tab="login"]')?.addEventListener("click", mostrarLogin);
    document.querySelector('[data-auth-tab="register"]')?.addEventListener("click", mostrarRegistro);

    document.querySelector('[data-action="login"]')?.addEventListener("click", login);
    document.querySelector('[data-action="register"]')?.addEventListener("click", registrar);
    document.querySelector('[data-action="logout"]')?.addEventListener("click", logout);
    document.querySelector('[data-action="admin-quick"]')?.addEventListener("click", adminAccesoRapido);

    window.app = Object.assign(window.app || {}, {
      cargarMisPedidos,
      cargarAdmin
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();

:root{
  --bg1:#0ea5e9;
  --bg2:#6366f1;
  --card:#0b1220;
  --text:#e5e7eb;
  --muted:#9ca3af;
  --border: rgba(255,255,255,.08);
  --shadow: 0 10px 30px rgba(0,0,0,.25);
}

*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}
body{
  min-height:100vh;
  background: linear-gradient(135deg,var(--bg1),var(--bg2));
  padding:24px;
  color:var(--text);
}

.app{max-width:1100px;margin:auto;}

.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  padding:20px;
  border-radius:22px;
  background: rgba(0,0,0,.25);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
}

.header h1{font-size:28px;}
.subtitle{color:var(--muted);margin-top:6px;}

.clockBox{
  padding:14px 18px;
  border-radius:18px;
  background: rgba(255,255,255,.06);
  border: 1px solid var(--border);
  min-width:190px;
  text-align:center;
}
.clockLabel{color:var(--muted);font-size:12px;}
#clock{font-size:22px;margin-top:6px;letter-spacing:1px;}

.grid{
  display:grid;
  grid-template-columns: 1fr 1.2fr;
  gap:18px;
  margin-top:18px;
}

.card{
  border-radius:22px;
  background: rgba(0,0,0,.28);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  padding:18px;
  backdrop-filter: blur(10px);
}

.card h3{font-size:20px;margin-bottom:14px;}

.form{display:flex;flex-direction:column;gap:12px;}
.field label{font-size:13px;color:var(--muted);display:block;margin-bottom:6px;}
.field input{
  width:100%;
  padding:12px 14px;
  border-radius:14px;
  border:1px solid var(--border);
  outline:none;
  background: rgba(255,255,255,.06);
  color:var(--text);
  font-size:15px;
}
.field input:focus{border-color: rgba(255,255,255,.25);}

.btn{
  padding:12px 14px;
  border:none;
  border-radius:16px;
  font-weight:700;
  cursor:pointer;
  transition:.2s;
  font-size:15px;
}
.btn:hover{transform: translateY(-2px);}
.primary{background: linear-gradient(135deg,#22c55e,#16a34a); color:#04110a;}
.danger{background: linear-gradient(135deg,#fb7185,#ef4444); color:#1a0206;}
.warning{background: linear-gradient(135deg,#fbbf24,#f59e0b); color:#1a1200;}
.big{font-size:18px;padding:16px 18px;border-radius:18px;}

.listHeader{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:12px;
}
.badge{
  padding:6px 10px;
  border-radius:999px;
  background: rgba(255,255,255,.10);
  border: 1px solid var(--border);
  color: var(--text);
  font-size:12px;
}

.scheduleList{
  display:flex;
  flex-direction:column;
  gap:12px;
  max-height:420px;
  overflow:auto;
  padding-right:6px;
}

.item{
  border-radius:18px;
  padding:14px;
  background: rgba(255,255,255,.06);
  border:1px solid var(--border);
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:center;
}
.item .left{
  display:flex;
  flex-direction:column;
  gap:4px;
}
.item .title{font-size:16px;font-weight:800;}
.item .meta{color:var(--muted);font-size:13px;}
.item .time{
  font-size:16px;
  font-weight:900;
  padding:8px 10px;
  border-radius:14px;
  background: rgba(0,0,0,.25);
  border:1px solid var(--border);
  min-width:92px;
  text-align:center;
}
.item.done{
  opacity:.55;
  filter: grayscale(.2);
}
.smallBtn{
  padding:10px 12px;
  border-radius:14px;
  font-size:13px;
  font-weight:800;
}

.footer{
  margin-top:18px;
  text-align:center;
  color: rgba(255,255,255,.85);
  font-size:13px;
}

/* modal */
.modal{
  position:fixed;
  inset:0;
  display:flex;
  justify-content:center;
  align-items:center;
  background: rgba(0,0,0,.55);
  padding:20px;
  z-index:999;
}
.hidden{display:none;}
.modalContent{
  width:min(520px,100%);
  border-radius:26px;
  padding:20px;
  background: rgba(15,23,42,.92);
  border:1px solid var(--border);
  box-shadow: 0 30px 80px rgba(0,0,0,.5);
  text-align:center;
  animation: pop .2s ease-out;
}
.modalContent h2{font-size:24px;margin-bottom:8px;}
.modalContent p{color:var(--muted);margin-bottom:16px;font-size:15px;}
.modalActions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}

@keyframes pop{
  from{transform:scale(.95);opacity:.2;}
  to{transform:scale(1);opacity:1;}
}

@media(max-width:900px){
  .grid{grid-template-columns:1fr;}
  .header{flex-direction:column;align-items:flex-start;}
  .clockBox{width:100%;}
}

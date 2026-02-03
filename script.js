  :root{
  --bg1:#0f172a;
  --bg2:#1e293b;
  --card:#111827;
  --accent:#38bdf8;
  --accent2:#22c55e;
  --danger:#ef4444;
  --text:#e5e7eb;
  --muted:#94a3b8;
}

*{margin:0;padding:0;box-sizing:border-box;font-family:system-ui, Arial, sans-serif;}

body{
  min-height:100vh;
  background: radial-gradient(circle at top, #1e40af 0%, var(--bg1) 55%, #020617 100%);
  display:flex;
  justify-content:center;
  padding:25px;
  color:var(--text);
}

.app{
  width:100%;
  max-width:900px;
  display:flex;
  flex-direction:column;
  gap:18px;
}

.header{
  padding:22px;
  border-radius:18px;
  background: linear-gradient(135deg, rgba(56,189,248,.2), rgba(34,197,94,.1));
  border:1px solid rgba(255,255,255,.08);
  backdrop-filter: blur(10px);
}

.header h1{
  font-size:28px;
  margin-bottom:6px;
}
.header p{
  color:var(--muted);
}

.card{
  padding:18px;
  border-radius:18px;
  background: rgba(17,24,39,.92);
  border:1px solid rgba(255,255,255,.08);
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}

.card h2{
  font-size:18px;
  margin-bottom:14px;
}

.grid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:12px;
  margin-bottom:12px;
}

.field label{
  font-size:13px;
  color:var(--muted);
  display:block;
  margin-bottom:6px;
}

.field input{
  width:100%;
  padding:12px;
  border-radius:12px;
  border:1px solid rgba(255,255,255,.12);
  outline:none;
  background: rgba(2,6,23,.65);
  color:var(--text);
}

.field input:focus{
  border-color: rgba(56,189,248,.7);
  box-shadow: 0 0 0 3px rgba(56,189,248,.15);
}

.btn{
  padding:12px 14px;
  border:none;
  border-radius:12px;
  cursor:pointer;
  font-weight:600;
  background: linear-gradient(135deg, var(--accent), #60a5fa);
  color:#00111a;
  transition:.2s;
}

.btn:hover{transform: translateY(-2px);}
.btn:active{transform: translateY(0);}

.btn.danger{
  background: linear-gradient(135deg, var(--danger), #fb7185);
  color:#fff;
}

.card-title{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  margin-bottom:12px;
}

.list{
  display:flex;
  flex-direction:column;
  gap:12px;
}

.item{
  padding:14px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.08);
  background: rgba(2,6,23,.6);
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
}

.item .info{
  display:flex;
  flex-direction:column;
  gap:4px;
}

.item .info strong{
  font-size:16px;
}
.item .info span{
  color:var(--muted);
  font-size:13px;
}

.badge{
  padding:6px 10px;
  border-radius:999px;
  font-size:12px;
  font-weight:700;
}

.badge.wait{ background: rgba(56,189,248,.18); color: var(--accent);}
.badge.done{ background: rgba(34,197,94,.18); color: var(--accent2);}
.badge.late{ background: rgba(239,68,68,.18); color: #fb7185;}

.actions{
  display:flex;
  gap:8px;
}

.small-btn{
  padding:10px 12px;
  border-radius:12px;
  border:none;
  cursor:pointer;
  font-weight:700;
}

.small-btn.check{
  background: rgba(34,197,94,.2);
  color: var(--accent2);
  border:1px solid rgba(34,197,94,.35);
}

.small-btn.del{
  background: rgba(239,68,68,.18);
  color:#fb7185;
  border:1px solid rgba(239,68,68,.3);
}

.small-btn:disabled{
  opacity:.5;
  cursor:not-allowed;
}

.error{
  margin-top:8px;
  color:#fb7185;
  font-size:13px;
}

.hint{
  margin-top:12px;
  color:var(--muted);
  font-size:12px;
}

@media(max-width:720px){
  .grid{grid-template-columns:1fr;}
}

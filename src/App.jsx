import { useState, useEffect } from "react";
import { supabase } from './supabase';
 
const C = {
  bg:"#09090c",surface:"#111217",card:"#15171f",border:"#1d2030",
  accent:"#2357e8",accentBright:"#4a7bff",accentGlow:"rgba(35,87,232,0.12)",
  gold:"#f59e0b",green:"#22c55e",red:"#ef4444",orange:"#f97316",
  purple:"#a855f7",purpleGlow:"rgba(168,85,247,0.12)",
  text:"#eef0f6",textMuted:"#5a6380",textDim:"#2a3050",
};
 
const TABS = ["APPLY","CHECK-IN","MY TRACKER","COACH","TRENDS"];
 
// ─── AUTH SCREEN ─────────────────────────────────────────────────────────────
function AuthScreen({mode,setMode}){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
 
  const handleAuth=async()=>{
    setLoading(true);
    setError('');
    if(mode==='login'){
      const {error}=await supabase.auth.signInWithPassword({email,password});
      if(error)setError(error.message);
    } else {
      const {error}=await supabase.auth.signUp({email,password});
      if(error)setError(error.message);
      else setError('Check your email to confirm your account!');
    }
    setLoading(false);
  };
 
  return(
    <div style={{minHeight:'100vh',background:'#09090c',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{width:'100%',maxWidth:400}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:28,fontWeight:900,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.07em",color:'#eef0f6'}}>MILLER <span style={{color:'#4a7bff'}}>MUSCLE</span></div>
          <div style={{fontSize:10,color:'#5a6380',letterSpacing:"0.18em",marginTop:4}}>OPERATING SYSTEM</div>
        </div>
        <div style={{background:'#15171f',border:'1px solid #1d2030',borderRadius:14,padding:24}}>
          <div style={{fontSize:16,fontWeight:800,color:'#eef0f6',fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.05em",marginBottom:20}}>{mode==='login'?'COACH / CLIENT LOGIN':'CREATE ACCOUNT'}</div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div>
              <div style={{fontSize:11,color:'#5a6380',letterSpacing:"0.07em",textTransform:'uppercase',marginBottom:7,fontWeight:600}}>Email</div>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"
                style={{width:'100%',background:'#111217',border:'1px solid #1d2030',borderRadius:9,padding:'11px 14px',color:'#eef0f6',fontSize:14,fontFamily:"'Barlow',sans-serif",outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div>
              <div style={{fontSize:11,color:'#5a6380',letterSpacing:"0.07em",textTransform:'uppercase',marginBottom:7,fontWeight:600}}>Password</div>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"
                style={{width:'100%',background:'#111217',border:'1px solid #1d2030',borderRadius:9,padding:'11px 14px',color:'#eef0f6',fontSize:14,fontFamily:"'Barlow',sans-serif",outline:'none',boxSizing:'border-box'}}/>
            </div>
            {error&&<div style={{fontSize:12,color:error.includes('Check')?'#22c55e':'#ef4444',padding:'8px 12px',background:error.includes('Check')?'#22c55e15':'#ef444415',borderRadius:8}}>{error}</div>}
            <button onClick={handleAuth} disabled={loading}
              style={{padding:'13px 0',background:'#2357e8',border:'none',borderRadius:10,color:'#fff',fontSize:13,fontWeight:800,letterSpacing:"0.09em",cursor:'pointer',opacity:loading?0.7:1}}>
              {loading?'...':(mode==='login'?'LOGIN':'CREATE ACCOUNT')}
            </button>
            <button onClick={()=>setMode(mode==='login'?'signup':'login')}
              style={{padding:'10px 0',background:'transparent',border:'1px solid #1d2030',borderRadius:10,color:'#5a6380',fontSize:12,fontWeight:600,cursor:'pointer'}}>
              {mode==='login'?'New client? Create account':'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
// ─── SHARED UI ────────────────────────────────────────────────────────────────
const ST = ({children,color=C.accentBright})=>(
  <div style={{fontSize:10,color,letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:800,marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:3,height:14,background:color,borderRadius:2}}/>
    {children}
  </div>
);
const Lbl = ({children})=><div style={{fontSize:11,color:C.textMuted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:7,fontWeight:600}}>{children}</div>;
const TI = ({label,value,onChange,placeholder,type="text"})=>(
  <div>{label&&<Lbl>{label}</Lbl>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",color:C.text,fontSize:14,fontFamily:"'Barlow',sans-serif",outline:"none",boxSizing:"border-box"}}
      onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
  </div>
);
const TA = ({label,value,onChange,placeholder,rows=3})=>(
  <div>{label&&<Lbl>{label}</Lbl>}
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",color:C.text,fontSize:13,fontFamily:"'Barlow',sans-serif",outline:"none",resize:"none",lineHeight:1.6,boxSizing:"border-box"}}
      onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
  </div>
);
const Pills = ({label,options,value,onChange,multi=false,color=C.accent})=>(
  <div>{label&&<Lbl>{label}</Lbl>}
    <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
      {options.map(opt=>{
        const active=multi?(value||[]).includes(opt):value===opt;
        return <button key={opt} onClick={()=>multi?onChange(active?(value||[]).filter(x=>x!==opt):[...(value||[]),opt]):onChange(opt)}
          style={{padding:"8px 13px",background:active?color:C.surface,border:`1px solid ${active?color:C.border}`,borderRadius:8,color:active?"#fff":C.textMuted,fontSize:12,fontWeight:active?700:400,cursor:"pointer",transition:"all 0.15s"}}>{opt}</button>;
      })}
    </div>
  </div>
);
const Scale = ({label,value,onChange,min=0,max=5,lo,hi,inv=false})=>{
  const gc=(v)=>{const s=inv?max-v:v;const p=s/max;return p>=0.6?C.green:p>=0.3?C.gold:C.red;};
  return <div>{label&&<Lbl>{label}</Lbl>}
    <div style={{display:"flex",gap:6}}>
      {Array.from({length:max-min+1},(_,i)=>i+min).map(n=>(
        <button key={n} onClick={()=>onChange(n)}
          style={{flex:1,padding:"11px 0",background:value===n?gc(n):C.surface,border:`1px solid ${value===n?gc(n):C.border}`,borderRadius:8,color:value===n?"#fff":C.textMuted,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif"}}>
          {n}
        </button>
      ))}
    </div>
    {(lo||hi)&&<div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{fontSize:9,color:C.textDim}}>{lo}</span><span style={{fontSize:9,color:C.textDim}}>{hi}</span></div>}
  </div>;
};
const Flag = ({type,msg})=>{
  const cols={red:C.red,orange:C.orange,green:C.green,purple:C.purple};
  const icons={red:"⚠",orange:"◆",green:"✓",purple:"◉"};
  const col=cols[type];
  return <div style={{display:"flex",gap:9,padding:"9px 13px",background:`${col}12`,border:`1px solid ${col}35`,borderRadius:9,marginBottom:6}}>
    <span style={{color:col,fontSize:11,flexShrink:0,marginTop:1}}>{icons[type]}</span>
    <span style={{fontSize:12,color:C.text,lineHeight:1.5}}>{msg}</span>
  </div>;
};
const StepBar = ({steps,current})=>(
  <div style={{display:"flex",gap:3,marginBottom:22}}>
    {steps.map((s,i)=>(
      <div key={s} style={{flex:1}}>
        <div style={{height:3,borderRadius:2,background:i<=current?C.accent:C.border,transition:"background 0.3s"}}/>
        <div style={{fontSize:8,color:i<=current?C.accentBright:C.textDim,letterSpacing:"0.06em",marginTop:4,textAlign:"center",fontWeight:i===current?700:400}}>{s}</div>
      </div>
    ))}
  </div>
);
const Btns = ({step,total,onBack,onNext,nextLabel})=>(
  <div style={{display:"flex",gap:10,marginTop:24}}>
    {step>0&&<button onClick={onBack} style={{flex:1,padding:"13px 0",background:"transparent",border:`1px solid ${C.border}`,borderRadius:10,color:C.textMuted,fontSize:12,fontWeight:800,cursor:"pointer"}}>← BACK</button>}
    <button onClick={onNext} style={{flex:2,padding:"13px 0",background:step===total-1?C.green:C.accent,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:800,letterSpacing:"0.09em",cursor:"pointer"}}>
      {nextLabel||(step===total-1?"✓ SUBMIT":"CONTINUE →")}
    </button>
  </div>
);
const Done = ({title,sub,onBack})=>(
  <div style={{textAlign:"center",padding:"60px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
    <div style={{width:76,height:76,borderRadius:"50%",background:`${C.green}18`,border:`2px solid ${C.green}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>✓</div>
    <div style={{fontSize:22,fontWeight:800,fontFamily:"'Barlow Condensed',sans-serif",color:C.green,letterSpacing:"0.05em"}}>{title}</div>
    <div style={{fontSize:13,color:C.textMuted,lineHeight:1.7,maxWidth:280}}>{sub}</div>
    <button onClick={onBack} style={{marginTop:8,padding:"11px 22px",background:"transparent",border:`1px solid ${C.border}`,borderRadius:10,color:C.textMuted,fontSize:12,fontWeight:700,cursor:"pointer"}}>EDIT</button>
  </div>
);
 
// ═══════════════════════════════════════════════════════════════════════════════
// APPLY FORM
// ═══════════════════════════════════════════════════════════════════════════════
function ApplyForm({onDone}){
  const [step,setStep]=useState(0);
  const [d,setD]=useState({fn:"",ln:"",email:"",phone:"",age:"",ig:"",weight:"",height:"",gender:"",days:"",dow:[],time:"",location:"",exp:"",level:"",program:"",goal:[],comp:"",div:"",weak:[],vision:"",nut:"",nutCon:"",meals:"",dig:[],sleep:"",stress:"",work:"",blockers:"",why:"",past:"",ready:"",willing:[],prior:"",concerns:"",money:"",extra:""});
  const s=(k,v)=>setD(p=>({...p,[k]:v}));
  const STEPS=["INFO","TRAINING","GOALS","LIFESTYLE","COMMITMENT"];
  const pages=[
    <div key="a" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Personal Information</ST>
      <div style={{display:"flex",gap:10}}><TI label="First Name" value={d.fn} onChange={v=>s("fn",v)} placeholder="John"/><TI label="Last Name" value={d.ln} onChange={v=>s("ln",v)} placeholder="Smith"/></div>
      <TI label="Email" value={d.email} onChange={v=>s("email",v)} placeholder="you@email.com" type="email"/>
      <TI label="Phone" value={d.phone} onChange={v=>s("phone",v)} placeholder="555-000-0000"/>
      <div style={{display:"flex",gap:10}}><TI label="Age" value={d.age} onChange={v=>s("age",v)} placeholder="38" type="number"/><TI label="Weight (lbs)" value={d.weight} onChange={v=>s("weight",v)} placeholder="192"/><TI label="Height" value={d.height} onChange={v=>s("height",v)} placeholder="5'11"/></div>
      <TI label="IG / Social Handle" value={d.ig} onChange={v=>s("ig",v)} placeholder="@username"/>
      <Pills label="Gender" options={["Male","Female","Prefer not to say"]} value={d.gender} onChange={v=>s("gender",v)}/>
    </div>,
    <div key="b" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Training Schedule & Experience</ST>
      <Pills label="Days per week you can train" options={["2-3","3-4","4-5","5-6"]} value={d.days} onChange={v=>s("days",v)}/>
      <Pills label="Which days?" options={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} value={d.dow} onChange={v=>s("dow",v)} multi/>
      <Pills label="Training time" options={["Before work","Mid day","Evening","Late night"]} value={d.time} onChange={v=>s("time",v)}/>
      <Pills label="Where do you train" options={["Commercial gym","Studio","Home","Private"]} value={d.location} onChange={v=>s("location",v)}/>
      <Pills label="Training experience" options={["New","6–12 months","1–3 years","3+ years"]} value={d.exp} onChange={v=>s("exp",v)}/>
      <Pills label="Training level" options={["Beginner","Intermediate","Advanced"]} value={d.level} onChange={v=>s("level",v)}/>
      <Pills label="Currently follow a program?" options={["Yes — written","Kind of","No"]} value={d.program} onChange={v=>s("program",v)}/>
    </div>,
    <div key="c" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Physique Goals & Competition</ST>
      <Pills label="Primary goal" options={["Fat loss","Lean muscle","Recomp","Contest prep","General health"]} value={d.goal} onChange={v=>s("goal",v)} multi/>
      <Pills label="Competing?" options={["Yes — within 3 months","Yes — within 6 months","Yes — later this year","Planning to compete","No — lifestyle"]} value={d.comp} onChange={v=>s("comp",v)}/>
      {d.comp&&d.comp!=="No — lifestyle"&&<Pills label="Division" options={["Bodybuilding","Classic","Men's Physique","Bikini","Wellness","Figure","Women's Physique","Fit Model"]} value={d.div} onChange={v=>s("div",v)}/>}
      <Pills label="Biggest weak points" options={["Legs/Glutes","Back","Chest","Shoulders","Arms","Conditioning","Overall size"]} value={d.weak} onChange={v=>s("weak",v)} multi/>
      <TA label="What does success look like in 12 weeks?" value={d.vision} onChange={v=>s("vision",v)} placeholder="Be specific"/>
    </div>,
    <div key="d" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Nutrition, Recovery & Lifestyle</ST>
      <Pills label="Current nutrition approach" options={["Full meal plan","Tracking macros","Some structure","None"]} value={d.nut} onChange={v=>s("nut",v)}/>
      <Pills label="Nutrition consistency" options={["1 — Bad","2 — OK","3 — Solid","4 — On point"]} value={d.nutCon} onChange={v=>s("nutCon",v)}/>
      <Pills label="Meals per day" options={["1–2","3","4","5+"]} value={d.meals} onChange={v=>s("meals",v)}/>
      <Pills label="Digestion issues" options={["Bloating","Reflux","Constipation","Diarrhea","Low appetite","None"]} value={d.dig} onChange={v=>s("dig",v)} multi/>
      <Pills label="Average sleep" options={["Under 5 hrs","5–6 hrs","6–7 hrs","7–8 hrs","8+ hrs"]} value={d.sleep} onChange={v=>s("sleep",v)}/>
      <Pills label="Stress level" options={["Very high","High","Moderate","Low"]} value={d.stress} onChange={v=>s("stress",v)}/>
      <Pills label="Work schedule" options={["Fixed","Rotating shifts","Nights","Multiple jobs","Flexible"]} value={d.work} onChange={v=>s("work",v)}/>
      <TA label="What kills your consistency?" value={d.blockers} onChange={v=>s("blockers",v)} placeholder="Be honest"/>
    </div>,
    <div key="e" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Coaching Fit & Commitment</ST>
      <TA label="Why coaching, why now?" value={d.why} onChange={v=>s("why",v)} placeholder="Real reason"/>
      <TA label="What's stopped you before?" value={d.past} onChange={v=>s("past",v)} placeholder="Be real"/>
      <Pills label="Readiness (1–5)" options={["1 — Not ready","2","3","4","5 — All in"]} value={d.ready} onChange={v=>s("ready",v)}/>
      <Pills label="Willing to: (select all)" options={["Track food","Train as prescribed","Weekly check-ins","Be honest","Adjust when needed"]} value={d.willing} onChange={v=>s("willing",v)} multi/>
      <Pills label="Prior coaching?" options={["Yes — good","Yes — bad","No, first time"]} value={d.prior} onChange={v=>s("prior",v)}/>
      <TA label="What worries you about coaching?" value={d.concerns} onChange={v=>s("concerns",v)} placeholder="No judgment"/>
      <Pills label="Financially ready?" options={["Yes — ready","Possibly","Not right now"]} value={d.money} onChange={v=>s("money",v)}/>
      <TA label="Anything else?" value={d.extra} onChange={v=>s("extra",v)} placeholder="Injuries, schedule, life stuff..."/>
    </div>
  ];
  return <div>
    <div style={{background:`${C.accent}18`,border:`1px solid ${C.accent}30`,borderRadius:12,padding:"12px 16px",marginBottom:20}}>
      <div style={{fontSize:13,fontWeight:700,color:C.text}}>For adults ready to stop starting over.</div>
      <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>Be honest and detailed so I can coach you properly.</div>
    </div>
    <StepBar steps={STEPS} current={step}/>
    <div style={{minHeight:340}}>{pages[step]}</div>
    <Btns step={step} total={STEPS.length} onBack={()=>setStep(s=>s-1)} onNext={()=>step<STEPS.length-1?setStep(s=>s+1):onDone(d)} nextLabel={step===STEPS.length-1?"✓ SUBMIT APPLICATION":null}/>
  </div>;
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// CHECK-IN SELECTOR
// ═══════════════════════════════════════════════════════════════════════════════
function CheckInSelector({onSelect}){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <ST>Select Your Check-In Type</ST>
    {[
      {id:"general",icon:"💪",title:"General / Lifestyle",sub:"Non-competitive clients — standard weekly check-in",color:C.accent},
      {id:"competitor",icon:"🏆",title:"Natural / Competitor Prep",sub:"Competition prep athletes — full 21-question form",color:C.gold},
      {id:"enhanced",icon:"◉",title:"Enhanced Athlete",sub:"PED protocol clients — competitor form + compound tracking",color:C.purple},
    ].map(opt=>(
      <button key={opt.id} onClick={()=>onSelect(opt.id)}
        style={{display:"flex",alignItems:"center",gap:14,padding:"16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:14,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
        <div style={{width:46,height:46,borderRadius:"50%",background:`${opt.color}20`,border:`1px solid ${opt.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{opt.icon}</div>
        <div>
          <div style={{fontSize:14,fontWeight:800,color:C.text,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.04em"}}>{opt.title}</div>
          <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{opt.sub}</div>
        </div>
        <div style={{marginLeft:"auto",color:C.textDim,fontSize:16}}>›</div>
      </button>
    ))}
  </div>;
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// GENERAL CHECK-IN
// ═══════════════════════════════════════════════════════════════════════════════
function GeneralCheckIn({onDone}){
  const [step,setStep]=useState(0);
  const [d,setD]=useState({photos:"",weight:"",energy:null,training:"",trainingWhy:"",win:"",cardio:"",cardioIssues:"",compliance:"",nonCompliant:"",enjoyment:"",sleep:null,stress:null,feedbackReq:"",questions:""});
  const s=(k,v)=>setD(p=>({...p,[k]:v}));
  const STEPS=["BASICS","TRAINING","CARDIO","DIET","RECOVERY","FEEDBACK"];
  const flags=()=>{
    const f=[];
    if(d.training==="Garbage")f.push({type:"orange",msg:"Training rated Garbage this week"});
    if(d.cardio==="Failed")f.push({type:"red",msg:"Cardio completely missed"});
    if(d.compliance&&Number(d.compliance)<70)f.push({type:"red",msg:`Diet compliance ${d.compliance}% — critical`});
    if(d.sleep!==null&&d.sleep<=1)f.push({type:"red",msg:"Sleep critically low"});
    if(d.stress!==null&&d.stress>=4)f.push({type:"orange",msg:`Stress at ${d.stress}/5 — elevated`});
    return f;
  };
  const pages=[
    <div key="a" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Weekly Basics</ST>
      <Pills label="Did you submit progress photos?" options={["Yes","No"]} value={d.photos} onChange={v=>s("photos",v)}/>
      <TI label="Current Weight (lbs)" value={d.weight} onChange={v=>s("weight",v)} placeholder="184.6" type="number"/>
      <Scale label="Energy Level This Week" value={d.energy} onChange={v=>s("energy",v)} lo="Drained" hi="Fired up"/>
    </div>,
    <div key="b" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Training</ST>
      <Pills label="How was training last week?" options={["Great","Good","Fair","Garbage"]} value={d.training} onChange={v=>s("training",v)}/>
      <TA label="Why was training how you rated it?" value={d.trainingWhy} onChange={v=>s("trainingWhy",v)} placeholder="Real reason"/>
      <TA label="Weekly Win" value={d.win} onChange={v=>s("win",v)} placeholder="One thing you're proud of" rows={2}/>
    </div>,
    <div key="c" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Cardio</ST>
      <Pills label="Did you do all your cardio?" options={["Not a min Missed","Most of it","Missed some","Failed"]} value={d.cardio} onChange={v=>s("cardio",v)}/>
      <TA label="Any issues with cardio?" value={d.cardioIssues} onChange={v=>s("cardioIssues",v)} placeholder="What got in the way?" rows={2}/>
    </div>,
    <div key="d" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Diet & Compliance</ST>
      <TI label="Diet compliance this week (%)" value={d.compliance} onChange={v=>s("compliance",v)} placeholder="85" type="number"/>
      {d.compliance&&Number(d.compliance)<90&&<TA label="If not compliant — what happened?" value={d.nonCompliant} onChange={v=>s("nonCompliant",v)} placeholder="No judgment"/>}
      <Pills label="How are you enjoying the program?" options={["LOVE IT","Its GOOD","Not really sure","Ready for a change"]} value={d.enjoyment} onChange={v=>s("enjoyment",v)}/>
    </div>,
    <div key="e" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Recovery</ST>
      <Scale label="Sleep Quality" value={d.sleep} onChange={v=>s("sleep",v)} lo="Garbage" hi="Really good"/>
      <Scale label="Stress Level" value={d.stress} onChange={v=>s("stress",v)} lo="Calm" hi="Freaking out" inv/>
    </div>,
    <div key="f" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Feedback</ST>
      <TA label="What would you like more feedback on?" value={d.feedbackReq} onChange={v=>s("feedbackReq",v)} placeholder="Training, nutrition, cardio..."/>
      <TA label="Questions / Concerns" value={d.questions} onChange={v=>s("questions",v)} placeholder="I'm here for you so let's talk."/>
      {flags().length>0&&<div><Lbl>Auto-flags going to coach</Lbl>{flags().map((f,i)=><Flag key={i} {...f}/>)}</div>}
    </div>
  ];
  return <div>
    <StepBar steps={STEPS} current={step}/>
    <div style={{minHeight:300}}>{pages[step]}</div>
    <Btns step={step} total={STEPS.length} onBack={()=>setStep(s=>s-1)} onNext={()=>step<STEPS.length-1?setStep(s=>s+1):onDone(d)} nextLabel={step===STEPS.length-1?"✓ SUBMIT CHECK-IN":null}/>
  </div>;
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// COMPETITOR CHECK-IN
// ═══════════════════════════════════════════════════════════════════════════════
function CompetitorCheckIn({onDone,enhanced=false}){
  const [step,setStep]=useState(0);
  const [d,setD]=useState({
    photos:"",training:"",trainingOff:"",cardio:"",cardioWhat:"",cardioHarder:"",legFatigue:"",nutrition:"",nutritionOff:"",gymPerf:null,strengthTrend:"",avgSleep:"",sleepQuality:null,stress:null,motivation:"",enjoyment:"",digestion:"",posing:"",hardest:"",needToKnow:"",questions:"",weight:"",
    compounds:"",cycleWeek:"",energy:null,libido:null,mood:null,aggression:null,waterRetention:null,sides:[],lastLabs:"",labNotes:""
  });
  const s=(k,v)=>setD(p=>({...p,[k]:v}));
  const STEPS=enhanced?["PHOTOS","TRAINING","CARDIO","NUTRITION","RECOVERY","MINDSET","DIGESTION","POSING","WRAP UP","ENHANCED"]:["PHOTOS","TRAINING","CARDIO","NUTRITION","RECOVERY","MINDSET","DIGESTION","POSING","WRAP UP"];
 
  const weeksSinceLabs=()=>{
    if(!d.lastLabs)return null;
    const diff=(new Date()-new Date(d.lastLabs))/(1000*60*60*24*7);
    return Math.floor(diff);
  };
 
  const flags=()=>{
    const f=[];
    if(d.training==="Garbage")f.push({type:"orange",msg:"Training rated Garbage"});
    if(d.cardio==="i was bad")f.push({type:"red",msg:"Cardio completely missed"});
    if(d.nutrition==="Off plan")f.push({type:"orange",msg:"Nutrition off plan this week"});
    if(d.strengthTrend==="Significant drop")f.push({type:"red",msg:"Significant strength drop"});
    if(d.cardioHarder==="Much harder"&&d.legFatigue==="yes")f.push({type:"orange",msg:"Cardio harder + leg fatigue — review volume"});
    if(d.avgSleep==="<5")f.push({type:"red",msg:"Sleep under 5hrs — recovery compromised"});
    if(d.stress!==null&&d.stress>=4)f.push({type:"orange",msg:`Stress at ${d.stress}/5`});
    if(d.posing==="Need help")f.push({type:"purple",msg:"Client needs posing help"});
    if(enhanced){
      const w=weeksSinceLabs();
      if(w!==null&&w>=8)f.push({type:"red",msg:`Labs overdue — ${w} weeks ago`});
      if(d.sides.includes("Gyno sensitivity"))f.push({type:"red",msg:"Gyno sensitivity — check E2"});
    }
    return f;
  };
 
  const pages=[
    <div key="p" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Progress Photos</ST>
      <Pills label="Did you post progress pics today?" options={["Yes","No"]} value={d.photos} onChange={v=>s("photos",v)}/>
      <TI label="Current Weight (lbs)" value={d.weight} onChange={v=>s("weight",v)} placeholder="184.6" type="number"/>
    </div>,
    <div key="t" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Training</ST>
      <Pills label="How was training this week?" options={["Smashed it","Solid, maybe had more","Fair, not really feeling it","Garbage"]} value={d.training} onChange={v=>s("training",v)}/>
      <TA label="IF off — why?" value={d.trainingOff} onChange={v=>s("trainingOff",v)} placeholder="What was off?" rows={2}/>
      <Scale label="Rank your gym performance" value={d.gymPerf} onChange={v=>s("gymPerf",v)} lo="Struggle bus" hi="Nailed it"/>
      <Pills label="Strength trend" options={["Stable","Slight drop","Significant drop"]} value={d.strengthTrend} onChange={v=>s("strengthTrend",v)}/>
    </div>,
    <div key="c" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Cardio & Steps</ST>
      <Pills label="Cardio / steps completed?" options={["Yes","Most","Missed","I was bad"]} value={d.cardio} onChange={v=>s("cardio",v)}/>
      <TA label="IF not — what happened?" value={d.cardioWhat} onChange={v=>s("cardioWhat",v)} placeholder="What got in the way?" rows={2}/>
      <Pills label="Cardio feel harder this week?" options={["No","Slightly","Much harder"]} value={d.cardioHarder} onChange={v=>s("cardioHarder",v)}/>
      <Pills label="Leg fatigue affecting cardio?" options={["Yes","Slight","No"]} value={d.legFatigue} onChange={v=>s("legFatigue",v)}/>
    </div>,
    <div key="n" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Nutrition</ST>
      <Pills label="Nutrition compliance" options={["100%","Minor issue","Off plan"]} value={d.nutrition} onChange={v=>s("nutrition",v)}/>
      {d.nutrition&&d.nutrition!=="100%"&&<TA label="IF off — what happened?" value={d.nutritionOff} onChange={v=>s("nutritionOff",v)} placeholder="No judgment"/>}
    </div>,
    <div key="r" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Recovery & Sleep</ST>
      <Pills label="Avg hours sleep per night" options={["7+","5-6","<5"]} value={d.avgSleep} onChange={v=>s("avgSleep",v)}/>
      <Scale label="Sleep quality" value={d.sleepQuality} onChange={v=>s("sleepQuality",v)} lo="Insomnia" hi="Like a baby"/>
      <Scale label="Stress level" value={d.stress} onChange={v=>s("stress",v)} lo="Calm" hi="Freaking out" inv/>
    </div>,
    <div key="m" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Mindset & Motivation</ST>
      <Pills label="Motivation to train" options={["High","Normal","Low"]} value={d.motivation} onChange={v=>s("motivation",v)}/>
      <Pills label="Are you enjoying the program?" options={["LOVE IT","Its good","Ready for change"]} value={d.enjoyment} onChange={v=>s("enjoyment",v)}/>
    </div>,
    <div key="di" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Digestion</ST>
      <Pills label="How's digestion?" options={["Normal","Bloating","Constipation","Loose stool"]} value={d.digestion} onChange={v=>s("digestion",v)}/>
    </div>,
    <div key="po" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST color={C.gold}>Posing Practice</ST>
      <Pills label="Did you practice posing?" options={["Yes","No","Need help"]} value={d.posing} onChange={v=>s("posing",v)}/>
    </div>,
    <div key="w" style={{display:"flex",flexDirection:"column",gap:16}}>
      <ST>Wrap Up</ST>
      <TA label="Hardest part of the week" value={d.hardest} onChange={v=>s("hardest",v)} placeholder="What was the biggest challenge?"/>
      <TA label="Anything I need to know about?" value={d.needToKnow} onChange={v=>s("needToKnow",v)} placeholder="Text me if it's important!"/>
      <TA label="Questions / Concerns?" value={d.questions} onChange={v=>s("questions",v)} placeholder="I'm here for you so let's talk."/>
      {flags().length>0&&<div><Lbl>Auto-flags going to coach</Lbl>{flags().map((f,i)=><Flag key={i} {...f}/>)}</div>}
    </div>,
    enhanced?<div key="enh" style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:C.purpleGlow,border:`1px solid ${C.purple}40`,borderRadius:12,padding:"12px 14px",marginBottom:4}}>
        <div style={{fontSize:10,color:C.purple,fontWeight:800,letterSpacing:"0.1em",marginBottom:3}}>ENHANCED PROTOCOL — PRIVATE</div>
        <div style={{fontSize:11,color:C.textMuted}}>Coach eyes only. Be honest.</div>
      </div>
      <TA label="Current compounds this week (self-reported)" value={d.compounds} onChange={v=>s("compounds",v)} placeholder="e.g. Test E 300mg/wk, Var 50mg/d..." rows={3}/>
      <TI label="Cycle week #" value={d.cycleWeek} onChange={v=>s("cycleWeek",v)} placeholder="e.g. 8" type="number"/>
      <Scale label="Energy on protocol" value={d.energy} onChange={v=>s("energy",v)} lo="Low" hi="High"/>
      <Scale label="Libido" value={d.libido} onChange={v=>s("libido",v)} lo="Crashed" hi="High"/>
      <Scale label="Mood" value={d.mood} onChange={v=>s("mood",v)} lo="Flat" hi="Great"/>
      <Scale label="Water Retention" value={d.waterRetention} onChange={v=>s("waterRetention",v)} lo="Dry" hi="Bloated" inv/>
      <Pills label="Side effects this week" options={["Water retention","Acne","Hair shedding","Gyno sensitivity","Joint dryness","Lethargy","Insomnia","Night sweats","None"]} value={d.sides} onChange={v=>s("sides",v)} multi color={C.purple}/>
      <div>
        <Lbl>Last Bloodwork Date</Lbl>
        <input type="date" value={d.lastLabs} onChange={e=>s("lastLabs",e.target.value)}
          style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",color:C.text,fontSize:14,fontFamily:"'Barlow',sans-serif",outline:"none",boxSizing:"border-box",colorScheme:"dark"}}/>
        {weeksSinceLabs()!==null&&<div style={{fontSize:11,marginTop:6,color:weeksSinceLabs()>=8?C.red:C.green}}>{weeksSinceLabs()>=8?`⚠ Labs overdue — ${weeksSinceLabs()} weeks ago`:`✓ Labs ${weeksSinceLabs()} weeks ago`}</div>}
      </div>
      <TA label="Anything else about how your body is responding?" value={d.labNotes} onChange={v=>s("labNotes",v)} placeholder="Sides, how you feel on cycle..." rows={3}/>
    </div>:null
  ].filter(Boolean);
 
  return <div>
    <StepBar steps={STEPS} current={step}/>
    <div style={{minHeight:300}}>{pages[step]}</div>
    <Btns step={step} total={STEPS.length} onBack={()=>setStep(s=>s-1)} onNext={()=>step<STEPS.length-1?setStep(s=>s+1):onDone(d)} nextLabel={step===STEPS.length-1?"✓ SUBMIT CHECK-IN":null}/>
  </div>;
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// MY TRACKER
// ═══════════════════════════════════════════════════════════════════════════════
function MyTracker(){
  const today=new Date();
  const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const isInj=(d)=>d===1||d===4;
  const [d,setD]=useState({weight:"",waist:"",test:false,yk11:false,rad:false,var:false,gh2a:false,gh2p:false,energy:null,libido:null,mood:null,water:null,pumps:null,sleep:null,e2:[],notes:""});
  const s=(k,v)=>setD(p=>({...p,[k]:v}));
  const stack=[
    {name:"Testosterone",dose:"175mg",freq:"Mon / Thu",key:"test",color:C.accentBright,injOnly:true},
    {name:"YK11",dose:"10mg",freq:"Daily",key:"yk11",color:C.gold},
    {name:"RAD140",dose:"10mg",freq:"Daily",key:"rad",color:C.orange},
    {name:"Anavar",dose:"50mg",freq:"Daily",key:"var",color:C.green},
    {name:"GH — 2am",dose:"2iu",freq:"2:00 AM",key:"gh2a",color:C.purple},
    {name:"GH — 2pm",dose:"2iu",freq:"2:00 PM",key:"gh2p",color:C.purple},
  ];
  const todayDay=today.getDay();
  const autoFlags=()=>{
    const f=[];
    if(d.e2.includes("Nipple sensitivity"))f.push({type:"red",msg:"Nipple sensitivity — check E2"});
    if(d.e2.includes("Bloated / puffy"))f.push({type:"orange",msg:"Water retention — E2 or sodium"});
    if(d.libido!==null&&d.libido<=1)f.push({type:"orange",msg:"Libido crashed — check E2"});
    if(d.energy!==null&&d.energy<=1)f.push({type:"orange",msg:"Energy low — check GH timing and sleep"});
    return f;
  };
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div style={{background:`linear-gradient(135deg,${C.accentGlow},${C.purpleGlow})`,border:`1px solid ${C.accent}30`,borderRadius:14,padding:16}}>
      <div style={{fontSize:10,color:C.accentBright,letterSpacing:"0.14em",fontWeight:800,marginBottom:4}}>YOUR PERSONAL TRACKER</div>
      <div style={{fontSize:22,fontWeight:800,fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1}}>LANCE MILLER</div>
      <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>{today.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})} · {isInj(todayDay)?"💉 Injection Day":"Oral day"}</div>
    </div>
    <div>
      <ST>Today's Protocol</ST>
      {stack.map(st=>{
        if(st.injOnly&&!isInj(todayDay))return null;
        return <button key={st.key} onClick={()=>s(st.key,!d[st.key])}
          style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:d[st.key]?`${st.color}15`:C.card,border:`1px solid ${d[st.key]?st.color:C.border}`,borderRadius:11,cursor:"pointer",textAlign:"left",marginBottom:8,width:"100%"}}>
          <div style={{width:22,height:22,borderRadius:"50%",background:d[st.key]?st.color:C.surface,border:`2px solid ${d[st.key]?st.color:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {d[st.key]&&<span style={{color:"#fff",fontSize:11,fontWeight:800}}>✓</span>}
          </div>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:d[st.key]?C.text:C.textMuted}}>{st.name} — {st.dose}</div><div style={{fontSize:10,color:C.textDim}}>{st.freq}</div></div>
          <div style={{fontSize:10,color:d[st.key]?st.color:C.textDim,fontWeight:700}}>{d[st.key]?"DONE":"PENDING"}</div>
        </button>;
      }).filter(Boolean)}
    </div>
    <div><ST>Today's Vitals</ST>
      <div style={{display:"flex",gap:10}}>
        <TI label="Weight (lbs)" value={d.weight} onChange={v=>s("weight",v)} placeholder="184.6"/>
        <TI label="Waist (in)" value={d.waist} onChange={v=>s("waist",v)} placeholder="34.5"/>
      </div>
    </div>
    <div><ST>How You Feel</ST>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Scale label="Energy" value={d.energy} onChange={v=>s("energy",v)} lo="Drained" hi="Fired up"/>
        <Scale label="Libido" value={d.libido} onChange={v=>s("libido",v)} lo="Crashed" hi="High"/>
        <Scale label="Mood" value={d.mood} onChange={v=>s("mood",v)} lo="Low" hi="Great"/>
        <Scale label="Water Retention" value={d.water} onChange={v=>s("water",v)} lo="Dry" hi="Bloated" inv/>
        <Scale label="Pumps" value={d.pumps} onChange={v=>s("pumps",v)} lo="Flat" hi="Insane"/>
        <Scale label="Sleep Last Night" value={d.sleep} onChange={v=>s("sleep",v)} lo="Garbage" hi="Great"/>
      </div>
    </div>
    <div><ST color={C.purple}>E2 / Side Effect Check</ST>
      <Pills label="Any symptoms today?" options={["Nipple sensitivity","Bloated / puffy","Emotional / moody","Joint dryness","High sex drive","Low sex drive","Acne flare","Hair shedding","None"]} value={d.e2} onChange={v=>s("e2",v)} multi color={C.purple}/>
    </div>
    {autoFlags().length>0&&<div><ST color={C.red}>Auto-Flags</ST>{autoFlags().map((f,i)=><Flag key={i} {...f}/>)}</div>}
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14}}>
      <ST>Injection Calendar</ST>
      <div style={{display:"flex",gap:6}}>
        {days.map((day,i)=>{
          const inj=i===1||i===4;
          const isT=i===todayDay;
          return <div key={day} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{fontSize:9,color:isT?C.accentBright:C.textDim,fontWeight:isT?800:400}}>{day}</div>
            <div style={{width:"100%",paddingTop:"100%",position:"relative",borderRadius:8,background:isT?C.accent:inj?`${C.accentBright}20`:C.surface,border:`1px solid ${isT?C.accent:inj?C.accentBright:C.border}`}}>
              {inj&&<span style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:12}}>💉</span>}
            </div>
          </div>;
        })}
      </div>
      <div style={{fontSize:10,color:C.textMuted,marginTop:10}}>Test 175mg Mon/Thu · YK11 10mg · RAD140 10mg · Var 50mg daily · GH 2iu @ 2am + 2pm</div>
    </div>
    <TA label="Notes / Observations" value={d.notes} onChange={v=>s("notes",v)} placeholder="How training felt, anything off..." rows={3}/>
    <button style={{width:"100%",padding:"14px 0",background:C.accent,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:800,letterSpacing:"0.1em",cursor:"pointer"}}>💾 SAVE TODAY'S LOG</button>
  </div>;
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// COACH DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function CoachDashboard(){
  const [note,setNote]=useState("");
  const [showEnh,setShowEnh]=useState(false);
  const [checkins,setCheckins]=useState([]);
 
  useEffect(()=>{
    supabase.from('checkins').select('*,profiles(full_name,email,check_in_type)').order('created_at',{ascending:false}).limit(20)
      .then(({data})=>{ if(data) setCheckins(data); });
  },[]);
 
  const flags=[
    {type:"orange",msg:"Sleep quality 2/5 — down from last week"},
    {type:"orange",msg:"Stress 4/5 — elevated, monitor"},
    {type:"green",msg:"Nutrition 91% — strong week"},
    {type:"green",msg:"Training: Smashed it"},
    {type:"orange",msg:"Cardio missed some"},
  ];
 
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,display:"flex",gap:14,alignItems:"center"}}>
      <div style={{width:50,height:50,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},#1a3fa0)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:"#fff",flexShrink:0}}>MM</div>
      <div style={{flex:1}}>
        <div style={{fontSize:19,fontWeight:800,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.05em",lineHeight:1}}>COACH VIEW</div>
        <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>{checkins.length} check-ins received</div>
      </div>
    </div>
 
    {checkins.length > 0 && (
      <div>
        <ST>Recent Check-Ins</ST>
        {checkins.slice(0,5).map((c,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:11,padding:"12px 14px",marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text}}>{c.profiles?.full_name||c.profiles?.email}</div>
            <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{c.check_in_type} · {new Date(c.created_at).toLocaleDateString()}</div>
            {c.data?.weight&&<div style={{fontSize:11,color:C.accentBright,marginTop:4}}>Weight: {c.data.weight} lbs</div>}
          </div>
        ))}
      </div>
    )}
 
    <div><ST>Auto-Flags</ST>{flags.map((f,i)=><Flag key={i} {...f}/>)}</div>
 
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16}}>
      <ST>Coach Response</ST>
      <TA value={note} onChange={setNote} placeholder="Add coaching notes and feedback..." rows={5}/>
      <button style={{marginTop:12,width:"100%",padding:"13px 0",background:C.accent,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer"}}>📤 SEND FEEDBACK TO CLIENT</button>
    </div>
  </div>;
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// TRENDS
// ═══════════════════════════════════════════════════════════════════════════════
function TrendsView(){
  const weeks=["W8","W9","W10","W11","W12","W13","W14"];
  const charts=[
    {title:"BODYWEIGHT",data:[189.2,188.4,187.6,186.8,186.0,185.2,184.6],color:C.accentBright,max:194,unit:"lbs",lb:true},
    {title:"DIET COMPLIANCE",data:[68,72,80,90,88,90,91],color:C.green,max:100,unit:"%",lb:false},
    {title:"SLEEP QUALITY",data:[3,2,3,4,3,2,2],color:C.gold,max:5,unit:"/5",lb:false},
    {title:"STRESS LEVEL",data:[3,4,3,2,3,4,4],color:C.orange,max:5,unit:"/5",lb:true},
  ];
  return <div style={{display:"flex",flexDirection:"column",gap:20}}>
    <div style={{background:`${C.accent}15`,border:`1px solid ${C.accent}35`,borderRadius:12,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div style={{fontSize:11,color:C.accentBright,fontWeight:700,letterSpacing:"0.1em"}}>14-WEEK OVERVIEW</div></div>
      <div style={{textAlign:"right"}}><div style={{fontSize:24,fontWeight:800,color:C.green,fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1}}>−4.6 lbs</div></div>
    </div>
    {charts.map(({title,data,color,max,unit,lb})=>{
      const change=data[data.length-1]-data[0];
      const improving=lb?change<0:change>0;
      const minV=Math.min(...data)*0.95;
      return <div key={title} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <span style={{fontSize:10,color:C.textMuted,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:700}}>{title}</span>
          <span style={{fontSize:12,color:improving?C.green:C.red,fontWeight:700}}>{improving?"▼":"▲"} {Math.abs(change).toFixed(1)}{unit}</span>
        </div>
        <div style={{display:"flex",gap:5,alignItems:"flex-end",height:80}}>
          {data.map((v,i)=>{
            const h=Math.max(8,((v-minV)/(max-minV))*70);
            const isL=i===data.length-1;
            return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <div style={{fontSize:9,color:isL?color:C.textDim,fontFamily:"monospace",fontWeight:isL?700:400}}>{v}</div>
              <div style={{width:"100%",height:`${h}px`,background:isL?color:`${color}40`,borderRadius:"4px 4px 0 0"}}/>
              <div style={{fontSize:8,color:C.textDim}}>{weeks[i]}</div>
            </div>;
          })}
        </div>
      </div>;
    })}
  </div>;
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App(){
  const [tab,setTab]=useState(1);
  const [applyDone,setApplyDone]=useState(false);
  const [checkInType,setCheckInType]=useState(null);
  const [checkInDone,setCheckInDone]=useState(false);
  const [session,setSession]=useState(null);
  const [userRole,setUserRole]=useState(null);
  const [authMode,setAuthMode]=useState('login');
 
  useEffect(()=>{
    const l=document.createElement("link");
    l.href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&family=Barlow:wght@400;500;600;700&display=swap";
    l.rel="stylesheet";
    document.head.appendChild(l);
  },[]);
 
  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      setSession(session);
      if(session) loadUserRole(session.user.id);
    });
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      setSession(session);
      if(session) loadUserRole(session.user.id);
      else setUserRole(null);
    });
    return ()=>subscription.unsubscribe();
  },[]);
 
  const loadUserRole=async(userId)=>{
    const {data}=await supabase.from('profiles').select('role').eq('id',userId).single();
    if(data) setUserRole(data.role);
  };
 
  const handleLogout=async()=>{
    await supabase.auth.signOut();
    setSession(null);
    setUserRole(null);
  };
 
  const resetCheckIn=()=>{setCheckInType(null);setCheckInDone(false);};
 
  const saveCheckIn=async(data,type)=>{
    const {error}=await supabase.from('checkins').insert({
      client_id:session.user.id,
      check_in_type:type,
      data:data,
      week_number:Math.ceil((new Date()-new Date(new Date().getFullYear(),0,1))/604800000)
    });
    if(!error) setCheckInDone(true);
    else console.error('Check-in save error:',error);
  };
 
  const renderCheckIn=()=>{
    if(checkInDone) return <Done title="CHECK-IN SUBMITTED" sub="Your coach will review and respond before your next session." onBack={resetCheckIn}/>;
    if(!checkInType) return <CheckInSelector onSelect={setCheckInType}/>;
    if(checkInType==="general") return <GeneralCheckIn onDone={(data)=>saveCheckIn(data,'general')}/>;
    if(checkInType==="competitor") return <CompetitorCheckIn onDone={(data)=>saveCheckIn(data,'competitor')}/>;
    if(checkInType==="enhanced") return <CompetitorCheckIn onDone={(data)=>saveCheckIn(data,'enhanced')} enhanced/>;
    return null;
  };
 
  if(!session) return <AuthScreen mode={authMode} setMode={setAuthMode}/>;
 
  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Barlow',sans-serif",maxWidth:480,margin:"0 auto",paddingBottom:100}}>
      <div style={{position:"sticky",top:0,background:C.bg,zIndex:100,borderBottom:`1px solid ${C.border}`,padding:"16px 18px 12px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <div style={{fontSize:21,fontWeight:900,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.07em",lineHeight:1}}>MILLER <span style={{color:C.accentBright}}>MUSCLE</span></div>
            <div style={{fontSize:9,color:C.textMuted,letterSpacing:"0.18em",marginTop:2}}>OPERATING SYSTEM</div>
          </div>
          <div style={{textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
            <div style={{fontSize:11,color:C.accentBright,fontWeight:700}}>{session?.user?.email?.split('@')[0]}</div>
            <button onClick={handleLogout} style={{fontSize:10,color:C.textMuted,background:"transparent",border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",cursor:"pointer",fontWeight:600,letterSpacing:"0.06em"}}>LOGOUT</button>
          </div>
        </div>
        <div style={{display:"flex",gap:3,background:C.surface,borderRadius:10,padding:3,border:`1px solid ${C.border}`}}>
          {TABS.map((t,i)=>(
            <button key={t} onClick={()=>setTab(i)}
              style={{flex:1,padding:"8px 0",background:tab===i?C.accent:"transparent",border:"none",borderRadius:7,color:tab===i?"#fff":C.textMuted,fontSize:8,fontWeight:tab===i?800:500,letterSpacing:"0.05em",cursor:"pointer",transition:"all 0.2s"}}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"20px 18px"}}>
        {tab===0&&(applyDone?<Done title="APPLICATION SUBMITTED" sub="Your coach will review and be in touch within 24–48 hours." onBack={()=>setApplyDone(false)}/>:<ApplyForm onDone={()=>setApplyDone(true)}/>)}
        {tab===1&&renderCheckIn()}
        {tab===2&&<MyTracker/>}
        {tab===3&&<CoachDashboard/>}
        {tab===4&&<TrendsView/>}
      </div>
    </div>
  );
}
 
"use client";
import Link from "next/link";import {useState} from "react";
const routes=[
  {problem:"We need more qualified traffic",outcome:"Increase relevant visibility",services:["SEO Optimization","Performance Marketing"],href:"seo-optimization"},
  {problem:"Our website is not converting",outcome:"Improve digital conversion",services:["Website Development","Digital Strategy"],href:"website-development"},
  {problem:"We need a new digital product",outcome:"Launch a scalable product",services:["SaaS Development","Digital Strategy"],href:"saas-development"},
  {problem:"Our ecommerce store is not growing",outcome:"Strengthen commerce growth",services:["Ecommerce Development","Performance Marketing"],href:"ecommerce-development"},
  {problem:"Our marketing is difficult to measure",outcome:"Create accountable acquisition",services:["Performance Marketing","Digital Strategy"],href:"performance-marketing"},
  {problem:"Our team wastes time on repetitive work",outcome:"Increase operating efficiency",services:["AI Automation","AI Development"],href:"ai-automation"},
  {problem:"We need an AI strategy",outcome:"Find practical AI opportunities",services:["AI Development","Digital Strategy"],href:"ai-development"},
  {problem:"Our systems are disconnected",outcome:"Connect the growth system",services:["Digital Strategy","AI Automation"],href:"digital-strategy"},
];
export function ServiceExplorer(){const [mode,setMode]=useState<"problem"|"outcome">("problem");return <div className="service-explorer"><div className="explorer-controls" role="tablist" aria-label="Explore services by"><button role="tab" aria-selected={mode==="problem"} onClick={()=>setMode("problem")}>Business problem</button><button role="tab" aria-selected={mode==="outcome"} onClick={()=>setMode("outcome")}>Desired outcome</button></div><div className="explorer-grid">{routes.map((r,i)=><Link href={`/services/${r.href}`} key={r.problem}><span>0{i+1}</span><h3>{mode==="problem"?r.problem:r.outcome}</h3><p>{r.services.join(" + ")}</p><b>Explore the route ↗</b></Link>)}</div></div>}

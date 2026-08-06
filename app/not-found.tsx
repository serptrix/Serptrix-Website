import Link from "next/link";
export default function NotFound(){return <section className="error-page shell"><p className="eyebrow"><span /> ERROR 404</p><h1>This signal went<br/><em>off course.</em></h1><p>The page may have moved, or the address may be incomplete.</p><Link className="btn btn-primary" href="/">Return home <span>→</span></Link></section>}

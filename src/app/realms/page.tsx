import Link from "next/link";

const realms = ["MIDGARD", "ALFHEIM", "JOTUNHEIM", "NIFLHEIM", "MUSPELHEIM", "SVARTALFHEIM", "VANAHEIM", "ASGARD", "ROOT"];

export default function RealmsPage() {
  return <main className="terminal-page realms-page"><header className="terminal-header"><Link href="/dashboard" className="brand"><span className="brand-mark">ᛦ</span> YGGDRASIL</Link><span>REALM MAP / SEQUENCE</span><span>GATE STATUS: LOCKED</span></header><section className="realms-intro"><p className="eyebrow">PARTITION TABLE // ORDERED ACCESS</p><h1>NINE REALMS</h1><p>Each partition opens only after its local fragment sequence is validated. Current signal: <b>MIDGARD</b>.</p></section><section className="realm-table">{realms.map((realm, index) => <div className={index === 0 ? "realm-row active-realm" : "realm-row locked-realm"} key={realm}><span>0{index + 1}</span><strong>{realm}</strong><small>{index === 0 ? "CURRENT // 02 OF 05 FRAGMENTS" : "LOCKED // PREVIOUS GATE REQUIRED"}</small><em>{index === 0 ? <Link href="/dashboard">OPEN -&gt;</Link> : "--"}</em></div>)}</section><footer className="dashboard-footer"><Link href="/dashboard">&lt;- TASK MAP</Link><Link href="/briefing">MISSION BRIEFING -&gt;</Link></footer></main>;
}

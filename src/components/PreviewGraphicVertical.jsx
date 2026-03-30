import './PreviewGraphic.css';

const RED_DOT_OPACITIES   = [0.7,0.5,0.8,0.45,0.6,0.35, 0.55,0.75,0.4,0.65,0.5,0.7, 0.4,0.6,0.8,0.45,0.55,0.7];
const GREEN_DOT_OPACITIES = [0.8,0.7,0.85,0.65,0.75,0.9, 0.75,0.85,0.7,0.8,0.65,0.9];
const BAR_HEIGHTS         = [40,60,45,80,65,90];

const Num = ({ n }) => (
  <div style={{ fontFamily: "'Dela Gothic One', sans-serif", fontSize: 11, color: 'rgba(138,149,255,0.35)', flexShrink: 0, width: 10, textAlign: 'right' }}>{n}</div>
);

export function VConnector() {
  return <div className="pg-v-connector" />;
}

export function VPanel1() {
  return (
    <div className="pg-panel pg-panel-1" style={{ flex: 'unset', width: '100%' }}>
      <div>
        <div className="pg-panel-label">01</div>
        <div className="pg-panel-title">Daten Architektur</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Num n="1" />
          <div className="source-block" style={{ flex: 1, marginBottom: 0 }}>
            <div className="source-block-title">Rohdaten</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,7px)', gridTemplateRows: 'repeat(3,7px)', gap: 2, flexShrink: 0 }}>
                {RED_DOT_OPACITIES.map((o, i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: `rgba(248,113,113,${o})` }} />
                ))}
              </div>
              <div style={{ flex: 1, fontSize: 7.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>
                CRM · Meta Ads<br />Website · Sheets
              </div>
            </div>
          </div>
        </div>

        <div style={{ paddingLeft: 17, fontSize: 8, color: 'rgba(138,149,255,0.3)', lineHeight: 1 }}>↓</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Num n="2" />
          <div className="source-block" style={{ flex: 1, marginBottom: 0 }}>
            <div className="source-block-title">SQL Bereinigung</div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 7.5, color: 'rgba(138,149,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span style={{ color: '#a78bfa' }}>SELECT</span>{' * '}
              <span style={{ color: '#a78bfa' }}>EXCLUDE</span>{' duplicates'}<br />
              <span style={{ color: '#a78bfa' }}>WHERE</span>{' valid = '}
              <span style={{ color: '#4ade80' }}>TRUE</span>
            </div>
          </div>
        </div>

        <div style={{ paddingLeft: 17, fontSize: 8, color: 'rgba(138,149,255,0.3)', lineHeight: 1 }}>↓</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Num n="3" />
          <div className="source-block" style={{ flex: 1, marginBottom: 0 }}>
            <div className="source-block-title">Saubere Daten</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,7px)', gridTemplateRows: 'repeat(2,7px)', gap: 2 }}>
              {GREEN_DOT_OPACITIES.map((o, i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: `rgba(74,222,128,${o})`, ...(i % 3 === 0 ? { boxShadow: '0 0 4px rgba(74,222,128,0.35)' } : {}) }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingLeft: 17, fontSize: 8, color: 'rgba(138,149,255,0.3)', lineHeight: 1 }}>↓</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Num n="4" />
          <div className="source-block" style={{ flex: 1, marginBottom: 0 }}>
            <div className="source-block-title">Kontrolle</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.6)', flexShrink: 0 }} />
                <span style={{ fontSize: 8, fontWeight: 600, color: 'rgba(74,222,128,0.85)' }}>0 Fehler · Alles OK</span>
              </div>
              <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)' }}>06:00 UTC</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function VPanel2() {
  return (
    <div className="pg-panel pg-panel-2" style={{ flex: 'unset', width: '100%' }}>
      <div className="pg-dashboard-area">
        <div>
          <div className="pg-panel-label">02</div>
          <div className="pg-panel-title">Live Dashboard</div>
        </div>
        <div className="pg-kpi-row">
          {[['Umsatz','€84k','↑ +18%',false],['Leads','1.2k','↑ +23%',false],['Ad Spend','€3.1k','↓ -4%',true]].map(([label,val,badge,neg]) => (
            <div key={label} className="pg-kpi-card">
              <div className="pg-kpi-label">{label}</div>
              <div className="pg-kpi-value">{val}</div>
              <div className={`pg-kpi-badge${neg ? ' pg-kpi-badge-neg' : ''}`}>{badge}</div>
            </div>
          ))}
        </div>
        <div className="pg-charts-row">
          <div className="pg-chart-card">
            <div className="pg-chart-title">Umsatz / Monat</div>
            <div className="pg-bar-chart">
              {BAR_HEIGHTS.map((h, i) => (
                <div key={i} className="pg-bar" style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.8 }} />
              ))}
            </div>
          </div>
          <div className="pg-chart-card">
            <div className="pg-chart-title">Leads Trend</div>
            <svg viewBox="0 0 120 60" fill="none" preserveAspectRatio="none" style={{ flex: 1 }}>
              <defs>
                <linearGradient id="vLineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8a95ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8a95ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 50 L20 40 L40 44 L60 28 L80 20 L100 15 L120 8" stroke="#8a95ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M0 50 L20 40 L40 44 L60 28 L80 20 L100 15 L120 8 L120 60 L0 60 Z" fill="url(#vLineGrad)" />
              <circle cx="120" cy="8" r="3" fill="#8a95ff" />
            </svg>
          </div>
        </div>
      </div>

      <div className="pg-ai-sidebar">
        <div className="pg-ai-sidebar-title">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block', marginRight: 4 }} />
          KI Assistent
        </div>
        <div className="pg-chat-bubble-small pg-chat-bubble-small-user">Umsatz letzte Woche?</div>
        <div className="pg-chat-bubble-small pg-chat-bubble-small-ai"><strong style={{ color: '#8a95ff' }}>€19.4k</strong> — +12% vs. Vorwoche.</div>
        <div className="pg-chat-bubble-small pg-chat-bubble-small-user">Top Kampagne?</div>
        <div className="pg-chat-bubble-small pg-chat-bubble-small-ai"><strong style={{ color: '#8a95ff' }}>Meta #4</strong> — ROAS 4.2x</div>
        <div style={{ display: 'flex', gap: 3, padding: '3px 7px' }}>
          {[1, 0.6, 0.3].map((o, i) => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(138,149,255,0.5)', opacity: o }} />
          ))}
        </div>
        <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '5px 7px', fontSize: 7.5, color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Frag mich…</span>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: '#8a95ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'white', flexShrink: 0 }}>→</div>
        </div>
      </div>
    </div>
  );
}

export function VPanel3() {
  return (
    <div className="pg-panel pg-panel-3" style={{ flex: 'unset', width: '100%' }}>
      <div>
        <div className="pg-panel-label">03</div>
        <div className="pg-panel-title">KI Assistent</div>
      </div>
      <div className="pg-chat-window">
        <div className="pg-chat-topbar">
          <div className="pg-chat-avatar">🤖</div>
          <div>
            <div className="pg-chat-name">DA Assistant</div>
            <div className="pg-chat-status">
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 4px #4ade80', display: 'inline-block', marginRight: 4 }} />
              Online · Live-Daten
            </div>
          </div>
        </div>
        <div className="pg-chat-bubble pg-chat-bubble-user">Welche Kampagne hat letzte Woche am besten performt?</div>
        <div className="pg-chat-bubble pg-chat-bubble-ai">
          <span style={{ color: '#8a95ff', fontWeight: 600 }}>Meta Campaign #4</span> — ROAS 4.2x, €6.8k Umsatz bei €1.6k Spend.
        </div>
        <div className="pg-chat-bubble pg-chat-bubble-user">Wie ist der Vergleich zum Vormonat?</div>
        <div className="pg-chat-bubble pg-chat-bubble-ai">
          +<span style={{ color: '#8a95ff', fontWeight: 600 }}>31%</span> mehr Umsatz, Kosten gleich. Soll ich einen Bericht erstellen?
        </div>
        <div className="pg-chat-input">
          <span>Frag mich etwas…</span>
          <div className="pg-send-btn">→</div>
        </div>
      </div>
    </div>
  );
}

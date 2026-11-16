import { useEffect, useRef, useState } from 'react'
import {
  STORE_URL, AUTHOR_EMAIL, PRICE, TIMELINE, ROLES, PARTS, QUESTIONS, PAGES,
} from './content.js'

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setShown(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>
}

const Person = ({ fill }) => (
  <svg aria-hidden="true" width="34" height="56" viewBox="0 0 34 56" fill={fill}>
    <circle cx="17" cy="9" r="8" />
    <path d="M5 26c0-5 4-8 12-8s12 3 12 8v12h-5v16h-14V38H5z" />
  </svg>
)

const Star = () => (
  <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M12 2l3 6.6 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21.2l1.5-7L2 9.4l7-.8z" />
  </svg>
)

function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <a href="#top" className="brand">אחד זה אפס, שניים זה אחד</a>
        <nav aria-label="ניווט ראשי">
          <a href="#story">הסיפור של אבי</a>
          <a href="#peek">הצצה לספר</a>
          <a href="#inside">מה בספר</a>
          <a href="#buy" className="cta">לרכישה</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="blob" aria-hidden="true" style={{ width: 620, height: 620, background: 'rgba(62,139,219,0.38)', top: -180, left: -140 }} />
      <div className="blob" aria-hidden="true" style={{ width: 520, height: 520, background: 'rgba(16,22,70,0.32)', bottom: -260, right: '12%' }} />
      <div className="wrap">
        <div className="text">
          <div style={{ fontSize: 18, fontWeight: 500, color: '#DCE8FB' }}>ספר מאת אבי עיואן</div>
          <h1>אחד זה אפס,<br />שניים זה אחד.</h1>
          <p className="sub">גישה כוללת להנדסת מערכות ושיפור איכות ניהול פרויקטים</p>
          <p className="muted">יותר מ־35 שנים של ניהול מגה־פרויקטים הנדסיים, מזוקקות לכלים מעשיים, לדוגמאות מהשטח ולטיפים שאפשר ליישם כבר מחר.</p>
          <div className="ctas">
            <a href={STORE_URL} className="pill pill-white">לרכישת הספר · <span style={{ whiteSpace: 'nowrap' }}>{PRICE}</span></a>
            <a href="#peek" className="pill pill-ghost">הצצה לעמודים</a>
          </div>
        </div>
        <div className="cover-box">
          <img className="cover" src="/assets/cover.png" alt="כריכת הספר אחד זה אפס שניים זה אחד מאת אבי עיואן" />
        </div>
      </div>
    </section>
  )
}

function AuthorLine() {
  return (
    <section aria-label="מילה מהמחבר">
      <Reveal className="author">
        <div className="avatar">[תמונה של אבי]</div>
        <blockquote>
          <p className="serif">[משפט פתיחה אחד בקולו של אבי — הדבר שהוא הכי רוצה שקורא ייקח מהספר.]</p>
          <footer>אבי עיואן</footer>
        </blockquote>
      </Reveal>
    </section>
  )
}

function Story() {
  return (
    <section id="story" className="story">
      <div className="wrap">
        <Reveal className="cols">
          <div className="main">
            <div className="eyebrow">הסיפור של אבי</div>
            <h2 className="h2">35 שנה של מגה־פרויקטים, משלושה כיסאות שונים</h2>
            <p className="lead">אבי עיואן עוסק יותר מ־35 שנים בניהול פרויקטים הנדסיים, בהנדסת מערכות ובפיתוח מיזמים מורכבים ועתירי ידע. הוא ליווה מגה־פרויקטים, בתקציבים של עשרות ומאות מיליונים, משלב התכנון וגיוס התקציב ועד המימוש.</p>
            <p className="lead">את אותם פרויקטים הוא ראה מכל צד של השולחן:</p>
            <div className="roles">{ROLES.map((r) => <span key={r}>{r}</span>)}</div>
          </div>
          <div className="timeline">
            <div className="title">תחנות בדרך</div>
            {TIMELINE.map((t, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-rail" aria-hidden="true">
                  <span className={`tl-dot ${t.final ? 'final' : ''}`} />
                  {!t.final && <span className="tl-line" />}
                </div>
                <div className="tl-body">
                  <div className="tl-years">{t.years}</div>
                  <div className="tl-text" style={t.final ? { fontWeight: 700 } : undefined}>{t.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="why-card">
          <div className="label">למה כתבתי את הספר</div>
          <p className="serif">[כאן אבי מספר בגוף ראשון: רגע אחד מפרויקט שלא ישכח, מה למד ממנו, ולמה החליט להעלות את הלקחים על הכתב. שלוש־ארבע פסקאות קצרות.]</p>
          <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink-2)' }}>אבי</div>
        </Reveal>
      </div>
    </section>
  )
}

function TitleMeaning() {
  return (
    <section className="title-sec">
      <div className="blob" aria-hidden="true" style={{ width: 480, height: 480, background: 'rgba(31,79,168,0.45)', top: -200, right: -120 }} />
      <Reveal className="wrap">
        <div className="text">
          <h2 className="h2">למה אחד זה אפס?</h2>
          <p>שם הספר רומז ליתירות — אחת הדרכים להגדיל את הסיכוי שפרויקט יצליח. מי שנשען על אחד בלבד, נשאר בלי כלום ביום שהאחד הזה נופל. מי שדאג לשניים, ממשיך לעבוד.</p>
        </div>
        <div className="equations">
          <div className="eq">
            <div className="num"><span>1</span><small>זה</small><span style={{ color: '#9FB0D9' }}>0</span></div>
            <div className="side"><span>לבד — נקודת כשל יחידה</span><Person fill="#9FB0D9" /></div>
          </div>
          <div className="eq on">
            <div className="num"><span>2</span><small>זה</small><span>1</span></div>
            <div className="side"><span>שניים — תמיד יש גיבוי</span><div style={{ display: 'flex', gap: 6 }}><Person fill="#FFFFFF" /><Person fill="#FFFFFF" /></div></div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function PageContent({ src, n }) {
  if (src && src.toLowerCase().endsWith('.pdf')) {
    return <iframe src={`${src}#toolbar=0&navpanes=0&view=FitH`} title={`עמוד לדוגמה ${n}`} />
  }
  if (src) return <img src={src} alt={`עמוד לדוגמה ${n}`} />
  return (
    <>
      <div className="bar" aria-hidden="true" style={{ height: '2.2%', width: '34%', background: '#C9D4EA' }} />
      <div className="bar" aria-hidden="true" style={{ height: '4.5%', width: '68%', background: 'var(--accent)', marginTop: '2%' }} />
      <div className="bar" aria-hidden="true" style={{ width: '100%', marginTop: '2%' }} />
      <div className="bar" aria-hidden="true" style={{ width: '94%' }} />
      <div className="bar" aria-hidden="true" style={{ width: '98%' }} />
      <div className="bar" aria-hidden="true" style={{ width: '61%' }} />
      <div className="ph"><b>[עמוד לדוגמה {n}]</b><span>כאן יוצג קובץ ה־PDF של העמוד</span></div>
      <div className="bar" aria-hidden="true" style={{ width: '100%' }} />
      <div className="bar" aria-hidden="true" style={{ width: '88%' }} />
      <div className="pageno">{n}</div>
    </>
  )
}

function Peek() {
  const [cur, setCur] = useState(0)
  const [flips, setFlips] = useState(0)
  const go = (i) => { setCur((i + PAGES.length) % PAGES.length); setFlips((f) => f + 1) }

  useEffect(() => {
    const onKey = (e) => {
      const sec = document.getElementById('peek')
      if (!sec) return
      const r = sec.getBoundingClientRect()
      if (r.top > window.innerHeight || r.bottom < 0) return
      if (e.key === 'ArrowLeft') go(cur + 1) // RTL: left = next
      if (e.key === 'ArrowRight') go(cur - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const src = PAGES[cur]
  return (
    <section id="peek" className="peek">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">דפדפו בספר</h2>
          <p className="lead">כמה עמודים מתוך הספר, בדיוק כפי שהם מופיעים בו.</p>
        </div>
        <div className="viewer">
          <button type="button" className="arrow" aria-label="העמוד הקודם" onClick={() => go(cur - 1)}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="book">
            <div className="stack" aria-hidden="true" />
            <div key={flips} className={`sheet ${flips ? 'flip' : ''} ${src ? 'media' : ''}`}>
              <PageContent src={src} n={cur + 1} />
            </div>
          </div>
          <button type="button" className="arrow next" aria-label="העמוד הבא" onClick={() => go(cur + 1)}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
        </div>
        <div className="thumbs">
          {PAGES.map((_, i) => (
            <button key={i} type="button" className={`thumb ${i === cur ? 'on' : ''}`} aria-label={`עמוד לדוגמה ${i + 1}`} aria-current={i === cur} onClick={() => go(i)}>
              <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
              <span>{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Inside() {
  return (
    <section id="inside" className="inside">
      <div className="wrap">
        <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 760 }}>
          <h2 className="h2">מה תמצאו בספר</h2>
          <p className="lead">ארבעה חלקים, 22 פרקים ו־525 עמודים — עם יותר מ־85 דוגמאות מעשיות ויותר מ־120 תרשימים.</p>
        </Reveal>
        <Reveal className="cols">
          <div className="parts">
            {PARTS.map((p) => (
              <div className="part" key={p.label}>
                <div className="l">{p.label}</div><div className="n">{p.name}</div><div className="c">{p.chapters}</div>
              </div>
            ))}
          </div>
          <div className="qs">
            <div className="title">שאלות שהספר עונה עליהן</div>
            <ul>{QUESTIONS.map((q) => <li key={q}>{q}</li>)}</ul>
          </div>
        </Reveal>
        <p className="for-who"><strong>למי הספר מתאים:</strong> מנהלים שרוצים לשפר את ניהול הפרויקטים בארגון, מנהלי פרויקטים, מהנדסי מערכות, יזמים שהופכים רעיון למוצר, מהנדסי פיתוח בדרך לתפקיד ניהולי ולקוחות שמנהלים מיזמים מורכבים.</p>
      </div>
    </section>
  )
}

function Readers() {
  return (
    <section aria-label="מה אומרים הקוראים" className="readers">
      <Reveal className="inner">
        <div className="stars" role="img" aria-label="דירוג 5 מתוך 5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</div>
        <blockquote className="serif">״ספר מקיף וכולל את כל הנושאים הדרושים למנהל פרוייקט.״</blockquote>
        <div className="src">מתוך ביקורות הקוראים בחנות הליקון ספרים · 5 מתוך 5</div>
      </Reveal>
    </section>
  )
}

function Buy() {
  return (
    <section id="buy" className="buy">
      <div className="wrap">
        <h2 className="h2">שתי דרכים לקרוא את הספר</h2>
        <Reveal className="offers">
          <div className="offer dark">
            <div className="t">מהדורה דיגיטלית</div>
            <div className="price">{PRICE}</div>
            <p>ספר אלקטרוני לקריאה מיידית, דרך חנות הליקון ספרים.</p>
            <a href={STORE_URL} className="pill pill-white">לרכישה בחנות</a>
          </div>
          <div className="offer">
            <div className="t">מהדורה מודפסת בכריכה קשה</div>
            <div className="price small">בהזמנה אישית מאבי</div>
            <p>525 עמודי A4 בכריכה קשה. מזמינים ישירות מהמחבר בדוא״ל.</p>
            <a href={`mailto:${AUTHOR_EMAIL}`} className="pill pill-accent">לכתוב לאבי</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="b">אחד זה אפס, שניים זה אחד · אבי עיואן</div>
        <a href={`mailto:${AUTHOR_EMAIL}`}>{AUTHOR_EMAIL}</a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <div className="draft">גרסת טיוטה — האתר עדיין בעבודה. טקסט בסוגריים מרובעים ממתין לתוכן אמיתי.</div>
      <Nav />
      <main>
        <Hero />
        <AuthorLine />
        <Story />
        <TitleMeaning />
        <Peek />
        <Inside />
        <Readers />
        <Buy />
      </main>
      <Footer />
    </>
  )
}

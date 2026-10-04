import { useState, useEffect, useRef } from 'react'

/* ──────────────────────────────────────────
   Photo Memories Data (7 Pictures)
   ────────────────────────────────────────── */
const photos = [
  {
    id: 1,
    src: '/photos/photo1.jpg',
    title: 'Where It All Began',
    caption: 'The moment that started our story tab pata nahi tha itte close honge, but I knew I wanted to be a part of your world.',
    tag: 'Chapter 01',
  },
  {
    id: 2,
    src: '/photos/photo2.jpg',
    title: 'Golden Hour Laughs',
    caption: 'Tears streaming down our faces from laughing until our stomachs ached  (me in awe seeing you fully dressed in that beautiful saree kyuki saree ke piche ka struggle maine dekha hai sry suna haiii [lego man reaction]).',
    tag: 'Chapter 02',
  },
  {
    id: 3,
    src: '/photos/photo3.jpg',
    title: 'Unplanned Adventures',
    caption: 'No map, no strict plan — just you n mee (and ofc mahi).',
    tag: 'Chapter 03',
  },
  {
    id: 4,
    src: '/photos/photo4.jpg',
    title: 'Late Night Corner',
    caption: 'Getting you out for your first nightout te pn permission gheun 😭😂.',
    tag: 'Chapter 04',
  },
  {
    id: 5,
    src: '/photos/photo5.jpg',
    title: 'Chicken Thali & Endless Talks',
    caption: 'Another hour, another round of tupatla(ghee) bhat, and a thousand stories.',
    tag: 'Chapter 05',
  },
  {
    id: 6,
    src: '/photos/photo6.jpg',
    title: 'Pure Chaotic Energy',
    caption: 'That one photo where neither of us could keep a straight face for two seconds.kyuki agar kuch bolte toh gharwale dekhne ajate 😭',
    tag: 'Chapter 06',
  },
  {
    id: 7,
    src: '/photos/photo7.jpg',
    title: 'Here’s to Always',
    caption: 'Through every season of life, I will always be right here in your corner.',
    tag: 'Chapter 07',
  },
]

/* ──────────────────────────────────────────
   Confetti (lightweight canvas burst)
   ────────────────────────────────────────── */
function launchConfetti(canvas) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ['#c9956b', '#d4829e', '#e8c170', '#f0e6d8', '#8ec5d4', '#b8a9d4']
  const particles = Array.from({ length: 160 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 80,
    y: canvas.height * 0.5,
    vx: (Math.random() - 0.5) * 26,
    vy: -Math.random() * 24 - 4,
    size: Math.random() * 8 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    rotV: (Math.random() - 0.5) * 14,
    opacity: 1,
    isCircle: Math.random() > 0.5,
  }))

  let frame
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false

    for (const p of particles) {
      p.vy += 0.38
      p.vx *= 0.99
      p.x += p.vx
      p.y += p.vy
      p.rot += p.rotV
      p.opacity -= 0.007

      if (p.opacity <= 0) continue
      alive = true

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rot * Math.PI) / 180)
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.color

      if (p.isCircle) {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      }

      ctx.restore()
    }

    if (alive) frame = requestAnimationFrame(animate)
  }

  animate()
  return () => cancelAnimationFrame(frame)
}

/* ──────────────────────────────────────────
   App
   ────────────────────────────────────────── */
export default function App() {
  const [letterOpen, setLetterOpen] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const canvasRef = useRef(null)

  /* Scroll-triggered fade-in */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Lightbox Keyboard Navigation */
  useEffect(() => {
    if (selectedPhotoIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhotoIndex(null)
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev > 0 ? prev - 1 : photos.length - 1
        )
      }
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) =>
          prev < photos.length - 1 ? prev + 1 : 0
        )
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex])

  const openGift = () => {
    if (giftOpen) return
    setGiftOpen(true)
    setTimeout(() => launchConfetti(canvasRef.current), 350)
  }

  return (
    <>
      <canvas ref={canvasRef} className="confetti-canvas" />

      {/* ─────── HERO ─────── */}
      <section className="section hero">
        <div className="hero-glow" />

        <div className="particles" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${5 + Math.random() * 6}s`,
                opacity: 0.15 + Math.random() * 0.25,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <p className="hero-pre anim-1">🎂</p>
          <p className="hero-subtitle anim-2">Happy Birthday</p>
          <h1 className="hero-title anim-3">
            To My <span className="highlight">Chavii</span>
          </h1>
          <p className="hero-tagline anim-4">✦ A little something just for you ✦</p>
        </div>

        <div className="scroll-hint anim-5">
          <span>scroll down(english samjh nahi arahi toh niche scroll kar) [MAZAK KARRAAA]</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </section>

      {/* ─────── LETTER ─────── */}
      <section className="section letter-section">
        <div className="fade-in">
          <h2 className="section-title">A Letter For tujhysathi</h2>

          <div
            className={`letter-card ${letterOpen ? 'open' : ''}`}
            onClick={() => !letterOpen && setLetterOpen(true)}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && !letterOpen && setLetterOpen(true)
            }
            role="button"
            tabIndex={0}
            aria-label={letterOpen ? 'Personal letter, opened' : 'Tap to open letter'}
          >
            {!letterOpen ? (
              <div className="letter-front">
                <span className="letter-seal">✉️</span>
                <p className="letter-prompt">tap to open</p>
              </div>
            ) : (
              <div className="letter-content">
                <p className="letter-greeting">Dear Butki,</p>
                <p>
                  Dekh jyada english bolu toh tu bore ho jaayegi kyuki waise bhi ati nahi toh gpt karuga, so I’ll keep it simple.
                  From the moment we met, I knew there was something special about our friendship. 
                  You’ve been my rock, my confidant, and my partner in crime through thick and thin.(sanika ke yaha jaisa doorbell bajake bhangenge hamesha lekin harbaar teko sath leke bhagunga)
                  
                </p>
                <p>
                  Thank you for every laugh, every late-night conversation, and every
                  moment that reminded me what true friendship feels like.Tu best hai yaar!!!
                  khudko underestimate mat karna, tu bohot strong hai aur tujhpe hamesha proud feel hota hai.

                </p>
                <p>Here's to all the adventures still waiting for us.</p>
                <p className="letter-sign">With all my love ❤️</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────── OUR MEMORIES ─────── */}
      <section className="section memories-photos-section">
        <div className="fade-in">
          <h2 className="section-title">Our Memories</h2>
          <p className="section-sub">A few snapshots of us · tap to enlarge</p>

          <div className="photos-grid">
            {photos.map((p, i) => (
              <div
                key={p.id}
                className="photo-card"
                onClick={() => setSelectedPhotoIndex(i)}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') && setSelectedPhotoIndex(i)
                }
                role="button"
                tabIndex={0}
                aria-label={`${p.title} - tap to view full photo`}
              >
                <div className="photo-frame">
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                  />
                  <div className="photo-overlay">
                    <span className="photo-zoom-icon">🔍</span>
                  </div>
                </div>
                <div className="photo-meta">
                  <span className="photo-tag">{p.tag}</span>
                  <h3 className="photo-title">{p.title}</h3>
                  <p className="photo-caption">{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── SURPRISE ─────── */}
      <section className="section surprise-section">
        <div className="fade-in">
          <h2 className="section-title">One Last Thing…</h2>

          <div
            className={`gift-container ${giftOpen ? 'opened' : ''}`}
            onClick={openGift}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openGift()}
            role="button"
            tabIndex={0}
            aria-label={giftOpen ? 'Gift opened' : 'Tap to unwrap your gift'}
          >
            <div className="gift-lid">
              <span className="gift-bow">🎀</span>
              <div className="gift-ribbon-h" />
            </div>
            <div className="gift-body">
              <div className="gift-ribbon-v" />
            </div>
          </div>

          {!giftOpen && <p className="gift-hint">tap to unwrap your gift</p>}

          {giftOpen && (
            <div className="gift-message">
              <p className="gift-emoji">🎉</p>
              <h2>Happy Birthday!</h2>
              <p>
                Here's to another year of being absolutely incredible. The world is
                brighter because you're in it.
              </p>
              <p className="gift-footer">— your best friend, always 💛</p>
            </div>
          )}
        </div>
      </section>

      {/* ─────── PHOTO LIGHTBOX MODAL ─────── */}
      {selectedPhotoIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedPhotoIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div
            className="lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label="Close photo viewer"
            >
              ✕
            </button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={() =>
                setSelectedPhotoIndex((prev) =>
                  prev > 0 ? prev - 1 : photos.length - 1
                )
              }
              aria-label="Previous photo"
            >
              ‹
            </button>

            <div className="lightbox-body">
              <div className="lightbox-image-box">
                <img
                  src={photos[selectedPhotoIndex].src}
                  alt={photos[selectedPhotoIndex].title}
                />
              </div>
              <div className="lightbox-info">
                <div className="lightbox-header">
                  <span className="lightbox-tag">
                    {photos[selectedPhotoIndex].tag}
                  </span>
                  <span className="lightbox-counter">
                    {selectedPhotoIndex + 1} / {photos.length}
                  </span>
                </div>
                <h3 className="lightbox-title">
                  {photos[selectedPhotoIndex].title}
                </h3>
                <p className="lightbox-caption">
                  {photos[selectedPhotoIndex].caption}
                </p>
              </div>
            </div>

            <button
              className="lightbox-nav lightbox-next"
              onClick={() =>
                setSelectedPhotoIndex((prev) =>
                  prev < photos.length - 1 ? prev + 1 : 0
                )
              }
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* ─────── FOOTER ─────── */}
      <footer className="footer">
        <p>made with ❤️ just for you</p>
      </footer>
    </>
  )
}

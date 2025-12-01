'use client'

import { useState, useEffect, useMemo, useCallback, memo } from 'react'

// Le 24 sfide del calendario dell'avvento
const CHALLENGES = [
  {
    id: 1,
    title: "MICRO DISCIPLINA",
    quote: "Le grandi vite si costruiscono da piccoli 'faccio adesso'.",
    challenge: "Scegli una cosa che rimandi da più di 48 ore (una mail, una chiamata, un documento, un messaggio) e falla subito.",
    emoji: "⚡"
  },
  {
    id: 2,
    title: "HABIT CHECK",
    quote: "Non cambi se non cambi le tue abitudini.",
    challenge: "Identifica 1 abitudine quotidiana che ti rallenta (scroll, snack, ritardi) e sostituiscila per oggi con un'alternativa più sana.",
    emoji: "🔄"
  },
  {
    id: 3,
    title: "CAMERA IN MODALITÀ HOTEL",
    quote: "Lo spazio in cui vivi è lo specchio di come vivi.",
    challenge: "Sistema la camera da letto come se arrivasse un ospite: letto perfetto, superfici libere, zero roba in vista.",
    emoji: "🛏️"
  },
  {
    id: 4,
    title: "SELF-CARE STRATEGICO",
    quote: "Prendersi cura di sé è un atto di alta produttività.",
    challenge: "Scegli 1 trattamento rapido: maschera viso, 15 min di stretching, doccia calda detox, crema corpo. Fallo con intenzione, non di corsa.",
    emoji: "💆"
  },
  {
    id: 5,
    title: "30 MIN MISSION",
    quote: "Se ti dai un limite, fai miracoli.",
    challenge: "Imposta un timer da 30 minuti e finisci una cosa che hai rimandato (ordinare un cassetto, rispondere a messaggi, sistemare foto, lavatrice).",
    emoji: "⏱️"
  },
  {
    id: 6,
    title: "CHIAREZZA RADICALE",
    quote: "Confusione = procrastinazione.",
    challenge: "Prendi un problema o una situazione confusa e rispondi a 3 domande:\n1. Qual è il vero problema?\n2. Cosa posso controllare?\n3. Qual è il primo passo?\nPoi fai quel passo.",
    emoji: "🎯"
  },
  {
    id: 7,
    title: "PRIORITÀ PRIME",
    quote: "La giornata la vinci entro le prime due ore.",
    challenge: "Domani mattina, niente telefono per i primi 20 minuti. Bevi acqua, prepara letto e fai 1 micro cosa produttiva.",
    emoji: "🌅"
  },
  {
    id: 8,
    title: "MINIMAL RESET",
    quote: "Aggiungere non ti serve. Togliere sì.",
    challenge: "Elimina 5 file inutili dal telefono (foto doppie, screen vecchi) + 3 mail che non leggerai mai.",
    emoji: "🗑️"
  },
  {
    id: 9,
    title: "CORPO PRESENTE",
    quote: "La mente si allinea quando il corpo si muove.",
    challenge: "10 minuti di movimento: camminata veloce, mobility, mini circuito. Basta che lo fai oggi.",
    emoji: "🏃"
  },
  {
    id: 10,
    title: "VISIONE A 5 MINUTI",
    quote: "Se non ti siedi a guardare dentro, camminerai a caso.",
    challenge: "Scrivi su una nota:\n– 1 cosa che vuoi attrarre questo mese\n– 1 emozione che vuoi lasciare\n– 1 micro-azione che puoi fare già oggi",
    emoji: "👁️"
  },
  {
    id: 11,
    title: "1% MIGLIORE",
    quote: "Non devi rivoluzionarti, devi migliorarti di un niente… ogni giorno.",
    challenge: "Scegli un'abitudine e migliora di 1%: dormi 10 min prima, bevi 1 litro d'acqua, fai 10 squat, leggi 1 pagina.",
    emoji: "📈"
  },
  {
    id: 12,
    title: "RICARICA EMOTIVA",
    quote: "Non sei una macchina: la tua energia è un capitale.",
    challenge: "Fai una cosa che ti ricarica davvero (playlist preferita, libro, serie, tisana calda, passeggiata) per almeno 15 minuti senza sensi di colpa.",
    emoji: "🔋"
  },
  {
    id: 13,
    title: "MONEY CHECK",
    quote: "Quello che non controlli, ti controlla.",
    challenge: "Guarda gli ultimi 7 giorni e scrivi:\n• 3 spese inutili\n• quanto potevi risparmiare.",
    emoji: "💰"
  },
  {
    id: 14,
    title: "ORDINE OPERATIVO",
    quote: "Se la tua scrivania è un casino, la tua testa è uguale.",
    challenge: "Sistema scrivania + prima schermata telefono.",
    emoji: "🖥️"
  },
  {
    id: 15,
    title: "DIGITAL DETOX MIRATO",
    quote: "Ti lamenti del tempo ma lo regali allo schermo.",
    challenge: "2 ore senza social né scroll: solo cose utili.",
    emoji: "📵"
  },
  {
    id: 16,
    title: "VITTORIA MISURABILE",
    quote: "Se non puoi misurarlo, non lo stai facendo davvero.",
    challenge: "Scegli 1 micro-obiettivo e fallo entro oggi.",
    emoji: "🏆"
  },
  {
    id: 17,
    title: "RESET TOTALE",
    quote: "Prima di cambiare vita, devi smettere di vivere nel casino.",
    challenge: "Elimina/regala 10 oggetti inutili.",
    emoji: "♻️"
  },
  {
    id: 18,
    title: "ATTO DI BENE",
    quote: "La lealtà si premia, il resto si ignora.",
    challenge: "Scegli una persona che merita davvero e fai per lei un gesto concreto che gli cambia la giornata (tempo, soldi, aiuto, opportunità). Niente annunci, niente storie: in silenzio.",
    emoji: "🤝"
  },
  {
    id: 19,
    title: "IL SALTO CHE RIMANDI",
    quote: "La zona di comfort è un recinto dorato.",
    challenge: "Fai una cosa che eviti da mesi:\n• chiamata difficile\n• mail che ti blocca\n• proposta che ti intimidisce\n• richiesta che non hai il coraggio di fare\nLa fai oggi, senza piano B.",
    emoji: "🚀"
  },
  {
    id: 20,
    title: "TEST DEL GIUDIZIO",
    quote: "Se ti vergogni, non sei libero.",
    challenge: "Fai un'azione che ti mette a disagio ma che sai che ti serve:\n• parlare chiaramente\n• dire un no diretto\n• dire la verità senza filtri\n• farti valere in un contesto dove non lo fai mai\nSuperi l'imbarazzo → vinci.",
    emoji: "🦁"
  },
  {
    id: 21,
    title: "COLD EXECUTION",
    quote: "Fare le cose quando hai voglia non vale niente.",
    challenge: "Scegli un compito pesante → lo fai subito, senza prepararti, senza riscaldarti, senza procrastinare. Esecuzione a freddo.",
    emoji: "❄️"
  },
  {
    id: 22,
    title: "CARRELLO PULITO",
    quote: "Mangi male perché non hai un piano.",
    challenge: "Scrivi la lista della spesa per 1 piatto sano e completo:\n• Proteine + carboidrati + verdure + grassi buoni\n• Roba vera, non confezionata\n• Lo cucini e lo mangi entro 5 giorni.",
    emoji: "🥗"
  },
  {
    id: 23,
    title: "MAPPA SETTIMANALE",
    quote: "La settimana ti travolge se non la progetti.",
    challenge: "Prendi un foglio e struttura i prossimi 7 giorni:\n• 3 priorità lavorative\n• 2 appuntamenti fissi personali\n• 1 blocco tempo per te (sport, skill, progetto)\nScrivi gli orari, non solo 'fare X'.",
    emoji: "📅"
  },
  {
    id: 24,
    title: "ROADMAP FEBBRAIO",
    quote: "Senza traguardi chiari stai solo camminando a caso.",
    challenge: "Definisci 3 obiettivi concreti da raggiungere entro fine febbraio:\n• 1 economico (fatturato, risparmio, vendita)\n• 1 professionale (skill, progetto, cliente)\n• 1 personale (fisico, relazione, abitudine)\nScrivi come li misuri.",
    emoji: "🗺️"
  }
]

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

function shuffleWithSeed(array: typeof CHALLENGES, seed: number): typeof CHALLENGES {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const YEAR_SEED = 2024
const SHUFFLED_CHALLENGES = shuffleWithSeed(CHALLENGES, YEAR_SEED)

export default function AdventCalendar() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  // Ora del reveal: 10:06:00 ora di Roma
  const REVEAL_HOUR = 10
  const REVEAL_MINUTE = 6
  const REVEAL_SECOND = 0

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const romeTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Rome' }))
      setCurrentTime(romeTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])


  const currentDay = useMemo(() => {
    if (!currentTime) return 0
    const day = currentTime.getDate()
    const month = currentTime.getMonth() + 1
    if (month !== 12 || day > 24) return 0
    return day
  }, [currentTime])

  const isPastRevealTime = useMemo(() => {
    if (!currentTime) return false
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    const seconds = currentTime.getSeconds()
    
    if (hours > REVEAL_HOUR) return true
    if (hours === REVEAL_HOUR && minutes > REVEAL_MINUTE) return true
    if (hours === REVEAL_HOUR && minutes === REVEAL_MINUTE && seconds >= REVEAL_SECOND) return true
    return false
  }, [currentTime])

  const todayChallenge = useMemo(() => {
    if (currentDay === 0) return null
    if (!isPastRevealTime) return null
    return SHUFFLED_CHALLENGES[currentDay - 1]
  }, [currentDay, isPastRevealTime])

  const countdown = useMemo(() => {
    if (!currentTime) return { hours: 0, minutes: 0, seconds: 0 }
    
    const targetDate = new Date(currentTime)
    
    if (isPastRevealTime) {
      targetDate.setDate(targetDate.getDate() + 1)
    }
    
    targetDate.setHours(REVEAL_HOUR, REVEAL_MINUTE, REVEAL_SECOND, 0)
    
    const diff = targetDate.getTime() - currentTime.getTime()
    
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    return { hours, minutes, seconds }
  }, [currentTime, isPastRevealTime])

  useEffect(() => {
    if (todayChallenge && !isRevealed) {
      setIsRevealed(true)
    }
  }, [todayChallenge, isRevealed])

  useEffect(() => {
    if (!isPastRevealTime) {
      setIsRevealed(false)
    }
  }, [isPastRevealTime])

  const unlockedDays = useMemo(() => {
    if (!currentTime || currentDay === 0) return []
    const days: number[] = []
    for (let i = 1; i < currentDay; i++) {
      days.push(i)
    }
    if (isPastRevealTime && currentDay > 0) {
      days.push(currentDay)
    }
    return days
  }, [currentTime, currentDay, isPastRevealTime])


  if (!currentTime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
        <Snowfall />
        <div className="text-4xl text-amber-400 animate-pulse z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
          🎄 Caricamento...
        </div>
      </div>
    )
  }

  const month = currentTime.getMonth() + 1
  const day = currentTime.getDate()

  if (month !== 12 || day > 24) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#0a0a12]">
        <Background />
        <Snowfall />
        <ChristmasLights />
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl md:text-7xl mb-6 tracking-wide" 
                style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-green-500">🎄</span>
              <span className="mx-4 text-amber-400" style={{ textShadow: '0 0 30px rgba(251, 191, 36, 0.5)' }}>
                Calendario dell'Avvento
              </span>
              <span className="text-green-500">🎄</span>
            </h1>
            <p className="text-2xl text-amber-100/80 mb-8" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {month < 12 ? (
                "Ti aspettiamo dal 1° Dicembre! Preparati per 24 sfide che cambieranno le tue abitudini."
              ) : (
                "Il calendario è terminato! Speriamo che le 24 sfide ti abbiano ispirato. Ci vediamo l'anno prossimo! 🎅"
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#0a0a12]">
      <Background />
      <Snowfall />
      <ChristmasLights />
      
      <div className="relative z-10 h-full w-full flex flex-col">
        {/* Header elegante */}
        <header className="text-center pt-8 pb-4 px-4 shrink-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
            <span className="text-amber-400/90" style={{ textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)' }}>
              Calendario dell'Avvento
            </span>
          </h1>
          <p className="text-sm sm:text-base text-amber-100/50 mt-3 tracking-widest uppercase" 
             style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, letterSpacing: '0.2em' }}>
            {currentTime.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </header>

        {/* Contenuto principale - tutto lo spazio rimanente */}
        <main className="flex-1 min-h-0">
          {todayChallenge ? (
            <ChristmasEnvelope 
              challenge={todayChallenge} 
              day={currentDay}
            />
          ) : (
            <CountdownEnvelope 
              countdown={countdown} 
              day={currentDay}
            />
          )}
        </main>
      </div>
    </div>
  )
}

// ============ BUSTA FINALE ============
const ChristmasEnvelope = memo(function ChristmasEnvelope({ 
  challenge, 
  day,
}: { 
  challenge: typeof CHALLENGES[0]
  day: number
}) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000)    // lembo si apre
    const t2 = setTimeout(() => setStep(2), 2500)   // foglio sale
    const t3 = setTimeout(() => setStep(3), 4500)   // foglio si spiega
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="scene">
      <div className="envelope-container">
        {/* FOGLIO DECORATO */}
        <div className={`letter ${step >= 2 ? 'out' : ''} ${step >= 3 ? 'unfolded' : ''}`}>
          {/* Decorazioni angoli */}
          <div className="corner corner-tl">❄</div>
          <div className="corner corner-tr">❄</div>
          <div className="corner corner-bl">❄</div>
          <div className="corner corner-br">❄</div>
          
          <div className="fold fold-top">
            <div className="fold-content">
              <div className="ribbon">🎄</div>
              <span className="day-num">Giorno {day}</span>
              <h2 className="title">{challenge.title}</h2>
            </div>
          </div>
          <div className="fold fold-mid">
            <div className="fold-content">
              <div className="quote-mark">"</div>
              <p className="quote">{challenge.quote}</p>
              <div className="quote-mark end">"</div>
            </div>
          </div>
          <div className="fold fold-bot">
            <div className="fold-content">
              <div className="divider">✦ ✦ ✦</div>
              <h3 className="challenge-h">🎯 LA TUA SFIDA</h3>
              <p className="challenge-p">{challenge.challenge}</p>
              <div className="footer-deco">🎅</div>
            </div>
          </div>
        </div>

        {/* BUSTA DECORATA */}
        <div className={`envelope ${step >= 1 ? 'opened' : ''}`}>
          <div className="env-body">
            {/* Decorazioni natalizie */}
            <div className="env-pattern"></div>
            <div className="env-ribbon-h"></div>
            <div className="env-ribbon-v"></div>
            <div className="env-bow">🎀</div>
            
            {/* Sigillo */}
            <div className="seal">{day}</div>
            
            {/* Angoli decorati */}
            <div className="env-corner env-corner-bl">❄</div>
            <div className="env-corner env-corner-br">❄</div>
          </div>
          <div className="env-flap">
            <div className="flap-star">✦</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scene {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .envelope-container {
          position: relative;
          animation: slideIn 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes slideIn {
          from { transform: translateY(120vh); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* ===== BUSTA DECORATA ===== */
        .envelope {
          position: relative;
          width: 320px;
          height: 180px;
          z-index: 10;
        }

        .env-body {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #ef4444 0%, #dc2626 40%, #b91c1c 100%);
          border-radius: 12px;
          box-shadow: 
            0 20px 60px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.1);
          overflow: hidden;
        }

        /* Pattern sottile */
        .env-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* Nastri regalo */
        .env-ribbon-h {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 12px;
          background: linear-gradient(180deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%);
          transform: translateY(-50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .env-ribbon-v {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 12px;
          background: linear-gradient(90deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%);
          transform: translateX(-50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .env-bow {
          position: absolute;
          top: calc(50% - 20px);
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 28px;
          z-index: 10;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .seal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 52px;
          height: 52px;
          background: radial-gradient(circle at 30% 30%, #fcd34d, #f59e0b, #d97706);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: bold;
          color: #7f1d1d;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3);
          z-index: 20;
          transition: opacity 0.6s, transform 0.6s;
        }

        .env-corner {
          position: absolute;
          font-size: 16px;
          color: rgba(255,255,255,0.3);
          transition: opacity 0.6s;
        }
        .env-corner-bl { bottom: 10px; left: 12px; }
        .env-corner-br { bottom: 10px; right: 12px; }

        .envelope.opened .seal {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }

        .envelope.opened .env-corner,
        .envelope.opened .env-bow,
        .envelope.opened .env-ribbon-h,
        .envelope.opened .env-ribbon-v {
          opacity: 0;
        }

        .env-flap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          background: linear-gradient(180deg, #c53030 0%, #991b1b 100%);
          border-radius: 12px 12px 0 0;
          transform-origin: top center;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 15;
          overflow: hidden;
        }

        .env-flap::before {
          content: '';
          position: absolute;
          bottom: -45px;
          left: 0;
          right: 0;
          border-style: solid;
          border-width: 45px 160px 0 160px;
          border-color: #991b1b transparent transparent transparent;
        }

        .flap-star {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: rgba(251, 191, 36, 0.5);
        }

        .envelope.opened .env-flap {
          transform: rotateX(-180deg);
        }

        /* ===== FOGLIO DECORATO ===== */
        .letter {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%);
          border-radius: 8px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          overflow: hidden;
          z-index: 5;
          opacity: 0;
          border: 2px solid rgba(180, 83, 9, 0.15);
          transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .letter.out {
          top: -260px;
          opacity: 1;
          z-index: 20;
        }

        /* Decorazioni angoli */
        .corner {
          position: absolute;
          font-size: 14px;
          color: #60a5fa;
          opacity: 0.6;
          z-index: 10;
        }
        .corner-tl { top: 6px; left: 8px; }
        .corner-tr { top: 6px; right: 8px; }
        .corner-bl { bottom: 6px; left: 8px; }
        .corner-br { bottom: 6px; right: 8px; }

        .fold {
          background: transparent;
          overflow: hidden;
          position: relative;
        }

        .fold-content {
          padding: 12px 18px;
          text-align: center;
        }

        .fold-top, .fold-bot {
          max-height: 0;
          transition: max-height 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .letter.unfolded .fold-top,
        .letter.unfolded .fold-bot {
          max-height: 300px;
        }

        /* Decorazioni lettera */
        .ribbon { font-size: 28px; margin-bottom: 4px; }
        .day-num { font-family: 'Playfair Display', serif; font-size: 11px; color: #b45309; display: block; letter-spacing: 2px; text-transform: uppercase; }
        .title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #78350f; margin: 4px 0 0; line-height: 1.2; }
        
        .quote-mark { font-family: Georgia, serif; font-size: 28px; color: #d97706; opacity: 0.4; line-height: 0.5; }
        .quote-mark.end { margin-top: -8px; }
        .quote { font-family: 'Dancing Script', cursive; font-size: 16px; color: #92400e; font-style: italic; margin: 4px 0; line-height: 1.4; }
        
        .divider { font-size: 10px; color: #d97706; margin-bottom: 8px; letter-spacing: 4px; }
        .challenge-h { font-family: 'Playfair Display', serif; font-size: 12px; color: #b45309; margin: 0 0 8px; letter-spacing: 1px; }
        .challenge-p { font-family: Georgia, serif; font-size: 12px; color: #78350f; margin: 0; text-align: left; line-height: 1.5; white-space: pre-line; }
        .footer-deco { font-size: 20px; margin-top: 10px; }

        /* ===== RESPONSIVE ===== */
        @media (max-height: 700px) {
          .envelope { width: 280px; height: 160px; }
          .env-flap { height: 80px; }
          .env-flap::before { bottom: -40px; border-width: 40px 140px 0 140px; }
          .letter { width: 250px; top: 80px; }
          .letter.out { top: -220px; }
          .seal { width: 48px; height: 48px; font-size: 18px; }
          .fold-content { padding: 10px 14px; }
          .ribbon { font-size: 22px; }
          .title { font-size: 15px; }
          .quote { font-size: 14px; }
          .challenge-p { font-size: 11px; }
        }

        @media (max-width: 360px) {
          .envelope { width: 260px; height: 150px; }
          .env-flap { height: 75px; }
          .env-flap::before { bottom: -38px; border-width: 38px 130px 0 130px; }
          .letter { width: 230px; top: 75px; }
          .letter.out { top: -200px; }
        }
      `}</style>
    </div>
  )
})

// ============ COUNTDOWN FINALE ============
const CountdownEnvelope = memo(function CountdownEnvelope({ 
  countdown, 
  day,
}: { 
  countdown: { hours: number; minutes: number; seconds: number }
  day: number
}) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000)
    const t2 = setTimeout(() => setStep(2), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="scene">
      <div className="envelope-container">
        {/* FOGLIO */}
        <div className={`letter ${step >= 2 ? 'out' : ''}`}>
          <div className="corner corner-tl">❄</div>
          <div className="corner corner-tr">❄</div>
          <div className="corner corner-bl">❄</div>
          <div className="corner corner-br">❄</div>
          
          <div className="letter-content">
            <span className="emoji">🎁</span>
            <h2 className="title">Giorno {day}</h2>
            <p className="subtitle">La sfida si svela tra...</p>
            
            <div className="timer">
              {[
                { value: countdown.hours, label: 'Ore' },
                { value: countdown.minutes, label: 'Min' },
                { value: countdown.seconds, label: 'Sec' }
              ].map((item, i) => (
                <div key={i} className="timer-unit">
                  <span className="timer-value">{item.value.toString().padStart(2, '0')}</span>
                  <span className="timer-label">{item.label}</span>
                </div>
              ))}
            </div>
            
            <p className="note">⏰ Ogni giorno alle 10:06</p>
          </div>
        </div>

        {/* BUSTA DECORATA */}
        <div className={`envelope ${step >= 1 ? 'opened' : ''}`}>
          <div className="env-body">
            <div className="env-pattern"></div>
            <div className="env-ribbon-h"></div>
            <div className="env-ribbon-v"></div>
            <div className="env-bow">🎀</div>
            <div className="seal">?</div>
            <div className="env-corner env-corner-bl">❄</div>
            <div className="env-corner env-corner-br">❄</div>
          </div>
          <div className="env-flap">
            <div className="flap-star">✦</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scene {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .envelope-container {
          position: relative;
          animation: slideIn 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes slideIn {
          from { transform: translateY(120vh); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .envelope {
          position: relative;
          width: 320px;
          height: 180px;
          z-index: 10;
        }

        .env-body {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #ef4444 0%, #dc2626 40%, #b91c1c 100%);
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          overflow: hidden;
        }

        .env-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .env-ribbon-h {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 12px;
          background: linear-gradient(180deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%);
          transform: translateY(-50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .env-ribbon-v {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 12px;
          background: linear-gradient(90deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%);
          transform: translateX(-50%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .env-bow {
          position: absolute;
          top: calc(50% - 20px);
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 28px;
          z-index: 10;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .seal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 52px;
          height: 52px;
          background: radial-gradient(circle at 30% 30%, #fcd34d, #f59e0b, #d97706);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: bold;
          color: #7f1d1d;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3);
          z-index: 20;
          transition: opacity 0.6s, transform 0.6s;
        }

        .env-corner {
          position: absolute;
          font-size: 16px;
          color: rgba(255,255,255,0.3);
          transition: opacity 0.6s;
        }
        .env-corner-bl { bottom: 10px; left: 12px; }
        .env-corner-br { bottom: 10px; right: 12px; }

        .envelope.opened .seal {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }

        .envelope.opened .env-corner,
        .envelope.opened .env-bow,
        .envelope.opened .env-ribbon-h,
        .envelope.opened .env-ribbon-v {
          opacity: 0;
        }

        .env-flap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          background: linear-gradient(180deg, #c53030 0%, #991b1b 100%);
          border-radius: 12px 12px 0 0;
          transform-origin: top center;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 15;
          overflow: hidden;
        }

        .env-flap::before {
          content: '';
          position: absolute;
          bottom: -45px;
          left: 0;
          right: 0;
          border-style: solid;
          border-width: 45px 160px 0 160px;
          border-color: #991b1b transparent transparent transparent;
        }

        .flap-star {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: rgba(251, 191, 36, 0.5);
        }

        .envelope.opened .env-flap {
          transform: rotateX(-180deg);
        }

        .letter {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%);
          border-radius: 8px;
          z-index: 5;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          border: 2px solid rgba(180, 83, 9, 0.15);
          opacity: 0;
          transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .letter.out {
          top: -240px;
          opacity: 1;
          z-index: 20;
        }

        .corner {
          position: absolute;
          font-size: 14px;
          color: #60a5fa;
          opacity: 0.6;
          z-index: 10;
        }
        .corner-tl { top: 6px; left: 8px; }
        .corner-tr { top: 6px; right: 8px; }
        .corner-bl { bottom: 6px; left: 8px; }
        .corner-br { bottom: 6px; right: 8px; }

        .letter-content {
          padding: 16px 14px;
          text-align: center;
        }

        .emoji { font-size: 34px; display: block; margin-bottom: 6px; }
        .title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #78350f; margin: 0 0 2px; }
        .subtitle { font-family: 'Playfair Display', serif; font-size: 11px; color: #92400e; margin: 0 0 12px; }

        .timer {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .timer-unit {
          background: linear-gradient(135deg, #b91c1c, #991b1b);
          border-radius: 8px;
          padding: 8px 10px;
          min-width: 50px;
          border: 2px solid rgba(251, 191, 36, 0.4);
        }

        .timer-value {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: bold;
          color: #fbbf24;
        }

        .timer-label {
          display: block;
          font-size: 8px;
          color: #fef3c7;
          margin-top: 2px;
        }

        .note { font-family: 'Dancing Script', cursive; font-size: 13px; color: #92400e; margin: 0; }

        @media (max-height: 700px) {
          .envelope { width: 280px; height: 160px; }
          .env-flap { height: 80px; }
          .env-flap::before { bottom: -40px; border-width: 40px 140px 0 140px; }
          .letter { width: 250px; top: 80px; }
          .letter.out { top: -210px; }
          .seal { width: 48px; height: 48px; font-size: 18px; }
          .letter-content { padding: 12px 10px; }
          .emoji { font-size: 28px; }
          .title { font-size: 15px; }
          .timer-value { font-size: 16px; }
          .timer-unit { min-width: 44px; padding: 6px 8px; }
        }
      `}</style>
    </div>
  )
})

// ============ PAST DAY BADGE ============
const PastDayBadge = memo(function PastDayBadge({ 
  day, 
  challenge 
}: { 
  day: number
  challenge: typeof CHALLENGES[0] 
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-red-800 to-red-950 
                   border-2 border-amber-400/30 flex items-center justify-center
                   hover:scale-110 hover:border-amber-400/70 transition-all duration-300
                   text-2xl shadow-lg"
        title={challenge.title}
      >
        {challenge.emoji}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="max-w-md w-full rounded-2xl p-6 text-center
                      bg-gradient-to-br from-amber-50 to-amber-100
                      border-2 border-amber-400/50"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: 'Playfair Display, serif', animation: 'popIn 0.3s ease-out' }}
          >
            <div className="text-5xl mb-3">{challenge.emoji}</div>
            <div className="text-amber-700/70 text-sm mb-1">Giorno {day}</div>
            <h3 className="text-2xl text-amber-900 font-bold mb-3">{challenge.title}</h3>
            <blockquote className="text-lg text-amber-800 italic mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
              "{challenge.quote}"
            </blockquote>
            <div className="bg-amber-200/50 rounded-xl p-4 text-left">
              <p className="text-amber-900 text-sm whitespace-pre-line">{challenge.challenge}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-red-700 to-red-800 
                        text-amber-200 rounded-full text-sm hover:from-red-600 hover:to-red-700 transition-all"
            >
              Chiudi ✨
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes popIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
})

// ============ BACKGROUND ============
const Background = memo(function Background() {
  const stars = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    })), [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 opacity-25"
           style={{
             background: `
               radial-gradient(ellipse 80% 50% at 20% 0%, rgba(16, 185, 129, 0.25) 0%, transparent 50%),
               radial-gradient(ellipse 60% 40% at 80% 10%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
               radial-gradient(ellipse 50% 30% at 50% 100%, rgba(220, 38, 38, 0.2) 0%, transparent 50%)
             `
           }} />
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
})

// ============ SNOWFALL - SEMPRE VISIBILE ============
const Snowfall = memo(function Snowfall() {
  const flakes = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${(i * 2) % 100}%`,
      size: 0.5 + (i % 4) * 0.25,
      duration: 10 + (i % 6) * 3,
      delay: (i * 0.3) % 10,
      opacity: 0.4 + (i % 3) * 0.2,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute"
          style={{
            left: flake.left,
            fontSize: `${flake.size}rem`,
            opacity: flake.opacity,
            color: 'white',
            textShadow: '0 0 5px rgba(255,255,255,0.8)',
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄
        </div>
      ))}
      <style jsx>{`
        @keyframes snowfall {
          0% { 
            transform: translateY(-5vh) rotate(0deg); 
          }
          100% { 
            transform: translateY(105vh) rotate(360deg); 
          }
        }
      `}</style>
    </div>
  )
})

// ============ CHRISTMAS LIGHTS ============
const ChristmasLights = memo(function ChristmasLights() {
  const colors = ['#ef4444', '#22c55e', '#eab308', '#ec4899', '#06b6d4', '#f97316', '#a855f7']
  
  const lights = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      delay: i * 0.12,
    })), [])

  return (
    <div className="fixed top-0 left-0 right-0 h-10 z-[90] flex justify-around items-end px-2">
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-800" />
      
      {lights.map((light) => (
        <div key={light.id} className="relative flex flex-col items-center">
          <div className="w-px h-2 bg-gray-700" />
          <div 
            className="w-2.5 h-4 rounded-full"
            style={{
              backgroundColor: light.color,
              boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
              animation: `glow 1.5s ease-in-out infinite`,
              animationDelay: `${light.delay}s`,
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.6); }
        }
      `}</style>
    </div>
  )
})

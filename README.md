# 🎄 Calendario dell'Avvento 2024

Un calendario dell'avvento interattivo con **24 sfide quotidiane** per migliorarti prima di Natale!

## ✨ Caratteristiche

- 🎁 **24 sfide uniche** - Una nuova sfida ogni giorno dal 1° al 24 dicembre
- ⏰ **Reveal giornaliero** - Ogni giorno alle 10:06:02 (ora di Roma) si svela la nuova sfida
- 🎲 **Ordine randomico** - Le sfide appaiono in ordine casuale ma deterministico
- ❄️ **Grafica natalizia** - Neve che cade, luci di Natale animate, effetti festivi
- 📱 **Responsive** - Perfetto su mobile, tablet e desktop
- 🔔 **Countdown** - Timer che mostra quanto manca alla prossima sfida

## 🚀 Deploy su Vercel

### Opzione 1: Deploy Diretto
1. Installa Vercel CLI: `npm i -g vercel`
2. Nella cartella del progetto: `vercel`
3. Segui le istruzioni per collegare il tuo account

### Opzione 2: Da GitHub
1. Carica il progetto su GitHub
2. Vai su [vercel.com](https://vercel.com)
3. Clicca "Import Project" e seleziona il repository
4. Vercel rileverà automaticamente Next.js e farà il deploy

## 💻 Sviluppo Locale

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Apri http://localhost:3000
```

## 📁 Struttura

```
calendario/
├── app/
│   ├── layout.tsx    # Layout principale
│   ├── page.tsx      # Componente calendario
│   └── globals.css   # Stili globali
├── package.json
├── tailwind.config.ts
└── next.config.js
```

## 🎯 Come Funziona

1. **Dal 1° al 24 Dicembre**: Ogni giorno alle 10:06:02 si sblocca una nuova sfida
2. **Sfide Passate**: Puoi rivedere tutte le sfide già sbloccate cliccando sulle caselle
3. **Countdown**: Prima del reveal, vedrai un timer che indica quanto manca

## 🎨 Tecnologie

- **Next.js 14** - Framework React
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Vercel** - Hosting

---

Fatto con ❤️ per un Natale pieno di crescita personale! 🎄


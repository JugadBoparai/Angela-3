# Angela Kaur Bhathal 💌 | Valentine Game

A cinematic single-page Valentine interactive game built with React, Tailwind CSS, and Framer Motion.

**Homepage:** [https://jugadboparai.github.io/Angela-3/](https://jugadboparai.github.io/Angela-3/)

## Features

- **Intro Screen**: Playful Yes/No Valentine question with escalating messages when "No" is clicked
- **Gift Selection**: Choose from 3 romantic gift options with hover animations
- **Final Cinematic Screen**: Love letter with confetti, flying hearts, and music
- **Progress Bar**: Updates through the experience (0% → 33% → 66% → 100%)
- **Mobile Responsive**: Optimized for all screen sizes

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Deploy til GitHub Pages

**Viktig:** GitHub Pages må servere den **bygde** appen fra **gh-pages**-branchen, ikke kildekoden fra main.

### Alternativ 1: Automatisk deploy (anbefalt)
Push til `main` – GitHub Actions bygger og pusher til `gh-pages` automatisk.

### Alternativ 2: Manuell deploy
```bash
npm install
npm run deploy
```

### GitHub Pages-innstillinger
1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `gh-pages` | **Folder:** `/ (root)`
4. Lagre

### Riktig URL
Åpne **https://jugadboparai.github.io/Angela-3/** (med `/Angela-3/` og avsluttende `/`).  
Hvis du åpner `jugadboparai.github.io` uten `/Angela-3/`, får du feil side eller 404.

**Live:** [https://jugadboparai.github.io/Angela-3/](https://jugadboparai.github.io/Angela-3/)

## Customization

### Personal Photo
Replace the placeholder image in `src/components/FinalScreen.jsx`:

```js
const PLACEHOLDER_IMAGE = 'YOUR_IMAGE_URL'
```

Or use a local image by placing it in `public/` and referencing it as `/your-image.jpg`.

### Love Song
Replace the music URL in `src/components/FinalScreen.jsx`:

```js
const LOVE_SONG_URL = 'YOUR_MUSIC_URL'
```

**Note**: Most browsers require user interaction before playing audio. If music doesn't autoplay, consider adding a "Play music" button on the final screen.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- canvas-confetti

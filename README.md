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

**Alt på én branch (main):** kildekode og bygget nettside i mappen `docs/`.

### Automatisk deploy
Push til `main` – GitHub Actions bygger og legger bygget i `docs/` på main.

### GitHub Pages-innstillinger
1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` | **Folder:** `/docs`
4. Lagre

Hvis workflowen feiler: **Settings → Actions → General → Workflow permissions** → velg **Read and write permissions**, lagre.

### Riktig URL
Åpne **https://jugadboparai.github.io/Angela-3/** (med `/Angela-3/` og avsluttende `/`).  
Hvis du åpner `jugadboparai.github.io` uten `/Angela-3/`, får du feil side eller 404.

**Live:** [https://jugadboparai.github.io/Angela-3/](https://jugadboparai.github.io/Angela-3/)

### Hvis du får 404 (Failed to load resource)

**Hva betyr det?**  
Nettleseren ber om en fil (JS, bilde, musikk, favicon), men serveren svarer at den ikke finnes (404 Not Found).

**Finn hvilken fil som feiler**
1. Åpne siden på https://jugadboparai.github.io/Angela-3/
2. **F12** (eller høyreklikk → Inspiser) → **Network**-fanen
3. Oppdater siden (F5)
4. Klikk på **Status** for å sortere – de som er **404** er de som feiler
5. Klikk på den røde linjen – **Request URL** viser nøyaktig hvilken adresse som ga 404

**Vanlige årsaker og løsninger**

| Hvis URL er … | Årsak | Løsning |
|---------------|--------|---------|
| `.../src/main.jsx` | Feil side serveres (kildekode i stedet for bygget) | Sjekk at GitHub Pages bruker **gh-pages**-branchen, ikke main. Åpne **https://jugadboparai.github.io/Angela-3/** (med `/Angela-3/`). |
| `.../Angela-3/IMG_0628.jpeg` eller `.../love-song.mp3` | Fil mangler på gh-pages | Kjør `npm run deploy` på nytt, eller push til main slik at workflowen deployer. Sjekk at `public/IMG_0628.jpeg` og `public/love-song.mp3` finnes og er committet. |
| Gammel/cachet side | Nettleseren bruker gammel versjon | **Hard refresh:** Ctrl+Shift+R (Windows) eller Cmd+Shift+R (Mac). |

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

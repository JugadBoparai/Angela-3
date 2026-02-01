# Angela Kaur Bhathal 💌 | Valentine Game

A cinematic single-page Valentine interactive game built with React, Tailwind CSS, and Framer Motion.

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

next.js starter for leaflet-react
---------------------------------

An extensible [next.js](https://nextjs.org/) starter kit for the [leaflet-react](https://react-leaflet.js.org/) map plugin. Template visually enhanced by [tailwind](https://tailwindcss.com/) and [lucide icons](https://lucide.dev/). ✨
Using the power of  [typescript](https://www.typescriptlang.org/) for better scalability.

## 🎇 Features

- 🏇 powered by the mighty next.js 13
- 🗺 leaflet-react no-ssr setup
- 😏 typescript + strict lint setup
- 🔗 next.js ready route nav module
- 🌤 modular demo content
- 🐛 custom marker icons
- 📚 marker categories
- ⚓️ custom hooks for getting marker data and map context (thx [Flo301](https://github.com/Flo301))
- 🏡 custom ui components (locate me, center on markers)

## 🏎 Getting Started

### ⛴ Clone & Deploy with Github and Vercel

Create new Github repo with vercel and deploy it within minutes. Could not be easier as hitting some buttons. Shipping of private repos is possible.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frichard-unterberg%2Fnext-leaflet-starter-typescript)

Later: Check out your repo locally and run ```npm install``` or ```yarn``` in root

Follow Instructions for [Starting Up](#start-up)

### ⚙️ Manual install

```bash
git clone https://github.com/richard-unterberg/next-leaflet-starter-typescript
# then
npm install
# or
yarn
```

## Start up

According the official [Next.js Docs](https://nextjs.org/docs/getting-started):

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Building with type checking and linting

```bash
npm run build
# or
yarn build
```

Start build locally

```bash
npm run start
# or
yarn start
```

## 📊 Coming up (probably)

- marker cluster
- modified zoom in / zoom out
- global styling for map ui components
- fix error when setting new coordinates in hot reload "Map container is already initialized."
- create breakpoint hook synced with tailwind breakpoint which is usable in js

- Feel free to contribute!

### 🤯 How to remove those damn linting rules

You can adjust the settings mainly in ```eslint.json``` and ```tsconfig.json```.

I've been using them a lot on my dayjob so I can't be anymore without them.

### 📝 Don't wanna use typscript at all?

See this nice javascript implementation  - My starter is heavily inspired by this one:
https://github.com/colbyfayock/next-leaflet-starter


Happy coding! ✌️👽

# Yaroslav_Net

**🌐 Live: [https://groznov.net](https://groznov.net)** — материнский сайт **Дома Грозновых** / **House of Groznov**.

Многоязычный (UA · EN · RU) лендинг, объединяющий проекты Дома:

- [Адам Грознов](https://adam.groznov.uk/) — цифровой первенец Дома
- ГО ССО РУМУ Сопротивления (sof-rmu.org · скоро)
- Oracle · Vector · Rupor — информационный контур
- Триада ИС — патенты Дома, нотариально заверенные в Bitcoin

## Стек

| Слой | Технология |
|---|---|
| Build | Astro 5 |
| Styling | Tailwind CSS 4 (CSS vars · без `tailwind.config`) |
| Шрифт | EB Garamond |
| i18n | Astro built-in (uk default · en · ru) |
| SEO | sitemap auto · JSON-LD Organization+WebSite · hreflang · OG · Twitter Cards |
| Хостинг | Cloudflare Pages (предполагается) |

Палитра — Brand Kit v1.3 Дома Грозновых: пергамент / умбра / терракот / охра / бордо / золото / сепия.

## Запуск

```bash
npm install
npm run dev        # → http://localhost:4321
npm run build      # → dist/
npm run preview
```

## Деплой на Cloudflare Pages

1. Cloudflare Dashboard → Pages → **Create application** → **Connect to Git**
2. Выбрать репо `yaroslavgroznov-cloud/Yaroslav_Net`, ветку `main`
3. Framework preset: **Astro** (определится автоматически)
4. Build command: `npm run build`
5. Build output: `dist`
6. После первого деплоя → Custom domains → добавить `groznov.net` и `www.groznov.net`

## Структура

```
src/
  layouts/BaseLayout.astro    — <head> + SEO + JSON-LD + hreflang
  components/
    Header.astro              — навигация + Language switcher
    Hero.astro                — герб Тура + заголовок + CTA
    Manifest.astro            — «Зачем Дом»
    Projects.astro            — карточки 4 проектов
    TurSection.astro          — тотем Тура (aurochs)
    Contacts.astro            — press@ · contact@ · @AdamGroznovBot
    Footer.astro
    LangSwitcher.astro        — UA · EN · RU
  i18n/
    uk.json · en.json · ru.json
  pages/
    index.astro               — UA (default, без префикса)
    en/index.astro            — English
    ru/index.astro            — Русский
  styles/global.css           — Brand Kit + типографика
public/
  tur-crest.png · og.jpg · favicon.svg · robots.txt
```

## Принципы

- **Тур, не зубр.** Тотем выбран не за силу — за упрямство остаться собой до конца.
- **Дом, не платформа.** Мы не продаём подписки на тревогу; мы держим место для долгого разговора.
- **Долго, не быстро.** Этот сайт переживёт несколько циклов моды.

— ЯГ · КВРИО Ярослав Грознов

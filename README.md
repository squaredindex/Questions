# Questions
 **Questions™** is a simple "game" intended to break the ice or get to know someone better, perhaps you need some little conversation starters or fun prompts for date for instance.

 The questions are sourced from various places, some made up by myself or suggested by friends.
 A great many are from the wonderful prompt cards made by [School of Life](https://www.theschooloflife.com/).

 Please feel free to suggest new question and categories. All of the questions are currently in `public/questions.json` -- if it gets much larger, then I will probably break it up by category.


## To-do
**CORE FUNCTIONALITY**
- [x] ~~Add Inter font-family as local font -- [use vite-plugin-webfont-dl](https://github.com/feat-agency/vite-plugin-webfont-dl)~~
- [ ] Add settings menu
- [ ] Allow the user to choose categories -- *should update questions reactively*
- [ ] Allow the user to choose difficulty -- *should update questions reactively*
- [ ] Add a **restart** button to the ending screen -- this should reset the state of the game clearing all `askedQuestionIds`
- [ ] Add/Configure PostCSS and [autoprefixer](https://www.npmjs.com/package/autoprefixer) to ensure better browser compatibility - `pnpm i -D autoprefixer postcss`
- [ ] Deploy live version

**GAMEPLAY**
- [x] ~~Add first 100 base questions~~
- [ ] Curate the difficulty of these questions and update tags accordingly -- This is somewhat subjective, so I welcome suggestions on this


**Additional**
- [ ] Add dating specific questions category
- [ ] Add couples questions category


**NICE-TO-HAVE**
- [ ] Add icons as icon components and display for the relevant categories
- [ ] Create custom icons for categories
- [ ] Add manual control for dark/light mode rather than using system setting
- [x] ~~Add nicer animations to game ending~~


In the future it might be interesting to move this over to [SvelteKit](https://kit.svelte.dev/) and make it more of a real-time multiplayer experience, however, right now it's mainly something you can use in person as an alternative to having the sort of physical prompt cards School of Life does.
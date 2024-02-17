import { writable } from "svelte/store";

// export const selectedCategories = writable([
//     "culture and taste",
//     "family and friends",
//     "life and death",
//     "love and relationships",
//     "personality and emotions",
//     "self",
//     "sex",
//     "travel",
//     "work and money"
// ])

// export const selectedDifficulties = writable(["easy", "medium", "hard"])

export const storeValue = writable("Hello from the Svelte store!");

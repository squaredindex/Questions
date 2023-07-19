<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let currentQuestion = null;
    let currentQuestionId = null;
    let questions = [];
    let askedQuestionIds = [];
    let categories = [
        "culture and taste",
        "family and friends",
        "life and death",
        "love and relationships",
        "personality and emotions",
        "self",
        "sex",
        "travel",
        "work and money",
    ]; // selected categories
    let difficulties = ["easy", "medium", "hard"]; // selected difficulties
    let hasMoreQuestions = true;
    let showButton = false;

    onMount(async () => {
        const res = await fetch("/questions.json");
        questions = await res.json();
        loadRandomQuestion();
    });

    function loadRandomQuestion() {
        let filteredQuestions = questions.filter(
            (q) =>
                q.difficulties.some((diff) => difficulties.includes(diff)) &&
                q.categories.some((cat) => categories.includes(cat)) &&
                !askedQuestionIds.includes(q.id)
        );

        if (!filteredQuestions.length) {
            currentQuestion =
                "You've answered all the questions! Aren't you a curious one...";
            hasMoreQuestions = false;
            return;
        }

        currentQuestion = null;

        setTimeout((_) => {
            let randomIndex = Math.floor(
                Math.random() * filteredQuestions.length
            );
            currentQuestion = filteredQuestions[randomIndex].question;
            currentQuestionId = filteredQuestions[randomIndex].id;
            askedQuestionIds.push(currentQuestionId);
            showButton = true; // Show the button after the first question appears
        }, 300);
    }
</script>

{#if currentQuestion}
    <h2 transition:fade={{ duration: 300 }}>{currentQuestion}</h2>
{/if}

{#if showButton && hasMoreQuestions}
    <button transition:fade={{ duration: 300 }} on:click={loadRandomQuestion}
        >Next Question</button
    >
{/if}

<style>
    h2 {
        font-size: var(--font-size-xl);
        line-height: 1.2;
        text-wrap: balance;
        text-align: center;
    }

    button {
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 4rem;
        font-size: var(--font-size-md);
    }

    @media (width > 1200px) {
        h2 {
            font-size: var(--font-size-xxl);
        }
    }

    @media (width < 500px) {
        h2 {
            text-align: left;
            font-size: var(--font-size-lg);
            line-height: 1.5;
            font-weight: 500;
        }

        button {
            bottom: 1rem;
            padding: 1rem 2rem;
            width: calc(100% - 2rem);
        }
    }
</style>

<script>
    import { onMount } from "svelte"
    import { fade } from "svelte/transition"

    let currentQuestion = null
    let currentQuestionId = null
    let questions = []
    let askedQuestionIds = []
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
    ] // selected categories
    let selectedDifficulties = ["easy", "medium", "hard"] // selected difficulties
    let hasMoreQuestions = true
    let showButton = false
    let displayDifficulty = null
    const difficultyMap = ["hard", "medium", "easy"]

    onMount(async () => {
        const res = await fetch("/questions.json")
        questions = await res.json()
        loadRandomQuestion()
    })

    function loadRandomQuestion() {
        let filteredQuestions = questions.filter(q => 
            q.difficulties.some(diff => selectedDifficulties.includes(diff)) && 
            q.categories.some(cat => categories.includes(cat)) &&
            !askedQuestionIds.includes(q.id)
        )

        if (!filteredQuestions.length) {
            currentQuestion = "You've answered all the questions! Aren't you a curious one..."
            hasMoreQuestions = false
            return
        }

        currentQuestion = null

        setTimeout(_ => {
            let randomIndex = Math.floor(Math.random() * filteredQuestions.length)
            currentQuestion = filteredQuestions[randomIndex].question
            currentQuestionId = filteredQuestions[randomIndex].id
            askedQuestionIds.push(currentQuestionId)
            showButton = true // Show the button after the first question appears

            // Set the difficulty based on number of available difficulties
            displayDifficulty = difficultyMap[filteredQuestions[randomIndex].difficulties.length - 1]
        }, 300)
    }
</script>

{#if currentQuestion}
    <div class="question">
        <h2 transition:fade={{ duration: 300 }}>{currentQuestion}</h2>

        {#if hasMoreQuestions}
            <p>{displayDifficulty}</p>
        {/if}
    </div>
{/if}

{#if showButton && hasMoreQuestions}
    <button transition:fade={{ duration: 300 }} on:click={loadRandomQuestion}>Next Question</button>
{/if}


<style>
    .question {
        text-align: center;
    }

    .question p {
        font-size: var(--font-size-base);
        color: var(--color-primary);
        text-transform: uppercase;
        font-weight: 800;
        letter-spacing: .2ch;
    }

    h2 {
        font-size: var(--font-size-xl);
        line-height: 1.2;
        text-wrap: balance;
        margin-block-end: 1rem;
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
            text-align: center;
            font-size: var(--font-size-md);
            line-height: 1.5;
            font-weight: 500;
            text-wrap: wrap;
        }

        .question p {
            font-size: var(--font-size-sm);
        }

        button {
            bottom: 1rem;
            padding: 1rem 2rem;
            width: calc(100% - 2rem);
        }
    }
</style>

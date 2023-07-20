<script>
    import { onMount } from "svelte"
    import { fade } from "svelte/transition"
    import { Confetti } from "svelte-confetti"
    import NextButton from "./NextButton.svelte"

    let currentQuestion = null
    let currentQuestionId = null
    let questions = []
    let askedQuestionIds = []
    let selectedCategories = [
        "culture and taste",
        "family and friends",
        "life and death",
        "love and relationships",
        "personality and emotions",
        "self",
        "sex",
        "travel",
        "work and money",
    ]
    let selectedDifficulties = ["easy", "medium", "hard"]
    let hasMoreQuestions = true
    let displayDifficulty = null
    const difficultyMap = ["hard", "medium", "easy"]

    async function fetchQuestions() {
        const res = await fetch("/questions.json")
        return await res.json()
    }

    function filterQuestions() {
        return questions.filter(
            (q) =>
                q.difficulties.some((diff) =>
                    selectedDifficulties.includes(diff)
                ) &&
                q.categories.some((cat) => selectedCategories.includes(cat)) &&
                !askedQuestionIds.includes(q.id)
        )
    }

    function getRandomQuestion(questions) {
        let randomIndex = Math.floor(Math.random() * questions.length)
        return questions[randomIndex]
    }

    onMount(async () => {
        questions = await fetchQuestions()
        loadRandomQuestion()
    })

    function loadRandomQuestion() {
        let filteredQuestions = filterQuestions()

        if (!filteredQuestions.length) {
            currentQuestion = "The first and simplest emotion which we discover in the human mind, is curiosity. - Edmund Burke"
            displayDifficulty = "All questions complete"
            hasMoreQuestions = false
            return
        }

        currentQuestion = null

        setTimeout(() => {
            let randomQuestion = getRandomQuestion(filteredQuestions)
            currentQuestion = randomQuestion.question
            currentQuestionId = randomQuestion.id
            askedQuestionIds.push(currentQuestionId)

            // Set the difficulty based on number of available difficulties
            displayDifficulty =
                difficultyMap[randomQuestion.difficulties.length - 1]
        }, 300)
    }
</script>

{#if currentQuestion}
    {#if !hasMoreQuestions}
        <div class="confetti">
            <Confetti
                x={[-5, 5]}
                y={[0, 0.1]}
                delay={[500, 2000]}
                infinite
                duration="5000"
                amount="200"
                size="22"
                fallDistance="100vh"
                colorArray={[
                    "#646cff",
                    "#e549d2",
                    "#ff3f90",
                    "#ff6f4d",
                    "#ff6f4d",
                    "#ffa600"
                ]}
            />
        </div>
    {/if}

    <div class="question">
        <h2 transition:fade={{ duration: 300 }}>{currentQuestion}</h2>
        <p>{displayDifficulty}</p>
    </div>
{/if}

{#if hasMoreQuestions}
    <NextButton on:newQuestion={loadRandomQuestion} />
{/if}

<style>
    .question {
        text-align: center;
    }

    .question p {
        font-weight: 800;
        letter-spacing: 0.2ch;
        text-transform: uppercase;
        color: var(--color-primary);
        font-size: var(--font-size-base);
    }

    h2 {
        line-height: 1.2;
        text-wrap: balance;
        margin-block-end: 1rem;
        font-size: var(--font-size-xl);
    }

    .confetti {
        left: 0;
        top: -50px;
        width: 100%;
        height: 100vh;
        height: 100dvh;
        display: flex;
        position: fixed;
        overflow: hidden;
        pointer-events: none;
        justify-content: center;
    }

    @media (width > 1200px) {
        h2 {
            font-size: var(--font-size-xxl);
        }
    }

    @media (width < 500px) {
        h2 {
            text-wrap: wrap;
            line-height: 1.5;
            font-weight: 500;
            text-align: center;
            font-size: var(--font-size-md);
        }

        .question p {
            font-size: var(--font-size-sm);
        }
    }
</style>

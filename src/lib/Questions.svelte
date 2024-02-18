<script>
    import { onMount } from "svelte"
    import { fade, slide } from 'svelte/transition'
    import { Confetti } from "svelte-confetti"
    import NextButton from "./NextButton.svelte"
    import { storeValue } from "../store"
    import YouTube from "./YouTube.svelte"

    let youtubeComponent
    let storeMessage

    storeValue.subscribe(value => {
        storeMessage = value
    })

    function updateStoreMessage() {
        storeValue.set("Updated store message")
    }

    let currentQuestion = null
    let currentQuestionId = null
    let questions = []
    let askedQuestionIds = []
    let selectedCategories = [
        // "culture and taste",
        // "family and friends",
        // "life and death",
        // "love and relationships",
        // "personality and emotions",
        "self",
        // "sex",
        // "travel",
        // "work and money",
    ]
    let selectedDifficulties = ["easy", "medium", "hard"]
    let hasMoreQuestions = true
    let displayDifficulty = null
    const difficultyMap = ["hard", "medium", "easy"]
	
	$: diff_class = displayDifficulty

    // $: {
    //     if (!hasMoreQuestions && youtubeComponent) {
    //         youtubeComponent.loadIframe();
    //     }
    // }

    async function fetchQuestions() {
        const basePath = import.meta.env.BASE_URL
        const res = await fetch(`${basePath}questions.json`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    }

    function filterQuestions() {
        return questions.filter(question => {
            const hasSelectedDifficulty = question.difficulties.some(difficulty => selectedDifficulties.includes(difficulty))

            const hasSelectedCategory = question.categories.some(category => selectedCategories.includes(category))

            const hasNotBeenAsked = !askedQuestionIds.includes(question.id)

            const eligibleQuestions = hasSelectedDifficulty && hasSelectedCategory && hasNotBeenAsked;

            return eligibleQuestions;
        })
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
            currentQuestion = "By replacing fear of the unknown with curiosity we open ourselves up to an infinite stream of possibility - Alan Watts"
            displayDifficulty = "All questions complete"
            hasMoreQuestions = false
            return
        }

        currentQuestion = null

        let randomQuestion = getRandomQuestion(filteredQuestions)
        currentQuestion = randomQuestion.question
        currentQuestionId = randomQuestion.id
        askedQuestionIds.push(currentQuestionId)

        // Set the difficulty based on number of available difficulties
        displayDifficulty = difficultyMap[randomQuestion.difficulties.length - 1]
    }

    function handleLastQuestion() {
        let filteredQuestions = filterQuestions()
        if (filteredQuestions.length > 1) console.log("There are more questions")
        if (youtubeComponent) youtubeComponent.loadIframe()
    }
</script>

 <!-- <h1>{storeMessage}</h1>
<button on:click={updateStoreMessage}>Update store message</button> -->

{#if currentQuestion}
{#each [currentQuestion] as question (question)}
<div transition:slide={{duration: 500}} class="question">
    <h2 style="{!hasMoreQuestions ? 'font-size: var(--font-size-lg)' : ''}" transition:fade={{delay: 500}}>{question}</h2>
    <p transition:slide={{delay: 600, axis: 'y', }} class="{diff_class}">{displayDifficulty}</p>
</div>
{/each}
{/if}


{#if hasMoreQuestions}
<!-- could refactor button into generic button component that will accept any on:click  -->
<NextButton on:newQuestion={loadRandomQuestion} />
{:else}
    <YouTube bind:this={youtubeComponent} backgroundVideo={true} videoId="hRkY4edLXbE" />
    <div class="confetti">
        <Confetti
            x={[-5, 5]}
            y={[0, 0.1]}
            amount={200}
            delay={[500, 2000]}
            duration={5000}
            fallDistance="100dvh"
            infinite
            size={22}
            colorArray={[
                "var(--color-orchid)",
                "var(--color-persimmon)",
                "var(--color-primary)",
                "var(--color-web-orange)",
                "var(--color-wild-strawberry)",
            ]}
        />
    </div>
{/if}


<style>
    .question {
        position: relative;
        z-index: 1;
        text-align: center;
        width: 100%;
    }

    .question p {
        font-weight: 800;
        letter-spacing: 0.2ch;
        text-transform: uppercase;
        color: var(--color-primary);
        font-size: var(--font-size-base);
    }

    p.easy {
        color: var(--color-primary);
    }

    p.medium {
        color: var(--color-orchid);
    }

    p.hard {
        color: var(--color-wild-strawberry);
    }

    h2 {
        line-height: 1.2;
        text-wrap: balance;
        margin-block-end: 1rem;
        font-size: var(--font-size-xl);
        color: var(--color-text-primary);
        filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
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
            margin-block-end: 0.5rem;
            font-size: var(--font-size-md);
        }

        .question p {
            font-size: var(--font-size-sm);
        }
    }
</style>

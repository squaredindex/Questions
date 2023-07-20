<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function loadNewQuestion() {
        dispatch("newQuestion");
    }
</script>

<button on:click={loadNewQuestion}>Next Question</button>

<style>
    button {
        left: 50%;
        bottom: 4rem;
        cursor: pointer;
        position: fixed;
        font-weight: 500;
        border-radius: 8px;
        font-family: inherit;
        padding: 0.6em 1.2em;
        background-color: #1a1a1a;
        border: 1px solid transparent;
        transform: translate(-50%, 0);
        font-size: var(--font-size-md);
        transition: border-color 0.25s;
    }

    button:hover {
        border-color: var(--color-primary);
    }

    button:focus,
    button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }

    @media (width < 500px) {
        button {
            bottom: 1rem;
            padding: 1rem 2rem;
            width: calc(100% - 2rem);
        }
    }
</style>

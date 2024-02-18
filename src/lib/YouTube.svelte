<script>
    import { fade } from 'svelte/transition'
    export let videoId
    export let backgroundVideo = false
    let iframeLoaded = false
  
    // Function to load the iframe
    export function loadIframe() {
        iframeLoaded = true
    }
  </script>
  
<button in:fade={{duration: 500}} on:click={loadIframe} class="youtube-lazy-load" class:background-video={backgroundVideo} aria-label="Click to load the video" tabindex="0">
    {#if iframeLoaded}
        <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            title="YouTube Video">
        </iframe>
    {:else}
        <div class="placeholder">Click to load the video</div>
    {/if}
</button>
  
  <style>
    .youtube-lazy-load {
        position: relative;
        appearance: none;
        border: 0;
        display: flex;
        place-items: center;
        aspect-ratio: 16/9;
        width: 100%;
        border-radius: .5rem;
        background-color: black;
        overflow: hidden;
    }
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
    }
    .placeholder {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        cursor: pointer;
        position: absolute;
        place-items: center;
        background-color: black;
        font-size: 1.5rem;
        color: white;
    }

    .background-video {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: grid;
        place-items: center;
        z-index: -1;
    }

    .background-video iframe {
        scale: 1.4;
    }
  </style>
  
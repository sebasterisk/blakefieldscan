let config = {}

config.crack = async function(){
    let result
    try {
        const data = await fetch("/server/config.php")
        if (!data.ok) {
            throw new Error(`Getting config returned ${data.status}`)
        }

        result = await data.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }

    config.cram(result)
}

config.cram = function(stuff){
    const ticker = document.querySelector("#ticker-content")
    ticker.innerHTML = ""

    stuff.text.forEach(element => {
        let new_span = document.createElement("span")
        new_span.innerText = element
        new_span.classList.add("tickeritem")
        ticker.appendChild(new_span)      
    });

    const tickerwidth = ticker.scrollWidth
    const speed = tickerwidth / 100

    document.documentElement.style.setProperty("--speed", speed+"s")
}

config.crack()
setInterval(config.crack, 600000)
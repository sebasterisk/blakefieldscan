let config = {
    "img_index": 0,
    "img_length": 0,

    "result": {
        "images": [],
        "text": [],
        "schedule": "NORM",
        "schedule_infer": {}
    },

    "contentarea1_index": 0
}

config.crack = async function(){
    let result
    try {
        const data = await fetch("server/config.php")
        if (!data.ok) {
            throw new Error(`Getting config returned ${data.status}`)
        }

        result = await data.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }

    config.result = result
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

    // stuff.images.forEach(element => {
    //     let image = new Image()
    //     image.src = element
    // })
}

config.image_rotate = function(){
    const image = document.querySelector("#display-image")

    config.img_index += 1
    if (config.img_index > config.result.images.length - 1){
        config.img_index = 0
    }
    image.classList.remove("post-transitional")
    image.classList.add("transitional")

    setTimeout(()=>{
        image.src = config.result.images[config.img_index]
        image.classList.remove("transitional")
        image.classList.add("post-transitional")
    }, 1250)
}

config.rotate = function(){
    clearInterval(config.image_interval)
    config.image_rotate()
    config.image_interval = setInterval(config.image_rotate, 8000)

    let contentarea1_rotation = document.querySelectorAll("#contentarea1>*:not(.disabled)")
    const current = contentarea1_rotation[config.contentarea1_index]
    config.contentarea1_index += 1
    
    if (config.contentarea1_index > contentarea1_rotation.length - 1){
        config.contentarea1_index = 0
    }
    
    const next = contentarea1_rotation[config.contentarea1_index]

    current.classList.remove("post-transitional")
    current.classList.add("transitional")

    setTimeout(()=>{
        next.classList.remove("transitional")
        next.classList.add("post-transitional")
    }, 1250)
}

config.crack()
setInterval(config.crack, 180000)
setInterval(config.rotate, 32000)

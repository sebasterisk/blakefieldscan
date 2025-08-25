let product = {}

async function retrieve(){
    let result
    try {
        const data = await fetch("/server/products.php")
        if (!data.ok) {
            throw new Error(`Getting calendar returned ${data.status}`)
        }

        result = await data.json();
        // console.log(result);
    } catch (error) {
        console.error(error.message);
        console.log("Refreshing in 15 Seconds?!")
        setTimeout(()=>{
            location.reload()
        },15000)
    }

    product = result

    window.calendar.crack()
    window.weather.cram()
    schedule.crack()
}

retrieve()
setInterval(retrieve, 1800000)
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
    }

    product = result

    window.calendar.crack()
    window.weather.cram()
}

retrieve()
setInterval(retrieve, 1800000)
// freshman year era code being reused here :skull: might replace

import ICAL from "https://unpkg.com/ical.js@2.2.1/dist/ical.js";

async function fetchandparse(){
    let result
    try {
        const icaldata = await fetch("/server/products.php")
        if (!icaldata.ok) {
            throw new Error(`Getting calendar returned ${icaldata.status}`)
        }

        result = await icaldata.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }

    const date = new Date("September 30, 2025 00:00:00")
    const parsed = ICAL.parse(result.calendar)
    findeventson(date, parsed)
}

function findeventson(now, parsed){
    if (!parsed){
        console.error("no jcal to parse")
        return
    }

    let parser = new ICAL.ComponentParser()
    let towrite = "<b>" + new Date(now).toLocaleDateString("en-US",{"dateStyle":"full"}) + "</b><br><hr>"
    const content = document.getElementById("contentarea2")

    parser.onevent = (event) => {
        const s = event.startDate.toJSDate()
        const e = event.endDate.toJSDate()
        if ((now >= s) && (now < e)){
            towrite += `${event.summary}<br><span class="small">`
            if((e-s)<=(86400000)){
                towrite += `${s.toLocaleDateString()}<br>`
            } else {
                towrite += `${s.toLocaleDateString()} - ${e.toLocaleDateString()}<br>`
            }
            towrite += "</span><hr>"
        }
    }

    parser.oncomplete = () => {
        content.innerHTML = towrite
        towrite = ""
    }

    parser.process(parsed)
}

fetchandparse()
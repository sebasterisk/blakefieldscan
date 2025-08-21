// freshman year era code being reused here :skull: might replace

import ICAL from "https://unpkg.com/ical.js@2.2.1/dist/ical.js";
let calendar = {}

calendar.crack = async function(){
    let result
    try {
        const icaldata = await fetch("/server/products.php")
        if (!icaldata.ok) {
            throw new Error(`Getting calendar returned ${icaldata.status}`)
        }

        result = await icaldata.json();
        // console.log(result);
    } catch (error) {
        console.error(error.message);
    }

    const date = new Date().setHours(0,0,0,0)
    const parsed = ICAL.parse(result.calendar)
    calendar.crunch(date, parsed)
}

calendar.crunch = function(now, parsed){
    if (!parsed){
        console.error("no jcal to parse")
        return
    }

    let parser = new ICAL.ComponentParser()
    let towrite = []

    parser.onevent = (event) => {
        const s = event.startDate.toJSDate()
        const e = event.endDate.toJSDate()
        if ( ((now <= s) && (now.valueOf() + 86400000 > e.valueOf())) || ((now >= s) && (now.valueOf() + 86400000 <= e.valueOf())) ){
            // if((e-s)<=(86400000)){
            //     towrite += `${s.toLocaleDateString()}<br>`
            // } else {
            //     towrite += `${s.toLocaleDateString()} - ${e.toLocaleDateString()}<br>`
            // }
            // towrite += "</span><hr>"

            towrite.push({
                "event": event.summary,
                "time-start": s,
                "time-end": e
            })
        }
    }

    parser.oncomplete = () => {
        // console.log(towrite)
        calendar.cram(towrite)
    }

    parser.process(parsed)
}

calendar.cram = function(stuff) {
    const content = document.getElementById("contentarea2")
    const placementzone = document.querySelector("#sidebar-events ul")
    placementzone.innerHTML = ""
    stuff.forEach(element => {
        let newthing = document.createElement("li")
        newthing.innerText = element.event

        placementzone.append(newthing)
    });
}

calendar.crack()
setInterval(calendar.crack, 3600000)

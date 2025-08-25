// freshman year era code being reused here :skull: might replace

import ICAL from "https://unpkg.com/ical.js@2.2.1/dist/ical.js";
window.calendar = {
    "inferred_schedule": "NORM"
}

calendar.crack = async function(){
    const date = new Date().setHours(0,0,0,0)
    const parsed = ICAL.parse(product.calendar)
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
            Object.keys(config.result.schedule_infer).forEach(kw_array_key => {
                const kw_array = config.result.schedule_infer[kw_array_key]
                const found = kw_array.some(x => event.summary.includes(x))
                if (found){ calendar.inferred_schedule = kw_array_key }
            });

            towrite.push({
                "event": event.summary,
                "time-start": s,
                "time-end": e
            })
        }
    }

    parser.oncomplete = () => {
        // console.log(towrite)
        console.log(calendar.inferred_schedule)
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

    const height = placementzone.scrollHeight
    document.documentElement.style.setProperty("--calendarheight", (height > content.scrollHeight ? ((-1*height)+"px") : 0))
    document.documentElement.style.setProperty("--calendarinitoff", (height > content.scrollHeight ? (content.scrollHeight + "px") : 0))
    document.documentElement.style.setProperty("--calendarspeed", (height/35)+"s")
}
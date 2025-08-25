let schedule = {
    "selected": "NORM"
}

schedule.crack = async function(){
    let result
    try {
        const data = await fetch("/server/schedules.json")
        if (!data.ok) {
            throw new Error(`Getting calendar returned ${data.status}`)
        }

        result = await data.json();
        // console.log(result);
    } catch (error) {
        console.error(error.message);
    }

    schedule.schedules = result
    schedule.cram()
}

schedule.cram = function(){
    const mission = document.querySelector("#schedule-mission")
    if (config.result.schedule != "AUTO") {
        schedule.selected = config.result.schedule
        mission.innerText = `${schedule.selected}(MANUAL)`
    } else {
        schedule.selected = calendar.inferred_schedule
        mission.innerText = `${schedule.selected}(AUTO)`
    }

    const selected_schedule = schedule.schedules[schedule.selected]

    const schedule_fill = document.querySelector("#schedule")
    const schedule_element_temp = document.querySelector("#schedule-element-temp")

    Object.keys(selected_schedule).forEach(period_name => {
        const new_element = schedule_element_temp.content.cloneNode(true)
        
        selected_schedule[period_name].forEach(time_block => {
            const new_time_block = new_element.querySelector(".time-block").content.cloneNode(true)
            
            const date = new Date().setHours(0,0,0,0)

            const start_time = new Date(date + time_block[0]*1000).toLocaleTimeString("en-US", {"timeStyle":"short"})
            const end_time = new Date(date + time_block[1]*1000).toLocaleTimeString("en-US", {"timeStyle":"short"})
            
            new_time_block.querySelector("span").innerHTML = `${start_time.slice(0,-3)}&ndash;${end_time.slice(0,-3)}`
            
            new_element.querySelector("div").append(new_time_block)
        })
        new_element.querySelector("div .period-name").innerText = period_name

        schedule_fill.appendChild(new_element)
    });
}

schedule.tick = function(){
    const now = new Date()
    const date = new Date().setHours(0,0,0,0)

    let next_start_time
    let next_name

    Object.keys(selected_schedule).forEach(period_name => {
        selected_schedule[period_name].forEach(time_block => {
            
        })
    });
}
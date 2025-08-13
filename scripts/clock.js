let scan_clock = {};

scan_clock.tick = function(){
    const clockelem = document.getElementById("clock")
    const dateelem = document.getElementById("date")
    const time = new Date().toLocaleTimeString("en-US", {hour:"numeric", minute:"2-digit"})
    const date = new Date().toLocaleDateString("en-US", {dateStyle: "long"})

    clockelem.innerHTML = time.slice(0,-3)
    dateelem.innerHTML = date
}

setInterval(scan_clock.tick, 100)
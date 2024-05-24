///image scroll over section here. it wasnt working great and i gave up

///drag and drop rules
const definitions =["Rule 10", "Rule 11","Rule 12",'Rule 13',"Rule 14",'Rule 31'];
const words =["On opposite tacks. Port keeps clear of starboard",
"On same tack, overlapped. Windward keeps clear of leeward",
"On same tack, not overlapped. Astern keeps clear of ahead",
"While tacking. Until on close haul of the new tack, the boat must keep clear of all others",
"Avoid collision",
"Don't hit marks/buoys"];
const images =["rule10.jpg","rule11.jpg",'rule12,jpg','rule13.jpg','rule14.jpg','rule31.jpg'];
const wordElements = d3.select("#wordContainer")
    .selectAll("div")
    .data(words)
    .enter()
    .append("div")
    .attr("class", "draggable")
    .html((d, i) => `<img src="${images[i]}"><br>${d}`)
    .call(d3.drag()
        .on("start", function() {
            d3.select(this).classed("dragging", true);
        })
        .on("drag", function(event) {
            d3.select(this)
                .style("left", (event.x - 50) + "px")
                .style("top", (event.y - 10) + "px");
        })
        .on("end", function() {
            d3.select(this).classed("dragging", false);
        }));

// Create drop targets with images
const dropTargets = d3.select("#dropTargets")
    .selectAll("div")
    .data(definitions)
    .enter()
    .append("div")
    .attr("class", "droptarget")
    .html((d, i) => `<img src="${images[i]}"><br>${d}`);

// Define behavior when dropping a word
wordElements.on("end", function() {
    const word = d3.select(this).text();
    const target = d3.select("#dropTargets").selectAll(".droptarget")
        .filter(function() { return d3.select(this).text() === word; });
    const targetPosition = target.node().getBoundingClientRect();
    const wordPosition = this.getBoundingClientRect();

    if (
        wordPosition.x > targetPosition.x &&
        wordPosition.x + wordPosition.width < targetPosition.x + targetPosition.width &&
        wordPosition.y > targetPosition.y &&
        wordPosition.y + wordPosition.height < targetPosition.y + targetPosition.height
    ) {
        d3.select(this).remove();
        target.style("background-color", "green");
    } else {
        target.style("background-color", "red");
    }
});
const width = 900;
const height = 600;

const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

const projection = d3.geoMercator().scale(140).translate([width / 2, height / 1.4]);
const path = d3.geoPath(projection);

const g = svg.append('g');

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(data => {
        const countries = topojson.feature(data, data.objects.countries);

        g.selectAll('path')
            .data(countries.features)
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', path);

        // Load the competitors data
        d3.json('competitors.json')
            .then(competitorsData => {
                // Create a color scale
                const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, 25]);

                // Function to update the map colors based on the selected year
                function updateMap(year) {
                    g.selectAll('.country')
                        .attr('fill', d => {
                            const countryName = d.properties.name;
                            const competitors = competitorsData[year][countryName] || 0;
                            return colorScale(competitors);
                        });
                }

                // Add event listener to the slider
                document.getElementById('year').addEventListener('input', function() {
                    const year = this.value;
                    updateMap(year);
                });
            })
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
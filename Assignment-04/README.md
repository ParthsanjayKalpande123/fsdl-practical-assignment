# Assignment 04 — Interactive Weather Dashboard (Chart.js)

## Aim
To build an interactive weather dashboard for a real-life use case using HTML, CSS, and Chart.js, featuring at least two chart types (line and bar) with mock/sample JSON weather data.

## Technologies Used
- HTML5
- CSS3 (inline styles within `index.html`)
- JavaScript (vanilla, inline in `index.html`)
- Chart.js 4.4.0 (CDN)
- Google Fonts — Inter

## Steps Performed
1. Defined a `weatherData` mock JSON object with data for 5 Indian cities (Pune, Mumbai, Delhi, Bangalore, Chennai), each containing: current weather stats and 7-day arrays for temperature, rainfall, humidity, and wind speed.
2. Created **city selector buttons** — clicking a city button re-renders all stat cards and all three charts.
3. Implemented **six stat cards** for: Temperature, Feels Like, Humidity, Wind Speed, Condition, and UV Index.
4. **Chart 1 — Temperature Line Chart**: 7-day temperature trend using `type: 'line'`, with filled area and smooth tension.
5. **Chart 2 — Rainfall Bar Chart**: 7-day rainfall using `type: 'bar'` with rounded bars.
6. **Chart 3 — Humidity + Wind Dual Line Chart**: Two datasets on a single `type: 'line'` chart comparing Humidity (%) and Wind Speed (km/h) over the week.
7. Applied dark theme styling consistently across all charts using Chart.js options.

## Output Description
A dark-themed weather dashboard showing:
- Header with dashboard title and current date/time
- City switcher row (Pune, Mumbai, Delhi, Bangalore, Chennai)
- 6 metric cards (temperature, feels like, humidity, wind, condition, UV index)
- 2-column chart grid: temperature line chart + rainfall bar chart
- Full-width dual-line chart for humidity and wind speed
- All charts update dynamically when a different city is selected

## Output Screenshots
> Add screenshots of this running locally here.

Open `source-code/index.html` directly in any browser — no server needed.

# 🌦️ Weather Information Dashboard

A responsive and user-friendly Weather Information Dashboard built using HTML, CSS, and JavaScript. The application allows users to search for a city and view its current weather information using the OpenWeatherMap API.

The dashboard displays real-time weather information such as temperature, weather conditions, humidity, wind speed, and dynamic weather icons. It also includes loading indicators, input validation, error handling, and a responsive design for a better user experience.

🚀 Live Demo:-

🌐 "View Live Weather Information Dashboard" (https://weather-information-dashboard.netlify.app/)

📸 Project Preview:-

"Weather Information Dashboard" (screenshot.png)
![image alt](https://github.com/Atulsaini2806/Weather-Information-Dasboard/blob/cfba5c828ed6bf6056c003c429088dd9ba76fd72/Screenshot_01.jpeg)

![image alt](https://github.com/Atulsaini2806/Weather-Information-Dasboard/blob/573461b2200b6ffc146bbad1ceabfbd5da9541d4/Screenshot_02.jpeg)

![image alt](https://github.com/Atulsaini2806/Weather-Information-Dasboard/blob/8b2ee525957f9cfdd9eddfa23f15f270a5ce50d7/Screendhot_03.jpeg)

![image alt](https://github.com/Atulsaini2806/Weather-Information-Dasboard/blob/8b2ee525957f9cfdd9eddfa23f15f270a5ce50d7/Screenshot_04.jpeg)

«Add a screenshot of your Weather Information Dashboard to the repository and name it "screenshot.png".»

✨ Features:-

- 🌍 City-Based Weather Search: Search for current weather information by entering a city name.
- 🌡️ Real-Time Weather Data: Fetches current weather information using the OpenWeatherMap API.
- 🌡️ Temperature Display: Shows the current temperature in Celsius.
- ☁️ Weather Conditions: Displays weather descriptions such as clear sky, clouds, rain, etc.
- 🌤️ Dynamic Weather Icons: Displays weather icons based on current weather conditions.
- 💧 Humidity Information: Shows the humidity percentage of the selected city.
- 💨 Wind Speed: Displays the current wind speed in meters per second.
- 📍 Current Location: Allows users to get weather information based on their current location.
- 🕘 Recent Searches: Stores recently searched cities for quick access.
- 🌙 Dark Mode: Provides a dark-themed interface for a comfortable viewing experience.
- ⏳ Loading State: Displays a loading indicator while weather data is being fetched.
- ⚠️ Error Handling: Shows appropriate messages for invalid city names, empty inputs, API errors, and network failures.
- ✅ Input Validation: Prevents invalid searches, including inputs containing commas.
- ⌨️ Keyboard Support: Allows users to search by pressing the Enter key.
- 📱 Responsive Design: Works across desktop, laptop, tablet, and mobile screen sizes.

## 🛠️ Technologies Used:-

| Technology         | Purpose                                |
| ------------------ | -------------------------------------- |
| HTML5              | Structure of the application           |
| CSS3               | Styling, layout, and responsive design |
| JavaScript (ES6+)  | Application logic and dynamic updates  |
| Fetch API          | Fetching weather data from the API     |
| OpenWeatherMap API | Providing current weather information  |

📂 Project Structure:-

Weather-Information-Dasboard/
│
├── index.html       # Main HTML structure
├── style.css        # Styling and responsive design
├── script.js        # JavaScript logic and API integration
├── screenshot.png   # Project screenshot
└── README.md        # Project documentation

⚙️ How to Run the Project Locally:-

Follow these steps to run the application on your computer.

1. Clone the Repository
git clone https://github.com/Atulsaini2806/Weather-Information-Dasboard.git

2. Navigate to the Project Folder
cd Weather-Information-Dasboard

3. Open the Project
Open the project folder in Visual Studio Code.

You can run the application using the Live Server extension or open the "index.html" file directly in your browser.


🔑 API Configuration:-

This project uses the OpenWeatherMap API to retrieve current weather information.

To configure your own API key:

1. Visit "OpenWeatherMap" (https://openweathermap.org/).
2. Create an account or sign in.
3. Generate an API key from your account.
4. Open the "script.js" file.
5. Replace the placeholder API key with your own key.

const API_KEY = "YOUR_API_KEY";

«⚠️ Important: Never share your API key publicly or commit a real API key to a public GitHub repository. For production applications, API credentials should be handled securely using a backend or appropriate environment configuration.»


📡 API Endpoint:-

The application uses the OpenWeatherMap Current Weather Data API.

https://api.openweathermap.org/data/2.5/weather

The API request includes the following parameters:

- "q" – City name entered by the user.
- "appid" – Your OpenWeatherMap API key.
- "units=metric" – Returns temperature in Celsius.

Example Request:-
https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric

🧠 Key Concepts Implemented

This project helped me practice and understand several important JavaScript concepts:

- DOM Manipulation
- Event Listeners
- Asynchronous JavaScript
- Async/Await
- Fetch API
- Promises
- JSON Data Handling
- Try-Catch Error Handling
- Conditional Statements
- Input Validation
- Dynamic Content Rendering
- API Integration
- Geolocation API
- Local Storage
- Responsive Web Design

## ⚠️ Error Handling:-

The application handles different scenarios to improve reliability and user experience.

| Scenario                | Application Behavior                                         |
| ----------------------- | ------------------------------------------------------------ |
| Empty input             | Displays a message asking the user to enter a city name      |
| Invalid city name       | Displays a city-not-found error                              |
| Input containing commas | Requests the user to enter only the city name                |
| Invalid API key         | Displays an appropriate API error message                    |
| Network failure         | Displays an error message if the request fails               |
| Data loading            | Shows a loading indicator while fetching weather information |


📱 Responsive Design:-

The dashboard is designed to work across different screen sizes:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile phones
- 📲 Tablets

The layout automatically adjusts to provide a better viewing experience on different devices.

🎯 Learning Outcomes

Through this project, I gained practical experience in:

- Building a responsive web application using HTML and CSS.
- Understanding and implementing the Fetch API.
- Connecting a frontend application with a public API.
- Fetching and displaying dynamic data based on user input.
- Working with asynchronous JavaScript.
- Managing loading states and API errors.
- Implementing input validation.
- Working with browser geolocation.
- Using local storage for recent searches.
- Creating a dark mode interface.
- Deploying a web application using Netlify.
- Managing source code using Git and GitHub.

🔮 Future Improvements:-

Some possible future improvements include:

- 📅 Add 7-day weather forecast.
- 🕐 Add hourly weather information.
- 🌡️ Display additional weather details such as pressure, visibility, and feels-like temperature.
- 🎨 Add weather-based background animations.
- ♿ Improve accessibility with additional ARIA labels and keyboard navigation.
- 📊 Add detailed weather charts and visualizations.

👨‍💻 Author

Atul Saini

- 🐙 GitHub: "Atulsaini2806" (https://github.com/Atulsaini2806)
- 💼 LinkedIn: "Atul Saini" (https://www.linkedin.com/in/atul-saini11?utm_source=share_via&utm_content=profile&utm_medium=member_android)

- 🌐 Live Project: "Weather Information Dashboard" (https://weather-information-dashboard.netlify.app/)

---

⭐ If you find this project useful, feel free to star the repository!

# Weather-Dashboard

## Description

In this project I was tasked with building a simple weather forecasting app. Users enter a city name and are presented with current weather data including a graphic representing the cloud cover. Below a row of forecasts for the next five days are presented. In addition, searched-for cities are stored in local storage and listed on a left-side column where they can be clicked as button to recall the relevant data.

The main problems I faced were the use of server-side APIs from which I pulled the weather data. One particular issue to overcome was the use of nested calls to the same API to produce all the relevant data (a single call could produce data by city name, but at the cost of a reduced list of data points, which demanded a second call using longitude and latitude coordinates yielded in the first). In addition, I used skills with jquery and bootstrap, as well as local storage techniques to achieve the functionality described in the acceptance criteria.

The following image is a screen shot from the Weather Dashboard:

![image](./assets/images/Screen%20Shot%202022-03-29%20at%206.51.42%20PM.jpeg)

## Installation

Github repository for this project can be found at: https://github.com/dannelson714/Weather-Dashboard

URL of the deployed application: https://dannelson714.github.io/Weather-Dashboard

## Credits

I can be found at https://github.com/dannelson714

I would like to credit:
Leif Hetland: https://github.com/leifehetland &
Laura Cole: https://github.com/LauraCole1900
for their help in making this project come to fruition.

## License

MIT License

Copyright (c) [2022] [Daniel Stephen Nelson]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
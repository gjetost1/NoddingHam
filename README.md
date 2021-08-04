# NoddingHam
![NoddingHam](/images/NHLink.png)

*By Davis Handler, Connor Henderson, Dan Rosen, and Owen Beckles - [Visit NoddingHam](https://nodding-ham.herokuapp.com/)*

**Table of Contents**
* [Welcome to NoddingHam](#welcome-to-noddingham)
* [Technologies Used](#technologies-used)
* [MVP Feature List](#mvp-feature-list)
* [Application Architecture](#application-architecture)
* [Database Schema](#database-schema)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion](#conclusion)

## Welcome to NoddingHam
NoddingHam (a Robinhood clone) is a platform where users can track different securities and view chart visualizations based on volume, open, and closing price. Users are able to save securities to either their watchlist or their portfolio, as well as survey a plethora historical security data.

Real-time and historical market data was provided by [Alpaca Data API v2](https://alpaca.markets/data).

## Technologies Used
* Frontend
    * Javascript
    * React.js
    * Redux.js
    * Tailwind CSS
* Backend
    * Python
    * Flask
    * SQLAlchemy
    * Docker
    * Heroku Deployment

## MVP Feature List
* User Authentification
    * Sign Up/Login

        ![Authentification](/images/NHLoginSignUp.gif)
    * Demo User

        ![DemoUser](/images/NHDemoUser.gif)
* Asset/Stock Detail

    ![Details](/images/NHDetails.gif)
* Portfolio

    ![Portfolio](/images/NHPortfolio.gif)
* Watchlist

    ![Watchlist](/images/NHWatchlist.gif)
* Search

Authenticated users can search an individual security by their ticker symbol. This will direct them to that ticker's designated page, where the user has access to up to five years of that securities historical data.

![Search](/images/NHSearch.gif)

## Application Architecture

### Database Schema
![Database Schema](/images/NoddingHamDB.png)

### Frontend Overview
### Backend Overview


## Conclusion

# NoddingHam
![NoddingHam](/images/NHLink.png)

*By Davis Handler, Connor Henderson, Dan Rosen, and Owen Beckles - [Visit NoddingHam](https://nodding-ham.herokuapp.com/)*

**Table of Contents**
* [Welcome to NoddingHam](#welcome-to-noddingham)
* [Technologies Used](#technologies-used)
* [MVP Feature List](#mvp-feature-list)
* [Application Architecture](#application-architecture)
* [Database Schema](#database-schema)
* [Alpaca Data API](#alpaca-api)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)

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
   
   Users have the ability to sign up for an account by inputing the requested credentials.

   ![Authentification](/images/NHLoginSignUp.gif)
    * Demo User
    
    If users want to access the site without creating an account first, they have the option of entering as a demo user.

    ![DemoUser](/images/NHDemoUser.gif)
* Asset/Stock Detail

   Authenticated users have access to data for an individual security. This includes analytical data regarding the ticker's volume, open and closing price, as well     as an interactive graph representing historical trends in that ticker's market data.

    ![Details](/images/NHDetails.gif)
* Portfolio

   Authenticated users can add individual securities to a portfolio. The portfolio will display a graph for each added ticker which presents the user with up to        five years of it's historical data.

    ![Portfolio](/images/NHPortfolio.gif)
* Watchlist

   Authenticated users can add individual securities to a watchlist. The watchlist will display a graph for each added ticker which presents the user with up to        five years of it's historical data.

    ![Watchlist](/images/NHWatchlist.gif)
* Search

Authenticated users can search an individual security by their ticker symbol. This will direct them to that ticker's designated page, where the user has access to up to five years of that securities historical data.

![Search](/images/NHSearch.gif)

## Application Architecture

### Alpaca Data API

![Alpaca](/images/NHAlpaca.gif)

![Docs](/images/NHApacaDocs.gif)

![CodeOne](/images/NHMarketData1.png)

![CodeTwo](/images/NHMarketData2.png)

### Database Schema
![Database Schema](/images/NoddingHamDB.png)

### Frontend Overview

NoddingHam's frontend was crafted utilizing a React.js / Redux.js data flow. We used Tailwind CSS to style the components and layout.

### Backend Overview

NoddingHam's backend framework was structured using Python/Flask. I arranged my database using SQLAlchemy.

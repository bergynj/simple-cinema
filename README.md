## Cinema application
========================

Build a small MVC PHP cinema guide application.

 Technical requirements :
*  Published in a Git repository, accessible via your public GitHub account (note that this repo will be public, so don’t put sensitive information in there)
*  Built using the Laravel framework version 5.0 (the dev release) - http://laravel.com/
*  Use Composer for dependency management - http://getcomposer.org/
*  Use a PostgresSQL, MySQL, or SQLite database
*  Documented with a README.md file in the document root - https://help.github.com/articles/create-a-repo#create-a-readme-for-your-repository

Functionality requirements:
Design a RESTful API for mobile applications and web services to access cinema guide listings.
*  The API must respond to the application/json media type, and return data in the JSON format
*  The API must support the ability to get a list of movies playing at a given cinema on a given date
*  The API must have documentation (see API specification below for a starting point)


## Installation

Follow these simple steps:

If you don't have composer (`composer --version` to make sure that you have it), you can install it using this command
`npm install -g getcomposer` thanks to [getcomposer](https://github.com/jadjoubran/getcomposer)

* `git clone git@github.com:jadjoubran/laravel5-angular-material-starter.git`
* `npm install -g gulp bower`
* `composer install`
* `npm install`
* `bower install`
* `gulp`
* `gulp watch`
* `php -S localhost:8081 -t public`

============================================================

## API Specification:

The following URLs should be considered as a starting point:
* Cinemas Listing : List of available cinemas.
    /cinemas
* Cinema Information : Information about an individual cinema.
    /cinemas/{name}
* Movie Information : Information about an individual movie.
    /movies/{name}

##  Data Model:
The model should be based on the following database schema (feel free to enhance/change to suit):

Cinemas:
* ID
* Name
* Address
* Geo Lat / Lon

Movies:
* ID
* Title

Session Times:
* ID
* Movie ID
* Cinema ID
* Date Time

============================================================

## Things to Consider
*  Structure of the JSON (nested data objects)
*  Consistent URL structure
*  More API URLs to complete the cinema data model (eg: location/geo search)
*  Authentication/Authorisation
*  Supporting partial dates
*  Pagination support on cinema listings, eg: ?page={number}
*  Input validation
*  Error handling

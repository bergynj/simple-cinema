## To Do :
=======
Minimum Marketing Features:
- Home page
    - Select Cinema (list cinemas)
    - Date selector (select date)
    - Show movies + session times 
- Cinema page
    - Show movies + session times
- Movie page
    - Show session times 
    - Show reviews ? (dummy) - extra

User(Developer) Stories:
1. Decide MVC model
2. Create Lavarel5 folder structure (front-end/back-end)
3. Data Model (MVC design, JSON structure)
4. (MVC) Functions breakdown

- Base HTML template 
- Apply standard project structure / toolchain
- Integrate Blade template, Angular-Material, 
- Document API

Engineering Tasks:
(*server side)
- Setup Lavarel5 app (git, mysql, etc..)
- create database tables (migrate)
- create database seed

- create Model classes
- create Controller classes


Model : 
    - Cinema
    - Movies
    - Mvsessions

Controller :
    -   /cinemas
    -   /cinema/{name}
    -   /movie/{title}
    
View :
    - Home
    - Cinema
    - Movie

(*client side)
- Create build script using gulp + elixir, check if 'laravel-elixir-angular' works properly (done!)
* need to run "gulp watch" on development
- Compile LESS to CSS
- Minify / optimise JavaScript using gulp/elixir (laravel-elixir-angular module takes care of this!)

- Search session page with calendar input : (*site)

(*later?)
- Static code analysis (Lint) using JSHint ? 
- Setup testing (unit testing with Mocha, cross-browser testing Karma)
    (unit test - Mocha) 
    1. DOM test & load js test
    2. a function which validates image slider ?
    (smoke test - Karma)
    1. run on different browsers 

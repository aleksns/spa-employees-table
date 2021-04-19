## Employee managment system

# Explicit and charming web application to work with a database table

![screen1](https://user-images.githubusercontent.com/75623459/114057692-737f2f80-989b-11eb-833b-7978fcba750a.jpg)

## Overview

This application allows to operate with work-related/personal information of an employee.

## Features

- Using the search option you can find an employee "by all" or "by one of the parameters". 

- Make use of all main CRUD operations (create employees, read their info, update employees, delete employees) with REST API. 

- Phone mask helps to easily add numbers in a readable form, e.g., `+44(123)456-7890`. 

- An employee's age and years of service get calculated automatically upon adding/editing in the database and displayed in the table for better user experience. 

- Validation form prevents trying to submit an employee with incorrect email format, or empty required fields. 

- You can sort by columns and use pagination to configure amount of table rows displayed on the screen. 

- Simple and interactive UI with quality of life features will make your job easier and colorful (and if you dont like these colors, you can always change them - it is easy!).
 
- Notification messages upon every action.
 
- Other QoL features.

# Visual presentation

### `Add/Search(View)`

![](https://media.giphy.com/media/1XGplPaDnbFfR7xx9L/giphy.gif)


### `Edit/Delete`

![](https://media.giphy.com/media/Shd62SA3WycuouxPZG/giphy.gif)

### - `Search through a database table with a real-time search. Search by All or one category`
![screen2_2](https://user-images.githubusercontent.com/75623459/114061568-416fcc80-989f-11eb-8c5f-4c05d0032c2b.jpg)
<br />
<br />

### - `Phone mask with region codes (can navigate with search, all countries included)`
![screen3_2](https://user-images.githubusercontent.com/75623459/115225439-bf8d6800-a116-11eb-8871-c82246455de0.jpg)
<br />
<br />

### - `Form validation upon submit`
![screen4_2](https://user-images.githubusercontent.com/75623459/114062692-77fa1700-98a0-11eb-89f7-966481d96394.jpg)
<br />
<br />

#### - `Table sorting function by a row (name, id, department, etc)`
#### - `Calculating any date, e.g., years of service, age`
![screen5_2](https://user-images.githubusercontent.com/75623459/115226158-94574880-a117-11eb-814b-09914af267f2.jpg)
<br />
<br />

#### - `Customizable pagination. Sticky headers (head cells stay on top when scrolling down through a big table)`
![screen6_2](https://user-images.githubusercontent.com/75623459/114064436-5306a380-98a2-11eb-9164-2201031f7911.jpg)
<br />
<br />


## `Installation:`
 How it works: the app connects to your database server and performs all CRUD requests. Therefore you need to have a database table with matching table name and table values. Of course, you can keep your own naming, but in that case, make changes in java files.

1. You need to have a table in a database of your choice. Since name of values may differ in every database table, make sure, the core values are matching
`src\main\java\com\aleksns\employees\application\employee\Employee.java`. (I used PostgreSQL, if you are going to use a different database, add new dependancies in `pom.xml` file).

2. Populate `src\main\resources\application.properties` with your database name, login and password.

3. Open the folder `spa-employees-table\target` in `cmd` and enter: `java -jar spa-employees-table-0.0.1-SNAPSHOT.jar`

4. Open the application in a browser of your choice, go to `http://localhost:8080/`


### Other info:
-Values listed in the table (first name, last name, email, etc) are for reference and can be replaced with anything that suits your needs.\
-Table values were created with random data generator https://www.mockaroo.com/ \
-Made with love and passion using React, Java, PostgreSQL, Spring Boot, Hibernate, Material-UI, axios, react-number-format, react-router, react-notifications...

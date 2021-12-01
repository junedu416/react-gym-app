# react-gym-app

By June D, Daniel W, Nam N and Clare O

---

## About this Application

#### 1. Purpose

This application was created with the purpose to solve the problem posed by our client gym company "Average Joes", who wishes to have a platform where both membership holders and staff can manage individual workouts, classes and gym environment. We therefore created an application that is separate from their home website that is exlusive to registered Average Joes membership holders and staff. The application is a helper tool for the gym that can be used on top of their original management system, that enhances the cutomer experience at their facility. Average Joes gym members can utilise this application to save and create their workout routines, keep track of their progress with certain exercises and book training sessions that are available at the gym. The application can further be used to optimise the gym's customer service by allowing users to submit reports in which staff members can smoothly handle. 

The application also aims to enhances staff work efficiency by creating a platform where their schedules including upcoming personal training and classes can created and neatly organised.

With the launch and integration of this application, the client should see: 
- An increase in efficiency and streamlining of gym operations requiring decreased direct staff assistance.
- Improved, cohesive appointment system.
- Higher customer satisfaction with members having optimised personalised workouts to achieve their desired fitness goals.


#### 2. Functionality and Features

**(1) User authentication and settings**
- Authentication
- Authorization
- Account settings 
  * a) View account information 
  * b)Forget/reset password

**(2) Managing workouts**

- create personalised workouts 
- add exercises that exist in the database or create your own exercise to add to the workout. 
- for each exercise users can set the number of reps, sets and weights 
- weights are auto in/decremented depending on whether the user has successfully completed their exercise

Users (i.e. Average Joes members):

- exercises created by user (non-staff member) are not shared publicly. 

Staff:

- staff members can share workouts publicly where users can see


**(3) Training Classes**

Users:

- users can book Personal Training sessions through the application.
- users can view details about each staff member and choose who they wish to book a personal training session with. 
- classes held by staff members can be booked also

Staff:

- gym staff can create classes and have users book for them through the application. for this, the staff must set the max capacity for each class and provide description and time of the class
- gym staff must provide available time slots that users can book a personal training (weekly or monthly)

**(4) Reports**

Users:

- users can submit a report on faulty equipment or unsocial behaviour that they notice at the gym
- provide description and media (image or video) as an option

Staff:

- staff are notified of any new reports submitted by users 
- can change report status based on whether the issue is not yet handled, is being handled or solved

**(5) Check in**

- users can check in to the gym through the application by pressing a check in button
- based on check in data users are provided with current traffic of the gym
- auto check out after certain period of time

Staff:

- based on check in information staff can analyse gym user flow over time (e.g. we get consistently busy on monday mornings)

**(6) Events**

- event refers to small competitions/games that might be held over a period of time at the gym
- e.g.  who can lift the heaviest weight

Users:

- can view events that are being held at the gym
- can choose to participate in the event and submit a score (media as proof)
- can view scoreboards with top scores over the course of the event

Staff:

- can create events and provide event description and due date


#### 3. Target Audience
  * Client: The gym
  * User: Average Joes membership holders/Gym staff

  The target audience of this application are individuals who has a membership at our client's gym as well as the employees of our client's gym. As the application is a tool that would allow users to book personal training sessions and classes, it is a requirement for employees to use this application to create and manage their training sessions. 

  For the general users who hold an Average Joes gym membership, this application is a highly convenient tool that would allow users to easily view their workout schedules and book training sessions or classes according to their availabilities. While it is not a strict requirement, it is recommended that all members utilise this application to have the best possible experience at Average Joes.

#### 4. Tech Stack
  
  **Version Control**
  - Git
  - GitHub

  **Front End**
  - React.js
  - React Big Calendar
  - Chart.js
  - Styled Components
  - Material UI
  - Chakra UI

  **Back End**
  - Node.js
  - Express.js
  - Mongoose
  - MongoDB
  - Firebase Authentication
  - Firebase Cloud Storage

  **Testing**
  - Jest
  - Cypress

---

## Dataflow Diagram
![High level Dataflow Diagram](docs/img/DFD-highlevel.png "High-level Dataflow Diagram")
![Registration Dataflow Diagram](docs/img/DFD-register.png "Registration Dataflow Diagram")
![Workouts Dataflow Diagram](docs/img/DFD-Workouts.png "Workouts Dataflow Diagram")
![Events Dataflow Diagram](docs/img/DFD-events.png "Events Dataflow Diagram")

## Application Architecture Diagram
![Architecture Diagram](docs/img/AAD.png "Architecture Diagram")
---

## User Stories
1. Persona
![Persona](docs/img/persona1.png "User Persona")
![Persona](docs/img/persona2.png "User Persona")

2. User Stories

| *As a client, I want to have all users sign up for the app so they can access the application features.*|
| ------------- |
| **1st revision**: As a client, I want to have all users sign up for the app so they can access the application features. I would like to make the sign up process easier and have them be able to create an account using their membership ID.     |
| **2nd revision**: Jason is the gym owner and as a client, that also understands the need for security and authentication, he wants members of the gym to be able to register for an account in the app using their membership ID and a temporary access code that is sent to their phone.   |
| **Feature suggestions:**  a) Account sign-in/sign up  b) User Authentication |
<br/>

| *As a client, I want the users to check in when they enter the gym so that venue capacity can be tracked and maintained.*|
| ------------- |
| **1st revision**: Jason is the gym owner, due to covid restrictions, he wants to be able to monitor the venue capacity to better follow the social distancing rules.     |
| **Feature suggestions:** Check-in/checkout button to track visitor flows |
<br/>

| *As a client, I want to be able to create an event/group class to motivate users to work on a certain task.*|
| ------------- |
| **1st revision**:  Jason is an ambitious gym owner, he wants his gym to gain a better reputation by building a harmonious workout environment. He wants to host/organize some entertaining group events that motivate his customer to keep doing exercises. He also needs to set a hosted event's end date so the winner of the competition can be announced.     |
| **2nd revision:** Jason is an ambitious gym owner, he wants his gym gain a better reputation by building a harmonious workout environment. He wants to host and organise entertaining group events to help motivate customers to try different exercises. He wants the competition details to be easily viewable so more members are aware of the competition, and also be able to specify the competition end date so the winner of that competition can be announced.     |
| **Addition:** Due to covid social distancing restrictions, classes have a maximum capacity. As the owner, Jason wants to be able to let members see if any class is full, and not allow members to register once the class is full. If there are any cancellations, members can register for that class if it's below capacity.   |
| **Feature suggestions:** a) CURD gym event and group classes b)Set Class Capacity |
<br/>

| *As a user, I want to view availabilities for Personal Training with a gym staff so that I can book a session that would suit my availabilities.*|
| ------------- |
| **1st revision**: As a user, I want to be able to see details of all the various PTs and the areas each one specialises in so I can select a trainer that is best equipped to help me optimise my training regimen.    |
| **2nd revision**: Jillian is a busy business women and only has the in the morning before work to go to the gym. It would be nice to have a PT that can help optimise her training routine, but what's more important to her is that she can book a session based on a time that best aligns with her busy schedule.     |
| **Feature suggestions:** a) View personal trainer information/availability b) Book/cancel PT session |
<br/>

| *As a gym staff, I want to introduce myself to gym members, so that I can have more clients.*|
| ------------- |
| **1st revision:** As a gym staff, I want to let the customers know my specialties and also introduce myself to the gym customers who doesn't know me, so I can keep myself in front of my target customers.    |
| **2nd revision:** Brian is a hard-working personal trainer. He understands that 50% of his income is from commission of his personal training sessions. He wants to improve the reach of marketing his services so he can have more clientele.     |
| **Feature suggestions:** a) Team page; b)Personal session booking platformn |
<br/>

| *As a user, I want to be able to view all active events that are being held and choose to participate in one or more at a time so I can meet new people.*|
| ------------- |
| **Revision**: Vivian is a freelancer. She enjoys meeting new people and loves group exercise classes/events. She would like to actively attend the gym classes whenever she is free. It would be convenient if there was an app where she can view the available class sessions and be able to book/cancel classes in advance without have to contact gym staff or notify them in person.|
| **Feature suggestions:** a) Book/cancel group events/classes; b)A calender where users can view/update upcoming classes |
<br/>

| *As a user, I want to be able to report on other customer's unsocial behaviour so that gym staff can attend in a timely manner and maintain a comfortable environment.*|
| ------------- |
| **Revision:** James is an active gym member, cares about the community. There have been times where he's witnessed and experienced unsocial behaviour from other members. During staffed hours, he can report these matters to a staff member, however, he has trouble reporting these issues afterhours when there are less staff around. He wants to be able to file a report if there is any cases of unsocial behaviour. |
| **Feature suggestions:** Report unsocial customer's behaviour |
<br/>

| *As a user, I want to be able to report on faulty or missing equipment so that the gym staff are aware of it and can deal with it in a timely manner.*|
| ------------- |
| **Revision:** James cares about the gym community, so he always let the gym staff know if there's faulty equipment. However, as he often trains afterhours, there aren't any staff around to inform them. He wants to be able to report any damaged equipment so the gym staff are aware and can repair/replace them if necessary. |
| **Feature suggestions:** Report faulty gym equipement |
<br/>

| *As a user, I want to be able to edit the weights that have been automatically set for me where I feel it's too heavy/light for me.*|
| ------------- |
| **Revision:** James is a fitness enthusiast. He always keeps track of his workout achievements and seeks more progress. He knows how to use the gym equipment and enjoys planning his daily workout routine on his own, so he doesn't think it's necessary to pay extra for a Personal Trainer. To make the workout more efficient, he wants a helper tool that can record his customized workouts and automatically remind him to increase/decrease the weights/distance based on how he is doing. |
| **Feature suggestions:** a) View workout history; b) Auto workout mode (auto increment/decrement weights/distance based on what exercise users are doing) |
<br/>

| *As a client, I don't want to see customers cancel their bookings at the last minute, so I can better manage gym activities.*|
| ------------- |
| **1st revision:** As a client, I want my customers give me enough notice if they want to cancel/reschedule their event/PT/classes bookings, so I can better plan the gym activities. |
| **2nd revision:** Jason is the gym manager. One of his daily work is to schedule gym events/classes. He has to make sure there are enough supporting equipments and human resource to get those events/classes to run smoothly. However, there are always some customers who have booked the events/class early on but cancel it at the last minute. This causes redundant labour/equipment costs for the gym. |
| **Feature suggestions:** Class/Event Cancellation policy |
<br/>

| *As a personal trainer, I want the users to be able to save their progress with weights/time/distance so that I can suggest the weight they should lift next time.*|
| ------------- |
| **Revision:** Mike is a personal trainer in the gym. His daily work is to help his customers achieve their fitness goals. He has more than 4 personal tranining sessions each day. This makes it hard for him to memorize all the workout progress for each of his customers. He wants an app that can save his customers' progress with weights/time/distance, so he can suggest the weight they should lift next time. He also wants to upload a workout routine to his customers routines so that they have easy access to the workout plan themselves. |
| **Feature suggestions:** Create/view/update/delete customised workout routine |
<br/>

| *As a gym staff, I want to introduce myself to gym members, so that I can have more clients.*|
| ------------- |
| **1st revision:** As a gym staff, I want to let the customers know my specialties and also introduce myself to the gym customers who doesn't know me, so I can keep myself in front of my target customers.  |
| **2nd revision:** Mike is a hard-working personal trainer. He understands that 50% of his income depends on the commission from his personal training sessions. He wants to expose himself to the gym customers as much as possible, so they can possibly let him be their personal trainer.  |
| **Feature suggestions:** a) Our Team page b)Personal session booking platform |
<br/>

| *As a user, I want the workouts to be grouped by category/muscle group, so I can easily plan my workout routine.*|
| ------------- |
| **Revision:** James is a fitness enthusiast. He plans his daily workout on his own. To make the workout more efficient, James only trains one or two muscle group per day. It makes his workout plan easier to follow and track, if he is able to categorise his workout routine by muscle groups. |
| **Feature suggestions:** CRUD custom workouts, categorise exercise by muscle group |
<br/>

| *As a user, I want to be able to navigate the gym app easily, so I don't waste my time finding the feature I want when I am doing the exercise.*|
| ------------- |
| **1st revision:** David is running his own business. He is busy most of the day and only have free time to go to the gym at night. Most of the personal trainers are off-work, so David often spent time in the gym on his own. He wants an app that can recommend exercises for him (Ideally, the recommendations are written by professional gym trainers), so he can do workouts more efficiently. |
| **2nd revision:** David is running his own business. He is busy most of the day and only have free time to go to the gym at night. Most of the personal trainers are off-work, so David often spent time in the gym on his own. He wants an app that can recommend exercises for him (Ideally, the recommendations are written by professional gym trainers), so he can do workouts more efficiently. He also wants the app to have a clear layout, so he can navigate and use the app easily without wasting his valuable time. |
| **Feature suggestions:**  a) Dashboard listing main features b) View PT workout sets |
<br/>

| *As a User, I want to be able to create my own workout routine so that I can remember what I need to do for the day/session*|
| ------------- |
| **1st revision:** Irene is an office lady. She goes to the gym from time to time.  She would like to be able to create her own workout routine in advance, so she can remember what she needs to do for her workout day.|
| **Feature suggestions:**  CRUD custom workout routine |
<br/>

| *As a client, I want the weights/distances to auto decrement/increment based on how my customers are doing, so that they don't get injured.*|
| ------------- |
| **1st revision:** Jason is the gym owner. He cares about his customers and doesn't want to see any of his customers get injured during the workout. He would like to have an app that can automatically remind his customers to decrease the weights.|
| **Feature suggestions:**  Auto workout mode (auto increment/decrement weights/distance)  |
<br/>

| *As a user, I want to see my workout statistics, so I can know how far away I am from my fitness goal.*|
| ------------- |
| **1st revision:** James is a fitness enthusiast. To achieve his fitness goals, he visits the gym very often. Instead of manually recording all his workout progress on his notebook, he needs a tool that collects all his workout progress and generate a chart, so he can know how far away he is from his fitness goal.|
| **Feature suggestions:**  Charts displaying personal exercise progress |

---

## Wireframes

**Landing Page**
This is the page that all users see before they register or log in
![wireframe landing page](docs/img/wireframes/landing.png "landing page")

**User Regstration form**
![wireframe registration form](docs/img/wireframes/register.png "registration form")

When a user first registers they are shown a welcome view with instructions on how to navigate through the application.
![wireframe introductory welcome page](docs/img/wireframes/welcome.png "welcome page after registration")

**User Login form**
![wireframe login form](docs/img/wireframes/login.png "login form")

Once logged in User/staff is taken to the dashboard which acts as a home page

**Profile Page**
All users can view their profile and edit information after registration.
![wireframe profile view](docs/img/wireframes/profile.png "profile view")


**Dashboard for Users**
![wireframe user dashboard](docs/img/wireframes/dashboard-user.png "user dashboard")

**Dashboard for staff**
![wireframe staff dashboard](docs/img/wireframes/dashboard-staff.png "staff dashboard")

Users can view their workouts from the dashboard or through the navigation bar

**Workout Page**
![wireframe workout overview](docs/img/wireframes/workout-overview.png "workout overview")

![wireframe workout show page](docs/img/wireframes/my-workout.png "workout show page")

![wireframe workout edit button options](docs/img/wireframes/workout-edit-options.png "workout edit button options")

workouts are comprised of exercises. When users create or edit workouts they can select from variety of exercises or create their own.

**Exercise view**
![wireframe edit exercise](docs/img/wireframes/exercise-edit.png "edit exercises")

![wireframe exercise view](docs/img/wireframes/exercise-view.png "exercise view")

![wireframe choosing exercises](docs/img/wireframes/exercises.png "choose exercise")

**Personal Trainers**

From the navigation bar users can also view trainers available for Personal training.
![wireframe trainer show page](docs/img/wireframes/our-team.png "trainer show page")

Users can book for a Personal training through an individual trainer,

![wireframe trainer view](docs/img/wireframes/trainer-view.png "user dashboard")

![wireframe booking training session](docs/img/wireframes/trainer-view-booking.png "booking training session")

or view all available personal training sessions.

![wireframe pt calendar](docs/img/wireframes/timetable.png "pt booking calendar")

**Events**
From the Navbar users can also view upcoming or available calendar with Personal training sessions, group classes and events.
![wireframe events calendar](docs/img/wireframes/events.png "events calendar")

Staff has the ability to create a new event in which they do so through a form.
![wireframe create event](docs/img/wireframes/event-create.png "create new event form")



---

## Project Management using Trello

Our team has used Trello for our Project Management. When cards are first created they are assigned to a section according to the following categories;

- **Brainstorming:** Used mostly in the planning phase. Cards about any ideas we have or want for the application is placed here. 
- **Feature/Scope:** Larger scale cards that describes a particular feature of the application is placed here. 
- **Tasks:** Individual tasks that team members must do for the application is placed here. Tasks are generally more specific than Feature/Scope. Cards are placed in this section before team members discuss priorities and difficulties.
- **Meetings:** Planned Team meetings with date and time.
- **Design:** Any design related tasks such as wireframes, color schemes and images are placed here.

Any cards that must be completed will then move along the following sections as we develop our application in order for all team members to follow what tasks are being done and what next steo should be taken;

- **Backlog**
- **To Do**
- **In Progress**
- **Testing**
- **Code Review**
- **Done**

During the planning period, team members have held meetings to discuss necessary tasks for our application, assign its priority and its estimate due date. Specific details about how each card should be created and labelled are outlined on trello to ensure that all team members are following the same rule when creating a new card;

![Trello: How to Create a Card](docs/img/Trello-create-card.png "Creating Trello Card")
![Trello: Card power ups](docs/img/Trello-powerups.png "Assigning Card Power Ups")
![Trello: Card Families](docs/img/Trello-card-families.png "Assigning Card relationships")

**Example of a Trello Card**

![Trello: Card example](docs/img/Trello-example-card.png "trello card example")

**Overview of our Trello Board during team discussion on task priorities and assignment**
![Trello: partial board overview](docs/img/Trello-partial-overview.png "trello board before task assignment")


**Overview of our Trello Board after team discussion on task priorities and assignment**

![Trello: full board overview](docs/img/Trello-full-overview.png "trello board full overview")





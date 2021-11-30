# react-gym-app

By June D, Daniel W, Nam N and Clare O

---

## About this Application

#### 1. Purpose
This application is a helper tool for the gym. It is used on top of their original management system. This app aims to help the gym owner better organise their gym community and optimise their customer service. 

#### 2. Functionality and Features

**1. General features
- Authentication
- Authorization
- Account settings 
  * a) View account information 
  * b)Forget/reset password

**2. Managing workouts**

- create personalised workouts 
- add exercises that exist in the database or create your own exercise to add to the workout. 
- for each exercise users can set the number of reps, sets and weights (note 2)
- weights are auto in/decremented depending on whether the user has successfully completed their exercise

 Users(customers)

- exercises created by user (non-staff member) are not shared publicly. 

Staff

- staff members can share workouts publicly where users can see


**3. Training Classes **

Users:

- users can book Personal Training sessions through the application.
- users can view details about each staff member and choose who they wish to book a personal training session with. 
- classes held by staff members can be booked also

Staff:

- gym staff can create classes and have users book for them through the application. for this, the staff must set the max capacity for each class and provide description and time of the class
- gym staff must provide available time slots that users can book a personal training (weekly or monthly)

**4. Reports**

Users:

- users can submit a report on faulty equipment or unsocial behaviour that they notice at the gym
- provide description and media (image or video) as an option

Staff:

- staff are notified of any new reports submitted by users 
- can change report status based on whether the issue is not yet handled, is being handled or solved

**5. Check in**

- users can check in to the gym through the application by pressing a check in button
- based on check in data users are provided with current traffic of the gym
- auto check out after certain period of time

Staff (if we have time):

- based on check in information staff can analyse gym user flow over time (e.g. we get consistently busy on monday mornings)

**6. Events **

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
  * User: Gym members/Gym staff

#### 4. Tech Stack
  * Front End: React.js
  * Backend: Node.js, Express.js, MongoDB
---

## Dataflow Diagram

## Application Archite ture Diagram

---

## User Stories

---

## Wireframes

---

## Project Management using Trello


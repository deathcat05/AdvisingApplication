Advising Application - 

What Works 
    We are able to make appoint blocks            /advisor ->createBlock
    We are able to accept pending appointments    /advisor->appointmentRequests
    We are able to view comments                  /comments -> click on a users name
    We are able to add comments to an appointment /advisor->click on any previous or upcoming appointment under headline (Cards)
    Students are able to book appointments -> log in as student
    We are able to select the advisor we want to book appointments for  -> log in as student
    Student are able to see upcoming approved appointments -> login as student and go to any advisors page
    Students are able to see upcoming non-approved appointments -> login as student and go into any advisors page

    All passwords are hashed and salted with bcrypt -> tables were too small so we hotfixed it by truncating the hash..I dont think we ever made the quick fix

    All routes are protected with auth - expect /login /register
    All routes changing data in SQL require further checks to make sure they can only change their own data
    We used JWT on the backend 

What Doesn't Work
    Its in beta....

    We currently have more Beta Code to send out email reminders to advisors / students when bookings occur 


What Hasn't Been Tested
    - Sign In / Register hasn't been tested at all


Use these credentials for some data 

    Advisor: advisor_id -> 12345    password -> asdfasdf

    Advisee: student_id -> 4793287   password -> 23452345
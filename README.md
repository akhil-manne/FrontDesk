This is a web application designed for a health clinic to manage queues, doctors and appointments for walk-in patients. The staff can use this application to add patients to queues, give them priority numbers, add doctors and their details, fix appointemnts and more. The frontend uses next.js and the backend uses nest.js, with all data being stored in a mysql database.
To run this application, it is necessary to have node modules installed in the system, both for the frontend and the backend.
1) First setup a database in MySQL called 'clinic_db', and run the scripts necessary (both the table setup and the triggers).
2) Start a development server for the backend in it's respective folder using the node command "npm run start:dev".
3) Start a server for the frontend in it's folder in the command prompt using the node command "npm run dev -- -p 4000". It's important to run both the servers on different ports. In this case for example, the backend runs on port 3000, whereas the frontend runs on port 4000.
4) Upon running locally, the url for getting the login page must be 'http://localhost:4000/login', following the above example.

For the login, the username and password credentials are to be entered. A sample of them put to use are as follows:
1) username : frontDeskUser, password : frontDeskPass123
2) username : frontDeskUser2, password : securePass456
3) username : frontDeskUser3, password : anotherPass789

This website has a good number of functionalities:
1) Queue ->
   i) User can create a patient's entry in the queue, importantly adding their status (normal / urgent) and giving them a priority based on their status.
   ii) User can view the patients' entries in the queue, on applying various filters like progress (waiting, with doctor, complete) and status.
   iii) User can update the patient's entry in the queue.
   iv) User can delete a patient's entry.
2) Doctor ->
   i) User can create a doctor's entry, adding their details like location, specialization and availability status (available / busy / off-duty).
   ii) User can view the doctors' entries, on applying filters like specialization and availability status.
   iii) User can update any doctor's entry.
   iv) User can delete and doctor's entry.
3) Appointments ->
   i) User can create an appointment, adding the IDs of the corresponding patient and doctor, appointment time, appointment status (booked / completed / canceled).
   ii) User can view an appointment entry, on applying filters like patient's id, doctor's id, appointment status.
   iii) User can update any appointment's entry (by rescheduling an appointment, or changing the status of an appointment).
   iv) A user can delete any appointment entry.

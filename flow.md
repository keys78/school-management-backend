management flow ==><== 

Students can register with their student code: so new students will have their student code and they can create new account with their student code 
student will provide [full name, dob, state of origin, address, email, phone number and password]

Student can login
Student can change password 
Students can register and see their courses 
Students can see their test and exam scores and their GPA

A student belongs to a department and a department belongs to faculty 
—————
Lecturers 
Can login update their profile 
Can add students scores 
See their courses and list of students that belong to the courses 

——
System Admin - user
Add a new lecturer
Deactivate student or lecturer 
Admin manages both student and admin



'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
'http://' + req.headers.host + '/reset/' + token + '\n\n' +
'If you did not request this, please ignore this email and your password will remain unchanged.\n'

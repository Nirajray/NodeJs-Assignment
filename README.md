# NodeJs-Assignment

Create a rest api method in node.js which allows only authenticated users to upload the image
of maximum size of 500 KB.

For Authentication, try to use a secure authentication method.

You can use MySQL/MongoDB database with an users table in it and can put some user data
manually to check authentication.

Please make sure to code by yourself, because as part of evaluation we will be doing live
coding with you and you will be asked to make changes in the code in screen share.

# Solution ===>
I have solved above assignment by using user model and uploadUser model. I have used aws s3 to upload images by users.

// post register api==>
In this first user have to register user with valid name, email and password

// post login api==>
Then after succesfully registered user can login with their email and password

and we provide jsonwebtoken to the user for further authentication

//post uploadimage api==>
this api is used to upload image by authenticated user(logged in user). So, in this api user have to give their userid(objectid) in the request parameters (path params).

Image type should be jpeg or jpg and png.

// I used postman as a frontend 
// To start the server use==
    npm run start





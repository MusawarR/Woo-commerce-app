# Woo Commerce
This is a basic e-commerce application that I have created as a task assigned for Full-Stack Software Engineer volunteer position at AEONIS.org

## Features
This app comes with the following features:
1. Account creation (Login and SignUp)
2. Admin and User role base access
3. Product Creation
4. Cart system (users can explore and add products)
5. Order management system (users can view their orders and admin can view all orders)
6. Payment processing with Stripe (payments are processed securely with Stripe and the its webhook functionality).

## Technologies used
1. Express.js for the REST API
2. React.js for the frontend
3. Stripe for payment processing
4. Json Web Tokens for authentication and authorization
5. Swagger for API documentation

## What is not included
Due to time limitation and this project being manily for demonstration, I have decided to keep things at basic levels and avoid any complexity, hence the following things which are necessary in production are skipped in this project:
1. **Payment verification**: on the backend side stripe webhook provides verification functionality to verify the authenticity of the caller, which was skipped but should be done in a production level app.
2. **Route protection**: some frontend routes may not be protected which should be handled in a production web application.
3. **Token Management**: This application provides authentication and authorization using basic JWT tokens. In production systems, multiple auth providers are used which provide better security than a custom made solution (e.g. Auth0)
4. **Responsiveness**: Not much focus was given to the frontend UI responsiveness because it is a time consuming process

## Access
1. REST API documentation can be accessed at the following link (please wait for at least 50 seconds when making the first request): https://woocom-backend.onrender.com/api/docs/
2. Frontend can be accessed at the following link (minor issues are expected): https://aeoniscom.netlify.app/
3. Admin credentials are: email = admin@aeonis.com and password = 123123

## Payment Processing
Below diagram shows the way payment processing is handled by the application.
![Payment_Process](https://github.com/user-attachments/assets/6f9797f5-cddf-447b-a290-1064e3af4cfb)
Payment process is mainly handled with the help of intents and relevant meta data is added so that upon successful payment through credit card, the order payment status can be updated

## Screenshots
### User Side UI
![Login Screen](https://github.com/user-attachments/assets/45447e39-41d8-48ea-a822-faec9c25e575)
![Products List](https://github.com/user-attachments/assets/27d6c01b-5eab-4b0c-b486-9aadc8f51d8f)
![Cart View](https://github.com/user-attachments/assets/89e55b88-e98c-479b-b974-824ee77558c2)
![Payment Page](https://github.com/user-attachments/assets/4f1f9437-dafe-4495-b42b-7bd6f23f3a8e)
![Orders Page](https://github.com/user-attachments/assets/c1627918-0a04-4630-a2ea-ce4e5ffbf940)

### Admin Side UI
![Products View](https://github.com/user-attachments/assets/71da09ae-3bfd-4dee-b0f6-319583325a84)
![Orders View](https://github.com/user-attachments/assets/c81d4757-6826-4b52-9e69-37e6a59b1806)

There might be some rough edges like products not showing on the first load but those are minor issues and can be fixed very quickly, however, I skipped them to save myself some time.

// FILEPATH: /home/patrickojiambo/Documents/shopElegance/tests/authcontrollers.test.js
import request from 'supertest';
import app from '../app'; // Assuming you have an app.js file that exports your app

describe('User Registration', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register') // Assuming your register route is '/register'
      .send({
        name: 'Test User',
        email: 'testuser@gmail.com',
        phone_number: '1234567890',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User registration successful');
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'existingemail@gmail.com',
        phone_number: '1234567890',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Email already exists');
  });

  it('should not register a user with an existing phone number', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'testuser@gmail.com',
        phone_number: 'existingphone',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Phone number already exists');
  });

  // it('should handle server errors', async () => {
  //   // Here you need to simulate a server error, for example by mocking a service to throw an error
  //   const res = await request(app)
  //     .post('/register')
  //     .send({
  //       name: 'Test User',
  //       email: 'testuser@gmail.com',
  //       phone_number: '1234567890',
  //       password: 'password123'
  //     });
  //   expect(res.statusCode).toEqual(500);
  //   expect(res.body).toHaveProperty('error', 'Internal Server Error');
  // });
});
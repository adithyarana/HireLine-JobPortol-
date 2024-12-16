# Hireline

Welcome to **Hireline**, a modern job portal website that bridges the gap between job seekers and recruiters. This platform allows candidates to apply for jobs and recruiters to post job openings seamlessly.

## Features

### For Candidates
- Browse and apply for available job opportunities.
- User-friendly interface for easy navigation.

### For Recruiters
- Post job listings with detailed descriptions.
- Manage job postings efficiently.

### General Features
- Secure authentication using **Clerk**.
- Clean and intuitive UI designed with **ShadCNUI**.
- Responsive design for all device sizes.

---

## Technologies Used

- **Frontend**: React, ShadCNUI
- **Authentication**: Clerk
- **Backend**: Node.js, Supabase (database)

---

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adithyarana/hireline.git
   ```

2. Navigate to the project directory:
   ```bash
   cd hireline
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
```env
REACT_APP_CLERK_FRONTEND_API=<your_clerk_frontend_api>
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

---

## Screenshots

_Add screenshots of your website here!_

1. **Homepage**
   ![Homepage]--![HomePage](https://github.com/user-attachments/assets/5b16ddb5-2f02-44a3-827d-37c2b0c0c6bb)

2. **Job Listings**
   ![Job Listings](./screenshots/job-listings.png)

3. **Job Application Page**
   ![Job Application](./screenshots/job-application.png)

4. **Recruiter Dashboard**
   ![Recruiter Dashboard](./screenshots/recruiter-dashboard.png)

---

## Future Enhancements

- Implement advanced job search and filtering options.
- Add real-time chat between candidates and recruiters.
- Include analytics for recruiters to track application performance.
- auto jobs recommendation system by ml

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For any inquiries, please contact:
Adithya Rana: [adithyarana447@gmail.com] 🫲

---

### Thank you for checking out Hireline! 🚀


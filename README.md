# Furever Health

A modern, full-stack web application for tracking your pet's health journey. Monitor weight, medications, vaccinations, vet visits, and more through a beautiful, pet-loving dashboard.

## Features

- **User Authentication**: Secure login and registration system
- **Pet Profiles**: Add multiple pets with detailed characteristics (species, breed, age, etc.)
- **Health Records**: Track weight, temperature, and general health observations over time
- **Medication Management**: Keep track of current and past medications with dosage and frequency
- **Vaccination Tracking**: Record vaccinations and upcoming due dates
- **Vet Visit History**: Maintain detailed records of veterinary visits
- **Beautiful Dashboard**: Modern, responsive UI with pet-themed design and paw print icons
- **Data Visualization**: Weight tracking charts to monitor your pet's health trends

## Tech Stack

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- bcrypt for password hashing

### Frontend
- React with Vite
- React Router for navigation
- TailwindCSS for styling
- Chart.js for data visualization
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Furever-Health
```

### 2. Set up the database

Install PostgreSQL if you haven't already, then create a database:

```bash
psql -U postgres
CREATE DATABASE furever_health;
\q
```

### 3. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (you can copy from `.env.example`):

```env
PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/furever_health
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 4. Set up the frontend

```bash
cd ../frontend
npm install
```

## Running the Application

### Start the backend server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start the frontend development server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Create an account or log in
3. Add your first pet with their characteristics
4. Start tracking health records by clicking "Add Health Record"
5. Choose from:
   - Health Record (weight, temperature, notes)
   - Medication (name, dosage, frequency)
   - Vaccination (vaccine name, dates, vet info)
   - Vet Visit (visit details, diagnosis, treatment, cost)

## Database Schema

The application uses the following main tables:

- `users` - User accounts
- `pets` - Pet profiles
- `health_records` - Weight, temperature, and general health tracking
- `medications` - Medication history and active prescriptions
- `vaccinations` - Vaccination records and due dates
- `vet_visits` - Veterinary visit history

Tables are automatically created when the backend starts for the first time.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Pets
- `GET /api/pets` - Get all user's pets
- `GET /api/pets/:id` - Get specific pet
- `POST /api/pets` - Create new pet
- `PUT /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet

### Health Data
- `GET /api/health/pets/:petId/records` - Get health records
- `POST /api/health/pets/:petId/records` - Create health record
- `GET /api/health/pets/:petId/medications` - Get medications
- `POST /api/health/pets/:petId/medications` - Create medication
- `GET /api/health/pets/:petId/vaccinations` - Get vaccinations
- `POST /api/health/pets/:petId/vaccinations` - Create vaccination
- `GET /api/health/pets/:petId/vet-visits` - Get vet visits
- `POST /api/health/pets/:petId/vet-visits` - Create vet visit

## Design Highlights

- **Pet-themed UI**: Paw print icons and playful color scheme
- **Gradient backgrounds**: Soft orange, pink, and purple gradients
- **Responsive design**: Works beautifully on desktop and mobile
- **Modern components**: Rounded cards, smooth transitions, hover effects
- **Data visualization**: Interactive charts for tracking weight trends

## Future Enhancements

- Photo uploads for pets
- Appointment reminders
- Export health records to PDF
- Multiple user roles (family sharing)
- Mobile app version
- Integration with veterinary clinics

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

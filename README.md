# Event Booking API

A comprehensive event booking system built with Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd event-booking-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

#### Option A: Using PostgreSQL CLI

```bash
# Connect to PostgreSQL as superuser
psql -U postgres

# Create the database
CREATE DATABASE event_booking_system;

# Create a user (optional, you can use the default postgres user)
CREATE USER event_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE event_booking_system TO event_user;

# Exit psql
\q
```

#### Option B: Using pgAdmin

1. Open pgAdmin
2. Right-click on "Databases"
3. Select "Create" > "Database"
4. Name it `event_booking_system`
5. Click "Save"

### 4. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Or create `.env` manually with the following content:

```env
# Database Configuration
DB_NAME=event_booking_system
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432

# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Environment
NODE_ENV=development
```

**Important:** Replace `your_postgres_password` with your actual PostgreSQL password.

### 5. Run the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

## Project Structure

```
src/
├── config/          # Database and app configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Sequelize models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── validations/     # Input validation
└── workers/         # Background job processors
```

## API Endpoints

The API will be available at `http://localhost:3000`

### User Export Endpoints

#### Export Users as CSV

```bash
GET /api/users/export?format=csv
```

**Headers Required:**

- `Authorization: Bearer <your_jwt_token>`

**Response:** Downloads a CSV file with user data including:

- ID, University ID, Email, First Name, Last Name, Phone Number, Role, Active Status, Created At, Updated At

#### Export Users as PDF

```bash
GET /api/users/export?format=pdf
```

**Headers Required:**

- `Authorization: Bearer <your_jwt_token>`

**Response:** Downloads a PDF file with formatted user report including:

- Title and generation date
- Tabular data with user information
- Summary with total user count

#### Default Export (CSV)

```bash
GET /api/users/export
```

**Headers Required:**

- `Authorization: Bearer <your_jwt_token>`

**Response:** Downloads CSV file (same as `?format=csv`)

### Authentication

All export endpoints require authentication with a valid JWT token. Only users with `super_admin` role can access these endpoints.

### Example Usage

#### Using cURL

```bash
# Export as CSV
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -o users.csv \
     "http://localhost:3000/api/users/export?format=csv"

# Export as PDF
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -o users.pdf \
     "http://localhost:3000/api/users/export?format=pdf"
```

#### Using JavaScript/Fetch

```javascript
// Export as CSV
const response = await fetch(
  "http://localhost:3000/api/users/export?format=csv",
  {
    headers: {
      Authorization: "Bearer YOUR_JWT_TOKEN",
    },
  }
);
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "users.csv";
a.click();

// Export as PDF
const response = await fetch(
  "http://localhost:3000/api/users/export?format=pdf",
  {
    headers: {
      Authorization: "Bearer YOUR_JWT_TOKEN",
    },
  }
);
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "users.pdf";
a.click();
```

## Troubleshooting

### Database Connection Issues

1. **Database doesn't exist**: Follow the database setup instructions above
2. **Wrong credentials**: Check your `.env` file and ensure the database user/password are correct
3. **PostgreSQL not running**: Start PostgreSQL service
4. **Wrong port**: Ensure PostgreSQL is running on port 5432 (default)

### Common Commands

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Connect to PostgreSQL
psql -U postgres -h localhost

# List databases
\l

# Connect to specific database
\c event_booking_system
```

## Development

- The application uses nodemon for development (auto-restart on file changes)
- Database tables will be created automatically on first run
- Check the console for connection status and any errors

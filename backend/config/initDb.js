const db = require('./database');

const createTables = async () => {
  try {
    // Users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Pets table
    await db.query(`
      CREATE TABLE IF NOT EXISTS pets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        species VARCHAR(50) NOT NULL,
        breed VARCHAR(100),
        date_of_birth DATE,
        gender VARCHAR(20),
        color VARCHAR(50),
        microchip_number VARCHAR(50),
        photo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Health records table
    await db.query(`
      CREATE TABLE IF NOT EXISTS health_records (
        id SERIAL PRIMARY KEY,
        pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
        record_date DATE NOT NULL,
        weight DECIMAL(6,2),
        temperature DECIMAL(4,2),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Medications table
    await db.query(`
      CREATE TABLE IF NOT EXISTS medications (
        id SERIAL PRIMARY KEY,
        pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
        name VARCHAR(200) NOT NULL,
        dosage VARCHAR(100),
        frequency VARCHAR(100),
        start_date DATE NOT NULL,
        end_date DATE,
        notes TEXT,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Vaccinations table
    await db.query(`
      CREATE TABLE IF NOT EXISTS vaccinations (
        id SERIAL PRIMARY KEY,
        pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
        vaccine_name VARCHAR(200) NOT NULL,
        vaccination_date DATE NOT NULL,
        next_due_date DATE,
        veterinarian VARCHAR(200),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Vet visits table
    await db.query(`
      CREATE TABLE IF NOT EXISTS vet_visits (
        id SERIAL PRIMARY KEY,
        pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
        visit_date DATE NOT NULL,
        veterinarian VARCHAR(200),
        reason VARCHAR(500),
        diagnosis TEXT,
        treatment TEXT,
        cost DECIMAL(10,2),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

module.exports = { createTables };

const db = require('../config/database');

// Health Records
const getHealthRecords = async (req, res) => {
  try {
    const { petId } = req.params;

    // Verify pet belongs to user
    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      'SELECT * FROM health_records WHERE pet_id = $1 ORDER BY record_date DESC',
      [petId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get health records error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createHealthRecord = async (req, res) => {
  try {
    const { petId } = req.params;
    const { recordDate, weight, temperature, notes } = req.body;

    // Verify pet belongs to user
    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      `INSERT INTO health_records (pet_id, record_date, weight, temperature, notes)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [petId, recordDate, weight, temperature, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create health record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateHealthRecord = async (req, res) => {
  try {
    const { petId, recordId } = req.params;
    const { recordDate, weight, temperature, notes } = req.body;

    // Verify pet belongs to user
    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      `UPDATE health_records
       SET record_date = $1, weight = $2, temperature = $3, notes = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 AND pet_id = $6
       RETURNING *`,
      [recordDate, weight, temperature, notes, recordId, petId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Health record not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update health record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteHealthRecord = async (req, res) => {
  try {
    const { petId, recordId } = req.params;

    // Verify pet belongs to user
    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      'DELETE FROM health_records WHERE id = $1 AND pet_id = $2 RETURNING *',
      [recordId, petId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Health record not found' });
    }

    res.json({ message: 'Health record deleted successfully' });
  } catch (error) {
    console.error('Delete health record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Medications
const getMedications = async (req, res) => {
  try {
    const { petId } = req.params;

    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      'SELECT * FROM medications WHERE pet_id = $1 ORDER BY start_date DESC',
      [petId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get medications error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createMedication = async (req, res) => {
  try {
    const { petId } = req.params;
    const { name, dosage, frequency, startDate, endDate, notes, active } = req.body;

    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      `INSERT INTO medications (pet_id, name, dosage, frequency, start_date, end_date, notes, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [petId, name, dosage, frequency, startDate, endDate, notes, active !== undefined ? active : true]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create medication error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Vaccinations
const getVaccinations = async (req, res) => {
  try {
    const { petId } = req.params;

    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      'SELECT * FROM vaccinations WHERE pet_id = $1 ORDER BY vaccination_date DESC',
      [petId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get vaccinations error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createVaccination = async (req, res) => {
  try {
    const { petId } = req.params;
    const { vaccineName, vaccinationDate, nextDueDate, veterinarian, notes } = req.body;

    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      `INSERT INTO vaccinations (pet_id, vaccine_name, vaccination_date, next_due_date, veterinarian, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [petId, vaccineName, vaccinationDate, nextDueDate, veterinarian, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create vaccination error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Vet Visits
const getVetVisits = async (req, res) => {
  try {
    const { petId } = req.params;

    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      'SELECT * FROM vet_visits WHERE pet_id = $1 ORDER BY visit_date DESC',
      [petId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get vet visits error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createVetVisit = async (req, res) => {
  try {
    const { petId } = req.params;
    const { visitDate, veterinarian, reason, diagnosis, treatment, cost, notes } = req.body;

    const petCheck = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [petId, req.user.userId]
    );

    if (petCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      `INSERT INTO vet_visits (pet_id, visit_date, veterinarian, reason, diagnosis, treatment, cost, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [petId, visitDate, veterinarian, reason, diagnosis, treatment, cost, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create vet visit error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getHealthRecords,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
  getMedications,
  createMedication,
  getVaccinations,
  createVaccination,
  getVetVisits,
  createVetVisit,
};

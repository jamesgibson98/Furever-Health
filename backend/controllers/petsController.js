const db = require('../config/database');

const getAllPets = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM pets WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get pets error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get pet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createPet = async (req, res) => {
  try {
    const { name, species, breed, dateOfBirth, gender, color, microchipNumber, photoUrl } = req.body;

    if (!name || !species) {
      return res.status(400).json({ error: 'Name and species are required' });
    }

    const result = await db.query(
      `INSERT INTO pets (user_id, name, species, breed, date_of_birth, gender, color, microchip_number, photo_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [req.user.userId, name, species, breed, dateOfBirth, gender, color, microchipNumber, photoUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create pet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, species, breed, dateOfBirth, gender, color, microchipNumber, photoUrl } = req.body;

    // Check if pet belongs to user
    const checkResult = await db.query(
      'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const result = await db.query(
      `UPDATE pets
       SET name = $1, species = $2, breed = $3, date_of_birth = $4, gender = $5,
           color = $6, microchip_number = $7, photo_url = $8
       WHERE id = $9 AND user_id = $10
       RETURNING *`,
      [name, species, breed, dateOfBirth, gender, color, microchipNumber, photoUrl, id, req.user.userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update pet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deletePet = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'DELETE FROM pets WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Delete pet error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};

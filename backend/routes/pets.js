const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} = require('../controllers/petsController');

router.use(authenticateToken);

router.get('/', getAllPets);
router.get('/:id', getPetById);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

module.exports = router;

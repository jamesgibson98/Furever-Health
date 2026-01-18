const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
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
} = require('../controllers/healthController');

router.use(authenticateToken);

// Health records
router.get('/pets/:petId/records', getHealthRecords);
router.post('/pets/:petId/records', createHealthRecord);
router.put('/pets/:petId/records/:recordId', updateHealthRecord);
router.delete('/pets/:petId/records/:recordId', deleteHealthRecord);

// Medications
router.get('/pets/:petId/medications', getMedications);
router.post('/pets/:petId/medications', createMedication);

// Vaccinations
router.get('/pets/:petId/vaccinations', getVaccinations);
router.post('/pets/:petId/vaccinations', createVaccination);

// Vet visits
router.get('/pets/:petId/vet-visits', getVetVisits);
router.post('/pets/:petId/vet-visits', createVetVisit);

module.exports = router;

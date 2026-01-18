import { useState } from 'react';
import { healthAPI } from '../services/api';

const AddHealthRecordModal = ({ pet, onClose, onAdd }) => {
  const [activeType, setActiveType] = useState('record');
  const [recordData, setRecordData] = useState({
    recordDate: new Date().toISOString().split('T')[0],
    weight: '',
    temperature: '',
    notes: '',
  });

  const [medicationData, setMedicationData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: '',
    active: true,
  });

  const [vaccinationData, setVaccinationData] = useState({
    vaccineName: '',
    vaccinationDate: new Date().toISOString().split('T')[0],
    nextDueDate: '',
    veterinarian: '',
    notes: '',
  });

  const [vetVisitData, setVetVisitData] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    veterinarian: '',
    reason: '',
    diagnosis: '',
    treatment: '',
    cost: '',
    notes: '',
  });

  const handleRecordChange = (e) => {
    setRecordData({ ...recordData, [e.target.name]: e.target.value });
  };

  const handleMedicationChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setMedicationData({ ...medicationData, [e.target.name]: value });
  };

  const handleVaccinationChange = (e) => {
    setVaccinationData({ ...vaccinationData, [e.target.name]: e.target.value });
  };

  const handleVetVisitChange = (e) => {
    setVetVisitData({ ...vetVisitData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeType === 'record') {
        await healthAPI.createRecord(pet.id, recordData);
      } else if (activeType === 'medication') {
        await healthAPI.createMedication(pet.id, medicationData);
      } else if (activeType === 'vaccination') {
        await healthAPI.createVaccination(pet.id, vaccinationData);
      } else if (activeType === 'visit') {
        await healthAPI.createVetVisit(pet.id, vetVisitData);
      }
      onAdd();
    } catch (error) {
      console.error('Error adding health data:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Health Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {['record', 'medication', 'vaccination', 'visit'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                activeType === type
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type === 'record' ? 'Health Record' : type}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeType === 'record' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="recordDate"
                    value={recordData.recordDate}
                    onChange={handleRecordChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="weight"
                    value={recordData.weight}
                    onChange={handleRecordChange}
                    className="input-field"
                    placeholder="10.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={recordData.temperature}
                    onChange={handleRecordChange}
                    className="input-field"
                    placeholder="38.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={recordData.notes}
                  onChange={handleRecordChange}
                  rows="3"
                  className="input-field"
                  placeholder="Any observations or notes..."
                />
              </div>
            </>
          )}

          {activeType === 'medication' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medication Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={medicationData.name}
                    onChange={handleMedicationChange}
                    required
                    className="input-field"
                    placeholder="Medication name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                  <input
                    type="text"
                    name="dosage"
                    value={medicationData.dosage}
                    onChange={handleMedicationChange}
                    className="input-field"
                    placeholder="10mg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <input
                    type="text"
                    name="frequency"
                    value={medicationData.frequency}
                    onChange={handleMedicationChange}
                    className="input-field"
                    placeholder="Twice daily"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={medicationData.startDate}
                    onChange={handleMedicationChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={medicationData.endDate}
                    onChange={handleMedicationChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  checked={medicationData.active}
                  onChange={handleMedicationChange}
                  className="w-5 h-5 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">Active Medication</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={medicationData.notes}
                  onChange={handleMedicationChange}
                  rows="3"
                  className="input-field"
                />
              </div>
            </>
          )}

          {activeType === 'vaccination' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vaccine Name *
                  </label>
                  <input
                    type="text"
                    name="vaccineName"
                    value={vaccinationData.vaccineName}
                    onChange={handleVaccinationChange}
                    required
                    className="input-field"
                    placeholder="Rabies, DHPP, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vaccination Date *
                  </label>
                  <input
                    type="date"
                    name="vaccinationDate"
                    value={vaccinationData.vaccinationDate}
                    onChange={handleVaccinationChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Due Date
                  </label>
                  <input
                    type="date"
                    name="nextDueDate"
                    value={vaccinationData.nextDueDate}
                    onChange={handleVaccinationChange}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veterinarian
                  </label>
                  <input
                    type="text"
                    name="veterinarian"
                    value={vaccinationData.veterinarian}
                    onChange={handleVaccinationChange}
                    className="input-field"
                    placeholder="Dr. Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={vaccinationData.notes}
                  onChange={handleVaccinationChange}
                  rows="3"
                  className="input-field"
                />
              </div>
            </>
          )}

          {activeType === 'visit' && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visit Date *
                  </label>
                  <input
                    type="date"
                    name="visitDate"
                    value={vetVisitData.visitDate}
                    onChange={handleVetVisitChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veterinarian
                  </label>
                  <input
                    type="text"
                    name="veterinarian"
                    value={vetVisitData.veterinarian}
                    onChange={handleVetVisitChange}
                    className="input-field"
                    placeholder="Dr. Smith"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <input
                    type="text"
                    name="reason"
                    value={vetVisitData.reason}
                    onChange={handleVetVisitChange}
                    className="input-field"
                    placeholder="Annual checkup, illness, etc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                  <textarea
                    name="diagnosis"
                    value={vetVisitData.diagnosis}
                    onChange={handleVetVisitChange}
                    rows="2"
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Treatment</label>
                  <textarea
                    name="treatment"
                    value={vetVisitData.treatment}
                    onChange={handleVetVisitChange}
                    rows="2"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cost"
                    value={vetVisitData.cost}
                    onChange={handleVetVisitChange}
                    className="input-field"
                    placeholder="100.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={vetVisitData.notes}
                  onChange={handleVetVisitChange}
                  rows="3"
                  className="input-field"
                />
              </div>
            </>
          )}

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Add {activeType === 'record' ? 'Record' : activeType}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHealthRecordModal;

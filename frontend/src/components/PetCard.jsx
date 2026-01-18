import { useState, useEffect } from 'react';
import { healthAPI } from '../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PetCard = ({ pet, onAddRecord }) => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [medications, setMedications] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [vetVisits, setVetVisits] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchHealthData();
  }, [pet.id]);

  const fetchHealthData = async () => {
    try {
      const [records, meds, vaccs, visits] = await Promise.all([
        healthAPI.getRecords(pet.id),
        healthAPI.getMedications(pet.id),
        healthAPI.getVaccinations(pet.id),
        healthAPI.getVetVisits(pet.id),
      ]);

      setHealthRecords(records.data);
      setMedications(meds.data);
      setVaccinations(vaccs.data);
      setVetVisits(visits.data);
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'Unknown';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''} ${months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : ''}`;
  };

  const weightChartData = {
    labels: healthRecords.map((r) => new Date(r.record_date).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Weight (kg)',
        data: healthRecords.map((r) => parseFloat(r.weight)).reverse(),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weight Tracking',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const latestWeight = healthRecords.length > 0 ? healthRecords[0].weight : 'N/A';
  const activeMedications = medications.filter((m) => m.active).length;

  return (
    <div className="space-y-6">
      {/* Pet Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {pet.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">{pet.name}</h2>
              <div className="space-y-1 text-gray-600">
                <p>
                  {pet.species} {pet.breed && `• ${pet.breed}`}
                </p>
                <p>Age: {calculateAge(pet.date_of_birth)}</p>
                {pet.gender && <p>Gender: {pet.gender}</p>}
                {pet.color && <p>Color: {pet.color}</p>}
              </div>
            </div>
          </div>
          <button onClick={onAddRecord} className="btn-primary">
            Add Health Record
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-sm text-blue-600 font-medium mb-1">Latest Weight</div>
          <div className="text-3xl font-bold text-blue-900">
            {latestWeight !== 'N/A' ? `${latestWeight} kg` : 'N/A'}
          </div>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <div className="text-sm text-green-600 font-medium mb-1">Active Medications</div>
          <div className="text-3xl font-bold text-green-900">{activeMedications}</div>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="text-sm text-purple-600 font-medium mb-1">Vet Visits</div>
          <div className="text-3xl font-bold text-purple-900">{vetVisits.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex border-b border-gray-200 mb-6">
          {['overview', 'medications', 'vaccinations', 'visits'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {healthRecords.length > 0 && (
              <div>
                <Line data={weightChartData} options={chartOptions} />
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Health Records</h3>
              {healthRecords.length === 0 ? (
                <p className="text-gray-600">No health records yet</p>
              ) : (
                <div className="space-y-3">
                  {healthRecords.slice(0, 5).map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-800">
                          {new Date(record.record_date).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-600">
                          Weight: {record.weight} kg
                        </span>
                      </div>
                      {record.temperature && (
                        <p className="text-sm text-gray-600">Temperature: {record.temperature}°C</p>
                      )}
                      {record.notes && <p className="text-sm text-gray-700 mt-2">{record.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Medications</h3>
            {medications.length === 0 ? (
              <p className="text-gray-600">No medications recorded</p>
            ) : (
              <div className="space-y-3">
                {medications.map((med) => (
                  <div
                    key={med.id}
                    className={`border rounded-lg p-4 ${
                      med.active ? 'border-green-300 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-800">{med.name}</h4>
                        <p className="text-sm text-gray-600">
                          Dosage: {med.dosage} • {med.frequency}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Started: {new Date(med.start_date).toLocaleDateString()}
                          {med.end_date && ` • Ends: ${new Date(med.end_date).toLocaleDateString()}`}
                        </p>
                        {med.notes && <p className="text-sm text-gray-700 mt-2">{med.notes}</p>}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          med.active
                            ? 'bg-green-200 text-green-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {med.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'vaccinations' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Vaccinations</h3>
            {vaccinations.length === 0 ? (
              <p className="text-gray-600">No vaccinations recorded</p>
            ) : (
              <div className="space-y-3">
                {vaccinations.map((vacc) => (
                  <div key={vacc.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800">{vacc.vaccine_name}</h4>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(vacc.vaccination_date).toLocaleDateString()}
                    </p>
                    {vacc.next_due_date && (
                      <p className="text-sm text-gray-600">
                        Next Due: {new Date(vacc.next_due_date).toLocaleDateString()}
                      </p>
                    )}
                    {vacc.veterinarian && (
                      <p className="text-sm text-gray-600">Veterinarian: {vacc.veterinarian}</p>
                    )}
                    {vacc.notes && <p className="text-sm text-gray-700 mt-2">{vacc.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'visits' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Vet Visits</h3>
            {vetVisits.length === 0 ? (
              <p className="text-gray-600">No vet visits recorded</p>
            ) : (
              <div className="space-y-3">
                {vetVisits.map((visit) => (
                  <div key={visit.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800">
                        {new Date(visit.visit_date).toLocaleDateString()}
                      </h4>
                      {visit.cost && (
                        <span className="text-sm font-medium text-gray-700">${visit.cost}</span>
                      )}
                    </div>
                    {visit.veterinarian && (
                      <p className="text-sm text-gray-600">Vet: {visit.veterinarian}</p>
                    )}
                    {visit.reason && (
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-medium">Reason:</span> {visit.reason}
                      </p>
                    )}
                    {visit.diagnosis && (
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Diagnosis:</span> {visit.diagnosis}
                      </p>
                    )}
                    {visit.treatment && (
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Treatment:</span> {visit.treatment}
                      </p>
                    )}
                    {visit.notes && <p className="text-sm text-gray-600 mt-2">{visit.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCard;

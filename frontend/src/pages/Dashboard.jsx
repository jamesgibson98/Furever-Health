import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { petsAPI, healthAPI } from '../services/api';
import PawIcon from '../components/PawIcon';
import AddPetModal from '../components/AddPetModal';
import PetCard from '../components/PetCard';
import AddHealthRecordModal from '../components/AddHealthRecordModal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await petsAPI.getAll();
      setPets(response.data);
      if (response.data.length > 0 && !selectedPet) {
        setSelectedPet(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleAddPet = async (petData) => {
    try {
      const response = await petsAPI.create(petData);
      setPets([...pets, response.data]);
      setSelectedPet(response.data);
      setShowAddPet(false);
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <PawIcon className="w-16 h-16 text-primary-500 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600">Loading your pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PawIcon className="w-10 h-10 text-primary-600" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
                Furever Health
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                Welcome, <span className="font-semibold">{user?.firstName}</span>
              </span>
              <button
                onClick={() => navigate('/settings')}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Settings
              </button>
              <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {pets.length === 0 ? (
          <div className="text-center py-16">
            <PawIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Pets Yet</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Add your first furry friend to start tracking their health
            </p>
            <button onClick={() => setShowAddPet(true)} className="btn-primary">
              Add Your First Pet
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pets Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Your Pets</h2>
                <button
                  onClick={() => setShowAddPet(true)}
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                  title="Add new pet"
                >
                  <span className="text-2xl leading-none">+</span>
                </button>
              </div>

              <div className="space-y-3">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`cursor-pointer card ${
                      selectedPet?.id === pet.id
                        ? 'ring-2 ring-primary-500 bg-primary-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                        {pet.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{pet.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {pet.species} {pet.breed && `• ${pet.breed}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {selectedPet && <PetCard pet={selectedPet} onAddRecord={() => setShowAddRecord(true)} />}
            </div>
          </div>
        )}
      </div>

      {showAddPet && (
        <AddPetModal onClose={() => setShowAddPet(false)} onAdd={handleAddPet} />
      )}

      {showAddRecord && selectedPet && (
        <AddHealthRecordModal
          pet={selectedPet}
          onClose={() => setShowAddRecord(false)}
          onAdd={() => {
            setShowAddRecord(false);
            // Refresh pet data
            fetchPets();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;

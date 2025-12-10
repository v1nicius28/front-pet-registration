import { useState, useEffect } from "react";
import axios from "axios";
import PetForm from "./PetForm";
import PetList from "./PetList";

const API_URL = "https://api-pet-registration.onrender.com";

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchPets = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/pets`, {
          cancelToken: source.token,
        });
        setPets(res.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Erro ao buscar pets:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPets();

    return () => {
      source.cancel("Componente desmontado, cancelando requisição");
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/pets/${id}`);
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error("Erro ao deletar pet:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        idade: Number(formData.idade),
        peso: Number(formData.peso),
        endereco: { ...formData.endereco, numero: Number(formData.endereco.numero) },
      };

      if (editingPet) {
        await axios.put(`${API_URL}/pets/${editingPet.id}`, payload);
        setEditingPet(null);
        setPets((prevPets) =>
          prevPets.map((pet) => (pet.id === editingPet.id ? { ...pet, ...payload } : pet))
        );
      } else {
        const res = await axios.post(`${API_URL}/pets`, payload);
        setPets((prevPets) => [...prevPets, res.data]);
      }
    } catch (error) {
      console.error("Erro ao salvar pet:", error);
    }
  };

  const handleEdit = (pet) => setEditingPet(pet);
  const handleCancelEdit = () => setEditingPet(null);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "radial-gradient(circle, #1C2B58 0%, #080F25 100%)" }}
    >
      <div className="w-full max-w-7xl bg-[#080F25] rounded-2xl shadow-2xl p-8 space-y-10 min-h-[68vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PetForm
            pet={editingPet}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />
          {loading ? (
            <div className="text-white text-center">Carregando pets...</div>
          ) : (
            <PetList pets={pets} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



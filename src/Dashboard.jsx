import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const [petForm, setPetForm] = useState({
    nome: "",
    tipo: "",
    sexo: "",
    idade: "",
    peso: "",
    raca: "",
    endereco: { rua: "", numero: "", cidade: "" },
  });

  const [errors, setErrors] = useState({ idade: "", peso: "", numero: "" });

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await axios.get(`${API_URL}/${endpoint}`);
      setState(response.data);
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
    }
  };

  const handleSubmit = async (e, endpoint, formData, resetForm, fetchCallback) => {
    e.preventDefault();

    if (!/^\d+$/.test(formData.idade)) {
      setErrors((prev) => ({ ...prev, idade: "Idade deve ser um número" }));
      return;
    }
    if (!/^\d+$/.test(formData.peso)) {
      setErrors((prev) => ({ ...prev, peso: "Peso deve ser um número" }));
      return;
    }
    if (!/^\d+$/.test(formData.endereco.numero)) {
      setErrors((prev) => ({ ...prev, numero: "Número da casa deve ser um número" }));
      return;
    }

    try {
      await axios.post(`${API_URL}/${endpoint}`, {
        ...formData,
        idade: Number(formData.idade),
        peso: Number(formData.peso),
        endereco: {
          ...formData.endereco,
          numero: Number(formData.endereco.numero),
        },
      });
      fetchCallback();
      resetForm();
      setErrors({ idade: "", peso: "", numero: "" });
    } catch (error) {
      console.error(`Erro ao criar ${endpoint}:`, error);
    }
  };

  const handleDelete = async (endpoint, id, fetchCallback) => {
    try {
      await axios.delete(`${API_URL}/${endpoint}/${id}`);
      fetchCallback();
    } catch (error) {
      console.error(`Erro ao deletar ${endpoint}:`, error);
    }
  };

  const handleChange = (e, form, setForm) => {
    const { name, value } = e.target;

    if (["idade", "peso", "numero"].includes(name)) {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Digite apenas números",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    if (["rua", "numero", "cidade"].includes(name) && form.endereco) {
      setForm({ ...form, endereco: { ...form.endereco, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  useEffect(() => {
    fetchData("pets", setPets);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "radial-gradient(circle, #1C2B58 0%, #080F25 100%)",
      }}
    >
      <div className="w-full max-w-7xl bg-[#080F25] rounded-2xl shadow-2xl p-8 space-y-10 min-h-[68vh]">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-[#080F25] rounded-2xl p-6 shadow-inner border border-[#343b4f]">
            <h2 className="text-2xl font-semibold mb-6 text-[#cb3cff]">Adicionar Pet</h2>
            <form
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  "pets",
                  petForm,
                  () =>
                    setPetForm({
                      nome: "",
                      tipo: "",
                      sexo: "",
                      idade: "",
                      peso: "",
                      raca: "",
                      endereco: { rua: "", numero: "", cidade: "" },
                    }),
                  () => fetchData("pets", setPets)
                )
              }
              className="space-y-8"
            >
              <input
                name="nome"
                placeholder="Nome do Pet"
                value={petForm.nome}
                onChange={(e) => handleChange(e, petForm, setPetForm)}
                required
                className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  name="tipo"
                  value={petForm.tipo}
                  onChange={(e) => handleChange(e, petForm, setPetForm)}
                  required
                  className={`w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] focus:outline-none focus:ring-2 focus:ring-[#cb3cff]
                    ${petForm.tipo === "" ? "text-[#AEB9E1]" : "text-white"}`}
                >
                  <option value="" disabled className="text-[#AEB9E1]">
                    Selecione o tipo
                  </option>
                  <option className="text-white" value="CACHORRO">Cachorro</option>
                  <option className="text-white" value="GATO">Gato</option>
                </select>
                <select
                  name="sexo"
                  value={petForm.sexo}
                  onChange={(e) => handleChange(e, petForm, setPetForm)}
                  required
                  className={`w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] focus:outline-none focus:ring-2 focus:ring-[#cb3cff]
                    ${petForm.sexo === "" ? "text-[#AEB9E1]" : "text-white"}`}
                >
                  <option value="" disabled className="text-[#AEB9E1]">
                    Selecione o sexo
                    </option>
                  <option className="text-white" value="MACHO">Macho</option>
                  <option className="text-white" value="FEMEA">Fêmea</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="idade"
                    placeholder="Idade (anos)"
                    value={petForm.idade}
                    onChange={(e) => handleChange(e, petForm, setPetForm)}
                    className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
                  />
                  {errors.idade && (
                    <p className="text-red-500 text-sm mt-1">{errors.idade}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="peso"
                    placeholder="Peso (kg)"
                    value={petForm.peso}
                    onChange={(e) => handleChange(e, petForm, setPetForm)}
                    className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
                  />
                  {errors.peso && (
                    <p className="text-red-500 text-sm mt-1">{errors.peso}</p>
                  )}
                </div>
              </div>

              <input
                name="raca"
                placeholder="Raça"
                value={petForm.raca}
                onChange={(e) => handleChange(e, petForm, setPetForm)}
                required
                className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  name="rua"
                  placeholder="Rua"
                  value={petForm.endereco.rua}
                  onChange={(e) => handleChange(e, petForm, setPetForm)}
                  required
                  className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
                />
                <div>
                  <input
                    name="numero"
                    placeholder="Número"
                    value={petForm.endereco.numero}
                    onChange={(e) => handleChange(e, petForm, setPetForm)}
                    required
                    className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
                  />
                  {errors.numero && (
                    <p className="text-red-500 text-sm mt-1">{errors.numero}</p>
                  )}
                </div>
                <input
                  name="cidade"
                  placeholder="Cidade"
                  value={petForm.endereco.cidade}
                  onChange={(e) => handleChange(e, petForm, setPetForm)}
                  required
                  className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white font-bold py-3 rounded-md transition-all duration-200
                           bg-[linear-gradient(90deg,#cb3cff_20%,#7e24fa_68%)]
                           hover:bg-[linear-gradient(90deg,#B048D5_20%,#8F3FFF_68%)]
                           hover:scale-105
                           active:scale-95"
              >
                Criar
              </button>

            </form>
          </div>

          {/* Lista de Pets */}
          <div className="bg-[#080F25] rounded-2xl p-6 shadow-inner border border-[#343b4f] space-y-4 max-h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-[#cb3cff] mb-4">Lista de Pets</h2>
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-[#0b1739] text-white rounded-2xl p-4 shadow-lg flex justify-between items-center border border-[#343b4f] transition hover:shadow-2xl"
              >
                <div>
                  <strong className="text-xl text-[#cb3cff]">{pet.nome}</strong>{" "}
                  ({pet.tipo} - {pet.sexo})
                  <br />
                  {pet.raca} - {pet.idade || "-"} anos - {pet.peso || "-"}kg
                  <br />
                  {pet.endereco.cidade}
                </div>
                <button
                  onClick={() =>
                    handleDelete("pets", pet.id, () => fetchData("pets", setPets))
                  }
                  className="bg-[#FF6C6C] hover:bg-[#FF4C4C] text-white font-semibold px-5 py-2 rounded-xl transition"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


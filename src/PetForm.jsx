import { useState, useEffect } from "react";

const PetForm = ({ pet, onSubmit, onCancel }) => {
  // Função de reset do formulário
  const resetForm = () => {
    setForm({
      nome: "",
      tipo: "",
      sexo: "",
      idade: "",
      peso: "",
      raca: "",
      endereco: { rua: "", numero: "", cidade: "" },
    });
  };

  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    sexo: "",
    idade: "",
    peso: "",
    raca: "",
    endereco: { rua: "", numero: "", cidade: "" },
  });

  // Preencher formulário quando pet for passado
  useEffect(() => {
    if (pet) {
      setForm({
        nome: pet.nome,
        tipo: pet.tipo,
        sexo: pet.sexo,
        idade: pet.idade.toString(),
        peso: pet.peso.toString(),
        raca: pet.raca,
        endereco: {
          rua: pet.endereco.rua,
          numero: pet.endereco.numero.toString(),
          cidade: pet.endereco.cidade,
        },
      });
    } else {
      resetForm();
    }
  }, [pet]);

  // Atualiza o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["rua", "numero", "cidade"].includes(name)) {
      setForm({ ...form, endereco: { ...form.endereco, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    resetForm();
  };

  return (
    <div className="bg-[#080F25] rounded-2xl p-6 shadow-inner border border-[#343b4f]">
      <h2 className="text-2xl font-semibold mb-6 text-[#cb3cff]">
        {pet ? "Editar Pet" : "Adicionar Pet"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nome */}
        <input
          name="nome"
          placeholder="Nome do Pet"
          value={form.nome}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
        />

        {/* Tipo e Sexo */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] focus:outline-none focus:ring-2 focus:ring-[#cb3cff] ${
              form.tipo === "" ? "text-[#AEB9E1]" : "text-white"
            }`}
          >
            <option value="" disabled>Selecione o tipo</option>
            <option value="CACHORRO">Cachorro</option>
            <option value="GATO">Gato</option>
          </select>

          <select
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] focus:outline-none focus:ring-2 focus:ring-[#cb3cff] ${
              form.sexo === "" ? "text-[#AEB9E1]" : "text-white"
            }`}
          >
            <option value="" disabled>Selecione o sexo</option>
            <option value="MACHO">Macho</option>
            <option value="FEMEA">Fêmea</option>
          </select>
        </div>

        {/* Idade e Peso */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="idade"
            placeholder="Idade (anos)"
            value={form.idade}
            onChange={handleChange}
            required
            min="0"
            step="1"
            className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
          />

          <input
            type="number"
            name="peso"
            placeholder="Peso (kg)"
            value={form.peso}
            onChange={handleChange}
            required
            min="0"
            step="0.1"
            className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
          />
        </div>

        {/* Raça */}
        <input
          name="raca"
          placeholder="Raça"
          value={form.raca}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
        />

        {/* Endereço */}
        <div className="grid grid-cols-3 gap-4">
          <input
            name="rua"
            placeholder="Rua"
            value={form.endereco.rua}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
          />

          <input
            type="number"
            name="numero"
            placeholder="Número"
            value={form.endereco.numero}
            onChange={handleChange}
            required
            min="0"
            step="1"
            className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
          />

          <input
            name="cidade"
            placeholder="Cidade"
            value={form.endereco.cidade}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#0b1739] border rounded-xl border-[#343b4f] text-white focus:outline-none focus:ring-2 focus:ring-[#cb3cff] placeholder-[#AEB9E1]"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 text-white font-bold py-3 rounded-md transition-all duration-200
                       bg-[linear-gradient(90deg,#cb3cff_20%,#7e24fa_68%)]
                       hover:bg-[linear-gradient(90deg,#B048D5_20%,#8F3FFF_68%)]
                       hover:scale-105 active:scale-95"
          >
            {pet ? "Salvar Alterações" : "Criar"}
          </button>

          {pet && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 text-white font-bold py-3 rounded-md transition-all duration-200
                         bg-[#0038FF] hover:bg-[#1D4AEA] hover:scale-105 active:scale-95"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PetForm;



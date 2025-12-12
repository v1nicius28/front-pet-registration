import {
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const PetEdit = ({ pet, onEdit, onDelete }) => {
  return (
    <div className="bg-[#0b1739] text-white rounded-2xl p-4 shadow-lg flex justify-between items-center border border-[#343b4f] transition hover:shadow-2xl">
      <div>
        <strong className="text-xl text-[#cb3cff]">{pet.nome}</strong>{" "}
        ({pet.tipo} - {pet.sexo})
        <br />
        {pet.raca} - {pet.idade || "-"} anos - {pet.peso || "-"}kg
        <br />
        {pet.endereco.cidade}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(pet)}
          className="flex items-center gap-2 bg-[#0038FF] hover:bg-[#1D4AEA] text-white font-semibold px-5 py-2 rounded-xl transition hover:scale-105 active:scale-95"
        >
          <PencilSquareIcon className="w-5 h-5" />
          Editar
        </button>

        <button
          onClick={() => onDelete(pet.id)}
          className="flex items-center gap-2 bg-[#9E0004] hover:bg-[#B9030F] text-white font-semibold px-5 py-2 rounded-xl transition hover:scale-105 active:scale-95"
        >
          <TrashIcon className="w-5 h-5" />
          Deletar
        </button>
      </div>
    </div>
  );
};

export default PetEdit;



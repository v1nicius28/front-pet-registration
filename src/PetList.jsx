import PetEdit from "./PetEdit";

const PetList = ({ pets, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl border border-[#343b4f] shadow-inner overflow-hidden bg-[#080F25]">

      <div className="p-6 space-y-4 max-h-[600px] overflow-auto custom-scrollbar">
        <h2 className="text-2xl font-semibold text-[#cb3cff] mb-4">
          Lista de Pets
        </h2>

        {pets.map((pet) => (
          <PetEdit key={pet.id} pet={pet} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

    </div>
  );
};

export default PetList;

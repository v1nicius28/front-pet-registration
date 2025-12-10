import PetItem from "./PetEdit";

const PetList = ({ pets, onEdit, onDelete }) => {
  return (
    <div className="bg-[#080F25] rounded-2xl p-6 shadow-inner border border-[#343b4f] space-y-4 max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-[#cb3cff] mb-4">Lista de Pets</h2>
      {pets.map((pet) => (
        <PetItem key={pet.id} pet={pet} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PetList;

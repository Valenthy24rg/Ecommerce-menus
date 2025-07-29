import { useParams, Link } from 'react-router-dom';
import data from '../data.json';

export const DessertDetail = () => {
  const { id } = useParams();
  const dessert = data.find((d) => d.id === Number(id));

  if (!dessert) {
    return <div className="p-8">Postre no encontrado.</div>;
  }
  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <Link to="/" className="text-[#c73a0f] underline mb-4 inline-block">← Volver</Link>
      <img src={dessert.image.desktop} alt={dessert.name}className="w-full h-64 object-cover rounded mb-6" />
      <h2 className="text-2xl font-bold text-[#260f08] mb-2">{dessert.name}</h2>
      <p className="text-[#87635a] mb-2">{dessert.category}</p>
      <p className="text-lg text-[#260f08] mb-4">${dessert.price}</p>
      <p className="text-[#444]">{dessert.description || 'Sin descripción.'}</p>
    </div>
  );
};

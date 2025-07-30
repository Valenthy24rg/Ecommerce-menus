import { useParams, Link, useNavigate } from 'react-router-dom';
import data from '../data.json';
import { useAuthContext } from '../hooks/useAuthContext';

const DessertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dessert = data.find((d) => d.id === Number(id));
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!dessert) {
    return <div className="p-8">Postre no encontrado.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Link to="/" className="text-[#c73a0f] underline">← Volver</Link>
          <p className="text-sm text-gray-600 mt-1">Bienvenido, {user?.name || 'Usuario'}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#c73a0f] text-white px-4 py-2 rounded-md hover:bg-[#a62d0c] transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
      <img src={dessert.image.desktop} alt={dessert.name} className="w-full h-64 object-cover rounded mb-6" />
      <h2 className="text-2xl font-bold text-[#260f08] mb-2">{dessert.name}</h2>
      <p className="text-[#87635a] mb-2">{dessert.category}</p>
      <p className="text-lg text-[#260f08] mb-4">${dessert.price}</p>
      <p className="text-[#444]">{dessert.description || 'Sin descripción.'}</p>
    </div>
  );
};

export default DessertDetail;

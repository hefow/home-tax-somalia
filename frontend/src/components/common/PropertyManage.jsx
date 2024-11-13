import { Home } from "lucide-react";
import React, { useState } from "react";

function ProprtyManage(){
   const [showForm,setShowForm]=useState(false)
   const [properties, setProperties] = useState([]);


   const handleAddProperty=()=>{
     setShowForm(true);
   }

   const handleDeleteProperty = async (propertyId) => {
      if (!window.confirm('Are you sure you want to delete this property?')) return;
  
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('Authentication token not found');
          return;
        }
  
        const response = await fetch(`http://localhost:5000/api/admin/properties/${propertyId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete property');
        }
  
        toast.success('Property deleted successfully');
        fetchDashboardData();
      } catch (error) {
        console.error('Delete property error:', error);
        toast.error(error.message);
      }
    };
   return(
      <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Property Management</h2>
                <button className="btn btn-primary" onClick={handleAddProperty}>
                  <Home className="h-5 w-5 mr-2" />
                  Add New Property
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{property.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {property.owner?.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{property.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${property.value?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteProperty(property._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
   )
}

export default ProprtyManage
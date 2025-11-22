import React, { useState } from "react";
import { Plus, MapPin, Trash2, Edit2, X } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DetailedProductScroll from "../components/home/DetailedProductScroll";
import { detailedScrollData } from "../data/detailedScrollData";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const AddressManagement = () => {
  const {
    user,
    addAddress,
    updateAddress,
    deleteAddress,
    isLoading,
    isAuthenticated,
  } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    label: "Home",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const addresses = user?.addresses || [];

  React.useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, isLoading]);

  const handleOpenModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        label: address.label,
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      });
    } else {
      setEditingAddress(null);
      setFormData({
        label: "Home",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    let result;
    if (editingAddress) {
      result = await updateAddress(editingAddress._id, formData);
    } else {
      result = await addAddress(formData);
    }

    if (result.success) {
      toast.success(result.message);
      handleCloseModal();
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const result = await deleteAddress(addressId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[1000px] mx-auto w-full py-20">
        <h1 className="text-2xl font-semibold mb-6 text-[#111]">Your Addresses</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Address Card */}
          <div
            onClick={() => handleOpenModal()}
            className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#f08804] hover:bg-gray-50 transition-colors min-h-[260px]"
          >
            <Plus className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-xl font-bold text-gray-500">Add Address</span>
          </div>

          {/* Address List */}
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white p-6 rounded-lg border border-gray-300 relative hover:shadow-md transition-shadow min-h-[260px] flex flex-col"
            >
              {address.label === "Default" && (
                <div className="text-xs text-gray-500 mb-2">Default:</div>
              )}
              <div className="font-bold text-base border-b pb-2 mb-3 flex justify-between items-center">
                <span>{user?.name}</span>
                <span className="text-xs font-normal bg-gray-100 px-2 py-1 rounded text-gray-600">
                  {address.label}
                </span>
              </div>

              <div className="text-sm text-gray-700 flex-1 space-y-1">
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.pincode}
                </p>
                <p>{address.country}</p>
                <p className="mt-2">Phone number: {user?.mobile || "N/A"}</p>
              </div>

              <div className="mt-4 pt-4 border-t flex gap-4 text-sm text-amazon-link">
                <button
                  onClick={() => handleOpenModal(address)}
                  className="hover:underline hover:text-[#C7511F]"
                >
                  Edit
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="hover:underline hover:text-[#C7511F]"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <DetailedProductScroll
        title="More items to consider"
        products={detailedScrollData}
      />

      <Footer />

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#f0f2f2] px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">
                {editingAddress ? "Edit Address" : "Add a new address"}
              </h2>
              <button onClick={handleCloseModal}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">
                  Country/Region
                </label>
                <select
                  className="w-full border border-gray-300 rounded p-2 bg-gray-50 shadow-inner"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                >
                  <option value="India">India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">
                  Address Label
                </label>
                <select
                  className="w-full border border-gray-300 rounded p-2 focus:ring-[#e77600] focus:border-[#e77600] outline-none shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_0_rgba(0,0,0,0.07)]"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">
                  Flat, House no., Building, Company, Apartment
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2 focus:ring-[#e77600] focus:border-[#e77600] outline-none shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_0_rgba(0,0,0,0.07)]"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">City</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 focus:ring-[#e77600] focus:border-[#e77600] outline-none shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_0_rgba(0,0,0,0.07)]"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">State</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 focus:ring-[#e77600] focus:border-[#e77600] outline-none shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_0_rgba(0,0,0,0.07)]"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Pincode</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2 focus:ring-[#e77600] focus:border-[#e77600] outline-none shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_0_rgba(0,0,0,0.07)]"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#F7CA00] hover:bg-[#F0B500] text-[#111] text-sm font-normal py-2 px-4 rounded-lg shadow-sm w-full border border-[#FCD200] cursor-pointer"
                >
                  {isLoading
                    ? "Saving..."
                    : editingAddress
                    ? "Update Address"
                    : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManagement;

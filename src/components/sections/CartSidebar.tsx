import React from "react";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/Button";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const handleCheckout = async () => {
    // TODO: Implement checkout logic
    // This would create a new request in the backend
    console.log("Checking out with items:", state.items);
  };

  const remainingQuota = state.monthlyQuota - state.usedQuota;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">Your Cart</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {state.items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8 p-8 bg-gray-50 rounded-xl">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Start adding devices to request!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800">
                        {item.title}
                      </h4>
                      <p className="text-sm text-blue-600/80 mt-1">
                        {item.specs.processor}, {item.specs.ram},{" "}
                        {item.specs.storage}
                      </p>
                      <div className="mt-3 flex items-center space-x-3 bg-white rounded-lg px-3 py-1.5 w-fit">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="text-blue-600 hover:text-blue-800 w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-blue-800 font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="text-blue-600 hover:text-blue-800 w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors"
                          disabled={item.quantity >= remainingQuota}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                      }
                      className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-full p-1.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4 pt-4 border-t border-gray-100">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm grid grid-cols-2 gap-2">
                <div className="text-blue-600">Monthly Quota</div>
                <div className="text-blue-800 font-medium text-right">{state.monthlyQuota} devices</div>
                <div className="text-blue-600">Used</div>
                <div className="text-blue-800 font-medium text-right">{state.usedQuota} devices</div>
                <div className="text-blue-600">Remaining</div>
                <div className="text-blue-800 font-medium text-right">{remainingQuota} devices</div>
              </div>
            </div>
            <Button
              variant="primary"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
              onClick={handleCheckout}
              disabled={state.items.length === 0}
            >
              Confirm Request
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
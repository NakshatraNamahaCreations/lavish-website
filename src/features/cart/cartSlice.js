import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedAddons: [],
    selectedSlot: "",
    selectedDate: "", // Store as string (ISO format)
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleAddon: (state, action) => {
            const { id, name, price, type } = action.payload;
            const existingAddon = state.selectedAddons.find((addon) => addon.id === id);

            if (existingAddon) {
                state.selectedAddons = state.selectedAddons.filter((addon) => addon.id !== id);
            } else {
                state.selectedAddons.push({ id, name, price, quantity: 1, type });
            }
        },

        addToCart: (state, action) => {
            const { id, name, price, type } = action.payload;
            const existingAddon = state.selectedAddons.find((addon) => addon.id === id);

            if (existingAddon) {
                existingAddon.quantity += 1;
            } else {
                state.selectedAddons.push({ id, name, price, quantity: 1, type });
            }
        },

        removeFromCart: (state, action) => {
            const { id } = action.payload;
            const existingAddon = state.selectedAddons.find((addon) => addon.id === id);

            if (existingAddon) {
                if (existingAddon.quantity > 1) {
                    existingAddon.quantity -= 1;
                } else {
                    state.selectedAddons = state.selectedAddons.filter((addon) => addon.id !== id);
                }
            }
        },

        setSelectedSlot:(state,action)=>{
            state.selectedSlot = action.payload;
        },
        setSelectedDate:(state,action)=>{
            state.selectedDate = action.payload;
        }
    },
});

export const { toggleAddon, addToCart, removeFromCart,setSelectedSlot,setSelectedDate } = cartSlice.actions;
export default cartSlice.reducer;

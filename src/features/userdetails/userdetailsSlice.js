import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    address1: "",
    address2: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    occasion: "",
    location: "",
    mobile: "",
    altMobile: "",
    balloonColors: [],
    foilBalloonColor: "",
};



const userdetailsSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setUserDetails: (state, action) => {
            return { ...state, ...action.payload };
        },
        setBalloonColors: (state, action) => {
            state.balloonColors = action.payload;  // Updates only balloonColors, keeps other fields intact
        },
        setFoilBalloonColor: (state, action) => {
            state.foilBalloonColor = action.payload; // Updates only foilBalloonColor, keeps other fields intact
        },
        resetUserDetails: () => initialState, // Reset only when explicitly called
    },
});

export const { setUserDetails, setBalloonColors, setFoilBalloonColor, resetUserDetails } = userdetailsSlice.actions;
export default userdetailsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import orderService from './orderService';

// Create new order
export const createOrder = createAsyncThunk(
  'order/create',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const orderData = thunkAPI.getState().order.currentOrder;
      return await orderService.createOrder(orderData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user orders
export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getMyOrders(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: {
    orderId: uuidv4(),
    eventDate: null,
    eventTime: null,
    grandTotal: 0,
    subTotal: 0,
    deliveryCharges: 0,
    couponDiscount: 0,
    // gstAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    address: '',
    pincode: '',
    balloonsColor: [],
    items: [],
    addNote: '',
    venueAddress: '',
    source: '',
    occasion: '',
    decorLocation: '',
    altMobile: '',
    otherOccasion: '',
    otherDecorLocation: '',
    paymentType:''
  },
  selectedTimeSlot: null,
  isPincodeValid: false,
  deliveryMessage: '',
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',

};

const GST_PERCENTAGE = 18;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = {
        ...initialState.currentOrder,
        orderId: uuidv4()
      };
      state.selectedTimeSlot = null;
      state.isPincodeValid = false;
      state.deliveryMessage = '';
    },

    setEventDate: (state, action) => {
      state.currentOrder.eventDate = action.payload;
    },

    setSelectedTimeSlot: (state, action) => {
      state.selectedTimeSlot = action.payload;
      state.currentOrder.eventTime = action.payload;
    },

    setPincode: (state, action) => {
      state.currentOrder.pincode = action.payload;
    },

    setAddress: (state, action) => {
      state.currentOrder.address = action.payload;
    },

    setDeliveryCharges: (state, action) => {
      state.currentOrder.deliveryCharges = action.payload;
    },

    setIsPincodeValid: (state, action) => {
      state.isPincodeValid = action.payload;
    },

    setDeliveryMessage: (state, action) => {
      state.deliveryMessage = action.payload;
    },


    setBalloonsColor: (state, action) => {
      state.currentOrder.balloonsColor = action.payload; // ✅ FIXED FIELD NAME
    },

    addServiceItem: (state, action) => {
      const { serviceName, price, originalPrice, image, id, customizedInputs = [] } = action.payload;

      const serviceIndex = state.currentOrder.items.findIndex(
        item => item.categoryType === 'service'
      );

      if (serviceIndex !== -1) {
        state.currentOrder.items[serviceIndex] = {
          ...state.currentOrder.items[serviceIndex],
          serviceName,
          price,
          originalPrice,
          image,
          quantity: 1,
          categoryType: 'service',
          id,
          customizedInputs
        };
      } else {
        state.currentOrder.items.push({
          serviceName,
          price,
          originalPrice,
          quantity: 1,
          image,
          categoryType: 'service',
          id,
          customizedInputs
        });
      }

      // Initial calculation should only include service price
      const servicePrice = price;
      state.currentOrder.subTotal = servicePrice;
      state.currentOrder.grandTotal = servicePrice;
    },

    addAddonItem: (state, action) => {
      const { serviceName, originalPrice, image, quantity = 1, id, customizedInputs = [] } = action.payload;

      const addonIndex = state.currentOrder.items.findIndex(
        item => item.categoryType === 'addon' && item.serviceName === serviceName
      );

      if (addonIndex !== -1) {
        state.currentOrder.items[addonIndex].quantity += quantity;
        state.currentOrder.items[addonIndex].price =
          state.currentOrder.items[addonIndex].originalPrice *
          state.currentOrder.items[addonIndex].quantity;
      } else {
        state.currentOrder.items.push({
          serviceName,
          originalPrice,
          quantity,
          price: originalPrice * quantity,
          image,
          categoryType: 'addon',
          id,
          customizedInputs
        });
      }

      updateTotals(state);
    },

    updateAddonQuantity: (state, action) => {
      const { serviceName, quantity } = action.payload;

      const addonIndex = state.currentOrder.items.findIndex(
        item => item.categoryType === 'addon' && item.serviceName === serviceName
      );

      if (addonIndex !== -1) {
        if (quantity <= 0) {
          state.currentOrder.items.splice(addonIndex, 1);
        } else {
          state.currentOrder.items[addonIndex].quantity = quantity;
          state.currentOrder.items[addonIndex].price =
            state.currentOrder.items[addonIndex].originalPrice * quantity;
        }
      }

      updateTotals(state);
    },

    removeAddonItem: (state, action) => {
      const { serviceName } = action.payload;

      state.currentOrder.items = state.currentOrder.items.filter(
        item => !(item.categoryType === 'addon' && item.serviceName === serviceName)
      );

      updateTotals(state);
    },

    setPaymentType: (state, action) => {
      state.currentOrder.paymentType = action.payload;
      updateTotals(state);
    },

    setCouponDiscount: (state, action) => {
      if (state.currentOrder.paymentType === 'half') {
        state.currentOrder.couponDiscount = 0;
      } else {
        state.currentOrder.couponDiscount = action.payload;
      }
      updateTotals(state);
    },
    recalculateTotals: (state) => {
      updateTotals(state);
    },

    setAddNote: (state, action) => {
      state.currentOrder.addNote = action.payload;
    },
    setVenueAddress: (state, action) => {
      state.currentOrder.venueAddress = action.payload;
    },
    setSource: (state, action) => {
      state.currentOrder.source = action.payload;
    },
    setOccasion: (state, action) => {
      state.currentOrder.occasion = action.payload;
    },
    setDecorLocation: (state, action) => {
      state.currentOrder.decorLocation = action.payload;
    },
    setAltMobile: (state, action) => {
      state.currentOrder.altMobile = action.payload;
    },
    setOtherOcassion: (state, action) => {
      state.currentOrder.otherOccasion = action.payload;
    },
    setOtherDecorLocation: (state, action) => {
      state.currentOrder.otherDecorLocation = action.payload;
    },

    completeOrder: (state) => {
      state.orders.push({ ...state.currentOrder });

      state.currentOrder = {
        ...initialState.currentOrder,
        orderId: uuidv4()
      };
      state.selectedTimeSlot = null;
      state.isPincodeValid = false;
      state.deliveryMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
        state.currentOrder = {
          ...initialState.currentOrder,
          orderId: uuidv4()
        };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

const updateTotals = (state) => {
  const hasItems = state.currentOrder.items.length > 0;

  if (!hasItems) {
    state.currentOrder.subTotal = 0;
    state.currentOrder.grandTotal = 0;
    state.currentOrder.paidAmount = 0;
    state.currentOrder.dueAmount = 0;
    return;
  }

  // 1. Items Total
  const itemsTotal = state.currentOrder.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // 2. Delivery Charge
  const deliveryAmount = state.isPincodeValid
    ? state.currentOrder.deliveryCharges
    : 0;

  // 3. Subtotal
  const subTotal = itemsTotal + deliveryAmount;
  state.currentOrder.subTotal = subTotal;

  // 4. Coupon Discount (only for FULL)
  const couponDiscount =
    state.currentOrder.paymentType === "HALF"
      ? 0
      : state.currentOrder.couponDiscount || 0;

  // 5. Grand Total
  const grandTotal = subTotal - couponDiscount;
  state.currentOrder.grandTotal = grandTotal;

  // 6. Payment Calculation (HALF / FULL)
  if (state.currentOrder.paymentType === "HALF") {
    const half = Math.round(grandTotal / 2);
    state.currentOrder.paidAmount = half;
    state.currentOrder.dueAmount = grandTotal - half;
  } else {
    state.currentOrder.paidAmount = grandTotal;
    state.currentOrder.dueAmount = 0;
  }
};



export const {
  resetCurrentOrder,
  setEventDate,
  setSelectedTimeSlot,
  setPincode,
  setAddress,
  setDeliveryCharges,
  setIsPincodeValid,
  setDeliveryMessage,
  setAddNote,
  setBalloonsColor,
  addServiceItem,
  addAddonItem,
  updateAddonQuantity,
  removeAddonItem,
  setCouponDiscount,
  setPaymentType,
  recalculateTotals,
  completeOrder,
  setVenueAddress,
  setSource,
  setOccasion,
  setDecorLocation,
  setOtherOcassion,
  setOtherDecorLocation,
  setAltMobile
} = orderSlice.actions;

export default orderSlice.reducer;

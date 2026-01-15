import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Offer {
  id: number;
  title: string;
  description: string;
  code: string;
  discountPercent: number;
  discountFixed?: number;
  minOrder?: number;
  maxUses?: number;
  currentUses?: number;
  validUntil?: string;
  tag: "TRENDING" | "NEW USER" | "BEST DEAL" | "LIMITED";
  image: string;
  active: boolean;
}

interface OffersState {
  offers: Offer[];
  appliedCoupon: string | null;
  discountAmount: number;
}

const initialState: OffersState = {
  offers: [
    {
      id: 1,
      title: "Buy 1 Get 1 Kacchi",
      description:
        "Order any large Kacchi Biryani and get another one absolutely free.",
      code: "BUY1GET1",
      discountPercent: 50,
      minOrder: 400,
      tag: "TRENDING",
      image: "/kacchi_logo.jpeg",
      active: true,
    },
    {
      id: 2,
      title: "20% Off on First Order",
      description:
        "New customer? Enjoy 20% discount on your first Kacchi Dine order.",
      code: "WELCOME20",
      discountPercent: 20,
      tag: "NEW USER",
      image: "/kacchi_logo.jpeg",
      active: true,
    },
    {
      id: 3,
      title: "Family Combo @ 999৳",
      description: "4 Kacchi, 2 Borhani & Salad – perfect for family dinners.",
      code: "FAMILY999",
      discountFixed: 500,
      discountPercent: 15,
      minOrder: 3000,
      tag: "BEST DEAL",
      image: "/kacchi_logo.jpeg",
      active: true,
    },
    {
      id: 4,
      title: "Late Night Special",
      description: "Flat 15% off from 10 PM – 12 AM.",
      code: "LATENIGHT15",
      discountPercent: 15,
      tag: "LIMITED",
      image: "/kacchi_logo.jpeg",
      active: true,
    },
    {
      id: 5,
      title: "Weekend Feast",
      description: "30% off on orders above 2000৳ every Friday to Sunday.",
      code: "WEEKEND30",
      discountPercent: 30,
      minOrder: 2000,
      tag: "BEST DEAL",
      image: "/kacchi_logo.jpeg",
      active: true,
    },
  ],
  appliedCoupon: null,
  discountAmount: 0,
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    applyCoupon: (
      state,
      action: PayloadAction<{ code: string; cartTotal: number }>
    ) => {
      const offer = state.offers.find(
        (o) => o.code === action.payload.code && o.active
      );

      if (!offer) {
        state.appliedCoupon = null;
        state.discountAmount = 0;
        return;
      }

      // Check minimum order requirement
      if (offer.minOrder && action.payload.cartTotal < offer.minOrder) {
        state.appliedCoupon = null;
        state.discountAmount = 0;
        return;
      }

      // Check max uses
      if (
        offer.maxUses &&
        offer.currentUses &&
        offer.currentUses >= offer.maxUses
      ) {
        state.appliedCoupon = null;
        state.discountAmount = 0;
        return;
      }

      state.appliedCoupon = offer.code;

      // Calculate discount
      if (offer.discountFixed) {
        state.discountAmount = offer.discountFixed;
      } else if (offer.discountPercent) {
        state.discountAmount = Math.round(
          (action.payload.cartTotal * offer.discountPercent) / 100
        );
      }
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountAmount = 0;
    },

    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },

    addOffer: (state, action: PayloadAction<Offer>) => {
      state.offers.push(action.payload);
    },

    updateOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.offers.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) {
        state.offers[index] = action.payload;
      }
    },

    deactivateOffer: (state, action: PayloadAction<number>) => {
      const offer = state.offers.find((o) => o.id === action.payload);
      if (offer) {
        offer.active = false;
      }
    },
  },
});

export const {
  applyCoupon,
  removeCoupon,
  setOffers,
  addOffer,
  updateOffer,
  deactivateOffer,
} = offersSlice.actions;

export default offersSlice.reducer;

import { createSelector } from 'reselect';

const selectCart = (state) => state.cart; //input selector

//output selector
//createSelector turns this into a memoized selector
export const selectCartItems = createSelector(
  [selectCart], //references an array of input selectors
  (cart) => cart.cartItems //function that returns the value we want out of this selector.
  //params are in the order that are called in the array
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems], //doesn't have to be input selectors referenced here
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);

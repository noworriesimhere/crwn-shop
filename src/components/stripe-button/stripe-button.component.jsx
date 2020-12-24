import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51Hp1ZEBh0eXPB1DUIJd924P3LobZNKdnorgzaBraWC5MfsBtb6qhAWpjUk0aDvKf9QK3F2EAL6BgZTSrL3LZY75e003VUIOmwn';

  const onToken = (token) => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Example Threads Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLbael='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;

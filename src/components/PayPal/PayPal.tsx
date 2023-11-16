import { PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";

import "./PayPal.css";

const CLIENT_ID = "AWuutuwcDjV1bKKKixdtA9LkXEw8tSNoUjQXpOBIJlqutaGdLakuH-Q0_HXQQuRbegsOrE1ae78yK8Ik";



interface CheckoutProps {
  amount: number;
}

const Checkout: React.FC<CheckoutProps> = () => {






  return (
<PayPalScriptProvider options={{ "client-id": CLIENT_ID } as unknown as ReactPayPalScriptOptions}>
      <div>
        <div className="wrapper"></div>
        <br></br>

        {
          <PayPalButtons
            style={{ layout: "vertical" }}
          />
        }
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;

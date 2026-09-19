import React from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useState } from 'react';
import { useEffect } from 'react';

const Premium = () => {

  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser(); 
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(
      BASE_URL + "/premium/verify",
      {
        withCredentials: true
      }
    );

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  }


  const handleBuy = async (membershipType) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType
      },
      {
        withCredentials: true
      }
    )
    console.log(order.data);

    const { amount, currency, orderId, notes, keyId } = order.data;

    // Open Razorpay Checkout
    const options = {
      key: keyId,
      amount,
      currency,
      name: 'Dev Tinder', // Name of the application
      description: 'Connect to developers and find your perfect match', // Description of the application
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.name,
        email: notes.email,
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      },
      handler: verifyPremiumUser // This function will be called once the payment has been done and successful.
    };

    // Now after getting the order, we need to open the Razorpay payment gateway and pass the order details to it. This will allow the user to complete the payment process.
    // We cant directly access Razorpay, for that we need to include the Razorpay script in our index.html file. After that we can access Razorpay using window.Razorpay.
    const rzp = new window.Razorpay(options);
    rzp.open(); // ******This will open the Razorpay dialog box
  }

  return isUserPremium ? (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">
          You are already a Premium User!
        </h1>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">
          Upgrade Your DevTinder Experience
        </h1>

        <p className="mt-3 text-base-content/70">
          Choose a membership plan and unlock premium features.
        </p>
      </div>

      {/* Membership Cards */}
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">

        {/* Silver Card */}
        <div className="card bg-base-100 shadow-xl border border-gray-500 w-full lg:w-1/2">
          <div className="card-body">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-400">
                Silver Membership
              </h2>

              <p className="text-4xl font-bold mt-4">
                ₹299
                <span className="text-sm font-normal text-base-content/60">
                  {" "}
                  / 3 months
                </span>
              </p>
            </div>

            <div className="divider"></div>

            <h3 className="text-lg font-semibold">
              Silver Benefits
            </h3>

            <ul className="space-y-3 mt-3">
              <li>✅ Chat with other people</li>
              <li>✅ 100 connection requests per day</li>
              <li>✅ Silver membership badge</li>
              <li>✅ Access to premium profiles</li>
              <li>✅ 3 months membership validity</li>
            </ul>

            <div className="card-actions mt-8">
              <button
                className="btn btn-neutral w-full"
                onClick={() => handleBuy("silver")}
              >
                Buy Silver
              </button>
            </div>
          </div>
        </div>

        {/* Gold Card */}
        <div className="card bg-base-100 shadow-2xl border-2 border-yellow-400 w-full lg:w-1/2">
          <div className="card-body">
            <div className="text-center">
              <div className="badge badge-warning mb-3">
                Most Popular
              </div>

              <h2 className="text-3xl font-bold text-yellow-400">
                Gold Membership
              </h2>

              <p className="text-4xl font-bold mt-4">
                ₹599
                <span className="text-sm font-normal text-base-content/60">
                  {" "}
                  / 6 months
                </span>
              </p>
            </div>

            <div className="divider"></div>

            <h3 className="text-lg font-semibold">
              Gold Benefits
            </h3>

            <ul className="space-y-3 mt-3">
              <li>✅ Chat with other people</li>
              <li>✅ Unlimited connection requests</li>
              <li>✅ Gold membership badge</li>
              <li>✅ Access to premium profiles</li>
              <li>✅ Priority profile visibility</li>
              <li>✅ 6 months membership validity</li>
            </ul>

            <div className="card-actions mt-8">
              <button
                className="btn btn-warning w-full"
                onClick={() => handleBuy("gold")}
              >
                Buy Gold
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Premium

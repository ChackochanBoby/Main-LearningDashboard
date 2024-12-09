import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
    return (
      <main className="flex items-center justify-center h-full bg-base-100">
        <div className="max-w-md w-full text-center p-6 bg-white shadow-md rounded-lg">
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-16 h-16 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-700 mb-4">
            Payment Successful!
          </h1>
          <p className="text-base-content mb-6">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
          <Link
            to={"/user"}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:ring focus:ring-green-300"
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    );
  };
  
  export default PaymentSuccessPage;
  
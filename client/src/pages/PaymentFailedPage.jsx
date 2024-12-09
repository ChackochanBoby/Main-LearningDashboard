const PaymentFailedPage = () => {
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
              className="w-16 h-16 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856C18.837 18.956 20 16.954 20 15.25v-6.5C20 7.046 18.837 5.044 16.928 4.906M5.072 4.906C3.163 5.044 2 7.046 2 8.75v6.5C2 16.954 3.163 18.956 5.072 19.094z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-700 mb-4">Payment Failed</h1>
          <p className="text-base-content mb-6">
            Unfortunately, your payment could not be processed. Please try again
            or contact support if the issue persists.
          </p>
        </div>
      </main>
    );
  };
  
  export default PaymentFailedPage;
  
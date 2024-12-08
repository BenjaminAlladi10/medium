import { useForm, ValidationError } from '@formspree/react';

export default function Mailer() {
  const [state, handleSubmit] = useForm("manyzqbe");

  if (state.succeeded) {
    return (
      <div className="flex items-center justify-center p-5 bg-white">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <p className="text-black text-xl font-semibold">
            Report Submitted ✅
          </p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="flex items-center justify-center p-5 bg-white">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="space-y-4">
            <div>
                <h1 className="text-xl font-bold font-serif text-center text-red-600">🚩 REPORT</h1>
            </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email Address</label>
            <input id="email" type="email" name="email" placeholder="Your email address" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1"/>
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">Why do you want to report?</label>
            <textarea id="message" name="message" placeholder="Your message" required rows={1} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1"/>
          </div>

          <div>
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-black">User ID</label>
            <input id="userId" type="text" name="userId" placeholder="Enter Author's ID" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <ValidationError prefix="User ID" field="userId" errors={state.errors} className="text-red-500 text-sm mt-1"/>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={state.submitting}
          className="w-full font-serif flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:cursor-not-allowed">
          {state.submitting ? 'Reporting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}
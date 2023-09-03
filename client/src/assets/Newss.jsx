
import React from 'react';

const RegistrationForm = () => {
  return (
    <div className="flex max-h-screen bg-black">
      <div
        className="w-1/2 h-screen bg-cover md:block hidden"
        style={{
          backgroundImage:
            "url(happy-mechanic-standing-repair-garage.jpg)",
        }}
      ></div>

      <div className="md:w-1/2 max-w-lg mx-auto my-8 px-4 py-5 mt-2 shadow-none border border-white rounded">
        <div className="text-left p-0 font-sans ">
          <h1 className="text-white text-3xl font-medium">
            Create an account for free
          </h1>
          <h3 className="p-1 text-gray-300">Free forever. No payment needed.</h3>
        </div>
        <form action="#" className="p-0">
          <div className='grid grid-cols-12 gap-x-2'>
          <div className="mt-5 col-span-12">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Email"
            />
          </div>
          <div className="mt-5 col-span-6">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="User-name"
            />
          </div>
          <div className="mt-5  col-span-6">
            <input
              type="number"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Mobile"
            />
          </div>
          <div className="mt-5  col-span-6">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Work Type"
            />
          </div>
          <div className="mt-5  col-span-6">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Fees"
            />
          </div>
          <div className="mt-5  col-span-6">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Working Time"
            />
          </div>
          <div className="mt-5  col-span-6">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Location"
            />
          </div>
          <div className="mt-5 col-span-12">
            <input
              type="text"
              className="block w-full p-1.5 pb-14 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Address"
            />
          </div>
          <div className="mt-5  col-span-6">
            <input
              type="password"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Password"
            />
          </div>
          <div className="mt-5  col-span-6">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Confirm Password"
            />
          </div>
          </div>
          {/* <div className="mt-6 block p-5 text-sm-sm md:font-sans text-xs text-gray-800">
            <input type="checkbox" className="inline-block border-0" />
            <span display="inline">
              By creating an account you are agreeing to our
              <a
                href="/s/terms"
                target="_blank"
                data-test="Link"
                className="underline"
              >
                Terms and Conditions
              </a>{" "}
              and
              <a
                href="/s/privacy"
                target="_blank"
                data-test="Link"
                className="underline"
              >
                Privacy Policy
              </a>
            </span>
          </div> */}

          <div className="mt-5">
            <input
              type="submit"
              value="Sign up with email"
              className="py-2 bg-green-500 text-white w-full rounded hover:bg-green-600"
            />
          </div>
        </form>
        <a href="/login" data-test="Link">
          <span className="block  text-center text-red-600 text-xs">
           Already have an account?
          </span>
        </a>
      </div>
    </div>
  );
};

export default RegistrationForm;

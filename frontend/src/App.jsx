import { useState } from 'react';

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState();
  const [batch, setBatch] = useState('6-7AM');
  const [age, setAge] = useState(18);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate email with regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) return alert('Invalid email address');

    let data = {
      fullName: name,
      email: email,
      batch: batch,
      age: age
    };

    const options = {
      method: 'POST',
      headers: {
          'Content-Type':
              'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        data
      })
  };

    fetch('http://localhost:5000/save', options).then(res => res.json()).then(data => {
    if(data.status == 201)return setSuccess(true);
    });
  }

  return (
    <div className="App flex justify-center items-center mt-8">
      <div className="Form">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
          <form onSubmit={handleSubmit}>
            <h1 className="m-8">Admission form for Yoga classes</h1>
            <div className="form-group mb-6">
              <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group mb-6">
              <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="age">Age:- {age}</label>
              <input type="range" defaultValue={18} min={18} max={65} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="age" placeholder="Your age" onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="batch">Select your batch:- </label>
              <select defaultValue={'6-7AM'} onChange={(e) => setBatch(e.target.value)} className='border' name="batch" id="batch">
                <option > 6-7AM </option>
                <option > 7-8AM </option>
                <option > 8-9AM </option>
                <option > 5-6PM</option>
              </select>
            </div>
            <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={handleSubmit}>Pay 500 💰 Fee</button>
          </form>
        </div>

        {success &&

          <div className="bg-green-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3 mt-8" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
            <div className="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
              <p className="font-bold text-white flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                payment successfully</p>
              <div className="flex items-center">
                <p className="text-white opacity-90 text-xs">a minute ago</p>
                <button type="button" className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
              </div>
            </div>
            <div className="p-3 bg-green-500 rounded-b-lg break-words text-white">
              Your details and payment are successfully saved.
            </div>
          </div>
        }
      </div >
    </div>
  )
}

export default App

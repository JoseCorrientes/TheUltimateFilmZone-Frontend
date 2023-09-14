import { useState } from "react";
import { sendEmail } from "../../actions/actions";
import { useDispatch } from "react-redux";

function ModalEmail({ setModalOn, actualMovie, urlImage }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendButtonOn, setSendButtonOn] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    let regex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regex.test(e.target.value)) setSendButtonOn(true);
    else setSendButtonOn(false);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMail = () => {
    console.log("actualmovie: ");
    console.log(actualMovie);
    dispatch(sendEmail({ data: actualMovie[0], urlImage, email, message }));
  };

  return (
    <div className="flex flex-row w-full h-screen bg-opacity-50 fixed top-0 left-0  bg-black justify-center items-center ">
      <div className="flex flex-row flex-wrap rounded-2xl w-auto mx-1 sm:mx-0 sm:w-1/3 h-auto bg-white bg-opacity-60 shadow-xl shadow-black ">
        <h1 className="w-full mt-10 text-center font-Roboto text-black text-xl">
          {" "}
          Destination Email
        </h1>
        <input
          type="text"
          value={email}
          className="w-5/6 mx-auto text-center px-3"
          onChange={handleChangeEmail}
        ></input>

        <h1 className="w-full mt-5 text-center font-Roboto text-black text-xl">
          {" "}
          Message
        </h1>
        <input
          type="text"
          value={message}
          className="w-5/6 mx-auto text-center px-3"
          onChange={handleChangeMessage}
        ></input>

        <div className="container w-full flex flex-row mb-10">
          {sendButtonOn && (
            <button
              className="w-1/3 h-2/3 border-2 rounded-2xl hover:bg-gray-400 hover:border-gray-400  border-black mx-auto mt-5 bg-black text-white shadow-md shadow-black"
              onClick={handleSendMail}
            >
              SEND
            </button>
          )}
          {!sendButtonOn && (
            <button
              disabled
              className="w-1/3 h-2/3 border-2 rounded-2xl border-gray-200 mx-auto mt-5 bg-gray-400 text-white bg-opacity-10"
              onClick={handleSendMail}
            >
              SEND
            </button>
          )}
          <button
            className="w-1/3 h-2/3 border-2 rounded-2xl hover:bg-gray-400 hover:border-gray-400  border-black mx-auto mt-5 bg-black text-white shadow-md shadow-black"
            onClick={() => setModalOn(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEmail;

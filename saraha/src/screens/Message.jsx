import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import avatar from "../assets/images/avatar.png";
const Message = () => {
  const { state } = useLocation();

  const { _id, name } = state;
  let [text, setText] = useState("");
  let form = async (e) => {
    e.preventDefault();
    let { data } = await axios.post(
      `http://localhost:3000/api/v1/message/${_id}`,
      text
    );
    if (data.message == "Dnoe ") {
      display();
      setTimeout(() => {
        document.getElementById("mes").classList.replace("d-block", "d-none");
      }, 3000);
    }
  };
  let getMessage = (e) => {
    let myMessage = { ...text };
    myMessage[e.target.name] = e.target.value;
    setText(myMessage);
    //console.log(text);
  };
  function display() {
    let mes = document.getElementById("mes");
    mes.classList.replace("d-none", "d-block");
    document.getElementById("textmsg").value = " ";
  }
  return (
    <div>
      <div
        id="mes"
        className={`alert bg-custom w-75 my-4 m-auto text-white d-none`}
      >
        Your Message has been successfully sent
      </div>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src={avatar} className="avatar " alt />
          </a>
          <h3 className="py-2 text-capitalize">{name}</h3>
          <div className="container text-center mb-5 text-center">
            <div className="row">
              <div className="col-md-12">
                <div style={{ display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                  <form onSubmit={form} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60%', flexDirection: 'column', }}>
                    <textarea
                      style={{ padding: '2%' }}
                      name="text"
                      id="textmsg"
                      cols="10"
                      rows="9"
                      placeholder="Send Your Message"
                      onChange={getMessage}
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className={`btn btn-outline-info mt-3`}
                    >
                      <i class="far fa-paper-plane"></i> send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          data-toggle="modal"
          data-target="#share"
          className="btn btn-default-outline share my-5"
        >
          <i className="fas fa-share-alt" /> Share Profile
        </button>
      </div>
      <div
        className="modal fade"
        id="profile"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change photo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form action method="post">
                  <label htmlFor className="text-muted">
                    The file size of the photo should not exceed 7 MB
                  </label>
                  <input className="form-control" type="file" name="photo" id />
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-info">
                Upload
              </button>
              <button type="button" className="btn btn-outline-danger">
                Remove Photo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="share"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Share Profile
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>host/messages/id</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

import React from "react";

function Categoryform({ handleSubmit, value, setValue,buttonText= "Submit", handleDelete  }) {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2 p-3"
          placeholder="Write Category Name"
          value = {value}
          onChange = {(e)=> {setValue(e.target.value)}}
        />
        <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary mt-3">{buttonText}</button>
        {
            handleDelete && (
                <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete</button>
            )
        }
        </div>
      </form>
    </div>
  );
}

export default Categoryform;

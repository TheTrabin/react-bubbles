import React, { useState, useParams, useHistory } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth';
import AddColor from "./AddColor";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("Info: colors", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
  axiosWithAuth()
  // .put(`/colors/${color.id}`)
  //     .then(res => {
  //     const newColorList = colors.map(cl => {
  //       if (cl.id === res.data.id) {
  //           return res.data
  //       }
  //       return cl
  //   })
  //   updateColors(newColorList)
  //      useHistory.push(`/`);
  .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res =>{
      setColorToEdit(res.data)
      setEditing(false);
  })
    // think about where will you get the id from...


    // where is is saved right now?
    getNewList();
    useHistory.push(`/`); //hgas an odd error, even though it functions in delete.

  }
 
  const getNewList = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => 
        updateColors(res.data)
        )
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log("delete", res.data);
        getNewList();
        useHistory.push(`/`);
        
      })
      .catch(err =>
        console.error("ColorList.js: handleDelete: err: ", err.message, err.response)
      );
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <AddColor /> */}
      
    </div>
  );
};

export default ColorList;

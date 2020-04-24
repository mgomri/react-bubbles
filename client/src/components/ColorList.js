import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};




const ColorList = ({ colors, updateColors }) => {
 
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    hex: ''
  })

  
  const history = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    return(color.id);
     
  };

  const fetchCloros = () => {
    axiosWithAuth()
      .get('/api/colors')
      .then(res => {
        updateColors(res.data)
      })
      .catch(err => console.log(err));
  }

  const saveEdit = e => {
    e.preventDefault();
    
    let clickedColor = colors.find(el => el.id === editColor(el) );
    axiosWithAuth().put(`http://localhost:5000/api/colors/${clickedColor.id}`, colorToEdit)
    .then(res => {
      fetchCloros();
      history.push('/colors');
      setEditing(false);
    })
    .catch(err => console.log(err));
    
    
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      history.push('/colors')
      updateColors(colors.filter(color => color.id !== res.data));
    
    })
    .catch(err => console.log(err));
  };

  const onChangehandler = e => {
    e.preventDefault();
    setNewColor({
      ...newColor,
      [e.target.name] : e.target.value 
    })
  };

  const addNewColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('http://localhost:5000/api/colors', {
      color: newColor.color,
      code: {
        hex: newColor.hex
      }
  })
    .then(res => {
        updateColors(res.data);
        history.push('/colors');
    })
    .catch(err => console.log(err));

    setNewColor({
      color: '',
      hex: '' 
    })
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
      <h3>Add a new color</h3>
      <form className='form' onSubmit={addNewColor}>
        <input 
         type='text'
         name='color'
         onChange={onChangehandler}
         value={newColor.color}
         placeholder='Color'
        />
        <input 
         type='text'
         name='hex'
         onChange={onChangehandler}
         value={newColor.hex}
         placeholder='Hex Code'
        /><br/>
        <button type='input'>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
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
      <p className='title is-5'>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="button is-danger delete" onClick={e => {
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
      <div className='spacer'/>
      {editing && (
        <div className='form-div'>
        <form  className='form' onSubmit={saveEdit}>
          <legend>edit color</legend>
          
            <input className='input'
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
              placeholder='Color Name'
            />
          
            <input className='input'
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
              placeholder='Hex Code'
            />
          
          <div className="button-row">
            <button className='button is-dark' type="submit">save</button>{' '}
            <button className='button is-dark' onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        <div className="spacer" />
        <legend>Add a new color</legend>
        <form className='form' onSubmit={addNewColor}>
          <input 
           type='text'
           name='color'
           onChange={onChangehandler}
           value={newColor.color}
           placeholder='Color'
           className='input'
          />
          <input 
           type='text'
           name='hex'
           onChange={onChangehandler}
           value={newColor.hex}
           placeholder='Hex Code'
           className='input'
          /><br/>
          <button 
          type='submit'
          className='button is-dark'>Add Color</button>{' '}
          <button className='button is-dark' onClick={() => setEditing(false)}>cancel</button>
        </form>
        </div>
      )}
      
    </div>
  );
};

export default ColorList;
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './EditTicket.module.css';
import { getTicket, createTicket, updateTicket, deleteTicket } from '../../../actions/tickets';

const EditTicket = () => {
  const { ticket, isLoading } = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modifiedTicket, setModifiedTicket] = useState({ title: '' });
  const [deleteText, setDeleteText] = useState('Delete Ticket');

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getTicket(id));
    };
  }, []);

  useEffect(() => {
    if (id !== 'new') {
      setModifiedTicket(ticket);
    };
  }, [ticket]);

  const handleChange = e => {
    setModifiedTicket({ ...modifiedTicket, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id === 'new') {
      dispatch(createTicket(modifiedTicket, navigate));
    } else {
      dispatch(updateTicket(id, modifiedTicket, navigate));
    };
  };

  const handleDelete = e => {
    e.preventDefault();

    deleteText === 'Delete Ticket' ? setDeleteText('Are you sure?') : dispatch(deleteTicket(id, navigate));
  };

  return (
    <div className={styles.editForm}>
      {isLoading ? <h3>Loading...</h3> : (
        <form onSubmit={handleSubmit}>
          <label>Title</label><input onChange={handleChange} value={modifiedTicket.title} id='title' />
          <label>Description</label><input onChange={handleChange} value={modifiedTicket.description} id='description' />
          <label>Assigned Role</label><select onChange={handleChange} value={modifiedTicket.assignedRole} id='assignedRole'>
            <option value='' disabled selected hidden>Select...</option>
            <option value='supervisor'>supervisor</option>
            <option value='admin'>admin</option>
          </select>
          <label>Status</label><select onChange={handleChange} value={modifiedTicket.status} id='status'>
            <option value='' disabled selected hidden>Select...</option>
            <option value='pending'>pending</option>
            <option value='in progress'>in progress</option>
            <option value='complete'>complete</option>
          </select>
          <div>
            {id !== 'new' ? <button type='button' onClick={handleDelete} className='alert'>{deleteText}</button> : <span></span>}
            <button type='submit'>Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditTicket;
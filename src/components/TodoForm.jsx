import React, { useState } from 'react';
import CustomModal from './Modal'; 
import { useTranslation } from 'react-i18next';

const TodoForm = ({ addTask,searchItem }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {t} = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskInput = e.target.elements.task.value;
    const priorityInput = e.target.elements.priority.value;
    
    if (taskInput !== "") {
      addTask(taskInput, priorityInput);

    } else {
      setIsModalVisible(true); 
    }
    e.target.reset();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); 
  };

  const handleSearch = (e) =>{
    searchItem(e.target.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='todo-form'>
        <i className="bi bi-chat-square-dots"></i>
        <input name="task" type="text" placeholder={t('myTasks.need')} className='input' />
        <select name="priority" id="priority" className='prioSelect'>
          <option value="Normal">{t('myTasks.select')}</option>  
          <option value={t('myTasks.select1')}>{t('myTasks.select1')}</option>
          <option value="Normal">{t('myTasks.select2')}</option>
          <option value={t('myTasks.select3')}>{t('myTasks.select3')}</option>
        </select>
        <button type='submit' className='btn btn-secondary' style={{ height: "40px" }}>{t('myTasks.addTask')}</button>
        <input type="text" name='search' className='input search' placeholder={t('myTasks.search')} onChange={handleSearch}/>
        <i class="bi bi-search"></i>
      </form>
      <CustomModal isVisible={isModalVisible} handleClose={handleCloseModal} />
    </div>
  );
};

export default TodoForm;

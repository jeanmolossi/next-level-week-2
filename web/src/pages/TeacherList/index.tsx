import React, { useState, useCallback, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const handleSubmitFilterForm = useCallback((e: FormEvent) => {
    e.preventDefault();

    api.get(`classes`, {
      params: {
        subject,
        week_day,
        time
      }
    }).then(response => {
      const teachersList = response.data;

      console.log(teachersList)

      setTeachers(teachersList);
    }).catch(() => {
      console.log('Error');
    })
    
  }, [subject, week_day, time]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form onSubmit={handleSubmitFilterForm} id="search-teachers">

          <Select
            label="Matéria"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciencias', label: 'Ciências' },
              { value: 'Portugues', label: 'Português' },
              { value: 'Educacao-fisica', label: 'Educação física' },
              { value: 'Fisica', label: 'Física' },
              { value: 'Matematica', label: 'Matemática' },
              { value: 'Quimica', label: 'Química' },
              
            ]}
          />          
          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' }
            ]}
          />  
          <Input
            label="Hora"
            name="time"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit">
            <FiSearch /> Buscar
          </button>
          
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;
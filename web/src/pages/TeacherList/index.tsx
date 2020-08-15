import React, { useState, useCallback, FormEvent, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

type FilterType = 'classes' | 'classes/all';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [page, setPage] = useState(1);
  const [loadDebounce, setLoadDebounce] = useState(false);
  const [reachedLastone, setReachedLastone] = useState(false);
  const [filterType, setFilterType] = useState('classes/all' as FilterType);

  const handleLoadTeachers = useCallback(async () => {
    api.get(filterType, {
      params: {
        subject,
        week_day,
        time,
        page
      }
    })
      .then(response => {
        const teachersList = response.data;

        if(teachersList.length > 0){
          setTeachers(currentList => {
            if(currentList.length > 0)
              return [...currentList, ...teachersList]
            else return teachersList
          });
        }else{
          setReachedLastone(true);
        }
        setLoadDebounce(false)
      })
  }, [filterType, page, subject, time, week_day]);

  const handleSubmitFilterForm = useCallback((e: FormEvent) => {
    e.preventDefault();

    setPage(1);
    setLoadDebounce(false);
    setReachedLastone(false);
    setFilterType('classes');
    setTeachers([]);
  }, []);

  useEffect(() => {
    handleLoadTeachers();
  }, [handleLoadTeachers, page]);

  useEffect(() => {
    function onSroll() {
      const main = document.querySelector('#page-teacher-list > main');
      const childs = main ? main.querySelectorAll('article'): [];
      const childHeight = childs.length > 0 ? childs[0].offsetHeight : 0;

      const loadMoreWhen = childs.length * childHeight - (childHeight / 3);
      if(window.pageYOffset > loadMoreWhen && !loadDebounce){
        setPage(state => state + 1)
        setLoadDebounce(true);
      }
    }

    if(!reachedLastone)
      window.addEventListener('scroll', onSroll);
    else
      window.removeEventListener('scroll', onSroll);

    return () => window.removeEventListener('scroll', onSroll);
  }, [loadDebounce, page, reachedLastone]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis"
        location="Estudar"
        blockquote="proffysCount"
      >
        <form onSubmit={handleSubmitFilterForm} id="search-teachers">

          <Select
            label="Matéria"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
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

          <div className="when-inputs-config">
            <Select
              label="Dia da semana"
              name="week_day"
              value={week_day}
              onChange={(e) => setWeekDay(e.target.value)}
              required
              options={[
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' }
              ]}
            />
            <Input
              label="Hora"
              name="time"
              type="time"
              value={time}
              required
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
          </div>

          <button type="submit">
            <FiSearch /> Buscar
          </button>

        </form>
      </PageHeader>

      <main>
        {teachers.length > 0
          ? teachers.map((teacher: Teacher) => (
            <TeacherItem key={teacher.id} teacher={teacher} />
          ))
          : (
            <p className="nothing-found">
              Nenhum professor encontrado com sua pesquisa.
            </p>
        )}
      </main>
    </div>
  );
}

export default TeacherList;

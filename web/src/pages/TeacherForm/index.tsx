import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';

import './styles.css'

const TeacherForm: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [bio, setBio] = useState('');
  
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const setScheduleItemValue = useCallback((position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(position === index){
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }, [scheduleItems]);

  const handleAddNewScheduleItem = useCallback(() => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
  }, [scheduleItems]);

  const handleCreateClass = useCallback((e: FormEvent) => {
    e.preventDefault();

    api.post(`classes`, {
      
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    });

    console.log({
      whatsapp,
      bio,
      subject,
      cost,
      scheduleItems
    })
  }, [whatsapp, bio, subject, cost, scheduleItems, history]);



  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
        location="Dar aulas"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <header className="your-data-header">
              <div className="data-header-container">
                <div className="proffy-avatar">
                  <img src={user.avatar} alt="Avatar do proffy"/>
                </div>
                
                <div className="proffy-name-subject">
                  <h1>
                    {user.name}
                  </h1>
                  <small>
                    {subject}
                  </small>
                </div>
              </div>

              <Input
                label="Whatsapp"
                name="whatsapp"
                maskProps={{}}
                defaultMask="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(__) _ ____ ____"
              />
            </header>

            <Textarea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

          </fieldset>

          <fieldset className="subject-cost">
            <legend>Sobre a aula</legend>

            <section className="inputs-config">
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

              <Input
                label="Custo da sua hora por aula"
                name="cost"
                value={cost}
                defaultMask="currency"
                maskProps={{}}
                onChange={(e) => setCost(e.target.value)}
              />
            </section>

          </fieldset>

          <fieldset>
              <legend>
                Horários disponíveis
                <button type="button" onClick={handleAddNewScheduleItem}>+ Novo horário</button>
              </legend>

              {scheduleItems.map((scheduleItem, index) => (
                <div className="schedule-item" key={scheduleItem.week_day}>
                  <Select
                    label="Dia da semana"
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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

                  <div className="time-inputs">
                    <Input
                      label="Das"
                      name="from"
                      type="time"
                      value={scheduleItem.from}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                      />

                    <Input
                      label="até"
                      name="to"
                      type="time"
                      value={scheduleItem.to}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                    />
                  </div>
                </div>
              ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Icone de alerta" />
              Importante ! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
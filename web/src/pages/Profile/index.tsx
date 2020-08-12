import React, { useState, useCallback, useEffect, FormEvent } from 'react';
import { uuid } from 'uuidv4';
import { FiCamera } from 'react-icons/fi';

import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/TextArea';

import { useAuth } from '../../contexts/Auth';

import './styles.css';
import api from '../../services/api';
import convertMinutesToHourString from '../../utils/convertMinutesToHourString';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [bio, setBio] = useState(user.bio);

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('R$ 0');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 1, from: '08:00', to: '14:00' },
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
    const dayStart = scheduleItems.length;
    setScheduleItems([...scheduleItems, { week_day: dayStart, from: '', to: '' }])
  }, [scheduleItems]);

  const handleRemoveScheduleItem = useCallback((index) => {
    scheduleItems.splice(index, 1);
    setScheduleItems([...scheduleItems]);
  }, [scheduleItems]);

  const handleUpdateProfile = useCallback((e: FormEvent) => {
    e.preventDefault();

    let costSanitize = cost || 'R$ 0,00';
    let whatsSanitize = whatsapp || '(__)';

    const costSanitized = Number(costSanitize.replace(/(r\$|( )|'.')/gim, '').replace(',', '.'));
    const whatsSanitized = whatsSanitize.replace(/(\(|\)|( )|_)/gim, '');

    api.put(`profile/update`, {
      name,
      lastname,
      email,
      whatsapp: whatsSanitized,
      bio,
      subject,
      cost: costSanitized,
      schedules: scheduleItems
    }).then(response => {
      console.log(response.data,
        {
          name,
          lastname,
          email,
          whatsapp,
          bio
        })
      alert('Atualização salva com sucesso!');
      updateUser({
        name,
        lastname,
        email,
        whatsapp,
        bio
      });
    });

  }, [bio, cost, email, lastname, name, scheduleItems, subject, updateUser, whatsapp]);

  useEffect(() => {
    api.get(`profile`).then(response => {
      const { subject, cost, schedules } = response.data;

      const costToBrl = cost ? cost.toString().replace('.', ',') : 0.00

      const parsedSchedules = schedules && schedules.map((scheduleToParse: any) => ({
        ...scheduleToParse,
        from: convertMinutesToHourString(scheduleToParse.from),
        to: convertMinutesToHourString(scheduleToParse.to)
      }));

      setSubject(subject);
      setCost(costToBrl);

      setScheduleItems(state => parsedSchedules || state);

    })
  }, [bio, email, lastname, name, whatsapp]);

  return (
    <div id="page-profile" className="container">
      <PageHeader title="" location="Meu perfil" />
      <div className="page-profile-content">
        <header>
          <div className="avatar">
            <img src={user.avatar} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </div>
          <div className="name-subject">
            <h1>{user.name}</h1>
            <span>Matemática</span>
          </div>
        </header>
      </div>

      <main>
        <form onSubmit={handleUpdateProfile}>
          <fieldset>
            <legend>Seus dados</legend>

            <div className="name-lastname">
              <Input
                label="Nome"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <Input
                label="Sobrenome"
                name="lastname"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </div>

            <div className="email-whatsapp">
              <Input
                label="E-mail"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
              />

              <Input
                label="Whatsapp"
                name="whatsapp"
                maskProps={{}}
                defaultMask="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(__) _ ____ ____"
              />
            </div>

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
                <div className="schedule-item" key={uuid()}>
                  <div className="align-adjust">
                    <Select
                      label="Dia da semana"
                      name="week_day"
                      value={scheduleItem.week_day}
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
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

                  <button
                    className="remove-item"
                    type="button"
                    onClick={e => handleRemoveScheduleItem(index)}
                  >
                    Excluir horário
                  </button>
                </div>
              ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Icone de alerta" />
              Importante ! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar alterações</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Profile;

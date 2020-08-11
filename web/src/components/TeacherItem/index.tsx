import React, { useMemo, useCallback } from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import api from '../../services/api';
import convertMinutesToHourString from '../../utils/convertMinutesToHourString';

import './styles.css';

interface User {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface Schedule {
  week_day: number;
  from: number;
  to: number;
}

export interface Teacher {
  id: number;
  user: User;
  subject: string;
  cost: number;
  schedules: Schedule[];
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

  const parsedSchedules = useMemo(() => {

    const week_days = [
      {
        day: 1,
        week_day: 'Segunda'
      },
      {
        day: 2,
        week_day: 'Terça'
      },
      {
        day: 3,
        week_day: 'Quarta'
      },
      {
        day: 4,
        week_day: 'Quinta'
      },
      {
        day: 5,
        week_day: 'Sexta'
      }]

    const parsed = week_days.map(day => {
      const schedule = teacher.schedules.find(scheduleObject => scheduleObject.week_day === day.day)

      const week_day_parsed = day.week_day;

      if(!schedule) return {
        week_day: day.week_day
      };

      const fromTimeString = `${convertMinutesToHourString(schedule.from)}`;
      const toTimeString = `${convertMinutesToHourString(schedule.to)}`;
      const time_parsed = `${fromTimeString} - ${toTimeString}`;

      return {
        week_day: week_day_parsed,
        time: time_parsed
      };
    });

    return parsed;
  }, [teacher.schedules])

  const formattedCost = useMemo(() => {
    const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(teacher.cost);
    return price;
  }, [teacher.cost])

  const teacherAvatar = useMemo(() =>
    teacher.user.avatar || `https://api.adorable.io/avatars/60/placeholder.png`
  ,[teacher.user.avatar]);

  const handleCreateConnection = useCallback(() => {
    api.post(`connections`, { user_id: teacher.id });
  }, [teacher.id]);

  return (
    <article className="teacher-item">
      <header>
        <img src={teacherAvatar} alt={teacher.user.name} />
        <div>
          <strong>{teacher.user.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.user.bio}</p>

      <section>
        {parsedSchedules.map((schedule) => (
          <div className={`single-day ${!schedule.time && ' disabled'}`}>
            <span>Dia</span>
            <p>{schedule.week_day}</p>
            <span>Horário</span>
            <p>{schedule.time ? schedule.time : '-'}</p>
          </div>
        ))}
      </section>

      <footer>
        <p>
          Preço/hora
          <strong>{formattedCost}</strong>
        </p>
        <a onClick={handleCreateConnection} href={`https://wa.me/+55${teacher.user.whatsapp}`} target="_blank" rel="noopener noreferrer">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;

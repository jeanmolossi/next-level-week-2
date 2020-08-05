import React from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css';

const TeacherList: React.FC = () => {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis" />
    </div>
  );
}

export default TeacherList;
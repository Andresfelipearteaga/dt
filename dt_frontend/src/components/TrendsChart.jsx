
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import PropTypes from 'prop-types'

// Componente de gráfico de tendencias
const TrendsChart = ( { data } ) => {


console.log('current data', data);
    const dataTrend = [
      { subject: 'Asistencia', value: data.attendance, fullMark: 100 },
      { subject: 'Actividades enviadas', value: (data.submitted / 20) * 100, fullMark: 100 },
      { subject: 'Estudio extracurricular (hrs)', value: data.hours * 10, fullMark: 100 },
      { subject: 'Estudio con recursos online (hrs)', value: data.hours_online * 10, fullMark: 100 },
      { subject: 'Promedio de calificación', value: (data.grades / 5) * 100, fullMark: 100 },


    ];
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={100} data={dataTrend}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar name="Resultados" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
    );
  };

export default TrendsChart;

TrendsChart.propTypes = {
    data: PropTypes.object.isRequired,
  };
TrendsChart.displayName = 'TrendsChart';
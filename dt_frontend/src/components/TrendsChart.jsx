import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import PropTypes from 'prop-types';

// Función para convertir fracciones a porcentaje
const calculatePercentage = (fraction) => {
  if (!fraction || typeof fraction !== "string" || !fraction.includes("/")) return 0;
  
  const [num, denom] = fraction.split("/").map(Number);
  return denom > 0 ? ((num / denom) * 100).toFixed(2) : 0;
};

// Componente de gráfico de tendencias
const TrendsChart = ({ data }) => {
  console.log('current data', data);

  const dataTrend = [
    { subject: 'Asistencia', value: data.attendance, fullMark: 100 },
    { subject: 'Actividades enviadas', value: calculatePercentage(data.submitted), fullMark: 100 },
    { subject: 'Estudio extracurricular', value: calculatePercentage(data.hours), fullMark: 100 },
    { subject: 'Estudio con recursos online', value: calculatePercentage(data.hours_online), fullMark: 100 },
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

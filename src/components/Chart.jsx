import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';
import { useTranslation } from 'react-i18next';

const Chart = ({ completedTaskCount, activeTaskCount , averageCompletionTime }) => {
  const { t } = useTranslation();

  const chartData = {
    labels: [t('chart.completed'), t('chart.active'), t('chart.time')],
    datasets: [{
      label: t('chart.count'),
      data: [
        completedTaskCount ? parseInt(completedTaskCount) : 0,
        activeTaskCount ? parseInt(activeTaskCount) : 0,
        averageCompletionTime
      ],
      backgroundColor: [
        'rgba(255, 75, 183, 0.9)',
        'rgba(148, 176, 246, 1)',
        'rgba(255, 206, 86, 0.8)',
      ],
    }],
  };

  useEffect(() => {
    ChartJS.register();
  }, []);

  return (
    <div className='chart-container'>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;

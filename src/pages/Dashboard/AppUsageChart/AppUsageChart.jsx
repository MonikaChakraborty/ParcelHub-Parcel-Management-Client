import Chart from 'react-apexcharts';

const AppUsageChart = ({ data }) => {
  const options = {
    chart: {
      id: 'app-usage-chart',
    },
    xaxis: {
      categories: data.map((entry) => entry.date),
    },
  };

  const series = [
    {
      name: 'Bookings',
      data: data.map((entry) => entry.bookings),
    },
  ];

  return (
    <div>
      <h2>App Usage Data: Bookings by Date</h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default AppUsageChart;

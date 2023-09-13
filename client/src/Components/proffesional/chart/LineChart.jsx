import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { LinearScale, CategoryScale } from "chart.js/auto";
import { Chart } from "chart.js/auto";
import AxiosIns from '../../../Axios/proAxios';
import { useSelector } from "react-redux";
Chart.register(LinearScale, CategoryScale);

// Function to get the name of the current month
const getCurrentMonthName = (date) => {
  const options = { month: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const FinancialYearChart = () => {
  const proAxios = AxiosIns();
  const [bookings, setBookings] = useState(null);
  const proData = useSelector((store) => store.Proffessional.proData);

  useEffect(() => {
    proAxios.get(`/proBookings?id=${proData._id}`).then((res) => {
      if (res.data) {
        setBookings(res.data);
      }
    });
  }, [proData._id]);

  // Function to check if a date is within the financial year
  const isWithinFinancialYear = (date) => {
    const currentYear = new Date().getFullYear();
    const financialYearStart = new Date(currentYear, 0, 1); // Assuming financial year starts on January 1st
    const financialYearEnd = new Date(currentYear, 11, 31); // Assuming financial year ends on December 31st of the current year
    return date >= financialYearStart && date <= financialYearEnd;
  };

  // Filter bookings data for the current financial year
  const bookingsInFinancialYear = bookings
    ? bookings.filter((booking) => isWithinFinancialYear(new Date(booking.BookingDate)))
    : [];

  // Function to generate labels for each month within the financial year
  const generateMonthLabels = () => {
    const monthLabels = [];
    const currentYear = new Date().getFullYear();
    const financialYearStart = new Date(currentYear, 0, 1); // Assuming financial year starts on January 1st
    const financialYearEnd = new Date(currentYear, 11 , 31); // Assuming financial year ends on December 31st of the current year
    let currentDate = new Date(financialYearStart);

    while (currentDate <= financialYearEnd) {
      monthLabels.push(getCurrentMonthName(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthLabels;
  };

  const monthLabels = generateMonthLabels();

  // Function to generate data for each month within the financial year
  const generateMonthlyData = () => {
    const monthlyData = Array.from({ length: monthLabels.length }, () => ({
      Completed: 0,
      Pending: 0,
      Cancelled: 0,
    }));

    // Iterate through bookings and categorize them by month
    bookingsInFinancialYear.forEach((booking) => {
      const bookingDate = new Date(booking.BookingDate);
      const monthIndex = bookingDate.getMonth();
      const request = booking.status;

      if (request === "completed") {
        monthlyData[monthIndex].Completed++;
      } else if (request === "pending") {
        monthlyData[monthIndex].Pending++;
      } else if (request === "cancelled") {
        monthlyData[monthIndex].Cancelled++;
      }
    });

    return monthlyData;
  };

  const monthlyData = generateMonthlyData();

  // Create data for the chart
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Completed",
        data: monthlyData.map((month) => month.Completed),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
      {
        label: "Pending",
        data: monthlyData.map((month) => month.Pending),
        backgroundColor: "rgba(255, 205, 86, 0.6)",
        borderColor: "rgba(255, 205, 86, 1)",
        borderWidth: 2,
      },
      {
        label: "Cancelled",
        data: monthlyData.map((month) => month.Cancelled),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Bookings",
        },
      },
      x: {
        type: "category",
        title: {
          display: true,
          text: `Months of Financial Year ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="chart-container h-full lg:h-96 w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default FinancialYearChart;

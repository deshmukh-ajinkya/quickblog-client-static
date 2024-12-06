/* eslint-disable indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
'use client';
import { Box, Typography, CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'; // Import necessary elements
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { blogData } from '@/mock/blogData';
import { RootState } from '@/store/store';
import './style.css';

// Register chart elements
ChartJS.register(
  ArcElement, // for Doughnut
  CategoryScale,
  LinearScale,
  BarElement, // for Bar chart
  Title,
  Tooltip,
  Legend
);

// Generate mock data for likes by category
const generateMockLikesByCategory = (): { category: string; totalLikes: number }[] => [
  { category: 'Technology', totalLikes: 150 },
  { category: 'News', totalLikes: 80 }
];

// Function to generate bar chart data
const generateBarChartData = (blogData: any[]) => {
  return {
    labels: blogData.map((post: { title: any }) => post.title) || ['No Data'],
    datasets: [
      {
        label: 'Count',
        data: blogData.map((post: { likesCount: any }) => post.likesCount) || [0],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 0.5,
        barThickness: 50
      }
    ]
  };
};

// Function to generate doughnut chart data
const generateDoughnutChartData = (likesByCategory: any[]) => {
  return likesByCategory.length
    ? {
        labels: likesByCategory.map((category: { category: any }) => category.category),
        datasets: [
          {
            label: 'Likes by Category',
            data: likesByCategory.map((category: { totalLikes: any }) => category.totalLikes),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      }
    : {
        labels: ['No Data'],
        datasets: [
          {
            label: 'Likes by Category',
            data: [1],
            backgroundColor: ['#d3d3d3'],
            hoverBackgroundColor: ['#a9a9a9']
          }
        ]
      };
};

// Insight component
function Insight(): React.ReactElement {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    blogData: [] as typeof blogData,
    likesByCategory: [] as { category: string; totalLikes: number }[] // Updated type
  });

  const [fromDate, setFromDate] = useState<string>('01-12-2024');
  const [toDate, setToDate] = useState<string>('06-12-2024');
  const userId = useSelector((state: RootState) => state.blog.userId);

  useEffect(() => {
    // Mock data simulation
    setLoading(true);
    setTimeout(() => {
      setData({
        blogData: blogData,
        likesByCategory: generateMockLikesByCategory()
      });
      setLoading(false);
    }, 1000); // Simulate loading time
  }, [fromDate, toDate, userId]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (tickValue: string | number): string | number {
            return typeof tickValue === 'number' && tickValue % 1 === 0 ? tickValue : '';
          }
        }
      }
    }
  };

  const dounotOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  const doughnutData = generateDoughnutChartData(data.likesByCategory);
  const barData = generateBarChartData(data.blogData);

  return (
    <Box className="insight-root-container">
      <Box className="date-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            size="small"
            className="select-date"
            label="Start Date"
            variant="standard"
            onChange={(date) => setFromDate(date?.format('DD-MM-YYYY') || '')}
          />
          <DateField
            size="small"
            className="select-date"
            label="End Date"
            variant="standard"
            onChange={(date) => setToDate(date?.format('DD-MM-YYYY') || '')}
          />
        </LocalizationProvider>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box className="like-chart-container">
            <Typography color="primary" variant="h6">
              Trends
            </Typography>
            <Box className="liked-chart">
              <Doughnut data={doughnutData} options={dounotOptions} />
            </Box>
          </Box>

          <Box className="post-overview-container">
            <Typography color="primary" variant="h6">
              Post Overview
            </Typography>
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                    <TableCell align="right">Likes</TableCell>
                    <TableCell align="right">Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.blogData.length ? (
                    data.blogData.map((row) => (
                      <TableRow key={row.title}>
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="right">{row.likesCount}</TableCell>
                        <TableCell align="right">{row.createdAt}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No Data Available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box className="graph-container">
            <Typography color="primary" variant="h6">
              Most Liked Blog
            </Typography>
            <Box className="most-liked-graph">
              <Bar data={barData} options={chartOptions} />
            </Box>
            <Typography color="primary" variant="h6" className="count-title">
              Visitors
            </Typography>
            <Box className="count-graph">
              <Bar data={barData} options={chartOptions} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Insight;

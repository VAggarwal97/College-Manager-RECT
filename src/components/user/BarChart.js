import React, { useEffect, useState, useRef } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Chart from 'chart.js/auto';

const ChartPage = () => {
    const [studentCount, setStudentCount] = useState(0);
    const [facultyCount, setFacultyCount] = useState(0);
    const chartRef = useRef(null); // Create a ref for the chart instance

    useEffect(() => {
        let chartInstance = null; // Store the chart instance in a variable

        const fetchCounts = async () => {
            try {
                const studentsRef = collection(firestore, 'users');
                const querySnapshot = await getDocs(studentsRef);

                let studentCount = 0;
                let facultyCount = 0;

                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.role === 'Student') {
                        studentCount++;
                    } else if (userData.role === 'Faculty') {
                        facultyCount++;
                    }
                });

                setStudentCount(studentCount);
                setFacultyCount(facultyCount);

                // If a previous chart exists, destroy it
                if (chartInstance) {
                    chartInstance.destroy();
                }

                // Create a new chart on the canvas
                chartInstance = new Chart(chartRef.current, {
                    type: 'bar',
                    data: {
                        labels: ['Students', 'Faculty'],
                        datasets: [
                            {
                                label: 'Count',
                                data: [studentCount, facultyCount],
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(255, 99, 132, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                });
            } catch (error) {
                console.error('Error fetching student and faculty counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="Barchart">
            <h2>Student and Faculty Count Chart</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ChartPage;

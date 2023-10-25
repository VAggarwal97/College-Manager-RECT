import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CircleChart from './CircleChart';
import BarChart from './BarChart';

const CountPage = () => {
    const [studentCount, setStudentCount] = useState(0);
    const [facultyCount, setFacultyCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Query Firestore to count students
                const studentsRef = collection(firestore, 'users');
                const studentQuery = query(studentsRef, where('role', '==', 'Student'));
                const studentQuerySnapshot = await getDocs(studentQuery);
                const studentCount = studentQuerySnapshot.size;
                setStudentCount(studentCount);

                // Query Firestore to count faculty members
                const facultyRef = collection(firestore, 'users');
                const facultyQuery = query(facultyRef, where('role', '==', 'Faculty'));
                const facultyQuerySnapshot = await getDocs(facultyQuery);
                const facultyCount = facultyQuerySnapshot.size;
                setFacultyCount(facultyCount);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className='Count-Container'>
            <div className='counter'>
                <div className="dashmidheader">
                    <p>Dashboard</p>
                    <p>Home / Dashboard</p>
                </div>

                <div className="countcard">
                    <div className="studentcountdir">
                        <p className='counthead'>Student Registered</p>
                        <h3 className='studentcount'>Student Count: <span className='countnumber'>{studentCount}</span></h3>
                    </div>

                    <div className="facultycountdir">
                        <p className='counthead'>Faculty Registered</p>
                        <h3 className='facultycount'>Faculty Count: <span className='countnumber'>{facultyCount}</span></h3>
                    </div>
                </div>
            </div>
            <div className='charts'>
                <BarChart />
                <CircleChart />
            </div>
        </div>
    );
};

export default CountPage;

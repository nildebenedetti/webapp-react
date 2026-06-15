import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';
import { useState } from 'react';

function WhoWeAre(){
    return (
        <>
        <section className='hero-wwa'>
        <h1>chi siamo</h1>
        </section>
        </>
    )
}

export default WhoWeAre
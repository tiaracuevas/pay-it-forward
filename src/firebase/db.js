import { db } from './firebase';
import firebase from 'firebase/app'
import AuthUserContext from '../components/AuthUserContext';
import React from 'react';

// User API

//create user in db
export const doCreateUser = (id, displayName, email) =>
    db.ref(`users/${id}`).set({
        displayName,
        email,
    });



//create ORG in db
export const doCreateOrg = (id, displayName, email, phoneNumber, missionStatement, website) =>
    db.ref(`organizations/${id}`).set({
        displayName,
        email,
        phoneNumber,
        missionStatement,
        website
    });

export const postOpp = (id, opportunityName, date, numberOfVolunteers, timeframe, address, description, category, postedBy) =>
    db.ref(`/opportunities`).push({
        opportunityName,
        date,
        numberOfVolunteers,
        timeframe,
        address,
        description,
        category,
        postedBy
    });



//all users in db
export const onceGetUsers = () =>
    db.ref('users').once('value');

//all ORGS in db
export const onceGetOrgs = () =>
    db.ref('organizations').once('value');

export const onceGetOpps = () =>
    db.ref('opportunities').once('value');

import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password)
            .catch(error => {   
              alert(error.message);
           });
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
           await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    fname: '',
                    lname: '',
                    email: email,
                    uid: auth().currentUser.uid,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                  })
                  .catch(error => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      error,
                    );
                  });
              })
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firestore().collection('users')
            .doc(user.uid)
            .update({
              status:firestore.FieldValue.serverTimestamp()
            })

            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

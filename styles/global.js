
import { StyleSheet } from 'react-native'; 
export const globalStyles = StyleSheet.create({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  container: { 
    padding: 40, 
    borderRadius: 15, 
    background: '#191919',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, 
  },
  text:{
    color: 'blue',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '500', 
    marginBottom: 20, 
  },
  input: {
    width: '100%',
    marginBottom: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50, 
  },
  signupLink: {
    marginTop: 30,
    color: 'blue',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    fontWeight: 400,
    marginBottom: 10,
  },
});

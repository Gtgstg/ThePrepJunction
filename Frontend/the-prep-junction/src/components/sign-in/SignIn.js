import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";

// Initialize Firebase (Replace with your Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDYX5wxZI86vUL0T76WcjLN9qNHApGNRsw",
  authDomain: "theprepjunction.firebaseapp.com",
  projectId: "theprepjunction",
  storageBucket: "theprepjunction.appspot.com",
  messagingSenderId: "420551916071",
  appId: "1:420551916071:web:08d315a120b7cc82392c02",
  measurementId: "G-2PJX94LQRG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Styled components
const StyledContainer = styled(Container)({
  marginTop: '100px',
});

const Login = () => {
  const [mynumber, setnumber] = useState("");
    const [otp, setotp] = useState("");
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState("");


    const signin = () => {
      if (mynumber === "" || mynumber.length < 10) return;

      let verify = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //onSignInSubmit();
          console.log(response)
        }
      });
      signInWithPhoneNumber(mynumber, verify)
          .then((result) => {
              setfinal(result);
              alert("code sent");
              setshow(true);
          })
          .catch((err) => {
              alert(err);
              window.location.reload();
          });
  };

  // Validate OTP
  const ValidateOtp = () => {
      if (otp === null || final === null) return;
      final
          .confirm(otp)
          .then((result) => {
              // success
          })
          .catch((err) => {
              alert("Wrong code");
          });
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login with OTP
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            value={mynumber}
            onChange={(e) => setnumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
        {/* <div id="sign-in-button"></div> */}
          <Button
            id="sign-in-button"
            variant="contained"
            color="primary"
            fullWidth
            onClick={signin}
          >
            Send OTP
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="OTP"
            fullWidth
            value={otp}
            onChange={(e) => setotp(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={ValidateOtp}
          >
            Verify OTP
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Login;

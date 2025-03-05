"use client";

import React, { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import styles from "./signup.module.scss";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await axios.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      alert("Регистрация успешно выполнена! Проверьте почту для верификации.");
      router.push("/auth/login");
    } catch (err: any) {
      console.error(err);
      alert("Ошибка при регистрации. Возможно, пользователь уже существует.");
    }
  };

  return (
    <div className={styles.signupWrapper}>
      <Paper className={`${styles.signupTile} shadow-box`} elevation={6}>
        <Typography variant="h4" gutterBottom>
          Регистрация
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          mt={2}
          width="100%"
          
        >
          <TextField
            label="Имя"
            value={firstName}
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            
          />
          <TextField
            label="Фамилия"
            value={lastName}
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            size="large"
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

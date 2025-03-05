"use client";

import React, { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import styles from "./login.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setServerError("");
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setServerError(err.response.data.message || "Ошибка при входе");
      } else {
        setServerError("Ошибка при входе. Проверьте email или пароль.");
      }
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <Paper className={styles.loginCard} elevation={5}>
        <Typography variant="h3" className={styles.title}>
          Вход в систему
        </Typography>
        {serverError && (
          <Alert severity="error" className={styles.errorAlert}>
            {serverError}
          </Alert>
        )}
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          mt={2}
          width="100%"
        
        >
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
            className={styles.loginButton}
            onClick={handleLogin}
            size="large"
          >
            ВОЙТИ
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

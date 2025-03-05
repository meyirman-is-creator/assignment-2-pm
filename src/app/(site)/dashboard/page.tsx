"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Button, Typography, Box, Paper } from "@mui/material";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    // Можно добавить дополнительный запрос к /auth/me для получения роли,
    // если требуется разделять UI для администратора и пользователя.
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <div className={styles.dashboardWrapper}>
      <Paper className={`${styles.dashboardTile} shadow-box`} elevation={6}>
        <Typography variant="h4" gutterBottom>
          Добро пожаловать в личный кабинет!
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          mt={2}
          width="100%"
          sx={{
            "& > :not(style)": {
              fontSize: "15px",
              width: "100%",
              height: "40px",
            },
          }}
        >
          <Button
            variant="contained"
            onClick={() => router.push("/my-bank")}
            size="large"
          >
            Мой банк
          </Button>
          <Button
            variant="contained"
            onClick={() => router.push("/deposit")}
            size="large"
          >
            Перевод между своими счетами
          </Button>
          <Button
            variant="contained"
            onClick={() => router.push("/transfer")}
            size="large"
          >
            Перевод на другие счета
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
            size="large"
          >
            Выйти
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

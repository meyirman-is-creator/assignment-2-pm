"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import styles from "./adminDetail.module.scss";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default function AdminCustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`/admin/customerDetail/${params.id}`);
      setCustomer(res.data);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchCustomer();
    }
  }, [params.id]);

  const handleSave = async () => {
    try {
      if (!customer) return;
      const res = await axios.put("/admin/editCustomer", {
        id: customer.id,
        firstName,
        lastName,
      });
      alert(
        `Данные пользователя обновлены: ${res.data.firstName} ${res.data.lastName}`
      );
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Ошибка при редактировании пользователя");
    }
  };

  if (!customer) {
    return <div className={styles.loadingText}>Загрузка...</div>;
  }

  return (
    <div className={styles.adminDetailWrapper}>
      <Paper className={`${styles.adminDetailTile} shadow-box`} elevation={6}>
        <Typography variant="h4" gutterBottom>
          Информация о пользователе (ID: {customer.id})
        </Typography>
        <Box display="flex" flexDirection="column" gap={3} mt={2} width="100%">
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
            value={customer.email}
            variant="outlined"
            disabled
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            size="large"
          >
            Сохранить
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

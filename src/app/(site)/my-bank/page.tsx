"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Box, Button, Typography, Paper } from "@mui/material";
import styles from "./mybank.module.scss";

interface Account {
  id: number;
  type: string;
  accountNumber: string;
  balance: number;
}

export default function MyBankPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get("/accounts/my");
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleCreateDeposit = async () => {
    try {
      const res = await axios.post("/accounts/create-savings", {});
      alert(`Создан депозит: ${res.data.accountNumber}`);
      fetchAccounts();
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании депозита");
    }
  };

  const handleDownloadStatement = async (accountId: number) => {
    try {
      const res = await axios.get(`/reports/account-statement/${accountId}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `statement_account_${accountId}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Ошибка при скачивании выписки");
    }
  };

  return (
    <div className={styles.myBankWrapper}>
      <Paper className={`${styles.myBankTile} shadow-box`} elevation={6}>
        <Typography variant="h4" gutterBottom>
          Мои счета
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateDeposit}
          size="large"
        >
          Создать новый депозит
        </Button>
        <Box mt={3} width="100%">
          {accounts.map((acc) => (
            <Box key={acc.id} className={styles.accountItem}>
              <Typography variant="subtitle1">
                Тип счета: <strong>{acc.type}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Номер счета: <strong>{acc.accountNumber}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Баланс: <strong>{acc.balance} KZT</strong>
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleDownloadStatement(acc.id)}
                style={{ marginTop: "1rem" }}
              >
                Скачать выписку
              </Button>
            </Box>
          ))}
        </Box>
      </Paper>
    </div>
  );
}

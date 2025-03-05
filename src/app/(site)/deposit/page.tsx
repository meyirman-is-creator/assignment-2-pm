"use client";

import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import styles from "./deposit.module.scss";

interface Account {
  accountNumber: string;
  type: string;
  balance: number;
}

export default function DepositPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    axios.get("/accounts/my").then((res) => setAccounts(res.data));
  }, []);

  const handleTransfer = async () => {
    // Преобразуем строку в число
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Некорректная сумма");
      return;
    }
    try {
      const res = await axios.post("/transactions/deposit", {
        sender,
        amount: numericAmount,
        recipient,
      });
      alert(
        `Перевод выполнен! Тип: ${res.data.type}, Сумма: ${res.data.amount}`
      );
    } catch (err) {
      console.error(err);
      alert("Ошибка при переводе");
    }
  };

  const isFormValid =
    Boolean(sender) &&
    Boolean(recipient) &&
    !isNaN(parseFloat(amount)) &&
    parseFloat(amount) > 0;

  return (
    <div className={styles.depositWrapper}>
      <Paper className={`${styles.depositTile} shadow-box`} elevation={6}>
        <Typography variant="h4" gutterBottom>
          Перевод между своими счетами
        </Typography>
        <Box display="flex" flexDirection="column" gap={3} mt={2} width="100%">
          <TextField
            select
            SelectProps={{ native: true }}
            label="С какой счёт?"
            value={sender}
            onChange={(e) => {
              setSender(e.target.value);
              if (e.target.value === recipient) {
                setRecipient("");
              }
            }}
            fullWidth
          >
            <option value="" disabled />
            {accounts.map((acc) => (
              <option key={acc.accountNumber} value={acc.accountNumber}>
                {acc.type} / {acc.accountNumber} / Баланс: {acc.balance}
              </option>
            ))}
          </TextField>

          <TextField
            select
            SelectProps={{ native: true }}
            label="На какой счёт?"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            fullWidth
          >
            <option value="" disabled />
            {accounts
              .filter((acc) => acc.accountNumber !== sender)
              .map((acc) => (
                <option key={acc.accountNumber} value={acc.accountNumber}>
                  {acc.type} / {acc.accountNumber} / Баланс: {acc.balance}
                </option>
              ))}
          </TextField>

          <TextField
            label="Сумма"
            type="text"
            value={amount}
            onChange={(e) => {
              // Убираем все нецифровые символы
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setAmount(onlyDigits);
            }}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleTransfer}
            size="large"
            disabled={!isFormValid}
          >
            Перевести
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

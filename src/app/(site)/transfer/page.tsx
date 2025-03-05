"use client";

import React, { useState } from "react";
import axios from "@/lib/axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import styles from "./transfer.module.scss";

export default function TransferPage() {
  const [recipientAccountNumber, setRecipientAccountNumber] =
    useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleTransfer = async () => {
    const numericAmount = parseFloat(amount);
    if (!recipientAccountNumber) {
      alert("Некорректный номер счёта получателя");
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Некорректная сумма");
      return;
    }

    try {
      const res = await axios.post("/transactions/transfer", {
        amount: numericAmount,
        recipientAccountNumber,
      });
      alert(
        `Перевод успешно отправлен! Тип: ${res.data.type}, Сумма: ${res.data.amount}`
      );
    } catch (err) {
      console.error(err);
      alert("Ошибка при переводе на другой счёт");
    }
  };

  const isFormValid =
    Boolean(recipientAccountNumber) &&
    !isNaN(parseFloat(amount)) &&
    parseFloat(amount) > 0;

  return (
    <div className={styles.transferWrapper}>
      <Paper className={`${styles.transferTile} shadow-box`} elevation={6}>
        <Typography variant="h4" gutterBottom>
          Перевод на другой счёт
        </Typography>
        <Box display="flex" flexDirection="column" gap={3} mt={2} width="100%">
          <TextField
            label="Номер счёта получателя"
            type="text"
            value={recipientAccountNumber}
            variant="outlined"
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setRecipientAccountNumber(onlyDigits);
            }}
            fullWidth
          />

          <TextField
            label="Сумма"
            type="text"
            value={amount}
            variant="outlined"
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setAmount(onlyDigits);
            }}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!isFormValid}
            onClick={handleTransfer}
          >
            Отправить
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

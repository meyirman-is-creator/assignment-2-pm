"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./admin.module.scss";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default function AdminPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const router = useRouter();

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/admin/allCustomers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className={styles.adminPageWrapper}>
      <Paper className={`${styles.adminPageTile} shadow-box`} elevation={6}>
        <Typography variant="h4" gutterBottom>
          Список всех пользователей
        </Typography>
        <div className={styles.tableContainer}>
          <Table className={styles.muiTable}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.firstName}</TableCell>
                  <TableCell>{customer.lastName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => router.push(`/admin/${customer.id}`)}
                    >
                      Подробнее
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}

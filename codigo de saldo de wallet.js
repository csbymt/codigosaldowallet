public float getBalance(PublicKey addr) {
  float balance = 0;
  for (Block b : chain) {
    // Añadir saldo de transacciones
    for (Transaction t : b.getTransactions()) {
      if (addr.equals(t.getFrom())) {
        // En caso de ser el pagador
        balance -= t.getAmount();
      } else if (addr.equals(t.getTo())) {
        // En caso de ser el receptor
        balance += t.getAmount();
      }
    }
    // Añadir saldo de comisiones
    if (addr.equals(b.getMiner())) {
      balance += b.getFee();
    }
  }
  return balance;
}
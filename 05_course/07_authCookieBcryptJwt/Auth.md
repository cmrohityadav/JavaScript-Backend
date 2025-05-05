# 🔐 Authentication vs Authorization (Hinglish Style)

## 🆔 Authentication – "Tu kaun hai?"
- Identity verify karna (jaise username/password, OTP, fingerprint).
- System check karta hai ki user legit hai ya nahi.

### 🔍 Real-World Example:
Mall ke gate pe ID dikhana. Guard confirm karta hai ki tum wahi ho – **Authentication**.

### ✅ Methods:
- Username + Password
- OTP via SMS/Email
- Biometric (Fingerprint, Face ID)
- OAuth (Login with Google)

---

## 🛂 Authorization – "Tujhe kya access milna chahiye?"
- Ek baar user authenticate ho gaya, fir system decide karta hai kya access milega.
- Permissions aur roles ke basis pe kaam karta hai.

### 🔍 Real-World Example:
Mall ke andar VIP lounge sirf VIP logon ke liye – **Authorization**.

### ✅ Methods:
- Role-Based Access Control (RBAC)
- Access Control Lists (ACLs)
- Permissions in DB or APIs

---

## 📝 Table Comparison

| Feature              | Authentication                  | Authorization                          |
|----------------------|----------------------------------|------------------------------------------|
| **Kya hai?**         | Identity verify (Tu kaun hai?)  | Access rights (Tujhe kya allowed hai?)  |
| **Process Kab?**     | Pehle step                      | Dusre step                              |
| **Example**          | Login karna                     | Admin panel access                      |
| **Data check**       | Credentials                     | Roles/Permissions                       |
| **Answer deta hai?** | "Kya tu valid user hai?"        | "Tujhe kya karne ki permission hai?"    |

---

## 🏢 Bonus Example: Office Entry

1. **Authentication** – ID scan, guard confirm karta hai.
2. **Authorization** – Developer role = Dev floor access, finance floor = ❌

---

> 🔁 **Note:** Authentication ke bina Authorization possible nahi hota.

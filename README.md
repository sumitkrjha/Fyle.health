# 🏋️‍♂️ Fyle.health – Angular 19 SPA

🚀 A **Single Page Application (SPA)** built using **Angular 19**, **Tailwind CSS**, and **PrimeNG Chart**, allowing users to log workouts, filter data, and visualize workout duration.

  ## Hosted at : [fylehealth-sumit.netlify.app](https://fylehealth-sumit.netlify.app)
---

## 🔥 Features

✅ **User Input Form** – Enter name, select a workout type, and log workout duration (in minutes).  
✅ **Dynamic Table View** – Displays all users with:

- **Search** by name
- **Filter** by workout type
- **Dynamic Pagination** – Adjust rows per page via a select option  
  ✅ **Interactive Charts** – Visualize workout duration per user with **PrimeNG Chart**.  
  ✅ **Reactive Data Handling** – Ensures **seamless data consistency** using **BehaviorSubjects (RxJS)**.  
  ✅ **Fully Responsive** – Works across **desktop, tablet, and mobile screens**.  
  ✅ **100% Test Coverage** – Thoroughly tested with **Karma**, ensuring high reliability.

---

## 📸 Screenshots

# App View
  ## Home/Form Input
  ![Screenshot (25)](https://github.com/user-attachments/assets/d048ffb6-3196-4d5d-9836-ca304589a30b)

  ## Table 
  ![Screenshot (26)](https://github.com/user-attachments/assets/91087e87-1eb8-4404-ad78-e31bede26473)

  ## Chart
  ![Screenshot (27)](https://github.com/user-attachments/assets/255e207e-a281-4545-a736-cdab03c3229c)


# Code Coverage Report
 ![coverage report](https://github.com/user-attachments/assets/327f9c9e-1b8e-4fc5-b3d8-e1231ce2f505)



## 🛠️ Tech Stack

| Technology                  | Purpose                         |
| --------------------------- | ------------------------------- |
| **Angular 19**              | Frontend framework              |
| **Tailwind CSS**            | Styling                         |
| **PrimeNG Chart**           | Data visualization              |
| **RxJS (BehaviorSubjects)** | State management & reactivity   |
| **Karma & Jasmine**         | Unit testing with 100% coverage |

---

## 📂 Folder Structure

```
fyle.health/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── chart/
│   │   │   ├── input-form/
│   │   │   ├── table/
│   │   ├── services/
│   │   │   ├── userdata.service.ts
│   │   ├── interface/
│   │   │   ├── display-user.ts
│   │   │   ├── user-type.ts
│   │   ├── app.component.ts
│── angular.json
│── package.json
│── README.md
```

---

## 🎯 How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sumitkrjha/Fyle.health.git
cd Fyle.health
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Application

```bash
ng serve
```

Then, open **http://localhost:4200/** in your browser.

### 4️⃣ Run Tests

```bash
ng test --code-coverage
```

Check the coverage report in `coverage/index.html`.

---

## 🏆 Author

👤 **Sumit Kumar Jha**  
📧 [jhasumit4742@gmail.com](mailto:jhasumit4742@gmail.com)  
🔗 [Portfolio](https://sumitkrjha.onrender.com) | [GitHub](https://github.com/your-github-username) | [LinkedIn](https://www.linkedin.com/in/sumitkrjha/)

---

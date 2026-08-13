# 📝 Todo List Projemiz (`todo-app`)

> Full-stack (.NET Core API + Vanilla JS) minimalist ve hızlı todo uygulaması.

---

## 🛠️ Kullanılan Teknolojiler

### ⚙️ Backend (API & Veritabanı)
* **Dil & Framework:** C# / .NET Core (ASP.NET Core Web API)
* **Veritabanı:** SQLite (Entity Framework Core - Dosya tabanlı yerel SQL)
  
### 🎨 Frontend
* **Core:** HTML5 & CSS3
* **Script:** Vanilla JavaScript *(Saf JS, herhangi bir framework/kütüphane kullanılmamıştır)*

---

## 📂 Proje Yapısı

```text
todo-app/
├── backend/
│   ├── TodoApi/            # C# API Projemiz
│   │   ├── Controllers/
│   │   ├── Models/
│   │   └── todo.db         # SQLite Veritabanı Dosyamız
│   └── ...
├── frontend/               # Saf HTML/CSS/JS Arayüz
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .gitignore
└── README.md
```

## 🤓 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayabilirsiniz:

### 🔧 Backend'i Çalıştırma (C# & SQLite)

1. Terminalde `backend/TodoApi` klasörüne gidin:
 ```bash
 cd backend/TodoApi
   ```

2. Uygulamayı başlatın:
 ```bash
  dotnet run
   ```

### 🌐 Frontend'i Çalıştırma

**1. `frontend` klasörüne girin.**

**2. `index.html` dosyasını VS Code Live Server ile başlatın.**
> 📌 *Arayüz `http://localhost:5500` adresinde açılacaktır.*

## 🔌 API Kontratı (Backend - Frontend İletişimi)
Frontend ve Backend arasındaki veri alışverişi aşağıdaki JSON veri yapısı ve endpoint kurallarına göre yapılacaktır.

### 📦 Todo Veri Modeli

```json
{
  "id": 1,
  "title": "Ekmek al",
  "description": "Tam buğday olsun",
  "isCompleted": false
}
```  
 

### 🛣️ Endpoints

| Metod | URL | Açıklama | Gönderilecek Veri (Body) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/todos` | Tüm todoları getirir | *-* |
| **POST** | `/api/todos` | Yeni todo ekler | `{ "title": "string", "description": "string" }` |
| **PUT** | `/api/todos/{id}` | Todo durumunu günceller | `{ "isCompleted": true }` |
| **DELETE** | `/api/todos/{id}` | Todo'yu siler | *-* |

---

## 👥 İş Bölümü

* ⚙️ **Backend Geliştirici:** C# ile API mimarisinin kurulması, CRUD işlemleri (Ekleme/Çekme/Silme/Güncelleme) ve hata yönetimi (Error Handling).
* 🎨 **Frontend Geliştirici:** HTML/CSS ile UI tasarımı, JavaScript Fetch API entegrasyonu ve dinamik kullanıcı etkileşimleri.

---

## 📌 Geliştirici Notları (Önemli!)

> [!IMPORTANT]
> Proje geliştirme sürecinde çakışmaları (conflict) ve hataları önlemek için aşağıdaki kurallara dikkat edelim:

* 🛡️ **CORS Politikası:** Frontend (Live Server - 5500 portu) ile Backend (5000 portu) farklı portlarda çalıştığı için, C# `Program.cs` dosyasında mutlaka CORS ayarları yapılmalıdır. Tarayıcı hatası (CORS Error) almamak için bu şarttır.
* 🔄 **Git Kuralları:** Kod yazmaya başlamadan önce **daima** `git pull` yapın. Kendi sorumluluk alanınız dışındaki klasörlerde izinsiz değişiklik yapmayın.
* 📝 **Commit Mesajları:** Anlaşılır yazın *(Örn: `feat: POST /api/todos endpoint'i eklendi`)*.

---

## 📤 Değişiklikleri GitHub'a Gönderme

Dosyayı kaydettikten sonra (`Ctrl + S`), terminalde ana klasörde (`todo-app`) olduğunuzdan emin olun ve şu komutları sırasıyla çalıştırın:

```cmd
git add .
git commit -m "docs: README güncellendi (Frontend saf HTML/CSS/JS olarak belirlendi)"
git push origin main

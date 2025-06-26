# ETHPH Dev Portal: Ethereum Tutorial Platform for Local Communities

Welcome to the **ETHPH Dev Portal** – an open-source platform designed to help Filipino developers learn **Ethereum smart contract development**, publish learnings and projects, and contribute to their own localized knowledgebase.

If you're an Ethereum Community, you're encouraged to **fork and customize** it for your own!

---

## 🌟 What You'll Find

- ✅ Tutorials for starting to advanced developers
- 🧪 Community projects showcase
- 🧠 Localized resources & support  
- 🧩 Open Source and collaborative portal for developer knowledge sharing
---


## 🛠 Fork and Deploy Your Own Version

Want to run this platform for your own city or community? Follow these steps:

### 1. **Fork the Repository**

- Visit: [github.com/0xdanki/ethereum-community-developers](https://github.com/0xdanki/ethereum-community-developers)
- Click "Fork"
- Rename the repository (e.g., `ethph-ilocos-devs`)
  
### 2. Clone & Customize Locally

```bash
git clone git@github.com:yourusername/your-repo-name.git
cd your-repo-name
npm install
npm run dev
```

🛠 **Key files to customize**:

- `src/pages/Home.tsx` – update hero section and community name  
- `src/components/layout/Navbar.tsx` – branding and nav links  
- `src/components/layout/Footer.tsx` – community links  
- `index.html` – page title & meta tags  
- `public/ethereum-icon.svg` – replace with your local logo

---

### 3. Deploy to Netlify (Free Hosting)

1. Push changes to GitHub  
2. Go to [netlify.com](https://netlify.com) and log in  
3. Click **"New site from Git"**  
4. Connect your GitHub repo  
5. Set:
   - **Build command**: `npm run build`  
   - **Publish directory**: `dist`  
6. Click **"Deploy Site"**

---

### 4. (Optional) Use a Custom Domain

1. Buy a domain (e.g., via Namecheap, GoDaddy)  
2. Go to **Site Settings > Domain Management** on Netlify  
3. Add your custom domain  
4. Update your domain’s DNS settings  
5. Enable HTTPS (Netlify provides free SSL)

---

### 5. Continuous Deployment

- Every push to `main` auto-deploys  
- Optional: add a `netlify.toml` file for build settings  
- Use environment variables as needed

---

## 💡 Customization Ideas

- 🏙 Update hero text with your city/community name  
- 📅 Add local meetup schedules and events  
- 📚 Add language-localized tutorials  
- 🤝 Let members contribute to the knowledgebase  
- 🎯 Add mini-projects, exercises, or bounty boards

---

## 🙋 Need Help?

- Join our [ETHPH Facebook Community](https://facebook.com/ethphilippines)  
- Create an [issue on GitHub](https://github.com/0xdanki/ethereum-community-developers/issues)  
- Tag `@0xdanki` if you need setup assistance

---

## 👥 Credits

Built with ❤️ by [@0xdanki](https://github.com/0xdanki) and the ETHPH DevRel team

---

## 📜 License

[MIT](LICENSE) © 2025 ETHPH & Contributors

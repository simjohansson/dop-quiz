# 🍋 Minnesanteckning: Drift & Kodändringar (citron.levinsson.dev)

Det här projektet rullar dygnet runt i bakgrunden via **macOS LaunchAgents**, oberoende av om Antigravity eller terminalfönster är öppna.

---

## ⚡ Den gyllene regeln vid kodändring

Om du har gjort ändringar i koden och vill att de ska slå igenom på **https://citron.levinsson.dev**:

Kör **ett enda kommando** i projektmappen:
```bash
npm run reload
```
Detta bygger om frontend (`npm run build`) och startar omedelbart om backend-tjänsten (`npm run restart`). Ladda därefter om sidan i webbläsaren!

---

## 🔍 Vad krävs i detalj?

### 1. Ändringar i Frontend (`src/`, CSS, HTML, grafik, frågor på klientsidan)
Servern serverar de kompilerade filerna från `dist/`.
* Kör:
  ```bash
  npm run build
  ```
* Gör en **hård uppdatering** i webbläsaren på mobil/dator (`Cmd + Shift + R`).
*(Backend-servern behöver inte ens startas om vid rena frontend-ändringar).*

---

### 2. Ändringar i Backend (`server/server.js`, socket-logik, API-routes)
Eftersom Node laddar in koden i minnet vid start måste serverprocessen startas om:
* Kör:
  ```bash
  npm run restart
  ```
*(Detta kör `launchctl kickstart -k ...` och startar om tjänsten på en bråkdel av en sekund utan driftstopp).*

---

### 3. Vid osäkerhet (eller ändringar i både frontend och backend)
* Kör:
  ```bash
  npm run reload
  ```

---

## 🛠️ Andra bra kommandon

| Kommando | Vad det gör |
| :--- | :--- |
| `npm run restart` | Startar om backend-tjänsten |
| `npm run reload` | Bygger om frontend och startar om backend |
| `npm run logs` | Följer backend-loggar i realtid (`server.log`) |
| `npm run logs:tunnel` | Följer tunnel-loggar i realtid (`tunnel.log`) |
| `launchctl list \| grep citron` | Visar process-ID och status för server & tunnel |

---

## 📁 Var ligger filerna på Macen?

* **LaunchAgent för Server:** `~/Library/LaunchAgents/se.levinsson.citron.server.plist`
* **LaunchAgent för Tunnel:** `~/Library/LaunchAgents/se.levinsson.citron.tunnel.plist`
* **Loggfiler:** `~/Library/Logs/dop-quiz/server.log` och `tunnel.log`

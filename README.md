# 🍋 Citron-Quizet (0–100 Trivia App)

Ett modernt, zestigt och mobil-optimerat **0–100 frågesportspel** i citrontema, designat för dop, kalas och fest!

---

## 🌟 Funktioner

- 🍋 **Citrontema & Levande SVG-Animation**: En söt, levande citronfigur som mognar, ändrar ansiktsuttryck (från sur lime vid 0 till gyllene supercitron med krona vid 100), sprutar saftdroppar och pulserar i takt med att slidern rör sig.
- 📱 **Mobile-first Wizard**:
  - En fråga per sida med responsiv touch-layout.
  - Horisontell snabbvalsrad (1–9) för att hoppa fram och tillbaka mellan frågorna.
  - Touch-slider med finjusteringsknappar (`-10`, `-1`, `+1`, `+10`) samt möjlighet att klicka direkt på siffran och knappa in exakt tal.
- ⏳ **Vänteläge**:
  - När spelaren granskat och lämnat in sina svar visas en animerad citronpress som pressar lemonad medan man väntar på spelledaren.
  - Visar en sammanfattning av spelarens 9 gissningar så man har något kul att prata om vid bordet.
- 👑 **Spelledarpanel (Admin)**:
  - Live-översikt över anslutna spelare och hur många som är klara.
  - QR-kod som gäster kan scanna med mobilkameran för att öppna spelet direkt.
  - **"Lägg till 5 testspelare"**-knapp för att direkt prova spelet och grafiken solo!
- 📊 **Grafisk Statistik (0–100 Spektrum)**:
  - Rättning sker en fråga i taget med dramatisk avslöjningsknapp och konfetti.
  - Alla spelares gissningar ritas ut längs en 0–100-tallinje med namnskyltar, färgkoder och markering för rätt svar.
  - Visar vem som var närmast ("Bullseye"), gruppens medelvärde och chansaren.
- 🏆 **Topplista & Prispall**:
  - Prispall (1:a, 2:a, 3:e plats) för "Den Gyllene Citronen".
  - Poäng beräknas som avvikelse från facit (0 poäng är perfekt alla rätt – lägst vinner!).
  - Roliga utmärkelser: *Prickskytten*, *Överoptimisten*, *Försiktige generalen* och *Största chansningen*.

---

## 🚀 Starta appen

Kör i terminalen:

```bash
# Installera paket (om inte redan gjort)
npm install

# Starta både server och frontend i utvecklingsläge
npm run dev
```

Appen öppnas på:
- **Spelare / Mobil**: `http://localhost:5173` (eller din dators lokala nätverks-IP, t.ex. `http://192.168.x.x:5173`)
- **Server**: Körs på port `3001`

### 🌐 Dela med gästerna via Cloudflare Quick Tunnel

För att gästerna ska kunna gå med från sina egna mobiler över internet:

```bash
# Starta Cloudflare Quick Tunnel mot den lokala servern
npm run tunnel
# eller direkt:
cloudflared tunnel --url http://localhost:3001
```

Detta ger en publik `https://*.trycloudflare.com`-länk. Öppna länken på din dator/TV eller låt gästerna scanna QR-koden som automatiskt pekar på tunnel-adressen!

---

## 📝 Frågorna i Quizet

1. **Nils i almanackan 📅**: Vilket datum i oktober infaller namnsdagen för Nils i den svenska almanackan? (*Svar: 8*)
2. **Nils i litteraturen 📖**: Hur gammal anges pojken Nils vara i det allra första kapitlet av Selma Lagerlöfs *Nils Holgerssons underbara resa genom Sverige*? (*Svar: 14*)
3. **Nils på isen ⛸️**: När Nils van der Poel tog OS-guld på 10 000 meter skridsko vid OS 2022 – hur många fulla varv åkte han runt 400-metersbanan? (*Svar: 25*)
4. **Bilmärket med citron-arv 🚗**: Citroën grundades av André Citroën vars farfar var frukthandlare. Vilket år på 1900-talet grundades företaget? (*Svar: 19*, år 1919)
5. **Pysslingen Nils 🧝‍♂️**: I sagan om Nils Karlsson Pyssling – hur många tummar hög beskriver Nils att han är? (*Svar: 1*)
6. **Flottans långa betänketid 🍋⚓**: År 1747 bevisade James Lind att citrus botar skörbjugg, men Royal Navy gjorde inte citronsaft obligatorisk förrän 1795. Hur många år dröjde det? (*Svar: 48*)
7. **Världens tyngsta citron ⚖️**: Hur många kilo vägde världens tyngsta citron i Guinness Rekordbok (avrundat till närmaste heltal)? (*Svar: 5*)
8. **Arne Weises jular 🕯️📺**: Under hur många julaftnar tände Arne Weise ljuset som julvärd i SVT? (*Svar: 24*)
9. **Den allra första Majblomman 🪙**: Nils föddes ju i maj, och på tal om maj: hur många öre kostade den allra första Majblomman per styck år 1907? (*Svar: 10*)

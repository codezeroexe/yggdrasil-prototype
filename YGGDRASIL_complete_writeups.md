# YGGDRASIL CTF Writeups Collection

**Location:** `/Users/hari/projects/YGGDRASIL`  
**Total Files:** 7 source archives → 15+ individual writeup documents  
**Competitions:** NCSCS 2023, NZCSC 2020-2025 (Round 0, 1, 2)  
**Categories:** Web, Crypto, Steganography, Forensics, Reverse Engineering, Pwn, Network Analysis, Misc

---

## Table of Contents

1. [NCSCS 2023 Writeup](#ncscs-2023-writeup)
2. [NZCSC 2020 Round 0](#nzcsc-2020-round-0)
3. [NZCSC 2022 Round 0](#nzcsc-2022-round-0)
4. [NZCSC 2023 Round 0](#nzcsc-2023-round-0)
5. [NZCSC 2024 Round 0](#nzcsc-2024-round-0)
6. [NZCSC 2024 Round 2](#nzcsc-2024-round-2)
7. [NZCSC 2025 Writeups](#nzcsc-2025-writeups)
8. [NZCSC Round 1 Writeup](#nzcsc-round-1-writeup)
9. [NCSCS 2023 - Conspicuous & Deception](#ncscs-2023---conspicuous--deception)

---

## NCSCS 2023 Writeup

*Source: `NCSCS2023_writeup.rar` → extracted `NZCSC_Writeup2023.pdf`*

### Challenge 1: View Source (Very Easy, Web)
**Flag:** `flag{zdkLMnFvwgNBRKb}`
- Press Ctrl+U or right-click → View Source

### Challenge 2: Magic Byte (Very Easy, Forensics)
**Flag:** `flag{kbntrpcbdjsiqkm}`
- Open file in hex editor
- Replace first 8 bytes with PNG signature: `89 50 4E 47 0D 0A 1A 0A`
- Save and open image

### Challenge 3: Cookies (Easy, Web)
**Flag:** `flag{iDNTCfrNZaEavEx}`
- Open browser DevTools → Application → Cookies
- Login using credentials found in cookies

### Challenge 4: Mexican Army Cipher (Medium, Crypto)
**Flag:** `FLAG{DUWKYBGKZUJBU}`
- Decode from Base64
- Use Mexican Army Cipher Wheel (dcode.fr)
- Set wheel positions using `(12,47,71,90)`

### Challenge 5: Steganography (Easy, Stego)
**Flag:** `flag{BsuDBpNhJJcPixb}`
- Exiftool on image → hidden zip file
- Extract zip (password from Artist tag)
- Open video in Audacity → spectrogram reveals flag

### Challenge 6: Emoji Cryptanalysis (Medium, Crypto)
**Flag:** `flag{eeevlqOJCeGEEcK}`
- Get Unicode of each emoji using `ord()` in Python
- Pattern: difference of 15 between 'a' and 'f' (step of 3)
- Map emojis to characters

### Challenge 7: Buffer Overflow (Medium, Binary)
**Flag:** `flag{ghtbbsudneyaexfa}`
- ELF 64-bit LSB PIE executable
- Create pattern with `pattern_create.rb -l 260`
- Overflow at 260 bytes

### Challenge 8: Pikalang (Easy, Misc)
**Flag:** `flag{adjoptgytfnnorhq}`
- Recognize Pokémon/Pikachu language
- Use Pikalang interpreter on dcode.fr

### Challenge 9: Artistic Intelligence - Hash Length Extension (Hard, Crypto)
**Flag:** (in writeup)
- Webpage generates MAC for `epoch` parameter
- MAC doesn't change between epoch 20 and 30 → HLE vulnerability
- Key length: 18 bytes (from error message)
- Use `hashpump` to extend MAC from epoch 20 to epoch 30
- Replace `\x` with `%` for URL encoding

### Challenge 10: Unwell Robot - SQL Injection (Easy, Web)
**Flag:** (in writeup)
- Input: `' OR 1=1 --` in both username and password fields

### Challenge 11: AI Take Over - Steganography (Easy, Stego)
**Flag:** (in writeup)
- Check `robots.txt` → `/images/rougerobots.png`
- Use `zsteg -a rougerobots.png >> output.txt`
- `grep "flag" output.txt`

### Challenge 12: Pre-Trained Retriver (Hard, Rev/Crypto)
**Flag:** (in writeup)
- Binary: `PreTrainedRetriver.out`
- Ghidra analysis: AND operations should be XOR
- Patch instruction: change `AND` to `XOR` in assembly
- Export patched binary → run → frequency analysis on output

### Challenge 13: Capturing a Robofish (Medium, Forensics)
**Flag:** (in writeup)
- Extract RAR → PCAP file
- Wireshark: filter `smb2`
- Find base64 string in packet: `V20xNGFGb3pkRk5rVmxKdVVqQktjbVZYTVVaa01FcHlXVmRXVFZOSGREaz0=`
- Decode base64 repeatedly until flag appears

### Challenge 16: GitHub Forensics (Hard, Forensics)
**Flag:** `flag{dzWyVvFSqZgafzJ}`
- `git log` → timestamps repeat every 50 commits
- Format: year(last 2 digits) × hour + minutes = ASCII character
- Extract 50 chars → password for protected zip

---

## NZCSC 2020 Round 0

*Source: `NZCSC20_R0.pdf`*

### R0 Challenge 1: Caesar Cipher (Crypto)
**Flag:** `flag:osnkxkFC6A85`
- Caesar cipher with +14 shift → `osnkxk`
- Negative decimal → hex (signed 2's complement) → `FC6A85`
- Concatenate: `osnkxkFC6A85`

### R0 Challenge 2: Steganography (Stego)
**Flag:** `flag:ee1e88cc549f`
- ExifTool on GIF → comment hints at `imgjpeg`
- Unzip GIF → `img.jpeg`
- ExifTool on JPEG → flag in Image History (reversed)

### R0 Challenge 3: JSF*ck (Reverse Engineering)
**Flag:** `flag:d382557fdab1`
- File encoded with only 6 chars: `( ) ! + [ ]`
- JSF*ck decoder → alert with flag

### R0 Challenge 4: Network Traffic Analysis
**Flag:** `flag:7245e1654e7`
- Wireshark analysis

### R0 Challenge 5: Forensics - Corrupted XCF
**Flag:** `flag:zwb2qdtzq314`
- Hex editor: fix XCF header (`67 69 6d 70 20 78 63 66 20`)
- Open in GIMP

### R0 Challenge 6: Audio Steganography
**Flag:** `flag:a37666fc86de`
- Sonic Visualiser on WAV → phrase "toor"
- `steghide extract -sf FINAL.wav` with password "toor"

### R0 Challenge 7: SQL Injection
**Flag:** `flag:d89c5f24ace0`
- `' OR '1'='1` in search box
- Table: `tsebehtsiworc`
- Payload: `' UNION SELECT * FROM tsebehtsiworc WHERE '1'='1`

### R0 Challenge 8: Affine Cipher
**Flag:** `flag:tbsomzgwoxyt`
- Strings on image → `aufz:menrtgzjrihm`
- File name hints at Affine cipher: E(x) = 25x + 5 mod 26
- Decode with dcode.fr affine cipher tool

---

## NZCSC 2022 Round 0

*Source: `NZCSC22_R0_writeup_v_1.pdf`*

### Challenge 6: Magical Art (Piet Esolang, Medium)
**Flag:** `RUNE{h51rcf6o8ynu7zp9}`
- Image from landing page
- Piet decompiler (npiet.com) → outputs flag

### Challenge 14: Strings and XOR (Easy, Rev)
**Flag:** `Rune{A411D3120AEDE11Q}`
- `strings getRune.out` → three strings
- First two (11 chars each) concatenated, XOR with third (22 chars)

### Challenge 16: Holy Trinity (Hard, BrainFuck + GeoJSON)
**Flag:** `RUNE{ITIUTEVUYLXAUTLF}`
- `file` command → ASCII text (BrainFuck)
- BrainFuck interpreter → GeoJSON output
- QGIS: import GeoJSON
- CRS was EPSG:4326 → change to EPSG:2193 (NZGD 2000)
- Visualize → flag appears on map

---

## NZCSC 2023 Round 0

*Source: `NZCSC_Writeup2023.pdf` (also in NCSCS2023 RAR)*

See [NCSCS 2023 Writeup](#ncscs-2023-writeup) above — same content.

---

## NZCSC 2024 Round 0

*Source: `NZCSC24_R0_writeup.pdf`*

### Challenge 1: Robots (Very Easy, Web)
**Flag:** `NZCSC{HhjPKO7ZwAv7qCzQz7p9}`
- Check `robots.txt` → disallowed `/cm9ib3RzRGlzYWxsb3dlZEdH.html`
- Visit page → flag

### Challenge 2: RCVS Exploit (Very Easy, Web)
**Flag:** `NZCSC{i_am_a_rcvs_haxor}`
- View page source → flag in HTML comment

### Challenge 3: Traversal Troubles (Very Easy, Web)
**Flag:** `NZCSC{A_TRULY_TR34CH3R0US_TR4V3RS4L}`
- `?file=instructions.txt` → path traversal with `../../../etc/passwd`
- Read `/flag.txt`

### Challenge 4: Hidden Flag (Easy, Stego)
**Flag:** `NZCSC{HMRmHI2JjIs8ZCP241sK}`
- `ctf.txt` has zero-width Unicode chars: `e281a0`, `e2808c`, `e2808b`
- Binary encoding (separator = `e281a0`)
- Python script to decode binary → ASCII

### Challenge 5: Interjection (Medium, Forensics/Network)
**Flag:** `NZCSC{1M4G1N3_B31NG_INJ3CT4BL3_1N_2024}`
- PCAP: blind SQLi timing attack
- Python/pyshark: filter `http.time > 0.3`
- Extract chars from payloads where response > 0.3s
- Regex for flag

### Challenge 6: Behind the Scenes (Medium, Rev)
**Flag:** `NZCSC{c0ngr4ts_y0u_winAPI}`
- .NET assembly (DotPeek)
- Defender flags as Meterpreter (shellcode)
- Procmon: process creates PowerShell with encoded command
- CyberChef: decode PowerShell `-EncodedCommand` → flag

### Challenge 7: Burren Waffet's Last Hurrah (Medium, Stego)
**Flag:** `NZCSC{ST3G_W1TH_0N35_4ND_Z3R05}`
- Excel chart: price up = 1, down = 0
- Formula: `=IF(A2>A1,1,0)`
- Binary → CyberChef decode

### Challenge 8: Flag Trader (Medium, Misc/OSINT)
**Flag:** `NZCSC{C0NGR4T5_0N_TH3_PR3_R3LE4SE_FL4G}`
- TradeMe auction ID 4717209839 → seller `nzcscleaker24`
- Feedback → buyer `stagflealer420`
- Twitter/X → email → GitHub `StagateriusF/laptop_backup`
- Clone repo → encrypted zip on desktop
- Password in `.bash_history` → unzip → flag

### Challenge 9: RAM > Disk (Hard, Forensics)
**Flag:** `NZCSC{l1v1ng_1n_m3m0ry_r3nt_fr33}`
- Memory dump + Volatility 2 profile (Ubuntu 5.4.0-84)
- `linux_bash_history` → suspicious `googel-crome-x64.deb`
- Extract deb from memory → postinst downloads `shell` to `/bin/ls`
- Extract `shell` binary from memory → Ghidra: `decodeFlag` function
- XOR decryption script or GDB breakpoint

### Challenge 10: rm -rf (Hard, Forensics)
**Flag:** `NZCSC{D3L3T3D_BUT_N3V3R_F0RG0TTEN}`
- Two disk images (Disk2.img, Disk3.img) from RAID 5 (3 disks)
- XOR Disk2 ⊕ Disk3 = Disk1 (missing)
- Rebuild RAID: `mdadm --assemble`
- Autopsy on FAT16 → deleted file (base64 name)
- Decode name → Pastebin URL (deleted)
- Wayback Machine → archived Pastebin → flag

### Challenge 11: Sharp Snake (Hard, Rev)
**Flag:** `NZCSC{python3_and_csharp_rev_is_kwl}`
- C# binary (DotPeek) → extracts embedded Python 3.10 + zip module
- Resources: `python_3_10_11_embed_amd64`, `hacks` (base64 zip), `debug` (hex)
- `hacks` zip: `aes.py`, `payload.py` (encrypted), `__main__.py`
- Key = `debug` (64 hex) XOR SHA256(zip)
- AES decrypt payload → flag

### Challenge 12: Substitute Teacher (Very Easy, Crypto)
**Flag:** `NZCSC{3NCRYPT1ON_VS_3NC0D1NG}`
- Base64 → Hex → ROT13 → Vigenère (key: `flagkey`)

### Challenge 13: Backwards (Easy, Stego)
**Flag:** `NZCSC{1T5_4LL_B4CKW4RD5}`
- PNG with "backwards" text
- LSB stego on flipped image (`convert -flop`)
- Extract LSB → base64 → reverse → hex → reverse → hex → reverse

### Challenge 14: Ret3Win (Easy, Pwn)
**Flag:** `NZCSC{B3TT3R_C4LL_W1N}`
- Buffer overflow: `gets()` into 99-byte buffer
- Offset: 120 bytes
- `win()` function prints flag
- Stack alignment: ret gadget at `0x40101a`
- Payload: 120 bytes + ret + win_addr

### Challenge 15: All Roads Lead to Flags (Very Easy, Crypto)
**Flag:** `NZCSC{R0M4N_4R0UND}`
- GIF → extract frames (`convert rome.gif numeral.png`)
- Roman numerals → decimal → ASCII

### Challenge 16: Fragile Lock (Very Easy, Web)
**Flag:** `NZCSC{X9fZ2tAQ9kNc5Vzd25rH}`
- View source → obfuscated JS
- Deobfuscate (deobfuscate.relative.im) → flag in code

### Challenge 17: Sheeeesh (Easy, Crypto)
**Flag:** `NZCSC{4T3_4ND_L3FT_N0_CRUMB5}`
- Java-like pseudocode with slang
- Translate to real Java: XOR with "nocap", then AES-CBC
- Key: `lowkeythisisakey`, IV: `itdohitdifferent`
- CyberChef: decrypt `flag.bin`

### Challenge 18: Server-side PDF (Easy, Web)
**Flag:** `NZCSC{pdf-nday-and-localhost-redirect}`
- pdf-image library RCE (npm audit)
- SSRF bypass: 302 redirect from ngrok → localhost
- Command injection via `filename` parameter
- Exfiltrate flag via requestbin

### Challenge 19: Magic Number (Very Easy, Forensics)
**Flag:** `NZCSC{you_ve_G0t_th3_M4G1c}`
- File `2e3rft3` has wrong PNG header
- Fix first 8 bytes to `89 50 4E 47 0D 0A 1A 0A`
- Open as PNG

### Challenge 20: Double Canary (Very Hard, Pwn)
**Flag:** `NZCSC{nice-work-taking-careful-care-of-the-canaries}`
- Two canaries: custom (null at wrong end) + standard
- Custom canary = `main_addr ^ 0xadbeefc0debabe`
- Multi-stage exploit:
  1. Leak custom canary (exact 16-byte write)
  2. Derive main address → break PIE
  3. Leak standard canary (25-byte write overwrites null)
  4. Restart via `_start` (small overflow)
  5. Leak libc (40-byte write)
  6. Restart again
  7. ROP chain: `system("/bin/sh")` → cat flag

---

## NZCSC 2024 Round 2

*Source: `NZCSC24_R2_Writeup.pdf`*

### Challenge 1: We Have Dark Mode at Home (Very Easy, Web)
**Flag:** `NZCSC{c9zdYfyRuv3uqhb2lPR6}`
- Cookie `theme` → change to `gold` → refresh
- Flag in HTML comment

### Challenge 2: HoneyDB (Very Easy, Web)
**Flag:** `NZCSC{taGb1IUguzin5nfZowqx}`
- Article IDs 1-15, 17+ → ID 16 missing
- `details.php?id=16` → flag

### Challenge 3: Eras (Very Easy, Stego)
**Flag:** `NZCSC{un2Fyv66XTqSAKB}`
- PDF with Taylor Swift lyrics (Blank Space)
- White text on white background → copy to editor → flag visible

### Challenge 4: Server Says (Easy, Web)
**Flag:** `NZCSC{S3RV3R_H4S_L3FT_TH3_S3RV3R}`
- Login form with client-side SQLi filter (single quote)
- Bypass: override JS filter or use Burp Suite
- Payload: `' OR '1'='1`

### Challenge 5: AliExpreSSL (Easy, Web)
**Flag:** `NZCSC{a1m0st_as_g00d_as_ss1}`
- Server speaks ROT13-encoded HTTP (UGGC/1.0 200 BX)
- Decode → `/flag/` directory traversal
- Follow redirects to final flag.txt

### Challenge 6: Return Oriented Flag (Easy, Rev)
**Flag:** `NZCSC{H1D1NG_1N_TH3_FUNCT10N5}`
- Binary: each function returns one character
- Ghidra: extract data section bytes → string `F3N}Z1SDHT0{UG5_C`
- GDB: get function call order from `main`
- Map functions → chars → reconstruct flag

### Challenge 7: Commitment Issues (Easy, Forensics)
**Flag:** `NZCSC{ch3ck_y0ur_d4ngl1ng_c0mm1ts}`
- GitHub repo: 4 commits, 4 Actions runs
- Dangling commit `0c71d07` (force-pushed over)
- Visible in Actions but not commit history
- Download binary from that commit → `strings` → flag

### Challenge 8: Pwn 10101 (Easy, Pwn)
**Flag:** `NZCSC{your_first_buffer_overflow_abcd1234}`
- Echo service with format string/buffer overflow
- `cyclic` pattern → find offset
- Win function at `0x3433323164636261` → little-endian `abcd1234`

### Challenge 9: What in TARnation (Easy, Forensics)
**Flag:** `NZCSC{tar-append-is-sneaky}`
- Tar with 3 files: flag.png, REAL_flag.png, flag.png (same names)
- `tar --occurrence=2 -xf` to extract second occurrence

### Challenge 10: UNIversal Backdoor (Medium, Web)
**Flag:** `NZCSC{UN1C0DE_RC3_H1DD3N_1N_PLA1N_S1GHT}`
- Node.js: invisible Unicode U+3164 in `allowedCommands`
- Control via `req.body.U3164` (destructuring)
- POST JSON with `command` and `ㅤ` (U+3164) both set to `cat /flag.txt`

### Challenge 11: Image Cipher Block (Medium, Crypto)
**Flag:** `NZCSC{CBC_15_B3TTER}`
- Encrypted BMP + hint.txt (header bytes)
- ECB mode: identical plaintext blocks → identical ciphertext
- Patch header → open BMP → flag visible in patterns
- Or Python PIL: reconstruct from encrypted pixels

### Challenge 12: Hexfiltration (Medium, Forensics)
**Flag:** `NZCSC{B00TL3G_DNS_B34C0N1NG}`
- PCAP: PHP shell upload → command execution via `cmd.php`
- Output split into 16-byte chunks, XOR with key `b3ac0n_4nd_3ggs!`, hex encoded
- Exfiltrated via DNS subdomains (`nslookup encrypted.domain.com`)
- Decode hex → XOR with key → flag

### Challenge 13: Firm Handshake (Medium, Forensics)
**Flag:** `NZCSC{SH4K1NG_H4NDS_W1TH_TH3_R0CK}`
- PCAP: WPA 4-way handshake (EAPOL)
- `aircrack-ng` + rockyou.txt → PSK: `shakeitoff`
- Wireshark: add decryption key → decrypt traffic
- HTTP → suspicious.pdf (password protected)
- `pdf2john` + `john` + rockyou.txt → PDF password
- Open PDF → flag

### Challenge 14: AES (Medium, Crypto/Stego)
**Flag:** `NZCSC{5t3g0n0gr4ph1c_k3y_t0_CBC}`
- Python script `AES.py` + `enc.out`
- Key hidden in whitespace of Python script
- `stegsnow` (whitespace stego tool) → extracts 16-byte key
- IV = first 16 bytes of `enc.out`
- AES-CBC decrypt

### Challenge 15: Snea-key (Medium, Malware/OSINT)
**Flag:** `NZCSC{PGP_K3YS_T0_TH3_K1NGD0M}`
- File hash → VirusTotal: KeyDropper malware
- Registry key `FingerPrint` set to GPG key signature
- OpenPGP keyserver search → public key
- Comment: "root (Key for encrypting data exfil to our domain)"
- Base64 decode key data → email: `root@exfildomain.site`
- DNS TXT record on domain → flag

### Challenge 16: Social Distancing (Medium, Malware)
**Flag:** `NZCSC{0v3rKiLL_0bFuSC4t10n}`
- Windows Defender quarantined file (RC4 encrypted)
- Microsoft RC4 key (known) → decrypt with CyberChef
- PowerShell script with layered obfuscation (IEX, ComSpec, deflate, base64)
- Iteratively deobfuscate in TIO PowerShell sandbox
- Final: base64 + deflate → flag variable

### Challenge 17: Monoflag (Medium, Stego/Audio)
**Flag:** `NZCSC{4_M0N0_FL4G_1N_4_5T3R30_W0RLD}`
- Stereo WAV: flag in left channel, noise in both
- Audacity: split stereo → invert right channel → merge mono
- Destructive interference cancels noise → spectrogram shows flag

### Challenge 18: Primed (Medium, Crypto)
**Flag:** `NZCSC{M0R3_PR1ME5_D0ES_N0T_M3AN_M0RE_S3CURE}`
- RSA with 21 primes (328-bit each) + one 12-bit prime
- 12-bit prime < 4096 → brute force factor of n
- Decrypt modulo small prime → `flag mod p`
- Repeat for multiple connections → CRT (Chinese Remainder Theorem)
- `sympy.ntheory.modular.crt(moduli, residuals)` → full flag

### Challenge 19: Tame the Green Dragon (Hard, Rev)
**Flag:** `NZCSC{ghWuxXDggRz82UndJtsUhZA5YsnCARbHsTWzWx7966}`
- Ghidra: `check_flag` function with 6 checks
- Check 1: len=49, format `NZCSC{...}`
- Check 2: prefix/suffix
- Check 3: manual char matches at indices
- Check 4: XOR with lookup table (indices 11-18)
- Check 5: lookup table (indices 19-26)
- Check 6: complex loop (21 iterations, XOR + double lookup)
- Python replication of each check

### Challenge 20: Cats and Dogs (Hard, Pwn)
**Flag:** `NZCSC{scanf-adds-a-null-terminator-that-can-be-deadly}`
- Struct confusion: Cat (name, speak_fn, age) vs Dog (age, speak_fn, name)
- 1. Create dog
- 2. Create cat with invalid age 'a' → leaks dog's speakDog address
- 3. Calculate win address from leak
- 4. Create cat with 16-char name + win address as age
- `scanf("%16s")` writes 16 chars + null → overwrites type to Dog
- Dog interprets age as speak_fn → calls win()

---

## NZCSC 2025 Writeups

*Source: `NZCSC25_writeups.pdf`*

### Challenge 1: Basic Hide and Seek (Medium, Stego)
**Flag:** `FLAG[FAFEDCABCCDEFDRF]`
- `binwalk -e nothing.jpg` → embedded ZIP
- Extract → `secretctf.txt`

### Challenge 2: Fun Facts (Medium, Web)
**Flag:** (in writeup)
- View source → base64 string at bottom
- Decode → external URL
- Paste JS in browser console → flag alert

### Challenge 3: Mysterious Browser Identity (Medium, Forensics)
**Flag:** (in writeup)
- PCAP in Wireshark → HTTP POST with long data
- Follow stream → Base64 in User-Agent
- Decode → flag

### Challenge 4: Note API (Medium, Web)
**Flag:** (in writeup)
- API docs → login with provided creds (POST /login, JSON)
- `/notes` → IDs 1041-1050
- IDOR: `/note/1077` (unauthorized access) → flag

### Challenge 5: The Insider's Footprint (Medium, Forensics)
**Flag:** (in writeup)
- `unzip secret_report.docx -d extracted/`
- `docProps/custom.xml` → base45 encoded flag
- CyberChef: base45 decode

### Challenge 6: Reversal Protocol (Hard, Rev)
**Flag:** `FLAG[94C7F8D2BAE5637C]`
- Binary expects password arg
- `sub_12A0`: reverses "reverseme" → "emesrever" (password)
- `sub_1210`: flag bytes each +1 → subtract 1
- Run: `./rev emesrever`

### Challenge 7: ChronoCorp Secure Archive Portal (Medium, Web)
**Flag:** (in writeup)
- `robots.txt` → `/server_assets/` → chain of endpoints
- `.bak` file: hints → path traversal, log file, admin doc ID
- Two file params → path traversal to log
- Header `X-Chrono-Auth: Override_Approved_Level9` → access `CV_MASTER_RESET_SEQ_001`

### Challenge 8: Signal from Sector 91 (Medium, Crypto)
**Flag:** `FLAG[EB639CF274AD85FA]`
- `encoded_key`: Hex → Base91 → Morse (di/dah) → `IGUESSYOUFOUNDTHEKEY`
- `encoded_flag`: Hex → Base64 → Vigenère (key above) → flag

### Challenge 9: Super AI Trader (Hard, Pwn)
**Flag:** `FLAG[4EL260683A86MC7E]`
- Format string vuln: `printf(user_buf)` in `buy_stocks`
- Flag in stack buffer `api_buf`
- `%p` × 150+ → leak stack
- Little-endian decode at offsets 9, 10, 11

### Challenge 10: SecureVault (Hard, Rev)
**Flag:** `FLAG[23C26B6Z3A99MC5E]`
- Anti-debug, fake flags, XOR hint
- Ghidra: `build_string()` builds flag char-by-char from hex values
- Convert hex → ASCII

### Challenge 11: Oracle of Odds and Evens (Hard, Crypto)
**Flag:** (in writeup)
- RSA LSB Oracle with 10% noise
- Binary search on plaintext range using parity oracle
- Majority vote (11 queries) per bit
- Submit upper_bound trace each iteration

### Challenge 12: Operation Ghost Beacon (Hard, Forensics)
**Flag:** (in writeup)
- PCAP → HTTP GET with long base64 → URL
- Download zip (password protected)
- Same HTTP stream → `page8.html` → blank page
- View source → image URL
- Image EXIF comment → base64 → path
- Path → list of base64 passwords
- `john` + passwords → zip
- docx → rename .zip → `word/_rels/document.xml.rels` → target URL
- URL source → base64 → PowerShell → flag.exe → remove .exe

### Challenge 13: Headerless Truth (Very Hard, Forensics)
**Flag:** (in writeup)
- `Secret.png` corrupted
- Hex editor: fix first 8 bytes to PNG signature
- Open → flag in image

### Challenge 14: Log Analysis (Easy, Forensics)
**Flag:** (in writeup)
- docx with embedded images
- Second-to-last image: crop → restore → hidden base64
- Decode → flag

### Challenge 15: Secure Login (Very Easy, Web)
**Flag:** (in writeup)
- View source → credentials in script
- Login → flag

### Challenge 16: Cyber Space (Very Easy, Web)
**Flag:** (in writeup)
- `robots.txt` → disallowed `report.html`
- Select blank area or view source → flag

---

## NZCSC Round 1 Writeup

*Source: `Round1_writeup.pdf`*

### R1 Challenge 1: Audio Steganography (Stego)
- Python script: LSB extraction from WAV
- 16-bit frames, 44.1kHz
- Output: `stego.saurus`

### R1 Challenge 2: Cryptography (Crypto)
**Flag:** `flag:8ac5f87a2775`
- Decimal string with repeating "837" separators
- Python: split on "837", `chr(int(x))` each

### R1 Challenge 3: Web Application (Web)
**Flag:** `flag:2c3d4zb0e0e6`
- Part 1: in cookie
- Part 2: color of blue strip (hex)

### R1 Challenge 4: Flag Checker (Web)
**Flag:** `flag:C0DoU31rWVGus`
- JS `checkFlag()` calls `check1`-`check4`
- Brute force printable chars against MD5/SHA1/SHA256/HMAC
- Build dict → lookup

### R1 Challenge 5: Cryptography (Crypto)
**Flag:** `flag:49e3395f08eb`
- JS cipher: first 5 chars of ciphertext = "flag:" format
- Set "flag:" as plaintext → get key from first 5 ciphertext chars
- Use key to decrypt rest

### R1 Challenge 6: Network Traffic Analysis
- Wireshark (no flag shown)

### R1 Challenge 7: Cryptography (Crypto)
**Flag:** `flag:qwh493dof2c0`
- Ciphertext: `h2yv:94p6qrs7naeh`
- Hint: hieroglyphs → Khnumhotep II (first crypto)
- Vigenère cipher, key: "cryptii" (default on cryptii.com)
- Alphabet: a-z + 0-9

### R1 Challenge 8: Reverse Engineering (Rev)
**Flag:** (in writeup)
- Extract 128-bit AES key from binary (Ghidra)
- Anti-debugging techniques
- Key in 3 locations → loaded in memory
- AES-128-GCM: send `uint32(0)` → get encrypted flag
- Decrypt with key

### R1 Challenge 10: Shredded File (Forensics)
**Flag:** `flag:6sg4s1ax0n2`
- `shred.bin` → `strings` → embedded ZIP
- Extract → 10 `secret.partN` files (base64)
- Interleave: char 0 from part1, char 1 from part2, etc.
- Base64 decode → flag at end

### R1 Challenge 11: Memory Forensics (Forensics)
**Flag:** `flag:RUpF6X0dntqV`
- Volatility: `imageinfo` → profile
- `cmdscan` → PowerShell command (base64)
- Download ransomware.exe → pyinstxtractor → decompyle3
- AES-CBC, IV=`abcdefghijklmnop`, key in source
- Volatility: `pslist` → notepad PID → `memdump`
- Strings on dump → "Encrypted Data" + base64
- CyberChef: AES-CBC decrypt

### R1 Challenge 12: SSTI (Web)
**Flag:** `flag:cjf1nnsfpo2b`
- Flask app, `render_template_string` vuln
- WAF: blocks `config`, length 70, "s3cr3tAg3nt"
- Bypass: `request.args` for blocked chars
- Jinja2: `{% set x = request.args.x %}{{ x }}`
- Payload: `{{ url_for.__globals__.config.secret }}` via args

---

## NCSCS 2023 - Conspicuous & Deception

*Source: `NCSCS2023_writeup.rar` → `chal14_conspicuous.pdf`, `chal15_Deception.pdf`*

### Challenge: Conspicuous (Stego)
- `exiftool` + `binwalk` on `matrix.jpg`
- `binwalk -e matrix.jpg` → embedded files
- WAV file: DTMF dial tones → numbers → decode → flag

### Challenge: Deception (Stego/Forensics)
- Word doc: 2 images
- Uncrop images (Word crop tool) → encoded text + "Citrix" directory
- Citrix cipher (asecuritysite.com/cipher/citrix) → CyberChef decode
- Ctrl+A → white text paragraphs → flag

---

## Summary Statistics

| Competition | Challenges | Categories Covered |
|-------------|------------|-------------------|
| NCSCS 2023 | 13 | Web, Forensics, Crypto, Stego, Rev, Binary, Misc |
| NZCSC 2020 R0 | 8 | Crypto, Stego, Rev, Network, Forensics, SQLi, Web |
| NZCSC 2022 R0 | 3 | Esolang (Piet), Rev (Strings/XOR), BrainFuck+GeoJSON |
| NZCSC 2023 R0 | 13 | Same as NCSCS 2023 |
| NZCSC 2024 R0 | 20 | Web, Crypto, Stego, Forensics, Rev, Pwn, Misc, OSINT |
| NZCSC 2024 R2 | 20 | Web, Stego, Crypto, Forensics, Rev, Pwn, Malware, OSINT |
| NZCSC 2025 | 16 | Stego, Web, Forensics, Rev, Crypto, Pwn, Malware |
| NZCSC Round 1 | 12 | Stego, Crypto, Web, Forensics, Rev, Network, SSTI |
| NCSCS 2023 Extras | 2 | Stego, Forensics |

**Total Unique Challenges:** ~100+  
**Primary Tools:** Ghidra, Wireshark, CyberChef, Volatility, Binwalk, ExifTool, Audacity, QGIS, GDB/pwndbg, pwntools, John/Hashcat, stegsnow, zsteg, DotPeek, Burp Suite

---

*Compiled from all PDF/RAR sources in `/Users/hari/projects/YGGDRASIL`*
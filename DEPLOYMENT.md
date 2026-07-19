# J Matrix Twin - Deployment Guide

Complete guide for deploying the J Matrix Twin playground to GitHub Pages and setting up the WebSocket server.

## Prerequisites

- GitHub account
- Git installed locally
- Node.js 16+ (for WebSocket server)
- J programming language (optional, for full functionality)

## Step 1: Create GitHub Repository

### Option A: GitHub CLI (Recommended)

```bash
cd j-matrix-twin

# Create repository
gh repo create j-matrix-twin --public --source=. --remote=origin

# Push code
git push -u origin master
```

### Option B: GitHub Web Interface

1. Go to https://github.com/new
2. Repository name: `j-matrix-twin`
3. Description: "SUBLEQ Attention Engine - J tacit programming playground"
4. Public repository
5. Don't initialize with README (we already have one)
6. Click "Create repository"

Then push:

```bash
cd j-matrix-twin
git remote add origin https://github.com/YOUR_USERNAME/j-matrix-twin.git
git branch -M master
git push -u origin master
```

## Step 2: Enable GitHub Pages

### Automatic (via GitHub Actions)

1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. The workflow in `.github/workflows/deploy.yml` will automatically deploy on push

### Manual

1. Go to repository Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `master` or `main`
4. Folder: `/playground/public`
5. Click "Save"

Your site will be live at: `https://YOUR_USERNAME.github.io/j-matrix-twin`

## Step 3: Configure Repository Settings

### Enable Issues and Discussions

1. Settings → General
2. Features: Enable "Issues" and "Discussions"

### Add Topics

1. Repository main page → ⚙️ (gear icon)
2. Add topics:
   - `j-language`
   - `subleq`
   - `attention-mechanism`
   - `tacit-programming`
   - `goldilocks-field`
   - `webassembly`
   - `playground`

### Update Repository Details

1. About section → ⚙️
2. Description: "SUBLEQ Attention Engine - Interactive J programming playground with WebSocket execution"
3. Website: `https://YOUR_USERNAME.github.io/j-matrix-twin`
4. Check "Use your GitHub Pages website"

## Step 4: Deploy WebSocket Server (Optional)

For full J execution capabilities, deploy the WebSocket server.

### Option A: Local Development

```bash
cd j-matrix-twin/playground
npm install
npm start
```

Access at: http://localhost:8080

### Option B: Cloud Deployment (Heroku)

```bash
cd j-matrix-twin/playground

# Create Heroku app
heroku create j-matrix-twin-server

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Deploy
git subtree push --prefix playground heroku master

# Open
heroku open
```

Update `playground/public/app.js` line 234:

```javascript
this.ws = new WebSocket('wss://j-matrix-twin-server.herokuapp.com');
```

### Option C: Cloud Deployment (Railway)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select `j-matrix-twin` repository
4. Root directory: `/playground`
5. Start command: `npm start`
6. Deploy

Update WebSocket URL in `app.js` to Railway URL.

### Option D: Cloud Deployment (Render)

1. Go to https://render.com
2. "New" → "Web Service"
3. Connect GitHub repository
4. Root directory: `playground`
5. Build command: `npm install`
6. Start command: `npm start`
7. Create Web Service

Update WebSocket URL in `app.js`.

## Step 5: Install J (For Server)

### On Server (Linux)

```bash
# Download J
wget https://www.jsoftware.com/download/j9.5/install/j9.5_linux64.tar.gz

# Extract
tar -xzf j9.5_linux64.tar.gz

# Add to PATH
echo 'export PATH=$PATH:/path/to/j9.5/bin' >> ~/.bashrc
source ~/.bashrc

# Verify
ijconsole --version
```

### On Server (Docker)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

# Install J
RUN apk add --no-cache wget tar
RUN wget https://www.jsoftware.com/download/j9.5/install/j9.5_linux64.tar.gz && \
    tar -xzf j9.5_linux64.tar.gz -C /opt && \
    rm j9.5_linux64.tar.gz

ENV PATH="/opt/j9.5/bin:${PATH}"

# Copy app
WORKDIR /app
COPY playground/package*.json ./
RUN npm install
COPY playground/ ./

EXPOSE 8080
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t j-matrix-twin .
docker run -p 8080:8080 j-matrix-twin
```

## Step 6: Test Deployment

### Test GitHub Pages

1. Visit: `https://YOUR_USERNAME.github.io/j-matrix-twin`
2. Should see the playground interface
3. Try running examples (will use WASM fallback)

### Test WebSocket Server

1. Start server: `npm start`
2. Visit: http://localhost:8080
3. Click "Connect" button
4. Should see "Connected" status
5. Run J code examples
6. Verify output appears

## Step 7: Custom Domain (Optional)

### Add Custom Domain

1. Buy domain (e.g., `jmatrix.dev`)
2. Repository Settings → Pages → Custom domain
3. Enter domain: `jmatrix.dev`
4. Save

### Configure DNS

Add DNS records at your domain provider:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

Wait for DNS propagation (up to 24 hours).

## Step 8: Monitoring and Analytics

### GitHub Insights

- Repository → Insights → Traffic
- View visitors, clones, popular content

### Google Analytics (Optional)

Add to `playground/public/index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Troubleshooting

### GitHub Pages Not Updating

1. Check Actions tab for deployment status
2. Verify workflow file: `.github/workflows/deploy.yml`
3. Check Pages settings: Settings → Pages
4. Clear browser cache

### WebSocket Connection Failed

1. Verify server is running: `npm start`
2. Check firewall allows port 8080
3. Verify WebSocket URL in `app.js`
4. Check browser console for errors

### J Execution Errors

1. Verify ijconsole is in PATH: `which ijconsole`
2. Test manually: `echo "echo 'test'" | ijconsole`
3. Check server logs for errors
4. Verify J syntax in examples

### CORS Errors

If deploying server separately, add CORS headers in `server.js`:

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://YOUR_USERNAME.github.io'
}));
```

## Maintenance

### Update Dependencies

```bash
cd playground
npm update
npm audit fix
git commit -am "Update dependencies"
git push
```

### Update J Examples

1. Edit examples in `playground/public/app.js`
2. Test locally
3. Commit and push
4. GitHub Actions will auto-deploy

### Monitor Server

```bash
# View logs (Heroku)
heroku logs --tail

# View logs (Railway)
railway logs

# View logs (local)
npm start
```

## Security

### API Keys

Never commit API keys. Use environment variables:

```bash
# .env (add to .gitignore)
OPENAI_API_KEY=sk-...
WEBSOCKET_SECRET=...
```

### Rate Limiting

Add to `server.js`:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### Input Validation

Already implemented in `server.js`:
- 30-second execution timeout
- Sandboxed ijconsole process
- No file system access from browser

## Performance

### CDN (Optional)

Use Cloudflare for faster global access:

1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable "Always Use HTTPS"
5. Enable "Auto Minify" for JS/CSS/HTML

### Caching

Add to `playground/public/index.html`:

```html
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

## Backup

### Automated Backups

GitHub automatically backs up your repository.

### Manual Backup

```bash
# Clone to backup location
git clone https://github.com/YOUR_USERNAME/j-matrix-twin.git backup/

# Or create archive
git archive --format=zip --output=j-matrix-twin-backup.zip master
```

## Support

- **Issues:** https://github.com/YOUR_USERNAME/j-matrix-twin/issues
- **Discussions:** https://github.com/YOUR_USERNAME/j-matrix-twin/discussions
- **Email:** jessicalw34@gmail.com

## Next Steps

1. ✅ Repository created and pushed
2. ✅ GitHub Pages enabled
3. ✅ WebSocket server deployed (optional)
4. ✅ Custom domain configured (optional)
5. ✅ Monitoring enabled
6. 🎉 Share with the world!

---

**Deployment Status:** Ready for Production  
**Last Updated:** 2026-07-19  
**Maintainer:** Jessica (SNAPKITTYWEST)
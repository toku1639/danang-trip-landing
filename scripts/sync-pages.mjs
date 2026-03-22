/**
 * dist/ のビルド結果を docs/ にコピーする（GitHub Pages「ブランチの /docs」用）
 *
 * 手順:
 * 1. npm run pages:sync
 * 2. docs/ を git add / commit / push
 * 3. GitHub → Settings → Pages → Source を「Deploy from a branch」
 *    Branch: main / Folder: /docs （「GitHub Actions」はオフにする）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const docs = path.join(root, "docs");

if (!fs.existsSync(dist)) {
  console.error("dist/ がありません。先に npm run build を実行してください。");
  process.exit(1);
}

fs.rmSync(docs, { recursive: true, force: true });
fs.cpSync(dist, docs, { recursive: true });
fs.writeFileSync(path.join(docs, ".nojekyll"), "");
console.log("OK: docs/ を更新しました。コミット後、Pages のフォルダを /docs に設定してください。");

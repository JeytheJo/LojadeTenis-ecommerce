# Rode dentro da pasta kicks-web:  powershell -ExecutionPolicy Bypass -File .\checkup.ps1

function Ok($t)    { Write-Host "OK     $t" -ForegroundColor Green }
function Falta($t) { Write-Host "FALTA  $t" -ForegroundColor Red }

Write-Host "`n== 1. Arquivos do projeto ==" -ForegroundColor Cyan
$arquivos = @(
  "src\app\page.tsx", "src\app\layout.tsx", "src\app\kicks.css", "src\app\globals.css",
  "src\app\produto\page.tsx", "src\app\produto\produto.css",
  "src\app\produto\[slug]\page.tsx", "src\app\produto\[slug]\ProdutoDetalhe.tsx",
  "src\data\produtos.ts"
)
foreach ($a in $arquivos) {
  if (Test-Path -LiteralPath $a) { Ok $a } else { Falta $a }
}

Write-Host "`n== 2. Imagens em public\img ==" -ForegroundColor Cyan
$imgs = @(
  "campanha-nova-colecao", "editorial-tenis-no-dia-a-dia",
  "chuck-taylor-categoria", "pu-slipstream-categoria", "ad-ultraboost-categoria", "nk-airmax-categoria",
  "chuck-taylor", "pu-slipstream", "ad-ultraboost", "nk-airmax", "gel-kayano",
  "574-core", "puma-rs-x", "dunk-low", "jordan-1-low", "superstar"
)
foreach ($i in $imgs) {
  if (Test-Path -LiteralPath "public\img\$i.png") { Ok "$i.png" } else { Falta "$i.png" }
}

Write-Host "`n== 3. Cada page.tsx está no lugar certo? ==" -ForegroundColor Cyan
if (Select-String -LiteralPath "src\app\page.tsx" -Pattern "export default function Home" -Quiet) { Ok "app\page.tsx é a home" } else { Falta "app\page.tsx não é a home" }
if (Select-String -LiteralPath "src\app\produto\page.tsx" -Pattern "redirect" -Quiet) { Ok "produto\page.tsx é o redirect" } else { Falta "produto\page.tsx não é o redirect" }
if (Select-String -LiteralPath "src\app\produto\[slug]\page.tsx" -Pattern "generateStaticParams" -Quiet) { Ok "[slug]\page.tsx tem generateStaticParams" } else { Falta "[slug]\page.tsx está com o conteúdo errado" }

Write-Host "`n== 4. Sobras que não deveriam existir ==" -ForegroundColor Cyan
$achou = $false
if (Test-Path "src\app\src")  { Write-Host "SOBRA  src\app\src"  -ForegroundColor Yellow; $achou = $true }
if (Test-Path "src\app\data") { Write-Host "SOBRA  src\app\data" -ForegroundColor Yellow; $achou = $true }
$sobras = Get-ChildItem src -Recurse -File | Where-Object { $_.Name -match "\(\d\)" -or $_.Name -match " \.tsx$" }
foreach ($s in $sobras) { Write-Host "SOBRA  $($s.FullName)" -ForegroundColor Yellow; $achou = $true }
if (-not $achou) { Ok "nenhuma sobra" }

Write-Host "`n== 5. TypeScript ==" -ForegroundColor Cyan
npx tsc --noEmit
if ($LASTEXITCODE -eq 0) { Ok "sem erros de TypeScript" } else { Write-Host "ERRO   veja as mensagens acima" -ForegroundColor Red }
Write-Host ""

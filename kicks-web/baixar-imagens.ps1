New-Item -ItemType Directory -Force -Path "public\img" | Out-Null

$base = "https://www.figma.com/api/mcp/asset/7c13d8af-c023-4bce-adc7-8aebbcaf3920"
$arquivos = [ordered]@{
  "campanha-nova-colecao"       = "049c3"
  "editorial-tenis-no-dia-a-dia" = "d2803"
  "chuck-taylor-categoria"      = "bd5d0"
  "pu-slipstream-categoria"     = "cf4bb"
  "ad-ultraboost-categoria"     = "d350b"
  "nk-airmax-categoria"         = "b173e"
  "chuck-taylor"                = "697b5"
  "pu-slipstream"               = "75c67"
  "ad-ultraboost"               = "d350b"
  "nk-airmax"                   = "983c6"
  "gel-kayano"                  = "569a4"
  "574-core"                    = "fa3cb"
  "puma-rs-x"                   = "b067e"
  "dunk-low"                    = "f6198"
  "jordan-1-low"                = "4224b"
  "superstar"                   = "85f7a"
}

foreach ($nome in $arquivos.Keys) {
  $url = "$base/$($arquivos[$nome]).png"
  try {
    Invoke-WebRequest -Uri $url -OutFile "public\img\$nome.png" -ErrorAction Stop
    Write-Host "OK    $nome.png"
  } catch {
    Write-Host "FALHOU $nome.png  ($($_.Exception.Message))" -ForegroundColor Red
  }
}

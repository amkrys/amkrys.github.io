# Renders a resume HTML file to PDF with headless Chrome.
# Usage:  powershell -ExecutionPolicy Bypass -File resume\build.ps1 [-Src master.html] [-Out <path>]
# Defaults: master.html (2-page master resume) -> ..\data\resume.pdf, the file the website's
# "Download resume" buttons link to. One-page version: -Src resume.html -Out ..\data\resume-1page.pdf
param(
    [string]$Src = "master.html",
    [string]$Out = (Join-Path $PSScriptRoot "..\data\resume.pdf")
)

$chrome = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { throw "Chrome or Edge not found" }

$src = (Resolve-Path (Join-Path $PSScriptRoot $Src)).Path
$url = "file:///" + ($src -replace '\\', '/' -replace ' ', '%20')
$Out = [System.IO.Path]::GetFullPath($Out)
$profileDir = Join-Path $env:TEMP "resume-chrome-profile"

& $chrome --headless=new --disable-gpu --no-first-run --user-data-dir="$profileDir" `
    --allow-file-access-from-files --no-pdf-header-footer --virtual-time-budget=5000 `
    --print-to-pdf="$Out" $url 2>$null | Out-Null

$bytes = [System.IO.File]::ReadAllBytes($Out)
$pages = ([regex]::Matches([System.Text.Encoding]::ASCII.GetString($bytes), '/Type\s*/Page[^s]')).Count
"Wrote {0} ({1} KB, {2} page(s))" -f $Out, [int]($bytes.Length / 1024), $pages
